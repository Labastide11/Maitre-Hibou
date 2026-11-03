
(function(){
  if(window.__maitreHibouV25222FrancaisProgressionStable) return;
  window.__maitreHibouV25222FrancaisProgressionStable = true;
  try{ document.title = '🦉 Maître Hibou V25.8.84'; }catch(e){}

  var BASE_URL = 'https://script.google.com/macros/s/AKfycbyzfRPrUV7xKgeXUM0LjbOsOne5DieRjDYxmuVbBBUIGL-F9ahMmJZSfpUDYmBaZIOpvQ/exec';
  var SHEET_NAME = 'grammaire';
  var CACHE_KEY = 'hibou_v25222_francais_grammaire_rows_cache';
  var LAST_GOOD_URL_KEY = CACHE_KEY + '_last_good_url';
  var TRAINING_COUNT = 10;
  var FETCH_TIMEOUT_MS = 3000;
  var rowsCache = null;
  var rowsLoadingPromise = null;
  var state = {belt:null, questions:[], index:0, score:0, answered:false, source:'banque locale'};

  var GRAMMAR_BELTS = [
    {id:'blanche', ceinture:'blanche', title:'Phrase affirmative / négative', label:'Ceinture blanche', desc:'Reconnaître et transformer les phrases.', color:'radial-gradient(circle at 35% 25%,#FFFFFF,#EDE7FF 68%,#C8B8F2)', skills:['phrase','affirmative','negative','negation','forme']},
    {id:'jaune', ceinture:'jaune', title:'Le verbe', label:'Ceinture jaune', desc:'Trouver le verbe conjugué.', color:'radial-gradient(circle at 35% 25%,#FFF7B0,#FFD93D 62%,#D9A900)', skills:['verbe']},
    {id:'orange', ceinture:'orange', title:'Le sujet', label:'Ceinture orange', desc:'Identifier le sujet du verbe.', color:'radial-gradient(circle at 35% 25%,#FFD9BF,#FF8A5B 62%,#E75F2B)', skills:['sujet']},
    {id:'verte', ceinture:'verte', title:'Le nom commun', label:'Ceinture verte', desc:'Reconnaître les noms communs.', color:'radial-gradient(circle at 35% 25%,#BDF6C8,#4FD46C 62%,#229B43)', skills:['nom','nom_commun','nomcommun']},
    {id:'bleue', ceinture:'bleue', title:'Le déterminant', label:'Ceinture bleue', desc:'Associer et repérer les déterminants.', color:'radial-gradient(circle at 35% 25%,#CDEAFF,#5AA9FF 62%,#2169CF)', skills:['determinant','determiner']},
    {id:'marron', ceinture:'marron', title:'L’infinitif', label:'Ceinture marron', desc:'Retrouver l’infinitif d’un verbe.', color:'radial-gradient(circle at 35% 25%,#F0D1A7,#C08143 62%,#8B5526)', skills:['infinitif']},
    {id:'noire', ceinture:'noire', title:'L’adjectif', label:'Ceinture noire', desc:'Reconnaître les adjectifs.', color:'radial-gradient(circle at 35% 25%,#777,#222 66%,#050505)', skills:['adjectif']},
    {id:'rouge', ceinture:'rouge', title:'Le groupe nominal', label:'Ceinture rouge', desc:'Repérer et enrichir le groupe nominal.', color:'radial-gradient(circle at 35% 25%,#FF9FA8,#E52837 64%,#A90F1D)', skills:['groupe_nominal','gn']}
  ];
  var IDEAS_CARD = {id:'idees', title:'Idées pour écrire', label:'Entraînement d’écriture', desc:'Tirer une idée et écrire une phrase ou un début d’histoire.', color:'radial-gradient(circle at 35% 25%,#FFF6A8,#FFD93D 62%,#E0A900)'};

  var LOCAL_BANK = {
    blanche:[
      {q:'La phrase « Le chat dort. » est-elle affirmative ou négative ?', options:['affirmative','négative'], correct:0},
      {q:'La phrase « Je ne mange pas de soupe. » est-elle affirmative ou négative ?', options:['affirmative','négative'], correct:1},
      {q:'Quelle phrase est négative ?', options:['Il joue au ballon.','Il ne joue pas au ballon.','Il court vite.'], correct:1},
      {q:'Quelle phrase est affirmative ?', options:['Elle ne chante pas.','Elle chante.','Elle n’écoute jamais.'], correct:1},
      {q:'Transforme en phrase négative : « Nous sommes prêts. »', options:['Nous ne sommes pas prêts.','Nous sommes pas prêts.','Nous ne prêts sommes pas.'], correct:0},
      {q:'Transforme en phrase affirmative : « Tu ne dessines pas. »', options:['Tu ne dessines.','Tu dessines.','Tu pas dessines.'], correct:1},
      {q:'La phrase « Les élèves ne bavardent pas. » est...', options:['affirmative','négative'], correct:1},
      {q:'La phrase « Maître Hibou sourit. » est...', options:['affirmative','négative'], correct:0},
      {q:'Quelle phrase contient une négation correcte ?', options:['Je mange pas.','Je ne mange pas.','Je ne mange.'], correct:1},
      {q:'Quelle phrase est affirmative ?', options:['Il ne lit jamais.','Il lit souvent.','Il ne lit pas.'], correct:1}
    ],
    jaune:[
      {q:'Dans « Les enfants jouent dans la cour. », quel mot est le verbe ?', options:['enfants','jouent','cour'], correct:1},
      {q:'Dans « Le chat dort sur le canapé. », quel mot est le verbe ?', options:['chat','dort','canapé'], correct:1},
      {q:'Dans « Tu regardes un livre. », quel mot est le verbe ?', options:['Tu','regardes','livre'], correct:1},
      {q:'Quel mot est un verbe ?', options:['maison','courir','bleu'], correct:1}
    ],
    orange:[
      {q:'Dans « Le chien aboie. », qui fait l’action ?', options:['Le chien','aboie','Le'], correct:0},
      {q:'Dans « Les élèves écrivent. », quel est le sujet ?', options:['écrivent','Les élèves','Les'], correct:1},
      {q:'Dans « Ma sœur chante. », quel est le sujet ?', options:['Ma sœur','chante','sœur chante'], correct:0}
    ],
    verte:[
      {q:'Dans « Le chat dort sur le canapé. », quel mot est un nom commun ?', options:['Le','chat','dort','sur'], correct:1},
      {q:'Dans « Les enfants jouent dans la cour. », quel mot est un nom commun ?', options:['Les','jouent','cour','dans'], correct:2},
      {q:'Quel mot est un nom commun ?', options:['courir','jardin','rapide','il'], correct:1}
    ],
    bleue:[
      {q:'Dans « Le petit chien dort. », quel mot est un déterminant ?', options:['Le','petit','chien','dort'], correct:0},
      {q:'Quel mot est un déterminant ?', options:['maison','une','courir','bleu'], correct:1},
      {q:'Dans « Mes crayons sont rangés. », quel mot est un déterminant ?', options:['Mes','crayons','rangés'], correct:0}
    ],
    marron:[
      {q:'Quel est l’infinitif de « mange » ?', options:['manger','mangé','mangeons'], correct:0},
      {q:'Quel est l’infinitif de « finit » ?', options:['finir','fini','finissons'], correct:0},
      {q:'Quel est l’infinitif de « court » ?', options:['courir','couru','courons'], correct:0}
    ],
    noire:[
      {q:'Dans « Le grand arbre bouge. », quel mot est un adjectif ?', options:['Le','grand','arbre','bouge'], correct:1},
      {q:'Quel mot est un adjectif ?', options:['rapide','maison','courir','le'], correct:0},
      {q:'Dans « Une jolie fleur pousse. », quel mot est un adjectif ?', options:['Une','jolie','fleur','pousse'], correct:1}
    ],
    rouge:[
      {q:'Quel groupe est un groupe nominal ?', options:['court vite','le petit chat','mange une pomme'], correct:1},
      {q:'Dans « La grande maison blanche », que reconnais-tu ?', options:['un verbe','un groupe nominal','une phrase négative'], correct:1},
      {q:'Quel groupe nominal est correct ?', options:['un chien noir','mange vite','ne joue pas'], correct:0}
    ]
  };
  var LOCAL_IDEAS = [
    {prompt:'Imagine qu’un hibou trouve une clé brillante dans la cour de l’école.', example:'Ce matin, Maître Hibou découvre une petite clé dorée sous le banc.'},
    {prompt:'Un cartable se met soudain à parler pendant la classe.', example:'Au moment de sortir le cahier, une voix sort du cartable de Lina.'},
    {prompt:'Tu ouvres un livre et la première page devient une porte.', example:'La page tremble, puis elle s’ouvre comme l’entrée d’un château.'}
  ];

  function byId(id){ return document.getElementById(id); }
  function esc(v){ return String(v==null?'':v).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]; }); }
  function norm(v){ return String(v==null?'':v).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,''); }
  function shuffle(a){ var arr=(a||[]).slice(); for(var i=arr.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=arr[i]; arr[i]=arr[j]; arr[j]=t; } return arr; }
  function addParam(url,k,v){ return url + (url.indexOf('?')===-1 ? '?' : '&') + encodeURIComponent(k) + '=' + encodeURIComponent(v); }
  function lockPage(lock){ try{ document.documentElement.style.overflow=lock?'hidden':''; document.body.style.overflow=lock?'hidden':''; }catch(e){} }
  function readCell(row,names,index){
    if(Array.isArray(row)) return row[index] == null ? '' : row[index];
    var keys = Object.keys(row||{});
    for(var i=0;i<names.length;i++){
      var wanted = names[i];
      if(row && Object.prototype.hasOwnProperty.call(row,wanted) && String(row[wanted]||'').trim() !== '') return row[wanted];
      for(var k=0;k<keys.length;k++){ if(norm(keys[k])===norm(wanted) && String(row[keys[k]]||'').trim() !== '') return row[keys[k]]; }
    }
    return '';
  }
  function responseRows(data){
    var rows=[];
    if(Array.isArray(data)) rows=data;
    else if(data && Array.isArray(data.rows)) rows=data.rows;
    else if(data && Array.isArray(data.data)) rows=data.data;
    else if(data && Array.isArray(data.questions)) rows=data.questions;
    else if(data && data.result && Array.isArray(data.result)) rows=data.result;
    if(rows.length && Array.isArray(rows[0])){
      var headerNorm = rows[0].map(norm);
      if(headerNorm.indexOf('question') !== -1 || headerNorm.indexOf('ceinture') !== -1){
        var header = rows[0].map(function(h){ return String(h||'').trim(); });
        return rows.slice(1).map(function(r){ var obj={}; header.forEach(function(h,i){ if(h) obj[h]=r[i]; }); return obj; });
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
  function cachedRows(){
    try{ var c=JSON.parse(localStorage.getItem(CACHE_KEY)||'null'); if(c && Array.isArray(c.rows) && Date.now()-c.time < 86400000) return c.rows; }catch(e){}
    return null;
  }
  function saveRows(rows,url){ rowsCache=rows; try{ localStorage.setItem(CACHE_KEY, JSON.stringify({time:Date.now(), rows:rows})); }catch(e){} if(url){ try{ localStorage.setItem(LAST_GOOD_URL_KEY,url); }catch(e){} } return rows; }
  function orderedUrls(){ var urls=baseUrls(); var last=''; try{ last=localStorage.getItem(LAST_GOOD_URL_KEY)||''; }catch(e){} return last && urls.indexOf(last)!==-1 ? [last].concat(urls.filter(function(u){ return u!==last; })) : urls; }
  function fetchJson(url){
    var controller = window.AbortController ? new AbortController() : null;
    var timer = controller ? setTimeout(function(){ try{ controller.abort(); }catch(e){} }, FETCH_TIMEOUT_MS) : null;
    return fetch(addParam(url,'t',Date.now()), {cache:'no-store', signal:controller?controller.signal:undefined}).then(function(res){ if(!res.ok) throw new Error('HTTP '+res.status); return res.json(); }).then(responseRows).finally(function(){ if(timer) clearTimeout(timer); });
  }
  function fetchJsonp(url){
    return new Promise(function(resolve,reject){
      var cb='__hibouFrV25222_'+Date.now()+'_'+Math.floor(Math.random()*10000);
      var script=document.createElement('script'); var done=false;
      var timer=setTimeout(function(){ if(!done){ cleanup(); reject(new Error('JSONP timeout')); } }, FETCH_TIMEOUT_MS);
      function cleanup(){ done=true; clearTimeout(timer); try{ delete window[cb]; }catch(e){ window[cb]=undefined; } if(script.parentNode) script.parentNode.removeChild(script); }
      window[cb]=function(data){ if(done) return; cleanup(); resolve(responseRows(data)); };
      script.onerror=function(){ if(done) return; cleanup(); reject(new Error('JSONP error')); };
      script.src=addParam(addParam(url,'callback',cb),'t',Date.now());
      document.body.appendChild(script);
    });
  }
  function loadRows(force){
    if(!force){ if(rowsCache) return Promise.resolve(rowsCache); var c=cachedRows(); if(c){ rowsCache=c; return Promise.resolve(c); } if(rowsLoadingPromise) return rowsLoadingPromise; }
    rowsLoadingPromise = (async function(){
      var urls=orderedUrls();
      for(var i=0;i<urls.length;i++){
        try{ var a=await fetchJson(urls[i]); if(a && a.length) return saveRows(a,urls[i]); }catch(e){}
        try{ var b=await fetchJsonp(urls[i]); if(b && b.length) return saveRows(b,urls[i]); }catch(e){}
      }
      throw new Error('Aucune donnée');
    })();
    return rowsLoadingPromise.finally(function(){ rowsLoadingPromise=null; });
  }
  function rowToQuestion(row){
    var q=String(readCell(row,['question','Question'],5)||'').trim();
    var raw=[readCell(row,['A','a'],6),readCell(row,['B','b'],7),readCell(row,['C','c'],8),readCell(row,['D','d'],9)].map(function(v){return String(v==null?'':v).trim();}).filter(Boolean);
    var rep=String(readCell(row,['reponse','réponse','Reponse','Réponse'],10)||'').trim();
    if(!q || raw.length<2 || !rep) return null;
    var correct=raw.findIndex(function(o){ return norm(o)===norm(rep); });
    if(correct<0 && /^[ABCD]$/i.test(rep)) correct='ABCD'.indexOf(rep.toUpperCase());
    if(correct<0 && /^\d+$/.test(rep)) correct=Math.max(0, Number(rep)-1);
    if(correct<0) correct=raw.findIndex(function(o){ return String(o).trim()===rep; });
    if(correct<0 || correct>=raw.length) return null;
    return {q:q, options:raw, correct:Number(correct), mode:String(readCell(row,['mode','Mode'],4)||''), competence:String(readCell(row,['competence','compétence','Competence','Compétence'],2)||''), ceinture:String(readCell(row,['ceinture','Ceinture'],0)||'')};
  }
  function matchBelt(row,belt){
    var ceinture=norm(readCell(row,['ceinture','Ceinture'],0));
    var comp=norm(readCell(row,['competence','compétence','Competence','Compétence'],2));
    var question=norm(readCell(row,['question','Question'],5));
    var mode=norm(readCell(row,['mode','Mode'],4));
    var skills=(belt.skills||[]).map(norm);
    if(comp) return skills.some(function(s){ return comp===s || comp.indexOf(s)!==-1 || s.indexOf(comp)!==-1; });
    if(ceinture!==norm(belt.ceinture) && ceinture!==norm(belt.id)) return false;
    var text=question+' '+mode;
    if(belt.id==='blanche') return /(phrase|affirmative|negative|negation|forme)/.test(text) && !/(determinant|sujet|verbe|nom|adjectif|infinitif|groupe_nominal)/.test(text);
    return skills.some(function(s){ return text.indexOf(s)!==-1; });
  }
  function questionsForBelt(belt){
    return loadRows(false).then(function(rows){
      var qs=(rows||[]).filter(function(r){ return matchBelt(r,belt); }).map(rowToQuestion).filter(Boolean);
      if(qs.length) return {questions:qs, source:'Google Sheets · onglet grammaire'};
      return {questions:(LOCAL_BANK[belt.id]||[]).slice(), source:'banque locale'};
    }).catch(function(){ return {questions:(LOCAL_BANK[belt.id]||[]).slice(), source:'banque locale'}; });
  }
  window.refreshFrenchGrammarSheetV25222 = function(){ rowsCache=null; rowsLoadingPromise=null; try{ localStorage.removeItem(CACHE_KEY); }catch(e){} return loadRows(true); };
  window.preloadFrenchGrammarRowsV23411 = function(){ return loadRows(false).catch(function(){ return null; }); };
  window.preloadFrenchGrammarRowsV25222 = window.preloadFrenchGrammarRowsV23411;

  function overlay(){
    var ov=byId('frenchTrainingOverlayV2348');
    if(ov) return ov;
    ov=document.createElement('div'); ov.id='frenchTrainingOverlayV2348'; ov.className='hidden'; ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true'); ov.setAttribute('aria-label','Français - entraînements');
    ov.innerHTML='<div class="fr-v2348-popup"><div class="fr-v2348-topbar"><div class="fr-v2348-chip">📖 Français</div><button class="fr-v2348-close" type="button" onclick="if(!window.returnMHTrainingFromBelt||!window.returnMHTrainingFromBelt())closeFrenchTrainingPopupV2348()" aria-label="Fermer la popup Français">×</button></div><div id="frenchPopupInnerV2348"></div></div>';
    document.body.appendChild(ov); ov.addEventListener('click',function(ev){ if(ev.target===ov) window.closeFrenchTrainingPopupV2348(); }); return ov;
  }
  function setInner(html){ var inner=byId('frenchPopupInnerV2348'); if(inner) inner.innerHTML=html; }
  function headerHTML(title, subtitle, note){
    title = title || '📖 Français';
    subtitle = subtitle || 'Choisis un domaine.';
    note = note || 'Un seul espace Français : grammaire, production d’écrit, vocabulaire et orthographe.';
    return '<div class="fr-v2348-header"><div class="fr-v2348-owl">🦉</div><div class="fr-v2348-title"><h2>'+esc(title)+'</h2><p>'+esc(subtitle)+'</p><div class="fr-v23411-grammar-note">'+esc(note)+'</div></div></div>';
  }
  function rowHTML(belt){ var isIdeas=belt.id==='idees'; return '<div class="fr-v23411-row '+(isIdeas?'fr-v23411-ideas-row':'')+'"><div class="fr-v23411-dot" style="background:'+esc(belt.color)+'"></div><div class="fr-v23411-main"><strong>'+esc(belt.title)+'</strong><span>'+esc(belt.label)+'</span><div class="fr-v23411-mode">'+esc(belt.desc)+'</div></div><button type="button" class="fr-v23411-train-btn" onclick="startFrenchTrainingV2348(\''+esc(belt.id)+'\')">'+(isIdeas?'✏️ S’entraîner':'📖 S’entraîner — 10 questions')+'</button></div>'; }
  function domainCardHTML(cfg){
    var disabled = !!cfg.disabled;
    var action = disabled ? '' : ' onclick="'+cfg.onclick+'"';
    return '<button type="button" class="fr-v25720-domain-card '+esc(cfg.className||'')+' '+(disabled?'is-disabled':'')+'" '+(disabled?'disabled aria-disabled="true"':'')+action+'>'+ 
      '<div class="fr-v25720-domain-icon">'+esc(cfg.icon)+'</div>'+ 
      '<div class="fr-v25720-domain-title">'+esc(cfg.title)+'</div>'+ 
      '<div class="fr-v25720-domain-desc">'+esc(cfg.desc)+'</div>'+ 
      (disabled ? '<div class="fr-v25720-domain-soon">🔒 Bientôt disponible</div>' : '<div class="fr-v25720-domain-arrow">›</div>')+
    '</button>';
  }
  function renderDomainMenu(){
    setInner(headerHTML('📖 Français','Choisis un domaine.','Choisis un domaine.')+
      '<div class="fr-v2348-content"><section class="fr-v2348-panel fr-v25720-domain-panel">'+
      '<div class="fr-v25720-domain-grid">'+
      domainCardHTML({className:'writing',icon:'✏️',title:'Production d’écrit',desc:'Trouver une idée et écrire',onclick:'startFrenchTrainingV2348(\'idees\')'})+
      domainCardHTML({className:'vocab',icon:'🧩',title:'Vocabulaire',desc:'Familles, synonymes, contraires, mots génériques',onclick:'openHibouVocabulaireV25724()'})+
      domainCardHTML({className:'ortho',icon:'🔤',title:'Orthographe',desc:'Accords, mots fréquents, dictées',disabled:true})+
      '</div></section></div>');
  }
  function renderGrammarList(){
    setInner(headerHTML('📘 Grammaire','Choisis une ceinture pour t’entraîner.','Questions de grammaire reliées à la notion choisie.')+
      '<div class="fr-v2348-content"><section class="fr-v2348-panel"><div class="fr-v2348-training-head"><button type="button" class="fr-v2348-back" onclick="renderFrenchDomainMenuV25720()">← Retour au menu Français</button><div class="fr-v2348-training-title">Grammaire</div><div></div></div><h3 class="fr-v23411-section-title fr-v25718-section-grammar">Ceintures de grammaire</h3><div class="fr-v23411-list">'+GRAMMAR_BELTS.map(rowHTML).join('')+'</div></section></div>');
  }
  function renderList(){ renderDomainMenu(); }
  window.renderFrenchDomainMenuV25720 = renderDomainMenu;
  window.renderFrenchGrammarListV25720 = renderGrammarList;
  window.renderFrenchTrainingListV2348 = renderDomainMenu;
  window.openFrenchTrainingPopupV2348 = function(){ var ov=overlay(); renderDomainMenu(); try{ setTimeout(function(){ window.preloadFrenchGrammarRowsV25222(); },0); }catch(e){} ov.classList.remove('hidden'); lockPage(true); };
  window.closeFrenchTrainingPopupV2348 = function(){ var ov=byId('frenchTrainingOverlayV2348'); if(ov) ov.classList.add('hidden'); lockPage(false); };

  function renderQuestion(){
    var q=state.questions[state.index];
    if(!q) return renderResult();
    state.answered=false;
    var opts=q.options.map(function(opt,i){ return '<button type="button" class="fr-v2348-option" data-index="'+i+'">'+esc(opt)+'</button>'; }).join('');
    var meta='<div class="fr-v23411-question-meta"><span class="fr-v23411-pill">'+esc(state.belt.label)+'</span><span class="fr-v23411-pill">Source : '+esc(state.source)+'</span>'+(q.mode?'<span class="fr-v23411-pill">Mode : '+esc(q.mode)+'</span>':'')+'</div>';
    setInner(headerHTML('📘 Grammaire','Réponds aux questions.','Entraînement de grammaire : correction après chaque réponse.')+'<div class="fr-v2348-content"><section class="fr-v2348-panel"><div class="fr-v2348-training-head"><button type="button" class="fr-v2348-back" onclick="if(!window.returnMHTrainingFromBelt||!window.returnMHTrainingFromBelt())renderFrenchGrammarListV25720()">← Retour aux ceintures</button><div class="fr-v2348-training-title">'+esc(state.belt.title)+'</div><div></div></div>'+meta+'<div class="fr-v2348-progress">Question '+(state.index+1)+' / '+state.questions.length+'</div><div class="fr-v2348-question">'+esc(q.q)+'</div><div class="fr-v2348-options">'+opts+'</div><div id="frFeedbackV2348" class="fr-v2348-feedback"></div></section></div>');
  }
  function renderResult(){
    var total=state.questions.length || TRAINING_COUNT; var pct=Math.round((state.score/total)*100);
    setInner(headerHTML('📘 Grammaire','Entraînement terminé.','Tu peux refaire l’entraînement ou revenir au menu Français.')+'<div class="fr-v2348-content"><section class="fr-v2348-panel"><div class="fr-v2348-result"><h3>Bravo, entraînement terminé !</h3><div class="fr-v2348-score-grid"><div class="fr-v2348-score-card">Score<b>'+state.score+' / '+total+'</b></div><div class="fr-v2348-score-card">Réussite<b>'+pct+'%</b></div></div><div class="fr-v2348-feedback">'+esc(state.belt.label)+' · Source : '+esc(state.source)+'</div><div class="fr-v2348-actions"><button type="button" class="fr-v2348-action" onclick="startFrenchTrainingV2348(\''+esc(state.belt.id)+'\')">🔁 Refaire l’entraînement</button><button type="button" class="fr-v2348-action secondary" onclick="if(!window.returnMHTrainingFromBelt||!window.returnMHTrainingFromBelt())renderFrenchGrammarListV25720()">← Retour aux ceintures</button><button type="button" class="fr-v2348-action secondary" onclick="renderFrenchDomainMenuV25720()">Menu Français</button><button type="button" class="fr-v2348-action secondary" onclick="if(!window.returnMHTrainingFromBelt||!window.returnMHTrainingFromBelt())closeFrenchTrainingPopupV2348()">Fermer</button></div></div></section></div>');
    try{ var label=(state.belt && (state.belt.title || state.belt.label || state.belt.id)) || 'grammaire'; var score='Score '+state.score+' / '+total+' — '+pct+'%'; if(window.hibouFrenchTrackV25717) window.hibouFrenchTrackV25717({type:'entrainement_grammaire_termine',domaine:'Grammaire',titre:'Entraînement grammaire terminé',detail:label+' — '+score,score:state.score,total:total,source:'entrainement_grammaire'}); else if(window.hibouRecordTrainingSuccessV25221) window.hibouRecordTrainingSuccessV25221('français', label, score); else if(window.hibouRecordTrainingSuccessV25220) window.hibouRecordTrainingSuccessV25220('français', label, score); }catch(e){}
  }
  function renderIdea(){ var item=shuffle(LOCAL_IDEAS)[0]; setInner(headerHTML('✍️ Production d’écrit','Trouve une idée et écris.','L’événement est ajouté au parcours seulement quand tu cliques sur J’ai terminé mon écrit.')+'<div class="fr-v2348-content"><section class="fr-v2348-panel"><div class="fr-v2348-training-head"><button type="button" class="fr-v2348-back" onclick="renderFrenchDomainMenuV25720()">← Retour au menu Français</button><div class="fr-v2348-training-title">✏️ Idées pour écrire</div><div></div></div><div class="fr-v2348-idea-box"><div class="fr-v2348-progress">Idée d’écriture</div><div class="fr-v2348-idea-card">'+esc(item.prompt)+'</div><div class="fr-v2348-example"><strong>Pour t’aider :</strong><br>'+esc(item.example)+'</div><textarea class="fr-v2348-textarea" placeholder="Écris ici ta phrase ou ton début d’histoire..."></textarea><div class="fr-v2348-actions"><button type="button" class="fr-v2348-action" onclick="window.hibouFrenchWritingDoneV25717&&window.hibouFrenchWritingDoneV25717(this)">✅ J’ai terminé mon écrit</button><button type="button" class="fr-v2348-action" onclick="startFrenchTrainingV2348(\'idees\')">🎲 Nouvelle idée</button><button type="button" class="fr-v2348-action secondary" onclick="renderFrenchDomainMenuV25720()">← Retour au menu Français</button></div></div></section></div>'); }

  window.startFrenchTrainingV2348 = function(activityId){
    if(activityId==='idees') return renderIdea();
    var belt=GRAMMAR_BELTS.filter(function(b){ return b.id===activityId; })[0] || GRAMMAR_BELTS[0];
    state={belt:belt, questions:[], index:0, score:0, answered:false, source:'banque locale'};
    setInner(headerHTML('📘 Grammaire','Préparation des questions.','Maître Hibou lance une série locale si Google Sheets tarde.')+'<div class="fr-v2348-content"><section class="fr-v2348-panel"><button type="button" class="fr-v2348-back" onclick="if(!window.returnMHTrainingFromBelt||!window.returnMHTrainingFromBelt())renderFrenchGrammarListV25720()">← Retour aux ceintures</button><div class="fr-v2348-feedback" style="padding:28px">🦉 Chargement des questions de '+esc(belt.label)+'...</div></section></div>');
    return questionsForBelt(belt).then(function(loaded){
      state.questions=shuffle(loaded.questions||[]).slice(0, TRAINING_COUNT);
      state.source=loaded.source || 'banque locale';
      if(!state.questions.length){ state.questions=shuffle(LOCAL_BANK[belt.id]||LOCAL_BANK.blanche).slice(0, TRAINING_COUNT); state.source='banque locale'; }
      renderQuestion();
    });
  };
  window.answerFrenchTrainingV2348 = function(i){
    i = Number(i);
    if(state.answered) return;
    var q=state.questions[state.index];
    if(!q){ return renderResult(); }
    state.answered=true;
    var correct=Number(q.correct);
    if(!Number.isFinite(correct)) correct=0;
    var buttons=[].slice.call(document.querySelectorAll('#frenchTrainingOverlayV2348 .fr-v2348-option'));
    buttons.forEach(function(btn){ btn.disabled=true; });
    var ok = i === correct;
    if(ok) state.score++;
    buttons.forEach(function(btn){ var idx=Number(btn.getAttribute('data-index')); if(idx===correct) btn.classList.add('correct'); if(idx===i && !ok) btn.classList.add('wrong'); });
    var fb=byId('frFeedbackV2348'); if(fb) fb.innerHTML = ok ? '✅ Bravo !' : '💡 La bonne réponse était : <strong>'+esc(q.options[correct]||'')+'</strong>';
    window.clearTimeout(state.nextTimer);
    state.nextTimer = window.setTimeout(function(){ state.index++; state.answered=false; if(state.index >= state.questions.length) renderResult(); else renderQuestion(); }, ok ? 650 : 1050);
  };
  document.addEventListener('click', function(ev){
    var btn = ev.target && ev.target.closest ? ev.target.closest('#frenchTrainingOverlayV2348 .fr-v2348-option') : null;
    if(!btn) return;
    ev.preventDefault(); ev.stopPropagation(); if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    window.answerFrenchTrainingV2348(Number(btn.getAttribute('data-index')));
  }, true);
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ try{ window.preloadFrenchGrammarRowsV25222(); }catch(e){} });
  else { try{ setTimeout(function(){ window.preloadFrenchGrammarRowsV25222(); }, 500); }catch(e){} }
})();
