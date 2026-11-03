(function(){
  'use strict';
  if(window.__mhTrainingPage20261101) return;
  window.__mhTrainingPage20261101=true;
  var page=null;
  var beltReturnActive=false;
  var savedTrainingScroll=0;
  var french=[
    ['blanche','Phrase affirmative / négative','#e3ddf7'],['jaune','Trouver le verbe','#ffd93d'],['orange','Trouver le sujet','#ff914c'],['verte','Reconnaître un nom','#4fd88c'],
    ['bleue','Reconnaître un déterminant','#69b4fb'],['marron','Trouver l’infinitif','#a8724c'],['noire','Reconnaître l’adjectif','#333333'],['rouge','Le groupe nominal','#f04c62']
  ];
  var maths=[
    ['blanche','Petits nombres','#e3ddf7'],['jaune','Dizaines','#ffd93d'],['orange','Calculs plus grands','#ff914c'],['vert_clair','Additions et soustractions','#9add88'],
    ['vert_fonce','Compléments','#2c9a59'],['bleu_clair','Ajouter ou retirer 9','#9cdbff'],['bleu_fonce','Ajouter ou retirer 11','#2870d0'],['rose','Centaines','#f6a5cc'],
    ['beige','Complément à la centaine','#e5c6a0'],['violet','Tables 1, 2 et 10','#aa85dc'],['marron','Tables 3, 4 et 5','#a8724c'],['rouge','Tables 6 et 7','#f04c62'],
    ['gris','Tables 8 et 9','#9b9b9b'],['noir','Synthèse','#333333']
  ];
  var names={blanche:'blanche',jaune:'jaune',orange:'orange',verte:'verte',bleue:'bleue',marron:'marron',noire:'noire',rouge:'rouge',vert_clair:'vert clair',vert_fonce:'vert foncé',bleu_clair:'bleu clair',bleu_fonce:'bleu foncé',rose:'rose',beige:'beige',violet:'violette',gris:'grise',noir:'noire'};
  function esc(t){return String(t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  // Exemples visuels uniquement : les identifiants et moteurs de ceintures restent inchangés.
  var mathExamples={
    blanche:'8 + 5',jaune:'30 + 20',orange:'120 + 40',
    vert_clair:'45 − 12',vert_fonce:'70 + ? = 100',
    bleu_clair:'46 + 9',bleu_fonce:'46 + 11',rose:'300 + 200',
    beige:'250 + ? = 300',violet:'2 × 10',marron:'4 × 5',
    rouge:'6 × 7',gris:'8 × 9',noir:'36 + 27'
  };
  function beltRows(list,domain){return list.map(function(b){
    var colour=b[2], example=domain==='math'?mathExamples[b[0]]:null;
    var text=example?'<strong class="mht-belt-example">'+esc(example)+'</strong><small class="mht-belt-label">'+esc(b[1])+'</small>':'<strong class="mht-belt-label">'+esc(b[1])+'</strong>';
    return '<button type="button" class="mht-belt mht-belt-tile" data-mht="'+domain+'-belt" data-id="'+esc(b[0])+'" style="--belt:'+esc(colour)+'" title="Ceinture '+esc(names[b[0]]||b[0])+' — '+esc(b[1])+' — 10 questions" aria-label="Ceinture '+esc(names[b[0]]||b[0])+', '+esc(b[1])+', lancer 10 questions">'+text+'</button>';
  }).join('');}
  function make(){
    if(page) return page;
    page=document.createElement('main');page.id='mhTrainingPage';page.hidden=true;page.setAttribute('aria-label','M’entraîner');
    page.innerHTML='<header class="mht-head"><div class="mht-brand"><span aria-hidden="true" class="mht-owl">🦉</span><div><h1>M’entraîner</h1><p class="mht-subtitle">Je m’exerce à mon rythme, avant de passer une ceinture.</p></div></div><button type="button" class="mht-home" data-mht="home">← Accueil</button><div class="mht-belts-head"><h2>🏅 Je prépare mes ceintures</h2><p>10 questions pour s’entraîner. La validation des ceintures se fait séparément.</p></div></header>'+
    '<div class="mht-main"><section class="mht-section mht-belts-section"><div class="mht-belt-progressions">'+
    '<div class="mht-belt-strip"><h3>📖 Français <small>8 ceintures</small></h3><div class="mht-belt-scroll"><div class="mht-belt-grid">'+beltRows(french,'fr')+'</div></div></div>'+
    '<div class="mht-belt-strip math"><h3>🧮 Maths <small>14 ceintures</small></h3><div class="mht-belt-scroll"><div class="mht-belt-grid">'+beltRows(maths,'math')+'</div></div></div></div></section>'+
    '<section class="mht-section"><h2 class="mht-section-title">🎮 Je m’entraîne librement</h2><p class="mht-section-desc">Je choisis une activité indépendante des ceintures.</p><div class="mht-columns">'+
    '<div class="mht-free-panel fr"><h3>📚 Français</h3><div class="mht-free-grid">'+
    '<button type="button" class="mht-banner" data-mht="writing" aria-label="Production d’écrits"><img src="images/francais-production-ecrit.jpg" alt="Production d’écrits" loading="eager" decoding="async"/><span>Production d’écrits</span></button>'+
    '<button type="button" class="mht-banner" data-mht="vocab" aria-label="Vocabulaire"><img src="images/francais-vocabulaire.jpg" alt="Vocabulaire" loading="eager" decoding="async"/><span>Vocabulaire</span></button>'+
    '<button type="button" class="mht-banner" data-mht="ortho" aria-label="Orthographe"><img src="images/francais-orthographe.jpg" alt="Orthographe" loading="eager" decoding="async"/><span>Orthographe</span></button>'+
    '<button type="button" class="mht-banner" data-mht="reading" aria-label="Lecture & compréhension"><img src="images/francais-lecture-comprehension.jpg" alt="Lecture & compréhension" loading="eager" decoding="async"/><span>Lecture & compréhension</span></button></div></div>'+
    '<div class="mht-free-panel math"><h3>🔢 Maths</h3><div class="mht-free-maths">'+
    '<a class="mht-game mht-game-banner" href="number-stick-ce2.html" aria-label="Ouvrir Number Stick CE2"><img style="display:block!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;position:absolute!important;inset:0!important;" src="images/entrainement-number-stick.jpg" alt="Number Stick — tables de multiplication" loading="eager" decoding="async"/></a>'+
    '<button type="button" class="mht-game mht-game-banner" data-mht="tables" aria-label="Jouer au Défi des tables"><img style="display:block!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;position:absolute!important;inset:0!important;" src="images/entrainement-defi-tables.jpg" alt="Défi des tables — jeu de calcul mental" loading="eager" decoding="async"/></button>'+
    '<button type="button" class="mht-game mht-game-banner" data-mht="suites" aria-label="Jouer au Défi des suites"><img style="display:block!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;position:absolute!important;inset:0!important;" src="images/entrainement-defi-suites.jpg" alt="Défi des suites — nombres à compléter" loading="eager" decoding="async"/></button>'+
    '<a class="mht-game mht-game-banner" href="marche-maitre-hibou.html" aria-label="Ouvrir Le marché de Maître Hibou — 9 niveaux"><img style="display:block!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;position:absolute!important;inset:0!important;" src="images/entrainement-marche-hibou.jpg" alt="Le marché de Maître Hibou — monnaie, centimes et multiplication" loading="eager" decoding="async"/></a></div><p class="mht-note">Les jeux restent indépendants de la validation des ceintures.</p></div></div></section></div>';
    document.body.appendChild(page);
    page.addEventListener('click',function(ev){var btn=ev.target.closest('[data-mht]');if(!btn)return;var a=btn.getAttribute('data-mht');var id=btn.getAttribute('data-id');if(a==='home'){close();return;}if(a==='fr-belt'){launchFrenchBelt(id);return;}if(a==='math-belt'){launchMathBelt(id);return;}if(a==='tables'){launchTablesGame();return;}if(a==='suites'){launchSuitesGame();return;}if(['writing','vocab','ortho','reading'].indexOf(a)>=0){launchFrenchFree(a);}});
    return page;
  }
  function open(){make();page.hidden=false;page.scrollTop=0;document.documentElement.classList.add('mh-training-route');}
  function close(){beltReturnActive=false;if(page)page.hidden=true;document.documentElement.classList.remove('mh-training-route');}
  function run(fn){if(typeof window[fn]==='function'){closeIntoActivity();window[fn]();}else console.warn('Activité non chargée :',fn);}
  function closeIntoActivity(){if(page){savedTrainingScroll=page.scrollTop;page.hidden=true;}document.documentElement.classList.add('mh-training-route');}
  function launchFrenchBelt(id){if(typeof window.openFrenchTrainingPopupV2348!=='function'||typeof window.startFrenchTrainingV2348!=='function')return;beltReturnActive=true;closeIntoActivity();window.openFrenchTrainingPopupV2348();var frOverlay=document.getElementById('frenchTrainingOverlayV2348');if(frOverlay){frOverlay.style.removeProperty('display');frOverlay.removeAttribute('aria-hidden');}window.startFrenchTrainingV2348(id);}
  function launchMathBelt(id){if(typeof window.openMathsTrainingPopupV2343!=='function')return;beltReturnActive=true;closeIntoActivity();window.openMathsTrainingPopupV2343();var mathOverlay=document.getElementById('mathsTrainingOverlayV2343');if(mathOverlay){mathOverlay.style.removeProperty('display');mathOverlay.removeAttribute('aria-hidden');}var overlay=document.getElementById('mathsTrainingOverlayV2343');var buttons=overlay?overlay.querySelectorAll('.maths-v2343-train-btn'):[];var i=maths.findIndex(function(b){return b[0]===id;});if(i>=0&&buttons[i])buttons[i].click();else if(typeof window.startMathsTrainingV2343==='function')window.startMathsTrainingV2343(id);}
  function launchFrenchFree(type){
    if(typeof window.openFrenchTrainingPopupV2348!=='function')return;
    closeIntoActivity();window.openFrenchTrainingPopupV2348();
    var overlay=document.getElementById('frenchTrainingOverlayV2348');
    var cls={writing:'writing',vocab:'vocab',ortho:'ortho',reading:'reading'}[type];
    var button=overlay&&overlay.querySelector('.fr-v25720-domain-card.'+cls+':not([disabled])');
    if(button){button.click();return;}
    var fallbacks={writing:['openProductionEcritV1','openHibouProductionEcritV1'],vocab:['openHibouVocabulaireV25729','openHibouVocabulaireV25724'],ortho:['openHibouOrthographeV25730'],reading:['openHibouLectureComprehensionV25833']};
    var list=fallbacks[type]||[];
    for(var i=0;i<list.length;i++){if(typeof window[list[i]]==='function'){window[list[i]]();return;}}
    console.warn('Rubrique à vérifier :',type);
  }
  function launchSuitesGame(){
    // La page M'entraîner reste derrière la fenêtre du Défi des suites.
    var fn=window.openHibouSuitesGame;
    if(typeof fn==='function'){
      open();
      try{fn();}catch(err){console.error('Défi des suites : ouverture impossible',err);alert('Le Défi des suites ne peut pas démarrer.');}
      return;
    }
    // Chargement de secours si le module n'a pas été chargé par index.html.
    var existing=document.querySelector('script[src="js/hibou-suites-v25883.js"]');
    if(existing && existing.dataset.mhtSuitesRetry==='1'){
      alert('Défi des suites indisponible : vérifie js/hibou-suites-v25883.js.');
      return;
    }
    if(existing)existing.dataset.mhtSuitesRetry='1';
    var loader=document.createElement('script');
    loader.src='js/hibou-suites-v25883.js';
    loader.onload=function(){
      if(typeof window.openHibouSuitesGame==='function')launchSuitesGame();
      else alert('Le module Défi des suites est chargé, mais son ouverture est indisponible.');
    };
    loader.onerror=function(){alert('Fichier manquant : js/hibou-suites-v25883.js');};
    document.head.appendChild(loader);
  }
  function launchTablesGame(){
    // Le jeu existe dans js/hibou-tables-game-v25881.js.
    // Les clics doivent rester exploitables même si le fichier n'est pas encore chargé.
    var fn=window.openHibouTablesGame;
    if(typeof fn==='function'){
      // Conserver la page M'entraîner derrière la fenêtre du Défi des tables.
      // À la fermeture du jeu, l'élève revient à cette page et non à l'accueil.
      open();
      try{fn();}catch(err){console.error('Défi des tables : ouverture impossible',err);alert('Le Défi des tables ne peut pas démarrer.');}
      return;
    }
    var script=document.querySelector('script[src="js/hibou-tables-game-v25881.js"]');
    if(script && script.dataset.mhtRetry==='1'){
      alert('Défi des tables indisponible : vérifie le fichier js/hibou-tables-game-v25881.js.');
      return;
    }
    if(script){script.dataset.mhtRetry='1';}
    var loader=document.createElement('script');
    loader.src='js/hibou-tables-game-v25881.js';
    loader.onload=function(){
      if(typeof window.openHibouTablesGame==='function')launchTablesGame();
      else alert('Le jeu est chargé, mais sa fonction d’ouverture est introuvable.');
    };
    loader.onerror=function(){alert('Fichier du Défi des tables introuvable : js/hibou-tables-game-v25881.js');};
    document.head.appendChild(loader);
  }
  // Point de retour unique depuis les moteurs historiques de ceintures.
  // Appelé directement par leurs boutons ; ne s'applique pas aux autres menus.
  function returnToTrainingPage(){
    if(!beltReturnActive)return false;
    beltReturnActive=false;
    ['mathsTrainingOverlayV2343','frenchTrainingOverlayV2348'].forEach(function(id){
      var overlay=document.getElementById(id);
      if(overlay){
        overlay.classList.add('hidden');
        overlay.removeAttribute('aria-hidden');
        overlay.style.removeProperty('display');
      }
    });
    document.documentElement.style.overflow='';
    document.body.style.overflow='';
    make();
    page.hidden=false;
    document.documentElement.classList.add('mh-training-route');
    page.scrollTop=savedTrainingScroll;
    requestAnimationFrame(function(){if(page&&!beltReturnActive){page.hidden=false;page.scrollTop=savedTrainingScroll;}});
    return true;
  }
  window.returnMHTrainingFromBelt=returnToTrainingPage;
  document.addEventListener('click',function(ev){var target=ev.target&&ev.target.closest&&ev.target.closest('#v2574TrainBtn');if(target){ev.preventDefault();ev.stopImmediatePropagation();open();}},true);
  window.openMHTrainingPage=open;
  window.closeMHTrainingPage=close;
})();

/* Arts & Créativité : bouton indépendant du gestionnaire historique Français. */
(function(){
  'use strict';
  if(window.__mhArtsCreativeNavBridge)return;
  window.__mhArtsCreativeNavBridge=true;
  var icon='images/arts-creativite/icone-arts.jpg';
  function render(){
    document.querySelectorAll('button.subject-btn[data-subject="francais"], button.subject-btn[data-subject="arts-creativite"]').forEach(function(button){
      // Important : un script historique intercepte les clics sur data-subject="francais".
      // Remplacer la valeur réelle empêche ce détournement ; ne pas seulement changer l'image.
      button.dataset.subject='arts-creativite';
      button.setAttribute('aria-label','Ouvrir Arts et Créativité');
      button.setAttribute('title','Arts & Créativité');
      var label=button.querySelector('.subject-label');
      if(label && label.textContent!=='Arts & Créativité')label.textContent='Arts & Créativité';
      var picto=button.querySelector('.subject-icon');
      if(picto && !picto.querySelector('img[data-mh-arts-icon]')){
        picto.textContent='';
        var image=document.createElement('img');image.src=icon;image.alt='';image.dataset.mhArtsIcon='1';
        image.style.cssText='display:block;width:100%;height:100%;object-fit:contain;border-radius:12px';
        picto.appendChild(image);
      }
    });
  }
  document.addEventListener('click',function(event){
    var b=event.target.closest&&event.target.closest('button.subject-btn[data-subject="arts-creativite"]');
    if(!b)return;
    event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
    window.location.assign('arts-creativite.html');
  },true);
  function start(){
    render();
    var queued=false;
    new MutationObserver(function(){
      if(queued)return;
      queued=true;
      requestAnimationFrame(function(){queued=false;render();});
    }).observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['data-subject']});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
