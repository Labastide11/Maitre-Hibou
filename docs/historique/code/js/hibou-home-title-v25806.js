/* Maître Hibou V25.8.06 — titre personnalisé */
(function(){
'use strict';
if(window.__hibouHomeTitleV25806)return;
window.__hibouHomeTitleV25806=true;
function clean(v){return String(v==null?'':v).replace(/\s+/g,' ').trim();}
function currentName(){
  try{if(typeof window.prenomActuel!=='undefined'&&window.prenomActuel)return clean(window.prenomActuel);}catch(e){}
  for(const id of ['v21HeaderName','v21HeroName','eleveNom']){
    const el=document.getElementById(id),t=clean(el&&el.textContent);
    if(t&&t!=='Élève'&&t!=='Jo')return t;
  }
  try{return clean(localStorage.getItem('hibou_last_prenom')||localStorage.getItem('hibou_prenom')||localStorage.getItem('elevePrenom')||'');}
  catch(e){return'';}
}
function apply(){
  var target=null;
  document.querySelectorAll('h1,.v2574-dashboard-title,.v2574-main-title').forEach(function(el){
    if(target)return;
    if(/Que veux-tu faire maintenant\s*\?/.test(clean(el.textContent)))target=el;
  });
  if(!target)return;
  var name=currentName(); if(!name)return;
  var wanted='✨ '+name+', que veux-tu faire maintenant ? ✨';
  if(clean(target.textContent)!==wanted)target.textContent=wanted;
}
function boot(){apply();[200,600,1400].forEach(ms=>setTimeout(apply,ms));document.addEventListener('hibou:student-changed',()=>setTimeout(apply,100));}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();