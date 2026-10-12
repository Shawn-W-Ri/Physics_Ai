(function (root) {
  'use strict';
  const DAY = 86400000;
  function isoDay(date = new Date(), zone = 'Asia/Shanghai') {
    const p = new Intl.DateTimeFormat('en-US', { timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date);
    const part = t => p.find(x => x.type === t).value;
    return `${part('year')}-${part('month')}-${part('day')}`;
  }
  function dayDiff(to, from) {
    const normalize = value => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return value;
      const date = new Date(value);
      return Number.isFinite(date.getTime()) ? isoDay(date) : '';
    };
    return Math.round((Date.parse(normalize(to) + 'T00:00:00Z') - Date.parse(normalize(from) + 'T00:00:00Z')) / DAY);
  }
  function deadlineInstant(item) {
    const value = item?.deadlineAt;
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$/i.test(value)) return null;
    const time = Date.parse(value);
    return Number.isFinite(time) ? time : null;
  }
  function deadlineDay(item) {
    const instant = deadlineInstant(item);
    if (instant !== null) return isoDay(new Date(instant));
    if (/^\d{4}-\d{2}-\d{2}$/.test(item?.deadline || '')) return item.deadline;
    const date = new Date(item?.deadline);
    return item?.deadline && Number.isFinite(date.getTime()) ? isoDay(date) : '';
  }
  function status(item, today = isoDay(), now = new Date()) {
    if (item.status === 'portal') return 'portal';
    const instant = deadlineInstant(item);
    const expired = instant !== null ? instant <= new Date(now).getTime() : item.deadline && dayDiff(item.deadline, today) < 0;
    if (expired) return item.deadlineType === 'priority' || /优先|priority/i.test(item.deadlineNote || '') || (instant === null && item.status === 'check') ? 'check' : 'closed';
    if (item.status === 'open' && item.checkedAt && dayDiff(today, item.checkedAt) > 14) return 'check';
    return item.status || 'check';
  }
  function urgent(item, today = isoDay(), now = new Date()) { const cutoff = deadlineDay(item), days = cutoff ? dayDiff(cutoff, today) : null; return status(item, today, now) === 'open' && days !== null && days >= 0 && days <= 30; }
  function lessonIndex(start, today = isoDay(), count = 30) { return ((Math.max(0, dayDiff(today, start)) % count) + count) % count; }
  function streak(log, today = isoDay()) {
    let n = 0, day = today;
    if (!Object.hasOwn(log, day)) day = new Date(Date.parse(today + 'T00:00:00Z') - DAY).toISOString().slice(0,10);
    while (Object.hasOwn(log, day)) { n++; day = new Date(Date.parse(day + 'T00:00:00Z') - DAY).toISOString().slice(0,10); if (n > 10000) break; }
    return n;
  }
  function safeUrl(value) { try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : '#'; } catch { return '#'; } }
  function escape(value) { return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function validateBackup(input, ids) {
    if (!input || input.app !== 'research-compass' || input.version !== 1 || !input.state || typeof input.state !== 'object') throw new Error('请选择研途导出的记录文件。');
    const s = input.state, out = {};
    out.startDate = /^\d{4}-\d{2}-\d{2}$/.test(s.startDate || '') && Number.isFinite(Date.parse(s.startDate)) ? s.startDate : isoDay();
    const allowed = new Set(ids); out.followed = Array.isArray(s.followed) ? s.followed.filter(x => allowed.has(x)) : [];
    out.saved = Array.isArray(s.saved) ? [...new Set(s.saved.filter(x => typeof x === 'string' && x.length < 160))].slice(0,1000) : [];
    out.topics = Array.isArray(s.topics) ? s.topics.filter(x => ['avf','flow','optics','physics','robust'].includes(x)) : ['avf','optics'];
    if (!out.topics.length) out.topics = ['avf'];
    out.log = {};
    if (s.log && typeof s.log === 'object') for (const [k,v] of Object.entries(s.log)) if (/^\d{4}-\d{2}-\d{2}$/.test(k) && Number.isInteger(v) && v >= 0 && v < 30) out.log[k] = v;
    out.pipeline = {}; if (s.pipeline && typeof s.pipeline === 'object') for (const [k,v] of Object.entries(s.pipeline)) if (['interested','contacting','preparing','submitted'].includes(v) && k.length < 160) out.pipeline[k] = v;
    out.notes = {}; if (s.notes && typeof s.notes === 'object') for (const [k,v] of Object.entries(s.notes)) if (typeof v === 'string' && k.length < 160 && v.length <= 5000) out.notes[k] = v;
    out.intro = typeof s.intro === 'string' ? s.intro.slice(0,12000) : '';
    return out;
  }
  const api = {isoDay,dayDiff,deadlineInstant,deadlineDay,status,urgent,lessonIndex,streak,safeUrl,escape,validateBackup};
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.ResearchCore = api;
})(typeof window !== 'undefined' ? window : globalThis);
