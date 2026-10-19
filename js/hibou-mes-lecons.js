(function(){
  'use strict';
  if(window.__hibouMesLeconsV25772) return;
  window.__hibouMesLeconsV25772 = true;

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
          '<button type="button" class="hibou-lessons-back" id="hibouLessonsBack" aria-label="Retour aux matières">← Mes matières</button>' +
          '<div class="owl" aria-hidden="true"><img src="bibliotheque_lecons/images/logo_lecons_officiel.png?v=25772-logo-officiel" alt=""></div>' +
          '<div class="hibou-lessons-title"><h2 id="hibouLessonsTitle">Mes leçons</h2><p>Choisis une matière ou retrouve la mini-leçon du jour dans cette fenêtre.</p></div>' +
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
          '<iframe class="hibou-lessons-frame" id="hibouLessonsFrame" title="Bibliothèque des leçons de français" src="bibliotheque_lecons/index.html"></iframe>' +
          '<section class="hibou-mini-panel" id="hibouLessonsMiniPanel" hidden></section>' +
        '</div>' +
      '</section>';
    document.body.appendChild(overlay);

    var close = byId('hibouLessonsClose');
    var back = byId('hibouLessonsBack');
    if(back) back.addEventListener('click', showSubjects);
    var french = byId('hibouLessonsFrench');
    var maths = byId('hibouLessonsMaths');
    var mini = byId('hibouLessonsMiniTab');
    var sciences = byId('hibouLessonsSciences');
    var geographie = byId('hibouLessonsGeographie');
    var histoire = byId('hibouLessonsHistoire');
    var recit = byId('hibouLessonsRecit');
    var lexique = byId('hibouLessonsLexique');
    var lessonFrame = byId('hibouLessonsFrame');
    if(lessonFrame) lessonFrame.addEventListener('load', function(){
      [0,150,600,1400].forEach(function(ms){ setTimeout(compactEmbeddedLibrary,ms); });
    });
    if(close) close.addEventListener('click', closeLessons);
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

  // Élimine le bandeau redondant de la bibliothèque dans l'iframe,
  // sans changer les pages de bibliothèque utilisées directement.
  function isLandscapeTouch(){
    return !!(window.matchMedia && window.matchMedia('(orientation: landscape) and (hover: none) and (pointer: coarse)').matches);
  }
  function compactEmbeddedLibrary(){
    var frame = byId('hibouLessonsFrame');
    if(!frame) return;
    try{
      var doc = frame.contentDocument;
      if(!doc || !doc.body) return;
      var compact = isLandscapeTouch();
      // Ne masquer que le véritable bandeau de titre, jamais les filtres.
      if(!compact){
        doc.querySelectorAll('[data-hibou-compact-banner="1"]').forEach(function(el){
          el.style.removeProperty('display');
          el.removeAttribute('data-hibou-compact-banner');
        });
        return;
      }
      var headings = Array.from(doc.querySelectorAll('h1,h2,h3'));
      var h = headings.find(function(el){
        return /^mes leçons de\s/i.test(textOf(el)) || /^mes leçons\s+(de|d[’'])\s/i.test(textOf(el));
      });
      if(!h) return;
      var banner = h.closest('header');
      // Certaines bibliothèques utilisent une carte plutôt qu'un <header>.
      if(!banner || banner === doc.body){
        banner = h.parentElement;
        for(var i=0; i<3 && banner && banner.parentElement; i++){
          if(banner.querySelector('p') && banner.querySelector('img,svg,.owl')) break;
          banner = banner.parentElement;
        }
      }
      if(!banner || banner === doc.body || banner === doc.documentElement) return;
      // Sécurité : ne jamais cacher une zone contenant les commandes de recherche.
      if(banner.querySelector('input, select, [type="search"]')) return;
      banner.setAttribute('data-hibou-compact-banner','1');
      banner.style.setProperty('display','none','important');
    }catch(e){ /* iframe éventuellement inaccessible : aucun effet sur la page principale */ }
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

  // Sur tablette uniquement, l'écran de choix des matières précède la bibliothèque.
  function isTabletLessons(){
    return window.matchMedia && (window.matchMedia('(max-width: 1100px)').matches || isLandscapeTouch());
  }

  function showSubjects(){
    var dialog = document.querySelector('#hibouLessonsOverlay .hibou-lessons-dialog');
    var frame = byId('hibouLessonsFrame');
    var panel = byId('hibouLessonsMiniPanel');
    if(!dialog || !isTabletLessons()) return;
    dialog.classList.remove('hibou-subject-selected');
    var heading = byId('hibouLessonsTitle');
    if(heading) heading.textContent = 'Mes leçons';
    dialog.classList.add('hibou-subject-chooser');
    if(frame) frame.style.display = 'none';
    if(panel) panel.hidden = true;
    var tabs = dialog.querySelectorAll('.hibou-lessons-tab');
    tabs.forEach(function(tab){ tab.classList.remove('active'); });
    var first = byId('hibouLessonsFrench');
    if(first) first.focus({preventScroll:true});
  }

  function selectSubject(subject){
    var dialog = document.querySelector('#hibouLessonsOverlay .hibou-lessons-dialog');
    if(dialog){
      dialog.classList.add('hibou-subject-selected');
      dialog.classList.remove('hibou-subject-chooser');
      if(isTabletLessons()){
        var names = {francais:'Français', maths:'Mathématiques', sciences:'Sciences', geographie:'Géographie', histoire:'Histoire', recit:'Récit', lexique:'Lexique', mini:'Mini-leçon'};
        var heading = byId('hibouLessonsTitle');
        if(heading) heading.textContent = names[subject] || 'Mes leçons';
      }
    }
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
      if(isMini){
        frame.style.display = 'none';
      }else{
        frame.style.display = 'block';
        var page = pages[subject] || pages.francais;
        if(frame.getAttribute('src') !== page[0]) frame.setAttribute('src', page[0]);
        frame.title = page[1];
      }
    }
    [0,120,450].forEach(function(ms){ setTimeout(compactEmbeddedLibrary,ms); });
    if(panel){
      panel.hidden = !isMini;
      if(isMini) renderMiniLesson();
    }
  }

  function openLessons(subject){
    createPopup();
    if(isTabletLessons() && (!subject || subject === 'francais')) showSubjects();
    else selectSubject(subject || 'francais');
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
  window.addEventListener('resize', compactEmbeddedLibrary);
  window.addEventListener('orientationchange', function(){ setTimeout(compactEmbeddedLibrary,200); });
  [50,150,350,700,1200,2200,4000].forEach(function(ms){ setTimeout(install,ms); });
  setInterval(function(){ setVersion(); installButton(); },3000);
})();
