/*
 * Maître Hibou V25.8.47 — ordre du Parcours : plus récent -> plus ancien.
 */
(function(){
  'use strict';
  if(window.__hibouParcoursOrderV25847) return;
  window.__hibouParcoursOrderV25847 = true;

  function clean(v){return String(v==null?'':v).replace(/\s+/g,' ').trim();}
  function stamp(text){
    var m=clean(text).match(/(\d{2})\/(\d{2})\/(\d{4})(?:\s*(?:à|a)?\s*(\d{1,2})[:h](\d{2}))?/i);
    if(!m)return 0;
    return new Date(+m[3],+m[2]-1,+m[1],+(m[4]||0),+(m[5]||0)).getTime()||0;
  }
  function root(){
    var all=[].slice.call(document.querySelectorAll('h1,h2,h3,h4'));
    var h=all.find(function(x){return clean(x.textContent).indexOf('Mon parcours récent')===0;});
    return h && h.parentElement ? h.parentElement : null;
  }
  function sortNow(){
    var r=root(); if(!r)return;
    var boxes=[r].concat([].slice.call(r.querySelectorAll('div,section,article')));
    var best=null, rows=[];
    boxes.forEach(function(b){
      var c=[].slice.call(b.children||[]).filter(function(x){return stamp(x.textContent)>0;});
      if(c.length>rows.length){best=b;rows=c;}
    });
    if(!best||rows.length<2)return;
    rows.sort(function(a,b){return stamp(b.textContent)-stamp(a.textContent);})
        .forEach(function(x){best.appendChild(x);});
  }
  var timer=0;
  function schedule(){clearTimeout(timer);timer=setTimeout(sortNow,40);}
  document.addEventListener('click',schedule,true);
  window.addEventListener('hibou:math-record-updated',schedule);
  window.addEventListener('hibou:bilan-updated',schedule);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
  try{new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});}catch(e){}
})();
