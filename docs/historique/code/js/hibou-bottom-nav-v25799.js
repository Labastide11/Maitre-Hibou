/* Maître Hibou V25.7.99
   Bandeau inférieur : mêmes 8 accès, remplacement visuel des 6 matières.
   Ce module reste l'unique propriétaire du DOM du bandeau inférieur. */
(function(){
  'use strict';
  if(window.__hibouBottomNavV25799) return;
  window.__hibouBottomNavV25799 = true;

  var VERSION = '25.7.99';

  var ITEMS = [
    {key:'francais',   image:'assets/matieres/francais.png',   label:'Français',   type:'subject'},
    {key:'maths',      image:'assets/matieres/maths.png',      label:'Maths',      type:'subject'},
    {key:'anglais',    image:'assets/matieres/anglais.png',    label:'Anglais',    type:'subject'},
    {key:'sciences',   image:'assets/matieres/sciences.png',   label:'Sciences',   type:'subject'},
    {key:'geographie', image:'assets/matieres/geographie.png', label:'Géographie', type:'subject'},
    {key:'histoire',   image:'assets/matieres/histoire.png',   label:'Histoire',   type:'subject'},
    {key:'grow',       icon:'🤝', label:'Grandir ensemble', mini:'EMC, EMI, EVAR', type:'action'},
    {key:'tools',      icon:'🌍', label:'Outils', mini:'Liens utiles', type:'action'}
  ];

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function visual(item){
    if(item.image){
      return '<span class="hibou-bottom-nav__icon hibou-bottom-nav__icon--image" aria-hidden="true">'
        + '<img src="'+esc(item.image)+'" alt="" draggable="false">'
        + '</span>';
    }
    return '<span class="hibou-bottom-nav__icon" aria-hidden="true">'+esc(item.icon || '')+'</span>';
  }

  function markup(item){
    var attrs = item.type === 'subject'
      ? ' class="subject-btn hibou-bottom-nav__btn" data-subject="'+esc(item.key)+'"'
      : ' class="hibou-bottom-nav__btn" data-nav-action="'+esc(item.key)+'"';

    return '<button type="button"'+attrs+' aria-label="'+esc(item.label)+'">'
      + visual(item)
      + '<span class="hibou-bottom-nav__label">'+esc(item.label)
      + (item.mini ? '<span class="hibou-bottom-nav__mini">'+esc(item.mini)+'</span>' : '')
      + '</span></button>';
  }

  function openGrow(){
    var trigger = document.querySelector('#v24ShortcutsCard .mh-split-zone.grow, .mh-split-zone.grow');
    if(trigger && typeof trigger.click === 'function'){ trigger.click(); return; }
    if(typeof window.openGrandirEnsemble === 'function') window.openGrandirEnsemble();
  }

  function openTools(){
    if(typeof window.openClassShortcutsPopup === 'function'){
      window.openClassShortcutsPopup(); return;
    }
    var trigger = document.querySelector('#v24ShortcutsCard .mh-split-zone.shortcuts, .mh-split-zone.shortcuts');
    if(trigger && typeof trigger.click === 'function') trigger.click();
  }

  function bindActions(bar){
    var grow = bar.querySelector('[data-nav-action="grow"]');
    var tools = bar.querySelector('[data-nav-action="tools"]');
    if(grow) grow.addEventListener('click', function(ev){
      ev.preventDefault(); ev.stopPropagation(); openGrow();
    }, false);
    if(tools) tools.addEventListener('click', function(ev){
      ev.preventDefault(); ev.stopPropagation(); openTools();
    }, false);
  }

  function setVersion(){
    try{ document.title = '🦉 Maître Hibou V'+VERSION; }catch(e){}
    try{ window.MAITRE_HIBOU_VERSION = 'V'+VERSION; }catch(e){}
  }

  function build(){
    var bar = document.querySelector('.subjects-bar');
    if(!bar) return false;

    var expected = bar.querySelectorAll('img[src^="assets/matieres/"]').length;
    if(bar.dataset.owner === 'v25799' && expected === 6) return true;

    bar.dataset.owner = 'v25799';
    bar.classList.remove('hibou-bottom-nav-v25778');
    bar.classList.add('hibou-bottom-nav-v25799');
    bar.innerHTML = ITEMS.map(markup).join('');
    bindActions(bar);
    setVersion();
    return true;
  }

  function install(){
    if(build()) return;
    var attempts = 0;
    var retry = window.setInterval(function(){
      attempts += 1;
      if(build() || attempts >= 20) window.clearInterval(retry);
    }, 100);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', install, {once:true});
  } else {
    install();
  }

  /* Garantit que la version affichée reste V25.7.99 après les autres modules. */
  window.addEventListener('load', function(){ setVersion(); build(); }, {once:true});
})();
