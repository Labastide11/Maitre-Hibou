(function(){
  'use strict';
  if(window.__hibouMesLeconsV25891) return;
  window.__hibouMesLeconsV25891 = true;

  var VERSION = window.MAITRE_HIBOU_TITLE || '🦉 Maître Hibou V25.7.72';

  function byId(id){ return document.getElementById(id); }
  function textOf(node){ return node ? String(node.textContent || '').replace(/\s+/g,' ').trim() : ''; }
  function esc(v){ return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

  function setVersion(){
    try{ document.title = VERSION; }catch(e){}
  }

  function createPopup(){
    if(byId('hibouLessonsOverlay')) return;
    var overlay = document.createElement('div');
    overlay.id = 'hibouLessonsOverlay';
    overlay.className = 'hibou-lessons-overlay';
    overlay.setAttribute('aria-hidden','true');
    overlay.innerHTML =
      '<section class="hibou-lessons-dialog" role="dialog" aria-modal="true" aria-labelledby="hibouLessonsTitle">' +
        '<header class="hibou-lessons-header">' +
          '<div class="owl" aria-hidden="true"><img src="bibliotheque_lecons/images/logo_lecons_officiel.png?v=25772-logo-officiel" alt=""></div>' +
          '<div class="hibou-lessons-title"><h2 id="hibouLessonsTitle">Mes leçons de français</h2><p id="hibouLessonsSubTitle">38 fiches de français harmonisées avec le programme 2025.</p></div>' +
          '<button type="button" class="hibou-lessons-close" id="hibouLessonsClose" aria-label="Fermer">×</button>' +
        '</header>' +
        '<nav class="hibou-lessons-tabs" aria-label="Choisir un contenu">' +
          '<button type="button" class="hibou-lessons-tab active" id="hibouLessonsFrench">📘 Français</button>' +
          '<button type="button" class="hibou-lessons-tab" id="hibouLessonsMaths">📐 Mathématiques</button>' +
          '<button type="button" class="hibou-lessons-tab" id="hibouLessonsSciences">💧 Sciences</button>' +
          '<button type="button" class="hibou-lessons-tab" id="hibouLessonsGeographie">🏙️ Géographie</button><button type="button" class="hibou-lessons-tab" id="hibouLessonsHistoire">🏡 Histoire</button><button type="button" class="hibou-lessons-tab" id="hibouLessonsRecit">📖 Récit</button><button type="button" class="hibou-lessons-tab" id="hibouLessonsLexique">🔤 Lexique</button>' +
          '<button type="button" class="hibou-lessons-tab" id="hibouLessonsMiniTab">💡 Mini-leçon</button>' +
        '</nav>' +
        '<div class="hibou-lessons-content">' +
          '<iframe class="hibou-lessons-frame" id="hibouLessonsFrame" title="Bibliothèque des leçons de français" src="bibliotheque_lecons/index.html"></iframe>' + '<div class="hibou-subject-catalog" id="hibouSubjectCatalog" hidden></div>' +
          '<section class="hibou-mini-panel" id="hibouLessonsMiniPanel" hidden></section>' +
        '</div>' +
      '</section>';
    document.body.appendChild(overlay);

    var close = byId('hibouLessonsClose');
    var frame = byId('hibouLessonsFrame');
    if(frame) frame.addEventListener('load', function(){ injectLibraryCards(); });
    var french = byId('hibouLessonsFrench');
    var maths = byId('hibouLessonsMaths');
    var mini = byId('hibouLessonsMiniTab');
    var sciences = byId('hibouLessonsSciences');
    var geographie = byId('hibouLessonsGeographie');
    var histoire = byId('hibouLessonsHistoire');
    var recit = byId('hibouLessonsRecit');
    var lexique = byId('hibouLessonsLexique');
    if(close) close.addEventListener('click', closeLessons);
    var back=byId('hibouLessonsBack');if(back)back.addEventListener('click',restoreCatalog);
    if(french) french.addEventListener('click', function(){ selectSubject('francais'); });
    if(maths) maths.addEventListener('click', function(){ selectSubject('maths'); });
    if(mini) mini.addEventListener('click', function(){ selectSubject('mini'); });
    if(sciences) sciences.addEventListener('click', function(){ selectSubject('sciences'); });
    if(geographie) geographie.addEventListener('click', function(){ selectSubject('geographie'); });
    if(histoire) histoire.addEventListener('click', function(){ selectSubject('histoire'); });
    if(recit) recit.addEventListener('click', function(){ selectSubject('recit'); });
    if(lexique) lexique.addEventListener('click', function(){ selectSubject('lexique'); });
    overlay.addEventListener('click', function(ev){ if(ev.target === overlay) closeLessons(); });
  }


  /* Transformation exclusivement dans la fenêtre intégrée : les pages originales sont intactes. */
  var subjects = {
    francais:['Mes leçons de français','38 fiches de français harmonisées avec le programme 2025.'],
    maths:['Mes leçons de mathématiques','48 fiches de mathématiques avec le programme 2025.'],
    sciences:['Mes leçons de sciences','Choisis une leçon, puis ouvre-la pour la revoir.'],
    geographie:['Mes leçons de géographie','Choisis une leçon, puis ouvre-la pour la revoir.'],
    histoire:['Mes leçons d’histoire','Choisis une leçon, puis ouvre-la pour la revoir.'],
    recit:['Mes leçons de récit','Choisis une leçon, puis ouvre-la pour la revoir.'],
    lexique:['Mes leçons de lexique','Choisis une leçon, puis ouvre-la pour la revoir.'],
    mini:['Mini-leçon du jour','Une nouvelle découverte avec Maître Hibou.']
  };
  var singlePages = {
    sciences:{title:'L’eau : ses états et ses changements',emoji:'💧',hint:'Glace · Eau liquide · Vapeur',tone:'#d9f1ff'},
    geographie:{title:'La ville et ses quartiers',emoji:'🗺️',hint:'Observer et comprendre la ville',tone:'#e5f6df'},
    histoire:{title:'Habiter autrefois et aujourd’hui',emoji:'🏠',hint:'Comparer les habitations',tone:'#fff0db'},
    recit:{title:'Raconter une histoire dans l’ordre',emoji:'📖',hint:'Début · Événements · Fin',tone:'#eee5ff'},
    lexique:{title:'Familles de mots, synonymes et contraires',emoji:'🔤',hint:'Des mots qui vont ensemble',tone:'#dcfaf0'}
  };
  function setLessonHeader(subject){
    var values=subjects[subject]||subjects.francais;
    var h=byId('hibouLessonsTitle'),p=byId('hibouLessonsSubTitle');
    if(h)h.textContent=values[0];
    if(p)p.textContent=values[1];
  }
  function artFor(title,domain){
    var s=(title+' '+domain).toLowerCase();
    if(/fraction/.test(s))return ['🍕','1/2  ·  1/4','#ffe6b6'];
    if(/géom|solide|cube|pavé|triangle|carré|rectangle|périmètre/.test(s))return ['📐','◻  △  ▭','#d5f4fb'];
    if(/nombre|dizain|centain|millier/.test(s))return ['🔢','100  ·  10  ·  1','#fce3ee'];
    if(/addition|soustraction|multiplication|calcul|table/.test(s))return ['🧮','3 + 4 = 7','#e9e1fb'];
    if(/problème/.test(s))return ['🧩','Je cherche !','#f6dfb6'];
    if(/durée|heure|temps/.test(s))return ['🕒','12 h 30','#e1f1ff'];
    if(/phrase|ponctuation|sujet/.test(s))return ['💬','Le chat joue.','#d9f2ff'];
    if(/verbe|conjug|présent|imparfait|futur|passé/.test(s))return ['✍️','je · tu · il','#ffe9d7'];
    if(/nom|déterminant|groupe nominal|adjectif|genre|pluriel|singulier/.test(s))return ['🐈','un chat · des chats','#eff0cf'];
    if(/pronom/.test(s))return ['👧🏽','je · tu · nous','#eee4fb'];
    if(/orthographe|accord|écriture/.test(s))return ['✏️','J’écris bien !','#fbe1ed'];
    if(/dictionnaire|mots|vocabulaire|synonym|contraire|sens/.test(s))return ['📚','A  B  C','#e0f9ed'];
    if(/tableau|données/.test(s))return ['📊','3  ·  5  ·  7','#e1f4ff'];
    return ['🦉','Je découvre !','#e6f1ff'];
  }
  function makeThumb(doc,title,domain){
    var a=artFor(title,domain), d=doc.createElement('div');
    d.className='hibou-lesson-thumb';d.style.setProperty('--thumb-bg',a[2]);
    var symbol=doc.createElement('span');symbol.className='hibou-thumb-symbol';symbol.textContent=a[0];
    var sample=doc.createElement('span');sample.className='hibou-thumb-sample';sample.textContent=a[1];
    d.appendChild(symbol);d.appendChild(sample);return d;
  }
  function injectLibraryCards(){
    var frame=byId('hibouLessonsFrame');if(!frame)return;
    try{
      var doc=frame.contentDocument;
      if(!doc||!doc.body)return;
      var cards=Array.from(doc.querySelectorAll('.lesson-grid .lesson-card,.grid .card'));
      if(!cards.length)return;
      if(!doc.getElementById('hibouCardTheme')){
        var style=doc.createElement('style');style.id='hibouCardTheme';
        style.textContent=`
          body{background:#edf4fc!important;}
          .library-shell,.library{max-width:none!important;padding:12px 14px 24px!important;}
          .library-header,.library>.hero{display:none!important;}
          .searchbar,.search{margin:3px 0 16px!important;gap:8px!important;align-items:center!important;}
          .searchbar input,.search input{min-width:180px!important;flex:1 1 310px!important;max-width:480px!important;padding:11px 14px!important;font-size:15px!important;border-width:2px!important;}
          .filters{gap:6px!important;}
          .filter{font-size:13px!important;padding:10px 12px!important;}
          .lesson-grid,.grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(190px,1fr))!important;gap:12px!important;}
          .lesson-card,.grid .card{min-height:0!important;padding:12px!important;border-radius:18px!important;display:flex!important;flex-direction:column!important;background:white!important;border:1px solid #dce6f5!important;box-shadow:0 4px 13px #172e4512!important;}
          .lesson-card h2,.grid .card h2{font:800 17px/1.2 system-ui,sans-serif!important;color:#113965!important;margin:4px 0 8px!important;min-height:40px!important;}
          .lesson-card p,.grid .card p{display:none!important;}
          .lesson-card .badge,.grid .card .tag{order:2!important;font-size:11px!important;align-self:start!important;margin:5px 0!important;padding:4px 8px!important;}
          .lesson-card h2,.grid .card h2{order:0!important;}
          .hibou-lesson-thumb{order:1!important;height:114px!important;background:var(--thumb-bg)!important;border-radius:13px!important;display:flex!important;align-items:center!important;justify-content:space-evenly!important;gap:5px!important;margin-top:4px!important;overflow:hidden!important;border:1px solid #fff!important;}
          .hibou-thumb-symbol{font-size:58px!important;line-height:1!important;filter:drop-shadow(0 3px 2px #0001)!important;}
          .hibou-thumb-sample{font-size:15px!important;line-height:1.35!important;font-weight:850!important;text-align:center!important;color:#164376!important;background:#fffd!important;border-radius:10px!important;padding:8px!important;max-width:52%!important;}
          .open-link,.grid .card .open{order:3!important;background:#edf5ff!important;color:#174979!important;padding:8px 11px!important;border-radius:11px!important;font-size:12px!important;text-decoration:none!important;margin-top:auto!important;}
          @media(max-width:580px){.lesson-grid,.grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}.hibou-lesson-thumb{height:94px!important}.hibou-thumb-symbol{font-size:38px!important}.hibou-thumb-sample{font-size:11px!important}.lesson-card h2,.grid .card h2{font-size:14px!important}}
        `;
        doc.head.appendChild(style);
      }
      cards.forEach(function(card){
        if(card.querySelector('.hibou-lesson-thumb'))return;
        var h=card.querySelector('h2');if(!h)return;
        var link=card.querySelector('a[href]');
        var thumb=makeThumb(doc,textOf(h),card.getAttribute('data-domain')||'');
        h.insertAdjacentElement('afterend',thumb);
        if(link){link.textContent='📄 Leçon + exercices';}
      });
      try{doc.documentElement.scrollTop=0;doc.body.scrollTop=0;}catch(e){}
    }catch(e){console.warn('Bibliothèque non modifiée :',e);}
  }
  function showSubjectCatalog(subject){
    var data=singlePages[subject],catalog=byId('hibouSubjectCatalog');
    if(!data||!catalog)return;
    catalog.hidden=false;
    catalog.innerHTML='<div class="hibou-single-tools"><span>📚 Leçons disponibles</span></div>'+ 
      '<button class="hibou-single-card" id="hibouSingleOpen" type="button">'+
       '<strong>'+esc(data.title)+'</strong>'+
       '<span class="hibou-single-art" style="background:'+data.tone+'"><span>'+data.emoji+'</span><small>'+esc(data.hint)+'</small></span>'+
       '<span class="hibou-single-foot">📄 Ouvrir la leçon et ses exercices →</span>'+
      '</button>';
    var button=byId('hibouSingleOpen');
    if(button)button.addEventListener('click',function(){
      catalog.hidden=true;
      var frame=byId('hibouLessonsFrame');
      if(frame){frame.style.display='block';frame.setAttribute('src',SINGLE_URLS[subject]);}
      var back=byId('hibouLessonsBack');if(back)back.hidden=false;
    });
  }
  var SINGLE_URLS={sciences:'bibliotheque_sciences/index.html',geographie:'bibliotheque_geographie/index.html',histoire:'bibliotheque_histoire/index.html',recit:'bibliotheque_recit/index.html',lexique:'bibliotheque_lexique/index.html'};
  function restoreCatalog(){
    var catalog=byId('hibouSubjectCatalog'),frame=byId('hibouLessonsFrame');
    if(catalog&&!catalog.hidden){return false;}
    var subject=document.querySelector('.hibou-lessons-tab.active');
    var key=subject&&({hibouLessonsSciences:'sciences',hibouLessonsGeographie:'geographie',hibouLessonsHistoire:'histoire',hibouLessonsRecit:'recit',hibouLessonsLexique:'lexique'})[subject.id];
    if(key){if(frame)frame.style.display='none';showSubjectCatalog(key);return true;}
    return false;
  }

  function sourceMiniCard(){
    return byId('v21TreasureCard') || document.querySelector('.v24-know-card') || null;
  }

  function readMiniLessonData(){
    var card = sourceMiniCard();
    if(!card){
      return {
        question:'Mini-leçon indisponible pour le moment.',
        lesson:'Reviens dans un instant : Maître Hibou recharge la mini-leçon du jour.',
        challenge:'',
        correction:''
      };
    }
    return {
      question: textOf(card.querySelector('.v24-know-question')),
      lesson: textOf(card.querySelector('.v24-know-lesson')).replace(/^Je retiens\s*:\s*/i,''),
      challenge: textOf(card.querySelector('.v24-know-defi')).replace(/^Petit défi\s*:\s*/i,''),
      correction: textOf(card.querySelector('.v24-know-answer')).replace(/^Correction du défi\s*:\s*/i,'')
    };
  }

  function renderMiniLesson(){
    var panel = byId('hibouLessonsMiniPanel');
    if(!panel) return;
    var data = readMiniLessonData();
    panel.innerHTML =
      '<div class="hibou-mini-card">' +
        '<div class="hibou-mini-top">' +
          '<div class="hibou-mini-icon" aria-hidden="true">💡</div>' +
          '<div><p class="hibou-mini-kicker">Le savais-tu ?</p><h3>Mini-leçon du jour</h3></div>' +
        '</div>' +
        '<p class="hibou-mini-question">' + esc(data.question) + '</p>' +
        '<p class="hibou-mini-retains"><strong>Je retiens :</strong> ' + esc(data.lesson || '—') + '</p>' +
        (data.challenge ? '<p class="hibou-mini-defi"><strong>Petit défi :</strong> ' + esc(data.challenge) + '</p>' : '') +
        '<details class="hibou-mini-details"><summary>Voir la correction</summary><div>' + esc(data.correction || 'Correction à venir.') + '</div></details>' +
        '<div class="hibou-mini-actions"><button type="button" class="hibou-mini-refresh" id="hibouMiniRefresh">Une autre mini-leçon</button></div>' +
      '</div>';

    var refresh = byId('hibouMiniRefresh');
    if(refresh){
      refresh.addEventListener('click', function(){
        try{
          var card = sourceMiniCard();
          var next = card ? (card.querySelector('#v24KnowNextBtn') || card.querySelector('.v24-know-btn.secondary')) : null;
          if(next) next.click();
        }catch(e){}
        setTimeout(renderMiniLesson, 120);
      });
    }
  }

  function selectSubject(subject){
    var french = byId('hibouLessonsFrench');
    var maths = byId('hibouLessonsMaths');
    var sciences = byId('hibouLessonsSciences');
    var geographie = byId('hibouLessonsGeographie');
    var histoire = byId('hibouLessonsHistoire');
    var recit = byId('hibouLessonsRecit');
    var lexique = byId('hibouLessonsLexique');
    var mini = byId('hibouLessonsMiniTab');
    var frame = byId('hibouLessonsFrame');
    var panel = byId('hibouLessonsMiniPanel');
    var isMini = subject === 'mini';
    var isSingle=!!singlePages[subject];
    var catalog=byId('hibouSubjectCatalog');
    if(catalog)catalog.hidden=true;
    setLessonHeader(subject);
    var back=byId('hibouLessonsBack');if(back)back.hidden=!isSingle;
    var pages = {
      francais: ['bibliotheque_lecons/index.html', 'Bibliothèque des leçons de français'],
      maths: ['bibliotheque_math/index.html', 'Bibliothèque des leçons de mathématiques'],
      sciences: ['bibliotheque_sciences/index.html', "Leçon de sciences : les états de l’eau"],
      geographie: ['bibliotheque_geographie/index.html', 'Leçon de géographie : la ville et ses quartiers'],
      histoire: ['bibliotheque_histoire/index.html', 'Leçon d’histoire : habiter autrefois et aujourd’hui'],
      recit: ['bibliotheque_recit/index.html', 'Leçon de français : raconter dans l’ordre'],
      lexique: ['bibliotheque_lexique/index.html', 'Leçon de lexique : familles, synonymes, contraires']
    };
    var tabs = [[french,'francais'],[maths,'maths'],[sciences,'sciences'],[geographie,'geographie'],[histoire,'histoire'],[recit,'recit'],[lexique,'lexique'],[mini,'mini']];
    tabs.forEach(function(item){
      if(item[0]) item[0].classList.toggle('active', item[1] === subject);
    });
    if(frame){
      if(isMini || isSingle){
        frame.style.display = 'none';
      }else{
        frame.style.display = 'block';
        var page = pages[subject] || pages.francais;
        if(frame.getAttribute('src') !== page[0]) frame.setAttribute('src', page[0]);
        frame.title = page[1];
        injectLibraryCards();
      }
    }
    if(isSingle)showSubjectCatalog(subject);
    if(panel){
      panel.hidden = !isMini;
      if(isMini) renderMiniLesson();
    }
  }

  function openLessons(subject){
    createPopup();
    selectSubject(subject || 'francais');
    var overlay = byId('hibouLessonsOverlay');
    if(overlay){
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
      setTimeout(function(){ var c=byId('hibouLessonsClose'); if(c) c.focus(); },30);
    }
  }

  function closeLessons(){
    var overlay = byId('hibouLessonsOverlay');
    if(overlay){
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    }
  }

  function installButton(){
    var actions = document.querySelector('.v24-advice-actions');
    if(!actions) return false;

    var lessons = byId('v24AdviceLessons');
    if(!lessons){
      lessons = document.createElement('button');
      lessons.type = 'button';
      lessons.id = 'v24AdviceLessons';
      lessons.className = 'v24-advice-btn v24-advice-lessons';
      actions.insertBefore(lessons, actions.firstChild);
    }
    lessons.innerHTML = '📚 Leçons & mini-leçon<small>Français · Maths · Sciences · Géographie · Histoire · Récit · Lexique</small>';
    if(!lessons.__hibouLessonBound){
      lessons.__hibouLessonBound = true;
      lessons.addEventListener('click', function(ev){ ev.preventDefault(); openLessons('francais'); }, true);
    }

    var train = byId('v24AdviceTrain');
    var belt = byId('v24AdviceBelt');
    var question = byId('v24AdviceQuestion');
    [train,belt,lessons,question].forEach(function(btn){ if(btn && btn.parentNode === actions) actions.appendChild(btn); });
    return true;
  }

  function install(){
    if(!document.body) return;
    document.body.classList.add('hibou-lessons-ready');
    setVersion();
    createPopup();
    installButton();
  }

  window.openHibouLessons = function(){ openLessons('francais'); };
  window.openHibouMiniLesson = function(){ openLessons('mini'); };
  window.closeHibouLessons = closeLessons;

  document.addEventListener('keydown', function(ev){
    if(ev.key === 'Escape' && byId('hibouLessonsOverlay') && byId('hibouLessonsOverlay').classList.contains('open')) closeLessons();
  });

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
  else install();
  window.addEventListener('load', install);
  [50,150,350,700,1200,2200,4000].forEach(function(ms){ setTimeout(install,ms); });
  setInterval(function(){ setVersion(); installButton(); },3000);
})();
