/* Maître Hibou V25.8.03
   Bandeau inférieur : 8 vraies icônes + cohérence dans les popups.
   Ce module ne reconstruit aucun bouton : il remplace seulement les visuels. */
(function(){
  'use strict';
  if(window.__hibouBottomNavV25803EightIcons) return;
  window.__hibouBottomNavV25803EightIcons = true;

  var VERSION='25.8.03';

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

  function ensureImage(holder,src,kind){
    if(!holder || !src) return false;

    holder.textContent='';
    holder.classList.add('hibou-real-icon-holder');

    var img=document.createElement('img');
    img.src=src;
    img.alt='';
    img.setAttribute('aria-hidden','true');
    img.setAttribute('draggable','false');
    img.setAttribute('data-hibou-real-icon',kind||'1');
    holder.appendChild(img);
    return true;
  }

  function replaceSubject(btn,key){
    if(!btn || !SUBJECT_ICONS[key]) return false;
    var holder=btn.querySelector('.subject-icon, .hibou-bottom-nav__icon');
    if(!holder){
      holder=document.createElement('span');
      holder.className='subject-icon';
      btn.insertBefore(holder,btn.firstChild);
    }

    var existing=holder.querySelector('img[data-hibou-real-icon="subject-'+key+'"]');
    if(existing && existing.getAttribute('src')===SUBJECT_ICONS[key]) return true;

    ensureImage(holder,SUBJECT_ICONS[key],'subject-'+key);
    btn.classList.add('hibou-real-icon-btn');
    btn.setAttribute('data-hibou-icon-version','25803');
    return true;
  }

  function replaceUtility(btn,kind){
    if(!btn || !UTILITY_ICONS[kind]) return false;
    var holder=btn.querySelector('.subject-icon, .hibou-bottom-nav__icon');
    if(!holder){
      holder=document.createElement('span');
      holder.className='subject-icon';
      btn.insertBefore(holder,btn.firstChild);
    }

    var existing=holder.querySelector('img[data-hibou-real-icon="utility-'+kind+'"]');
    if(existing && existing.getAttribute('src')===UTILITY_ICONS[kind]) return true;

    ensureImage(holder,UTILITY_ICONS[kind],'utility-'+kind);
    btn.classList.add('hibou-real-icon-btn','hibou-real-icon-'+kind);
    btn.setAttribute('data-hibou-icon-version','25803');
    return true;
  }

  function applyBottomBar(){
    var bar=document.querySelector('.subjects-bar');
    if(!bar) return 0;

    var count=0;

    Object.keys(SUBJECT_ICONS).forEach(function(key){
      var btn=bar.querySelector('.subject-btn[data-subject="'+key+'"]');
      if(replaceSubject(btn,key)) count++;
    });

    var grow=bar.querySelector('.v2574-grow-btn,[data-nav-action="grow"]');
    var tools=bar.querySelector('.v2574-tools-btn,[data-nav-action="tools"]');

    if(replaceUtility(grow,'grow')) count++;
    if(replaceUtility(tools,'tools')) count++;

    if(count===8) bar.setAttribute('data-hibou-icons','25803-eight');
    return count;
  }

  function applyToolsPopup(){
    var holder=document.querySelector('#v23ShortcutsOverlay .v23-shortcuts-globe');
    if(!holder) return false;

    var existing=holder.querySelector('img[data-hibou-popup-icon="tools"]');
    if(existing && existing.getAttribute('src')===UTILITY_ICONS.tools) return true;

    holder.textContent='';
    holder.classList.add('hibou-popup-real-icon');
    var img=document.createElement('img');
    img.src=UTILITY_ICONS.tools;
    img.alt='';
    img.setAttribute('aria-hidden','true');
    img.setAttribute('draggable','false');
    img.setAttribute('data-hibou-popup-icon','tools');
    holder.appendChild(img);
    return true;
  }

  function applyGrowPopup(){
    var title=document.querySelector('#mhGrowTogetherOverlay #mhGrowTitle');
    if(!title) return false;

    var text=(title.textContent||'').trim();
    if(text.indexOf('Grandir ensemble')===-1) return false;

    var existing=title.querySelector('img[data-hibou-popup-icon="grow"]');
    if(existing) return true;

    // Retire seulement l'ancien emoji de titre, sans toucher au libellé.
    var nodes=Array.prototype.slice.call(title.childNodes);
    nodes.forEach(function(node){
      if(node.nodeType===3 && /🤝/.test(node.nodeValue||'')){
        node.nodeValue=(node.nodeValue||'').replace(/^\s*🤝\s*/,'');
      }
    });

    var img=document.createElement('img');
    img.src=UTILITY_ICONS.grow;
    img.alt='';
    img.setAttribute('aria-hidden','true');
    img.setAttribute('draggable','false');
    img.setAttribute('data-hibou-popup-icon','grow');
    title.insertBefore(img,title.firstChild);
    title.classList.add('hibou-grow-title-real-icon');
    return true;
  }

  function apply(){
    applyBottomBar();
    applyToolsPopup();
    applyGrowPopup();
    setVersion();
  }

  function scheduleApply(){
    [0,40,100,220,450,900,1600,3000].forEach(function(delay){
      window.setTimeout(apply,delay);
    });
  }

  var observer=null;
  function observe(){
    if(observer) return;

    observer=new MutationObserver(function(){
      window.requestAnimationFrame(apply);
    });

    observer.observe(document.documentElement,{
      childList:true,
      subtree:true
    });
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){
      scheduleApply();
      observe();
    },{once:true});
  }else{
    scheduleApply();
    observe();
  }

  window.addEventListener('load',scheduleApply,{once:true});

  window.hibouRefreshBottomIconsV25803=apply;
})();
