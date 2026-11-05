(function(){
  'use strict';
  if(window.__mhGrandirPageNavigationV1) return;
  window.__mhGrandirPageNavigationV1=true;
  var TARGET='grandir-ensemble.html';
  function go(){ window.location.href=TARGET; }
  window.openGrandirEnsemble=go;
  function installSplit(){
    var card=document.getElementById('v24ShortcutsCard');
    if(!card) return;
    if(card.getAttribute('data-v2516-split')!=='1'){
      var fresh=document.createElement('article');
      fresh.id='v24ShortcutsCard';
      fresh.className='v24-shortcuts-card mh-grow-split-card';
      fresh.setAttribute('data-v2516-split','1');
      fresh.setAttribute('aria-label','Raccourcis et Grandir ensemble');
      fresh.__v2405Bound=true;
      fresh.innerHTML='<button type="button" class="mh-split-zone shortcuts" aria-label="Ouvrir les raccourcis de la classe"><span class="mh-split-icon" aria-hidden="true">🌍</span><span class="mh-split-text"><h3>Raccourcis</h3><p>Sites utiles pour travailler ou t’informer.</p></span><span class="mh-split-pill">Ouvrir les liens →</span></button><button type="button" class="mh-split-zone grow" aria-label="Ouvrir Grandir ensemble"><span class="mh-split-icon" aria-hidden="true">🤝</span><span class="mh-split-text"><h3>Grandir ensemble</h3><p>EMC, EMI, EVAR et vie de classe.</p></span><span class="mh-split-pill">Ouvrir →</span></button>';
      card.replaceWith(fresh); card=fresh;
    }
    card.__v2405Bound=true;
  }
  document.addEventListener('click',function(ev){
    var t=ev.target&&ev.target.closest?ev.target.closest('.mh-split-zone.grow, #greatTogetherBtn, #btnGrandirEnsemble, [data-open="grandir-ensemble"], [data-mh-grow-page]'):null;
    if(!t) return;
    ev.preventDefault(); ev.stopPropagation(); if(ev.stopImmediatePropagation)ev.stopImmediatePropagation();
    go();
  },true);
  function install(){ if(!document.body)return;document.body.classList.add('v25-1-6-ready');installSplit(); }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
  window.addEventListener('load',install);
  [100,350,800,1500,3000].forEach(function(ms){setTimeout(install,ms);});
  // EMC and EVAR page results are queued while index is not active.
  function importResults(){
    var data=[];
    try{data=JSON.parse(localStorage.getItem('mh_grandir_pending_events_v1')||'[]');}catch(e){}
    if(!Array.isArray(data)||!data.length)return;
    if(typeof window.hibouRecordVivreEnsembleV25746!=='function')return;
    data.forEach(function(evt){try{window.hibouRecordVivreEnsembleV25746(evt);}catch(e){}});
    localStorage.removeItem('mh_grandir_pending_events_v1');
  }
  window.addEventListener('load',importResults);setTimeout(importResults,800);
})();