
(function(){
  if(window.__maitreHibouV2406TrainingLikeBelts) return;
  window.__maitreHibouV2406TrainingLikeBelts = true;

  var VERSION_TITLE = '🦉 Maître Hibou V25.8.84';

  function byId(id){ return document.getElementById(id); }

  function setTitle(){
    try{ document.title = VERSION_TITLE; }catch(e){}
  }

  function ensureTrainingOverlay(){
    var ov = byId('trainingChoiceFullscreenV2406');
    if(ov) return ov;

    ov = document.createElement('div');
    ov.id = 'trainingChoiceFullscreenV2406';
    ov.className = 'modal-overlay skill-validation-fullscreen-v1861 hidden';
    ov.setAttribute('aria-hidden','true');
    ov.innerHTML = '<div class="modal-box"><div id="trainingChoiceBodyV2406"></div></div>';
    document.body.appendChild(ov);

    ov.addEventListener('click', function(ev){
      if(ev.target === ov) closeTrainingChoiceV2406();
    }, true);

    return ov;
  }

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function cardHTML(opts){
    return '<button type="button" class="v22-belt-card practice-card" title="'+esc(opts.title)+'" onclick="'+esc(opts.action)+'">'+
      '<div class="v22-belt-icon">'+opts.icon+'</div>'+
      '<div class="v22-belt-main">'+
        '<div class="v22-belt-name">'+esc(opts.title)+'</div>'+
        '<div class="v22-belt-sub">'+esc(opts.sub)+'</div>'+
      '</div>'+
      '<div class="v22-state practice">'+opts.state+'</div>'+
    '</button>';
  }

  var FRENCH_TRAINING_BELTS_V2413 = [
    {id:'blanche', icon:'⚪', title:'Phrase affirmative / négative', sub:'Ceinture blanche'},
    {id:'jaune', icon:'🟡', title:'Trouver le verbe', sub:'Ceinture jaune'},
    {id:'orange', icon:'🟠', title:'Trouver le sujet', sub:'Ceinture orange'},
    {id:'verte', icon:'🟢', title:'Reconnaître un nom', sub:'Ceinture verte'},
    {id:'bleue', icon:'🔵', title:'Reconnaître un déterminant', sub:'Ceinture bleue'},
    {id:'marron', icon:'🟤', title:'Trouver l’infinitif', sub:'Ceinture marron'},
    {id:'noire', icon:'⚫', title:'Reconnaître l’adjectif', sub:'Ceinture noire'},
    {id:'rouge', icon:'🔴', title:'Reconnaître le groupe nominal', sub:'Ceinture rouge'}
  ];

  var MATHS_TRAINING_BELTS_V2413 = [
    {id:'blanche', icon:'⚪', title:'Petits nombres', sub:'Ceinture blanche'},
    {id:'jaune', icon:'🟡', title:'Dizaines', sub:'Ceinture jaune'},
    {id:'orange', icon:'🟠', title:'Sans retenue', sub:'Ceinture orange'},
    {id:'vert_clair', icon:'🟢', title:'Avec retenue', sub:'Ceinture vert clair'},
    {id:'vert_fonce', icon:'🟢', title:'Complément à la dizaine', sub:'Ceinture vert foncé'},
    {id:'bleu_clair', icon:'🔵', title:'Ajouter / retrancher 9', sub:'Ceinture bleu clair'},
    {id:'bleu_fonce', icon:'🔵', title:'Ajouter / retrancher 11', sub:'Ceinture bleu foncé'},
    {id:'rose', icon:'🌸', title:'Centaines', sub:'Ceinture rose'},
    {id:'beige', icon:'🤍', title:'Complément à la centaine', sub:'Ceinture beige'},
    {id:'violet', icon:'🟣', title:'Tables ×1 ×2 ×10', sub:'Ceinture violette'},
    {id:'marron', icon:'🟤', title:'Tables ×3 ×4 ×5', sub:'Ceinture marron'},
    {id:'rouge', icon:'🔴', title:'Tables ×6 ×7', sub:'Ceinture rouge'},
    {id:'gris', icon:'⚫', title:'Tables ×8 ×9', sub:'Ceinture grise'},
    {id:'noir', icon:'⚫', title:'×10 ×100 ×1000', sub:'Ceinture noire'}
  ];

  function frenchTrainingCardsHTML(){
    var cards = FRENCH_TRAINING_BELTS_V2413.map(function(belt){
      return cardHTML({
        icon:belt.icon,
        title:belt.title,
        sub:belt.sub,
        state:'10 questions',
        action:'startTrainingFromChoiceV2413("francais","'+esc(belt.id)+'")'
      });
    }).join('');

    return cards + cardHTML({
      icon:'✏️',
      title:'Idées pour écrire',
      sub:'Production d’écrits',
      state:'Écrire',
      action:'startTrainingFromChoiceV2413("francais","idees")'
    });
  }

  function mathsTrainingCardsHTML(){
    var belts = Array.isArray(window.MATH_BELTS_V222) && window.MATH_BELTS_V222.length
      ? window.MATH_BELTS_V222.map(function(b){
        return {
          id:b.ceinture || b.skillId || 'blanche',
          icon:b.emoji || '⚪',
          title:b.label || b.competence || 'Calcul',
          sub:'Ceinture ' + (b.colorName || b.ceinture || '')
        };
      })
      : MATHS_TRAINING_BELTS_V2413;

    var numberStickCard = cardHTML({
      icon:'🧮',
      title:'Number Stick — Tables de multiplication',
      sub:'Bâton à calcul · Tables de 2 à 10',
      state:'Découvrir',
      action:'window.open("number-stick-ce2.html","_blank","noopener")'
    });

    var tablesGameCard = cardHTML({
      icon:'🎯',
      title:'Défi des tables — Jeu de calcul mental',
      sub:'10 calculs · étoiles · Points Hibou',
      state:'Jouer',
      action:'openHibouTablesGame()'
    });

    var suitesCard = cardHTML({
      icon:'🔢',
      title:'Défi des suites — Nombres à compléter',
      sub:'Écris, vérifie et corrige · 10 suites',
      state:'Jouer',
      action:'openHibouSuitesGame()'
    });

    return numberStickCard + tablesGameCard + suitesCard + belts.map(function(belt){
      return cardHTML({
        icon:belt.icon,
        title:belt.title,
        sub:belt.sub,
        state:'10 calculs',
        action:'startTrainingFromChoiceV2413("maths","'+esc(belt.id)+'")'
      });
    }).join('');
  }

  function trainingMenuHTML(){
    var frenchCards = frenchTrainingCardsHTML();
    var mathsCards = mathsTrainingCardsHTML();

    return '<div class="v22-skill-header">'+
      '<div class="v22-skill-owl">🦉</div>'+
      '<div class="v22-skill-title"><h2>🧠 M’entraîner</h2><p>Choisis une matière pour t’exercer avant de passer une ceinture.</p></div>'+
      '<button type="button" class="v22-close-btn" onclick="closeTrainingChoiceV2406()" title="Fermer">×</button>'+
    '</div>'+
    '<div class="v22-columns">'+
      '<section class="v22-domain francais"><div class="v22-domain-title">📖 Français</div><div class="v22-belt-list">'+frenchCards+'</div></section>'+
      '<section class="v22-domain maths"><div class="v22-domain-title">🔢 Maths</div><div class="v22-belt-list">'+mathsCards+'</div></section>'+
    '</div>'+
    '<div class="v22-help">💡 <span>Entraîne-toi ici, puis reviens passer une ceinture quand tu te sens prêt.</span><span>📖 🧮</span></div>';
  }

  function startTrainingFromChoice(subject, beltId){
    closeTrainingChoice();
    if(subject === 'francais'){
      if(typeof window.openFrenchTrainingPopupV2348 === 'function') window.openFrenchTrainingPopupV2348();
      if(typeof window.startFrenchTrainingV2348 === 'function'){
        setTimeout(function(){ window.startFrenchTrainingV2348(beltId || 'blanche'); }, 80);
      }
      return;
    }
    if(subject === 'maths'){
      if(typeof window.openMathsTrainingPopupV2343 === 'function') window.openMathsTrainingPopupV2343();
      if(typeof window.startMathsTrainingV2343 === 'function'){
        setTimeout(function(){ window.startMathsTrainingV2343(beltId || 'blanche'); }, 80);
      }
    }
  }

  function openTrainingChoice(){
    var ov = ensureTrainingOverlay();
    var body = byId('trainingChoiceBodyV2406');
    if(body) body.innerHTML = trainingMenuHTML();
    // V25.4.0 : préchargement discret des questions Français pendant que l'élève choisit sa ceinture.
    try{ setTimeout(function(){ if(window.preloadFrenchGrammarRowsV23411) window.preloadFrenchGrammarRowsV23411(); }, 0); }catch(e){}
    ov.classList.remove('hidden');
    ov.setAttribute('aria-hidden','false');
  }

  function closeTrainingChoice(){
    var ov = byId('trainingChoiceFullscreenV2406');
    if(ov){
      ov.classList.add('hidden');
      ov.setAttribute('aria-hidden','true');
    }
  }

  function openTrainingSubject(subject){
    closeTrainingChoice();
    if(subject === 'francais'){
      if(typeof window.openFrenchTrainingPopupV2348 === 'function'){
        window.openFrenchTrainingPopupV2348();
        return;
      }
      var fr = document.querySelector('.subjects-bar .subject-btn[data-subject="francais"]');
      if(fr) fr.click();
      return;
    }
    if(subject === 'maths'){
      if(typeof window.openMathsTrainingPopupV2343 === 'function'){
        window.openMathsTrainingPopupV2343();
        return;
      }
      var maths = document.querySelector('.subjects-bar .subject-btn[data-subject="maths"]');
      if(maths) maths.click();
    }
  }

  function openWritingIdeas(){
    closeTrainingChoice();
    if(typeof window.openFrenchTrainingPopupV2348 === 'function'){
      window.openFrenchTrainingPopupV2348();
      if(typeof window.startFrenchTrainingV2348 === 'function'){
        setTimeout(function(){ window.startFrenchTrainingV2348('idees'); }, 180);
      }
      return;
    }
    openTrainingSubject('francais');
  }

  function cleanAndBindTrainButton(){
    var btn = byId('v24AdviceTrain');
    if(!btn) return;

    if(btn.__v2404Bound || !btn.__v2406TrainingClone){
      var clean = btn.cloneNode(true);
      clean.__v2406TrainingClone = true;
      btn.parentNode.replaceChild(clean, btn);
      btn = clean;
    }

    btn.innerHTML = '🧠 M’entraîner<small>Français ou Maths</small>';
    btn.setAttribute('aria-label','Ouvrir les entraînements Français et Maths');
    btn.setAttribute('title','Ouvrir les entraînements Français et Maths');

    if(btn.__v2406TrainingBound) return;
    btn.__v2406TrainingBound = true;
    btn.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
      openTrainingChoice();
    }, true);
  }

  function interceptAdviceTrain(ev){
    var target = ev.target && ev.target.closest ? ev.target.closest('#v24AdviceTrain') : null;
    if(!target) return;
    ev.preventDefault();
    ev.stopPropagation();
    if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    openTrainingChoice();
  }

  window.openTrainingChoiceV2406 = openTrainingChoice;
  window.closeTrainingChoiceV2406 = closeTrainingChoice;
  window.openTrainingSubjectV2406 = openTrainingSubject;
  window.openWritingIdeasV2406 = openWritingIdeas;
  window.startTrainingFromChoiceV2413 = startTrainingFromChoice;

  function install(){
    if(!document.body) return;
    setTitle();
    ensureTrainingOverlay();
    cleanAndBindTrainButton();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
  else install();

  document.addEventListener('click', interceptAdviceTrain, true);
  window.addEventListener('load', install);
  [100,250,500,900,1400,2200,3500,5000].forEach(function(ms){ setTimeout(install, ms); });
  setInterval(function(){ setTitle(); cleanAndBindTrainButton(); }, 5000); // V25.4.0
})();
