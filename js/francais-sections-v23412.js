
(function(){
  if(window.__maitreHibouFrancaisSectionsV23412) return;
  window.__maitreHibouFrancaisSectionsV23412 = true;
  try{ document.title = '🦉 Maître Hibou V25.8.84'; }catch(e){}

  const GRAMMAR_BELTS = [
    {id:'blanche', title:'Phrase affirmative / négative', label:'Ceinture blanche', desc:'Reconnaître et transformer les phrases.', color:'radial-gradient(circle at 35% 25%,#FFFFFF,#EDE7FF 68%,#C8B8F2)'},
    {id:'jaune', title:'Le verbe', label:'Ceinture jaune', desc:'Trouver le verbe conjugué.', color:'radial-gradient(circle at 35% 25%,#FFF7B0,#FFD93D 62%,#D9A900)'},
    {id:'orange', title:'Le sujet', label:'Ceinture orange', desc:'Identifier le sujet du verbe.', color:'radial-gradient(circle at 35% 25%,#FFD9BF,#FF8A5B 62%,#E75F2B)'},
    {id:'verte', title:'Le nom commun', label:'Ceinture verte', desc:'Reconnaître les noms communs.', color:'radial-gradient(circle at 35% 25%,#BDF6C8,#4FD46C 62%,#229B43)'},
    {id:'bleue', title:'Le déterminant', label:'Ceinture bleue', desc:'Associer et repérer les déterminants.', color:'radial-gradient(circle at 35% 25%,#CDEAFF,#5AA9FF 62%,#2169CF)'},
    {id:'marron', title:'L’infinitif', label:'Ceinture marron', desc:'Retrouver l’infinitif d’un verbe.', color:'radial-gradient(circle at 35% 25%,#F0D1A7,#C08143 62%,#8B5526)'},
    {id:'noire', title:'L’adjectif', label:'Ceinture noire', desc:'Reconnaître les adjectifs.', color:'radial-gradient(circle at 35% 25%,#777,#222 66%,#050505)'},
    {id:'rouge', title:'Le groupe nominal', label:'Ceinture rouge', desc:'Repérer et enrichir le groupe nominal.', color:'radial-gradient(circle at 35% 25%,#FF9FA8,#E52837 64%,#A90F1D)'}
  ];
  const IDEAS_CARD = {id:'idees', title:'Idées pour écrire', label:'Entraînement d’écriture', desc:'Tirer une idée et écrire une phrase ou un début d’histoire.', color:'radial-gradient(circle at 35% 25%,#FFF6A8,#FFD93D 62%,#E0A900)'};

  function byId(id){ return document.getElementById(id); }
  function esc(v){ return String(v==null?'':v).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]; }); }
  function setInner(html){ const inner=byId('frenchPopupInnerV2348'); if(inner) inner.innerHTML=html; }
  function headerHTML(){
    return '<div class="fr-v2348-header">'
      + '<div class="fr-v2348-owl">🦉</div>'
      + '<div class="fr-v2348-title"><h2>📖 Entraînements de français</h2><p>Choisis une activité pour t’entraîner.</p><div class="fr-v23411-grammar-note">Grammaire : questions reliées au Google Sheet « Maître Hibou - Banque de Questions », onglet « grammaire ».</div></div>'
      + '</div>';
  }
  function rowHTML(belt, extraClass){
    return '<div class="fr-v23411-row '+(extraClass||'')+'">'
      + '<div class="fr-v23411-dot" style="background:'+esc(belt.color)+'"></div>'
      + '<div class="fr-v23411-main"><strong>'+esc(belt.title)+'</strong><span>'+esc(belt.label)+'</span><div class="fr-v23411-mode">'+esc(belt.desc)+'</div></div>'
      + '<button type="button" class="fr-v23411-train-btn" onclick="startFrenchTrainingV2348(\''+esc(belt.id)+'\')">'+(belt.id==='idees'?'✍️ S’entraîner':'📖 S’entraîner — 10 questions')+'</button>'
      + '</div>';
  }
  function renderListV23412(){
    const grammarRows = GRAMMAR_BELTS.map(function(b){ return rowHTML(b,''); }).join('');
    const writingRow = rowHTML(IDEAS_CARD,'fr-v23412-production-row');
    setInner(headerHTML()
      + '<div class="fr-v2348-content"><section class="fr-v2348-panel">'
      + '<div class="fr-v23412-scroll">'
      + '<div class="fr-v23412-block"><h3 class="fr-v23411-section-title">📘 Grammaire</h3><div class="fr-v23411-list" style="overflow:visible;display:flex;flex-direction:column;gap:8px;padding-bottom:4px">'+grammarRows+'</div></div>'
      + '<div class="fr-v23412-block"><h3 class="fr-v23412-writing-title">✍️ Production d’écrits</h3><div class="fr-v23412-writing-note">Un entraînement pour trouver des idées et écrire plus facilement.</div><div class="fr-v23411-list" style="overflow:visible;display:flex;flex-direction:column;gap:8px;padding-bottom:4px">'+writingRow+'</div></div>'
      + '</div></section></div>');
  }
  window.renderFrenchTrainingListV2348 = renderListV23412;

  const previousOpen = window.openFrenchTrainingPopupV2348;
  window.openFrenchTrainingPopupV2348 = function(){
    if(typeof previousOpen === 'function') previousOpen.apply(this, arguments);
    try{ renderListV23412(); }catch(e){ console.warn('V23.4.12 Français sections : affichage impossible', e); }
  };
})();
