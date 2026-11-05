/* Maître Hibou V25.8.39 — synchronisation confirmée par accusé de réception */
(function(){
'use strict';if(window.__hibouSyncV25839)return;window.__hibouSyncV25839=true;
var VERSION='V25.8.39',CFG_URL='hibou_sync_api_url_v25754',CFG_KEY='hibou_sync_device_key_v25754',LAST_SYNC='hibou_sync_last_success_v25761',LAST_ERROR='hibou_sync_last_error_v25761',QE='hibou_journal_queue_v25713',QR='hibou_records_calcul_queue_v25713',BATCH=25,busy=false,timer=null,failures=0;
function get(k){try{return localStorage.getItem(k)||'';}catch(e){return'';}}function set(k,v){try{localStorage.setItem(k,String(v));}catch(e){}}function read(k,f){try{var x=JSON.parse(get(k)||'null');return x==null?f:x;}catch(e){return f;}}function write(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}function clean(v){return String(v==null?'':v).trim();}
function cfg(){return{url:clean(get(CFG_URL)),key:clean(get(CFG_KEY))};}function configured(){var c=cfg();return /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(c.url)&&c.key.length>=16;}function q(){return{events:read(QE,[]),records:read(QR,[])};}function device(){return /Android|iPad|Tablet|Mobile/i.test(navigator.userAgent||'')?'tablette':'pc';}
function parcours(e){return{event_id:e.id_evenement,date:e.date_iso,prenom:e.prenom,type:e.type,texte:e.affichage||e.titre,score:e.score,total:e.total,temps_secondes:e.temps_secondes,appareil:e.appareil||device(),source:e.source||'maitre_hibou',matiere:e.matiere,activite:e.domaine||e.titre,resultat:e.resultat,medaille:e.medaille,version:VERSION,synchronise:'oui',
competence_code:e.competence_code||'',competence_label:e.competence_label||'',exercise_types:e.exercise_types||'',help_used:e.help_used,challenge_score:e.challenge_score,challenge_total:e.challenge_total,mastery_status:e.mastery_status||'',learning_session_id:e.learning_session_id||''};}
function record(e){return{prenom:e.prenom,ceinture:e.domaine||e.titre,score:e.score,total:e.total,temps_secondes:e.temps_secondes,temps_moyen:e.total?Math.round(Number(e.temps_secondes||0)/Number(e.total)*100)/100:0,date:e.date_iso,appareil:e.appareil||device()};}
function jsonp(params){return new Promise(function(resolve,reject){if(!configured())return reject(new Error('Configuration absente'));var c=cfg(),cb='__hibouAck_'+Date.now()+'_'+Math.floor(Math.random()*1e6),s=document.createElement('script'),done=false,t=setTimeout(function(){finish(false,new Error('Délai dépassé'));},15000);function finish(ok,v){if(done)return;done=true;clearTimeout(t);try{delete window[cb];}catch(e){}if(s.parentNode)s.parentNode.removeChild(s);ok?resolve(v):reject(v);}window[cb]=function(d){d&&d.ok!==false?finish(true,d):finish(false,new Error(d&&d.error||'Erreur API'));};s.onerror=function(){finish(false,new Error('Erreur réseau'));};params.device_key=c.key;params.tablet_key=c.key;params.callback=cb;params._=Date.now();s.src=c.url+'?'+Object.keys(params).map(function(k){return encodeURIComponent(k)+'='+encodeURIComponent(params[k]);}).join('&');document.head.appendChild(s);});}
function post(payload){var c=cfg();return fetch(c.url,{method:'POST',mode:'no-cors',cache:'no-store',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});}
function schedule(ms){clearTimeout(timer);timer=setTimeout(function(){sync(false);},ms==null?30000:ms);}function backoff(){return Math.min(15*60*1000,30000*Math.pow(2,Math.min(failures,5)));}
async function sync(manual){if(busy)return{ok:false,error:'Déjà en cours'};if(!configured()){if(manual)openSettings();return{ok:false,error:'Configuration absente'};}var all=q(),ev=all.events.slice(0,BATCH),rec=all.records.slice(0,BATCH);if(!ev.length&&!rec.length){if(manual)alert('Aucune trace en attente.');return{ok:true,empty:true};}busy=true;update();var c=cfg(),ids=ev.map(function(e){return e.id_evenement;}).filter(Boolean);try{await post({device_key:c.key,source:'maitre_hibou_v25839',version:VERSION,appareil:device(),parcours_eleves:ev.map(parcours),records_calcul:rec.map(record)});await new Promise(function(r){setTimeout(r,1200);});var ack=await jsonp({action:'sync_ack',event_ids:ids.join(',')});var confirmed=ack.confirmed_ids||[];if(ids.length&&confirmed.length!==ids.length)throw new Error('Accusé incomplet : les données restent en attente.');var ackIds={};confirmed.forEach(function(id){ackIds[id]=true;});write(QE,read(QE,[]).filter(function(e){return !ackIds[e.id_evenement];}));write(QR,read(QR,[]).slice(rec.length));set(LAST_SYNC,new Date().toISOString());set(LAST_ERROR,'');failures=0;busy=false;update();if(manual)alert('Synchronisation confirmée : '+ev.length+' trace(s), '+rec.length+' record(s).');if(q().events.length||q().records.length)schedule(30000);return{ok:true};}catch(err){failures++;set(LAST_ERROR,String(err&&err.message||err));busy=false;update();schedule(backoff());if(manual)alert('Synchronisation non confirmée. Les données restent sur la tablette.\n'+String(err&&err.message||err));return{ok:false,error:String(err&&err.message||err)};}}
function openSettings(){var c=cfg(),u=prompt('URL Apps Script /exec :',c.url||'');if(u===null)return;var k=prompt('TABLET_DEVICE_KEY :',c.key||'');if(k===null)return;u=clean(u);k=clean(k);if(!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(u)||k.length<16){alert('Configuration invalide.');return;}set(CFG_URL,u);set(CFG_KEY,k);set(LAST_ERROR,'');alert('Configuration enregistrée sur cet appareil.');if(window.hibouRefreshStudent)window.hibouRefreshStudent(true);}
function status(){var a=q();return{configured:configured(),syncing:busy,queuedEvents:a.events.length,queuedRecords:a.records.length,lastSync:get(LAST_SYNC),lastError:get(LAST_ERROR)};}function update(){var s=status();document.querySelectorAll('[data-hibou-sync-status]').forEach(function(el){el.textContent=(s.syncing?'Synchronisation…':'☁️ Synchroniser maintenant')+' ('+(s.queuedEvents+s.queuedRecords)+' en attente)';});}
function inject(){var a=document.querySelector('.teacher-fullscreen-actions');if(!a||a.querySelector('[data-hibou-sync-status]'))return;var b=document.createElement('button');b.className='teacher-btn';b.dataset.hibouSyncStatus='1';b.onclick=function(){sync(true);};a.appendChild(b);var c=document.createElement('button');c.className='teacher-btn';c.textContent='⚙️ Configurer la synchronisation';c.onclick=openSettings;a.appendChild(c);update();}

/* Restauration des ceintures depuis l'onglet parcours_eleves.
   Aucune nouvelle API : GET action=parcours, authentifié avec device_key.
   Fusion non destructive : jamais de suppression d'une réussite locale. */
var MH_BELT_COLORS=['blanche','jaune','orange','vert_clair','vert_fonce','bleu_clair','bleu_fonce','rose','beige','violet','marron','rouge','gris','noir'];
var MH_FR_COLORS=['blanche','jaune','orange','verte','bleue','marron','noire','rouge'];
var mhBeltPending={},mhBeltLoaded={},mhBeltLastStudent='';
function beltNorm(v){return clean(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'');}
function beltStudent(){
  var names=[window.prenomActuel,window.__hibouCurrentStudent,typeof window.currentStudentName==='function'?window.currentStudentName():window.currentStudentName,get('hibou_prenom'),get('elevePrenom')];
  try{var o=JSON.parse(get('hibou_current_student')||'{}');names.push(o.prenom||o.name);}catch(e){}
  for(var i=0;i<names.length;i++){var n=clean(names[i]);if(n&&!/^(eleve|élève|invite|invité|test|null|undefined)$/i.test(n))return n;}
  return '';
}
function beltJson(k,f){return read(k,f);}
function beltDate(v){
  var s=clean(v),m=s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\D+(\d{1,2})[:h](\d{2})(?::(\d{2}))?)?/);
  if(m)return new Date(+m[3],+m[2]-1,+m[1],+m[4]||0,+m[5]||0,+m[6]||0).getTime();
  return Date.parse(s)||0;
}
function sortBeltAttempts(items){items.sort(function(a,b){return beltDate(a.date)-beltDate(b.date)||String(a.id||'').localeCompare(String(b.id||''));});}

function mergeBeltRows(name,rows){
  if(!Array.isArray(rows))return {ok:false,reason:'Réponse parcours non valide'};
  var student=beltNorm(name),math={};
  var m={};MH_BELT_COLORS.forEach(function(b){m[b]={attempts:[],best:0};});
  var f={};MH_FR_COLORS.forEach(function(b){f[b]={attempts:[],best:0};});
  rows.forEach(function(r){
    if(!r||beltNorm(r.prenom)!==student)return;
    var marker=beltNorm(r.exercise_types);
    var isMath=beltNorm(r.matiere)==='maths',isFrench=beltNorm(r.matiere)==='francais';
    var family=isMath?m:isFrench?f:null;if(!family)return;
    var kind='',id='';
    var prefix=isMath?'math_belt_':'french_belt_';
    if(marker.indexOf(prefix+'practice_')===0){kind='practice';id=marker.slice((prefix+'practice_').length);}
    else if(marker.indexOf(prefix+'validation_')===0){kind='validation';id=marker.slice((prefix+'validation_').length);}
    // Compatibilité avec les validations Maths enregistrées avant ce correctif.
    else if(isMath && beltNorm(r.type)==='ceinture_validee' && Number(r.total)===20){
      var title=beltNorm(r.texte);
      id=MH_BELT_COLORS.filter(function(b){return title.indexOf('ceinture_'+b+'_maths')>=0||title.indexOf('ceinture_'+b+'_validee')>=0;})[0]||'';
      if(id)kind='validation';
    }
    if(!family[id])return;
    var score=Number(r.score),total=Number(r.total);if(!isFinite(score)||total!==(kind==='practice'?10:20))return;
    if(kind==='practice'){
      family[id].attempts.push({id:clean(r.learning_session_id||r.event_id),score:score,total:10,date:clean(r.date)});
    }else if(kind==='validation'&&beltNorm(r.type)==='ceinture_validee'&&score>=15){
      family[id].best=Math.max(family[id].best,score);
    }
  });
  var changed=0;
  MH_BELT_COLORS.forEach(function(b){
    var key='hibou_math_practice_2_successes_v1_'+student+'_'+b,local=beltJson(key,{attempts:[]});
    if(!local||!Array.isArray(local.attempts))local={attempts:[]};
    var seen={};local.attempts.forEach(function(a){if(a&&a.id)seen[a.id]=true;});
    m[b].attempts.forEach(function(a){if(a.id&&!seen[a.id]){local.attempts.push(a);seen[a.id]=true;changed++;}});
    if(m[b].attempts.length){sortBeltAttempts(local.attempts);write(key,local);}
  });
  MH_FR_COLORS.forEach(function(b){
    var key='hibou_fr_ceintures_v1_'+student+'_'+b,local=beltJson(key,{attempts:[],best:0});
    if(!local||!Array.isArray(local.attempts))local={attempts:[],best:0};
    var seen={};local.attempts.forEach(function(a){if(a&&a.id)seen[a.id]=true;});
    f[b].attempts.forEach(function(a){if(a.id&&!seen[a.id]){local.attempts.push(a);seen[a.id]=true;changed++;}});
    if(f[b].best>Number(local.best||0)){local.best=f[b].best;changed++;}
    if(f[b].attempts.length||f[b].best){sortBeltAttempts(local.attempts);write(key,local);}
  });
  var progressKey='hibou_v222_maths_progress_'+student,progress=beltJson(progressKey,{belts:[]});
  if(!progress||!Array.isArray(progress.belts))progress={belts:[]};
  MH_BELT_COLORS.forEach(function(b){
    var score=m[b].best;if(score<15)return;
    var old=(progress.belts||[]).filter(function(v){return v&&beltNorm(v.ceinture)===b;}).reduce(function(n,v){return Math.max(n,Number(v.score||0));},0);
    if(score<=old)return;
    var entry=(window.MATH_BELTS_V222||[]).filter(function(x){return x&&beltNorm(x.ceinture)===b;})[0]||{};
    // Compatibilité pour les ceintures avec des noms spécifiques.
    var nativeSkills={blanche:'maths_blanche_petits_nombres',jaune:'maths_jaune_dizaines',orange:'maths_orange_sans_retenue',vert_clair:'maths_vert_clair_avec_retenue',vert_fonce:'maths_vert_fonce_complement_dizaine',bleu_clair:'maths_bleu_clair_plus_moins_9',bleu_fonce:'maths_bleu_fonce_plus_moins_11',rose:'maths_rose_centaines',beige:'maths_beige_complement_centaine',violet:'maths_violet_tables_1_2_10',marron:'maths_marron_tables_3_4_5',rouge:'maths_rouge_tables_6_7',gris:'maths_gris_tables_8_9',noir:'maths_noir_multiplier_10_100_1000'};
    var skill=entry.skillId||nativeSkills[b];
    progress.belts.push({skillId:skill,ceinture:b,label:entry.label||b,score:score,medal:score>=19?'Or':score>=17?'Argent':'Bronze',date:new Date().toISOString()});changed++;
  });
  if(changed)write(progressKey,progress);
  try{window.dispatchEvent(new CustomEvent('hibou:belt-progress-restored',{detail:{student:name,changed:changed}}));}catch(e){}
  if(changed){
    try{if(document.querySelector('#frenchPopupInnerV2348 .fr-v23411-list')&&typeof window.renderFrenchGrammarListV25720==='function')window.renderFrenchGrammarListV25720();}catch(e){}
    try{if(document.querySelector('#mathsPopupInnerV2343 .maths-v2343-list')&&typeof window.renderMathsTrainingListV2343==='function')window.renderMathsTrainingListV2343();}catch(e){}
  }
  return {ok:true,student:name,restored:changed,remote_rows:rows.length};
}
function migrateLegacyBelts(name){
  if(typeof window.hibouTrackEvent!=='function')return;
  var student=beltNorm(name),flag='hibou_belt_legacy_export_v1_'+student;
  if(get(flag)==='ok')return;
  var existing=read('hibou_journal_history_'+student,[]),queued=read(QE,[]),known={};
  existing.concat(queued).forEach(function(e){if(e&&e.learning_session_id)known[e.learning_session_id]=true;});
  function send(domain,b,kind,score,total,id,date,label){
    if(!id||known[id])return;
    var french=domain==='Français';
    var raw={id_evenement:'mh-legacy-'+(french?'fr-':'math-')+b+'-'+id,
      type:kind==='practice'?'entrainement_termine':'ceinture_validee',
      matiere:domain,domaine:french?'Grammaire':'Calcul mental',
      titre:(kind==='practice'?'Défi de ':'Ceinture ')+(french?'grammaire':'calcul')+' · '+b,
      score:score,total:total,date_iso:date||new Date().toISOString(),
      source:'ceintures_historique',resultat:'reussite',
      medaille:kind==='validation'?(score>=19?'Or':score>=17?'Argent':'Bronze'):'',
      exercise_types:(french?'french_belt_':'math_belt_')+kind+'_'+b,
      learning_session_id:id,competence_label:label||b};
    var saved=window.hibouTrackEvent(raw);if(saved)known[id]=true;
  }
  function oldAttempts(items){
    var result=Array.isArray(items)?items.slice():[];sortBeltAttempts(result);
    var first=result.filter(function(a){return a&&Number(a.total)===10&&Number(a.score)>=7;})[0];
    var second=first&&result.filter(function(a){return a&&a.id!==first.id&&beltDate(a.date)>=beltDate(first.date)&&Number(a.total)===10&&Number(a.score)>=8;})[0];
    return [first,second].filter(Boolean);
  }
  MH_FR_COLORS.forEach(function(b){
    var d=read('hibou_fr_ceintures_v1_'+student+'_'+b,{attempts:[],best:0});
    oldAttempts(d.attempts).forEach(function(a){send('Français',b,'practice',a.score,10,a.id,a.date,'Grammaire');});
    if(Number(d.best)>=15)send('Français',b,'validation',Number(d.best),20,'legacy-fr-best-'+student+'-'+b,'','Grammaire');
  });
  var progress=read('hibou_v222_maths_progress_'+student,{belts:[]});
  MH_BELT_COLORS.forEach(function(b){
    var d=read('hibou_math_practice_2_successes_v1_'+student+'_'+b,{attempts:[]});
    oldAttempts(d.attempts).forEach(function(a){send('Maths',b,'practice',a.score,10,a.id,a.date,'Calcul mental');});
    var max=(progress.belts||[]).filter(function(a){return a&&beltNorm(a.ceinture)===b;}).reduce(function(v,a){return Math.max(v,Number(a.score||0));},0);
    if(max>=15)send('Maths',b,'validation',max,20,'legacy-math-best-'+student+'-'+b,'','Calcul mental');
  });
  set(flag,'ok');
}
function loadBeltProgress(force){
  var name=beltStudent();if(!name)return Promise.resolve({ok:false,error:'Élève non identifié'});
  if(!configured())return Promise.resolve({ok:false,error:'Synchronisation Google Sheets non configurée'});
  var key=beltNorm(name);
  // Export non destructif des résultats locaux déjà acquis avant ce correctif.
  migrateLegacyBelts(name);
  if(mhBeltPending[key])return mhBeltPending[key];
  if(!force&&mhBeltLoaded[key]&&Date.now()-mhBeltLoaded[key]<30000)return Promise.resolve({ok:true,cached:true});
  mhBeltPending[key]=jsonp({action:'parcours',prenom:name}).then(function(rows){
    // Le doGet parcours renvoie un tableau ; ne jamais interpréter une réponse vide comme un effacement.
    if(rows&&Array.isArray(rows.parcours))rows=rows.parcours;
    var result=mergeBeltRows(name,rows);
    if(result.ok)mhBeltLoaded[key]=Date.now();
    return result;
  }).catch(function(err){return {ok:false,error:String(err&&err.message||err)};}).then(function(result){delete mhBeltPending[key];return result;});
  return mhBeltPending[key];
}
window.hibouLoadBeltProgress=loadBeltProgress;
window.hibouBeltProgressStatus=function(){return {student:beltStudent(),configured:configured(),lastLoad:mhBeltLoaded[beltNorm(beltStudent())]||null};};
function refreshBeltStudent(){var name=beltStudent();if(!name||name===mhBeltLastStudent)return;mhBeltLastStudent=name;loadBeltProgress(true);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(refreshBeltStudent,500);});
else setTimeout(refreshBeltStudent,500);
window.addEventListener('focus',refreshBeltStudent);

window.hibouSyncNow=sync;window.hibouScheduleSync=function(){schedule(30000);};window.hibouOpenSyncSettings=openSettings;window.hibouSyncStatus=status;window.syncMaitreHibouToGoogleSheets=function(){return sync(true);};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){inject();setTimeout(inject,1000);if(configured())schedule(60000);});else{inject();if(configured())schedule(60000);}setInterval(function(){update();refreshBeltStudent();},10000);
})();
