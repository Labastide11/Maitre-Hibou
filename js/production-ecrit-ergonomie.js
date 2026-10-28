/* Ergonomie de rédaction CE2 — 14 activités, brouillons intacts. */
(function () {'use strict';
const ROOT='frenchPopupInnerV2348';
let serial=0;
function enhance(){
 const root=document.getElementById(ROOT), main=root&&root.querySelector('main.mh-wr');
 if(!main)return;
 const bank=main.querySelector('.mh-vocab-bank');
 if(!bank)return; // Le script des banques de mots peut s'exécuter juste après.
 main.classList.add('mh-ergonomic-writing');
 // La référence visuelle reste à gauche dans les exercices en deux colonnes.
 const ref=main.querySelector('.mh-wr-columns > .mh-wr-image, .mh-dras-art, .mh-defi-task > div:first-child');
 if(ref)ref.classList.add('mh-erg-reference');
 const areas=Array.from(main.querySelectorAll('textarea'));
 areas.forEach(function(area){
  if(area.dataset.mhErgReady==='1')return;
  area.dataset.mhErgReady='1';
  area.classList.add('mh-erg-textarea');
  const id='mh-erg-words-'+(++serial);
  const controls=document.createElement('div');
  controls.className='mh-erg-word-tools';
  const button=document.createElement('button');
  button.type='button';button.className='mh-erg-show-words';
  button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',id);
  button.textContent='📖 Voir mes mots';
  const content=document.createElement('div');content.id=id;
  content.className='mh-erg-word-copy';content.hidden=true;
  controls.append(button,content);
  area.insertAdjacentElement('beforebegin',controls);
  button.addEventListener('click',function(){
   const opening=button.getAttribute('aria-expanded')!=='true';
   if(opening){
    const current=main.querySelector('.mh-vocab-bank:not(.mh-erg-word-copy .mh-vocab-bank)');
    content.replaceChildren();
    if(current) content.appendChild(current.cloneNode(true));
    else content.textContent='La banque de mots n’est pas disponible pour cette activité.';
   }
   content.hidden=!opening;
   button.setAttribute('aria-expanded',String(opening));
   button.textContent=opening?'📖 Masquer mes mots':'📖 Voir mes mots';
  });
  const reminder=document.createElement('p');
  reminder.className='mh-erg-proofreading';
  reminder.textContent='✏️ Majuscule · Espaces · Point · Je relis';
  area.insertAdjacentElement('afterend',reminder);
 });
}
let pending=false;
function schedule(){if(pending)return;pending=true;queueMicrotask(function(){pending=false;enhance();});}
function init(){
 const root=document.getElementById(ROOT);
 if(!root){const watch=new MutationObserver(function(){if(document.getElementById(ROOT)){watch.disconnect();init();}});watch.observe(document.documentElement,{childList:true,subtree:true});return;}
 new MutationObserver(schedule).observe(root,{subtree:true,childList:true});enhance();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
