"""Offline fixtures: never access external services during tests."""
import copy
import datetime as dt
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

SPEC = importlib.util.spec_from_file_location("compass_update", Path(__file__).with_name("update.py"))
u = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(u)
NOW = dt.datetime(2026, 10, 13, 0, 0, tzinfo=dt.timezone.utc)
HOST = "research.example.edu"
ROOT = "https://" + HOST


def html_page(text="Stable official information about the research program and its scientific aims. Further details are available through the institutional office.", links="", ld=None):
    return '<html><head><title>Research program</title></head><body><main><p>' + text + '</p>' + links + (('<script type="application/ld+json">' + json.dumps(ld) + '</script>') if ld else '') + '</main></body></html>'


def fixture():
    catalog = {"groups": [{"id": "G01", "name": "Optics Lab", "country": "芬兰", "official": ROOT + "/group", "papers": []}],
               "opportunities": [
                   {"id": "job1", "url": ROOT + "/jobs/job-123", "title": "Old postdoc title", "kind": "postdoc", "status": "open", "checkedAt": "2026-10-12", "deadline": "2026-11-30"},
                   {"id": "visit1", "url": ROOT + "/visits/fellowship", "title": "Visit", "kind": "visit", "status": "open", "checkedAt": "2026-10-12"}],
               "funding": [{"id": "fund1", "url": ROOT + "/funding/grant", "title": "Funding", "status": "open", "checkedAt": "2026-10-12"}],
               "news": [], "english": {"lessons": ["unchanged"]}}
    wrapper = {"catalog": catalog, "update": {"schedule": {"enabled": False, "time": "08:00", "timezone": "Asia/Shanghai"}, "coverage": {}}}
    config = {"groupSources": [{"id": "G01", "name": "Optics Lab", "url": ROOT + "/group"}],
              "existingOpportunitySources": [{"id": x["id"], "url": x["url"], "kind": x["kind"]} for x in catalog["opportunities"]],
              "fundingSources": [{"id": "fund1", "url": ROOT + "/funding/grant"}], "verifiedInfrastructure": [],
              "keywords": {"core": ["hemodynamics"], "optics": ["photoplethysmography"], "methods": ["inverse problems"]}}
    return wrapper, config


def fake_fetch(pages=None, errors=None, conditional=False, calls=None):
    pages, errors = pages or {}, errors or {}
    def invoke(url, previous, allowed):
        if calls is not None:
            calls.append(url)
        if url in errors:
            raise RuntimeError(errors[url])
        if conditional and previous.get("contentHash"):
            return {"status": 304, "body": "", "url": url}
        if "europepmc" in url:
            value = pages.get("api", {"hitCount": 0, "resultList": {"result": []}})
            return {"status": 200, "body": value if isinstance(value, str) else json.dumps(value), "url": url}
        value = pages.get(url, html_page())
        if isinstance(value, dict):
            return value
        return {"status": 200, "body": value, "url": url, "etag": '"abc"'}
    return invoke


def job_data(**changes):
    value = {"@type": "JobPosting", "title": "Postdoctoral researcher in hemodynamics", "description": "Research in hemodynamics and computational cardiovascular modeling. Applicants should hold a PhD in engineering and demonstrate numerical methods research experience.",
             "datePosted": "2026-10-12", "validThrough": "2026-11-30", "hiringOrganization": {"name": "Example University"},
             "url": ROOT + "/jobs/job-123", "jobLocation": {"address": {"addressCountry": "FI"}}}
    value.update(changes)
    return value


def job_page(data=None, suffix=""):
    data = data or job_data()
    return html_page(data["title"] + ". " + data.get("description", "") + suffix, ld=data)


class UpdateTests(unittest.TestCase):
    def setUp(self):
        self.wrapper, self.config = fixture()

    def run_it(self, wrapper=None, state=None, now=NOW, **kwargs):
        return u.run_update(wrapper or self.wrapper, self.config, state or {"sources": {}}, now=now, environ=kwargs.pop("environ", {}), fetcher=kwargs.pop("fetcher", fake_fetch()), **kwargs)

    def test_http_200_creates_baseline_without_renewing_verified_status(self):
        result, state, code = self.run_it()
        self.assertEqual(code, 0)
        self.assertEqual(result["catalog"]["opportunities"][0]["checkedAt"], "2026-10-12")
        self.assertEqual(result["catalog"]["funding"][0]["checkedAt"], "2026-10-12")
        self.assertFalse(result["update"]["schedule"]["enabled"])
        self.assertIsNone(result["update"]["lastSuccessfulAt"])
        self.assertEqual(result["update"]["coverage"]["opportunities"]["verifiedCount"], 0)
        self.assertTrue(state["sources"][ROOT + "/group"]["contentHash"])
        self.assertEqual(result["catalog"]["english"], self.wrapper["catalog"]["english"])

    def test_changed_source_marks_only_associated_records_check(self):
        first, state, _ = self.run_it()
        result, _, _ = self.run_it(first, state, fetcher=fake_fetch({ROOT + "/funding/grant": html_page("The funding eligibility rules and the application cycle have now changed. Consult this official announcement before applying to the next round.")}))
        self.assertEqual(result["catalog"]["funding"][0]["status"], "check")
        self.assertEqual(result["catalog"]["funding"][0]["checkedAt"], "2026-10-12")
        self.assertEqual(result["catalog"]["opportunities"][0]["status"], "open")

    def test_unchanged_304_never_renews_checks_or_erases_parse_warning(self):
        broken = html_page() + '<script type="application/ld+json">{broken}</script>'
        first, state, _ = self.run_it(fetcher=fake_fetch({ROOT + "/jobs/job-123": broken}))
        result, _, _ = self.run_it(first, state, fetcher=fake_fetch(conditional=True))
        row = next(x for x in result["update"]["sources"] if x["url"] == ROOT + "/jobs/job-123")
        self.assertEqual(row["status"], "partial")
        self.assertEqual(result["catalog"]["opportunities"][0]["checkedAt"], "2026-10-12")

    def test_source_failures_preserve_catalog_and_record_http_status(self):
        result, state, code = self.run_it(fetcher=fake_fetch(errors={ROOT + "/funding/grant": "HTTP 429"}))
        self.assertEqual(code, 2)
        self.assertEqual(result["catalog"]["funding"], self.wrapper["catalog"]["funding"])
        self.assertEqual(result["update"]["coverage"]["funding"]["status"], "failed")
        row = next(x for x in result["update"]["sources"] if x["url"] == ROOT + "/funding/grant")
        self.assertEqual(row["httpStatus"], 429)
        self.assertEqual(state["sources"][row["url"]]["consecutiveFailures"], 1)

    def test_valid_specific_visible_postdoc_metadata_updates_existing_id(self):
        result, _, _ = self.run_it(fetcher=fake_fetch({ROOT + "/jobs/job-123": job_page()}))
        row = result["catalog"]["opportunities"][0]
        self.assertEqual(row["id"], "job1")
        self.assertEqual(row["status"], "open")
        self.assertEqual(row["checkedAt"], "2026-10-13T00:00:00Z")
        self.assertEqual(row["verification"], "structured-jobposting")
        self.assertEqual(result["update"]["coverage"]["opportunities"]["verifiedCount"], 1)

    def test_job_metadata_rejects_student_unrelated_future_bad_dates_and_index(self):
        allowed, terms = {HOST}, ["hemodynamics"]
        variants = [job_data(title="PhD student in hemodynamics"), job_data(title="Postdoctoral researcher or PhD student in hemodynamics"), job_data(title="Postdoctoral researcher in history", description="History. " * 40),
                    job_data(datePosted="2026-10-14"), job_data(validThrough="2026-02-30"), job_data(validThrough=None), job_data(hiringOrganization={})]
        for value in variants:
            with self.subTest(value=value):
                self.assertIsNone(u.verified_job(u.Page(job_page(value)), ROOT + "/jobs/job-123", terms, NOW, allowed))
        self.assertIsNone(u.verified_job(u.Page(job_page()), ROOT + "/jobs", terms, NOW, allowed))
        self.assertIsNone(u.verified_job(u.Page(html_page(ld=job_data())), ROOT + "/jobs/job-123", terms, NOW, allowed))

    def test_exact_expiry_and_contradictory_closed_text_never_open(self):
        expired = job_data(validThrough="2026-10-12T23:30:00Z")
        row = u.verified_job(u.Page(job_page(expired)), ROOT + "/jobs/job-123", ["hemodynamics"], NOW, {HOST})
        self.assertEqual(row["status"], "closed")
        row = u.verified_job(u.Page(job_page(suffix=" Applications are closed.")), ROOT + "/jobs/job-123", ["hemodynamics"], NOW, {HOST})
        self.assertEqual(row["status"], "check")

    def test_future_exact_deadline_is_not_closed_by_beijing_calendar_rollover(self):
        clock = dt.datetime(2026, 10, 13, 16, 0, tzinfo=dt.timezone.utc)
        value = job_data(validThrough="2026-10-13T23:59:59Z")
        row = u.verified_job(u.Page(job_page(value)), ROOT + "/jobs/job-123", ["hemodynamics"], clock, {HOST})
        self.assertEqual(row["status"], "open")
        self.assertEqual(row["deadline"], "2026-10-14")
        self.assertEqual(row["deadlineAt"], "2026-10-13T23:59:59Z")

    def test_discovery_does_not_create_open_funding_or_visit(self):
        pages = {ROOT + "/funding/grant": html_page(links='<a href="/funding/new-call">New fellowship application call</a>'),
                 ROOT + "/visits/fellowship": html_page(links='<a href="/visits/new-fellowship">Visiting researcher fellowship in optics</a>')}
        result, _, _ = self.run_it(fetcher=fake_fetch(pages))
        fund, visit = result["catalog"]["funding"][-1], result["catalog"]["opportunities"][-1]
        self.assertEqual(fund["status"], "check")
        self.assertEqual(visit["status"], "check")
        self.assertIsNone(fund["checkedAt"])
        self.assertIsNone(visit["deadline"])

    def test_redirect_relative_links_resolve_at_final_page(self):
        response = {"status": 200, "url": ROOT + "/research/group/", "body": html_page(links='<a href="news/project-1">New research project in optics</a>')}
        result, _, _ = self.run_it(fetcher=fake_fetch({ROOT + "/group": response}))
        self.assertEqual(result["catalog"]["news"][0]["url"], ROOT + "/research/group/news/project-1")

    def test_europepmc_records_have_dates_deduplicate_and_no_invented_group(self):
        api = {"hitCount": 1, "resultList": {"result": [{"id": "123", "source": "MED", "title": "Flow study", "doi": "10.1/test", "firstPublicationDate": "2026-10-12", "abstractText": "<p>Validated numerical result.</p>"}]}}
        result, _, _ = self.run_it(fetcher=fake_fetch({"api": api}))
        self.assertEqual(len(result["catalog"]["news"]), 1)
        self.assertNotIn("groupId", result["catalog"]["news"][0])
        self.assertEqual(result["catalog"]["news"][0]["publishedAt"], "2026-10-12")
        self.assertNotIn("<p>", result["catalog"]["news"][0]["summary"])

    def test_api_parse_failure_and_challenge_html_are_source_failures(self):
        result, _, _ = self.run_it(fetcher=fake_fetch({"api": "{wrong-json}", ROOT + "/group": '<html><title>Just a moment</title><body>' + 'Browser verification ' * 30 + '</body></html>'}))
        self.assertEqual(result["update"]["coverage"]["news"]["status"], "failed")

    def test_source_change_card_updates_again_without_losing_other_news(self):
        first, state, _ = self.run_it()
        second, state, _ = self.run_it(first, state, fetcher=fake_fetch({ROOT + "/group": html_page("Changed research project information. " * 5)}))
        tomorrow = NOW + dt.timedelta(days=1)
        third, _, _ = self.run_it(second, state, now=tomorrow, fetcher=fake_fetch({ROOT + "/group": html_page("Another research project information update. " * 5)}))
        changes = [n for n in third["catalog"]["news"] if n.get("verification") == "source-change"]
        self.assertEqual(len(changes), 1)
        self.assertEqual(changes[0]["discoveredAt"], "2026-10-14T00:00:00Z")

    def test_news_cap_keeps_accepting_newest_papers(self):
        self.wrapper["catalog"]["news"] = [{"id": "old-" + str(i), "url": ROOT + "/old/" + str(i), "discoveredAt": "2026-01-01T00:00:00Z"} for i in range(900)]
        api = {"hitCount": 1, "resultList": {"result": [{"id": "999", "source": "MED", "title": "Newest paper", "firstPublicationDate": "2026-10-12"}]}}
        result, _, _ = self.run_it(fetcher=fake_fetch({"api": api}))
        self.assertEqual(len(result["catalog"]["news"]), 900)
        self.assertEqual(result["catalog"]["news"][0]["title"], "Newest paper")

    def test_source_budget_keeps_apis_and_rotates_failed_candidates(self):
        for i in range(20):
            self.wrapper["catalog"]["opportunities"].append({"id": "candidate-" + str(i), "url": ROOT + "/jobs/candidate-" + str(i), "title": "Candidate", "kind": "postdoc", "status": "check", "discoveredAt": "2026-10-12"})
        calls = []
        first, state, _ = self.run_it(fetcher=fake_fetch(errors={ROOT + "/jobs/candidate-0": "HTTP 404"}, calls=calls), max_sources=8)
        self.assertEqual(sum("europepmc" in x for x in calls), 3)
        self.assertIn(ROOT + "/jobs/candidate-0", calls)
        calls.clear()
        self.run_it(first, state, now=NOW + dt.timedelta(days=1), fetcher=fake_fetch(calls=calls), max_sources=8)
        self.assertIn(ROOT + "/jobs/candidate-1", calls)
        self.assertNotIn(ROOT + "/jobs/candidate-0", calls)

    def test_only_successful_real_schedule_event_enables_schedule(self):
        env = {"GITHUB_ACTIONS": "true", "GITHUB_EVENT_NAME": "workflow_dispatch", "GITHUB_RUN_ID": "123", "GITHUB_RUN_ATTEMPT": "2", "GITHUB_REPOSITORY": "Shawn-W-Ri/Physics_Ai"}
        result, _, _ = self.run_it(environ=env)
        self.assertFalse(result["update"]["schedule"]["enabled"])
        self.assertEqual(result["update"]["revision"], "123-2")
        env["GITHUB_EVENT_NAME"] = "schedule"
        result, _, _ = self.run_it(environ=env)
        self.assertTrue(result["update"]["schedule"]["enabled"])
        self.assertEqual(result["update"]["execution"]["runUrl"], "https://github.com/Shawn-W-Ri/Physics_Ai/actions/runs/123")
        def fail(*args):
            raise RuntimeError("No network")
        result, _, code = self.run_it(environ=env, fetcher=fail)
        self.assertFalse(result["update"]["schedule"]["enabled"])
        self.assertEqual(code, 2)

    def test_partial_fetch_records_recent_success_separately_from_verification(self):
        result, _, _ = self.run_it(fetcher=fake_fetch(errors={ROOT + "/group": "HTTP 403"}))
        row = result["update"]["coverage"]["news"]
        self.assertEqual(row["status"], "partial")
        self.assertEqual(row["lastFetchSuccessAt"], "2026-10-13T00:00:00Z")
        self.assertIsNone(row["lastCompleteFetchAt"])
        self.assertIsNone(row["lastSuccessAt"])

    def test_https_and_allowlist_guard_rejects_private_credentials_and_lookalikes(self):
        for url in ["http://" + HOST, "https://127.0.0.1/x", "https://user:pass@" + HOST, "https://" + HOST + ".evil.org/x", "https://" + HOST + ":8443/x", "https://host.local/x"]:
            with self.subTest(url=url), self.assertRaises(ValueError):
                u.safe_url(url, {HOST})
        with patch.object(u.socket, "getaddrinfo", return_value=[(None, None, None, None, ("10.0.0.1", 443))]):
            with self.assertRaises(ValueError):
                u.safe_url(ROOT, {HOST}, resolve=True)

    def test_robots_disallow_is_not_bypassed_and_robots_server_failure_is_reported(self):
        client = u.HTTPClient()
        with patch.object(u, "raw_fetch", return_value={"body": "User-agent: *\nDisallow: /jobs/"}) as network:
            with self.assertRaisesRegex(ValueError, "Robots"):
                client(ROOT + "/jobs/job-123", {}, {HOST})
            self.assertEqual(network.call_count, 1)
        with patch.object(u, "raw_fetch", side_effect=RuntimeError("HTTP 503")):
            with self.assertRaisesRegex(ValueError, "Robots policy unavailable"):
                u.HTTPClient()(ROOT + "/group", {}, {HOST})

    def test_atomic_json_preserves_unicode_and_no_partial_files(self):
        with tempfile.TemporaryDirectory(dir=Path(__file__).parent) as directory:
            path = Path(directory) / "catalog.json"
            u.atomic_json(path, {"title": "研途"})
            self.assertEqual(u.read_json(path)["title"], "研途")
            self.assertEqual(len(list(Path(directory).iterdir())), 1)


if __name__ == "__main__":
    unittest.main()
