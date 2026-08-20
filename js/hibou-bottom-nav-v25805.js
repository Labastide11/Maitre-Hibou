/* Maître Hibou V25.8.05
   Bandeau inférieur garanti à 8 boutons.
   - Les 6 matières existantes sont conservées.
   - Grandir ensemble et Outils sont recréés s'ils manquent.
   - Les 8 icônes réelles sont appliquées.
   - Aucun rebuild global du bandeau. */
(function(){
  'use strict';
  if(window.__hibouBottomNavV25805) return;
  window.__hibouBottomNavV25805 = true;

  var VERSION='25.8.05';

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

  function createUtilityButton(kind){
    var btn=document.createElement('button');
    btn.type='button';
    btn.className='subject-btn hibou-bottom-utility-btn v25805-'+kind+'-btn';
    btn.setAttribute('data-nav-action',kind);

    var holder=document.createElement('span');
    holder.className='subject-icon hibou-real-icon-holder';

    var img=document.createElement('img');
    img.src=UTILITY_ICONS[kind];
    img.alt='';
    img.setAttribute('aria-hidden','true');
    img.setAttribute('draggable','false');
    img.setAttribute('data-hibou-real-icon','utility-'+kind);
    holder.appendChild(img);

    var label=document.createElement('span');
    label.className='subject-label hibou-bottom-utility-label';

    var title=document.createElement('strong');
    title.textContent=(kind==='grow')?'Grandir ensemble':'Outils';

    var small=document.createElement('small');
    small.textContent=(kind==='grow')?'EMC, EMI, EVAR':'Liens utiles';

    label.appendChild(title);
    label.appendChild(small);
    btn.appendChild(holder);
    btn.appendChild(label);

    if(kind==='grow'){
      btn.addEventListener('click',function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        var trigger=document.querySelector('#v24ShortcutsCard .mh-split-zone.grow, .mh-split-zone.grow');
        if(trigger && trigger.click){ trigger.click(); return; }
        if(typeof window.openGrandirEnsemble==='function'){ window.openGrandirEnsemble(); return; }
        if(typeof window.openGrowTogether==='function'){ window.openGrowTogether(); return; }
      });
    }else{
      btn.addEventListener('click',function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        if(typeof window.openClassShortcutsPopup==='function'){ window.openClassShortcutsPopup(); return; }
        var trigger=document.querySelector('#v24ShortcutsCard .mh-split-zone.shortcuts, .mh-split-zone.shortcuts');
        if(trigger && trigger.click) trigger.click();
      });
    }
    return btn;
  }

  function ensureUtilities(bar){
    if(!bar) return;

    var grow=bar.querySelector('[data-nav-action="grow"], .v2574-grow-btn, .v25805-grow-btn');
    var tools=bar.querySelector('[data-nav-action="tools"], .v2574-tools-btn, .v25805-tools-btn');

    if(!grow){
      grow=createUtilityButton('grow');
      bar.appendChild(grow);
    }
    if(!tools){
      tools=createUtilityButton('tools');
      bar.appendChild(tools);
    }

    // Verrouiller l'ordre : les deux utilitaires doivent être après Histoire.
    if(grow.parentNode===bar && tools.parentNode===bar){
      bar.appendChild(grow);
      bar.appendChild(tools);
    }
  }

  function ensureRealIcon(btn,src,key){
    if(!btn || !src) return false;

    var holder=btn.querySelector('.subject-icon, .hibou-bottom-nav__icon, .hibou-real-icon-holder');
    if(!holder){
      holder=document.createElement('span');
      holder.className='subject-icon hibou-real-icon-holder';
      btn.insertBefore(holder,btn.firstChild);
    }

    var existing=holder.querySelector('img[data-hibou-real-icon="'+key+'"]');
    if(existing && existing.getAttribute('src')===src){
      btn.classList.add('hibou-real-icon-btn');
      return true;
    }

    holder.textContent='';
    holder.classList.add('hibou-real-icon-holder');

    var img=document.createElement('img');
    img.src=src;
    img.alt='';
    img.setAttribute('aria-hidden','true');
    img.setAttribute('draggable','false');
    img.setAttribute('data-hibou-real-icon',key);
    holder.appendChild(img);

    btn.classList.add('hibou-real-icon-btn');
    btn.setAttribute('data-hibou-icon-version','25805');
    return true;
  }

  function applyBottomBar(){
    var bar=document.querySelector('.subjects-bar');
    if(!bar) return false;

    ensureUtilities(bar);

    var count=0;
    Object.keys(SUBJECT_ICONS).forEach(function(key){
      var btn=bar.querySelector('.subject-btn[data-subject="'+key+'"]');
      if(ensureRealIcon(btn,SUBJECT_ICONS[key],'subject-'+key)) count++;
    });

    var grow=bar.querySelector('[data-nav-action="grow"], .v2574-grow-btn, .v25805-grow-btn');
    var tools=bar.querySelector('[data-nav-action="tools"], .v2574-tools-btn, .v25805-tools-btn');
    if(ensureRealIcon(grow,UTILITY_ICONS.grow,'utility-grow')) count++;
    if(ensureRealIcon(tools,UTILITY_ICONS.tools,'utility-tools')) count++;

    bar.classList.add('hibou-eight-buttons-v25805');
    bar.setAttribute('data-hibou-buttons-count',String(count));
    return count===8;
  }

  function applyToolsPopup(){
    var holder=document.querySelector('#v23ShortcutsOverlay .v23-shortcuts-globe');
    if(!holder) return false;

    var existing=holder.querySelector('img[data-hibou-popup-icon="tools"]');
    if(existing) return true;

    holder.textContent='';
    holder.classList.add('hibou-popup-real-icon');

    var img=document.createElement('img');
    img.src=UTILITY_ICONS.tools;
    img.alt='';
    img.setAttribute('aria-hidden','true');
    img.setAttribute('data-hibou-popup-icon','tools');
    holder.appendChild(img);
    return true;
  }

  function applyGrowPopup(){
    var title=document.querySelector('#mhGrowTogetherOverlay #mhGrowTitle');
    if(!title) return false;
    if((title.textContent||'').indexOf('Grandir ensemble')===-1) return false;

    if(title.querySelector('img[data-hibou-popup-icon="grow"]')) return true;

    Array.prototype.slice.call(title.childNodes).forEach(function(node){
      if(node.nodeType===3 && /🤝/.test(node.nodeValue||'')){
        node.nodeValue=(node.nodeValue||'').replace(/^\s*🤝\s*/,'');
      }
    });

    var img=document.createElement('img');
    img.src=UTILITY_ICONS.grow;
    img.alt='';
    img.setAttribute('aria-hidden','true');
    img.setAttribute('data-hibou-popup-icon','grow');
    title.insertBefore(img,title.firstChild);
    title.classList.add('hibou-grow-title-real-icon');
    return true;
  }

  function applyAll(){
    applyBottomBar();
    applyGrowPopup();
    applyToolsPopup();
    setVersion();
  }

  function schedule(){
    [0,40,120,300,650,1200,2200,4000].forEach(function(ms){
      window.setTimeout(applyAll,ms);
    });
  }

  var observer=new MutationObserver(function(){
    window.requestAnimationFrame(applyAll);
  });

  function boot(){
    schedule();
    try{
      observer.observe(document.documentElement,{childList:true,subtree:true});
    }catch(e){}
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',boot,{once:true});
  }else{
    boot();
  }

  window.addEventListener('load',schedule,{once:true});
  window.hibouEnsureEightBottomButtonsV25805=applyAll;
})();
