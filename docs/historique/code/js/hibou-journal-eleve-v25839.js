/*
 * Maître Hibou V25.8.39 — Journal élève consolidé + codes canoniques LSU
 * Source unique pour le parcours, l'historique local, la file de synchronisation
 * et le chargement du dossier distant d'un élève.
 */
(function(){
  'use strict';
  if(window.__hibouStudentSystemV25839) return;
  window.__hibouStudentSystemV25839=true;

  var VERSION='V25.8.39';
  var LAST_PREFIX='hibou_journal_last_';
  var HISTORY_PREFIX='hibou_journal_history_';
  var SNAPSHOT_PREFIX='hibou_student_snapshot_';
  var QUEUE_KEY='hibou_journal_queue_v25713';
  var RECORD_QUEUE_KEY='hibou_records_calcul_queue_v25713';
  var CFG_URL='hibou_sync_api_url_v25754';
  var CFG_KEY='hibou_sync_device_key_v25754';
  var MAX_HISTORY=200;
  var LIVE_DEDUPE_MS=1800;
  var recent={};
  var inflight={};

  function clean(v){return String(v==null?'':v).replace(/\s+/g,' ').trim();}
  function norm(v){return clean(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'');}
  function cap(v){v=clean(v);return v?v.charAt(0).toUpperCase()+v.slice(1).toLowerCase():'';}
  function esc(v){return clean(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function get(k){try{return localStorage.getItem(k)||'';}catch(e){return '';}}
  function set(k,v){try{localStorage.setItem(k,String(v));}catch(e){}}
  function read(k,f){try{var x=JSON.parse(get(k)||'null');return x==null?f:x;}catch(e){return f;}}
  function write(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
  function device(){return /Android|iPad|Tablet|Mobile/i.test(navigator.userAgent||'')?'tablette':'pc';}
  function now(){return new Date().toISOString();}
  function formatDate(iso){var d=new Date(iso||Date.now());return isNaN(d)?'':d.toLocaleDateString('fr-FR');}
  function formatHour(iso){var d=new Date(iso||Date.now());return isNaN(d)?'':d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});}
  function currentName(){
    var c=[];
    try{c.push(window.prenomActuel);}catch(e){}
    try{c.push(typeof window.currentStudentName==='function'?window.currentStudentName():window.currentStudentName);}catch(e){}
    try{c.push(window.__hibouCurrentStudent);}catch(e){}
    try{var o=JSON.parse(get('hibou_current_student')||'{}');c.push(o.prenom||o.name);}catch(e){}
    ['hibou_prenom','hibou_last_prenom','elevePrenom','maitre_hibou_prenom','hibou_student_name'].forEach(function(k){c.push(get(k));});
    for(var i=0;i<c.length;i++){var n=clean(c[i]);if(n&&!/^(jo|eleve|élève|undefined|null|prenom|prénom)$/i.test(n))return cap(n);}
    return '';
  }
  function key(prefix,name){return prefix+norm(name);}
  function configured(){var u=clean(get(CFG_URL)),k=clean(get(CFG_KEY));return /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(u)&&k.length>=16;}
  function config(){return {url:clean(get(CFG_URL)),key:clean(get(CFG_KEY))};}

  function outcome(raw,score,total,type){
    var s=norm(raw.resultat||raw.outcome||raw.statut||raw.status);
    if(/erreur|echec|echoue|rate|incorrect|non_valide|a_reprendre/.test(s)) return 'erreur';
    if(/reussi|reussite|valide|acquis|correct|termine/.test(s)) return 'reussite';
    if(type==='ceinture_validee') return 'reussite';
    if(score!==''&&total!==''&&Number(total)>0){
      var ratio=Number(score)/Number(total);
      if(type.indexOf('entrainement')===0) return ratio>=0.7?'reussite':'erreur';
      return ratio>=0.75?'reussite':'erreur';
    }
    return 'trace';
  }
  function medal(score,total,v){
    var x=clean(v);if(/or|🥇/i.test(x))return 'Or';if(/argent|🥈/i.test(x))return 'Argent';if(/bronze|🥉/i.test(x))return 'Bronze';
    score=Number(score);total=Number(total)||20;if(!isFinite(score)||!total)return '';
    var scaled=total===20?score:Math.round(score/total*20);return scaled>=19?'Or':scaled>=17?'Argent':scaled>=15?'Bronze':'';
  }
  function normalizeType(v){
    var t=norm(v||'activite');
    var map={ceinture:'ceinture_validee',ceinture_francais_validee:'ceinture_validee',ceinture_maths_validee:'ceinture_validee',entrainement:'entrainement_termine',question:'question_posee',bilan:'bilan_termine'};
    return map[t]||t;
  }

  /* V25.8.39 — raccordement prudent aux codes canoniques Progressions CE2.
     Règle : ne compléter que les correspondances pédagogiquement certaines.
     Les activités trop larges restent sans code plutôt que d'être attribuées au hasard. */
  var CANONICAL_SKILLS_V25839={
    grammaire_blanche_phrase_negative:{code:'GRA-P1-02',label:'Reconnaître une phrase négative'},
    grammaire_jaune_verbe:{code:'GRA-P1-04',label:'Repérer le verbe conjugué'},
    grammaire_orange_sujet:{code:'GRA-P1-06',label:'Repérer le groupe sujet'},
    grammaire_verte_nom:{code:'GRA-P2-01',label:'Reconnaître un nom commun'},
    grammaire_bleue_determinant:{code:'GRA-P3-01',label:'Identifier le déterminant'},
    grammaire_marron_infinitif:{code:'GRA-P1-05',label:'Donner l’infinitif d’un verbe conjugué'},
    grammaire_noire_adjectif:{code:'GRA-P3-02',label:'Identifier l’adjectif'},
    grammaire_rouge_groupe_nominal:{code:'GRA-P3-03',label:'Identifier le groupe nominal'},

    maths_blanche_petits_nombres:{code:'CAL-P1-01',label:'Restituer les tables d’addition'},
    maths_vert_fonce_complement_dizaine:{code:'CAL-P1-02',label:'Trouver un complément à 10 ou 100'},
    maths_bleu_clair_plus_moins_9:{code:'CAL-P1-03',label:'Ajouter ou retrancher 9, 19 ou 29'},
    maths_beige_complement_centaine:{code:'CAL-P1-02',label:'Trouver un complément à 10 ou 100'},
    maths_violet_tables_1_2_10:{code:'CAL-P3-01',label:'Connaître les tables de multiplication'},
    maths_marron_tables_3_4_5:{code:'CAL-P3-01',label:'Connaître les tables de multiplication'},
    maths_rouge_tables_6_7:{code:'CAL-P3-01',label:'Connaître les tables de multiplication'},
    maths_gris_tables_8_9:{code:'CAL-P3-01',label:'Connaître les tables de multiplication'}
  };

  var CANONICAL_LABELS_V25839=[
    ['phrase affirmative / négative','grammaire_blanche_phrase_negative'],
    ['trouver le verbe','grammaire_jaune_verbe'],
    ['trouver le sujet','grammaire_orange_sujet'],
    ['reconnaître un nom','grammaire_verte_nom'],
    ['reconnaitre un nom','grammaire_verte_nom'],
    ['reconnaître un déterminant','grammaire_bleue_determinant'],
    ['reconnaitre un determinant','grammaire_bleue_determinant'],
    ['trouver l’infinitif','grammaire_marron_infinitif'],
    ['trouver infinitif','grammaire_marron_infinitif'],
    ['reconnaître un adjectif','grammaire_noire_adjectif'],
    ['reconnaitre un adjectif','grammaire_noire_adjectif'],
    ['reconnaître le groupe nominal','grammaire_rouge_groupe_nominal'],
    ['reconnaitre le groupe nominal','grammaire_rouge_groupe_nominal'],
    ['petits nombres','maths_blanche_petits_nombres'],
    ['complément à la dizaine','maths_vert_fonce_complement_dizaine'],
    ['complement a la dizaine','maths_vert_fonce_complement_dizaine'],
    ['ajouter / retrancher 9','maths_bleu_clair_plus_moins_9'],
    ['complément à la centaine','maths_beige_complement_centaine'],
    ['complement a la centaine','maths_beige_complement_centaine'],
    ['tables ×1 ×2 ×10','maths_violet_tables_1_2_10'],
    ['tables x1 x2 x10','maths_violet_tables_1_2_10'],
    ['tables ×3 ×4 ×5','maths_marron_tables_3_4_5'],
    ['tables x3 x4 x5','maths_marron_tables_3_4_5'],
    ['tables ×6 ×7','maths_rouge_tables_6_7'],
    ['tables x6 x7','maths_rouge_tables_6_7'],
    ['tables ×8 ×9','maths_gris_tables_8_9'],
    ['tables x8 x9','maths_gris_tables_8_9']
  ];

  function canonicalSkillV25839(raw){
    raw=raw||{};
    var explicitCode=clean(raw.competence_code||raw.competency_code||raw.code_competence);
    if(explicitCode)return {code:explicitCode,label:clean(raw.competence_label||raw.competency_label||raw.competence||raw.skill_label)};
    var belt=raw.belt||{};
    var skill=norm(raw.skill_id||raw.skillId||belt.skillId||belt.skill_id);
    if(skill&&CANONICAL_SKILLS_V25839[skill])return CANONICAL_SKILLS_V25839[skill];
    var hay=norm([raw.titre,raw.title,raw.detail,raw.details,raw.competence,raw.label,belt.label].filter(Boolean).join(' | '));
    for(var i=0;i<CANONICAL_LABELS_V25839.length;i++){
      if(hay.indexOf(norm(CANONICAL_LABELS_V25839[i][0]))!==-1){
        return CANONICAL_SKILLS_V25839[CANONICAL_LABELS_V25839[i][1]]||null;
      }
    }
    return null;
  }

  function enrichCanonicalV25839(raw,type,score,total){
    raw=raw||{};
    var meta=canonicalSkillV25839(raw);
    if(!meta||!meta.code)return raw;
    var out=Object.assign({},raw);
    if(!clean(out.competence_code))out.competence_code=meta.code;
    if(!clean(out.competence_label))out.competence_label=meta.label;

    if(type==='ceinture_validee'){
      if(out.help_used==null||out.help_used==='')out.help_used=0;
      if(out.challenge_score==null||out.challenge_score==='')out.challenge_score=score;
      if(out.challenge_total==null||out.challenge_total==='')out.challenge_total=total;
      if(!clean(out.exercise_types))out.exercise_types='ceinture_20_items';
      if(!clean(out.mastery_status))out.mastery_status='reussi_seul';
      if(!clean(out.learning_session_id)){
        out.learning_session_id='ceinture-'+norm(out.skill_id||(out.belt&&out.belt.skillId)||meta.code)+'-'+Date.now().toString(36);
      }
    }else if(type.indexOf('entrainement')===0){
      if(!clean(out.exercise_types))out.exercise_types='entrainement_formatif';
      if(!clean(out.mastery_status)&&score!==''&&total!==''&&Number(total)>0){
        out.mastery_status=(Number(score)/Number(total)>=0.7)?'reussi_avec_aide':'a_renforcer';
      }
      if(!clean(out.learning_session_id)){
        out.learning_session_id='entrainement-'+norm(meta.code)+'-'+Date.now().toString(36);
      }
    }
    return out;
  }
  function eventId(e){return [norm(e.prenom),norm(e.type),norm(e.matiere),norm(e.titre),Date.now(),Math.random().toString(36).slice(2,8)].join('-');}
  function display(e){
    var icon=e.resultat==='erreur'?'❌':e.resultat==='reussite'?'✅':'🧭';
    var parts=[e.titre];if(e.detail)parts.push(e.detail);if(e.score!==''&&e.total!=='')parts.push(e.score+'/'+e.total);if(e.medaille)parts.push(e.medaille);
    return icon+' '+parts.filter(Boolean).join(' — ');
  }
  function normalizeEvent(raw){
    raw=raw||{};var name=cap(raw.prenom||raw.eleve||raw.name||raw.student||currentName());if(!name)return null;
    var type=normalizeType(raw.type||raw.kind);var score=raw.score==null||raw.score===''?'':Number(raw.score);var total=raw.total==null||raw.total===''?'':Number(raw.total);
    raw=enrichCanonicalV25839(raw,type,score,total);
    var iso=clean(raw.date_iso||raw.dateIso||raw.date)||now();var result=outcome(raw,score,total,type);
    var e={version:VERSION,id_evenement:clean(raw.id_evenement||raw.event_id||raw.id),date_iso:iso,date:formatDate(iso),heure:formatHour(iso),prenom:name,type:type,
      matiere:clean(raw.matiere||raw.subject),domaine:clean(raw.domaine||raw.domain),titre:clean(raw.titre||raw.title||raw.texte||raw.text||'Activité'),detail:clean(raw.detail||raw.details),
      score:score,total:total,temps_secondes:raw.temps_secondes==null||raw.temps_secondes===''?'':Math.max(0,Math.round(Number(raw.temps_secondes)||0)),
      resultat:result,medaille:medal(score,total,raw.medaille||raw.medal||raw.niveau),source:clean(raw.source||'maitre_hibou'),appareil:clean(raw.appareil||device()),
      competence_code:clean(raw.competence_code||raw.competency_code||raw.code_competence),
      competence_label:clean(raw.competence_label||raw.competency_label||raw.competence||raw.skill_label),
      exercise_types:clean(raw.exercise_types||raw.exercise_type||raw.format_exercice||raw.types_exercices),
      help_used:raw.help_used==null||raw.help_used===''?'':Math.max(0,Math.round(Number(raw.help_used)||0)),
      challenge_score:raw.challenge_score==null||raw.challenge_score===''?'':Math.max(0,Number(raw.challenge_score)||0),
      challenge_total:raw.challenge_total==null||raw.challenge_total===''?'':Math.max(0,Number(raw.challenge_total)||0),
      mastery_status:clean(raw.mastery_status||raw.statut_maitrise||raw.mastery),
      learning_session_id:clean(raw.learning_session_id||raw.session_id||raw.activity_session_id)};
    e.id_evenement=e.id_evenement||eventId(e);e.affichage=clean(raw.affichage)||display(e);return e;
  }
  function sig(e){return [norm(e.prenom),norm(e.type),norm(e.matiere),norm(e.titre),norm(e.detail),e.score,e.total,e.resultat,norm(e.competence_code),e.help_used,e.challenge_score,e.challenge_total,norm(e.mastery_status),norm(e.learning_session_id)].join('|');}
  function valid(e){return !!(e&&e.prenom&&e.type&&e.titre&&e.date_iso);}
  function saveLocal(e){
    write(key(LAST_PREFIX,e.prenom),e);var h=read(key(HISTORY_PREFIX,e.prenom),[]);h.unshift(e);var seen={};
    h=h.filter(function(x){var id=clean(x&&x.id_evenement);if(!id||seen[id])return false;seen[id]=1;return true;}).sort(function(a,b){return String(b.date_iso).localeCompare(String(a.date_iso));}).slice(0,MAX_HISTORY);
    write(key(HISTORY_PREFIX,e.prenom),h);
  }
  function enqueue(k,e,max){var q=read(k,[]);if(!q.some(function(x){return x.id_evenement===e.id_evenement;}))q.push(e);write(k,q.slice(-(max||500)));}
  function track(raw){
    var e=normalizeEvent(raw);if(!valid(e))return null;var s=sig(e),n=Date.now();if(recent[s]&&n-recent[s]<LIVE_DEDUPE_MS)return e;recent[s]=n;
    saveLocal(e);enqueue(QUEUE_KEY,e,500);if(e.type==='entrainement_termine'&&norm(e.matiere)==='maths'&&e.temps_secondes)enqueue(RECORD_QUEUE_KEY,e,200);
    renderRecent(e.prenom);dispatch('hibou:student-event',{event:e,student:e.prenom});try{if(typeof window.hibouScheduleSync==='function')window.hibouScheduleSync();}catch(err){}
    return e;
  }
  function getHistory(name){name=cap(name||currentName());return name?read(key(HISTORY_PREFIX,name),[]):[];}
  function getLast(name){var h=getHistory(name);return h[0]||null;}
  function mergeRemote(name,rows){
    name=cap(name||currentName());var h=getHistory(name),all=h.concat((rows||[]).map(function(r){return normalizeEvent({id_evenement:r.event_id,date_iso:r.date,prenom:r.prenom||name,type:r.type,
      titre:r.texte||r.activite||'Activité',detail:r.resultat||'',score:r.score,total:r.total,temps_secondes:r.temps_secondes,medaille:r.medaille,source:r.source,matiere:r.matiere,domaine:r.activite,resultat:r.resultat,
      competence_code:r.competence_code,competence_label:r.competence_label,exercise_types:r.exercise_types,help_used:r.help_used,
      challenge_score:r.challenge_score,challenge_total:r.challenge_total,mastery_status:r.mastery_status,learning_session_id:r.learning_session_id});}).filter(Boolean));
    var seen={};all=all.filter(function(x){var id=x.id_evenement||sig(x);if(seen[id])return false;seen[id]=1;return true;}).sort(function(a,b){return String(b.date_iso).localeCompare(String(a.date_iso));}).slice(0,MAX_HISTORY);
    write(key(HISTORY_PREFIX,name),all);if(all[0])write(key(LAST_PREFIX,name),all[0]);return all;
  }
  function dispatch(type,detail){try{document.dispatchEvent(new CustomEvent(type,{detail:detail}));}catch(e){}}
  function icon(e){if(!e)return'🧭';if(e.resultat==='erreur')return'❌';if(e.type==='ceinture_validee')return'🏅';if(/question/.test(e.type))return'💬';if(/entrainement|record/.test(e.type))return'🧮';return e.resultat==='reussite'?'✅':'⭐';}
  function renderRecent(name){
    var card=document.getElementById('bandeauLastCard');if(!card)return;var e=getLast(name),text=e?e.affichage:'Ta prochaine activité apparaîtra ici.';
    card.innerHTML='<span class="bandeau-info-icon">'+icon(e)+'</span><span class="bandeau-info-text"><span class="bandeau-info-label">Mon parcours récent</span><span id="bandeauLastText">'+esc(text)+'</span></span>';
    card.classList.add('mh-journal-eleve');card.setAttribute('role','button');card.setAttribute('tabindex','0');card.setAttribute('title','Voir mon historique complet');
  }
  function jsonp(params){return new Promise(function(resolve,reject){if(!configured())return reject(new Error('API non configurée'));var c=config(),cb='__hibouSnap_'+Date.now()+'_'+Math.floor(Math.random()*1e6),s=document.createElement('script'),done=false;
    var timer=setTimeout(function(){finish(false,new Error('Délai dépassé'));},15000);function finish(ok,v){if(done)return;done=true;clearTimeout(timer);try{delete window[cb];}catch(e){}if(s.parentNode)s.parentNode.removeChild(s);ok?resolve(v):reject(v);}window[cb]=function(d){if(d&&d.ok===false)finish(false,new Error(d.error||d.code));else finish(true,d);};s.onerror=function(){finish(false,new Error('Connexion impossible'));};
    params=params||{};params.device_key=c.key;params.tablet_key=c.key;params.callback=cb;params._=Date.now();s.src=c.url+'?'+Object.keys(params).map(function(k){return encodeURIComponent(k)+'='+encodeURIComponent(params[k]);}).join('&');document.head.appendChild(s);});}
  function loadSnapshot(name,force){
    name=cap(name||currentName());if(!name)return Promise.resolve(null);var nk=norm(name);if(inflight[nk])return inflight[nk];var cached=read(key(SNAPSHOT_PREFIX,name),null);if(cached&&!force&&Date.now()-Date.parse(cached.loaded_at||0)<60000){mergeRemote(name,cached.reussites||[]);renderRecent(name);dispatch('hibou:student-snapshot',{student:name,snapshot:cached});return Promise.resolve(cached);}
    inflight[nk]=jsonp({action:'student_snapshot',prenom:name,limit:300}).then(function(d){var snap=d&&d.snapshot?d.snapshot:d;snap=snap||{};snap.loaded_at=now();write(key(SNAPSHOT_PREFIX,name),snap);mergeRemote(name,snap.reussites||[]);renderRecent(name);dispatch('hibou:student-snapshot',{student:name,snapshot:snap});return snap;}).catch(function(err){console.warn('V25.7.62 snapshot',err);return cached;}).finally(function(){delete inflight[nk];});return inflight[nk];
  }
  function recordSuccess(text,type,meta){meta=meta||{};return track(Object.assign({},meta,{type:type||meta.type||'activite_terminee',titre:text||meta.titre,resultat:meta.resultat||'reussite'}));}
  function recordError(text,type,meta){meta=meta||{};return track(Object.assign({},meta,{type:type||meta.type||'activite_terminee',titre:text||meta.titre,resultat:'erreur'}));}
  function refreshStudent(force){var n=currentName();renderRecent(n);return loadSnapshot(n,!!force);}

  function trackLearningActivity(raw){
    raw=raw||{};
    return track({
      prenom:raw.prenom,
      type:raw.type||'lecture_comprehension',
      matiere:raw.matiere||'Français',
      domaine:raw.domaine||raw.competence_label||raw.competence||'Lecture et compréhension',
      titre:raw.titre||raw.competence_label||raw.competence||'Activité de lecture',
      detail:raw.detail||'',
      score:raw.score,total:raw.total,temps_secondes:raw.temps_secondes,resultat:raw.resultat,
      source:raw.source||'hibou_learning_engine',
      competence_code:raw.competence_code,
      competence_label:raw.competence_label||raw.competence,
      exercise_types:raw.exercise_types||raw.exercise_type,
      help_used:raw.help_used,
      challenge_score:raw.challenge_score,
      challenge_total:raw.challenge_total,
      mastery_status:raw.mastery_status,
      learning_session_id:raw.learning_session_id||raw.session_id
    });
  }

  window.hibouTrackEvent=track;window.hibouTrackSuccess=recordSuccess;window.hibouTrackError=recordError;window.recordMaitreHibouSuccess=recordSuccess;
  window.hibouGetEventHistory=getHistory;window.hibouGetLastEvent=getLast;window.hibouLoadStudentSnapshot=loadSnapshot;window.hibouRefreshStudent=refreshStudent;
  window.hibouTrackLearningActivity=trackLearningActivity;window.hibouCanonicalSkillV25839=canonicalSkillV25839;window.hibouStudentSystem={version:VERSION,track:track,trackLearningActivity:trackLearningActivity,canonicalSkill:canonicalSkillV25839,success:recordSuccess,error:recordError,currentName:currentName,getHistory:getHistory,getLast:getLast,loadSnapshot:loadSnapshot,refresh:refreshStudent,configured:configured,config:config};

  function boot(){renderRecent();setTimeout(function(){refreshStudent(false);},500);setTimeout(function(){refreshStudent(false);},1800);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  document.addEventListener('hibou:student-changed',function(){setTimeout(function(){refreshStudent(true);},80);});
  window.addEventListener('storage',function(e){if(e.key&&(/hibou_current_student|hibou_prenom|elevePrenom/.test(e.key)))setTimeout(function(){refreshStudent(true);},50);});
})();
