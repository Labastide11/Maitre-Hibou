/* Maître Hibou V25.8.68 — trace des questions dans Mon parcours récent */
(function(){
  'use strict';
  if(window.__hibouQuestionParcoursV25868) return;
  window.__hibouQuestionParcoursV25868 = true;

  var STORAGE_KEYS = ['hibou_question_event_v25713','hibou_question_event'];
  var SEEN_KEY = 'hibou_question_parcours_seen_v25868';

  function clean(v){
    return String(v == null ? '' : v).replace(/\s+/g,' ').trim();
  }

  function seenMap(){
    try{
      var raw = JSON.parse(localStorage.getItem(SEEN_KEY) || '{}');
      return raw && typeof raw === 'object' ? raw : {};
    }catch(e){ return {}; }
  }

  function markSeen(id){
    if(!id) return;
    try{
      var map = seenMap();
      map[id] = Date.now();
      var ids = Object.keys(map).sort(function(a,b){ return map[b]-map[a]; }).slice(0,120);
      var compact = {};
      ids.forEach(function(k){ compact[k]=map[k]; });
      localStorage.setItem(SEEN_KEY, JSON.stringify(compact));
    }catch(e){}
  }

  function alreadySeen(id){
    if(!id) return false;
    try{ return !!seenMap()[id]; }catch(e){ return false; }
  }

  function normalizePayload(raw){
    if(!raw || typeof raw !== 'object') return null;
    if(clean(raw.type) !== 'hibou_question_posee') return null;

    var prenom = clean(raw.prenom);
    var question = clean(raw.questionCorrigee || raw.question || raw.questionOriginale);
    var eventId = clean(raw.event_id) ||
      ('question-' + (prenom || 'eleve').toLowerCase() + '-' + clean(raw.date_iso || Date.now()));

    if(!question) return null;

    return {
      event_id:eventId,
      prenom:prenom,
      question:question,
      visibilite:clean(raw.visibilite),
      date_iso:clean(raw.date_iso)
    };
  }

  function track(raw){
    var q = normalizePayload(raw);
    if(!q || alreadySeen(q.event_id)) return false;
    if(typeof window.hibouTrackEvent !== 'function') return false;

    var who = q.prenom || 'toi';
    var tracked = window.hibouTrackEvent({
      event_id:q.event_id,
      prenom:q.prenom,
      type:'question_posee',
      matiere:'Curiosité',
      domaine:'Boîte à questions',
      titre:'Bravo ' + who + ' pour ta question !',
      detail:'Le maître va l’étudier. « ' + q.question + ' »',
      texte:'Bravo ' + who + ' pour ta question ! Le maître va l’étudier.',
      activite:q.question,
      resultat:'envoyee',
      source:'boite_questions_parcours_v25868',
      question:q.question,
      visibilite:q.visibilite,
      date:q.date_iso || new Date().toISOString(),
      actionReelle:true,
      force:true
    });

    if(tracked !== false){
      markSeen(q.event_id);
      try{
        document.dispatchEvent(new CustomEvent('hibou:student-event',{
          detail:{type:'question_posee',event_id:q.event_id}
        }));
      }catch(e){}
      return true;
    }
    return false;
  }

  function consumeStored(){
    STORAGE_KEYS.forEach(function(key){
      try{
        var raw = localStorage.getItem(key);
        if(raw) track(JSON.parse(raw));
      }catch(e){}
    });
  }

  window.addEventListener('message',function(ev){
    try{ track(ev.data); }catch(e){}
  });

  window.addEventListener('storage',function(ev){
    if(STORAGE_KEYS.indexOf(ev.key) === -1 || !ev.newValue) return;
    try{ track(JSON.parse(ev.newValue)); }catch(e){}
  });

  window.addEventListener('focus',function(){
    setTimeout(consumeStored,50);
  });

  document.addEventListener('visibilitychange',function(){
    if(!document.hidden) setTimeout(consumeStored,50);
  });

  document.addEventListener('hibou:question-saved',function(ev){
    try{ track(ev.detail); }catch(e){}
  });

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded',function(){
      setTimeout(consumeStored,350);
    },{once:true});
  }else{
    setTimeout(consumeStored,350);
  }
})();
