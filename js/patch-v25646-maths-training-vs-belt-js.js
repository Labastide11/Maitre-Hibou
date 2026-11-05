
(function(){
  if(window.__hibouV25645MathsTrainingVsBelt) return;
  window.__hibouV25645MathsTrainingVsBelt = true;

  var TRAINING_COUNT = 10;
  var BELT_COUNT = 20;
  var RECORD_PREFIX = 'hibou_v2343_maths_training_record_';
  var PROGRESS_PREFIX = 'hibou_v222_maths_progress_';
  var PRACTICE_PREFIX = 'hibou_math_practice_2_successes_v1_';
  var TWO_PRACTICES_REQUIRED = 2;
  var baseMathUnlock = null;
  var baseMathStateHTML = null;
  var trainingState = null;
  var beltState = null;
  var beltAdvanceTimer = null;
  var timerId = null;

  function byId(id){ return document.getElementById(id); }
  function clean(v){ return String(v == null ? '' : v).replace(/\s+/g,' ').trim(); }
  function esc(v){ return clean(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c];}); }
  function norm(v){ return clean(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,''); }
  function rnd(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
  function shuffle(arr){ var a=(arr||[]).slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
  function fmt(ms){ var total=Math.max(0, Math.floor(Number(ms||0)/1000)); var m=Math.floor(total/60), s=total%60; return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0'); }
  function avg(ms,n){ return n ? (Math.round((Number(ms||0)/1000)/n*10)/10)+' s' : '—'; }
  function currentStudent(){ try{ return window.prenomActuel || localStorage.getItem('hibou_prenom') || localStorage.getItem('maitreHibouCurrentStudent') || localStorage.getItem('elevePrenom') || 'eleve'; }catch(e){ return 'eleve'; } }
  function studentKey(){ return norm(currentStudent() || 'eleve'); }
  function mathBelts(){ return Array.isArray(window.MATH_BELTS_V222) ? window.MATH_BELTS_V222 : [
    {ceinture:'blanche',niveau:1,emoji:'⚪',colorName:'blanche',skillId:'maths_blanche_petits_nombres',label:'Petits nombres',competence:'petits nombres'},
    {ceinture:'jaune',niveau:2,emoji:'🟡',colorName:'jaune',skillId:'maths_jaune_dizaines',label:'Dizaines',competence:'dizaines'},
    {ceinture:'orange',niveau:3,emoji:'🟠',colorName:'orange',skillId:'maths_orange_sans_retenue',label:'Sans retenue',competence:'sans retenue'},
    {ceinture:'vert_clair',niveau:4,emoji:'🟢',colorName:'vert clair',skillId:'maths_vert_clair_avec_retenue',label:'Avec retenue',competence:'avec retenue'},
    {ceinture:'vert_fonce',niveau:5,emoji:'🟢',colorName:'vert foncé',skillId:'maths_vert_fonce_complement_dizaine',label:'Complément à la dizaine',competence:'complément dizaine'},
    {ceinture:'bleu_clair',niveau:6,emoji:'🔵',colorName:'bleu clair',skillId:'maths_bleu_clair_plus_moins_9',label:'Ajouter / retrancher 9',competence:'plus moins 9'},
    {ceinture:'bleu_fonce',niveau:7,emoji:'🔵',colorName:'bleu foncé',skillId:'maths_bleu_fonce_plus_moins_11',label:'Ajouter / retrancher 11',competence:'plus moins 11'},
    {ceinture:'rose',niveau:8,emoji:'🌸',colorName:'rose',skillId:'maths_rose_centaines',label:'Centaines',competence:'centaines'},
    {ceinture:'beige',niveau:9,emoji:'🤍',colorName:'beige',skillId:'maths_beige_complement_centaine',label:'Complément à la centaine',competence:'complément centaine'},
    {ceinture:'violet',niveau:10,emoji:'🟣',colorName:'violet',skillId:'maths_violet_tables_1_2_10',label:'Tables ×1 ×2 ×10',competence:'tables 1 2 10'},
    {ceinture:'marron',niveau:11,emoji:'🟤',colorName:'marron',skillId:'maths_marron_tables_3_4_5',label:'Tables ×3 ×4 ×5',competence:'tables 3 4 5'},
    {ceinture:'rouge',niveau:12,emoji:'🔴',colorName:'rouge',skillId:'maths_rouge_tables_6_7',label:'Tables ×6 ×7',competence:'tables 6 7'},
    {ceinture:'gris',niveau:13,emoji:'⚫',colorName:'gris',skillId:'maths_gris_tables_8_9',label:'Tables ×8 ×9',competence:'tables 8 9'},
    {ceinture:'noir',niveau:14,emoji:'⚫',colorName:'noir',skillId:'maths_noir_multiplier_10_100_1000',label:'×10 ×100 ×1000',competence:'multiplier par 10 100 1000'}
  ]; }
  function findBelt(id){ var n=norm(id); var list=mathBelts(); return list.filter(function(b){ return norm(b.ceinture)===n || norm(b.skillId)===n || norm(b.label)===n || norm(b.competence)===n; })[0] || list[0]; }
  function optionSet(answer){ answer=Number(answer); var values=[answer], deltas=shuffle([-20,-12,-10,-9,-5,-4,-3,-2,-1,1,2,3,4,5,9,10,12,20]); deltas.forEach(function(d){ var v=answer+d; if(values.length<4 && v>=0 && values.indexOf(v)===-1) values.push(v); }); while(values.length<4){ var extra=answer+rnd(1,30); if(values.indexOf(extra)===-1) values.push(extra); } var opts=shuffle(values.slice(0,4)).map(String); return {options:opts, correct:opts.indexOf(String(answer))}; }
  function q(text, answer){ var o=optionSet(answer); return {q:text, answer:Number(answer), options:o.options, correct:o.correct}; }
  function makeOneQuestion(belt){
    var key=norm((belt&&belt.ceinture)+' '+(belt&&belt.skillId)+' '+(belt&&belt.competence));
    if(key.indexOf('noir')!==-1){ var all=['blanche','jaune','orange','vert_clair','vert_fonce','bleu_clair','bleu_fonce','rose','beige','violet','marron','rouge','gris']; return makeOneQuestion(findBelt(shuffle(all)[0])); }
    if(key.indexOf('blanche')!==-1 || key.indexOf('petits_nombres')!==-1){ var a=rnd(2,18), b=rnd(1,9); if(Math.random()<.55) return q('Combien font '+a+' + '+b+' ?',a+b); var x=Math.max(a,b), y=Math.min(a,b); return q('Combien font '+x+' - '+y+' ?',x-y); }
    if(key.indexOf('jaune')!==-1 || key.indexOf('dizaines')!==-1){ var n=rnd(2,8)*10, d=[10,20,30,40,50][rnd(0,4)]; if(Math.random()<.55) return q('Combien font '+n+' + '+d+' ?',n+d); return q('Combien font '+(n+d)+' - '+d+' ?',n); }
    if(key.indexOf('orange')!==-1 || key.indexOf('sans_retenue')!==-1){ var a2=rnd(11,79), b2=rnd(11,19); if((a2%10)+(b2%10)<10) return q('Combien font '+a2+' + '+b2+' ?',a2+b2); var x2=rnd(30,99), y2=rnd(11,29); y2=Math.min(y2,x2-1); return q('Combien font '+x2+' - '+y2+' ?',x2-y2); }
    if(key.indexOf('vert_clair')!==-1 || key.indexOf('avec_retenue')!==-1){ var a3=rnd(25,79), b3=rnd(16,48); if(Math.random()<.6) return q('Combien font '+a3+' + '+b3+' ?',a3+b3); var x3=rnd(45,120), y3=rnd(18,39); return q('Combien font '+x3+' - '+y3+' ?',x3-y3); }
    if(key.indexOf('vert_fonce')!==-1 || key.indexOf('complement_dizaine')!==-1){ var target=rnd(2,9)*10, start=target-rnd(1,9); return q('Combien faut-il ajouter à '+start+' pour faire '+target+' ?',target-start); }
    if(key.indexOf('bleu_clair')!==-1 || key.indexOf('plus_moins_9')!==-1){ var b4=rnd(20,99), add9=Math.random()<.5; return q('Combien font '+b4+(add9?' + 9':' - 9')+' ?',add9?b4+9:b4-9); }
    if(key.indexOf('bleu_fonce')!==-1 || key.indexOf('plus_moins_11')!==-1){ var b5=rnd(20,99), add11=Math.random()<.5; return q('Combien font '+b5+(add11?' + 11':' - 11')+' ?',add11?b5+11:b5-11); }
    if(key.indexOf('rose')!==-1 || key.indexOf('centaines')!==-1){ var c=rnd(1,8)*100, d2=[100,200,300][rnd(0,2)]; if(Math.random()<.55) return q('Combien font '+c+' + '+d2+' ?',c+d2); return q('Combien font '+(c+d2)+' - '+d2+' ?',c); }
    if(key.indexOf('beige')!==-1 || key.indexOf('complement_centaine')!==-1){ var t=[100,200,300,400,500,600,700,800,900][rnd(0,8)], s=t-rnd(1,99); return q('Combien faut-il ajouter à '+s+' pour faire '+t+' ?',t-s); }
    if(key.indexOf('violet')!==-1 || key.indexOf('tables_1_2_10')!==-1){ var tv=[1,2,10][rnd(0,2)], nv=rnd(1,10); return q('Combien font '+nv+' × '+tv+' ?',nv*tv); }
    if(key.indexOf('marron')!==-1 || key.indexOf('tables_3_4_5')!==-1){ var tm=[3,4,5][rnd(0,2)], nm=rnd(1,10); return q('Combien font '+nm+' × '+tm+' ?',nm*tm); }
    if(key.indexOf('rouge')!==-1 || key.indexOf('tables_6_7')!==-1){ var tr=[6,7][rnd(0,1)], nr=rnd(1,10); return q('Combien font '+nr+' × '+tr+' ?',nr*tr); }
    if(key.indexOf('gris')!==-1 || key.indexOf('tables_8_9')!==-1){ var tg=[8,9][rnd(0,1)], ng=rnd(1,10); return q('Combien font '+ng+' × '+tg+' ?',ng*tg); }
    if(key.indexOf('multiplier_10_100_1000')!==-1){ var mult=[10,100,1000][rnd(0,2)], base=rnd(2,50); return q('Combien font '+base+' × '+mult+' ?',base*mult); }
    return q('Combien font 8 + 7 ?',15);
  }
  // Tirage sans doublon, également pour les 20 questions de la validation.
  function makeQuestions(belt, count){
    var arr=[], seen=Object.create(null), attempts=0;
    while(arr.length<count && attempts<5000){
      attempts++;
      var question=makeOneQuestion(belt);
      var key=norm(question.q);
      if(seen[key]) continue;
      seen[key]=true;
      arr.push(question);
    }
    if(arr.length<count) throw new Error('Banque Maths insuffisante : '+(belt.ceinture||'')+' ('+arr.length+'/'+count+')');
    return arr;
  }
  function practiceKey(belt){ return PRACTICE_PREFIX+studentKey()+'_'+norm(belt.ceinture); }
  function practiceData(belt){
    try {
      var data=JSON.parse(localStorage.getItem(practiceKey(belt))||'null');
      return data && Array.isArray(data.attempts) ? data : {attempts:[]};
    }catch(e){ return {attempts:[]}; }
  }
  function practiceCount(belt){
    // Les acquis antérieurs (ceinture déjà validée) ne sont jamais révoqués.
    if(isAlreadyValidated(belt)) return TWO_PRACTICES_REQUIRED;
    var successes=practiceData(belt).attempts.filter(function(a){return a && a.total===10;});
    // 1er défi : 7/10 ; 2e défi, distinct : 8/10.
    var first=-1; for(var i=0;i<successes.length;i++) if(successes[i].score>=7){first=i;break;}
    if(first<0) return 0; for(var j=first+1;j<successes.length;j++) if(successes[j].score>=8) return 2;
    return 1;
  }
  function isAlreadyValidated(belt){
    var data=loadProgress();
    return !!((data.belts||[]).some(function(x){
      return x && (x.skillId===belt.skillId || norm(x.ceinture)===norm(belt.ceinture)) && Number(x.score)>=15;
    }));
  }
  function savePracticeAttempt(st,total){
    if(st.practiceSaved) return practiceCount(st.belt);
    st.practiceSaved=true;
    try{
      var data=practiceData(st.belt);
      var attempt={id:'math-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2),score:st.score,total:total,date:new Date().toISOString()};
      data.attempts.push(attempt);
      // Ne jamais perdre les deux réussites acquises, même après de nombreux essais.
      if(data.attempts.length>100){
        // Préserver l'ordre des réussites pour ne jamais révoquer un déblocage.
        var firstSuccess=data.attempts.filter(function(a){return a.score>=7 && a.total===10;})[0];
        var secondSuccess=data.attempts.filter(function(a){return a.score>=8 && a.total===10 && firstSuccess && a.id!==firstSuccess.id;})[0];
        var retained=data.attempts.slice(-60);
        [firstSuccess,secondSuccess].filter(Boolean).forEach(function(a){if(!retained.some(function(x){return x.id===a.id;})) retained.unshift(a);});
        data.attempts=retained;
      }
      localStorage.setItem(practiceKey(st.belt),JSON.stringify(data));
    }catch(e){ console.warn('Suivi des entraînements Maths non enregistré',e); }
    // Le stockage local doit réussir indépendamment de l'écriture du journal.
    try{if(attempt&&typeof window.hibouTrackEvent==='function')window.hibouTrackEvent({type:'entrainement_termine',matiere:'Maths',domaine:'Calcul mental',titre:'Défi de calcul · ceinture '+st.belt.ceinture,score:st.score,total:total,source:'ceintures_calcul',resultat:st.score>=7?'reussite':'a_renforcer',exercise_types:'math_belt_practice_'+st.belt.ceinture,learning_session_id:attempt.id,competence_label:st.belt.label||'',date_iso:attempt.date});}catch(e){console.warn('Journal calcul indisponible',e);}
    try{window.dispatchEvent(new CustomEvent('hibou:math-practice-updated',{detail:{belt:st.belt.ceinture,count:practiceCount(st.belt)}}));}catch(e){}
    return practiceCount(st.belt);
  }
  function trainingMedal(score){return score===10?'🥇 Or':score===9?'🥈 Argent':score===8?'🥉 Bronze':'';}
  function isMathBeltReady(belt){
    var oldAllowed=typeof baseMathUnlock==='function' ? baseMathUnlock(belt) : belt.niveau===1;
    return !!(oldAllowed && (practiceCount(belt)>=TWO_PRACTICES_REQUIRED || isAlreadyValidated(belt)));
  }
  window.hibouMathPracticeCount=function(id){return practiceCount(findBelt(id));};
  window.hibouMathPracticeReady=function(id){return isMathBeltReady(findBelt(id));};
  // Ne pas supprimer la progression séquentielle existante : on AJOUTE la condition des 2 réussites.
  function installMathPracticeGate(){
    if(window.isMathUnlockedV222 && window.isMathUnlockedV222.__mhTwoPractices) return;
    if(typeof window.isMathUnlockedV222==='function') baseMathUnlock=window.isMathUnlockedV222;
    if(typeof window.mathStateHTMLV222==='function') baseMathStateHTML=window.mathStateHTMLV222;
    var wrapped=function(belt){return isMathBeltReady(belt);};
    wrapped.__mhTwoPractices=true;
    window.isMathUnlockedV222=wrapped;
    window.mathStateHTMLV222=function(belt){
      if(isAlreadyValidated(belt)) return baseMathStateHTML?baseMathStateHTML(belt):'✅ Ceinture validée';
      var progress=practiceCount(belt);
      if(progress<2) return '<div class="v22-state locked">🔒 '+progress+'/2 entraînements réussis<br><span>8/10 minimum à chaque fois</span></div>';
      return baseMathStateHTML?baseMathStateHTML(belt):'<div class="v22-state ready">🔓 Tu peux passer la ceinture !</div>';
    };
  }
  installMathPracticeGate();
  // Les scripts du catalogue peuvent charger dans un autre ordre.
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',installMathPracticeGate,{once:true});

  function setMathsInner(html){ var inner=byId('mathsPopupInnerV2343'); if(inner) inner.innerHTML=html; }
  function mathsHeader(){ return '<div class="maths-v2343-header"><div class="maths-v2343-owl">🦉</div><div class="maths-v2343-title"><h2>🧮 Entraînements de calcul</h2><p>Entraînement = correction après chaque calcul.</p><div class="maths-v2343-note">La ceinture, elle, garde les corrections pour la fin du test.</div></div></div>'; }
  function startTimer(){ clearInterval(timerId); trainingState.started=Date.now(); trainingState.elapsed=0; timerId=setInterval(function(){ trainingState.elapsed=Date.now()-trainingState.started; var el=byId('mathsTimerValueV2343'); if(el) el.textContent=fmt(trainingState.elapsed); },250); }
  function stopTimer(){ if(trainingState && trainingState.started) trainingState.elapsed=Date.now()-trainingState.started; clearInterval(timerId); timerId=null; }
  function renderTrainingQuestion(){
    var st=trainingState, qu=st.questions[st.index]; if(!qu) return renderTrainingResult(); st.answered=false;
    var opts=(qu.options||[]).map(function(opt,i){ return '<button type="button" class="maths-v2343-option" data-index="'+i+'" onclick="answerMathsTrainingV2343('+i+')">'+esc(opt)+'</button>'; }).join('');
    setMathsInner(mathsHeader()+'<div class="maths-v2343-content"><section class="maths-v2343-panel">'
      +'<div class="maths-v2343-training-head"><button type="button" class="maths-v2343-back" onclick="if(!window.returnMHTrainingFromBelt||!window.returnMHTrainingFromBelt())renderMathsTrainingListV2343()">← Retour aux entraînements</button><div class="maths-v2343-training-title">'+esc(st.belt.label)+'<br><small>'+esc(st.belt.colorName||st.belt.ceinture)+'</small></div><div class="maths-v2343-timer">⏱ <span id="mathsTimerValueV2343">'+fmt(st.elapsed)+'</span></div></div>'
      +'<div class="maths-v2343-progress">Calcul '+(st.index+1)+' / '+st.questions.length+'</div>'
      +'<div class="maths-v2343-question">'+esc(qu.q)+'</div><div class="maths-v2343-options">'+opts+'</div><div id="mathsFeedbackV25645"></div>'
      +'</section></div>');
  }
  window.startMathsTrainingV2343 = function(beltId){ if(typeof window.hibouLoadBeltProgress==='function')window.hibouLoadBeltProgress(); var belt=findBelt(beltId); trainingState={belt:belt,questions:makeQuestions(belt,TRAINING_COUNT),index:0,score:0,answers:[],answered:false,started:0,elapsed:0,practiceSaved:false}; startTimer(); renderTrainingQuestion(); };
  window.answerMathsTrainingV2343 = function(choice){
    var st=trainingState; if(!st || st.answered) return; st.answered=true; choice=Number(choice);
    var qu=st.questions[st.index], correct=Number(qu.correct), ok=choice===correct; if(ok) st.score++;
    var buttons=[].slice.call(document.querySelectorAll('#mathsTrainingOverlayV2343 .maths-v2343-option'));
    buttons.forEach(function(btn){ var idx=Number(btn.getAttribute('data-index')); btn.disabled=true; if(idx===correct) btn.classList.add('correct'); if(idx===choice && !ok) btn.classList.add('wrong'); });
    var chosen=(qu.options||[])[choice], good=(qu.options||[])[correct]; st.answers.push({q:qu.q, chosen:chosen, correct:good, ok:ok});
    var fb=byId('mathsFeedbackV25645'); if(fb){ fb.className='v25646-feedback '+(ok?'ok':'ko'); fb.innerHTML=(ok?'✅ Bravo !':'💡 Bonne réponse : <strong>'+esc(good)+'</strong>')+'<br><button type="button" class="v25646-next-btn" onclick="nextMathsTrainingV25645()">'+(st.index+1>=st.questions.length?'Voir le résultat':'Calcul suivant')+'</button>'; }
  };
  window.nextMathsTrainingV25645 = function(){ var st=trainingState; if(!st) return; st.index++; if(st.index>=st.questions.length) renderTrainingResult(); else renderTrainingQuestion(); };
  function reviewHTML(list){
    var rows='<div class="v25646-review-row head"><span>N°</span><span>Calcul</span><span>Réponse</span><span>Correction</span><span></span></div>';
    rows+=(list||[]).map(function(a,i){ return '<div class="v25646-review-row '+(a.ok?'ok':'ko')+'"><span>'+(i+1)+'</span><span>'+esc(a.q)+'</span><span class="'+(a.ok?'v25646-ok':'v25646-ko')+'">'+esc(a.chosen)+'</span><span>'+esc(a.correct)+'</span><span class="'+(a.ok?'v25646-ok':'v25646-ko')+'">'+(a.ok?'✅':'❌')+'</span></div>'; }).join('');
    return '<div class="v25646-review">'+rows+'</div>';
  }
  function saveTrainingRecord(st,total){ try{ var key=RECORD_PREFIX+studentKey()+'_'+norm(st.belt.ceinture||st.belt.label); var old=JSON.parse(localStorage.getItem(key)||'null'); if(!old || st.score>Number(old.score||0) || (st.score===Number(old.score||0) && st.elapsed<Number(old.time||Infinity))) localStorage.setItem(key,JSON.stringify({score:st.score,total:total,time:st.elapsed,date:new Date().toISOString()})); }catch(e){} }
  function renderTrainingResult(){
    var st=trainingState; if(!st) return; stopTimer();
    var total=st.questions.length||TRAINING_COUNT;
    saveTrainingRecord(st,total);
    var count=savePracticeAttempt(st,total), medal=trainingMedal(st.score);
    var ready=isMathBeltReady(st.belt);
    var message=count>=2 ? 'Magnifique ! Tes deux défis sont réussis. Tu es prêt à passer ta ceinture !' : count===1 ? 'Bravo ! Premier défi réussi. À présent, réussis 8 calculs sur 10 dans une nouvelle série !' : 'Courage ! Pour commencer, réussis au moins 7 calculs sur 10. Tu peux réessayer !';
    var beltBtn=ready
      ? '<button type="button" class="maths-v2343-action" onclick="closeMathsTrainingPopupV2343();startMathSkillValidationV222(\''+esc(st.belt.skillId)+'\')">🔓 Passer ma ceinture — 20 questions</button>'
      : '<button type="button" class="maths-v2343-action secondary" disabled aria-disabled="true" style="opacity:.55;cursor:not-allowed">🔒 Validation verrouillée · '+count+'/2 réussites</button>';
    setMathsInner(mathsHeader()+'<div class="maths-v2343-content"><section class="maths-v2343-panel"><div class="maths-v2343-result"><h3>'+(count>=2?'🦉 Tu es prêt pour ta ceinture !':count===1?'🦉 Bravo, premier défi réussi !':'🦉 Continue, tu vas y arriver !')+'</h3><p style="font-size:1.08rem;font-weight:650;margin:8px 0">'+esc(message)+'</p><div style="font-size:1.35rem;font-weight:bold;margin:8px 0">'+(medal||'💪 En progrès')+'</div><div class="maths-v2343-score-grid"><div class="maths-v2343-score-card">Score<b>'+st.score+' / '+total+'</b></div><div class="maths-v2343-score-card">Temps total<b>'+fmt(st.elapsed)+'</b></div><div class="maths-v2343-score-card">Moyenne<b>'+avg(st.elapsed,total)+'</b></div></div><div class="maths-v2343-record">🦉 Correction de l’entraînement</div>'+reviewHTML(st.answers)+'<div class="maths-v2343-actions">'+beltBtn+'<button type="button" class="maths-v2343-action" onclick="startMathsTrainingV2343(\''+esc(st.belt.ceinture)+'\')">🧮 Refaire 10 calculs</button><button type="button" class="maths-v2343-action secondary" onclick="if(!window.returnMHTrainingFromBelt||!window.returnMHTrainingFromBelt())renderMathsTrainingListV2343()">← Retour aux entraînements</button><button type="button" class="maths-v2343-action secondary" onclick="if(!window.returnMHTrainingFromBelt||!window.returnMHTrainingFromBelt())closeMathsTrainingPopupV2343()">Fermer</button></div></div></section></div>');

    try{
      var scoreText='Score '+st.score+' / '+total+' en '+fmt(st.elapsed);
      var mentalPayload={
        type:'entrainement_termine',
        matiere:'Maths',
        domaine:'Calcul mental',
        titre:'Calcul mental — '+st.belt.label,
        detail:scoreText,
        texte:'Calcul mental — '+st.belt.label+' — '+scoreText,
        score:st.score,
        total:total,
        temps_secondes:Math.max(1,Math.round(Number(st.elapsed||0)/1000)),
        source:'calcul_mental',
        ceinture:st.belt.ceinture||'',
        skill_id:st.belt.skillId||'',
        actionReelle:true
      };
      if(typeof window.hibouTrackEvent==='function'){
        window.hibouTrackEvent(mentalPayload);
      }else if(window.hibouRecordTrainingSuccessV25221){
        window.hibouRecordTrainingSuccessV25221('maths',st.belt.label,scoreText);
      }else if(window.hibouRecordSuccess){
        window.hibouRecordSuccess(mentalPayload.texte,'entrainement',mentalPayload);
      }
      try{ window.dispatchEvent(new CustomEvent('hibou:math-record-updated',{detail:mentalPayload})); }catch(ignore){}
    }catch(e){ try{console.warn('Calcul mental : journal non alimenté',e);}catch(ignore){} }
  }

  function setBeltInner(html){ var b=byId('skillValidationFullscreenBodyV1861'); if(b) b.innerHTML=html; }
  function ensureBeltOverlay(){ var ov=byId('skillValidationFullscreenV1861'); if(!ov){ ov=document.createElement('div'); ov.id='skillValidationFullscreenV1861'; ov.className='modal-overlay skill-validation-fullscreen-v1861 hidden'; ov.innerHTML='<div class="modal-box"><div id="skillValidationFullscreenBodyV1861"></div></div>'; document.body.appendChild(ov); } return ov; }
  // Illustrations des ceintures de Maths : uniquement après l'épreuve de 20 questions validée.
  var mathRewardImages = {
    blanche:'blanche', jaune:'jaune', orange:'orange', vert_clair:'vert_clair',
    vert_fonce:'vert_fonce', bleu_clair:'bleu_clair', bleu_fonce:'bleu_fonce',
    rose:'rose', beige:'beige', violet:'violet', marron:'marron',
    rouge:'rouge', gris:'gris', noir:'noir'
  };
  function mathRewardHTML(belt){
    var key=norm(belt && belt.ceinture);
    var imageKey=mathRewardImages[key];
    if(!imageKey) return '';
    var caption='Bravo ! Tu as obtenu ta ceinture '+clean(belt.colorName||belt.ceinture)+' de calcul !';
    return '<figure class="mh-math-reward" style="text-align:center;margin:12px auto 18px;max-width:450px">'
      +'<img src="images/ceinture_maths_'+imageKey+'.jpg" alt="'+esc(caption)+'" loading="eager" decoding="async" style="display:block;width:100%;max-height:45vh;object-fit:contain;border-radius:16px;margin:0 auto">'
      +'</figure>';
  }
  function medalFor(score){ if(score>=19) return '🥇 Or'; if(score>=17) return '🥈 Argent'; if(score>=15) return '🥉 Bronze'; return ''; }
  function loadProgress(){ try{return JSON.parse(localStorage.getItem(PROGRESS_PREFIX+studentKey())||'{"belts":[]}');}catch(e){return {belts:[]};} }
  function saveProgress(data){ try{localStorage.setItem(PROGRESS_PREFIX+studentKey(),JSON.stringify(data||{belts:[]}));}catch(e){} }
  function saveBeltSuccess(st,medal){ var data=loadProgress(); data.belts=data.belts||[]; var current=data.belts.filter(function(x){return x.skillId===st.belt.skillId;}).reduce(function(best,x){return Math.max(best,Number(x.score||0));},0); if(st.score>current){ data.belts.push({skillId:st.belt.skillId,ceinture:st.belt.ceinture,label:st.belt.label,score:st.score,medal:medal,date:new Date().toISOString()}); saveProgress(data); } }
  window.startMathSkillValidationV222 = function(skillId){
    if(typeof window.hibouLoadBeltProgress==='function')window.hibouLoadBeltProgress();
    installMathPracticeGate();
    var belt=findBelt(skillId); if(!isMathBeltReady(belt)) return;
    ensureBeltOverlay().classList.remove('hidden');
    window.__hibouMathBeltTestActiveV2574 = true;
    if(beltAdvanceTimer){ clearTimeout(beltAdvanceTimer); beltAdvanceTimer=null; }
    beltState={belt:belt,questions:makeQuestions(belt,BELT_COUNT),index:0,score:0,answers:[],answered:false}; renderBeltQuestion();
  };
  function renderBeltQuestion(){
    var st=beltState, qu=st.questions[st.index]; if(!qu) return renderBeltResult(); st.answered=false;
    var opts=(qu.options||[]).map(function(opt,i){ return '<button type="button" class="v222-math-option" data-index="'+i+'" onclick="answerMathSkillV222('+i+')">'+esc(opt)+'</button>'; }).join('');
    setBeltInner('<div class="v190-belt-box"><h3>'+esc(st.belt.emoji||'🧮')+' Ceinture '+esc(st.belt.colorName||st.belt.ceinture)+' — '+esc(st.belt.label)+'</h3><div class="v190-rules">Question '+(st.index+1)+' / '+st.questions.length+' · Test : les corrections apparaîtront à la fin.</div><div class="skill-check-question">'+esc(qu.q)+'</div><div class="v222-math-options">'+opts+'</div><div id="mathSkillFeedbackV222" class="v25646-belt-wait"></div></div>');
  }
  window.answerMathSkillV222 = function(choice){
    var st=beltState; if(!st || st.answered) return; st.answered=true; choice=Number(choice); var qu=st.questions[st.index], correct=Number(qu.correct), ok=choice===correct; if(ok) st.score++;
    st.answers.push({q:qu.q, chosen:(qu.options||[])[choice], correct:(qu.options||[])[correct], ok:ok});
    var buttons=[].slice.call(document.querySelectorAll('#skillValidationFullscreenBodyV1861 .v222-math-option'));
    buttons.forEach(function(btn){ btn.disabled=true; });
    if(buttons[choice]) buttons[choice].classList.add('chosen');
    if(beltAdvanceTimer){ clearTimeout(beltAdvanceTimer); beltAdvanceTimer=null; }
    // V25.8.39 : même règle qu'en français, enchaînement immédiat après le clic.
    if(!window.__hibouMathBeltTestActiveV2574) return;
    st.index++;
    if(st.index>=st.questions.length) renderBeltResult();
    else renderBeltQuestion();
  };
  window.nextMathSkillQuestionV222 = function(){ var st=beltState; if(!st) return; st.index++; if(st.index>=st.questions.length) renderBeltResult(); else renderBeltQuestion(); };
  function renderBeltResult(){
    var st=beltState; if(!st || st.resultShown) return; st.resultShown=true; var total=st.questions.length||BELT_COUNT, medal=medalFor(st.score); if(medal){
      saveBeltSuccess(st,medal);
      try{
        var beltColor = st.belt.colorName || st.belt.ceinture || '';
        var beltLabel = st.belt.label || 'Calcul mental';
        var payload = {
          type:'ceinture_validee',
          matiere:'Maths',
          domaine:'Calcul mental',
          titre:'Ceinture '+beltColor+' Maths validée',
          detail:beltLabel,
          score:st.score,
          total:total,
          niveau:medal,
          medaille:medal,
          source:'ceinture_maths',
          exercise_types:'math_belt_validation_'+st.belt.ceinture,
          learning_session_id:'math-belt-'+st.belt.ceinture+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2),
          ceinture:beltColor,
          skill_id:st.belt.skillId || ''
        };
        if(typeof window.hibouTrackEvent==='function'){
          window.hibouTrackEvent(payload);
        }else if(typeof window.hibouRecordSuccess==='function'){
          window.hibouRecordSuccess('🏅 Ceinture '+beltColor+' validée : '+beltLabel+' ('+st.score+'/'+total+')','ceinture',{matiere:'Maths',domaine:'Calcul mental',belt:st.belt,score:st.score,total:total,niveau:medal,medaille:medal,source:'ceinture_maths',actionReelle:true});
        }
        try{ window.dispatchEvent(new CustomEvent('hibou:track-event',{detail:payload})); }catch(ignore){}
        setTimeout(function(){
          try{ if(typeof window.hibouRenderRecentEvent==='function') window.hibouRenderRecentEvent(); }catch(ignore){}
        },80);
      }catch(e){ try{ console.warn('Ceinture Maths : journal non alimenté',e); }catch(ignore){} }
    }else{
      /* V25.8.70 : tracer aussi la tentative non validée dans le Parcours. */
      try{
        var attemptColor=st.belt.colorName||st.belt.ceinture||'';
        var attemptLabel=st.belt.label||'Calcul mental';
        var attemptPayload={
          type:'ceinture_tentee',
          matiere:'Maths',
          domaine:'Calcul mental',
          titre:'Ceinture '+attemptColor+' Maths — à reprendre',
          detail:attemptLabel+' — '+st.score+'/'+total+' — À reprendre',
          score:st.score,
          total:total,
          resultat:'a_reprendre',
          source:'ceinture_maths_tentative',
          ceinture:attemptColor,
          skillId:st.belt.skillId||'',
          skill_id:st.belt.skillId||'',
          belt:{colorName:attemptColor,ceinture:st.belt.ceinture||'',label:attemptLabel,skillId:st.belt.skillId||''},
          exercise_types:'math_belt_validation_'+st.belt.ceinture,
          help_used:0,
          challenge_score:st.score,
          challenge_total:total,
          mastery_status:'a_reprendre',
          learning_session_id:'ceinture-tentative-'+String(st.belt.skillId||'maths')+'-'+Date.now().toString(36),
          actionReelle:true,
          force:true
        };
        if(typeof window.hibouTrackEvent==='function'){
          window.hibouTrackEvent(attemptPayload);
        }else{
          try{console.error('[V25.8.70] Journal élève indisponible : tentative de ceinture Maths non tracée.',attemptPayload);}catch(ignore){}
        }
        try{window.dispatchEvent(new CustomEvent('hibou:track-event',{detail:attemptPayload}));}catch(ignore){}
        setTimeout(function(){
          try{if(typeof window.hibouRenderRecentEvent==='function')window.hibouRenderRecentEvent();}catch(ignore){}
        },80);
      }catch(e){try{console.warn('Tentative ceinture Maths non ajoutée au parcours',e);}catch(ignore){}}
    }
    setBeltInner('<div class="v190-belt-box"><h3>'+(medal?'🎉 Ceinture validée !':'🙂 Encore un peu d’entraînement')+'</h3>'+(medal?mathRewardHTML(st.belt):'')+'<div class="v190-score">'+st.score+' / '+total+'</div><div class="v190-medal">'+(medal||'💪')+'</div><div class="v190-rules">'+(medal?'Bravo ! Tu as obtenu ta ceinture '+esc(st.belt.colorName||st.belt.ceinture)+' ! Ta meilleure médaille est conservée.':'Tu peux réessayer la ceinture sans refaire les deux défis. Regarde la correction pour progresser.')+'</div>'+reviewHTML(st.answers)+'<button class="belt-btn secondary" onclick="window.__hibouMathBeltTestActiveV2574=false;openCompetenceValidation()">Retour aux ceintures</button></div>');
    if(typeof window.refreshV196MedalHeader==='function') setTimeout(window.refreshV196MedalHeader,100);
    if(typeof window.refreshV168BeltCounters==='function') setTimeout(window.refreshV168BeltCounters,120);
    if(typeof window.renderHibouProfile==='function') setTimeout(window.renderHibouProfile,150);
  }


  function installBeltCloseGuardV2574(){
    ['closeSkillValidationFullscreenV1861','closeSkillValidationFullscreenV1862'].forEach(function(name){
      var old=window[name];
      if(typeof old!=='function' || old.__hibouV2574CloseGuard) return;
      var wrapped=function(){
        window.__hibouMathBeltTestActiveV2574=false;
        if(beltAdvanceTimer){ clearTimeout(beltAdvanceTimer); beltAdvanceTimer=null; }
        return old.apply(this, arguments);
      };
      wrapped.__hibouV2574CloseGuard=true;
      window[name]=wrapped;
    });
  }
  installBeltCloseGuardV2574();

  window.__maitreHibouV25645MathsAudit = {
    version:'V25.7.79',
    entrainement:'correction affichée après chaque calcul',
    ceinture:'réponses enregistrées sans correction immédiate, correction complète en fin de test',
    delai_ceinture_maths:'40 ms + verrou anti-rerendu popup'
  };
  try{ document.title = '🦉 Maître Hibou V25.8.84'; }catch(e){}
})();
