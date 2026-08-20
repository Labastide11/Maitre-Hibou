/* Maître Hibou V25.8.06 — bandeau stable */
(function(){
'use strict';
if(window.__hibouBottomNavV25806)return;
window.__hibouBottomNavV25806=true;

var VERSION='25.8.06', mutating=false, scheduled=false;
var SUBJECT_ICONS={
francais:'assets/matieres/francais.png',
maths:'assets/matieres/maths.png',
anglais:'assets/matieres/anglais.png',
sciences:'assets/matieres/sciences.png',
geographie:'assets/matieres/geographie.png',
histoire:'assets/matieres/histoire.png'
};
var UTILITY_ICONS={
grow:'assets/navigation/grandir_ensemble.png',
tools:'assets/navigation/outils_liens.png'
};

function setVersion(){
  try{document.title='🦉 Maître Hibou V'+VERSION;}catch(e){}
  try{window.MAITRE_HIBOU_VERSION='V'+VERSION;}catch(e){}
}

function makeUtility(kind){
  var b=document.createElement('button');
  b.type='button';
  b.className='subject-btn hibou-bottom-utility-btn v25806-'+kind+'-btn';
  b.setAttribute('data-nav-action',kind);

  var h=document.createElement('span');
  h.className='subject-icon hibou-real-icon-holder';
  var img=document.createElement('img');
  img.src=UTILITY_ICONS[kind]; img.alt=''; img.setAttribute('aria-hidden','true');
  img.setAttribute('draggable','false'); img.setAttribute('data-hibou-real-icon','utility-'+kind);
  h.appendChild(img);

  var l=document.createElement('span');
  l.className='subject-label hibou-bottom-utility-label';
  var s=document.createElement('strong');
  s.textContent=kind==='grow'?'Grandir ensemble':'Outils';
  l.appendChild(s);

  b.appendChild(h); b.appendChild(l);

  b.addEventListener('click',function(ev){
    ev.preventDefault(); ev.stopPropagation();
    if(kind==='grow'){
      var g=document.querySelector('#v24ShortcutsCard .mh-split-zone.grow, .mh-split-zone.grow');
      if(g&&g.click){g.click();return;}
      if(typeof window.openGrandirEnsemble==='function'){window.openGrandirEnsemble();return;}
      if(typeof window.openGrowTogether==='function'){window.openGrowTogether();return;}
    }else{
      if(typeof window.openClassShortcutsPopup==='function'){window.openClassShortcutsPopup();return;}
      var t=document.querySelector('#v24ShortcutsCard .mh-split-zone.shortcuts, .mh-split-zone.shortcuts');
      if(t&&t.click)t.click();
    }
  });
  return b;
}

function ensureUtilities(bar){
  var changed=false;
  var grow=bar.querySelector('[data-nav-action="grow"], .v2574-grow-btn, .v25806-grow-btn');
  var tools=bar.querySelector('[data-nav-action="tools"], .v2574-tools-btn, .v25806-tools-btn');

  if(!grow){grow=makeUtility('grow');bar.appendChild(grow);changed=true;}
  if(!tools){tools=makeUtility('tools');bar.appendChild(tools);changed=true;}

  var kids=bar.children, n=kids.length;
  var ok=n>=2 && kids[n-2]===grow && kids[n-1]===tools;
  if(!ok){
    bar.appendChild(grow);
    bar.appendChild(tools);
    changed=true;
  }
  return changed;
}

function setUtilityLabel(btn,text){
  if(!btn)return false;
  var label=btn.querySelector('.subject-label,.hibou-bottom-utility-label,.hibou-bottom-nav__label');
  if(!label)return false;
  if((label.textContent||'').replace(/\s+/g,' ').trim()===text)return false;
  label.innerHTML='<strong>'+text+'</strong>';
  label.classList.add('hibou-bottom-utility-label');
  return true;
}

function ensureIcon(btn,src,key){
  if(!btn)return false;
  var changed=false;
  var holder=btn.querySelector('.subject-icon,.hibou-bottom-nav__icon,.hibou-real-icon-holder');
  if(!holder){
    holder=document.createElement('span');
    holder.className='subject-icon hibou-real-icon-holder';
    btn.insertBefore(holder,btn.firstChild);
    changed=true;
  }
  var img=holder.querySelector('img[data-hibou-real-icon="'+key+'"]');
  if(!img || img.getAttribute('src')!==src){
    holder.textContent='';
    holder.classList.add('hibou-real-icon-holder');
    img=document.createElement('img');
    img.src=src; img.alt=''; img.setAttribute('aria-hidden','true');
    img.setAttribute('draggable','false'); img.setAttribute('data-hibou-real-icon',key);
    holder.appendChild(img);
    changed=true;
  }
  if(!btn.classList.contains('hibou-real-icon-btn')){btn.classList.add('hibou-real-icon-btn');changed=true;}
  if(btn.getAttribute('data-hibou-icon-version')!=='25806'){btn.setAttribute('data-hibou-icon-version','25806');changed=true;}
  return changed;
}

function applyBottom(){
  if(mutating)return;
  var bar=document.querySelector('.subjects-bar');
  if(!bar)return;
  mutating=true;
  try{
    ensureUtilities(bar);
    var grow=bar.querySelector('[data-nav-action="grow"], .v2574-grow-btn, .v25806-grow-btn');
    var tools=bar.querySelector('[data-nav-action="tools"], .v2574-tools-btn, .v25806-tools-btn');
    setUtilityLabel(grow,'Grandir ensemble');
    setUtilityLabel(tools,'Outils');

    Object.keys(SUBJECT_ICONS).forEach(function(k){
      ensureIcon(bar.querySelector('.subject-btn[data-subject="'+k+'"]'),SUBJECT_ICONS[k],'subject-'+k);
    });
    ensureIcon(grow,UTILITY_ICONS.grow,'utility-grow');
    ensureIcon(tools,UTILITY_ICONS.tools,'utility-tools');

    bar.classList.add('hibou-eight-buttons-v25806');
    bar.setAttribute('data-hibou-buttons-count','8');
  }finally{mutating=false;}
}

function applyPopupIcons(){
  var tools=document.querySelector('#v23ShortcutsOverlay .v23-shortcuts-globe');
  if(tools && !tools.querySelector('img[data-hibou-popup-icon="tools"]')){
    tools.textContent=''; tools.classList.add('hibou-popup-real-icon');
    var ti=document.createElement('img'); ti.src=UTILITY_ICONS.tools; ti.alt='';
    ti.setAttribute('data-hibou-popup-icon','tools'); tools.appendChild(ti);
  }
  var title=document.querySelector('#mhGrowTogetherOverlay #mhGrowTitle');
  if(title && (title.textContent||'').indexOf('Grandir ensemble')!==-1 && !title.querySelector('img[data-hibou-popup-icon="grow"]')){
    Array.prototype.slice.call(title.childNodes).forEach(function(n){
      if(n.nodeType===3 && /🤝/.test(n.nodeValue||''))n.nodeValue=(n.nodeValue||'').replace(/^\s*🤝\s*/,'');
    });
    var gi=document.createElement('img'); gi.src=UTILITY_ICONS.grow; gi.alt='';
    gi.setAttribute('data-hibou-popup-icon','grow'); title.insertBefore(gi,title.firstChild);
    title.classList.add('hibou-grow-title-real-icon');
  }
}

function applyAll(){applyBottom();applyPopupIcons();setVersion();}
function scheduleApply(ms){
  if(scheduled)return;
  scheduled=true;
  setTimeout(function(){scheduled=false;applyAll();},ms||0);
}

var observer;
function boot(){
  applyAll();
  observer=new MutationObserver(function(muts){
    if(mutating)return;
    var relevant=muts.some(function(m){
      var el=m.target&&m.target.nodeType===1?m.target:m.target&&m.target.parentElement;
      return !!(el && ((el.matches&&el.matches('.subjects-bar,#v23ShortcutsOverlay,#mhGrowTogetherOverlay')) ||
        (el.closest&&el.closest('.subjects-bar,#v23ShortcutsOverlay,#mhGrowTogetherOverlay'))));
    });
    if(relevant)scheduleApply(20);
  });
  observer.observe(document.body,{childList:true,subtree:true});
  [150,500,1200,2200].forEach(function(ms){setTimeout(applyAll,ms);});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
window.addEventListener('load',function(){setTimeout(applyAll,80)},{once:true});
window.hibouEnsureEightBottomButtonsV25806=applyAll;
})();