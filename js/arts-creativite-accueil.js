/* Maître Hibou – simple passerelle d'accueil, aucun moteur français modifié. */
(function(){
 'use strict';
 function adapt(){
  document.querySelectorAll('.subjects-bar .subject-btn[data-subject="francais"]').forEach(function(btn){
   if(btn.dataset.artsBridge==='1')return;
   btn.dataset.artsBridge='1';
   btn.setAttribute('aria-label','Ouvrir Arts et Créativité');
   btn.setAttribute('title','Arts & Créativité');
   var label=btn.querySelector('.subject-label');
   if(label) label.textContent='Arts & Créativité';
   var icon=btn.querySelector('.subject-icon');
   if(icon){icon.textContent='🎨';icon.setAttribute('aria-hidden','true')}
  });
 }
 // Priorité à la nouvelle rubrique pour l'ancien bouton, sans modifier les fonctions Français.
 document.addEventListener('click',function(ev){
  var b=ev.target.closest&&ev.target.closest('.subjects-bar .subject-btn[data-subject="francais"]');
  if(!b)return;
  ev.preventDefault();ev.stopPropagation();ev.stopImmediatePropagation();
  location.href='arts-creativite.html';
 },true);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
 function start(){adapt();new MutationObserver(function(){adapt()}).observe(document.body,{childList:true,subtree:true})}
})();
