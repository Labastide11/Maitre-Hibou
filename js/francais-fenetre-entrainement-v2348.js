
(function(){
  if(window.__maitreHibouFrancaisPopupV2348) return;
  window.__maitreHibouFrancaisPopupV2348 = true;
  try{ document.title = '🦉 Maître Hibou V25.8.84'; }catch(e){}

  const TRAINING_COUNT = 10;
  let frState = {activity:null, questions:[], index:0, score:0, answered:false};

  const ACTIVITIES = [
    {id:'nomCommun', icon:'✍️', title:'Nom commun', desc:'Reconnaître les noms communs dans une phrase.', button:'✍️ S’entraîner'},
    {id:'verbe', icon:'🏃', title:'Le verbe', desc:'Trouver le verbe conjugué dans une phrase.', button:'🏃 S’entraîner'},
    {id:'idees', icon:'✏️', title:'Idées pour écrire', desc:'Tirer une idée et écrire une phrase ou un début d’histoire.', button:'✏️ S’entraîner'}
  ];
  const BANK = {
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
      {q:'Quel mot est un nom commun ?', options:['table','manger','beau','elles'], correct:0},
      {q:'Dans « Le ballon roule vite. », quel mot est un nom commun ?', options:['ballon','roule','vite','Le'], correct:0},
      {q:'Dans « Une fleur pousse dans le jardin. », quel mot est un nom commun ?', options:['Une','fleur','pousse','dans'], correct:1}
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
      {q:'Dans « La voiture roule doucement. », quel mot est le verbe ?', options:['voiture','roule','doucement'], correct:1},
      {q:'Dans « Vous dessinez un hibou. », quel mot est le verbe ?', options:['Vous','dessinez','hibou'], correct:1},
      {q:'Quel mot est un verbe ?', options:['maison','courir','bleu'], correct:1},
      {q:'Quel mot est un verbe ?', options:['chanter','jardin','petit'], correct:0}
    ]
  };
  const IDEAS = [
    {prompt:'Imagine qu’un hibou trouve une clé brillante dans la cour de l’école.', example:'Exemple : Ce matin, Maître Hibou découvre une petite clé dorée sous le banc.'},
    {prompt:'Un cartable se met soudain à parler pendant la classe.', example:'Exemple : Au moment de sortir le cahier, une voix sort du cartable de Lina.'},
    {prompt:'Tu ouvres un livre et la première page devient une porte.', example:'Exemple : La page tremble, puis elle s’ouvre comme l’entrée d’un château.'},
    {prompt:'Une pluie d’étoiles tombe doucement sur la ville.', example:'Exemple : Les élèves regardent le ciel, émerveillés par les étoiles qui brillent.'},
    {prompt:'Dans la cour, une marelle magique apparaît.', example:'Exemple : À chaque case, les enfants voyagent dans un lieu différent.'},
    {prompt:'Un animal minuscule demande de l’aide à la classe.', example:'Exemple : Une petite souris avec un sac à dos monte sur le bureau.'},
    {prompt:'Le tableau de la classe dessine tout seul.', example:'Exemple : Sans craie et sans main, un plan mystérieux apparaît.'},
    {prompt:'Ton crayon invente une histoire à ta place.', example:'Exemple : Le crayon glisse sur la feuille et écrit une phrase incroyable.'}
  ];

  function byId(id){ return document.getElementById(id); }
  function esc(v){ return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c];}); }
  function norm(v){ return String(v==null?'':v).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,''); }
  function shuffle(a){ const arr=(a||[]).slice(); for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); const t=arr[i]; arr[i]=arr[j]; arr[j]=t; } return arr; }
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
      + '</div>'
      + '<div id="frenchPopupInnerV2348"></div>'
      + '</div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', function(ev){ if(ev.target === ov) closeFrenchTrainingPopupV2348(); });
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
      + '<div class="fr-v2348-note">Les activités restent dans cette fenêtre : pas de troisième popup, pas de bascule dans le chat.</div>'
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
  window.startFrenchTrainingV2348 = function(activityId){
    const a = activityById(activityId);
    frState.activity = a;
    frState.index = 0;
    frState.score = 0;
    frState.answered = false;
    if(activityId === 'idees') return renderIdea();
    const bank = BANK[activityId] || BANK.nomCommun;
    frState.questions = shuffle(bank).slice(0, TRAINING_COUNT);
    renderQuestion();
  };
  function renderQuestion(){
    const q = frState.questions[frState.index];
    if(!q) return renderResult();
    frState.answered = false;
    const opts = q.options.map(function(opt,i){ return '<button type="button" class="fr-v2348-option" data-index="'+i+'" onclick="answerFrenchTrainingV2348('+i+')">'+esc(opt)+'</button>'; }).join('');
    setInner(headerHTML() + '<div class="fr-v2348-content"><section class="fr-v2348-panel">'
      + '<div class="fr-v2348-training-head">'
      + '<button type="button" class="fr-v2348-back" onclick="renderFrenchTrainingListV2348()">← Retour aux entraînements</button>'
      + '<div class="fr-v2348-training-title">'+esc(frState.activity.icon)+' '+esc(frState.activity.title)+'</div>'
      + '<div></div>'
      + '</div>'
      + '<div class="fr-v2348-progress">Question '+(frState.index+1)+' / '+frState.questions.length+'</div>'
      + '<div class="fr-v2348-question">'+esc(q.q)+'</div>'
      + '<div class="fr-v2348-options">'+opts+'</div>'
      + '<div id="frenchFeedbackV2348" class="fr-v2348-feedback"></div>'
      + '</section></div>');
  }
  window.answerFrenchTrainingV2348 = function(i){
    if(frState.answered) return;
    frState.answered = true;
    const q = frState.questions[frState.index];
    const buttons = document.querySelectorAll('.fr-v2348-option');
    buttons.forEach(function(btn){ btn.disabled = true; });
    const good = Number(i) === Number(q.correct);
    if(good) frState.score++;
    buttons.forEach(function(btn){
      const idx = Number(btn.getAttribute('data-index'));
      if(idx === Number(q.correct)) btn.classList.add('correct');
      else if(idx === Number(i)) btn.classList.add('wrong');
    });
    const fb = byId('frenchFeedbackV2348');
    if(fb) fb.textContent = good ? '✅ Très bien !' : '🦉 Regarde la bonne réponse.';
    setTimeout(function(){ frState.index++; if(frState.index >= frState.questions.length) renderResult(); else renderQuestion(); }, good ? 450 : 850);
  };
  function renderResult(){
    const total = frState.questions.length || TRAINING_COUNT;
    setInner(headerHTML() + '<div class="fr-v2348-content"><section class="fr-v2348-panel">'
      + '<div class="fr-v2348-result">'
      + '<h3>Bravo, entraînement terminé !</h3>'
      + '<div class="fr-v2348-score-grid">'
      + '<div class="fr-v2348-score-card">Score<b>'+frState.score+' / '+total+'</b></div>'
      + '<div class="fr-v2348-score-card">Activité<b>'+esc(frState.activity.title)+'</b></div>'
      + '</div>'
      + '<div class="fr-v2348-note">C’est un entraînement : les validations officielles restent dans « Valider une compétence ».</div>'
      + '<div class="fr-v2348-actions">'
      + '<button type="button" class="fr-v2348-action" onclick="startFrenchTrainingV2348(\''+esc(frState.activity.id)+'\')">🔁 Refaire l’entraînement</button>'
      + '<button type="button" class="fr-v2348-action secondary" onclick="renderFrenchTrainingListV2348()">← Retour aux entraînements</button>'
      + '<button type="button" class="fr-v2348-action secondary" onclick="closeFrenchTrainingPopupV2348()">Fermer</button>'
      + '</div></div></section></div>');
  }
  function renderIdea(){
    const item = IDEAS[Math.floor(Math.random()*IDEAS.length)];
    setInner(headerHTML() + '<div class="fr-v2348-content"><section class="fr-v2348-panel">'
      + '<div class="fr-v2348-training-head">'
      + '<button type="button" class="fr-v2348-back" onclick="renderFrenchTrainingListV2348()">← Retour aux entraînements</button>'
      + '<div class="fr-v2348-training-title">✏️ Idées pour écrire</div>'
      + '<div></div>'
      + '</div>'
      + '<div class="fr-v2348-idea-box">'
      + '<div class="fr-v2348-progress">Idée d’écriture</div>'
      + '<div class="fr-v2348-idea-card">'+esc(item.prompt)+'</div>'
      + '<div class="fr-v2348-example"><strong>Pour t’aider :</strong><br>'+esc(item.example)+'</div>'
      + '<textarea class="fr-v2348-textarea" placeholder="Écris ici ta phrase ou ton début d’histoire..."></textarea>'
      + '<div class="fr-v2348-actions">'
      + '<button type="button" class="fr-v2348-action" onclick="window.hibouFrenchWritingDoneV25717&&window.hibouFrenchWritingDoneV25717(this)">✅ J’ai terminé mon écrit</button>'
      + '<button type="button" class="fr-v2348-action" onclick="startFrenchTrainingV2348(\'idees\')">🎲 Nouvelle idée</button>'
      + '<button type="button" class="fr-v2348-action secondary" onclick="renderFrenchTrainingListV2348()">← Retour aux entraînements</button>'
      + '</div>'
      + '</div></section></div>');
  }
  function interceptFrenchClick(ev){
    const target = ev.target && ev.target.closest && ev.target.closest('.subject-btn[data-subject="francais"], button[data-subject="francais"]');
    if(!target) return;
    if(target.closest && target.closest('#frenchTrainingOverlayV2348')) return;
    ev.preventDefault();
    ev.stopPropagation();
    if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    window.openFrenchTrainingPopupV2348();
  }
  document.addEventListener('click', interceptFrenchClick, true);
  document.addEventListener('keydown', function(ev){
    if(ev.key === 'Escape'){
      const ov = byId('frenchTrainingOverlayV2348');
      if(ov && !ov.classList.contains('hidden')) window.closeFrenchTrainingPopupV2348();
    }
  }, true);
  const previousSelectSubjectV2348 = window.selectSubject;
  if(typeof previousSelectSubjectV2348 === 'function'){
    window.selectSubject = function(btn, subject){
      if(norm(subject) === 'francais'){
        window.openFrenchTrainingPopupV2348();
        return false;
      }
      return previousSelectSubjectV2348.apply(this, arguments);
    };
  }
  function patchFrenchButtons(){
    document.querySelectorAll('.subject-btn[data-subject="francais"]').forEach(function(btn){
      btn.setAttribute('aria-label','Français : ouvrir les entraînements');
      btn.setAttribute('title','Français : ouvrir les entraînements');
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', patchFrenchButtons);
  else patchFrenchButtons();
  window.addEventListener('load', function(){ [0,100,350,900,1800,3500].forEach(function(ms){ setTimeout(patchFrenchButtons, ms); }); });
})();
