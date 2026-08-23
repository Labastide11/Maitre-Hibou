/* Maître Hibou V25.8.67 — bandeau élève : « Mon parcours et mes progrès » */
(function(){
  'use strict';
  if(window.__hibouTopParcoursV25867) return;
  window.__hibouTopParcoursV25867 = true;

  var VERSION = 'V25.8.67';
  var CARD_ID = 'bandeauLastCard';

  function clean(v){
    return String(v == null ? '' : v).replace(/\s+/g,' ').trim();
  }

  function esc(v){
    return String(v == null ? '' : v)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  function currentStudent(){
    var student = {};
    try{
      student = JSON.parse(localStorage.getItem('hibou_current_student') || '{}') || {};
    }catch(e){ student = {}; }

    var name = '';
    try{ name = clean(window.prenomActuel); }catch(e){}
    if(!name) name = clean(student.prenom || student.name);
    if(!name){
      try{
        name = clean(
          localStorage.getItem('hibou_last_prenom') ||
          localStorage.getItem('hibou_prenom') ||
          localStorage.getItem('maitreHibouCurrentStudent') ||
          localStorage.getItem('elevePrenom') || ''
        );
      }catch(e){}
    }
    if(!name || /^(élève|eleve)$/i.test(name)) name = 'Élève';

    var mode = clean(student.mode);
    try{ if(!mode) mode = clean(localStorage.getItem('hibou_mode')); }catch(e){}
    var sexe = clean(student.sexe || student.Sexe || student.genre || student.Genre);

    return {name:name, sexe:sexe, mode:mode};
  }

  function portraitFor(student){
    if(student.mode === 'invite') return 'images/portrait_neutre.png';
    var s = clean(student.sexe).toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    if(s === 'f' || s === 'fille' || s.indexOf('fem') === 0) return 'images/portrait_fille.png';
    if(s === 'm' || s === 'garcon' || s.indexOf('masc') === 0) return 'images/portrait_garcon.png';
    return 'images/portrait_neutre.png';
  }

  function expectedHtml(student){
    return '' +
      '<img class="hibou-top-parcours-avatar-v25867" src="' + portraitFor(student) + '" alt="" aria-hidden="true">' +
      '<span class="hibou-top-parcours-copy-v25867">' +
        '<span class="hibou-top-parcours-title-v25867">' + esc(student.name) + ' — Mon parcours et mes progrès</span>' +
        '<span class="hibou-top-parcours-help-v25867">Clique pour ouvrir ton parcours</span>' +
      '</span>';
  }

  function render(){
    var card = document.getElementById(CARD_ID);
    if(!card) return false;

    var student = currentStudent();
    var html = expectedHtml(student);

    card.classList.add('hibou-top-parcours-v25867');
    card.setAttribute('role','button');
    card.setAttribute('tabindex','0');
    card.setAttribute('title','Ouvrir mon parcours et mes progrès');
    card.setAttribute('aria-label',student.name + ' — Mon parcours et mes progrès. Clique pour ouvrir ton parcours.');

    if(card.innerHTML !== html) card.innerHTML = html;
    try{ document.title = '🦉 Maître Hibou ' + VERSION; }catch(e){}
    return true;
  }

  var queued = false;
  function schedule(){
    if(queued) return;
    queued = true;
    requestAnimationFrame(function(){
      queued = false;
      render();
    });
  }

  function observe(){
    var card = document.getElementById(CARD_ID);
    if(!card) return;
    if(card.__hibouTopParcoursObserverV25867) return;
    card.__hibouTopParcoursObserverV25867 = true;
    new MutationObserver(function(){ schedule(); })
      .observe(card,{childList:true,subtree:true,characterData:true});
  }

  function install(){
    if(render()) observe();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded',install,{once:true});
  }else{
    install();
  }

  window.addEventListener('load',install,{once:true});
  document.addEventListener('hibou:student-snapshot',schedule);
  document.addEventListener('hibou:student-event',schedule);
  document.addEventListener('hibou:student-changed',schedule);
  document.addEventListener('hibou:belts-updated',schedule);

  [80,180,350,700,1200,2200,4000].forEach(function(ms){
    setTimeout(function(){ install(); },ms);
  });

  /* Les anciens modules peuvent reconstruire la carte après une synchro.
     Ce contrôle léger garantit le visuel demandé sans toucher à leur logique. */
  setInterval(function(){ install(); },1500);
})();
