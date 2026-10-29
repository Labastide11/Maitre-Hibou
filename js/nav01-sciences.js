/* Maître Hibou NAV-01 — Sciences : 6 séances et leçons, sans réinitialiser les exercices. */
(function () {
  'use strict';
  if (window.__hibouNav01Sciences) return;
  window.__hibouNav01Sciences = true;

  var ROOT = 'bibliotheque_sciences/lecons/';
  var lessons = {
    1: [{name:'Vivant ou non vivant ?',url:ROOT+'vivant-ou-non-vivant.html'}],
    2: [{name:'Le cycle de vie du haricot',url:ROOT+'maitre-hibou-cycle-vie-haricot-illustre.html'}],
    3: [{name:'Le cycle de vie des animaux',url:ROOT+'cycle-vie-animaux-ce2.html'}],
    4: [{name:'Déchets et biodiversité',url:ROOT+'dechets-biodiversite-ce2.html'}],
    5: [
      {name:'Le cycle naturel de l’eau',url:ROOT+'cycle-naturel-eau-ce2.html'},
      {name:'Les trois états de l’eau',url:ROOT+'etats-eau.html'},
      {name:'Les changements d’état',url:ROOT+'changements-etat-eau.html'}
    ],
    6: [{name:'Le circuit électrique simple',url:ROOT+'circuit-electrique-simple-ce2.html'}]
  };
  var overlay, frame, tabbar, backFocus;

  function closeLesson() {
    if (!overlay) return;
    overlay.hidden = true;
    frame.removeAttribute('src');
    document.body.classList.remove('mh-nav-sciences-open');
    if (backFocus && document.contains(backFocus)) backFocus.focus();
  }
  function openLesson(id) {
    var items=lessons[id]; if(!items) return;
    if(!overlay) createOverlay();
    backFocus=document.activeElement;
    tabbar.replaceChildren();
    items.forEach(function(item, idx){
      var b=document.createElement('button'); b.type='button'; b.className='mh-nav-sciences-tab';
      b.textContent=item.name;
      b.addEventListener('click',function(){
        Array.prototype.forEach.call(tabbar.children,function(el){el.classList.remove('active')});
        b.classList.add('active'); frame.src=new URL(item.url,document.baseURI).href;
      });
      tabbar.appendChild(b);
      if(idx===0) b.click();
    });
    overlay.hidden=false;
    document.body.classList.add('mh-nav-sciences-open');
    overlay.querySelector('.mh-nav-sciences-return').focus();
  }
  function createOverlay(){
    overlay=document.createElement('section');overlay.id='mh-nav01-sciences-overlay';overlay.hidden=true;
    overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');
    overlay.setAttribute('aria-label','Leçon de sciences');
    overlay.innerHTML='<header class="mh-nav-sciences-header"><strong>📖 Ma leçon de sciences</strong><button type="button" class="mh-nav-sciences-return">← Retour à mon exercice</button></header><nav class="mh-nav-sciences-tabs" aria-label="Choisir une leçon"></nav><iframe title="Leçon de sciences" loading="eager"></iframe>';
    overlay.querySelector('.mh-nav-sciences-return').addEventListener('click',closeLesson);
    tabbar=overlay.querySelector('.mh-nav-sciences-tabs');frame=overlay.querySelector('iframe');
    frame.addEventListener('load',function(){
      try{
        var doc=frame.contentDocument;
        if(!doc || !doc.body)return;
        doc.querySelectorAll('a[href]').forEach(function(a){
          if(/\/index\.html|catalogue\.html/.test(a.getAttribute('href')||'')){
            a.href='#';a.textContent='← Retour à mon exercice';
            a.addEventListener('click',function(e){e.preventDefault();closeLesson()});
          }
        });
        if(!doc.getElementById('mh-sciences-return-in-lesson')){
          var b=doc.createElement('button');b.id='mh-sciences-return-in-lesson';b.type='button';
          b.textContent='← Retour à mon exercice';
          b.style.cssText='display:block;margin:14px auto;padding:12px 18px;background:#145d99;color:white;border:0;border-radius:12px;font:bold 16px system-ui;cursor:pointer';
          b.addEventListener('click',closeLesson);
          doc.body.appendChild(b);
        }
      }catch(e){console.warn('NAV-01 Sciences : navigation intégrée non disponible',e)}
    });
    overlay.addEventListener('keydown',function(e){if(e.key==='Escape'){e.preventDefault();closeLesson();}});
    document.body.appendChild(overlay);
  }
  function detectSession(text){
    text=String(text||'').toLocaleLowerCase('fr');
    if(text.includes("vivant") && (text.includes("non-vivant") || text.includes("ne l'est pas")))return 1;
    if(text.includes('vie d\'une plante'))return 2;
    if(text.includes('vie d\'un animal'))return 3;
    if(text.includes('biodiversité')||text.includes('trier les déchets'))return 4;
    if(text.includes('cycle de l\'eau')||text.includes('états de l\'eau'))return 5;
    if(text.includes('circuit simple')||text.includes('circuler le courant'))return 6;
    return 0;
  }
  function addSessionButtons(){
    var grid=document.getElementById('v24BigSubjectGrid');
    if(!grid)return;
    var toolbar=grid.querySelector('.v24-english-toolbar');
    var objective=toolbar&&toolbar.querySelector('.v24-english-objective');
    if(!objective || toolbar.querySelector('.mh-nav-sciences-open-btn'))return;
    var id=detectSession(objective.textContent);if(!id)return;
    var b=document.createElement('button');b.type='button';b.className='mh-nav-sciences-open-btn';
    b.textContent=(id===5?'📖 Voir mes leçons':'📖 Voir la leçon');
    b.addEventListener('click',function(){openLesson(id)});
    toolbar.appendChild(b);
  }
  function addCatalogCards(doc){
    try{
      if(!/\/bibliotheque_sciences\/index\.html$/.test(doc.location.pathname))return;
      var container=doc.querySelector('section.cards');if(!container)return;
      [
        ['3','cycle-vie-animaux-ce2.html','Le cycle de vie des animaux','vivant'],
        ['4','dechets-biodiversite-ce2.html','Déchets et biodiversité','vivant'],
        ['5','cycle-naturel-eau-ce2.html','Le cycle naturel de l’eau','matiere'],
        ['6','circuit-electrique-simple-ce2.html','Le circuit électrique simple','objets']
      ].forEach(function(item){
        if(doc.getElementById('mh-sci-lesson-'+item[0]))return;
        var card=doc.createElement('a');card.className='card';card.id='mh-sci-lesson-'+item[0];
        card.dataset.category=item[3];card.href='lecons/'+item[1];
        card.innerHTML='<div class="thumbnail"><img loading="lazy" alt="Illustration de la leçon '+item[0]+'" src="illustrations/sciences-lecon-'+item[0]+'.jpg"></div><h2>'+item[2]+'</h2><span class="tag">Sciences · Séance '+item[0]+'</span>';
        container.appendChild(card);
      });
      // Le catalogue possède son propre tableau de cartes initial. Réappliquer les filtres sur toutes les cartes.
      var oldFilters=doc.querySelectorAll('.filter');
      oldFilters.forEach(function(b){
        if(b.dataset.mhScienceRefresh)return;b.dataset.mhScienceRefresh='1';
        b.addEventListener('click',function(){refreshCatalog(doc)});
      });
      var input=doc.getElementById('search');
      if(input && !input.dataset.mhScienceRefresh){input.dataset.mhScienceRefresh='1';input.addEventListener('input',function(){refreshCatalog(doc)});}
      refreshCatalog(doc);
    }catch(e){console.warn('NAV-01 Sciences : catalogue',e)}
  }
  function refreshCatalog(doc){
    var selected=doc.querySelector('.filter.active');var category=selected?selected.dataset.category:'all';
    var input=doc.getElementById('search');var query=(input&&input.value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    ['3','4','5','6'].forEach(function(id){
      var card=doc.getElementById('mh-sci-lesson-'+id);if(!card)return;
      var words=card.textContent.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
      card.hidden=!( (category==='all'||category===card.dataset.category) && (!query||words.includes(query)) );
    });
    var any=Array.from(doc.querySelectorAll('.cards .card')).some(function(c){return !c.hidden});
    var empty=doc.getElementById('empty');if(empty)empty.hidden=any;
  }
  function scan(){
    addSessionButtons();
    var f=document.getElementById('hibouLessonsFrame');
    if(f && !f.__mhScienceNavLoad){
      f.__mhScienceNavLoad=true;
      f.addEventListener('load',function(){try{addCatalogCards(f.contentDocument)}catch(e){}});
    }
    if(f){try{addCatalogCards(f.contentDocument)}catch(e){}}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
  else install();
  function install(){
    scan();
    var scheduled=false;
    new MutationObserver(function(){
      if(scheduled)return;scheduled=true;
      setTimeout(function(){scheduled=false;scan()},60);
    }).observe(document.body,{childList:true,subtree:true});
  }
})();
