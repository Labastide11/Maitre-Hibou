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
          '<div class="owl" aria-hidden="true"><img src="bibliotheque_lecons/images/logo_lecons_officiel.png?v=25772-logo-officiel" alt=""></div>' +
          '<div class="hibou-lessons-title"><h2 id="hibouLessonsTitle">Mes leçons</h2><p>Choisis une matière ou retrouve la mini-leçon du jour dans cette fenêtre.</p></div>' +
          '<button type="button" class="hibou-lessons-close" id="hibouLessonsClose" aria-label="Fermer">×</button>' +
        '</header>' +
        '<nav class="hibou-lessons-tabs" aria-label="Choisir un contenu">' +
          '<button type="button" class="hibou-lessons-tab active" id="hibouLessonsFrench">📘 Français</button>' +
          '<button type="button" class="hibou-lessons-tab" id="hibouLessonsMaths">📐 Mathématiques</button>' +
          '<button type="button" class="hibou-lessons-tab" id="hibouLessonsMiniTab">💡 Mini-leçon</button>' +
        '</nav>' +
        '<div class="hibou-lessons-content">' +
          '<iframe class="hibou-lessons-frame" id="hibouLessonsFrame" title="Bibliothèque des leçons de français" src="bibliotheque_lecons/index.html"></iframe>' +
          '<section class="hibou-mini-panel" id="hibouLessonsMiniPanel" hidden></section>' +
        '</div>' +
      '</section>';
    document.body.appendChild(overlay);

    var close = byId('hibouLessonsClose');
    var french = byId('hibouLessonsFrench');
    var maths = byId('hibouLessonsMaths');
    var mini = byId('hibouLessonsMiniTab');
    if(close) close.addEventListener('click', closeLessons);
    if(french) french.addEventListener('click', function(){ selectSubject('francais'); });
    if(maths) maths.addEventListener('click', function(){ selectSubject('maths'); });
    if(mini) mini.addEventListener('click', function(){ selectSubject('mini'); });
    overlay.addEventListener('click', function(ev){ if(ev.target === overlay) closeLessons(); });
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
    var mini = byId('hibouLessonsMiniTab');
    var frame = byId('hibouLessonsFrame');
    var panel = byId('hibouLessonsMiniPanel');
    var isMaths = subject === 'maths';
    var isMini = subject === 'mini';
    if(french) french.classList.toggle('active', !isMaths && !isMini);
    if(maths) maths.classList.toggle('active', isMaths);
    if(mini) mini.classList.toggle('active', isMini);
    if(frame){
      if(isMini){
        frame.style.display = 'none';
      }else{
        frame.style.display = 'block';
        var nextSrc = isMaths ? 'bibliotheque_math/index.html' : 'bibliotheque_lecons/index.html';
        if(frame.getAttribute('src') !== nextSrc) frame.setAttribute('src', nextSrc);
        frame.title = isMaths ? 'Bibliothèque des leçons de mathématiques' : 'Bibliothèque des leçons de français';
      }
    }
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
    lessons.innerHTML = '📚 Leçons & mini-leçon<small>Français · Maths · notion du jour</small>';
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
