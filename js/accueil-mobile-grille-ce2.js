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
