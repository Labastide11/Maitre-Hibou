/* Déplace uniquement la barre existante dans l'accueil mobile : conserve ses boutons et listeners. */
(function(){
 'use strict';
 var mq=window.matchMedia('(max-width: 680px)');
 var originalParent=null,originalNext=null,mobileNav=null;
 function restore(){
   if(!mobileNav)return;
   mobileNav.classList.remove('mh-mobile-subject-grid');
   if(originalParent && mobileNav.parentNode!==originalParent){
     if(originalNext && originalNext.parentNode===originalParent)originalParent.insertBefore(mobileNav,originalNext);
     else originalParent.appendChild(mobileNav);
   }
   document.body.classList.remove('mh-mobile-home-grid');
 }
 function update(){
   var panel=document.getElementById('v2574MainDashboard');
   if(!mq.matches){restore();return;}
   if(!panel||!document.body.classList.contains('v25-7-73-simplified-home'))return;
   var nav=mobileNav||Array.from(document.querySelectorAll('.subjects-bar')).sort(function(a,b){return b.querySelectorAll(':scope > button').length-a.querySelectorAll(':scope > button').length;})[0];
   var actions=panel.querySelector('.v2574-actions');
   if(!nav||!actions)return;
   if(!mobileNav){mobileNav=nav;originalParent=nav.parentNode;originalNext=nav.nextSibling;}
   if(nav.parentNode!==panel || nav.previousElementSibling!==actions)actions.insertAdjacentElement('afterend',nav);
   nav.classList.add('mh-mobile-subject-grid');
   document.body.classList.add('mh-mobile-home-grid');
 }
 function init(){update();window.addEventListener('resize',update,{passive:true});window.addEventListener('pageshow',update);if(mq.addEventListener)mq.addEventListener('change',update);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();


/* Bandeau d'accueil : utilise la fonction de changement d'élève existante.
   N'altère ni la navigation PC/TBI ni le moteur d'identification. */
(function(){
  'use strict';
  var dashboardObserver;
  var queued = false;
  function updateChangeStudent(){
    var panel=document.getElementById('v2574MainDashboard');
    if(!panel)return;
    var heading=panel.querySelector('.v2574-title');
    if(!heading)return;
    var row=panel.querySelector('.mh-welcome-row-ce2');
    if(!row){
      row=document.createElement('div');
      row.className='mh-welcome-row-ce2';
      heading.parentNode.insertBefore(row, heading);
      row.appendChild(heading);
    }
    var button=panel.querySelector('.mh-change-student-ce2') || document.querySelector('header.v21-header .mh-mobile-header-change-ce2');
    if(!button){
      button=document.createElement('button');
      button.type='button';
      button.className='mh-change-student-ce2';
      button.innerHTML='<span class="mh-change-icon-ce2" aria-hidden="true">⇄</span><span>Changer d’élève</span>';
      button.setAttribute('aria-label','Changer d’élève ou donner la tablette');
      button.addEventListener('click',function(){
        if(typeof window.changerEleve === 'function')window.changerEleve();
      });
      row.appendChild(button);
    }
    button.hidden=!document.documentElement.classList.contains('hibou-authenticated') || document.body.classList.contains('prenom-mode');
  }
  function schedule(){
    if(queued)return;
    queued=true;
    window.requestAnimationFrame(function(){queued=false;updateChangeStudent();});
  }
  function init(){
    updateChangeStudent();
    dashboardObserver=new MutationObserver(schedule);
    dashboardObserver.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
    dashboardObserver.observe(document.body,{attributes:true,attributeFilter:['class']});
    /* Dashboard created dynamically during login; observe only until it appears. */
    var panel=document.getElementById('v2574MainDashboard');
    if(!panel){
      var insertionObserver=new MutationObserver(function(){
        if(document.getElementById('v2574MainDashboard')){insertionObserver.disconnect();schedule();}
      });
      insertionObserver.observe(document.body,{childList:true,subtree:true});
    }
    window.addEventListener('pageshow',schedule);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();


/* iPhone : deux raccourcis visibles vers les modules déjà existants.
   On ne se base jamais sur les anciens boutons cachés pour décider de leur affichage. */
(function(){
  'use strict';
  var mq=window.matchMedia('(max-width: 680px)');
  var scheduled=false;
  function activateOriginal(kind){
    var ids=kind==='grow'?['greatTogetherBtn','btnGrandirEnsemble']:['usefulLinksBtn','btnLiensUtiles'];
    for(var i=0;i<ids.length;i++){
      var btn=document.getElementById(ids[i]);
      if(btn&&typeof btn.click==='function'){btn.click();return;}
    }
    var selectors=kind==='grow'?
      ['.mh-split-zone.grow','[data-open="grandir-ensemble"]','.v2574-grow-btn:not(.mh-mobile-extra-ce2)']:
      ['.mh-split-zone.shortcuts','[data-open="outils"]','.v2574-tools-btn:not(.mh-mobile-extra-ce2)'];
    for(var j=0;j<selectors.length;j++){
      var el=document.querySelector(selectors[j]);
      if(el&&typeof el.click==='function'){el.click();return;}
    }
    // Sur mobile, l'ancien centre est détaché du document pour supprimer
    // sa hauteur. Ses boutons historiques restent utilisables ici.
    var legacy=window.__hibouLegacyCenterMobile;
    if(legacy){
      for(var k=0;k<ids.length;k++){
        var old=legacy.querySelector('#'+ids[k]);
        if(old&&typeof old.click==='function'){old.click();return;}
      }
      for(var n=0;n<selectors.length;n++){
        var match=legacy.querySelector(selectors[n]);
        if(match&&typeof match.click==='function'){match.click();return;}
      }
    }
    if(kind==='grow'&&typeof window.openGrandirEnsemble==='function')window.openGrandirEnsemble();
    if(kind==='tools'&&typeof window.openClassShortcutsPopup==='function')window.openClassShortcutsPopup();
  }
  function addOne(nav,kind){
    var cl='mh-mobile-extra-'+kind+'-ce2';
    if(nav.querySelector(':scope > button.'+cl))return;
    var button=document.createElement('button');
    button.type='button';
    button.className='subject-btn mh-mobile-extra-ce2 '+cl;
    button.dataset.subject=kind==='grow'?'grandir':'outils';
    button.setAttribute('aria-label',kind==='grow'?'Grandir ensemble':'Liens externes');
    button.innerHTML='<span class="subject-icon" aria-hidden="true"></span><span class="subject-label">'+(kind==='grow'?'Grandir ensemble':'Liens externes')+'</span>';
    button.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();activateOriginal(kind);});
    nav.appendChild(button);
  }
  function apply(){
    if(!mq.matches||!document.body.classList.contains('v25-7-73-simplified-home')||document.body.classList.contains('prenom-mode'))return;
    var dashboard=document.getElementById('v2574MainDashboard');
    var nav=dashboard&&dashboard.querySelector('.subjects-bar.mh-mobile-subject-grid');
    if(!nav)return;
    addOne(nav,'grow');
    addOne(nav,'tools');
  }
  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(function(){scheduled=false;apply();});}
  function init(){
    apply();
    window.addEventListener('pageshow',schedule);
    window.addEventListener('resize',schedule,{passive:true});
    if(mq.addEventListener)mq.addEventListener('change',schedule);
    new MutationObserver(function(records){
      if(!mq.matches)return;
      for(var i=0;i<records.length;i++){
        for(var j=0;j<records[i].addedNodes.length;j++){
          var node=records[i].addedNodes[j];
          if(node.nodeType===1&&(node.id==='v2574MainDashboard'||node.classList.contains('mh-mobile-subject-grid'))){schedule();return;}
        }
      }
    }).observe(document.body,{childList:true,subtree:true});
    [100,450,1200].forEach(function(t){setTimeout(apply,t);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();


/* Accueil iPhone : retire DU DOM les vestiges de l'ancien accueil.
   Ne masque rien avec CSS ; ne touche pas aux boutons de la Constellation.
   Sur PC/tablette, ne supprime aucun noeud. */
(function(){
  'use strict';
  var mq=window.matchMedia('(max-width: 680px)');
  var queued=false, observer=null;
  var legacyCenter=null, legacyParent=null, legacyNext=null;
  function restoreLegacyCenter(){
    if(!legacyCenter || !legacyParent || legacyCenter.parentNode)return;
    if(originalPositionValid()) legacyParent.insertBefore(legacyCenter,legacyNext);
    else legacyParent.appendChild(legacyCenter);
    window.__hibouLegacyCenterMobile=null;
  }
  function originalPositionValid(){
    return legacyNext && legacyNext.parentNode===legacyParent;
  }
  function cleanup(){
    // Firefox responsive : réinsérer l'accueil historique seulement sur PC.
    if(!mq.matches){restoreLegacyCenter();return;}
    if(!document.body.classList.contains('v25-7-73-simplified-home') ||
       document.body.classList.contains('prenom-mode'))return;
    var dashboard=document.getElementById('v2574MainDashboard');
    if(!dashboard)return;
    // L'accès actuel « Changer d'élève » est dans le bandeau du dashboard.
    // Nettoyage idempotent : seuls les doublons historiques sont supprimés.
    // Ne pas dépendre de l'emplacement actuel du bouton d'en-tête.
    // Suppression effective des anciens grands boutons rouges, jamais celui du bandeau.
    document.querySelectorAll(
      '#v21Home .v21-change-student-btn, '+
      '.v21-center > .v21-change-student-btn.hibou-change-student-outside, '+
      '.logout-area'
    ).forEach(function(el){
      if(!dashboard.contains(el))el.remove();
    });
    // Supprimer les anciens éléments de Constellation qui créent un espace vide
    // entre la grille et le conseil (ils ne sont pas utilisés sur téléphone).
    dashboard.querySelectorAll(':scope > .mh-universe, :scope > .mh-subject-heading, :scope > .mh-subtitle').forEach(function(el){
      // Les quatre vrais boutons sont conservés : ne retirer que le décor vide.
      if(!el.querySelector('.v2574-actions')) el.remove();
    });
    // Ancien menu de matières : seulement s'il existe DEJA une barre active dans le dashboard.
    // Ne jamais retirer la barre de matières actuelle ni ses événements de clic.
    if(dashboard.querySelector('.subjects-bar.mh-mobile-subject-grid')){
      document.querySelectorAll('.subjects-bar').forEach(function(el){
        if(!dashboard.contains(el))el.remove();
      });
    }
    // Diagnostic Firefox 390px : #v21Home = 887px, dashboard = 479px,
    // .v21-center = 386px. Cet ANCIEN bloc suit le dashboard dans #v21Home
    // et constitue l'espace de défilement superflu sous le conseil.
    // On le DETACHE du DOM (pas de display:none), sans toucher au dashboard.
    var home=document.getElementById('v21Home');
    var center=home && home.querySelector(':scope > .v21-center');
    if(center && !center.contains(dashboard)){
      legacyCenter=center;
      legacyParent=center.parentNode;
      legacyNext=center.nextSibling;
      window.__hibouLegacyCenterMobile=center;
      center.remove();
    }
  }
  function schedule(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(function(){queued=false;cleanup();});
  }
  function init(){
    cleanup();
    observer=new MutationObserver(function(mutations){
      if(!mq.matches)return;
      for(var i=0;i<mutations.length;i++){
        if(mutations[i].addedNodes.length){schedule();return;}
      }
    });
    observer.observe(document.body,{childList:true,subtree:true});
    window.addEventListener('pageshow',schedule);
    window.addEventListener('resize',schedule,{passive:true});
    if(mq.addEventListener)mq.addEventListener('change',schedule);
    [100,500,1300,2600].forEach(function(ms){setTimeout(schedule,ms);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();


/* Accueil téléphone : titre de bienvenue compact et conseil immédiatement
   après les matières. Restauration du titre original dès retour sur PC. */
(function(){
  'use strict';
  var mq = window.matchMedia('(max-width: 680px)');
  var queued = false;
  var originalAdviceParent = null;
  var originalAdviceNext = null;
  function isMobileHome(){
    return mq.matches && document.body.classList.contains('v25-7-73-simplified-home') &&
      !document.body.classList.contains('prenom-mode');
  }
  function nameForStudent(){
    if(!document.documentElement.classList.contains('hibou-authenticated')) return '';
    var mode='', name='';
    try {
      mode = localStorage.getItem('hibou_mode') || '';
      name = String(window.prenomActuel || localStorage.getItem('hibou_prenom') || '').trim();
    } catch(e) { name = String(window.prenomActuel || '').trim(); }
    return mode === 'eleve' ? name : '';
  }
  function update(){
    var panel = document.getElementById('v2574MainDashboard');
    if(!panel) return;
    var label = panel.querySelector('#hibouWelcomeTitle');
    var advice = panel.querySelector('.v2574-advice-strip');
    if(isMobileHome()){
      var name = nameForStudent();
      var expected = name ? 'Bienvenue ' + name + ' !' : 'Bienvenue !';
      if(label && label.textContent !== expected) label.textContent = expected;
      var nav = panel.querySelector('.subjects-bar.mh-mobile-subject-grid');
      // Le conseil appartient à la même grille que les matières sur iPhone.
      // Safari modifie la hauteur visible pendant le défilement : deux blocs
      // séparés pouvaient alors s'écarter. Cette relation reste stable.
      if(nav && advice && advice.parentNode !== nav){
        if(!originalAdviceParent){
          originalAdviceParent = advice.parentNode;
          originalAdviceNext = advice.nextSibling;
        }
        nav.appendChild(advice);
      }
    } else {
      if(label && typeof window.hibouUpdateWelcomeTitle === 'function'){
        // Restaurer seulement si le titre porte encore notre version courte.
        if(/^(Bienvenue (chez Maître Hibou|.+) !)$/.test(label.textContent.trim())){
          window.hibouUpdateWelcomeTitle();
        }
      }
      if(advice && originalAdviceParent && advice.parentNode !== originalAdviceParent){
        if(originalAdviceNext && originalAdviceNext.parentNode === originalAdviceParent)
          originalAdviceParent.insertBefore(advice,originalAdviceNext);
        else originalAdviceParent.appendChild(advice);
      }
    }
  }
  function schedule(){
    if(queued) return;
    queued = true;
    requestAnimationFrame(function(){queued=false;update();});
  }
  function init(){
    schedule();
    window.addEventListener('pageshow',schedule);
    window.addEventListener('resize',schedule,{passive:true});
    if(mq.addEventListener) mq.addEventListener('change',schedule);
    var panel = document.getElementById('v2574MainDashboard');
    if(panel){
      var label=panel.querySelector('#hibouWelcomeTitle');
      if(label) new MutationObserver(schedule).observe(label,{childList:true,characterData:true,subtree:true});
    }
    new MutationObserver(function(mutations){
      for(var i=0;i<mutations.length;i++){
        if(mutations[i].type==='attributes') {schedule();return;}
      }
    }).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
    new MutationObserver(schedule).observe(document.body,{attributes:true,attributeFilter:['class']});
    [250,750].forEach(function(ms){setTimeout(schedule,ms);});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();


/* Accueil iPhone : REUTILISER le bouton existant dans le bandeau compact.
   Son gestionnaire de clic reste attaché au même noeud ; aucun doublon.
   La restauration sur ordinateur le replace à son emplacement d'origine. */
(function(){
  'use strict';
  var mq=window.matchMedia('(max-width: 680px)');
  var scheduled=false, originalRow=null, originalNext=null;
  function sync(){
    var header=document.querySelector('header.v21-header > .mh-compact-v15');
    var panel=document.getElementById('v2574MainDashboard');
    var active=mq.matches && document.body.classList.contains('v25-7-73-simplified-home') && !document.body.classList.contains('prenom-mode');
    var button=document.querySelector('.mh-change-student-ce2');
    if(!button || !panel)return;
    if(active && header){
      if(!originalRow && button.parentNode && !header.contains(button)){
        originalRow=button.parentNode;
        originalNext=button.nextSibling;
      }
      if(button.parentNode!==header){
        var progress=header.querySelector('.mh-parcours');
        if(progress)header.insertBefore(button,progress);
        else header.appendChild(button);
      }
      button.classList.add('mh-mobile-header-change-ce2');
      document.body.classList.toggle('mh-mobile-header-has-change',!button.hidden);
    }else{
      document.body.classList.remove('mh-mobile-header-has-change');
      button.classList.remove('mh-mobile-header-change-ce2');
      if(originalRow && button.parentNode!==originalRow){
        if(originalNext && originalNext.parentNode===originalRow)originalRow.insertBefore(button,originalNext);
        else originalRow.appendChild(button);
      }
    }
  }
  function schedule(){
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(function(){scheduled=false;sync();});
  }
  function init(){
    sync();
    window.addEventListener('pageshow',schedule);
    window.addEventListener('resize',schedule,{passive:true});
    if(mq.addEventListener)mq.addEventListener('change',schedule);
    new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
    new MutationObserver(schedule).observe(document.body,{attributes:true,attributeFilter:['class']});
    // L'en-tête et le tableau sont créés au cours du chargement.
    var header=document.querySelector('header.v21-header');
    if(header)new MutationObserver(schedule).observe(header,{childList:true,subtree:false});
    [120,420,1000].forEach(function(ms){setTimeout(schedule,ms);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
