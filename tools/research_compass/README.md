# Research Compass source monitor

Python 3.10+ standard library only. No account credentials, paid API, model API,
browser driver, or JavaScript execution is required by `update.py`.

Run from the repository root:

```sh
python tools/research_compass/update.py --catalog research-compass/catalog.json --sources tools/research_compass/sources.json --state _data/research-compass-source-state.json
python -m unittest discover -s tools/research_compass -p 'test_*.py' -v
```

`catalog.json` must contain `{ "catalog": { ... }, "update": { ... } }`. The source
state contains hashes, request timestamps, validators and short errors. It never
stores full source pages, cookies, credentials or secrets. `_data` is omitted from
the generated Jekyll site, but files committed there remain publicly readable in
this public GitHub repository.

## What is and is not automatic

- Europe PMC: three research-topic queries, recent 90 days, at most 30 results per
  query. Records are deduplicated by DOI/source identifier. Publication dates are
  preserved. Author names alone never establish research-group affiliation.
- Group, opportunity, visit and funding pages: readable HTML/JSON-LD monitoring,
  normalized-content hashes, related-link discovery and source-level errors.
- Initial HTTP 200 only establishes a baseline. Neither HTTP 200 nor 304 renews
  a record's `checkedAt`. A changed associated page makes the record `check`
  (portals remain portals), until verified structured evidence is available.
- New unstructured opportunities, visits and funding calls are `check`, with
  unknown dates. They are not highlighted as verified open opportunities.
- A single specific JobPosting can be extracted only if its visible title,
  explicit postdoc/research-fellow seniority, relevant scientific keywords,
  organization and valid dates match. Student positions, generic indexes,
  malformed metadata and contradictory closure text cannot become open jobs.
  This is source-metadata verification, not a judgment of personal eligibility.
- Precise deadlines retain `deadlineAt` with a timezone; `deadline` is its Beijing
  display date. Date-only deadlines become `check` on the deadline day because
  their exact timezone/time is unverified.
- Visits and funding eligibility/open status are not semantically interpreted by
  this dependency-free monitor. Their source changes and candidate links remain
  visible for review. No claim is made to cover all worldwide announcements.

## Reliability and limits

Only HTTPS approved source hosts/subdomains are fetched; credentials, literal IP
addresses, private DNS destinations and unapproved redirects are rejected.
Robots rules are checked, per-origin requests are serialized, and explicit long
crawl delays stop the source request. HTTP 403/429/5xx, access challenges,
JavaScript-only pages and parse failures remain failures; no access bypass is
attempted. Redirect-relative links use the final page/base URL.

Requests have a 12-second socket timeout and bounded body reads (2 MiB; robots
256 KiB). Four workers, a 300-second soft run budget and 140 source attempts are
the defaults. DNS resolution is subject to the operating system; the workflow's
job timeout is the final wall-time guard. Fixed sources/API queries precede
candidate pages; candidates rotate using last attempt times, including failures.
Deferred sources are `skipped`, not claimed fetched. Only one level of up to 40
new job-page follow-ups is attempted per run. At most 900 latest news items are
retained; earlier snapshots remain in Git history. Opportunity/funding discovery
is capped at 1,500 records per collection.

All failed sources preserve old catalog content and successful hashes.
`lastFetchSuccessAt` indicates at least one successful source fetch in a category;
`lastCompleteFetchAt` requires every scheduled source in that category to succeed.
Neither updates `lastSuccessAt`, which is reserved for full content verification.
Counts distinguish fetched, changed, discovered and structurally verified items.

An actual GitHub `schedule` event with at least one successful source fetch records
`schedule.enabled=true` and `lastScheduledRunAt`. Local, push and manual runs do not
create that evidence. This records an observed scheduled run, not a guarantee
that GitHub has not subsequently disabled the workflow. `execution` and the run
URL identify the actual execution; the revision is `GITHUB_RUN_ID-RUN_ATTEMPT`.

Exit codes: `0` = at least one source fetched in every category (partial failures
may still exist); `2` = a complete category failed, with previous content and
failure logs saved; `1` = configuration/file-processing failure. The workflow
should preserve resulting diagnostics and then report failure for nonzero exits.

## GitHub workflow and publication

The workflow schedules daily execution at 00:00 UTC (08:00 Asia/Shanghai), accepts
`workflow_dispatch`, and runs on pushes to `main` that change its own workflow
file or `tools/research_compass/**`. Generated catalog/state files are excluded
from the push paths, so the workflow's data commit does not recursively start
another update. A qualifying push can verify the first cloud execution; it does
not establish that a scheduled event has occurred.

Published revision verification defaults to
`https://www.aiphysics.me/research-compass/catalog.json`. No repository variable
is required. Set the optional `RESEARCH_COMPASS_PUBLIC_URL` repository variable
only when overriding that address, such as after a domain or path migration.
Readback must match the current run's `update.revision`; a successful fetch of
an older catalog does not prove that the new data was published.

Keep the existing hosting integration and verify that its production deployment
builds the generated data commit. The included Jekyll `_config.yml` preserves
the site's navigation/exclusions, adds the Research Compass entry and excludes
development files. It uses the custom domain with an empty `baseurl`. Merge later
configuration updates with the current repository instead of replacing unrelated
site settings. See `RESEARCH_COMPASS_INTEGRATION.md` for deployment checks.

## Validation

Offline fixtures test real parsing/merge paths, deadline timezones, invalid
metadata, 304, HTTP errors, robots rejection, link bases, source changes,
deduplication, bounded rotating discovery and schedule provenance. They do not
establish live source availability, authenticated GitHub write permission or
Vercel publication. Those require one real workflow run plus published revision
readback before calling the installation operational.
