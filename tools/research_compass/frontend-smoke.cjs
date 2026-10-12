// Run from any directory with Node.js. Uses a minimal DOM fixture, not a browser.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const publicDir = path.resolve(__dirname, '../../research-compass');
const read = name => fs.readFileSync(path.join(publicDir, name), 'utf8');
const published = JSON.parse(read('catalog.json'));
const clone = value => JSON.parse(JSON.stringify(value));
const categories = ['news', 'opportunities', 'visits', 'funding'];
const stamp = new Date().toISOString();
const date = stamp.slice(0, 10);
const future = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);

function updateFixture(overrides = {}) {
  return {
    lastRunAt: null,
    lastSuccessfulAt: null,
    lastFetchSuccessfulAt: null,
    coverage: Object.fromEntries(categories.map(key => [key, {
      status: 'pending', lastAttemptAt: null, lastSuccessAt: null,
      lastFetchSuccessAt: null, sourceCount: 0, sourceTotal: 0,
      fetchedCount: 0, verifiedCount: 0, message: '尚未执行来源抓取。'
    }])),
    schedule: {enabled: false, time: '08:00', timezone: 'Asia/Shanghai', lastScheduledRunAt: null},
    history: [], execution: null,
    ...overrides
  };
}

function harness(payload, {fail = false, protocol = 'https:', now = null} = {}) {
  const nodes = new Map(), handlers = {}, records = new Map(), requests = [], timers = new Set();
  let failure = fail;
  const Clock = now ? class extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return Date.parse(now); }
  } : Date;
  function node(id) {
    if (!nodes.has(id)) nodes.set(id, {
      innerHTML: '', textContent: '', value: '',
      classList: {add() {}, remove() {}, toggle() {}},
      setAttribute() {}, focus() {}, setSelectionRange() {},
      addEventListener(name, fn) { this[name] = fn; },
      showModal() { this.open = true; }, close() { this.open = false; }
    });
    return nodes.get(id);
  }
  const ctx = {
    console, URL, URLSearchParams, Intl, Date: Clock, AbortController, Blob, structuredClone,
    setTimeout(fn, ms) { const id = setTimeout(fn, ms); timers.add(id); return id; },
    clearTimeout(id) { clearTimeout(id); timers.delete(id); },
    localStorage: {getItem(k) { return records.get(k) || null; }, setItem(k, v) { records.set(k, v); }},
    location: {hash: '', protocol, pathname: '/Physics_Ai/research-compass/', search: ''},
    navigator: {},
    document: {
      querySelector: node, querySelectorAll() { return []; },
      addEventListener(name, fn) { handlers[name] = fn; },
      createElement() { return {innerHTML: '', textContent: '', click() {}}; }
    },
    fetch: async (input) => {
      requests.push(String(input));
      if (String(input) !== './catalog.json' || failure) throw new Error('fixture offline');
      return {ok: true, json: async () => clone(payload)};
    },
    addEventListener() {}, scrollTo() {}
  };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const name of ['data.js', 'core.js', 'app.js']) vm.runInContext(read(name), ctx, {filename: name});
  return {
    ctx, node, handlers, records, requests,
    async settle() { await new Promise(resolve => setImmediate(resolve)); },
    click(action, id, extra = {}) {
      handlers.click({target: {closest(selector) { return selector === '[data-action]' ? {dataset: {action, id, ...extra}} : null; }}});
    },
    nav(page) {
      handlers.click({target: {closest(selector) { return selector === '[data-page]' ? {dataset: {page}} : null; }}});
    },
    html() { return node('#main').innerHTML; },
    has(text) { assert.ok(node('#main').innerHTML.includes(text), 'Expected rendered text: ' + text); },
    failsNow() { failure = true; },
    close() { for (const id of timers) clearTimeout(id); }
  };
}

async function run() {
  assert.ok(published.catalog && published.update, 'The static data uses the catalog/update wrapper.');
  assert.ok(published.catalog.groups.length > 0);
  assert.equal(published.catalog.english.lessons.length, 30);
  for (const key of categories) assert.ok(published.update.coverage[key], 'Missing coverage: ' + key);
  const fallback = {window: {}};
  vm.runInNewContext(read('data.js'), fallback);
  assert.equal(published.catalog.checkedAt, fallback.window.RESEARCH_DATA.checkedAt,
    'Source fetching must not replace the original catalog review date.');
  const coreContext = {window: {}, Intl, Date};
  vm.runInNewContext(read('core.js'), coreContext);
  const core = coreContext.window.ResearchCore;
  const clockNow = '2026-10-13T16:00:00Z', beijingToday = '2026-10-14';
  const precise = {status: 'open', deadline: '2026-10-13', deadlineAt: '2026-10-13T23:59:59Z', checkedAt: '2026-10-13', deadlineNote: 'Official deadline: 23:59:59 UTC.'};
  assert.equal(core.status(precise, beijingToday, clockNow), 'open', 'A UTC deadline later tonight must not close at Beijing midnight.');
  assert.equal(core.deadlineDay(precise), beijingToday);
  assert.equal(core.urgent(precise, beijingToday, clockNow), true);
  assert.equal(core.status(precise, beijingToday, '2026-10-13T23:59:59Z'), 'closed', 'A precise deadline expires at the stated instant.');
  assert.equal(core.status({...precise, deadlineAt: '2026-10-14T01:00:00+02:00'}, beijingToday, clockNow), 'open');
  assert.equal(core.status({...precise, deadline: '2026-10-20', deadlineAt: '2026-10-13T15:59:59Z'}, beijingToday, clockNow), 'closed', 'Precise expiration takes precedence over a conflicting date-only value.');
  assert.equal(core.status({...precise, deadlineType: 'priority'}, beijingToday, '2026-10-14T00:00:00Z'), 'check');
  assert.equal(core.status({...precise, deadlineNote: 'Priority review date'}, beijingToday, '2026-10-14T00:00:00Z'), 'check');
  assert.equal(core.status({...precise, deadlineAt: null}, beijingToday, clockNow), 'closed', 'Previously verified date-only items retain their existing expiry rule.');
  assert.equal(core.status({...precise, deadlineAt: null, status: 'check'}, beijingToday, clockNow), 'check', 'An uncertain date-only candidate must remain pending review.');
  assert.equal(core.status({...precise, deadlineAt: null, deadlineType: 'priority'}, beijingToday, clockNow), 'check');
  assert.equal(core.status({...precise, deadlineAt: null, deadline: beijingToday}, beijingToday, clockNow), 'open');
  assert.equal(core.deadlineInstant({...precise, deadlineAt: '2026-10-13T23:59:59'}), null, 'An instant without a timezone must not be guessed.');

  const html = read('index.html');
  assert.ok(html.startsWith('<!doctype html>'), 'Standalone HTML has no Jekyll front matter.');
  assert.ok(html.includes('href="../"'), 'The home link works with a GitHub project prefix.');
  for (const relative of ['./styles.css', './app.js', './core.js', './data.js', './manifest.webmanifest']) assert.ok(html.includes(relative));
  const manifest = JSON.parse(read('manifest.webmanifest'));
  assert.equal(manifest.start_url, './'); assert.equal(manifest.scope, './');
  assert.ok(manifest.icons.every(icon => icon.src.startsWith('./')));
  assert.ok(!read('app.js').includes('/api/catalog'), 'No unavailable application backend is required.');

  const canonical = html.match(/<script id="canonical-directory">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(canonical, 'The no-trailing-slash entry is normalized before asset loading.');
  for (const pathname of ['/research-compass', '/Physics_Ai/research-compass']) {
    let redirected = '';
    vm.runInNewContext(canonical, {window: {location: {pathname, search: '?from=home', hash: '#english', replace(v) { redirected = v; }}}});
    assert.equal(redirected, pathname + '/?from=home#english');
  }
  for (const pathname of ['/research-compass/', '/Physics_Ai/research-compass/', '/research-compass/index.html']) {
    let redirected = false;
    vm.runInNewContext(canonical, {window: {location: {pathname, search: '', hash: '', replace() { redirected = true; }}}});
    assert.equal(redirected, false);
  }

  const seed = harness({catalog: clone(published.catalog), update: updateFixture()});
  try {
    await seed.settle();
    seed.has('目录已载入'); seed.has('尚无定时运行证据'); seed.has('尚无来源抓取成功记录');
    assert.ok(!seed.html().includes('任务已启用'));
    assert.equal(seed.requests.filter(x => x === './catalog.json').length, 1);
    seed.click('show-groups');
    assert.equal((seed.html().match(/class="card group-card"/g) || []).length, published.catalog.groups.length);
    seed.nav('opportunities'); seed.has('机会清单');
    seed.nav('funding'); seed.has('资助清单');
    seed.nav('english'); seed.has('DAY 01 / 30');
    seed.click('mark-done'); seed.has('今天已练习');
    seed.click('pick-lesson', '29'); seed.has('DAY 30 / 30');
    seed.click('english-tab', 'intro'); seed.has('完整介绍');
    seed.click('english-tab', 'questions');
    assert.equal((seed.html().match(/class="card question-card"/g) || []).length, 12);
    seed.click('settings'); assert.equal(seed.node('#settingsDialog').open, true);
    assert.ok(seed.node('#settingsBody').innerHTML.includes('不会自动同步'));
  } finally { seed.close(); }

  const falseSchedule = harness({catalog: clone(published.catalog), update: updateFixture({
    schedule: {enabled: true, time: '08:00', timezone: 'Asia/Shanghai', lastScheduledRunAt: null}
  })});
  try {
    await falseSchedule.settle(); falseSchedule.has('尚无实际定时运行证据');
    assert.ok(!falseSchedule.html().includes('已有定时运行证据'));
  } finally { falseSchedule.close(); }

  const catalog = clone(published.catalog);
  catalog.news = [
    ...Array.from({length: 8}, (_, i) => ({id: `paper-${i}`, title: `SAME BATCH PAPER ${i}`, summary: 'Bibliographic metadata.', url: `https://example.org/paper-${i}`, publishedAt: date, discoveredAt: stamp, checkedAt: stamp, kind: 'paper'})),
    {id: 'test-news', title: 'TEAM SOURCE CHANGE', summary: 'HTML content changed; review required.', url: 'https://example.org/news', groupId: 'G01', publishedAt: null, discoveredAt: stamp, checkedAt: null, kind: 'news', verification: 'source-change'}
  ];
  catalog.opportunities = [
    {id: 'open-test', title: 'OPEN IMPORTANT OPPORTUNITY', kind: 'postdoc', status: 'open', priority: 'high', deadline: future, checkedAt: date, tags: [], url: 'https://example.org/job'},
    {id: 'review-test', title: 'CANDIDATE REQUIRES REVIEW', kind: 'postdoc', status: 'check', priority: 'high', deadline: future, checkedAt: date, sourceChangedAt: stamp, reviewReason: 'Job page changed: confirm the application requirements.', tags: [], url: 'https://example.org/candidate'},
    {id: 'closed-test', title: 'CLOSED NOT HIGHLIGHTED', kind: 'visit', status: 'closed', priority: 'high', deadline: future, checkedAt: date, tags: [], url: 'https://example.org/closed'}
  ];
  catalog.funding = [{id: 'fund-review', title: 'FUNDING CHANGE REVIEW', kind: 'fellowship', region: 'Europe', status: 'check', checkedAt: date, sourceChangedAt: stamp, reviewReason: 'Funding page changed: confirm the eligibility rules.', tags: [], url: 'https://example.org/funding'}];
  const fetchedUpdate = updateFixture({lastRunAt: stamp, coverage: Object.fromEntries(categories.map(key => [key, {
    status: 'success', sourceCount: 2, fetchedCount: 2, sourceTotal: 2,
    lastFetchSuccessAt: stamp, lastSuccessAt: null, message: '抓取2/2；HTML变化待人工复核。'
  }]))});
  const loaded = harness({catalog, update: fetchedUpdate});
  try {
    await loaded.settle(); loaded.has('目录已载入'); loaded.has('TEAM SOURCE CHANGE');
    const firstNews = loaded.html().split('<article class="card news-card">')[1].split('</article>')[0];
    assert.ok(firstNews.includes('TEAM SOURCE CHANGE'), 'A newly discovered team change must remain visible ahead of papers from the same batch.');
    assert.ok(firstNews.includes('发布日期未提供')); assert.ok(firstNews.includes('发现 '));
    assert.ok(!firstNews.includes('发表 '), 'Discovery time must not be presented as publication time.');
    assert.equal((loaded.html().match(/class="card news-card"/g) || []).length, 6);
    loaded.has('最近来源抓取'); loaded.has('暂无新增内容核验成功记录'); loaded.has('OPEN IMPORTANT OPPORTUNITY');
    assert.ok(!loaded.html().includes('CANDIDATE REQUIRES REVIEW'));
    assert.ok(!loaded.html().includes('CLOSED NOT HIGHLIGHTED'));
    assert.equal((loaded.html().match(/class="coverage-item"/g) || []).length, 4);
    loaded.nav('opportunities'); loaded.has('CANDIDATE REQUIRES REVIEW'); loaded.has('待复核');
    loaded.has('来源变化'); loaded.has('Job page changed: confirm the application requirements.');
    assert.ok(!loaded.html().includes('已核验开放'));
    loaded.nav('funding'); loaded.has('来源变化'); loaded.has('Funding page changed: confirm the eligibility rules.');
    loaded.nav('english'); loaded.click('mark-done');
    const savedRecord = loaded.records.get('research-compass-v1');
    loaded.failsNow(); loaded.click('sync-catalog'); await loaded.settle();
    loaded.nav('research'); loaded.has('目录暂不可达'); loaded.has('TEAM SOURCE CHANGE');
    assert.equal(loaded.records.get('research-compass-v1'), savedRecord);
  } finally { loaded.close(); }

  const orderedCatalog = clone(catalog);
  orderedCatalog.news = [
    {id: 'old-discovery', title: 'OLDER DISCOVERY', kind: 'news', url: 'https://example.org/older', publishedAt: null, discoveredAt: '2001-01-01T12:00:00Z'},
    {id: 'fallback-publication', title: 'PUBLICATION DATE FALLBACK', kind: 'paper', url: 'https://example.org/fallback', publishedAt: '2020-01-01', discoveredAt: null},
    {id: 'new-discovery', title: 'NEW DISCOVERY OLD PUBLICATION', kind: 'paper', url: 'https://example.org/new', publishedAt: '1999-01-01', discoveredAt: '2025-01-01T12:00:00Z'}
  ];
  const ordered = harness({catalog: orderedCatalog, update: fetchedUpdate});
  try {
    await ordered.settle(); const view = ordered.html();
    assert.ok(view.indexOf('NEW DISCOVERY OLD PUBLICATION') < view.indexOf('PUBLICATION DATE FALLBACK'));
    assert.ok(view.indexOf('PUBLICATION DATE FALLBACK') < view.indexOf('OLDER DISCOVERY'));
  } finally { ordered.close(); }

  const preciseCatalog = clone(catalog);
  preciseCatalog.opportunities = [{...precise, id: 'timezone-deadline', title: 'EXACT UTC DEADLINE', kind: 'postdoc', tags: [], url: 'https://example.org/utc'}];
  preciseCatalog.funding = [];
  const preciseUi = harness({catalog: preciseCatalog, update: fetchedUpdate}, {now: clockNow});
  try {
    await preciseUi.settle(); preciseUi.has('EXACT UTC DEADLINE'); preciseUi.has('今天截止');
    preciseUi.nav('opportunities'); preciseUi.has('2026/10/14'); preciseUi.has('07:59'); preciseUi.has('北京时间');
    preciseUi.has('Official deadline: 23:59:59 UTC.'); preciseUi.has('标记为开放');
    assert.ok(!preciseUi.html().includes('该截止时间已过'));
  } finally { preciseUi.close(); }

  const realSchedule = harness({catalog, update: {...fetchedUpdate,
    schedule: {enabled: true, time: '08:00', timezone: 'Asia/Shanghai', lastScheduledRunAt: stamp},
    execution: {engine: 'github-actions', scheduledEvent: true, completedAt: stamp, runId: 'test-123'}
  }});
  try { await realSchedule.settle(); realSchedule.has('已有定时运行证据'); } finally { realSchedule.close(); }

  for (const options of [{fail: true}, {protocol: 'file:'}]) {
    const offline = harness(published, options);
    try {
      await offline.settle(); offline.has('当前使用内置资料');
      offline.nav('english'); offline.has('DAY 01 / 30');
      assert.ok(!offline.html().includes('已有定时运行证据'));
      if (options.protocol === 'file:') assert.ok(!offline.requests.includes('./catalog.json'));
    } finally { offline.close(); }
  }
  const malformed = harness({unexpected: true});
  try { await malformed.settle(); malformed.has('当前使用内置资料'); } finally { malformed.close(); }

  console.log('PASS: static paths and four features; truthful update records; discovery ordering and review reasons; precise timezone deadlines and priority rules; saved practice and data fallbacks.');
}

run().catch(err => { console.error(err); process.exitCode = 1; });
