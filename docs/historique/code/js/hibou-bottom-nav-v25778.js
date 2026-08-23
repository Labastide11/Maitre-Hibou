/* Maître Hibou V25.7.78
   Refondation ciblée du bandeau inférieur.
   Règle : ce module est l'unique propriétaire du DOM des 8 boutons. */
(function(){
  'use strict';
  if(window.__hibouBottomNavV25778) return;
  window.__hibouBottomNavV25778 = true;

  var VERSION = '25.7.78';

  var ITEMS = [
    {key:'francais',   icon:'📖', label:'Français',   type:'subject'},
    {key:'maths',      icon:'🧮', label:'Maths',      type:'subject'},
    {key:'anglais',    icon:'🇬🇧', label:'Anglais',    type:'subject'},
    {key:'sciences',   icon:'🧪', label:'Sciences',   type:'subject'},
    {key:'geographie', icon:'🌍', label:'Géographie', type:'subject'},
    {key:'histoire',   icon:'🏛️', label:'Histoire',   type:'subject'},
    {key:'grow',       icon:'🤝', label:'Grandir ensemble', mini:'EMC, EMI, EVAR', type:'action'},
    {key:'tools',      icon:'🌍', label:'Outils', mini:'Liens utiles', type:'action'}
  ];

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function markup(item){
    var attrs = item.type === 'subject'
      ? ' class="subject-btn hibou-bottom-nav__btn" data-subject="'+esc(item.key)+'"'
      : ' class="hibou-bottom-nav__btn" data-nav-action="'+esc(item.key)+'"';

    return '<button type="button"'+attrs+' aria-label="'+esc(item.label)+'">'
      + '<span class="hibou-bottom-nav__icon" aria-hidden="true">'+esc(item.icon)+'</span>'
      + '<span class="hibou-bottom-nav__label">'+esc(item.label)
      + (item.mini ? '<span class="hibou-bottom-nav__mini">'+esc(item.mini)+'</span>' : '')
      + '</span></button>';
  }

  function openGrow(){
    var trigger = document.querySelector('#v24ShortcutsCard .mh-split-zone.grow, .mh-split-zone.grow');
    if(trigger && typeof trigger.click === 'function'){
      trigger.click();
      return;
    }
    if(typeof window.openGrandirEnsemble === 'function'){
      window.openGrandirEnsemble();
    }
  }

  function openTools(){
    if(typeof window.openClassShortcutsPopup === 'function'){
      window.openClassShortcutsPopup();
      return;
    }
    var trigger = document.querySelector('#v24ShortcutsCard .mh-split-zone.shortcuts, .mh-split-zone.shortcuts');
    if(trigger && typeof trigger.click === 'function') trigger.click();
  }

  function bindActions(bar){
    var grow = bar.querySelector('[data-nav-action="grow"]');
    var tools = bar.querySelector('[data-nav-action="tools"]');

    if(grow) grow.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      openGrow();
    }, false);

    if(tools) tools.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      openTools();
    }, false);
  }

  function build(){
    var bar = document.querySelector('.subjects-bar');
    if(!bar) return false;
    if(bar.dataset.owner === 'v25778') return true;

    bar.dataset.owner = 'v25778';
    bar.classList.add('hibou-bottom-nav-v25778');
    bar.innerHTML = ITEMS.map(markup).join('');
    bindActions(bar);

    try{ document.title = '🦉 Maître Hibou V'+VERSION; }catch(e){}
    return true;
  }

  function install(){
    if(build()) return;
    /* Le bandeau lui-même est créé par l'accueil V21 : on attend seulement sa création.
       Pas de timer récurrent, pas de MutationObserver. */
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
})();
