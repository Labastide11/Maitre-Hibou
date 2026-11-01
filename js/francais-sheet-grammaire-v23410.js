
(function(){
  if(window.__maitreHibouFrancaisSheetGrammaireV23410) return;
  window.__maitreHibouFrancaisSheetGrammaireV23410 = true;
  try{ document.title = '🦉 Maître Hibou V25.8.84'; }catch(e){}

  const BASE_URL = 'https://script.google.com/macros/s/AKfycbyzfRPrUV7xKgeXUM0LjbOsOne5DieRjDYxmuVbBBUIGL-F9ahMmJZSfpUDYmBaZIOpvQ/exec';
  const SHEET_NAME = 'grammaire';
  const CACHE_KEY = 'hibou_v23410_francais_grammaire_rows';
  const TRAINING_COUNT = 10;

  const URLS_TO_TRY = [
    BASE_URL + '?onglet=' + encodeURIComponent(SHEET_NAME),
    BASE_URL + '?sheet=' + encodeURIComponent(SHEET_NAME),
    BASE_URL + '?tab=' + encodeURIComponent(SHEET_NAME),
    BASE_URL + '?matiere=Grammaire',
    BASE_URL + '?matiere=grammaire',
    BASE_URL + '?action=questions&onglet=' + encodeURIComponent(SHEET_NAME),
    BASE_URL + '?action=read&onglet=' + encodeURIComponent(SHEET_NAME),
    BASE_URL
  ];

  let state = {
    activity:null,
    questions:[],
    index:0,
    score:0,
    answered:false,
    source:'banque locale'
  };

  const ACTIVITIES = [
    {id:'nomCommun', icon:'✍️', title:'Nom commun', desc:'Reconnaître les noms communs dans une phrase.', button:'✍️ S’entraîner'},
    {id:'verbe', icon:'🏃', title:'Le verbe', desc:'Trouver le verbe conjugué dans une phrase.', button:'🏃 S’entraîner'},
    {id:'idees', icon:'✏️', title:'Idées pour écrire', desc:'Tirer une idée et écrire une phrase ou un début d’histoire.', button:'✏️ S’entraîner'}
  ];

  const LOCAL_BANK = {
    nomCommun:[
      {q:'Dans « Le chat dort sur le canapé. », quel mot est un nom commun ?', options:['Le','chat','dort','sur'], correct:1},
      {q:'Dans « La maîtresse écrit au tableau. », quel mot est un nom commun ?', options:['maîtresse','écrit','au','La'], correct:0},
      {q:'Dans « Les enfants jouent dans la cour. », quel mot est un nom commun ?', options:['Les','jouent','cour','dans'], correct:2},
      {q:'Dans « Mon stylo bleu est cassé. », quel mot est un nom commun ?', options:['Mon','stylo','bleu','est'], correct:1},
      {q:'Dans « Une voiture passe devant l’école. », quel mot est un nom commun ?', options:['voiture','passe','devant','Une'], correct:0},
      {q:'Quel mot est un nom commun ?', options:['courir','jardin','rapide','il'], correct:1},
      {q:'Quel mot est un nom commun ?', options:['chanter','petit','livre','nous'], correct:2},
      {q:'Dans « Le chien aboie fort. », quel mot est un nom commun ?', options:['Le','chien','aboie','fort'], correct:1},
      {q:'Dans « La montagne est haute. », quel mot est un nom commun ?', options:['La','montagne','est','haute'], correct:1},
      {q:'Quel mot est un nom commun ?', options:['table','manger','beau','elles'], correct:0}
    ],
    verbe:[
      {q:'Dans « Les enfants jouent dans la cour. », quel mot est le verbe ?', options:['enfants','jouent','cour'], correct:1},
      {q:'Dans « Le chat dort sur le canapé. », quel mot est le verbe ?', options:['chat','dort','canapé'], correct:1},
      {q:'Dans « La maîtresse écrit au tableau. », quel mot est le verbe ?', options:['maîtresse','écrit','tableau'], correct:1},
      {q:'Dans « Nous chantons une chanson. », quel mot est le verbe ?', options:['Nous','chantons','chanson'], correct:1},
      {q:'Dans « Tu regardes un livre. », quel mot est le verbe ?', options:['Tu','regardes','livre'], correct:1},
      {q:'Dans « Le chien aboie fort. », quel mot est le verbe ?', options:['chien','aboie','fort'], correct:1},
      {q:'Dans « Les élèves lisent en silence. », quel mot est le verbe ?', options:['élèves','lisent','silence'], correct:1},
      {q:'Dans « Je prépare mon cartable. », quel mot est le verbe ?', options:['Je','prépare','cartable'], correct:1},
      {q:'Quel mot est un verbe ?', options:['maison','courir','bleu'], correct:1},
      {q:'Quel mot est un verbe ?', options:['chanter','jardin','petit'], correct:0}
    ]
  };

  const LOCAL_IDEAS = [
    {prompt:'Imagine qu’un hibou trouve une clé brillante dans la cour de l’école.', example:'Exemple : Ce matin, Maître Hibou découvre une petite clé dorée sous le banc.'},
    {prompt:'Un cartable se met soudain à parler pendant la classe.', example:'Exemple : Au moment de sortir le cahier, une voix sort du cartable de Lina.'},
    {prompt:'Tu ouvres un livre et la première page devient une porte.', example:'Exemple : La page tremble, puis elle s’ouvre comme l’entrée d’un château.'},
    {prompt:'Une pluie d’étoiles tombe doucement sur la ville.', example:'Exemple : Les élèves regardent le ciel, émerveillés par les étoiles qui brillent.'},
    {prompt:'Dans la cour, une marelle magique apparaît.', example:'Exemple : À chaque case, les enfants voyagent dans un lieu différent.'},
    {prompt:'Le tableau de la classe dessine tout seul.', example:'Exemple : Sans craie et sans main, un plan mystérieux apparaît.'}
  ];

  function byId(id){ return document.getElementById(id); }
  function esc(v){ return String(v == null ? '' : v).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]; }); }
  function norm(v){ return String(v == null ? '' : v).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,''); }
  function shuffle(a){ const arr=(a||[]).slice(); for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); const t=arr[i]; arr[i]=arr[j]; arr[j]=t; } return arr; }
  function unique(arr){ const seen={}; return (arr||[]).filter(function(v){ const k=norm(v); if(!k || seen[k]) return false; seen[k]=true; return true; }); }
  function addParam(url,k,v){ return url + (url.indexOf('?') === -1 ? '?' : '&') + encodeURIComponent(k) + '=' + encodeURIComponent(v); }

  function readCell(row, names, index){
    if(Array.isArray(row)) return row[index] == null ? '' : row[index];
    for(let i=0;i<names.length;i++){
      const n = names[i];
      if(row && row[n] !== undefined && row[n] !== null && String(row[n]).trim() !== '') return row[n];
    }
    return '';
  }

  function responseRows(data){
    let rows = [];
    if(Array.isArray(data)) rows = data;
    else if(data && Array.isArray(data.rows)) rows = data.rows;
    else if(data && Array.isArray(data.data)) rows = data.data;
    else if(data && Array.isArray(data.questions)) rows = data.questions;
    else if(data && data.result && Array.isArray(data.result)) rows = data.result;
    if(rows.length && Array.isArray(rows[0])){
      const header = rows[0].map(function(h){ return norm(h); });
      if(header.indexOf('question') !== -1 || header.indexOf('ceinture') !== -1){
        const originalHeader = rows[0].map(function(h){ return String(h || '').trim(); });
        return rows.slice(1).map(function(r){
          const obj = {};
          originalHeader.forEach(function(h,i){ if(h) obj[h] = r[i]; });
          return obj;
        });
      }
    }
    return rows;
  }

  async function fetchJson(url){
    const res = await fetch(addParam(url,'t',Date.now()), {cache:'no-store'});
    if(!res.ok) throw new Error('HTTP ' + res.status);
    return responseRows(await res.json());
  }

  function fetchJsonp(url){
    return new Promise(function(resolve,reject){
      const callbackName = '__hibouFrenchGrammaireV23410_' + Date.now() + '_' + Math.floor(Math.random()*100000);
      let done = false;
      const script = document.createElement('script');
      const cleanup = function(){
        try{ delete window[callbackName]; }catch(e){ window[callbackName] = undefined; }
        if(script && script.parentNode) script.parentNode.removeChild(script);
      };
      const timer = setTimeout(function(){
        if(done) return;
        done = true;
        cleanup();
        reject(new Error('Timeout JSONP'));
      }, 12000);
      window[callbackName] = function(data){
        if(done) return;
        done = true;
        clearTimeout(timer);
        cleanup();
        resolve(responseRows(data));
      };
      script.onerror = function(){
        if(done) return;
        done = true;
        clearTimeout(timer);
        cleanup();
        reject(new Error('Erreur JSONP'));
      };
      script.src = addParam(addParam(url,'callback',callbackName),'t',Date.now());
      document.head.appendChild(script);
    });
  }

  async function fetchRowsFromUrl(url){
    try{ return await fetchJson(url); }
    catch(fetchError){
      console.warn('Fetch Google Sheets échoué, essai JSONP :', url, fetchError);
      return await fetchJsonp(url);
    }
  }

  async function loadSheetRows(force){
    if(!force){
      try{
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
        if(cached && Array.isArray(cached.rows) && cached.rows.length) return cached.rows;
      }catch(e){}
    }
    let lastError = null;
    for(let i=0;i<URLS_TO_TRY.length;i++){
      const url = URLS_TO_TRY[i];
      try{
        const rows = await fetchRowsFromUrl(url);
        if(rows && rows.length){
          window.__HIBOU_DEBUG_FRENCH_GRAMMAIRE_ROWS = rows;
          window.__HIBOU_DEBUG_FRENCH_GRAMMAIRE_URL = url;
          try{ localStorage.setItem(CACHE_KEY, JSON.stringify({date:Date.now(), url:url, rows:rows})); }catch(e){}
          return rows;
        }
      }catch(e){
        lastError = e;
        console.warn('URL Google Sheets Français non utilisable :', url, e);
      }
    }
    try{
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      if(cached && Array.isArray(cached.rows) && cached.rows.length) return cached.rows;
    }catch(e){}
    throw lastError || new Error('Aucune donnée Google Sheets');
  }
  window.refreshFrenchGrammarSheetV23410 = function(){ return loadSheetRows(true); };

  function activityFromRow(row){
    const ceinture = norm(readCell(row,['ceinture','Ceinture'],0));
    const comp = norm(readCell(row,['competence','compétence','Competence','Compétence'],2));
    const question = norm(readCell(row,['question','Question'],5));
    const text = [ceinture, comp, question].join('_');
    if(comp === 'verbe' || ceinture === 'jaune' || text.indexOf('verbe') !== -1) return 'verbe';
    if(comp === 'nom' || comp === 'nom_commun' || ceinture === 'verte' || text.indexOf('nom_commun') !== -1) return 'nomCommun';
    if(text.indexOf('idee') !== -1 || text.indexOf('ecrire') !== -1 || text.indexOf('production') !== -1) return 'idees';
    return '';
  }

  function rowToQuestion(row){
    const q = String(readCell(row,['question','Question'],5)).trim();
    if(!q) return null;
    const rawOptions = unique([
      readCell(row,['A','a'],6),
      readCell(row,['B','b'],7),
      readCell(row,['C','c'],8),
      readCell(row,['D','d'],9)
    ].map(function(v){ return String(v == null ? '' : v).trim(); }));
    const answerRaw = String(readCell(row,['reponse','réponse','Reponse','Réponse','answer','Answer'],10)).trim();
    if(!answerRaw) return null;
    let correctValue = '';
    if(/^[ABCD]$/i.test(answerRaw)){
      correctValue = String(readCell(row,[answerRaw.toUpperCase(), answerRaw.toLowerCase()], 6 + 'ABCD'.indexOf(answerRaw.toUpperCase()))).trim();
    }else{
      const match = rawOptions.find(function(o){ return norm(o) === norm(answerRaw); });
      correctValue = match || answerRaw;
    }
    if(!correctValue) return null;
    const distractors = rawOptions.filter(function(o){ return norm(o) !== norm(correctValue); });
    const options = shuffle([correctValue].concat(shuffle(distractors).slice(0,3)));
    const correct = options.findIndex(function(o){ return norm(o) === norm(correctValue); });
    if(options.length < 2 || correct < 0) return null;
    return {q:q, options:options, correct:correct};
  }

  function rowToIdea(row){
    const prompt = String(readCell(row,['question','Question','idee','Idée','idée','prompt'],5)).trim();
    const example = String(readCell(row,['A','a','exemple','Exemple','reponse','Réponse','reponse'],6)).trim();
    if(!prompt) return null;
    return {prompt:prompt, example:example || 'Écris une phrase complète avec une majuscule et un point.'};
  }

  async function questionsForActivity(activityId){
    let rows = [];
    let usedSheet = false;
    try{ rows = await loadSheetRows(true); }catch(e){ rows = []; }
    const matching = (rows || []).filter(function(row){ return activityFromRow(row) === activityId; });
    let bank = shuffle(matching.map(rowToQuestion).filter(Boolean));
    if(bank.length) usedSheet = true;
    const local = LOCAL_BANK[activityId] || LOCAL_BANK.nomCommun;
    while(bank.length < TRAINING_COUNT){
      const more = shuffle(local).slice(0, TRAINING_COUNT - bank.length);
      if(!more.length) break;
      bank = bank.concat(more);
    }
    state.source = usedSheet ? 'Google Sheets · onglet grammaire' : 'banque locale';
    return shuffle(bank).slice(0, TRAINING_COUNT);
  }

  async function ideasForSheet(){
    let rows = [];
    try{ rows = await loadSheetRows(false); }catch(e){ rows = []; }
    const ideas = shuffle((rows || []).filter(function(row){ return activityFromRow(row) === 'idees'; }).map(rowToIdea).filter(Boolean));
    state.source = ideas.length ? 'Google Sheets · onglet grammaire' : 'banque locale';
    return ideas.length ? ideas : LOCAL_IDEAS;
  }

  function overlay(){
    let ov = byId('frenchTrainingOverlayV2348');
    if(ov) return ov;
    ov = document.createElement('div');
    ov.id = 'frenchTrainingOverlayV2348';
    ov.className = 'hidden';
    ov.setAttribute('role','dialog');
    ov.setAttribute('aria-modal','true');
    ov.setAttribute('aria-label','Français - entraînements');
    ov.innerHTML = '<div class="fr-v2348-popup">'
      + '<div class="fr-v2348-topbar">'
      + '<div class="fr-v2348-chip">📖 Français</div>'
      + '<button class="fr-v2348-close" type="button" onclick="closeFrenchTrainingPopupV2348()" aria-label="Fermer la popup Français">×</button>'
      + '</div><div id="frenchPopupInnerV2348"></div></div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', function(ev){ if(ev.target === ov) window.closeFrenchTrainingPopupV2348(); });
    return ov;
  }

  function setInner(html){ const inner = byId('frenchPopupInnerV2348'); if(inner) inner.innerHTML = html; }
  function lockPage(lock){ document.documentElement.style.overflow = lock ? 'hidden' : ''; document.body.style.overflow = lock ? 'hidden' : ''; }
  function hideOldFrenchUI(){
    const panel = byId('v2173ActivitiesPanel');
    if(panel){ panel.classList.remove('open'); panel.innerHTML = ''; panel.dataset.subject = ''; }
    const q = byId('quickQuestions');
    if(q){ q.style.display = 'none'; q.style.visibility = 'hidden'; q.innerHTML = ''; }
    document.querySelectorAll('.subject-btn').forEach(function(b){ b.classList.remove('active'); b.setAttribute('aria-expanded','false'); });
    document.querySelectorAll('.subject-btn[data-subject="francais"]').forEach(function(b){ b.classList.add('active'); b.setAttribute('aria-expanded','true'); });
  }
  function headerHTML(){
    return '<div class="fr-v2348-header">'
      + '<div class="fr-v2348-owl">🦉</div>'
      + '<div class="fr-v2348-title">'
      + '<h2>📖 Entraînements de français</h2>'
      + '<p>Choisis une activité pour t’entraîner.</p>'
      + '<div class="fr-v2348-note">Source principale : Google Sheets « Maître Hibou - Banque de Questions », onglet « grammaire ». Secours local si la connexion échoue.</div>'
      + '</div></div>';
  }
  function activityById(id){ return ACTIVITIES.find(function(a){ return a.id === id; }) || ACTIVITIES[0]; }

  function renderList(){
    const rows = ACTIVITIES.map(function(a){
      return '<article class="fr-v2348-card">'
        + '<div class="fr-v2348-icon">'+esc(a.icon)+'</div>'
        + '<div class="fr-v2348-card-main"><strong>'+esc(a.title)+'</strong><span>'+esc(a.desc)+'</span></div>'
        + '<button type="button" class="fr-v2348-btn" onclick="startFrenchTrainingV2348(\''+esc(a.id)+'\')">'+esc(a.button)+'</button>'
        + '</article>';
    }).join('');
    setInner(headerHTML() + '<div class="fr-v2348-content"><section class="fr-v2348-panel">'
      + '<h3 class="fr-v2348-panel-title">Français</h3>'
      + '<div class="fr-v2348-note">Les boutons <strong>Nom commun</strong> et <strong>Le verbe</strong> lisent maintenant les colonnes : ceinture, niveau, competence, type, mode, question, A, B, C, D, reponse, difficulte.</div>'
      + '<div class="fr-v2348-list">'+rows+'</div>'
      + '</section></div>');
  }

  window.renderFrenchTrainingListV2348 = renderList;
  window.openFrenchTrainingPopupV2348 = function(){
    hideOldFrenchUI();
    const ov = overlay();
    ov.classList.remove('hidden');
    lockPage(true);
    renderList();
  };
  window.closeFrenchTrainingPopupV2348 = function(){
    const ov = overlay();
    ov.classList.add('hidden');
    lockPage(false);
  };

  window.startFrenchTrainingV2348 = async function(activityId){
    const a = activityById(activityId);
    state.activity = a;
    state.index = 0;
    state.score = 0;
    state.answered = false;
    if(activityId === 'idees') return renderIdeaLoading();
    setInner(headerHTML() + '<div class="fr-v2348-content"><section class="fr-v2348-panel"><div class="fr-v2348-feedback" style="padding:30px">🦉 Chargement depuis Google Sheets, onglet grammaire...</div></section></div>');
    try{ state.questions = await questionsForActivity(activityId); }
    catch(e){
      console.warn('Français Google Sheets : banque locale utilisée', e);
      state.source = 'banque locale';
      state.questions = shuffle(LOCAL_BANK[activityId] || LOCAL_BANK.nomCommun).slice(0, TRAINING_COUNT);
    }
    renderQuestion();
  };

  function renderQuestion(){
    const q = state.questions[state.index];
    if(!q) return renderResult();
    state.answered = false;
    const opts = q.options.map(function(opt,i){ return '<button type="button" class="fr-v2348-option" data-index="'+i+'" onclick="answerFrenchTrainingV2348('+i+')">'+esc(opt)+'</button>'; }).join('');
    setInner(headerHTML() + '<div class="fr-v2348-content"><section class="fr-v2348-panel">'
      + '<div class="fr-v2348-training-head">'
      + '<button type="button" class="fr-v2348-back" onclick="renderFrenchTrainingListV2348()">← Retour aux entraînements</button>'
      + '<div class="fr-v2348-training-title">'+esc(state.activity.icon)+' '+esc(state.activity.title)+'</div>'
      + '<div></div></div>'
      + '<div class="fr-v2348-progress">Question '+(state.index+1)+' / '+state.questions.length+' · Source : '+esc(state.source)+'</div>'
      + '<div class="fr-v2348-question">'+esc(q.q)+'</div>'
      + '<div class="fr-v2348-options">'+opts+'</div>'
      + '<div id="frenchFeedbackV2348" class="fr-v2348-feedback"></div>'
      + '</section></div>');
  }

  window.answerFrenchTrainingV2348 = function(i){
    if(state.answered) return;
    state.answered = true;
    const q = state.questions[state.index];
    const buttons = document.querySelectorAll('.fr-v2348-option');
    buttons.forEach(function(btn){ btn.disabled = true; });
    const good = Number(i) === Number(q.correct);
    if(good) state.score++;
    buttons.forEach(function(btn){
      const idx = Number(btn.getAttribute('data-index'));
      if(idx === Number(q.correct)) btn.classList.add('correct');
      else if(idx === Number(i)) btn.classList.add('wrong');
    });
    const fb = byId('frenchFeedbackV2348');
    if(fb) fb.textContent = good ? '✅ Très bien !' : '🦉 Regarde la bonne réponse.';
    setTimeout(function(){ state.index++; if(state.index >= state.questions.length) renderResult(); else renderQuestion(); }, good ? 450 : 850);
  };

  function renderResult(){
    const total = state.questions.length || TRAINING_COUNT;
    setInner(headerHTML() + '<div class="fr-v2348-content"><section class="fr-v2348-panel">'
      + '<div class="fr-v2348-result"><h3>Bravo, entraînement terminé !</h3>'
      + '<div class="fr-v2348-score-grid">'
      + '<div class="fr-v2348-score-card">Score<b>'+state.score+' / '+total+'</b></div>'
      + '<div class="fr-v2348-score-card">Source<b>'+esc(state.source)+'</b></div>'
      + '</div>'
      + '<div class="fr-v2348-note">C’est un entraînement : les validations officielles restent dans « Valider une compétence ».</div>'
      + '<div class="fr-v2348-actions">'
      + '<button type="button" class="fr-v2348-action" onclick="startFrenchTrainingV2348(\''+esc(state.activity.id)+'\')">🔁 Refaire l’entraînement</button>'
      + '<button type="button" class="fr-v2348-action secondary" onclick="renderFrenchTrainingListV2348()">← Retour aux entraînements</button>'
      + '<button type="button" class="fr-v2348-action secondary" onclick="closeFrenchTrainingPopupV2348()">Fermer</button>'
      + '</div></div></section></div>');
  }

  async function renderIdeaLoading(){
    setInner(headerHTML() + '<div class="fr-v2348-content"><section class="fr-v2348-panel"><div class="fr-v2348-feedback" style="padding:30px">🦉 Chargement des idées...</div></section></div>');
    try{ renderIdeaFromList(await ideasForSheet()); }
    catch(e){ state.source = 'banque locale'; renderIdeaFromList(LOCAL_IDEAS); }
  }

  function renderIdeaFromList(ideas){
    const item = ideas[Math.floor(Math.random()*ideas.length)] || LOCAL_IDEAS[0];
    setInner(headerHTML() + '<div class="fr-v2348-content"><section class="fr-v2348-panel">'
      + '<div class="fr-v2348-training-head">'
      + '<button type="button" class="fr-v2348-back" onclick="renderFrenchTrainingListV2348()">← Retour aux entraînements</button>'
      + '<div class="fr-v2348-training-title">✏️ Idées pour écrire</div>'
      + '<div></div></div>'
      + '<div class="fr-v2348-idea-box">'
      + '<div class="fr-v2348-progress">Idée d’écriture · Source : '+esc(state.source)+'</div>'
      + '<div class="fr-v2348-idea-card">'+esc(item.prompt)+'</div>'
      + '<div class="fr-v2348-example"><strong>Pour t’aider :</strong><br>'+esc(item.example)+'</div>'
      + '<textarea class="fr-v2348-textarea" placeholder="Écris ici ta phrase ou ton début d’histoire..."></textarea>'
      + '<div class="fr-v2348-actions">'
      + '<button type="button" class="fr-v2348-action" onclick="window.hibouFrenchWritingDoneV25717&&window.hibouFrenchWritingDoneV25717(this)">✅ J’ai terminé mon écrit</button>'
      + '<button type="button" class="fr-v2348-action" onclick="startFrenchTrainingV2348(\'idees\')">🎲 Nouvelle idée</button>'
      + '<button type="button" class="fr-v2348-action secondary" onclick="renderFrenchTrainingListV2348()">← Retour aux entraînements</button>'
      + '</div></div></section></div>');
  }
})();
