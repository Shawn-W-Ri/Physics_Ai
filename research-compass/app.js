(() => {
  'use strict';
  let D = window.RESEARCH_DATA;
  const C = window.ResearchCore, $ = s => document.querySelector(s);
  if (!D || !C) { $('#main').innerHTML = '<div class="empty">资料未能载入，请刷新页面或检查网络。</div>'; return; }
  const e = C.escape;
  const KEY = 'research-compass-v1', CACHE = 'research-compass-papers-v1';
  const topics = [
    {id:'avf',name:'AVF与血管声学',query:'("arteriovenous fistula" AND (acoustic OR vibration OR hemodynamics OR stenosis))'},
    {id:'flow',name:'血流与FSI',query:'(("fluid structure interaction" OR "computational fluid dynamics") AND (vascular OR cardiovascular))'},
    {id:'optics',name:'光学可穿戴',query:'(photoplethysmography OR "diffuse correlation spectroscopy" OR "laser speckle") AND (blood OR wearable)'},
    {id:'physics',name:'物理驱动学习',query:'("physics informed" OR "inverse modeling" OR "simulation to real") AND (cardiovascular OR photoacoustic OR biomedical)'},
    {id:'robust',name:'鲁棒与多通道',query:'(denoising OR "motion artifact" OR "sensor fusion") AND (photoplethysmography OR "heart sound" OR "vascular sound")'}
  ];
  const authors = {G01:['Bykov A','Bykau A'],G02:['Myllyla T'],G03:['Tarvainen T'],G04:['Hauptmann A'],G05:['Vehkaoja A'],G06:['Koivisto T','Kaisti M'],G07:['Sarkka S'],G08:['Nieminen H'],G09:['Salmi A'],G10:['Siltanen S'],G11:['Leppanen T','Kainulainen S'],G12:['Sornmo L'],G13:['Marlevi D'],G14:['Larsson M'],G15:['Dual S'],G16:['Stromberg T','Fredriksson I'],G17:['Dyverfeldt P','Ebbers T'],G18:['Broome M'],G19:['Oktem O'],G20:['Valen-Sendstad K'],G21:['Lovstakken L','Smistad E'],G22:['Randeberg L'],G23:['Austeng A','Nasholm S'],G24:['Schmidt SE','Struijk JJ'],G25:['Jensen JA'],G26:['Untracht G','Andersen PE'],G27:['Colombo M'],G28:['Arnardottir ES']};
  const names = {research:'科研动态',opportunities:'博后与访问',funding:'国际资助',english:'每日英语'};
  let today = C.isoDay(), storageOK = true;
  const defaults = () => ({startDate:today,followed:['G01','G05','G13','G15','G16','G20','G24','G27'],saved:[],topics:['avf','optics','physics'],log:{},pipeline:{},notes:{},intro:''});
  let state = defaults();
  try { const raw = localStorage.getItem(KEY); if (raw) state = {...state,...C.validateBackup({app:'research-compass',version:1,state:JSON.parse(raw)},D.groups.map(g=>g.id))}; } catch { storageOK = false; }
  let page = names[location.hash.slice(1)] ? location.hash.slice(1) : 'research';
  let researchTab = 'feed', topic = 'all', groupQuery = null, query = '', country = '', kind = '', onlySaved = false, statusFilter = 'all';
  let englishTab = 'daily', previewLesson = null, speaking = false, activeSpeechKey = '', speechToken = 0;
  let live = {items:[],loading:false,error:'',checkedAt:'',key:''}, requestId = 0, toastTimer;
  let catalogState = {connected:false,loading:false,hasCatalog:false,update:null,error:'',loadedAt:''};
  const seedCheckedAt = D.checkedAt;
  let papers = buildPapers();
  function buildPapers() {return D.groups.flatMap(g => (g.papers||[]).map(p => ({...p,id:p.ref,group:g.name,groupId:g.id,country:g.country,people:g.people,official:g.official})));}
  function persist() { try { localStorage.setItem(KEY,JSON.stringify(state)); storageOK = true; } catch { storageOK = false; toast('浏览器未能保存记录。请到偏好中导出备份。'); } }
  function toast(t) { const el = $('#toast'); el.textContent=t;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3500); }
  function url(v) { return e(C.safeUrl(v)); }
  function link(href,label,cls='text-link') { return `<a class="${cls}" href="${url(href)}" target="_blank" rel="noopener noreferrer">${e(label)} <span aria-hidden="true">↗</span></a>`; }
  function button(action,label,cls='btn secondary',extra='') { return `<button class="${cls}" data-action="${action}" ${extra}>${label}</button>`; }
  function tags(xs) { return `<div class="tag-row">${(xs||[]).slice(0,5).map(x=>`<span class="tag">${e(x)}</span>`).join('')}</div>`; }
  function saved(id) { return state.saved.includes(id); }
  function saveButton(id) { return button('save',saved(id)?'已收藏':'收藏','btn small '+(saved(id)?'is-saved':'ghost'),`data-id="${e(id)}" aria-pressed="${saved(id)}"`); }
  function empty(title,detail='试试调整关键词或筛选条件。') { return `<div class="empty"><span class="empty-symbol" aria-hidden="true">⌕</span><h3>${e(title)}</h3><p>${e(detail)}</p></div>`; }
  function heading(eyebrow,title,subtitle,action='') { return `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p class="subtitle">${subtitle}</p></div><div class="heading-actions">${action}</div></div>`; }
  function section(title,note='') { return `<div class="section-heading"><h2>${title}</h2><span class="muted">${note}</span></div>`; }
  function match(item) { return !query || JSON.stringify(item).toLowerCase().includes(query.toLowerCase()); }
  function stat(label,value,note) { return `<div class="stat"><span class="stat-label">${label}</span><strong class="stat-value">${value}</strong><span class="stat-note">${note}</span></div>`; }
  function searchBox(placeholder) { return `<label class="search-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input id="searchInput" type="search" value="${e(query)}" placeholder="${placeholder}" aria-label="${placeholder}"></label>`; }
  function select(id,label,values,value) { return `<select id="${id}" aria-label="${label}"><option value="">${label}</option>${values.map(x=>{const [v,t]=Array.isArray(x)?x:[x,x];return `<option value="${e(v)}" ${value===v?'selected':''}>${e(t)}</option>`;}).join('')}</select>`; }
  function summaryNotice() { return (!storageOK ? '<div class="notice warning">当前浏览器可能限制本地保存，请及时导出记录。</div>' : '')+`<div class="sync-banner ${catalogState.connected?'connected':'disconnected'}"><span><i class="sync-dot" aria-hidden="true"></i>${e(connectionLabel())}</span>${button('sync-catalog',catalogState.loading?'载入中…':'重新载入','btn small ghost',catalogState.loading?'disabled':'')}</div>`; }
  function connectionLabel() {
    if(catalogState.loading)return catalogState.hasCatalog?'正在重新载入目录，保留上次资料':'正在载入目录，当前使用内置资料';
    if(!catalogState.connected)return catalogState.hasCatalog?'目录暂不可达，保留上次载入资料':'目录未载入，当前使用内置资料';
    return '目录已载入';
  }
  function validStamp(value) {return typeof value==='string'&&Number.isFinite(Date.parse(value));}
  function hasScheduledRun() {
    const schedule=catalogState.update?.schedule;
    return catalogState.connected&&schedule?.enabled===true&&validStamp(schedule.lastScheduledRunAt);
  }
  function coverageText(key) {
    const row=catalogState.update?.coverage?.[key];
    if(!row||!validStamp(row.lastFetchSuccessAt))return '尚无来源抓取成功记录';
    return '最近来源抓取 '+formatTime(row.lastFetchSuccessAt)+(catalogState.connected?'':' · 上次载入记录');
  }
  function updateStatusPanel() {
    const labels={news:'团队与科研动态',opportunities:'博后岗位',visits:'交流与访问',funding:'国际科研资助'};
    const states={success:'来源抓取成功',ok:'来源抓取成功',updated:'来源抓取成功',partial:'部分来源获取',failed:'来源抓取失败',error:'来源抓取失败',pending:'尚未抓取',running:'正在抓取',skipped:'本次跳过',never:'尚未运行',disabled:'尚未启用',unavailable:'来源不可用',stale:'需要复核'};
    const schedule=catalogState.update?.schedule,scheduled=hasScheduledRun();
    const time=/^\d{2}:\d{2}$/.test(schedule?.time||'')?schedule.time:'时间未确认';
    const scheduleNote=scheduled?`已记录定时抓取：${formatTime(schedule.lastScheduledRunAt)}。计划时间为每日 ${time}（${schedule.timezone==='Asia/Shanghai'?'北京时间':schedule.timezone||'时区未确认'}）。`:schedule?.enabled===true?'目录声明有定时计划，但尚无实际定时运行证据。':'尚无定时运行证据；重新载入目录不会触发来源抓取。';
    const runNote=validStamp(catalogState.update?.lastRunAt)?`最近抓取任务 ${formatTime(catalogState.update.lastRunAt)}`:'尚无抓取任务运行记录';
    const runUrl=catalogState.update?.execution?.runUrl;
    return `<section class="card sync-panel" aria-label="四类目录更新记录"><div class="section-heading"><h2>目录更新记录</h2><span class="badge ${scheduled?'green':'neutral'}">${scheduled?'已有定时运行证据':'尚无定时运行证据'}</span></div><p class="sync-description">${e(scheduleNote)} <span>${e(runNote)}</span>${runUrl&&C.safeUrl(runUrl)!=='#'?' '+link(runUrl,'查看运行记录'):''}</p>${catalogState.error?`<p class="sync-error">${e(catalogState.error)}</p>`:''}<div class="coverage-grid">${Object.entries(labels).map(([key,label])=>{const row=catalogState.update?.coverage?.[key];const status=row?states[row.status]||'状态待确认':'尚无记录';const verification=validStamp(row?.lastSuccessAt)?'最近内容核验 '+formatTime(row.lastSuccessAt):'暂无新增内容核验成功记录';return `<div class="coverage-item"><div class="coverage-title"><strong>${label}</strong><span class="coverage-state ${['failed','error','unavailable'].includes(row?.status)?'error':''}">${e(status)}</span></div><p>${e(coverageText(key))}</p><p class="coverage-review">${e(verification)}</p><small>${Number.isFinite(row?.sourceCount)?e(row.sourceCount)+' 个来源':''}${row?.message?(Number.isFinite(row.sourceCount)?' · ':'')+e(row.message):''}</small></div>`;}).join('')}</div><p class="source-note">来源抓取成功仅表示网页或数据可获取，不等于岗位开放、申请资格和截止日期已完成内容核验。目录载入也不代表定时任务已运行；请以原始公告为准。</p></section>`;
  }
  function importantItems() {
    const all=[...D.opportunities.map(x=>({...x,target:'opportunities'})),...D.funding.map(x=>({...x,target:'funding'}))];
    return all.flatMap(item=>{
      if(C.status(item,today)!=='open')return [];
      const reasons=[];
      if(C.urgent(item,today)){const days=C.dayDiff(C.deadlineDay(item),today),label=item.deadlineType==='priority'||/优先|priority/i.test(item.deadlineNote||'')?'优先审查':'截止';reasons.push(days===0?`今天${label}`:`距${label} ${days} 天`);}
      if(item.priority==='high')reasons.push(typeof item.priorityReason==='string'?item.priorityReason:'标记为重要机会');
      const date=validStamp(item.publishedAt)?item.publishedAt.slice(0,10):'',age=date?C.dayDiff(today,date):null;
      if(age!==null&&age>=0&&age<7)reasons.push('近7天新发布');
      return reasons.length?[{...item,reasons}]:[];
    }).sort((a,b)=>Number(C.urgent(b,today))-Number(C.urgent(a,today))||(a.deadline||'9999').localeCompare(b.deadline||'9999')).slice(0,6);
  }
  function highlightsPanel() {
    const items=importantItems();
    return `<section class="focus-section">${section('今日重点','只显示仍开放的岗位、访问与资助')}<div class="focus-grid">${items.length?items.map(x=>`<article class="focus-card"><span class="eyebrow">${x.target==='funding'?'国际资助':['visit','exchange'].includes(x.kind)?'访问与交流':'博后岗位'}</span><h3>${e(x.title)}</h3><p>${e(x.reasons.join(' · '))}</p>${button('open-focus','查看详情 →','text-link',`data-id="${e(x.id)}" data-target="${x.target}"`)}</article>`).join(''):'<div class="focus-empty">当前资料中没有符合条件的重要开放机会。可继续查看完整目录与官方来源。</div>'}</div></section>`;
  }
  function newsOrderTime(item) {return validStamp(item.discoveredAt)?Date.parse(item.discoveredAt):validStamp(item.publishedAt)?Date.parse(item.publishedAt):0;}
  function newsPanel() {
    const items=(Array.isArray(D.news)?D.news:[]).filter(n=>groupQuery?n.groupId===groupQuery:!n.groupId||state.followed.includes(n.groupId)).sort((a,b)=>newsOrderTime(b)-newsOrderTime(a)||Number(a.kind==='paper')-Number(b.kind==='paper')).slice(0,6);
    const kinds={paper:'论文动态',news:'团队新闻',project:'项目进展',event:'活动与交流'};
    return `<section class="team-news">${section('团队动态',coverageText('news'))}<div class="stack">${items.length?items.map(n=>`<article class="card news-card"><div class="card-top"><span class="badge blue">${e(n.verification==='source-change'?'官网变化 · 待读':n.verification==='discovered-link'?'新链接 · 待读':kinds[n.kind]||'团队动态')}</span><span class="card-meta">${validStamp(n.publishedAt)?'发表 '+e(n.publishedAt.slice(0,10)):'发布日期未提供'}</span></div><h3>${link(n.url,n.title,'paper-title')}</h3><p class="card-meta">${e(n.groupName||D.groups.find(g=>g.id===n.groupId)?.name||'相关领域')}</p><p>${e((n.summary||'').slice(0,180))}${(n.summary||'').length>180?'…':''}</p>${(n.summary||'').length>180?`<details><summary>查看完整说明</summary><p>${e(n.summary)}</p></details>`:''}<div class="card-footer">${link(n.url,'原始来源')}<span class="news-dates">${validStamp(n.discoveredAt)?'发现 '+e(formatTime(n.discoveredAt)):''}${validStamp(n.checkedAt)?(validStamp(n.discoveredAt)?' · ':'')+'来源获取 '+e(n.checkedAt.slice(0,10)):''}</span></div></article>`).join(''):empty('尚无已同步的团队动态',catalogState.connected?'目录尚未包含你所关注团队的动态；下方仍可阅读相关论文。':'载入目录后显示团队新闻、项目与活动；当前仍可阅读下方论文。')}</div></section>`;
  }
  async function loadCatalog() {
    if(catalogState.loading)return;
    if(location.protocol==='file:'){catalogState.connected=false;catalogState.error='本地文件模式无法载入目录文件，正在使用内置资料。';render();return;}
    catalogState.loading=true;catalogState.error='';render();
    const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),15000);
    try {
      const response=await fetch('./catalog.json',{signal:ctl.signal,credentials:'same-origin',cache:'no-store'});
      if(!response.ok)throw new Error('目录文件暂时不可用');
      const payload=await response.json(),catalog=payload?.catalog;
      if(!catalog||typeof catalog!=='object'||!['groups','opportunities','funding','news'].some(key=>Array.isArray(catalog[key])))throw new Error('目录文件格式不完整');
      const merged={...D};
      if(Array.isArray(catalog.groups))merged.groups=catalog.groups.filter(g=>g&&typeof g.id==='string'&&typeof g.name==='string'&&Array.isArray(g.papers)).map(g=>({...g,tags:typeof g.tags==='string'?g.tags:'',papers:g.papers.filter(p=>p&&typeof p.title==='string')}));
      for(const key of ['opportunities','funding'])if(Array.isArray(catalog[key]))merged[key]=catalog[key].filter(x=>x&&typeof x.id==='string'&&typeof x.title==='string').map(x=>({...x,tags:Array.isArray(x.tags)?x.tags:[],hostRegions:Array.isArray(x.hostRegions)?x.hostRegions:[]}));
      if(Array.isArray(catalog.news))merged.news=catalog.news.filter(x=>x&&typeof x.id==='string'&&typeof x.title==='string'&&typeof x.url==='string').map(x=>({...x,summary:typeof x.summary==='string'?x.summary:'',publishedAt:typeof x.publishedAt==='string'?x.publishedAt:'',checkedAt:typeof x.checkedAt==='string'?x.checkedAt:''}));
      if(catalog.english&&Array.isArray(catalog.english.lessons)&&catalog.english.lessons.length===30&&catalog.english.lessons.every(x=>x&&typeof x.sentence==='string')&&Array.isArray(catalog.english.questions)&&catalog.english.intro?.short&&catalog.english.intro?.full)merged.english=catalog.english;
      if(typeof catalog.checkedAt==='string')merged.checkedAt=catalog.checkedAt;
      D=merged;papers=buildPapers();
      catalogState={connected:true,loading:false,hasCatalog:true,update:payload.update&&typeof payload.update==='object'?payload.update:null,error:'',loadedAt:new Date().toISOString()};
    } catch {
      catalogState.connected=false;catalogState.loading=false;catalogState.error=catalogState.hasCatalog?'目录暂不可达，保留上次载入资料。更新记录来自上次成功载入。':'目录暂不可达，当前使用内置资料；没有已确认的定时运行记录。';
    } finally {clearTimeout(timer);render();if($('#settingsDialog').open)settings(false);}
  }
  function render() {
    document.title = `${names[page]} · 研途`;
    $('#pageLabel').textContent=names[page];
    $('#todayLabel').textContent=new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',month:'long',day:'numeric',weekday:'long'}).format(new Date());
    document.querySelectorAll('[data-page]').forEach(b=>{b.classList.toggle('active',b.dataset.page===page);b.setAttribute('aria-current',b.dataset.page===page?'page':'false');});
    $('#main').innerHTML=summaryNotice()+({research:renderResearch,opportunities:renderOpportunities,funding:renderFunding,english:renderEnglish}[page])();
  }
  function renderResearch() {
    const t = topics.find(x=>x.id===topic), selectedGroup=D.groups.find(g=>g.id===groupQuery);
    const attention=D.opportunities.filter(x=>C.urgent(x,today)).length+D.funding.filter(x=>C.urgent(x,today)).length;
    let body=heading('DISCOVER & FOLLOW','今天，离你的研究更近一点','围绕AVF、光学可穿戴与物理驱动学习，关注值得读的人和论文。',button('refresh',live.loading||catalogState.loading?'正在载入…':'重新载入资料','btn secondary',live.loading||catalogState.loading?'disabled':''));
    body+=`<div class="hero"><div class="hero-copy"><div class="eyebrow">为你的下一步做准备</div><h2>从血流物理，走向智能感知。</h2><p>已为你整理${D.groups.length}个相关团队。选择关注方向，把每天的阅读留给真正相关的信息。</p><div class="hero-actions">${button('show-groups','管理关注课题组','btn primary')}${button('go-english','练习今日一句 <span aria-hidden="true">→</span>','btn ghost')}</div></div><div class="hero-aside"><span class="hero-orbit" aria-hidden="true"></span><span class="hero-number">${state.followed.length}<small>正在关注的团队</small></span></div></div>`;
    body+=`<div class="stats-grid">${stat('研究资料',papers.length,'篇论文附方法与局限')}${stat('需要留意',attention,'项开放机会在30天内到期')}${stat('学习记录',Object.keys(state.log).length,'天完成英文练习')}</div>`;
    body+=`<div class="tabs-strip" role="tablist" aria-label="科研内容">${[['feed','为你关注'],['groups','课题组 · '+D.groups.length],['saved','收藏的论文']].map(([id,label])=>`<button role="tab" aria-selected="${researchTab===id}" class="${researchTab===id?'active':''}" data-action="research-tab" data-id="${id}">${label}</button>`).join('')}</div>`;
    if(researchTab==='groups'){
      let groups=D.groups.filter(g=>match(g)&&(!country||g.country===country)&&(!onlySaved||state.followed.includes(g.id)));
      body+=`<div class="toolbar">${searchBox('搜索导师、学校或研究方向')}${select('countryFilter','全部国家',['芬兰','瑞典','挪威','丹麦','冰岛'],country)}${button('only-saved',onlySaved?'✓ 只看已关注':'只看已关注','toggle-button '+(onlySaved?'active':''))}</div><div class="cards-grid">${groups.map(groupCard).join('')||empty('没有匹配的课题组')}</div>`;
    } else if(researchTab==='saved'){
      const refs=papers.filter(p=>saved(p.id)&&match(p));
      const cached=allCachedPapers().filter(p=>saved(p.id)&&match(p));
      body+=`<div class="toolbar">${searchBox('搜索收藏的论文')}</div><div class="stack">${[...cached.map(liveCard),...refs.map(paperCard)].join('')||empty('把值得读的论文留在这里','点击论文卡片上的“收藏”，下次继续阅读。')}</div>`;
    } else {
      body+=updateStatusPanel()+highlightsPanel();
      body+=`<div class="chips" aria-label="研究主题">${[{id:'all',name:'我的关注方向'},...topics].map(x=>button('topic',e(x.name),'chip '+(topic===x.id&&!groupQuery?'active':''),`data-id="${x.id}"`)).join('')}</div>`;
      if(selectedGroup)body+=`<div class="notice">正在检索 ${e(selectedGroup.name)} 的作者论文。作者姓名检索可能含同名，归属以论文署名为准。 ${button('clear-group','恢复主题推荐','btn small ghost')}</div>`;
      body+=`<div class="content-grid"><div class="main-column">${newsPanel()}${section(selectedGroup?'关注团队近期论文':t?t.name+' · 近期论文':'近期论文',live.checkedAt?'文献库获取 '+formatTime(live.checkedAt):'Europe PMC')}`;
      if(live.loading)body+='<div class="notice"><span class="spinner"></span> 正在连接Europe PMC，保留上次结果供你阅读。</div>';
      if(live.error)body+=`<div class="notice warning">${e(live.error)} ${link(epmcUrl(),'在文献库中查看')}</div>`;
      body+=`<div class="stack">${live.items.length?live.items.map(liveCard).join(''):!live.loading?empty('暂未取得近期论文','网络不可用时仍可阅读下方已整理的代表论文；点击刷新可重试。'):''}</div>`;
      body+=`<p class="source-note">自动文献推荐覆盖数据库收录内容，按发表时间排序；机器检索结果未逐篇人工解读，期刊与预印本请分别判断。</p>${section('从这些代表论文读起','原始整理 · '+e(seedCheckedAt))}<div class="stack">${referencePapers().slice(0,8).map(paperCard).join('')}</div></div><aside class="side-column"><div class="card"><div class="eyebrow">MY RESEARCH LENS</div><h3>我的关注方向</h3><p class="muted">主题论文在每天首次打开时尝试更新；四类来源抓取与内容核验记录见上方面板。</p>${topics.map(x=>`<label class="settings-row"><input type="checkbox" data-topic="${x.id}" ${state.topics.includes(x.id)?'checked':''}> <span>${x.name}</span></label>`).join('')}<p class="source-note">至少选择一个方向。点击主题标签可单独探索。</p></div><div class="card"><h3>从认识团队开始</h3><p>在课题组卡片里关注导师、阅读代表作，也可以检索近期论文或访问官网。</p>${button('show-groups','查看'+D.groups.length+'个课题组 →','btn secondary')}</div><div class="card quiet-card"><div class="eyebrow">研究提醒</div><p>波形更干净，不一定保留了更多诊断信息。今天可以留意论文如何选择评价终点。</p></div></aside></div>`;
    }
    return body;
  }
  function referencePapers() {
    let result=papers.filter(p=>groupQuery?p.groupId===groupQuery:state.followed.includes(p.groupId));
    if(!result.length)result=papers;
    return [...result].sort((a,b)=>parseInt(b.year)-parseInt(a.year));
  }
  function paperCard(p) { return `<article class="card paper-card"><div class="card-top"><span class="badge neutral">代表论文 · ${e(p.year)}</span>${saveButton(p.id)}</div><h3 class="card-title">${link(p.url,p.title,'paper-title')}</h3><p class="card-meta">${e(p.group)} · ${e(p.venue)}</p><p><b>研究问题</b> ${e(p.problem)}</p><details><summary>方法、证据与局限</summary><div class="detail-body"><p><b>方法</b> ${e(p.method)}</p><p><b>证据</b> ${e(p.evidence)}</p><p><b>边界</b> ${e(p.limit)}</p></div></details></article>`; }
  function liveCard(p) { return `<article class="card paper-card"><div class="card-top"><span class="badge ${p.preprint?'warning':'green'}">${p.preprint?'预印本':'文献库收录'} · ${e(p.date||p.year||'日期未列明')}</span>${saveButton(p.id)}</div><h3 class="card-title">${link(p.url,p.title,'paper-title')}</h3><p class="card-meta">${e(p.authors)}${p.journal?' · '+e(p.journal):''}</p>${p.abstract?`<details><summary>查看原文摘要</summary><p class="abstract-text">${e(p.abstract)}</p><p class="source-note">摘要来自Europe PMC，未经自动改写。</p></details>`:'<p class="muted">摘要暂不可用，可通过原始来源阅读。</p>'}</article>`; }
  function groupCard(g) { const followed=state.followed.includes(g.id);return `<article class="card group-card"><div class="card-top"><span class="badge neutral">${e(g.country)}</span>${button('follow',followed?'✓ 已关注':'＋ 关注','btn small '+(followed?'is-saved':'secondary'),`data-id="${g.id}" aria-pressed="${followed}"`)}</div><h3>${e(g.name)}</h3><p class="card-meta">${e(g.people)}</p>${tags([g.level,...g.tags.split(/\s{2,}/)])}<p>${e(g.transfer)}</p><details><summary>团队与代表论文</summary><div class="detail-body"><p>${e(g.context)}</p>${g.papers.map(p=>`<p>${link(p.url,p.title)}<br><span class="source-note">${e(p.year)} · ${e(p.venue)}</span></p>`).join('')}</div></details><div class="card-footer">${link(g.official,'团队官网')}${button('group-papers','近期论文','btn small secondary',`data-id="${g.id}"`)}</div></article>`; }
  function statusBadge(item) { const s=C.status(item,today),labels={open:'标记为开放',closed:'本轮已截止／关闭',recurring:'周期项目',portal:'官方检索入口',check:'待复核'};return `<span class="badge ${s==='open'?'green':s==='closed'?'neutral':s==='check'?'warning':'blue'}">${labels[s]||'待复核'}</span>`; }
  function deadline(item) {
    const cutoff=C.deadlineDay(item),instant=C.deadlineInstant(item),days=cutoff?C.dayDiff(cutoff,today):null;
    const display=instant!==null?new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date(instant))+'（北京时间）':cutoff;
    const expired=instant!==null?instant<=Date.now():days!==null&&days<0;
    const priority=item.deadlineType==='priority'||/优先|priority/i.test(item.deadlineNote||'');
    const opening=validStamp(item.opensAt)?`<p class="source-note">申请开始日期：${e(item.opensAt)}，届时以官方开放状态为准。</p>`:'';
    return `${opening}<div class="deadline ${C.urgent(item,today)?'urgent':''}">${cutoff?`${e(display)} <b>${expired?(priority?'该优先审查时间已过':instant!==null?'该截止时间已过':'该日期已过'):days===0?'今天':`距此日期 ${days} 天`}</b>`:'<span>无已确认的统一截止日</span>'}<p>${e(item.deadlineNote||'以官网为准')}</p></div>`;
  }
  function pipeline(item) { return `<div class="progress-row"><label for="stage-${e(item.id)}">我的进度</label><select id="stage-${e(item.id)}" data-pipeline="${e(item.id)}"><option value="">未标记</option>${[['interested','感兴趣'],['contacting','联系导师中'],['preparing','准备材料中'],['submitted','已提交']].map(([v,t])=>`<option value="${v}" ${state.pipeline[item.id]===v?'selected':''}>${t}</option>`).join('')}</select></div>`; }
  function listingControls(items,label,type) { return `<div class="toolbar">${searchBox(type==='funding'?'搜索基金、国家或关键词':'搜索学校、方向或机会')}${select('countryFilter',label,[...new Set(items.map(x=>type==='funding'?x.region:x.country))],country)}${type==='opportunities'?select('kindFilter','全部类型',[['postdoc','博后岗位'],['visit','科研访问'],['exchange','交流'],['portal','官方入口']],kind):''}<select id="statusFilter" aria-label="状态筛选">${[['all','全部状态'],['open','标记为开放'],['recurring','周期项目'],['portal','官方入口'],['closed','已截止'],['check','待复核']].filter(([v])=>type==='funding'?v!=='portal':v!=='recurring').map(([v,t])=>`<option value="${v}" ${statusFilter===v?'selected':''}>${t}</option>`).join('')}</select>${button('only-saved',onlySaved?'✓ 只看收藏':'只看收藏','toggle-button '+(onlySaved?'active':''))}</div>`; }
  function filterItems(items,type) { return [...items].filter(x=>match(x)&&(!country||(type==='funding'?x.region:x.country)===country)&&(!kind||x.kind===kind)&&(!onlySaved||saved(x.id))&&(statusFilter==='all'||C.status(x,today)===statusFilter)).sort((a,b)=>{const rank=x=>({open:0,recurring:1,portal:2,check:3,closed:4}[C.status(x,today)]??5);return rank(a)-rank(b)||(a.deadline||'9999').localeCompare(b.deadline||'9999');}); }
  function renderOpportunities() {
    const items=filterItems(D.opportunities,'opportunities');
    let body=heading('YOUR NEXT CHAPTER','寻找下一站','从相关课题出发，发现博后、短期访问与交流路径。');
    body+=`<div class="stats-grid">${stat('标记为开放',D.opportunities.filter(x=>C.status(x,today)==='open'&&x.kind==='postdoc').length,'个具体博后岗位')}${stat('访问与交流',D.opportunities.filter(x=>['visit','exchange'].includes(x.kind)).length,'项机制或机会')}${stat('我的申请',Object.keys(state.pipeline).filter(id=>D.opportunities.some(x=>x.id===id)).length,'项已有跟进状态')}</div>`;
    body+=`<div class="notice">博后岗位：${e(coverageText('opportunities'))}。交流与访问：${e(coverageText('visits'))}。单条资料记录超过14天会降为“待复核”。抓取来源不等于核验开放状态，官方入口不代表正在招聘。</div>`;
    body+=listingControls(D.opportunities,'全部国家','opportunities');
    body+=`<div class="search-assist card"><div><h3>继续寻找新的机会</h3><p class="muted">把你的关键词带到公开检索，查看最新招聘原文。</p></div><div class="card-actions">${link('https://euraxess.ec.europa.eu/jobs/search','EURAXESS岗位库','btn secondary')}${link('https://www.google.com/search?q='+encodeURIComponent((query||'biomedical optics cardiovascular computational')+' postdoctoral fellowship position '+(country||'')),'检索相关岗位','btn secondary')}${link('https://www.google.com/search?q='+encodeURIComponent((query||'cardiovascular biomedical optics')+' visiting researcher fellowship '+(country||'')),'检索访问机会','btn secondary')}</div></div>`;
    body+=section('机会清单',`${items.length} 项`)+`<div class="cards-grid">${items.map(x=>opportunityCard(x)).join('')||empty('没有匹配的机会')}</div>`;
    return body;
  }
  function changeReviewNote(item) {
    const changed=validStamp(item.sourceChangedAt),reason=typeof item.reviewReason==='string'?item.reviewReason.trim():'';
    if(!changed&&!reason)return '';
    return `<div class="change-review-note"><strong>变化待复核</strong>${changed?`<span>来源变化 ${e(formatTime(item.sourceChangedAt))}</span>`:''}${reason?`<p>${e(reason)}</p>`:''}</div>`;
  }
  function opportunityCard(x) { return `<article class="card opportunity-card"><div class="card-top">${statusBadge(x)}${saveButton(x.id)}</div><h3>${e(x.title)}</h3><p class="card-meta">${e(x.institution)} · ${e(x.country)}</p>${tags(x.tags)}<p>${e(x.summary)}</p><p class="fit-note"><b>与你的联系</b> ${e(x.fit)}</p>${deadline(x)}${changeReviewNote(x)}<details><summary>要求与我的准备笔记</summary><div class="detail-body"><p>${e(x.requirements)}</p><label class="field">准备笔记<textarea data-note="${e(x.id)}" rows="3" maxlength="5000" placeholder="导师、材料、下一步…">${e(state.notes[x.id]||'')}</textarea></label></div></details>${pipeline(x)}<div class="card-footer">${link(x.applicationUrl||x.url,x.kind==='portal'?'打开官方入口':'查看官方详情')}<span class="source-note">资料日期 ${e(x.checkedAt||'未提供')}</span></div></article>`; }
  function renderFunding() {
    const items=filterItems(D.funding,'funding');
    return heading('FUND YOUR IDEAS','让好的问题，得到支持','从玛丽·居里到洪堡，找到适合你的国际研究资助。')+`<div class="hero funding-hero"><div class="hero-copy"><div class="eyebrow">先找合作，再谈申请</div><h2>经费申请，也是研究计划的开始。</h2><p>一起看研究方向、接收机构、流动规则和博士年限。开放申请，不等于已经符合个人资格。</p></div><div class="hero-aside"><span class="hero-number">${D.funding.length}<small>项全球资助与机制</small></span></div></div><div class="notice">国际资助：${e(coverageText('funding'))}。未确认的下一轮日期保留为空；“周期项目”不表示当前开放。截止日期和资格以官方call为准。</div>`+listingControls(D.funding,'全部地区','funding')+section('资助清单',`${items.length} 项`)+`<div class="cards-grid">${items.map(fundingCard).join('')||empty('没有匹配的资助')}</div>`;
  }
  function fundingCard(x) { return `<article class="card funding-card"><div class="card-top">${statusBadge(x)}${saveButton(x.id)}</div><p class="eyebrow">${e(x.region)} · ${e(x.kind)}</p><h3>${e(x.title)}</h3><p>${e(x.summary)}</p>${tags(x.tags)}<p class="fit-note"><b>适配提示</b> ${e(x.fit)}</p>${deadline(x)}${changeReviewNote(x)}<details><summary>申请资格与准备笔记</summary><div class="detail-body"><p><b>资格</b> ${e(x.eligibility)}</p><p><b>接收地区</b> ${e((x.hostRegions||[]).join('、'))}</p><label class="field">准备笔记<textarea data-note="${e(x.id)}" rows="3" maxlength="5000" placeholder="接收导师、博士时间、流动规则、计划书…">${e(state.notes[x.id]||'')}</textarea></label></div></details>${pipeline(x)}<div class="card-footer">${link(x.url,'官方申请说明')}<span class="source-note">资料日期 ${e(x.checkedAt||'未提供')}</span></div></article>`; }
  function currentLesson() { return previewLesson===null?C.lessonIndex(state.startDate,today,D.english.lessons.length):previewLesson; }
  function renderEnglish() {
    let body=heading('ONE SENTENCE A DAY','每天一句，把研究讲清楚','围绕你的真实课题练习表达。今天不求讲多，只求讲清楚。');
    body+=`<div class="tabs-strip" role="tablist" aria-label="英文练习">${[['daily','每日一句'],['intro','我的课题介绍'],['questions','博后面试题']].map(([id,label])=>`<button role="tab" aria-selected="${englishTab===id}" class="${englishTab===id?'active':''}" data-action="english-tab" data-id="${id}">${label}</button>`).join('')}</div>`;
    if(englishTab==='daily'){
      const index=currentLesson(),l=D.english.lessons[index],done=Object.hasOwn(state.log,today)&&state.log[today]===index,realToday=C.lessonIndex(state.startDate,today,D.english.lessons.length);
      body+=`<div class="content-grid"><div class="main-column"><article class="card practice-card"><div class="practice-topline"><span class="day-badge">DAY ${String(index+1).padStart(2,'0')} / 30</span><span class="muted">${index===realToday?'今日一句':'自由复习'} · ${e(l.topic)}</span></div><div class="sentence-quote" aria-hidden="true">“</div><p class="english-sentence" lang="en">${e(l.sentence)}</p><p class="translation">${e(l.translation)}</p><div class="practice-controls">${button('speak-lesson',isSpeaking(l.sentence)?'■ 停止朗读':'▶ 听一句','btn primary')}${button('slow-lesson',isSpeaking(l.sentence,0.65)?'■ 停止慢读':'慢速跟读','btn secondary')}${button('mark-done',done?'✓ 今天已练习':'我练习过了','btn secondary '+(done?'is-saved':''))}</div><div class="pronunciation"><b>这样读更自然</b><p>${e(l.pronunciationTip)}</p></div>${tags(l.keywords)}<div class="card-footer">${button('prev-lesson','← 上一句','btn small ghost',index===0?'disabled':'')}${button('today-lesson','回到今日','btn small ghost')}${button('next-lesson','下一句 →','btn small ghost',index===29?'disabled':'')}</div><p class="source-note">朗读使用浏览器语音，声音取决于设备。打卡只记录练习，不做自动发音评分。</p></article><article class="card"><div class="eyebrow">TRY IT IN AN INTERVIEW</div><h3 lang="en">${e(l.question)}</h3><details><summary>查看答题提示</summary><p>${e(l.answerHint)}</p></details></article></div><aside class="side-column"><article class="card"><div class="eyebrow">SMALL STEPS ADD UP</div><h3>你的练习节奏</h3><div class="practice-progress"><strong>${C.streak(state.log,today)}</strong><span>天连续练习</span></div><p class="muted">累计完成 ${Object.keys(state.log).length} 天。30句循环练习，回顾也算进步。</p><div class="mini-calendar">${D.english.lessons.map((x,i)=>`<button class="day-dot ${Object.values(state.log).includes(i)?'done':''} ${i===index?'today':''}" data-action="pick-lesson" data-id="${i}" aria-label="练习第${i+1}句" aria-pressed="${i===index}">${i+1}</button>`).join('')}</div></article><article class="card quiet-card"><h3>练习只要两分钟</h3><ol><li>听一遍，读一遍。</li><li>不用看文字，再说一遍。</li><li>用自己的研究补一个例子。</li></ol></article></aside></div>`;
    } else if(englishTab==='intro'){
      body+=`<div class="content-grid"><div class="main-column"><article class="card"><div class="card-top"><span class="badge green">约30秒 · 简短介绍</span>${button('speak-intro',isSpeaking(D.english.intro.short)?'■ 停止朗读':'▶ 朗读','btn small secondary','data-id="short"')}</div><p class="intro-paragraph" lang="en">${e(D.english.intro.short)}</p></article><article class="card"><div class="card-top"><span class="badge blue">约90秒 · 完整介绍</span>${button('speak-intro',isSpeaking(D.english.intro.full)?'■ 停止朗读':'▶ 朗读','btn small secondary','data-id="full"')}</div><p class="intro-paragraph" lang="en">${e(D.english.intro.full)}</p><details><summary>中文说明</summary><p>${e(D.english.intro.chinese)}</p></details></article><article class="card intro-text"><h3>打磨成你自己的版本</h3><p class="muted">补入真实结果、论文或项目经历；尚未完成的工作用计划语气。</p><label class="field"><span class="sr-only">我的英文介绍</span><textarea id="customIntro" rows="9" maxlength="12000" placeholder="在这里写下你自己的英文介绍…">${e(state.intro||D.english.intro.short)}</textarea></label><div class="card-actions">${button('save-intro','保存我的版本','btn primary')}${button('speak-custom',isSpeaking(state.intro||D.english.intro.short)?'■ 停止朗读':'▶ 朗读我的版本','btn secondary')}${button('copy-intro','复制文字','btn ghost')}</div></article></div><aside class="side-column"><div class="card"><h3>介绍的四个重点</h3><ol><li>研究什么问题</li><li>用什么物理与数据方法</li><li>你贡献了什么真实证据</li><li>下一步想解决什么</li></ol><p class="source-note">初始文案没有写入未经你提供的准确率、患者规模、已落地设备或光学成果。</p></div></aside></div>`;
    } else {
      body+=`<div class="toolbar">${searchBox('搜索面试问题或主题')}</div><div class="stack">${D.english.questions.filter(match).map((q,i)=>`<article class="card question-card"><div class="card-top"><span class="badge neutral">${e(q.category)}</span>${button('speak-question',isSpeaking(q.question)?'■ 停止朗读':'▶ 听问题','btn small ghost',`data-id="${e(q.id)}"`)}</div><h3 lang="en">${e(q.question)}</h3><details><summary>展开回答思路</summary><p>${e(Array.isArray(q.structure)?q.structure.join(' → '):q.structure)}</p></details></article>`).join('')||empty('没有匹配的问题')}</div>`;
    }
    return body;
  }
  function formatTime(stamp) { try{return new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}).format(new Date(stamp));}catch{return '时间未知';} }
  function buildQuery() {
    let base;
    if(groupQuery) base='('+((authors[groupQuery]||[]).map(a=>`AUTH:"${a}"`).join(' OR ')||'cardiovascular')+')';
    else base='('+topics.filter(x=>topic==='all'?state.topics.includes(x.id):x.id===topic).map(x=>'('+x.query+')').join(' OR ')+')';
    const start=new Date(Date.parse(today+'T00:00:00Z')-730*86400000).toISOString().slice(0,10);
    return `${base} FIRST_PDATE:[${start} TO ${today}] sort_date:y`;
  }
  function epmcUrl() {return 'https://europepmc.org/search?query='+encodeURIComponent(buildQuery());}
  function stripHtml(t) { const el=document.createElement('div');el.innerHTML=t||'';return el.textContent||''; }
  function cacheRead() {
    try {
      const raw=JSON.parse(localStorage.getItem(CACHE)||'{}');
      if(!raw||typeof raw!=='object'||Array.isArray(raw))return {};
      return Object.fromEntries(Object.entries(raw).flatMap(([key,value])=>{
        if(!value||typeof value!=='object'||!Array.isArray(value.items)||typeof value.checkedAt!=='string'||!Number.isFinite(Date.parse(value.checkedAt)))return [];
        const items=value.items.filter(p=>p&&typeof p==='object'&&typeof p.id==='string'&&typeof p.title==='string'&&typeof p.url==='string');
        return [[key,{items,checkedAt:new Date(value.checkedAt).toISOString()}]];
      }));
    } catch { return {}; }
  }
  function allCachedPapers() { const all=Object.values(cacheRead()).flatMap(x=>Array.isArray(x.items)?x.items:[]);return [...new Map(all.map(x=>[x.id,x])).values()]; }
  async function refresh(force=false) {
    const key=buildQuery(),cache=cacheRead()[key],req=++requestId;
    if(cache&&Array.isArray(cache.items))live={...cache,key,loading:false,error:''};
    else live={items:[],loading:false,error:'',checkedAt:'',key};
    if(!force&&cache&&C.isoDay(new Date(cache.checkedAt))===today){if(page==='research')render();return;}
    live.loading=true;if(page==='research')render();
    const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),18000);
    try{
      const u=new URL('https://www.ebi.ac.uk/europepmc/webservices/rest/search');u.search=new URLSearchParams({query:key,format:'json',resultType:'core',pageSize:'16'});
      const response=await fetch(u,{signal:ctl.signal,credentials:'omit'});if(!response.ok)throw new Error('文献服务暂时未响应');
      const data=await response.json();if(!data.resultList||!Array.isArray(data.resultList.result))throw new Error('文献数据格式不完整');
      const items=data.resultList.result.map(p=>({id:`live-${p.source}-${p.id}`,title:stripHtml(p.title),authors:p.authorString||'',journal:p.journalInfo?.journal?.title||p.journalTitle||'',date:p.firstPublicationDate||p.pubYear,year:p.pubYear,abstract:stripHtml(p.abstractText||''),preprint:p.source==='PPR'||(p.pubTypeList?.pubType||[]).some(t=>/preprint/i.test(t)),url:p.doi?'https://doi.org/'+p.doi:`https://europepmc.org/article/${encodeURIComponent(p.source)}/${encodeURIComponent(p.id)}`}));
      const next={items,checkedAt:new Date().toISOString()};
      const caches=cacheRead();caches[key]=next;
      const kept=Object.entries(caches).sort((a,b)=>b[1].checkedAt.localeCompare(a[1].checkedAt)).slice(0,20);
      try{localStorage.setItem(CACHE,JSON.stringify(Object.fromEntries(kept)));}catch{/* The live response remains usable when cache storage is full. */}
      if(req!==requestId)return;live={...next,key,loading:false,error:items.length?'':'该检索暂时没有结果，可以切换研究方向。'};
    }catch(err){if(req!==requestId)return;live.loading=false;live.error=cache?'更新未成功，当前显示上次取得的论文。':'暂时无法连接文献库。你仍可以阅读已整理的代表论文和团队资料。';}
    finally{clearTimeout(timer);if(req===requestId&&page==='research'&&researchTab==='feed')render();}
  }
  function navigate(next) { if(!names[next])return;stopSpeech();page=next;query='';country='';kind='';statusFilter='all';onlySaved=false;location.hash=next;render();window.scrollTo({top:0,behavior:'instant'});if(next==='research'&&researchTab==='feed')refresh(); }
  function stopSpeech() {speechToken++;speaking=false;activeSpeechKey='';if('speechSynthesis' in window)window.speechSynthesis.cancel();}
  function isSpeaking(t,rate=0.88) {return speaking&&activeSpeechKey===`${rate}|${t}`;}
  function speak(t,rate=0.88) {
    if(!('speechSynthesis' in window)){toast('这个浏览器暂不支持朗读。请尝试手机或电脑上的Chrome、Edge或Safari。');return;}
    if(typeof t!=='string'||!t.trim()){toast('先写下一句英文，再开始朗读。');return;}
    if(isSpeaking(t,rate)){stopSpeech();render();return;}
    stopSpeech();const token=speechToken;
    const u=new SpeechSynthesisUtterance(t);u.lang='en-GB';u.rate=rate;const voices=speechSynthesis.getVoices();u.voice=voices.find(v=>v.lang==='en-GB')||voices.find(v=>v.lang.startsWith('en'))||null;
    u.onend=()=>{if(token!==speechToken)return;speaking=false;activeSpeechKey='';if(page==='english')render();};u.onerror=()=>{if(token!==speechToken)return;speaking=false;activeSpeechKey='';toast('朗读未完成，请检查设备语音设置。');if(page==='english')render();};
    speaking=true;activeSpeechKey=`${rate}|${t}`;
    try{speechSynthesis.speak(u);}catch{speaking=false;activeSpeechKey='';toast('设备未能开始朗读，请检查语音设置。');}
    render();
  }
  function settings(open=true) {
    $('#settingsBody').innerHTML=`<p>你的资料只用于这个个人工作台。</p><h3>关注方向</h3>${topics.map(t=>`<label class="settings-row"><input type="checkbox" data-topic="${t.id}" ${state.topics.includes(t.id)?'checked':''}> <span>${t.name}</span></label>`).join('')}<h3>收藏与练习记录</h3><p class="muted">当前版本将收藏、笔记和打卡保存在这台设备的浏览器中。手机与电脑不会自动同步，可以通过导出／导入迁移记录。清理浏览器数据会删除本地记录。</p><div class="card-actions">${button('export','导出记录','btn primary')}${button('import','导入记录','btn secondary')}</div><h3>数据与更新</h3>${updateStatusPanel()}<p class="source-note">内置资料保留原始整理日期 ${e(seedCheckedAt)}。当前目录状态：${e(connectionLabel())}。四类来源抓取与内容核验记录分别显示；论文主题检索另由Europe PMC提供。日期与每日练习按北京时间切换。</p><p class="source-note">练习使用设备语音，无录音上传。每项外部资料均保留原始来源。</p><div class="dialog-actions">${button('close-settings','完成','btn secondary')}</div>`;
    if(open&&!$('#settingsDialog').open)$('#settingsDialog').showModal();
  }
  function downloadRecord() {const blob=new Blob([JSON.stringify({app:'research-compass',version:1,exportedAt:new Date().toISOString(),state},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`研途记录-${today}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1500);toast('已导出收藏、笔记和练习记录。');}
  document.addEventListener('click',ev=>{
    const nav=ev.target.closest('[data-page]');if(nav){navigate(nav.dataset.page);return;}
    const b=ev.target.closest('[data-action]');if(!b)return;const a=b.dataset.action,id=b.dataset.id;
    if(a==='settings')return settings();if(a==='close-settings')return $('#settingsDialog').close();
    if(a==='refresh'){loadCatalog();return refresh(true);}
    if(a==='sync-catalog')return loadCatalog();
    if(a==='open-focus'){const item=(b.dataset.target==='funding'?D.funding:D.opportunities).find(x=>x.id===id);navigate(b.dataset.target);if(item){query=item.title;render();}return;}
    if(a==='show-groups'){researchTab='groups';query='';country='';onlySaved=false;if(page!=='research')navigate('research');else render();return;}
    if(a==='go-english')return navigate('english');
    if(a==='research-tab'){researchTab=id;query='';country='';onlySaved=false;render();if(id==='feed')refresh();return;}
    if(a==='topic'){topic=id;groupQuery=null;return refresh();}
    if(a==='clear-group'){groupQuery=null;topic='all';return refresh();}
    if(a==='group-papers'){groupQuery=id;researchTab='feed';return refresh();}
    if(a==='follow'){state.followed=state.followed.includes(id)?state.followed.filter(x=>x!==id):[...state.followed,id];persist();render();return;}
    if(a==='save'){state.saved=saved(id)?state.saved.filter(x=>x!==id):[...state.saved,id];persist();render();return;}
    if(a==='only-saved'){onlySaved=!onlySaved;render();return;}
    if(a==='english-tab'){stopSpeech();englishTab=id;query='';render();return;}
    if(a==='prev-lesson'||a==='next-lesson'||a==='pick-lesson'||a==='today-lesson'){stopSpeech();previewLesson=a==='today-lesson'?null:a==='pick-lesson'?Number(id):Math.max(0,Math.min(29,currentLesson()+(a==='prev-lesson'?-1:1)));render();return;}
    if(a==='speak-lesson'||a==='slow-lesson')return speak(D.english.lessons[currentLesson()].sentence,a==='slow-lesson'?0.65:0.88);
    if(a==='mark-done'){state.log[today]=currentLesson();persist();render();toast('今天的练习已记录，继续保持。');return;}
    if(a==='speak-intro')return speak(D.english.intro[id]);
    if(a==='speak-question')return speak(D.english.questions.find(q=>q.id===id)?.question||'');
    if(a==='save-intro'){state.intro=$('#customIntro').value.trim();persist();toast('你的版本已保存。');return;}
    if(a==='speak-custom'){state.intro=$('#customIntro').value;persist();return speak(state.intro);}
    if(a==='copy-intro'){const t=$('#customIntro').value;if(navigator.clipboard)navigator.clipboard.writeText(t).then(()=>toast('已复制。')).catch(()=>toast('复制未成功，可选中文字手动复制。'));else toast('请选中文字手动复制。');return;}
    if(a==='export')return downloadRecord();if(a==='import')return $('#importFile').click();
  });
  let searchTimer;
  document.addEventListener('input',ev=>{
    if(ev.target.id==='searchInput'){const val=ev.target.value;clearTimeout(searchTimer);searchTimer=setTimeout(()=>{query=val;render();const box=$('#searchInput');if(box){box.focus();try{box.setSelectionRange(val.length,val.length);}catch{}}},220);}
    if(ev.target.dataset.note){state.notes[ev.target.dataset.note]=ev.target.value;persist();}
    if(ev.target.id==='customIntro'){state.intro=ev.target.value;persist();}
  });
  document.addEventListener('change',ev=>{
    const t=ev.target;if(t.id==='countryFilter'){country=t.value;render();}if(t.id==='kindFilter'){kind=t.value;render();}if(t.id==='statusFilter'){statusFilter=t.value;render();}
    if(t.dataset.pipeline){if(t.value)state.pipeline[t.dataset.pipeline]=t.value;else delete state.pipeline[t.dataset.pipeline];persist();toast('跟进状态已保存。');}
    if(t.dataset.topic){const id=t.dataset.topic;if(!t.checked&&state.topics.length===1){t.checked=true;toast('至少保留一个关注方向。');return;}state.topics=t.checked?[...new Set([...state.topics,id])]:state.topics.filter(x=>x!==id);persist();if(page==='research'&&researchTab==='feed'&&topic==='all'&&!groupQuery)refresh();}
  });
  $('#importFile').addEventListener('change',async ev=>{const f=ev.target.files?.[0];if(!f)return;try{if(f.size>2*1024*1024)throw new Error('文件太大，请使用研途导出的记录。');const incoming=C.validateBackup(JSON.parse(await f.text()),D.groups.map(g=>g.id));state={...state,...incoming,followed:[...new Set([...state.followed,...incoming.followed])],saved:[...new Set([...state.saved,...incoming.saved])],log:{...state.log,...incoming.log},pipeline:{...state.pipeline,...incoming.pipeline},notes:{...state.notes,...incoming.notes}};persist();render();toast('记录已合并导入。');}catch(err){toast(err.message||'文件无法读取。');}ev.target.value='';});
  window.addEventListener('hashchange',()=>{const next=location.hash.slice(1);if(names[next]&&next!==page)navigate(next);});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden){const now=C.isoDay();if(now!==today){today=now;previewLesson=null;render();loadCatalog();if(page==='research')refresh();}}});
  window.addEventListener('pagehide',stopSpeech);
  render();loadCatalog();if(page==='research')refresh();
})();
