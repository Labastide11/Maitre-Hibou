/* Maître Hibou NAV-01 DRAS : lecture de l'affiche sans perdre l'exercice. */
(function(){
 'use strict';
 if(window.__mhNav01Dras) return;
 window.__mhNav01Dras=true;
 var overlay=null, lastFocus=null;
 function closeLesson(){
   if(!overlay || overlay.hidden) return;
   overlay.hidden=true;
   if(lastFocus && lastFocus.isConnected) lastFocus.focus();
 }
 function ensureOverlay(){
   if(overlay && overlay.isConnected) return overlay;
   overlay=document.createElement('section');
   overlay.className='mh-dras-lesson-view';
   overlay.id='mh-dras-lesson-view';
   overlay.hidden=true;
   overlay.setAttribute('role','dialog');
   overlay.setAttribute('aria-modal','true');
   overlay.setAttribute('aria-label','Leçon DRAS');
   overlay.innerHTML='<div class="mh-dras-lesson-head"><strong>📖 J’améliore ma phrase avec DRAS</strong><button type="button" class="mh-dras-lesson-close">← Retour à mon exercice</button></div><div class="mh-dras-lesson-scroll"><img src="images/production-ecrit/lecon-dras.jpg" alt="Affiche DRAS : Déplacer, Remplacer, Ajouter, Supprimer. Quatre exemples pour améliorer une phrase." loading="eager"></div>';
   overlay.querySelector('.mh-dras-lesson-close').addEventListener('click',closeLesson);
   document.body.appendChild(overlay);
   return overlay;
 }
 function openLesson(){
   lastFocus=document.activeElement;
   // L'atelier reste dans le DOM : la question, les saisies et les brouillons sont intacts.
   ensureOverlay().hidden=false;
   overlay.querySelector('.mh-dras-lesson-close').focus();
 }
 function apply(){
   var root=document.getElementById('frenchPopupInnerV2348');
   if(!root || !root.querySelector('.mh-dras')) return;
   var top=root.querySelector('.mh-dras .mh-wr-top');
   if(!top || top.querySelector('.mh-dras-lesson-button')) return;
   var button=document.createElement('button');
   button.type='button';
   button.className='mh-dras-lesson-button';
   button.textContent='📖 Voir la leçon DRAS';
   button.addEventListener('click',openLesson);
   var back=top.querySelector('#mh-dras-back');
   if(back) top.insertBefore(button,back); else top.appendChild(button);
 }
 document.addEventListener('keydown',function(e){if(e.key==='Escape' && overlay && !overlay.hidden){e.preventDefault();closeLesson();}});
 function init(){
   var root=document.getElementById('frenchPopupInnerV2348');
   if(!root) return;
   new MutationObserver(apply).observe(root,{childList:true,subtree:true});
   apply();
 }
 if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
