
/* Maître Hibou V25.8.02 — Boîte à questions en popup intégrée */
(function(){
  'use strict';
  if(window.__hibouQuestionModalV25802) return;
  window.__hibouQuestionModalV25802 = true;

  try{
    window.MAITRE_HIBOU_VERSION = 'V25.8.02';
    document.title = '🦉 Maître Hibou V25.8.02';
  }catch(e){}

  var QUESTION_PAGE_URL = 'boite_questions.html';
  var QUESTION_API_URL = 'https://script.google.com/macros/s/AKfycbwGcErZ0he06Dg_bpPDaHtPHa6fAcDQ-31tB7Rlr9w2JZcNaQnP9YIABJYf-CKpFfpF/exec';
  var modal = null, frame = null, previousHtmlOverflow = '', previousBodyOverflow = '';

  function clean(v){ return String(v == null ? '' : v).replace(/\s+/g,' ').trim(); }

  function getStudentName(){
    try{ if(typeof prenomActuel !== 'undefined' && clean(prenomActuel)) return clean(prenomActuel); }catch(e){}
    try{ if(window.prenomActuel && clean(window.prenomActuel)) return clean(window.prenomActuel); }catch(e){}
    try{
      var current = JSON.parse(localStorage.getItem('hibou_current_student') || '{}');
      if(current && clean(current.prenom)) return clean(current.prenom);
    }catch(e){}
    try{
      var p = localStorage.getItem('hibou_last_prenom') || localStorage.getItem('hibou_prenom') || '';
      if(clean(p)) return clean(p);
    }catch(e){}
    return '';
  }

  function absoluteQuestionUrl(){
    try{ return new URL(QUESTION_PAGE_URL, location.href).toString(); }
    catch(e){ return QUESTION_PAGE_URL; }
  }

  function questionUrl(){
    var params = [
      'prenom=' + encodeURIComponent(getStudentName()),
      'returnUrl=' + encodeURIComponent(location.origin + location.pathname),
      'apiUrl=' + encodeURIComponent(QUESTION_API_URL),
      'source=maitre_hibou_v25_7_93',
      'journalBridge=1',
      'eventKey=' + encodeURIComponent('hibou_question_event_v25715'),
      'sessionKey=' + encodeURIComponent('hibou_question_session_v25715'),
      'parentOrigin=' + encodeURIComponent(location.origin),
      'embedded=1',
      't=' + Date.now()
    ];
    return absoluteQuestionUrl() + '?' + params.join('&');
  }

  function ensureModal(){
    if(modal && document.body.contains(modal)) return modal;

    modal = document.createElement('div');
    modal.id = 'hibouQuestionModalV25802';
    modal.className = 'hidden';
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML =
      '<div class="hq93-shell" role="dialog" aria-modal="true" aria-label="Poser une question">'+
        '<div class="hq93-loading">🦉 Ouverture de la boîte à questions…</div>'+
        '<iframe class="hq93-frame" title="Poser une question" src="about:blank"></iframe>'+
        '<button type="button" class="hq93-close" aria-label="Fermer">×</button>'+
      '</div>';

    document.body.appendChild(modal);
    frame = modal.querySelector('.hq93-frame');

    modal.querySelector('.hq93-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function(ev){
      if(ev.target === modal) closeModal();
    });

    frame.addEventListener('load', function(){
      if(modal) modal.classList.add('ready');
    });

    return modal;
  }

  function saveSession(){
    try{
      localStorage.setItem('hibou_question_session_v25715', JSON.stringify({
        prenom:getStudentName(),
        openedAt:Date.now(),
        source:'maitre_hibou_v25_7_93',
        parentUrl:location.href,
        embedded:true
      }));
    }catch(e){}
  }

  function openModal(ev){
    if(ev){
      try{
        ev.preventDefault();
        ev.stopPropagation();
        if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
      }catch(e){}
    }

    saveSession();
    ensureModal();

    previousHtmlOverflow = document.documentElement.style.overflow || '';
    previousBodyOverflow = document.body.style.overflow || '';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    modal.classList.remove('ready','hidden');
    modal.setAttribute('aria-hidden','false');

    var url = questionUrl();
    try{
      if(frame) frame.src = url;
      else throw new Error('iframe absente');
    }catch(e){
      /* Secours conservé : si l'iframe ne peut pas être utilisée,
         on garde l'ancien mécanisme dans une nouvelle fenêtre. */
      closeModal();
      try{ window.open(url,'hibou_boite_questions'); }catch(err){}
    }
    return false;
  }

  function closeModal(){
    if(!modal) return false;
    modal.classList.add('hidden');
    modal.classList.remove('ready');
    modal.setAttribute('aria-hidden','true');
    document.documentElement.style.overflow = previousHtmlOverflow;
    document.body.style.overflow = previousBodyOverflow;

    /* Libère la page enfant après fermeture sans toucher à la session Maître Hibou. */
    setTimeout(function(){
      try{ if(frame && modal.classList.contains('hidden')) frame.src = 'about:blank'; }catch(e){}
    },80);
    return false;
  }

  function isQuestionAskButton(target){
    if(!target || !target.closest) return false;
    var direct = target.closest('#v24AdviceQuestion, .v24-advice-question, [data-hibou-question-v2548="1"]');
    if(direct) return true;
    var btn = target.closest('button, a, [role="button"], .v24-advice-btn');
    if(!btn) return false;
    var label = (btn.textContent || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    return label.indexOf('poser une question') !== -1;
  }

  /* Capture prioritaire : neutralise l'ancien window.open sans le supprimer. */
  document.addEventListener('click', function(ev){
    if(isQuestionAskButton(ev.target)) return openModal(ev);
  }, true);

  document.addEventListener('keydown', function(ev){
    if((ev.key === 'Enter' || ev.key === ' ') && isQuestionAskButton(ev.target)) return openModal(ev);
    if(ev.key === 'Escape' && modal && !modal.classList.contains('hidden')) closeModal();
  }, true);

  /* La page enfant demande sa fermeture via postMessage. */
  window.addEventListener('message', function(ev){
    var d = ev && ev.data;
    if(!d) return;
    if(d === 'hibou-question-close' || d.type === 'hibou-question-close'){
      closeModal();
    }
  });

  window.openStudentQuestionPage = openModal;
  window.openQuestionPage = openModal;
  window.openAskQuestionPageV2548 = openModal;
  window.openStudentQuestionModalV25802 = openModal;
  window.closeStudentQuestionModalV25802 = closeModal;
})();
