
(function(){
  if(window.__maitreHibouFrancaisCeinturesV23411) return;
  window.__maitreHibouFrancaisCeinturesV23411 = true;
  try{ document.title = '🦉 Maître Hibou V25.8.84'; }catch(e){}

  const BASE_URL = 'https://script.google.com/macros/s/AKfycbyzfRPrUV7xKgeXUM0LjbOsOne5DieRjDYxmuVbBBUIGL-F9ahMmJZSfpUDYmBaZIOpvQ/exec';
  const SHEET_NAME = 'grammaire';
  const TRAINING_COUNT = 10;
  const CACHE_KEY = 'hibou_v23411_grammaire_rows_cache';
  const CACHE_MAX_AGE_MS = 1000 * 60 * 60 * 24; // V25.4.0 : cache 24h pour ouvrir les exercices plus vite
  const LAST_GOOD_URL_KEY = CACHE_KEY + '_last_good_url';
  const FETCH_TIMEOUT_MS = 3500;
  let rowsLoadingPromise = null;

  const GRAMMAR_BELTS = [
    {id:'blanche', ceinture:'blanche', title:'Phrase affirmative / négative', label:'Ceinture blanche', desc:'Reconnaître et transformer les phrases.', color:'radial-gradient(circle at 35% 25%,#FFFFFF,#EDE7FF 68%,#C8B8F2)', skills:['phrase','affirmative','negative','negation']},
    {id:'jaune', ceinture:'jaune', title:'Le verbe', label:'Ceinture jaune', desc:'Trouver le verbe conjugué.', color:'radial-gradient(circle at 35% 25%,#FFF7B0,#FFD93D 62%,#D9A900)', skills:['verbe']},
    {id:'orange', ceinture:'orange', title:'Le sujet', label:'Ceinture orange', desc:'Identifier le sujet du verbe.', color:'radial-gradient(circle at 35% 25%,#FFD9BF,#FF8A5B 62%,#E75F2B)', skills:['sujet']},
    {id:'verte', ceinture:'verte', title:'Le nom commun', label:'Ceinture verte', desc:'Reconnaître les noms communs.', color:'radial-gradient(circle at 35% 25%,#BDF6C8,#4FD46C 62%,#229B43)', skills:['nom','nom_commun','nomcommun']},
    {id:'bleue', ceinture:'bleue', title:'Le déterminant', label:'Ceinture bleue', desc:'Associer et repérer les déterminants.', color:'radial-gradient(circle at 35% 25%,#CDEAFF,#5AA9FF 62%,#2169CF)', skills:['determinant','determiner']},
    {id:'marron', ceinture:'marron', title:'L’infinitif', label:'Ceinture marron', desc:'Retrouver l’infinitif d’un verbe.', color:'radial-gradient(circle at 35% 25%,#F0D1A7,#C08143 62%,#8B5526)', skills:['infinitif']},
    {id:'noire', ceinture:'noire', title:'L’adjectif', label:'Ceinture noire', desc:'Reconnaître les adjectifs.', color:'radial-gradient(circle at 35% 25%,#777,#222 66%,#050505)', skills:['adjectif']},
    {id:'rouge', ceinture:'rouge', title:'Le groupe nominal', label:'Ceinture rouge', desc:'Repérer et enrichir le groupe nominal.', color:'radial-gradient(circle at 35% 25%,#FF9FA8,#E52837 64%,#A90F1D)', skills:['groupe_nominal','gn']}
  ];
  const IDEAS_CARD = {id:'idees', title:'Idées pour écrire', label:'Entraînement d’écriture', desc:'Tirer une idée et écrire une phrase ou un début d’histoire.', color:'radial-gradient(circle at 35% 25%,#FFF6A8,#FFD93D 62%,#E0A900)'};

  const LOCAL_BANK = {
    blanche:[
      {q:'La phrase « Le chat dort. » est-elle affirmative ou négative ?', options:['affirmative','négative'], correct:0},
      {q:'La phrase « Je ne mange pas de soupe. » est-elle affirmative ou négative ?', options:['affirmative','négative'], correct:1},
      {q:'Quelle phrase est négative ?', options:['Il joue au ballon.','Il ne joue pas au ballon.','Il court vite.'], correct:1},
      {q:'Quelle phrase est affirmative ?', options:['Elle ne chante pas.','Elle chante.','Elle n’écoute jamais.'], correct:1}
    ],
    jaune:[
      {q:'Dans « Les enfants jouent dans la cour. », quel mot est le verbe ?', options:['enfants','jouent','cour'], correct:1},
      {q:'Dans « Le chat dort sur le canapé. », quel mot est le verbe ?', options:['chat','dort','canapé'], correct:1},
      {q:'Dans « Tu regardes un livre. », quel mot est le verbe ?', options:['Tu','regardes','livre'], correct:1},
      {q:'Quel mot est un verbe ?', options:['maison','courir','bleu'], correct:1}
    ],
    verte:[
      {q:'Dans « Le chat dort sur le canapé. », quel mot est un nom commun ?', options:['Le','chat','dort','sur'], correct:1},
      {q:'Dans « Les enfants jouent dans la cour. », quel mot est un nom commun ?', options:['Les','jouent','cour','dans'], correct:2},
      {q:'Quel mot est un nom commun ?', options:['courir','jardin','rapide','il'], correct:1}
    ]
  };
  const LOCAL_IDEAS = [
    {prompt:'Imagine qu’un hibou trouve une clé brillante dans la cour de l’école.', example:'Exemple : Ce matin, Maître Hibou découvre une petite clé dorée sous le banc.'},
    {prompt:'Un cartable se met soudain à parler pendant la classe.', example:'Exemple : Au moment de sortir le cahier, une voix sort du cartable de Lina.'},
    {prompt:'Tu ouvres un livre et la première page devient une porte.', example:'Exemple : La page tremble, puis elle s’ouvre comme l’entrée d’un château.'},
    {prompt:'Dans la cour, une marelle magique apparaît.', example:'Exemple : À chaque case, les enfants voyagent dans un lieu différent.'},
    {prompt:'Ton crayon invente une histoire à ta place.', example:'Exemple : Le crayon glisse sur la feuille et écrit une phrase incroyable.'}
  ];

  let rowsCache = null;
  let state = {belt:null, questions:[], index:0, score:0, answered:false, source:'banque locale'};

  function byId(id){ return document.getElementById(id); }
  function esc(v){ return String(v==null?'':v).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]; }); }
  function norm(v){ return String(v==null?'':v).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,''); }
  function shuffle(a){ const arr=(a||[]).slice(); for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); const t=arr[i]; arr[i]=arr[j]; arr[j]=t; } return arr; }
  function addParam(url,k,v){ return url + (url.indexOf('?')===-1 ? '?' : '&') + encodeURIComponent(k) + '=' + encodeURIComponent(v); }
  function readCell(row,names,index){
    if(Array.isArray(row)) return row[index] == null ? '' : row[index];
    for(let i=0;i<names.length;i++){
      const wanted = names[i];
      if(row && Object.prototype.hasOwnProperty.call(row,wanted) && String(row[wanted]||'').trim() !== '') return row[wanted];
      const keys = Object.keys(row||{});
      for(let k=0;k<keys.length;k++) if(norm(keys[k])===norm(wanted) && String(row[keys[k]]||'').trim() !== '') return row[keys[k]];
    }
    return '';
  }
  function responseRows(data){
    let rows=[];
    if(Array.isArray(data)) rows=data;
    else if(data && Array.isArray(data.rows)) rows=data.rows;
    else if(data && Array.isArray(data.data)) rows=data.data;
    else if(data && Array.isArray(data.questions)) rows=data.questions;
    else if(data && data.result && Array.isArray(data.result)) rows=data.result;
    if(rows.length && Array.isArray(rows[0])){
      const headerNorm = rows[0].map(norm);
      if(headerNorm.indexOf('question') !== -1 || headerNorm.indexOf('ceinture') !== -1){
        const header = rows[0].map(function(h){ return String(h||'').trim(); });
        return rows.slice(1).map(function(r){ const obj={}; header.forEach(function(h,i){ if(h) obj[h]=r[i]; }); return obj; });
      }
    }
    return rows;
  }
  function baseUrls(){
    return [
      BASE_URL + '?onglet=' + encodeURIComponent(SHEET_NAME),
      BASE_URL + '?sheet=' + encodeURIComponent(SHEET_NAME),
      BASE_URL + '?tab=' + encodeURIComponent(SHEET_NAME),
      BASE_URL + '?matiere=Grammaire',
      BASE_URL + '?matiere=grammaire',
      BASE_URL + '?action=questions&onglet=' + encodeURIComponent(SHEET_NAME),
      BASE_URL
    ];
  }
  function getCachedRows(maxAgeMs){
    try{
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      if(cached && Array.isArray(cached.rows) && Date.now() - cached.time < maxAgeMs){
        return cached.rows;
      }
    }catch(e){}
    return null;
  }
  function saveRowsToCache(rows, url){
    rowsCache = rows;
    try{ localStorage.setItem(CACHE_KEY, JSON.stringify({time:Date.now(),rows:rows})); }catch(e){}
    if(url){ try{ localStorage.setItem(LAST_GOOD_URL_KEY, url); }catch(e){} }
    return rows;
  }
  function orderedBaseUrls(){
    const urls = baseUrls();
    let last = '';
    try{ last = localStorage.getItem(LAST_GOOD_URL_KEY) || ''; }catch(e){}
    if(last && urls.indexOf(last) !== -1){
      return [last].concat(urls.filter(function(u){ return u !== last; }));
    }
    return urls;
  }
  async function fetchJson(url){
    const controller = window.AbortController ? new AbortController() : null;
    const timer = controller ? setTimeout(function(){ try{ controller.abort(); }catch(e){} }, FETCH_TIMEOUT_MS) : null;
    try{
      const res = await fetch(addParam(url,'t',Date.now()), {cache:'no-store', signal: controller ? controller.signal : undefined});
      if(!res.ok) throw new Error('HTTP '+res.status);
      return responseRows(await res.json());
    }finally{
      if(timer) clearTimeout(timer);
    }
  }
  function fetchJsonp(url){
    return new Promise(function(resolve,reject){
      const cb='__hibouFrV23411_'+Date.now()+'_'+Math.floor(Math.random()*10000);
      let done=false;
      const script=document.createElement('script');
      const timer=setTimeout(function(){ if(!done){ cleanup(); reject(new Error('JSONP timeout')); } },FETCH_TIMEOUT_MS);
      function cleanup(){ done=true; clearTimeout(timer); try{ delete window[cb]; }catch(e){ window[cb]=undefined; } if(script.parentNode) script.parentNode.removeChild(script); }
      window[cb]=function(data){ if(done) return; cleanup(); resolve(responseRows(data)); };
      script.onerror=function(){ if(done) return; cleanup(); reject(new Error('JSONP error')); };
      script.src=addParam(addParam(url,'callback',cb),'t',Date.now());
      document.body.appendChild(script);
    });
  }
  async function loadRows(force){
    if(!force && rowsCache) return rowsCache;
    if(!force){
      const cached = getCachedRows(CACHE_MAX_AGE_MS);
      if(cached){ rowsCache = cached; return rowsCache; }
      if(rowsLoadingPromise) return rowsLoadingPromise;
    }
    const job = (async function(){
      for(const url of orderedBaseUrls()){
        try{ const rows = await fetchJson(url); if(rows && rows.length) return saveRowsToCache(rows, url); }catch(e){}
        try{ const rows = await fetchJsonp(url); if(rows && rows.length) return saveRowsToCache(rows, url); }catch(e){}
      }
      throw new Error('Aucune donnée Sheet trouvée');
    })();
    if(!force) rowsLoadingPromise = job;
    try{ return await job; }
    finally{ if(rowsLoadingPromise === job) rowsLoadingPromise = null; }
  }
  window.refreshFrenchGrammarSheetV23411 = function(){ rowsCache=null; rowsLoadingPromise=null; try{ localStorage.removeItem(CACHE_KEY); }catch(e){} return loadRows(true); };
  window.preloadFrenchGrammarRowsV23411 = function(){
    try{
      if(rowsCache) return Promise.resolve(rowsCache);
      const cached = getCachedRows(CACHE_MAX_AGE_MS);
      if(cached){ rowsCache = cached; return Promise.resolve(rowsCache); }
      return loadRows(false).catch(function(e){ console.warn('Préchargement grammaire impossible', e); return null; });
    }catch(e){ return Promise.resolve(null); }
  };

  function rowToQuestion(row){
    const q = String(readCell(row,['question','Question'],5) || '').trim();
    const rawOptions = [
      readCell(row,['A','a'],6), readCell(row,['B','b'],7), readCell(row,['C','c'],8), readCell(row,['D','d'],9)
    ].map(function(v){ return String(v==null?'':v).trim(); }).filter(Boolean);
    const rep = String(readCell(row,['reponse','réponse','Reponse','Réponse'],10) || '').trim();
    if(!q || rawOptions.length < 2 || !rep) return null;
    let correct = rawOptions.findIndex(function(o){ return norm(o) === norm(rep); });
    if(correct < 0 && /^[ABCD]$/i.test(rep)) correct = 'ABCD'.indexOf(rep.toUpperCase());
    if(correct < 0) correct = rawOptions.findIndex(function(o){ return String(o).trim() === rep; });
    if(correct < 0 || correct >= rawOptions.length) return null;
    return {
      q:q,
      options:rawOptions,
      correct:correct,
      mode:String(readCell(row,['mode','Mode'],4)||''),
      difficulte:String(readCell(row,['difficulte','difficulté','Difficulte','Difficulté'],11)||''),
      ceinture:String(readCell(row,['ceinture','Ceinture'],0)||''),
      competence:String(readCell(row,['competence','compétence','Competence','Compétence'],2)||'')
    };
  }
  function matchBelt(row,belt){
    const ceinture = norm(readCell(row,['ceinture','Ceinture'],0));
    const comp = norm(readCell(row,['competence','compétence','Competence','Compétence'],2));
    const question = norm(readCell(row,['question','Question'],5));
    const mode = norm(readCell(row,['mode','Mode'],4));
    const skills = (belt.skills||[]).map(norm);

    // V25.4.0 — Entraînement Français : le clic sur une ceinture doit lancer
    // uniquement la notion de cette ceinture.
    // Priorité à la colonne competence : si elle existe, elle doit correspondre à la notion.
    // Cela évite qu'une ligne marquée par erreur "ceinture blanche" mais "determinant"
    // apparaisse dans Phrase affirmative / négative.
    if(comp){
      return skills.some(function(s){ return comp === s || comp.indexOf(s) !== -1 || s.indexOf(comp) !== -1; });
    }

    // Si la colonne competence est absente, on accepte la ceinture seulement avec une
    // sécurité sur le texte de la question pour éviter les mélanges de notions.
    if(ceinture !== norm(belt.ceinture) && ceinture !== norm(belt.id)) return false;
    const text = question + ' ' + mode;
    if(belt.id === 'blanche'){
      return /(phrase|affirmative|negative|negation|forme)/.test(text) && !/(determinant|sujet|verbe|nom|adjectif|infinitif|groupe_nominal)/.test(text);
    }
    return skills.some(function(s){ return text.indexOf(s) !== -1; });
  }
  async function questionsForBelt(belt){
    let source = 'banque locale';
    let questions = [];
    try{
      const rows = await loadRows(false);
      questions = (rows||[]).filter(function(r){ return matchBelt(r,belt); }).map(rowToQuestion).filter(Boolean);
      if(questions.length) source = 'Google Sheets · onglet grammaire';
    }catch(e){ console.warn('Français ceintures : Sheet indisponible', e); }
    if(!questions.length && LOCAL_BANK[belt.id]) questions = LOCAL_BANK[belt.id].slice();
    return {questions:questions, source:source};
  }

  function overlay(){
    let ov = byId('frenchTrainingOverlayV2348');
    if(ov) return ov;
    ov = document.createElement('div');
    ov.id='frenchTrainingOverlayV2348';
    ov.className='hidden';
    ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true'); ov.setAttribute('aria-label','Français - entraînements');
    ov.innerHTML='<div class="fr-v2348-popup"><div class="fr-v2348-topbar"><div class="fr-v2348-chip">📖 Français</div><button class="fr-v2348-close" type="button" onclick="closeFrenchTrainingPopupV2348()" aria-label="Fermer la popup Français">×</button></div><div id="frenchPopupInnerV2348"></div></div>';
    document.body.appendChild(ov);
    ov.addEventListener('click',function(ev){ if(ev.target===ov) window.closeFrenchTrainingPopupV2348(); });
    return ov;
  }
  function setInner(html){ const inner=byId('frenchPopupInnerV2348'); if(inner) inner.innerHTML=html; }
  function lockPage(lock){ document.documentElement.style.overflow=lock?'hidden':''; document.body.style.overflow=lock?'hidden':''; }
  function hideOldFrenchUI(){
    const panel=byId('v2173ActivitiesPanel'); if(panel){ panel.classList.remove('open'); panel.innerHTML=''; panel.dataset.subject=''; }
    const quick=byId('quickQuestions'); if(quick){ quick.innerHTML=''; quick.style.display='none'; }
    document.querySelectorAll('.subject-btn[data-subject="francais"]').forEach(function(b){ b.classList.add('active'); b.setAttribute('aria-expanded','true'); });
  }
  function headerHTML(){
    return '<div class="fr-v2348-header">'
      + '<div class="fr-v2348-owl">🦉</div>'
      + '<div class="fr-v2348-title"><h2>📖 Entraînements de grammaire</h2><p>Choisis une ceinture pour t’entraîner.</p><div class="fr-v23411-grammar-note">Les questions viennent de Google Sheets « Maître Hibou - Banque de Questions », onglet « grammaire ».</div></div>'
      + '</div>';
  }
  function rowHTML(belt){
    const isIdeas = belt.id === 'idees';
    return '<div class="fr-v23411-row '+(isIdeas?'fr-v23411-ideas-row':'')+'">'
      + '<div class="fr-v23411-dot" style="background:'+esc(belt.color)+'"></div>'
      + '<div class="fr-v23411-main"><strong>'+esc(belt.title)+'</strong><span>'+esc(belt.label)+'</span><div class="fr-v23411-mode">'+esc(belt.desc)+'</div></div>'
      + '<button type="button" class="fr-v23411-train-btn" onclick="startFrenchTrainingV2348(\''+esc(belt.id)+'\')">'+(isIdeas?'✏️ S’entraîner':'📖 S’entraîner — 10 questions')+'</button>'
      + '</div>';
  }
  function renderList(){
    const cards = GRAMMAR_BELTS.map(rowHTML).join('') + rowHTML(IDEAS_CARD);
    setInner(headerHTML() + '<div class="fr-v2348-content"><section class="fr-v2348-panel"><h3 class="fr-v23411-section-title">Grammaire</h3><div class="fr-v23411-list">'+cards+'</div></section></div>');
  }
  window.renderFrenchTrainingListV2348 = renderList;
  window.openFrenchTrainingPopupV2348 = function(){
    hideOldFrenchUI();
    const ov = overlay();
    renderList();
    // V25.4.0 : on prépare la banque grammaire dès l'ouverture de Français.
    // Ainsi, le clic sur une ceinture attend beaucoup moins Google Sheets.
    try{ setTimeout(function(){ if(window.preloadFrenchGrammarRowsV23411) window.preloadFrenchGrammarRowsV23411(); }, 0); }catch(e){}
    ov.classList.remove('hidden');
    lockPage(true);
  };
  window.closeFrenchTrainingPopupV2348 = function(){
    const ov=byId('frenchTrainingOverlayV2348'); if(ov) ov.classList.add('hidden');
    lockPage(false);
  };

  window.startFrenchTrainingV2348 = async function(activityId){
    if(activityId === 'idees') return renderIdea();
    const belt = GRAMMAR_BELTS.find(function(b){ return b.id === activityId; }) || GRAMMAR_BELTS[0];
    state = {belt:belt, questions:[], index:0, score:0, answered:false, source:'banque locale'};
    setInner(headerHTML() + '<div class="fr-v2348-content"><section class="fr-v2348-panel"><button type="button" class="fr-v2348-back" onclick="renderFrenchTrainingListV2348()">← Retour aux entraînements</button><div class="fr-v2348-feedback" style="padding:28px">🦉 Chargement des questions de '+esc(belt.label)+' depuis Google Sheets...</div></section></div>');
    const loaded = await questionsForBelt(belt);
    state.questions = shuffle(loaded.questions).slice(0,TRAINING_COUNT);
    state.source = loaded.source;
    if(!state.questions.length){
      setInner(headerHTML() + '<div class="fr-v2348-content"><section class="fr-v2348-panel"><button type="button" class="fr-v2348-back" onclick="renderFrenchTrainingListV2348()">← Retour aux entraînements</button><div class="fr-v2348-feedback" style="padding:24px;color:#7A2222">Je n’ai trouvé aucune question pour <strong>'+esc(belt.label)+'</strong> dans le Sheet.<br>Vérifie les colonnes <strong>ceinture</strong> et <strong>competence</strong>.</div></section></div>');
      return;
    }
    renderQuestion();
  };
  function renderQuestion(){
    const q=state.questions[state.index]; if(!q){ return renderResult(); }
    const opts=q.options.map(function(opt,i){ return '<button type="button" class="fr-v2348-option" data-index="'+i+'" onclick="answerFrenchTrainingV2348('+i+')">'+esc(opt)+'</button>'; }).join('');
    const meta = '<div class="fr-v23411-question-meta"><span class="fr-v23411-pill">'+esc(state.belt.label)+'</span><span class="fr-v23411-pill">Source : '+esc(state.source)+'</span>'+(q.mode?'<span class="fr-v23411-pill">Mode : '+esc(q.mode)+'</span>':'')+'</div>';
    setInner(headerHTML() + '<div class="fr-v2348-content"><section class="fr-v2348-panel">'
      + '<div class="fr-v2348-training-head"><button type="button" class="fr-v2348-back" onclick="renderFrenchTrainingListV2348()">← Retour aux entraînements</button><div class="fr-v2348-training-title">'+esc(state.belt.title)+'</div><div></div></div>'
      + meta
      + '<div class="fr-v2348-progress">Question '+(state.index+1)+' / '+state.questions.length+'</div>'
      + '<div class="fr-v2348-question">'+esc(q.q)+'</div><div class="fr-v2348-options">'+opts+'</div><div id="frFeedbackV2348" class="fr-v2348-feedback"></div>'
      + '</section></div>');
    state.answered=false;
  }
  window.answerFrenchTrainingV2348 = function(i){
    if(state.answered) return;
    state.answered=true;
    const q=state.questions[state.index];
    const buttons=[].slice.call(document.querySelectorAll('#frenchTrainingOverlayV2348 .fr-v2348-option'));
    buttons.forEach(function(btn){ btn.disabled=true; });
    const ok = i === q.correct;
    if(ok) state.score++;
    buttons.forEach(function(btn,idx){ if(idx===q.correct) btn.classList.add('correct'); if(idx===i && !ok) btn.classList.add('wrong'); });
    const fb=byId('frFeedbackV2348'); if(fb) fb.innerHTML = ok ? '✅ Bravo !' : '💡 La bonne réponse était : <strong>'+esc(q.options[q.correct])+'</strong>';
    setTimeout(function(){ state.index++; if(state.index >= state.questions.length) renderResult(); else renderQuestion(); }, ok ? 720 : 1250);
  };
  function renderResult(){
    const total=state.questions.length || TRAINING_COUNT;
    const pct=Math.round((state.score/total)*100);
    setInner(headerHTML() + '<div class="fr-v2348-content"><section class="fr-v2348-panel"><div class="fr-v2348-result"><h3>Bravo, entraînement terminé !</h3><div class="fr-v2348-score-grid"><div class="fr-v2348-score-card">Score<b>'+state.score+' / '+total+'</b></div><div class="fr-v2348-score-card">Réussite<b>'+pct+'%</b></div></div><div class="fr-v2348-feedback">'+esc(state.belt.label)+' · Source : '+esc(state.source)+'</div><div class="fr-v2348-actions"><button type="button" class="fr-v2348-action" onclick="startFrenchTrainingV2348(\''+esc(state.belt.id)+'\')">🔁 Refaire l’entraînement</button><button type="button" class="fr-v2348-action secondary" onclick="renderFrenchGrammarListV25720()">← Retour aux ceintures</button><button type="button" class="fr-v2348-action secondary" onclick="renderFrenchDomainMenuV25720()">Menu Français</button><button type="button" class="fr-v2348-action secondary" onclick="closeFrenchTrainingPopupV2348()">Fermer</button></div></div></section></div>');
    try{
      var mhLabel = (state.belt && (state.belt.title || state.belt.label || state.belt.id)) || 'grammaire';
      var mhScore = 'Score ' + state.score + ' / ' + total + ' — ' + pct + '%';
      if(window.hibouRecordTrainingSuccessV25220) window.hibouRecordTrainingSuccessV25220('français', mhLabel, mhScore);
      else if(window.hibouRecordTrainingSuccessV25219) window.hibouRecordTrainingSuccessV25219('français', mhLabel, mhScore);
      else if(window.hibouRecordSuccessV25220) window.hibouRecordSuccessV25220('📖 Entraînement français : ' + mhLabel + ' — ' + mhScore, 'entrainement');
    }catch(e){}
  }
  function renderIdea(){
    const item = shuffle(LOCAL_IDEAS)[0];
    setInner(headerHTML() + '<div class="fr-v2348-content"><section class="fr-v2348-panel"><div class="fr-v2348-training-head"><button type="button" class="fr-v2348-back" onclick="renderFrenchTrainingListV2348()">← Retour aux entraînements</button><div class="fr-v2348-training-title">✏️ Idées pour écrire</div><div></div></div><div class="fr-v2348-idea-box"><div class="fr-v2348-progress">Idée d’écriture</div><div class="fr-v2348-idea-card">'+esc(item.prompt)+'</div><div class="fr-v2348-example"><strong>Pour t’aider :</strong><br>'+esc(item.example)+'</div><textarea class="fr-v2348-textarea" placeholder="Écris ici ta phrase ou ton début d’histoire..."></textarea><div class="fr-v2348-actions"><button type="button" class="fr-v2348-action" onclick="window.hibouFrenchWritingDoneV25717&&window.hibouFrenchWritingDoneV25717(this)">✅ J’ai terminé mon écrit</button><button type="button" class="fr-v2348-action" onclick="startFrenchTrainingV2348(\'idees\')">🎲 Nouvelle idée</button><button type="button" class="fr-v2348-action secondary" onclick="renderFrenchTrainingListV2348()">← Retour aux entraînements</button></div></div></section></div>');
  }

  function interceptFrenchClickV23411(ev){
    const target = ev.target && ev.target.closest && ev.target.closest('.subject-btn[data-subject="francais"], button[data-subject="francais"]');
    if(!target) return;
    if(target.closest && target.closest('#frenchTrainingOverlayV2348')) return;
    ev.preventDefault(); ev.stopPropagation(); if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    window.openFrenchTrainingPopupV2348();
  }
  document.addEventListener('click', interceptFrenchClickV23411, true);
  const previousSelectSubjectV23411 = window.selectSubject;
  if(typeof previousSelectSubjectV23411 === 'function'){
    window.selectSubject = function(btn,subject){ if(norm(subject)==='francais'){ window.openFrenchTrainingPopupV2348(); return false; } return previousSelectSubjectV23411.apply(this,arguments); };
  }
})();
