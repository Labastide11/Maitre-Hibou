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
    var button=row.querySelector('.mh-change-student-ce2');
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


/* iPhone : compléter les deux accès existants dans la grille sans déplacer les
   boutons de matières ni modifier leurs événements. Aucune action sur PC. */
(function(){
  'use strict';
  var mq=window.matchMedia('(max-width: 680px)');
  var pending=false;
  function clickFirst(selectors, excluded){
    for(var i=0;i<selectors.length;i++){
      var el=document.querySelector(selectors[i]);
      if(el && !el.closest('.mh-mobile-subject-grid') && el !== excluded && typeof el.click==='function'){
        el.click(); return true;
      }
    }
    return false;
  }
  function openGrow(){
    if(typeof window.openGrandirEnsemble==='function'){window.openGrandirEnsemble();return;}
    clickFirst(['#greatTogetherBtn','#btnGrandirEnsemble','.mh-split-zone.grow','[data-open="grandir-ensemble"]']);
  }
  function openTools(){
    if(typeof window.openClassShortcutsPopup==='function'){window.openClassShortcutsPopup();return;}
    clickFirst(['#usefulLinksBtn','#btnLiensUtiles','.mh-split-zone.shortcuts','[data-open="outils"]']);
  }
  function ensureOne(nav, kind, name, open){
    var existing=Array.from(nav.querySelectorAll(':scope > button')).some(function(btn){
      var id=(btn.dataset.subject||'').toLowerCase();
      var label=(btn.getAttribute('aria-label')||'')+' '+(btn.textContent||'');
      return kind==='grow' ? (id==='grandir'||/grandir ensemble/i.test(label)) :
             (id==='outils'||/outils|liens externes|liens utiles/i.test(label));
    });
    if(existing)return;
    var b=document.createElement('button');
    b.type='button';
    b.dataset.subject=kind==='grow'?'grandir':'outils';
    b.className='subject-btn mh-mobile-extra-ce2 mh-mobile-extra-'+kind+'-ce2';
    b.setAttribute('aria-label',kind==='grow'?'Ouvrir Grandir ensemble':'Ouvrir les liens externes');
    b.innerHTML='<span class="subject-icon" aria-hidden="true"></span><span class="subject-label">'+name+'</span>';
    b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();open();});
    nav.appendChild(b);
  }
  function apply(){
    if(!mq.matches||!document.body.classList.contains('v25-7-73-simplified-home')||document.body.classList.contains('prenom-mode'))return;
    var panel=document.getElementById('v2574MainDashboard');
    var nav=panel&&panel.querySelector('.subjects-bar.mh-mobile-subject-grid');
    if(!nav)return;
    ensureOne(nav,'grow','Grandir ensemble',openGrow);
    ensureOne(nav,'tools','Liens externes',openTools);
    var strip=panel.querySelector('.v2574-advice-strip');
    if(strip)strip.setAttribute('aria-label','Le conseil de Maître Hibou : Une question, c’est déjà le début d’une découverte !');
  }
  function schedule(){
    if(pending)return;
    pending=true;
    requestAnimationFrame(function(){pending=false;apply();});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){apply();setTimeout(apply,300);setTimeout(apply,1000);},{once:true});
  else {apply();setTimeout(apply,300);setTimeout(apply,1000);}
  window.addEventListener('pageshow',schedule);
  if(mq.addEventListener)mq.addEventListener('change',schedule);
  new MutationObserver(function(records){
    if(!mq.matches)return;
    for(var i=0;i<records.length;i++){
      var r=records[i];
      if(r.type==='childList'){
        for(var j=0;j<r.addedNodes.length;j++){
          var n=r.addedNodes[j];
          if(n.nodeType===1 && (n.id==='v2574MainDashboard'||n.classList.contains('mh-mobile-subject-grid'))){schedule();return;}
        }
      }
    }
  }).observe(document.body,{childList:true,subtree:true});
})();
