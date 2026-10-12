#!/usr/bin/env python3
"""Conservative, dependency-free source monitor for the static research app.

HTTP success is not clinical/recruitment/funding verification. HTML changes and
new links are review candidates. Only strict, visible JobPosting metadata can
renew a job's checkedAt. Never executes JavaScript or downloaded instructions.
"""
from __future__ import annotations

import argparse
import concurrent.futures
import copy
import datetime as dt
import hashlib
import html
from html.parser import HTMLParser
import ipaddress
import json
import os
from pathlib import Path
import re
import socket
import sys
import tempfile
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
import urllib.robotparser
import uuid

UTC = dt.timezone.utc
BEIJING = dt.timezone(dt.timedelta(hours=8))
CATEGORIES = ("news", "opportunities", "visits", "funding")
USER_AGENT = "ResearchCompass/1.0 (+https://github.com/Shawn-W-Ri/Physics_Ai)"
MAX_BODY = 2 * 1024 * 1024
POSTDOC = re.compile(r"\bpost[\s-]?doc(?:toral)?\b|\bresearch fellow\b", re.I)
VISIT = re.compile(r"visiting (?:researcher|scholar|fellow)|research visit|hosting|mobility|exchange|short.term scientific mission|\bstsm\b", re.I)
FUND = re.compile(r"fellowship|funding|grants?|scholarship|call for|apply|application|deadline", re.I)
NEWS = re.compile(r"news|publication|project|research|paper|seminar|conference|event|nyheter", re.I)
TRACKING = {"fbclid", "gclid", "mc_cid", "mc_eid"}


def stamp(value=None):
    return (value or dt.datetime.now(UTC)).astimezone(UTC).isoformat(timespec="seconds").replace("+00:00", "Z")


def digest(value):
    return hashlib.sha256(value.encode("utf-8") if isinstance(value, str) else value).hexdigest()


def clean(value, limit=5000):
    return re.sub(r"\s+", " ", html.unescape(str(value or ""))).strip()[:limit]


def normalized(value):
    return re.sub(r"[^\w]+", " ", clean(value, 100000).casefold()).strip()


def canonical(value):
    u = urllib.parse.urlsplit(value)
    query = urllib.parse.urlencode([(k, v) for k, v in urllib.parse.parse_qsl(u.query, keep_blank_values=True)
                                  if not k.lower().startswith("utm_") and k.lower() not in TRACKING])
    return urllib.parse.urlunsplit((u.scheme.lower(), u.netloc.lower(), u.path or "/", query, ""))


def safe_url(value, allowed=None, resolve=False):
    if not isinstance(value, str) or len(value) > 2500 or any(ord(c) < 32 for c in value):
        raise ValueError("Invalid source URL")
    try:
        u = urllib.parse.urlsplit(value)
        host = (u.hostname or "").lower()
        port = u.port
    except ValueError as exc:
        raise ValueError("Invalid source URL") from exc
    if u.scheme.lower() != "https" or u.username or u.password or port not in (None, 443) or "." not in host:
        raise ValueError("Only public HTTPS source URLs are allowed")
    if host.endswith((".local", ".localhost", ".internal")):
        raise ValueError("Private source hostname rejected")
    try:
        ipaddress.ip_address(host)
    except ValueError:
        pass
    else:
        raise ValueError("Literal IP source URLs are not allowed")
    if allowed is not None and not any(host == x or host.endswith("." + x) for x in allowed):
        raise ValueError("Source domain is not approved")
    if resolve:
        addresses = socket.getaddrinfo(host, 443, type=socket.SOCK_STREAM)
        if not addresses or any(not ipaddress.ip_address(item[4][0]).is_global for item in addresses):
            raise ValueError("Non-public DNS address rejected")
    return canonical(value)


class SafeRedirect(urllib.request.HTTPRedirectHandler):
    max_redirections = 5

    def __init__(self, allowed):
        self.allowed = allowed

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        # Never follow a known official page into login or an unapproved domain.
        safe_url(newurl, self.allowed, resolve=True)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def raw_fetch(url, previous, allowed, timeout=12, max_bytes=MAX_BODY, robots=False):
    """Return bounded public response; no cookies, credentials, or automatic proxy."""
    url = safe_url(url, allowed, resolve=True)
    headers = {"User-Agent": USER_AGENT, "Accept": "text/html,application/json;q=0.9", "Accept-Encoding": "identity"}
    for key, header in (("etag", "If-None-Match"), ("lastModified", "If-Modified-Since")):
        if previous.get(key) and "\n" not in previous[key] and "\r" not in previous[key]:
            headers[header] = previous[key][:1000]
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}), SafeRedirect(allowed))
    start = time.monotonic()
    try:
        with opener.open(urllib.request.Request(url, headers=headers), timeout=timeout) as response:
            content_type = response.headers.get("Content-Type", "").split(";")[0].strip().lower()
            types = ("text/plain", "text/html") if robots else ("text/html", "application/xhtml+xml", "application/json", "text/json")
            if content_type not in types:
                raise ValueError("Unsupported response content type")
            size = response.headers.get("Content-Length")
            if size and int(size) > max_bytes:
                raise ValueError("Response exceeds size limit")
            chunks, length = [], 0
            while True:
                if time.monotonic() - start > timeout * 2:
                    raise TimeoutError("Response time budget exceeded")
                chunk = response.read(min(65536, max_bytes + 1 - length))
                if not chunk:
                    break
                chunks.append(chunk)
                length += len(chunk)
                if length > max_bytes:
                    raise ValueError("Response exceeds size limit")
            charset = response.headers.get_content_charset() or "utf-8"
            try:
                body = b"".join(chunks).decode(charset, errors="replace")
            except LookupError:
                body = b"".join(chunks).decode("utf-8", errors="replace")
            return {"status": response.status, "body": body, "url": safe_url(response.url, allowed),
                    "contentType": content_type, "etag": response.headers.get("ETag", "")[:1000],
                    "lastModified": response.headers.get("Last-Modified", "")[:1000]}
    except urllib.error.HTTPError as exc:
        if exc.code == 304:
            return {"status": 304, "body": "", "url": url}
        # Retain status but never dump arbitrary response bodies or redirects.
        raise RuntimeError("HTTP " + str(exc.code)) from exc


class HTTPClient:
    """One concurrent request per origin, robots-aware, bounded request pacing."""
    def __init__(self):
        self.guard = threading.Lock()
        self.locks, self.robots, self.last_request = {}, {}, {}

    def __call__(self, url, previous, allowed):
        u = urllib.parse.urlsplit(safe_url(url, allowed))
        origin = u.scheme + "://" + u.netloc
        with self.guard:
            lock = self.locks.setdefault(origin, threading.Lock())
        with lock:
            if origin not in self.robots:
                policy = urllib.robotparser.RobotFileParser()
                try:
                    result = raw_fetch(origin + "/robots.txt", {}, allowed, max_bytes=256 * 1024, robots=True)
                    policy.parse(result["body"].splitlines())
                except RuntimeError as exc:
                    if str(exc) in ("HTTP 404", "HTTP 410"):
                        policy.parse([])
                    else:
                        raise ValueError("Robots policy unavailable: " + str(exc)) from exc
                self.robots[origin] = policy
            policy = self.robots[origin]
            if not policy.can_fetch("ResearchCompass", url):
                raise ValueError("Robots policy disallows this source")
            delay = policy.crawl_delay("ResearchCompass") or policy.crawl_delay("*") or 0.5
            if delay > 30:
                raise ValueError("Robots crawl delay exceeds this run's budget")
            remaining = delay - (time.monotonic() - self.last_request.get(origin, 0))
            if remaining > 0:
                time.sleep(remaining)
            try:
                return raw_fetch(url, previous, allowed)
            finally:
                self.last_request[origin] = time.monotonic()


_CLIENT = HTTPClient()


def fetch(url, previous, allowed):
    return _CLIENT(url, previous, allowed)


class Page(HTMLParser):
    OMIT = {"script", "style", "nav", "header", "footer", "noscript", "svg"}
    VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}

    def __init__(self, body):
        super().__init__(convert_charrefs=True)
        self.parts, self.links, self.jsonld, self.errors = [], [], [], []
        self.title_parts, self.anchor, self.skip, self.script = [], None, [], None
        self.base_href = None
        self.in_title = False
        self.feed(body)
        self.close()
        self.text = clean(" ".join(self.parts), 500000)
        self.title = clean(" ".join(self.title_parts), 300)
        self.content_hash = digest(self.text)
        if len(self.text) < 60:
            raise ValueError("HTML has too little readable content (possibly JavaScript-only)")
        if re.search(r"^(just a moment|access denied|attention required|verify you are human)", self.title, re.I):
            raise ValueError("Access challenge page, not source content")

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "base" and self.base_href is None:
            self.base_href = attrs.get("href")
        if tag == "script" and attrs.get("type", "").lower() == "application/ld+json":
            self.script = []
        if tag == "title":
            self.in_title = True
        if tag in self.OMIT or self.skip:
            if tag not in self.VOID:
                self.skip.append(tag)
            return
        if tag == "a":
            self.anchor = [attrs.get("href", ""), []]

    def handle_endtag(self, tag):
        if tag == "script" and self.script is not None:
            try:
                self.jsonld.append(json.loads("".join(self.script)))
            except (ValueError, RecursionError):
                self.errors.append("Invalid JSON-LD block")
            self.script = None
        if tag == "title":
            self.in_title = False
        if self.skip:
            if tag in self.skip:
                self.skip = self.skip[:len(self.skip) - 1 - self.skip[::-1].index(tag)]
            return
        if tag == "a" and self.anchor:
            href, parts = self.anchor
            self.links.append((href, clean(" ".join(parts), 300)))
            self.anchor = None
        if tag in {"p", "div", "li", "h1", "h2", "h3", "section"}:
            self.parts.append(" ")

    def handle_data(self, data):
        if self.script is not None:
            self.script.append(data)
        if self.in_title:
            self.title_parts.append(data)
            return
        if not self.skip:
            self.parts.append(data)
            if self.anchor:
                self.anchor[1].append(data)


def plain(value):
    return clean(re.sub(r"<[^>]*>", " ", str(value or "")), 12000)


def day(value):
    if not isinstance(value, str) or not re.fullmatch(r"\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})?)?", value):
        return None
    try:
        result = dt.date.fromisoformat(value[:10])
        if "T" in value:
            dt.datetime.fromisoformat(value.replace("Z", "+00:00"))
        return result.isoformat()
    except ValueError:
        return None


def relevant(value, keywords):
    n = normalized(value)
    return [term for term in keywords if normalized(term) in n]


def jsonld_jobs(values):
    result = []
    def walk(value, depth=0):
        if depth > 12 or len(result) > 50:
            return
        if isinstance(value, list):
            for child in value:
                walk(child, depth + 1)
        elif isinstance(value, dict):
            types = value.get("@type", [])
            if types == "JobPosting" or isinstance(types, list) and "JobPosting" in types:
                result.append(value)
            for key in ("@graph", "itemListElement", "item"):
                if key in value:
                    walk(value[key], depth + 1)
    for value in values:
        walk(value)
    return result


def specific_page(url):
    path = urllib.parse.urlsplit(url).path.rstrip("/").lower()
    return bool(path) and not re.search(r"/(jobs?|careers?|vacancies|open-positions|job-openings|search)$", path)


def verified_job(page, url, keywords, now, allowed):
    """Strict extraction, not a generic semantic/eligibility classifier."""
    jobs = jsonld_jobs(page.jsonld)
    if page.errors or len(jobs) != 1 or not specific_page(url):
        return None
    job = jobs[0]
    title, description = plain(job.get("title")), plain(job.get("description"))
    matches = relevant(title + " " + description, keywords)
    if not POSTDOC.search(title) or re.search(r"\bstudent\b|\bdoktorand\b|\bph\.?d\b.{0,20}(?:position|candidate)", title, re.I) or len(description) < 100 or not matches or normalized(title) not in normalized(page.text):
        return None
    if "research fellow" in title.lower() and not re.search(r"\bph\.?d\b|doctorate|doctoral degree", description, re.I):
        return None
    if job.get("url"):
        try:
            if safe_url(job["url"], allowed) != canonical(url):
                return None
        except ValueError:
            return None
    posted, deadline = day(job.get("datePosted")), day(job.get("validThrough"))
    today = now.astimezone(BEIJING).date().isoformat()
    if not posted or not deadline or posted > today or deadline < posted:
        return None
    org = job.get("hiringOrganization")
    institution = clean(org.get("name") if isinstance(org, dict) else "", 300)
    if not institution:
        return None
    status = "open" if deadline > today else "check"
    deadline_at = None
    try:
        exact_deadline = dt.datetime.fromisoformat(job["validThrough"].replace("Z", "+00:00"))
        if exact_deadline.tzinfo:
            deadline_at = exact_deadline.isoformat().replace("+00:00", "Z")
            deadline = exact_deadline.astimezone(BEIJING).date().isoformat()
            status = "closed" if exact_deadline < now else "open"
    except ValueError:
        pass
    if re.search(r"applications (?:are |have )?closed|position (?:has been |is )?filled|no longer accepting applications", page.text, re.I):
        status = "check"  # Ambiguous body/metadata conflict, never auto-open.
    loc = job.get("jobLocation", {})
    if isinstance(loc, list):
        loc = loc[0] if loc else {}
    address = loc.get("address", {}) if isinstance(loc, dict) else {}
    country = address.get("addressCountry", "待确认") if isinstance(address, dict) else "待确认"
    if isinstance(country, dict):
        country = country.get("name", "待确认")
    return {"title": title[:400], "institution": institution, "country": clean(country, 100), "kind": "postdoc",
            "status": status, "summary": description[:900], "requirements": "由官方JobPosting结构化字段提取；资格、薪资、时区与申请要求仍须阅读原文。",
            "fit": "关键词匹配：" + "、".join(matches[:6]) + "；仅说明研究主题相关，未判断个人申请资格。",
            "deadline": deadline, "deadlineNote": "官方结构化validThrough字段：" + job["validThrough"] + "；截止时区以公告为准。",
            "deadlineType": "hard", "deadlineAt": deadline_at, "publishedAt": posted, "url": url, "checkedAt": stamp(now),
            "sourceType": "official-announcement", "verification": "structured-jobposting", "priority": "normal", "tags": matches[:8],
            "evidence": {"url": url, "checkedAt": stamp(now), "summary": "官网可见岗位标题与单条JobPosting匹配，datePosted/validThrough均有效；提取不代表已获聘或满足资格。"}}


def build_sources(catalog, config, now, state=None):
    entries = {}
    def add(url, category, name, ref=None, group=None, api=False):
        if not url:
            return
        url = safe_url(url)
        entry = entries.setdefault(url, {"id": "src-" + digest(url)[:16], "url": url, "name": name,
                                        "categories": [], "refs": [], "groups": [], "api": api})
        if category not in entry["categories"]:
            entry["categories"].append(category)
        if ref and ref not in entry["refs"]:
            entry["refs"].append(ref)
        if group and group not in entry["groups"]:
            entry["groups"].append(group)
    for row in config.get("groupSources", []):
        add(row["url"], "news", row.get("name", row["id"]), group=row["id"])
    for row in config.get("existingOpportunitySources", []):
        category = "visits" if row.get("kind") in ("visit", "exchange") or "visit" in row["id"] else "opportunities"
        add(row["url"], category, row["id"], ("opportunities", row["id"]))
        add(row.get("applicationUrl"), category, row["id"], ("opportunities", row["id"]))
    for row in config.get("fundingSources", []):
        add(row["url"], "funding", row.get("name", row["id"]), ("funding", row["id"]))
    for row in config.get("verifiedInfrastructure", []):
        if row.get("type") == "public-api":
            continue
        name = row.get("name", "")
        categories = ["visits"] if VISIT.search(name) or "AScI" in name else ["funding"] if FUND.search(name) else ["opportunities"]
        if "EURAXESS" in name:
            categories = ["opportunities", "visits", "funding"]
        for category in categories:
            add(row["url"], category, name)
    since = (now.astimezone(BEIJING).date() - dt.timedelta(days=90)).isoformat()
    today = now.astimezone(BEIJING).date().isoformat()
    for label in ("core", "optics", "methods"):
        terms = config.get("keywords", {}).get(label, [])[:12]
        if terms:
            query = "(" + " OR ".join('TITLE_ABS:"' + term.replace('"', '') + '"' for term in terms) + ") AND FIRST_PDATE:[" + since + " TO " + today + "] sort_date:y"
            url = "https://www.ebi.ac.uk/europepmc/webservices/rest/search?" + urllib.parse.urlencode({"query": query, "format": "json", "resultType": "core", "pageSize": 30})
            add(url, "news", "Europe PMC · " + label, api=True)
    # Fixed monitored sources and APIs always precede a rotating candidate queue.
    candidates = [(collection, row) for collection in ("opportunities", "funding") for row in catalog.get(collection, []) if row.get("discoveredAt")]
    previous = (state or {}).get("sources", {})
    candidates.sort(key=lambda pair: previous.get(pair[1]["url"], {}).get("lastAttemptAt", previous.get(pair[1]["url"], {}).get("lastFetchedAt", "")))
    for collection, row in candidates:
        category = "funding" if collection == "funding" else "visits" if row.get("kind") in ("visit", "exchange") else "opportunities"
        existed = canonical(row["url"]) in entries
        add(row["url"], category, row.get("title", row["id"]), (collection, row["id"]))
        if not existed:
            entries[canonical(row["url"])]["dynamic"] = True
    return list(entries.values())


def paper_records(body, now):
    value = json.loads(body)
    records = value.get("resultList", {}).get("result")
    if not isinstance(records, list) or not isinstance(value.get("hitCount"), int):
        raise ValueError("Europe PMC response schema changed")
    result = []
    today = now.astimezone(BEIJING).date().isoformat()
    for row in records[:30]:
        title = clean(row.get("title"), 500)
        source, identifier = clean(row.get("source"), 20), clean(row.get("id"), 60)
        published = day(row.get("firstPublicationDate"))
        if not title or not re.fullmatch(r"[A-Za-z0-9]+", source) or not re.fullmatch(r"[A-Za-z0-9._-]+", identifier) or published and published > today:
            continue
        doi = clean(row.get("doi"), 300)
        identity = "doi:" + doi.lower() if doi else source + ":" + identifier
        url = "https://europepmc.org/article/" + source + "/" + identifier
        abstract = plain(row.get("abstractText"))
        result.append({"id": "paper-" + digest(identity)[:20], "title": title, "kind": "paper", "url": url,
                       "summary": (abstract[:1000] if abstract else "数据库未返回摘要，请阅读原文。") + "（文献元数据自动收录，未据同名作者归属课题组。）",
                       "groupName": "相关领域文献 · 团队归属未核验", "publishedAt": published, "checkedAt": stamp(now),
                       "discoveredAt": stamp(now), "verification": "bibliographic-metadata", "doi": doi,
                       "authors": clean(row.get("authorString"), 500), "tags": ["自动文献检索"]})
    return result, value["hitCount"] > len(records)


def discovered_links(page, spec, allowed, keywords, final_url=None):
    result, seen = [], set()
    base = final_url or spec["url"]
    if page.base_href:
        try:
            base = safe_url(urllib.parse.urljoin(base, page.base_href), allowed)
        except ValueError:
            pass
    for href, title in page.links:
        if len(title) < 8 or not href or href.startswith("#"):
            continue
        try:
            url = safe_url(urllib.parse.urljoin(base, href), allowed)
        except ValueError:
            continue
        if url == canonical(spec["url"]) or url in seen or re.search(r"\.(?:pdf|jpg|jpeg|png|zip|docx?)$", urllib.parse.urlsplit(url).path, re.I):
            continue
        context = title + " " + urllib.parse.unquote(url)
        category = None
        if POSTDOC.search(context) and relevant(context, keywords):
            category = "opportunities"
        elif VISIT.search(context) and ("visits" in spec["categories"] or relevant(context, keywords)):
            category = "visits"
        elif "funding" in spec["categories"] and FUND.search(title):
            category = "funding"
        elif spec["groups"] and NEWS.search(context):
            category = "news"
        if category and specific_page(url):
            seen.add(url)
            result.append({"url": url, "title": title, "category": category})
    return result[:8], max(0, len(result) - 8)


def candidate(link, spec, catalog, now):
    category, url = link["category"], link["url"]
    group = next((g for g in catalog.get("groups", []) if g["id"] in spec["groups"]), None)
    if category == "news":
        return "news", {"id": "link-" + digest(url)[:20], "title": link["title"], "url": url, "kind": "news",
                        "summary": "从课题组官网发现的相关链接，尚未核验内容与发布日期。", "publishedAt": None,
                        "checkedAt": None, "discoveredAt": stamp(now), "verification": "discovered-link",
                        "groupId": group["id"] if group else None, "groupName": group["name"] if group else spec["name"], "tags": ["待阅读"]}
    common = {"id": "discovered-" + digest(category + url)[:20], "title": link["title"], "url": url, "status": "check",
              "summary": "在官方来源发现的候选链接。开放状态、截止日期与个人资格尚未核验。", "fit": "待阅读原文确认研究主题与申请条件。",
              "deadline": None, "deadlineNote": "未自动推断申请时间。", "checkedAt": None, "discoveredAt": stamp(now),
              "firstSeenAt": stamp(now), "priority": "normal", "verification": "discovered-link", "tags": ["待复核"], "sourceUrl": spec["url"]}
    if category == "funding":
        return "funding", {**common, "region": "待确认", "hostRegions": [], "kind": "资助线索", "eligibility": "尚未核验，不能视为适合个人申请。"}
    return "opportunities", {**common, "institution": spec["name"], "country": group["country"] if group else "待确认",
                            "kind": "visit" if category == "visits" else "postdoc", "requirements": "请以官方完整公告为准；发现链接不代表存在有薪岗位。"}


def add_unique(catalog, collection, row):
    items = catalog.setdefault(collection, [])
    same = next((x for x in items if x.get("id") == row["id"] or x.get("url") and canonical(x["url"]) == canonical(row["url"])), None)
    if same:
        # Discovery never overwrites an already manually/structurally checked item.
        return False
    if collection != "news" and len(items) >= 1500:
        return False
    items.append(row)
    return True


def inspect(spec, previous, fetcher, allowed, keywords, now, budget_deadline=None):
    log = {"id": spec["id"], "url": spec["url"], "name": spec["name"], "categories": spec["categories"],
           "status": "failed", "httpStatus": None, "fetchedAt": stamp(now), "changed": False, "verifiedCount": 0, "discoveredCount": 0}
    try:
        if budget_deadline is not None and time.monotonic() >= budget_deadline:
            raise TimeoutError("Run time budget exceeded before source request")
        response = fetcher(spec["url"], previous, allowed)
        log["httpStatus"] = response["status"]
        if response["status"] == 304:
            if not previous.get("contentHash"):
                raise ValueError("304 received without a prior content baseline")
            prior_partial = previous.get("parseStatus") == "partial"
            log.update(status="partial" if prior_partial else "success", contentHash=previous["contentHash"], parseStatus="partial" if prior_partial else "unchanged",
                       parseErrors=previous.get("parseErrors", []), message="来源未变化；未延长内容核验时间，已有解析限制仍保留。")
            return log, {**previous, "lastFetchedAt": stamp(now)}, None, [], []
        if response["status"] != 200:
            raise ValueError("Unexpected HTTP status")
        body = response["body"]
        raw_hash = digest(body)
        if spec["api"]:
            rows, truncated = paper_records(body, now)
            log.update(status="success", contentHash=raw_hash, parseStatus="bibliographic-metadata", truncated=truncated,
                       message="最近90天按主题查询，每类最多30条；未自动认定团队归属。")
            page, links, job = None, [], None
            semantic_hash = raw_hash
        else:
            page = Page(body)
            semantic_hash = digest(page.text + json.dumps(page.jsonld, ensure_ascii=False, sort_keys=True))
            links, truncated = discovered_links(page, spec, allowed, keywords, response.get("url", spec["url"]))
            job = verified_job(page, response.get("url", spec["url"]), keywords, now, allowed) if "opportunities" in spec["categories"] else None
            rows = []
            log.update(status="partial" if page.errors else "success", contentHash=raw_hash, parseStatus="partial" if page.errors else "html",
                       parseErrors=page.errors, truncated=truncated, message="HTML抓取与变化监测；不等同开放状态核验。")
        log["changed"] = bool(previous.get("semanticHash") and previous["semanticHash"] != semantic_hash)
        saved = {"contentHash": raw_hash, "semanticHash": semantic_hash, "lastFetchedAt": stamp(now),
                 "etag": response.get("etag", ""), "lastModified": response.get("lastModified", ""),
                 "parseStatus": log["parseStatus"], "parseErrors": log.get("parseErrors", [])}
        return log, saved, job, links, rows
    except Exception as exc:
        message = str(exc)
        match = re.search(r"HTTP (\d{3})", message)
        log.update(error=clean(message, 300), parseStatus="failed")
        if match:
            log["httpStatus"] = int(match[1])
        return log, previous, None, [], []


def run_update(wrapper, config, state, *, now=None, environ=None, fetcher=fetch, max_seconds=300, workers=4, max_sources=140):
    fixed_clock = now is not None
    now = now or dt.datetime.now(UTC)
    if now.tzinfo is None:
        raise ValueError("Clock must include a timezone")
    env = environ if environ is not None else os.environ
    if not isinstance(wrapper, dict) or not isinstance(wrapper.get("catalog"), dict):
        raise ValueError("catalog.json must contain {catalog,update}")
    catalog = copy.deepcopy(wrapper["catalog"])
    for name in ("groups", "opportunities", "funding"):
        if not isinstance(catalog.get(name), list):
            raise ValueError("Missing catalog collection: " + name)
    update = copy.deepcopy(wrapper.get("update", {}))
    state = copy.deepcopy(state if isinstance(state, dict) else {})
    state.setdefault("sources", {})
    specs = build_sources(catalog, config, now, state)
    allowed = {urllib.parse.urlsplit(s["url"]).hostname for s in specs}
    allowed.update(urllib.parse.urlsplit(s.get("url", "")).hostname for s in config.get("verifiedInfrastructure", []))
    allowed.discard(None)
    keywords = [term for key in ("core", "optics", "methods") for term in config.get("keywords", {}).get(key, [])]
    logs, processed = [], set()
    deadline = time.monotonic() + max_seconds
    spec_map = {s["url"]: s for s in specs}
    followups = []

    def consume(spec, result):
        log, saved, job, links, papers = result
        logs.append(log)
        if log["status"] == "failed":
            old_state = state["sources"].get(spec["url"], {})
            state["sources"][spec["url"]] = {**old_state, "lastAttemptAt": stamp(now), "lastError": log.get("error", "Source failed"),
                                              "consecutiveFailures": old_state.get("consecutiveFailures", 0) + 1}
            return
        state["sources"][spec["url"]] = {**saved, "lastAttemptAt": stamp(now), "consecutiveFailures": 0}
        refs = set(tuple(x) for x in spec["refs"])
        # Mark every associated record stale on content change, except portals.
        if log["changed"]:
            for collection, identifier in refs:
                row = next((x for x in catalog.get(collection, []) if x["id"] == identifier), None)
                if row:
                    row["sourceChangedAt"] = stamp(now)
                    row["reviewReason"] = "官网内容变化，先前开放状态或条件需要复核。"
                    if row.get("status") != "portal":
                        row["status"] = "check"
            if spec["groups"]:
                group = next((x for x in catalog["groups"] if x["id"] in spec["groups"]), None)
                if group:
                    change = {"id": "change-" + digest(spec["url"] + saved["semanticHash"])[:20], "title": group["name"] + "：官网内容有变化",
                              "summary": "自动检测到页面正文或结构化数据变化，可能涉及项目、成员或页面编辑；具体学术内容需阅读原文。",
                              "url": spec["url"], "kind": "news", "groupId": group["id"], "groupName": group["name"], "publishedAt": None,
                              "checkedAt": None, "discoveredAt": stamp(now), "verification": "source-change", "tags": ["官网变化", "待阅读"]}
                    old_change = next((n for n in catalog.get("news", []) if n.get("verification") == "source-change" and n.get("url") == spec["url"]), None)
                    if old_change:
                        old_change.update(change)
                        log["discoveredCount"] += 1
                    elif add_unique(catalog, "news", change):
                        log["discoveredCount"] += 1
        for paper in papers:
            if add_unique(catalog, "news", paper):
                log["discoveredCount"] += 1
        if job:
            row = next((r for r in catalog["opportunities"] if canonical(r["url"]) == canonical(job["url"]) or canonical(r.get("applicationUrl") or r["url"]) == canonical(job["url"])
                        or r.get("kind") != "portal" and ("opportunities", r["id"]) in refs), None)
            if row:
                identifier = row["id"]
                row.update(job)
                row["id"] = identifier
            else:
                row = {"id": "job-" + digest(job["url"])[:20], **job, "discoveredAt": stamp(now), "firstSeenAt": stamp(now)}
                catalog["opportunities"].append(row)
            log["verifiedCount"] += 1
        for link in links:
            collection, row = candidate(link, spec, catalog, now)
            if add_unique(catalog, collection, row):
                log["discoveredCount"] += 1
            if link["category"] == "opportunities" and link["url"] not in spec_map:
                child = {"id": "src-" + digest(link["url"])[:16], "url": link["url"], "name": link["title"],
                         "categories": ["opportunities"], "refs": [(collection, row["id"])], "groups": [], "api": False}
                spec_map[link["url"]] = child
                followups.append(child)

    def batch(batch_specs):
        selected = []
        for spec in batch_specs:
            if spec["url"] in processed:
                continue
            processed.add(spec["url"])
            if len(processed) > max_sources or time.monotonic() >= deadline:
                logs.append({"id": spec["id"], "url": spec["url"], "name": spec["name"], "categories": spec["categories"], "status": "skipped",
                             "httpStatus": None, "fetchedAt": None, "message": "Run source/time limit reached; candidate queued", "parseStatus": "skipped", "changed": False,
                             "verifiedCount": 0, "discoveredCount": 0})
            else:
                selected.append(spec)
        with concurrent.futures.ThreadPoolExecutor(max_workers=max(1, min(workers, 8))) as pool:
            futures = {pool.submit(inspect, s, state["sources"].get(s["url"], {}), fetcher, allowed, keywords, now, deadline): s for s in selected}
            # Parse/merge deterministically in source order; network still runs in parallel.
            for future, spec in futures.items():
                consume(spec, future.result())
    batch(specs)
    batch(followups[:40])
    completed_at = stamp(now if fixed_clock else dt.datetime.now(UTC))
    # Avoid keeping unbounded old paper/news feeds; oldest entries are archived by git history.
    catalog["news"] = sorted(catalog.get("news", []), key=lambda n: n.get("discoveredAt") or n.get("publishedAt") or "", reverse=True)[:900]
    coverage = {}
    for cat in CATEGORIES:
        items = [x for x in logs if cat in x["categories"]]
        fetched = sum(x["status"] in ("success", "partial") for x in items)
        failed = sum(x["status"] == "failed" for x in items)
        queued = sum(x["status"] == "skipped" for x in items)
        status = "failed" if not fetched else "success" if all(x["status"] == "success" for x in items) else "partial"
        old = update.get("coverage", {}).get(cat, {})
        found, verified = sum(x["discoveredCount"] for x in items), sum(x["verifiedCount"] for x in items)
        coverage[cat] = {"status": status, "sourceCount": fetched, "sourceTotal": len(items), "fetchedCount": fetched, "failedCount": failed, "queuedCount": queued,
                         "changedCount": sum(x["changed"] for x in items), "discoveredCount": found, "verifiedCount": verified,
                         "lastAttemptAt": completed_at, "lastFetchSuccessAt": completed_at if fetched else old.get("lastFetchSuccessAt"),
                         "lastCompleteFetchAt": completed_at if status == "success" else old.get("lastCompleteFetchAt"),
                         "lastSuccessAt": old.get("lastSuccessAt"), "scope": "fetch-and-discovery",
                         "message": f"抓取 {fetched}/{len(items)} 个来源，发现 {found} 条，结构化核验 {verified} 条；HTML变化与新链接仍需复核。"}
    is_actions = env.get("GITHUB_ACTIONS") == "true"
    event = env.get("GITHUB_EVENT_NAME", "") if is_actions else "local"
    run_id = env.get("GITHUB_RUN_ID", "") if is_actions else ""
    attempt = env.get("GITHUB_RUN_ATTEMPT", "1") if is_actions else "1"
    if is_actions and (not run_id.isdigit() or not attempt.isdigit()):
        raise ValueError("GitHub Actions run identity is missing or invalid")
    revision = run_id + "-" + attempt if is_actions else str(uuid.uuid4())
    repo = env.get("GITHUB_REPOSITORY", "")
    server_url = env.get("GITHUB_SERVER_URL", "https://github.com").rstrip("/")
    run_url = server_url + "/" + repo + "/actions/runs/" + run_id if is_actions and server_url == "https://github.com" and re.fullmatch(r"[\w.-]+/[\w.-]+", repo) else None
    real_scheduled = is_actions and event == "schedule"
    success_count = sum(x["status"] in ("success", "partial") for x in logs)
    schedule = copy.deepcopy(update.get("schedule", {"enabled": False}))
    schedule.update(time="08:00", timezone="Asia/Shanghai")
    if not schedule.get("lastScheduledRunAt"):
        schedule["enabled"] = False
    if real_scheduled and success_count:
        schedule.update(enabled=True, lastScheduledRunAt=completed_at)
    history = update.get("history", []) if isinstance(update.get("history", []), list) else []
    summary = {"runId": revision, "checkedAt": completed_at, "event": event,
               "status": "failed" if any(x["status"] == "failed" for x in coverage.values()) else "partial" if any(x["status"] == "partial" for x in coverage.values()) else "success",
               "fetchedCount": success_count, "failedCount": sum(x["status"] == "failed" for x in logs), "queuedCount": sum(x["status"] == "skipped" for x in logs),
               "discoveredCount": sum(x["discoveredCount"] for x in logs), "verifiedCount": sum(x["verifiedCount"] for x in logs)}
    update.update(revision=revision, lastRunAt=completed_at, coverage=coverage, sources=logs, schedule=schedule,
                  verificationMode="conservative-source-monitoring", lastSuccessfulAt=update.get("lastSuccessfulAt"),
                  lastFetchSuccessfulAt=completed_at if all(x["status"] == "success" for x in coverage.values()) else update.get("lastFetchSuccessfulAt"),
                  execution={"engine": "github-actions" if is_actions else "local-python", "event": event, "runId": run_id or revision,
                             "runAttempt": attempt, "runUrl": run_url, "completedAt": completed_at, "scheduledEvent": real_scheduled},
                  history=[summary] + [x for x in history if x.get("runId") != revision][:29],
                  limitations=["只读取公开HTML和Europe PMC元数据，不执行网站JavaScript。", "访问与资助暂不自动解释资格和开放日期；新链接及变化进入待复核。",
                               "来源抓取成功不等于内容核验；未变化页面不延长既有条目的checkedAt。", "论文按主题检索最近90天每组最多30条，不能宣称覆盖全部论文或团队。"])
    state.update(schemaVersion=1, lastRunAt=completed_at, revision=revision)
    return {"catalog": catalog, "update": update}, state, 2 if summary["status"] == "failed" else 0


def read_json(path, fallback=None):
    if not path.exists() and fallback is not None:
        return fallback
    if path.stat().st_size > 15 * 1024 * 1024:
        raise ValueError("Local JSON exceeds 15 MiB")
    return json.loads(path.read_text(encoding="utf-8-sig"))


def atomic_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", dir=path.parent, prefix=".research-compass-", suffix=".tmp", delete=False) as file:
        temp = Path(file.name)
        json.dump(value, file, ensure_ascii=False, indent=2)
        file.write("\n")
    try:
        os.replace(temp, path)
    finally:
        if temp.exists():
            temp.unlink()


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--catalog", type=Path, required=True)
    parser.add_argument("--sources", type=Path, required=True)
    parser.add_argument("--state", type=Path, required=True)
    parser.add_argument("--max-seconds", type=int, default=300)
    parser.add_argument("--workers", type=int, default=4)
    args = parser.parse_args(argv)
    try:
        result, state, status = run_update(read_json(args.catalog), read_json(args.sources), read_json(args.state, {"sources": {}}),
                                           max_seconds=max(10, min(args.max_seconds, 1200)), workers=args.workers)
        # Publish catalog before advancing the hash baseline. If the second
        # local write fails, the next run may repeat an observation safely;
        # it must never skip a changed source whose catalog write was lost.
        atomic_json(args.catalog, result)
        atomic_json(args.state, state)
        print(json.dumps({"revision": result["update"]["revision"], "coverage": result["update"]["coverage"], "exitCode": status}, ensure_ascii=False))
        return status
    except Exception as exc:
        print("Research Compass update failed; inspect output revision and retained diagnostics: " + clean(exc, 300), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
