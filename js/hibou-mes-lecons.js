(function(){
  'use strict';
  if(window.__hibouMesLeconsV25890) return;
  window.__hibouMesLeconsV25890 = true;

  var VERSION = window.MAITRE_HIBOU_TITLE || '🦉 Maître Hibou V25.8.90';

  function byId(id){ return document.getElementById(id); }
  function textOf(node){ return node ? String(node.textContent || '').replace(/\s+/g,' ').trim() : ''; }
  function esc(v){ return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

  var SUBJECTS = {
    francais: {
      label:'Français',
      title:'Mes leçons de français',
      subtitle:'38 fiches de français harmonisées avec le programme 2025.',
      url:'bibliotheque_lecons/index.html',
      frameTitle:'Bibliothèque des leçons de français'
    },
    maths: {
      label:'Mathématiques',
      title:'Mes leçons de mathématiques',
      subtitle:'48 fiches de mathématiques avec le programme 2025.',
      url:'bibliotheque_math/index.html',
      frameTitle:'Bibliothèque des leçons de mathématiques'
    },
    sciences: {
      label:'Sciences',
      title:'Mes leçons de sciences',
      subtitle:'Retrouve les leçons de sciences de Maître Hibou.',
      url:'bibliotheque_sciences/index.html',
      frameTitle:'Bibliothèque des leçons de sciences'
    },
    geographie: {
      label:'Géographie',
      title:'Mes leçons de géographie',
      subtitle:'Retrouve les leçons de géographie de Maître Hibou.',
      url:'bibliotheque_geographie/index.html',
      frameTitle:'Bibliothèque des leçons de géographie'
    },
    histoire: {
      label:'Histoire',
      title:'Mes leçons d’histoire',
      subtitle:'Retrouve les leçons d’histoire de Maître Hibou.',
      url:'bibliotheque_histoire/index.html',
      frameTitle:'Bibliothèque des leçons d’histoire'
    },
    recit: {
      label:'Récit',
      title:'Mes leçons de récit',
      subtitle:'Retrouve les leçons de récit de Maître Hibou.',
      url:'bibliotheque_recit/index.html',
      frameTitle:'Bibliothèque des leçons de récit'
    },
    lexique: {
      label:'Lexique',
      title:'Mes leçons de lexique',
      subtitle:'Retrouve les leçons de lexique de Maître Hibou.',
      url:'bibliotheque_lexique/index.html',
      frameTitle:'Bibliothèque des leçons de lexique'
    },
    mini: {
      label:'Mini-leçon',
      title:'Mini-leçon du jour',
      subtitle:'Une petite leçon à revoir avec Maître Hibou.',
      url:'',
      frameTitle:'Mini-leçon'
    }
  };

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
          '<div class="owl" aria-hidden="true"><img src="bibliotheque_lecons/images/logo_lecons_officiel.png?v=25890-logo-officiel" alt=""></div>' +
          '<button type="button" class="hibou-lessons-back" id="hibouLessonsBack" aria-label="Voir les matières">← Mes matières</button>' +
          '<div class="hibou-lessons-title"><h2 id="hibouLessonsTitle">Mes leçons de français</h2><p id="hibouLessonsSubtitle">38 fiches de français harmonisées avec le programme 2025.</p></div>' +
          '<button type="button" class="hibou-lessons-close" id="hibouLessonsClose" aria-label="Fermer">×</button>' +
        '</header>' +
        '<nav class="hibou-lessons-tabs" aria-label="Choisir une matière">' +
          '<button type="button" class="hibou-lessons-tab active" id="hibouLessonsFrench">📘 Français</button>' +
          '<button type="button" class="hibou-lessons-tab" id="hibouLessonsMaths">📐 Mathématiques</button>' +
          '<button type="button" class="hibou-lessons-tab" id="hibouLessonsSciences">💧 Sciences</button>' +
          '<button type="button" class="hibou-lessons-tab" id="hibouLessonsGeographie">🏙️ Géographie</button>' +
          '<button type="button" class="hibou-lessons-tab" id="hibouLessonsHistoire">🏡 Histoire</button>' +
          '<button type="button" class="hibou-lessons-tab" id="hibouLessonsRecit">📖 Récit</button>' +
          '<button type="button" class="hibou-lessons-tab" id="hibouLessonsLexique">🔤 Lexique</button>' +
          '<button type="button" class="hibou-lessons-tab" id="hibouLessonsMiniTab">💡 Mini-leçon</button>' +
        '</nav>' +
        '<div class="hibou-lessons-content">' +
          '<iframe class="hibou-lessons-frame" id="hibouLessonsFrame" title="Bibliothèque des leçons de français" src="bibliotheque_lecons/index.html"></iframe>' +
          '<section class="hibou-mini-panel" id="hibouLessonsMiniPanel" hidden></section>' +
        '</div>' +
      '</section>';
    document.body.appendChild(overlay);

    bindControls();
  }

  function bindControls(){
    var close = byId('hibouLessonsClose');
    var back = byId('hibouLessonsBack');
    var frame = byId('hibouLessonsFrame');
    if(close && !close.__bound){
      close.__bound = true;
      close.addEventListener('click', closeLessons);
    }
    if(back && !back.__bound){
      back.__bound = true;
      back.addEventListener('click', function(){
        var nav = document.querySelector('.hibou-lessons-tabs');
        if(nav){
          try{ nav.scrollIntoView({block:'nearest', behavior:'smooth'}); }
          catch(e){ nav.scrollIntoView(true); }
        }
      });
    }

    [['hibouLessonsFrench','francais'],['hibouLessonsMaths','maths'],['hibouLessonsSciences','sciences'],['hibouLessonsGeographie','geographie'],['hibouLessonsHistoire','histoire'],['hibouLessonsRecit','recit'],['hibouLessonsLexique','lexique'],['hibouLessonsMiniTab','mini']].forEach(function(entry){
      var btn = byId(entry[0]);
      if(btn && !btn.__bound){
        btn.__bound = true;
        btn.addEventListener('click', function(){ selectSubject(entry[1]); });
      }
    });

    if(frame && !frame.__bound){
      frame.__bound = true;
      frame.addEventListener('load', function(){
        syncHeaderFromFrame();
        [40,220,700].forEach(function(ms){ setTimeout(compactEmbeddedLibrary, ms); });
      });
    }

    var overlay = byId('hibouLessonsOverlay');
    if(overlay && !overlay.__bound){
      overlay.__bound = true;
      overlay.addEventListener('click', function(ev){ if(ev.target === overlay) closeLessons(); });
    }
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
    if(refresh && !refresh.__bound){
      refresh.__bound = true;
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

  function setHeaderForSubject(subject){
    var data = SUBJECTS[subject] || SUBJECTS.francais;
    var title = byId('hibouLessonsTitle');
    var subtitle = byId('hibouLessonsSubtitle');
    if(title) title.textContent = data.title;
    if(subtitle) subtitle.textContent = data.subtitle;
  }

  function syncHeaderFromFrame(){
    var frame = byId('hibouLessonsFrame');
    if(!frame || frame.style.display === 'none') return;
    try{
      var doc = frame.contentDocument;
      if(!doc || !doc.body) return;
      var titleEl = Array.from(doc.querySelectorAll('h1,h2,h3')).find(function(el){
        return /^mes leçons/i.test(textOf(el));
      });
      var subtitleEl = null;
      if(titleEl){
        var scope = titleEl.parentElement;
        if(scope){
          subtitleEl = scope.querySelector('p');
          if(!subtitleEl && scope.parentElement) subtitleEl = scope.parentElement.querySelector('p');
        }
      }
      var title = byId('hibouLessonsTitle');
      var subtitle = byId('hibouLessonsSubtitle');
      if(title && titleEl) title.textContent = textOf(titleEl);
      if(subtitle && subtitleEl){
        var txt = textOf(subtitleEl);
        if(txt) subtitle.textContent = txt;
      }
    }catch(e){ }
  }

  function findBannerCandidate(doc, heading){
    var el = heading ? heading.parentElement : null;
    var best = null;
    var depth = 0;
    while(el && el !== doc.body && depth < 7){
      var hasControls = !!el.querySelector('input,select,[type="search"]');
      var hasHeading = !!el.querySelector('h1,h2,h3');
      var hasImg = !!el.querySelector('img,svg');
      var hasParagraph = !!el.querySelector('p');
      var textLen = textOf(el).length;
      if(!hasControls && hasHeading && (hasImg || hasParagraph) && textLen > 10 && textLen < 260){
        best = el;
        break;
      }
      el = el.parentElement;
      depth += 1;
    }
    return best;
  }

  function compactEmbeddedLibrary(){
    var frame = byId('hibouLessonsFrame');
    if(!frame || frame.style.display === 'none') return;
    try{
      var doc = frame.contentDocument;
      if(!doc || !doc.body) return;
      if(doc.__hibouCompactStyleApplied !== true){
        var style = doc.createElement('style');
        style.id = 'hibouCompactOuterStyle';
        style.textContent = '[data-hibou-hidden-banner="1"]{display:none !important;} body{padding-top:0 !important;}';
        doc.head.appendChild(style);
        doc.__hibouCompactStyleApplied = true;
      }
      // restore previously hidden banners if needed before recalculating
      Array.from(doc.querySelectorAll('[data-hibou-hidden-banner="1"]')).forEach(function(node){
        node.style.removeProperty('display');
        node.removeAttribute('data-hibou-hidden-banner');
      });
      var heading = Array.from(doc.querySelectorAll('h1,h2,h3')).find(function(el){
        return /^mes leçons/i.test(textOf(el));
      });
      if(!heading) return;
      var candidate = findBannerCandidate(doc, heading);
      if(candidate){
        candidate.setAttribute('data-hibou-hidden-banner','1');
        candidate.style.setProperty('display','none','important');
      }
      // ensure the search zone is visible near the top when opened
      var search = doc.querySelector('input[type="search"], input[placeholder*="Cherche"], input[placeholder*="cherche"], input[placeholder*="Recherche"], input[placeholder*="recherche"]');
      if(search && search.scrollIntoView){
        try{ search.scrollIntoView({block:'start'}); }catch(e){}
      }
    }catch(e){ }
  }

  function selectSubject(subject){
    var frame = byId('hibouLessonsFrame');
    var panel = byId('hibouLessonsMiniPanel');
    var isMini = subject === 'mini';
    [['hibouLessonsFrench','francais'],['hibouLessonsMaths','maths'],['hibouLessonsSciences','sciences'],['hibouLessonsGeographie','geographie'],['hibouLessonsHistoire','histoire'],['hibouLessonsRecit','recit'],['hibouLessonsLexique','lexique'],['hibouLessonsMiniTab','mini']].forEach(function(entry){
      var btn = byId(entry[0]);
      if(btn) btn.classList.toggle('active', entry[1] === subject);
    });

    setHeaderForSubject(subject);

    if(frame){
      if(isMini){
        frame.style.display = 'none';
      }else{
        frame.style.display = 'block';
        var data = SUBJECTS[subject] || SUBJECTS.francais;
        frame.title = data.frameTitle;
        if(frame.getAttribute('src') !== data.url) frame.setAttribute('src', data.url);
      }
    }
    if(panel){
      panel.hidden = !isMini;
      if(isMini) renderMiniLesson();
    }
    if(!isMini){
      [100,350,900].forEach(function(ms){ setTimeout(function(){ syncHeaderFromFrame(); compactEmbeddedLibrary(); }, ms); });
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
      setTimeout(function(){ var c = byId('hibouLessonsClose'); if(c) c.focus(); }, 30);
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
    lessons.innerHTML = '📚 Revoir une leçon<small>Français · Maths · Sciences · Géographie · Histoire · Récit · Lexique</small>';
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
  [50,150,350,700,1200,2200,4000].forEach(function(ms){ setTimeout(install, ms); });
  setInterval(function(){ setVersion(); installButton(); }, 3000);
})();
