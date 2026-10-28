/* Ergonomie CE2 — La porte mystérieuse, sans modification des brouillons. */
(function(){'use strict';
const rootId='frenchPopupInnerV2348';
function enhance(){
 const root=document.getElementById(rootId);
 if(!root)return;
 const main=root.querySelector('main.mh-wr');
 if(!main || main.classList.contains('mh-wr-level2') || main.classList.contains('mh-wr-level3') || main.classList.contains('mh-dras') || main.classList.contains('mh-graine') || main.classList.contains('mh-defis'))return;
 const art=main.querySelector('.mh-wr-columns > .mh-wr-image');
 const editor=main.querySelector('.mh-wr-columns > .mh-wr-editor');
 const textarea=editor&&editor.querySelector('#mh-wr-text');
 if(!art||!textarea)return;
 main.classList.add('mh-ergonomic-writing');
 if(!editor.querySelector('.mh-erg-word-tools')){
  const controls=document.createElement('div');
  controls.className='mh-erg-word-tools';
  controls.innerHTML='<button type="button" class="mh-erg-show-words" aria-expanded="false" aria-controls="mh-erg-word-copy">📖 Voir mes mots</button><div id="mh-erg-word-copy" class="mh-erg-word-copy" hidden></div>';
  textarea.insertAdjacentElement('beforebegin',controls);
  const btn=controls.querySelector('button');
  const copy=controls.querySelector('.mh-erg-word-copy');
  btn.addEventListener('click',function(){
   const expanded=btn.getAttribute('aria-expanded')==='true';
   if(!expanded){const bank=art.querySelector('.mh-vocab-bank');if(bank){copy.replaceChildren(bank.cloneNode(true));}else{copy.textContent='La banque de mots se charge…';}}
   copy.hidden=expanded;btn.setAttribute('aria-expanded',String(!expanded));btn.textContent=expanded?'📖 Voir mes mots':'📖 Masquer mes mots';
  });
 }
 if(!editor.querySelector('.mh-erg-proofreading')){
  const note=document.createElement('p');note.className='mh-erg-proofreading';note.textContent='✏️ Majuscule · Espaces · Point · Je relis';
  textarea.insertAdjacentElement('afterend',note);
 }
}
let pending=false;
function schedule(){if(pending)return;pending=true;queueMicrotask(function(){pending=false;enhance();});}
function init(){const root=document.getElementById(rootId);if(root){new MutationObserver(schedule).observe(root,{subtree:true,childList:true});enhance();}else{const watcher=new MutationObserver(function(){if(document.getElementById(rootId)){watcher.disconnect();init();}});watcher.observe(document.documentElement,{childList:true,subtree:true});}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();