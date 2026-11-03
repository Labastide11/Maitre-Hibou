
(function(){
  if(window.__maitreHibouV25224MathsFluid) return;
  window.__maitreHibouV25224MathsFluid = true;
  try{ document.title = '🦉 Maître Hibou V25.8.84'; }catch(e){}

  var TRAINING_COUNT = 10;
  var BLACK_SYNTHESIS_BELTS = ['blanche','jaune','orange','vert_clair','vert_fonce','bleu_clair','bleu_fonce','rose','beige','violet','marron','rouge','gris'];
  var BELTS = [
    {ceinture:'blanche', label:'Petits nombres', colorName:'Ceinture blanche'},
    {ceinture:'jaune', label:'Dizaines', colorName:'Ceinture jaune'},
    {ceinture:'orange', label:'Sans retenue', colorName:'Ceinture orange'},
    {ceinture:'vert_clair', label:'Avec retenue', colorName:'Ceinture vert clair'},
    {ceinture:'vert_fonce', label:'Complément à la dizaine', colorName:'Ceinture vert foncé'},
    {ceinture:'bleu_clair', label:'Ajouter / retrancher 9', colorName:'Ceinture bleu clair'},
    {ceinture:'bleu_fonce', label:'Ajouter / retrancher 11', colorName:'Ceinture bleu foncé'},
    {ceinture:'rose', label:'Centaines', colorName:'Ceinture rose'},
    {ceinture:'beige', label:'Complément à la centaine', colorName:'Ceinture beige'},
    {ceinture:'violet', label:'Tables 1, 2 et 10', colorName:'Ceinture violette'},
    {ceinture:'marron', label:'Tables 3, 4 et 5', colorName:'Ceinture marron'},
    {ceinture:'rouge', label:'Tables 6 et 7', colorName:'Ceinture rouge'},
    {ceinture:'gris', label:'Tables 8 et 9', colorName:'Ceinture grise'},
    {ceinture:'noir', label:'Ceinture noire — synthèse', colorName:'Mélange des compétences'}
  ];
  var state = {belt:null, questions:[], index:0, score:0, answers:[], startTime:0, elapsed:0, timer:null, busy:false};

  function byId(id){ return document.getElementById(id); }
  function esc(v){ return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c];}); }
  function norm(v){ return String(v==null?'':v).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,''); }
  function rnd(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
  function shuffle(a){ var arr=(a||[]).slice(); for(var i=arr.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=arr[i]; arr[i]=arr[j]; arr[j]=t; } return arr; }
  function fmt(ms){ var total=Math.max(0, Math.floor(ms/1000)); var m=Math.floor(total/60), s=total%60; return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0'); }
  function avgTime(ms,n){ return n ? (Math.round((ms/1000)/n)+' s') : '—'; }
  function findBelt(id){ id=norm(id); for(var i=0;i<BELTS.length;i++){ if(norm(BELTS[i].ceinture)===id) return BELTS[i]; } return BELTS[0]; }
  function optionsAround(answer){
    answer=Number(answer);
    var set=new Set([answer]);
    var deltas=shuffle([-20,-12,-10,-9,-5,-4,-3,-2,-1,1,2,3,4,5,9,10,12,20]);
    deltas.forEach(function(d){ if(set.size<4){ var v=answer+d; if(v>=0) set.add(v); }});
    while(set.size<4) set.add(answer + rnd(1,30));
    return shuffle(Array.from(set)).map(String);
  }
  function makeQ(expr, answer){
    var opts=optionsAround(answer);
    return {q:expr+' = ?', answer:Number(answer), options:opts, correct:opts.findIndex(function(o){ return Number(o)===Number(answer); })};
  }
  function genForBelt(id){
    var belt=norm(id);
    if(belt==='noir') return genForBelt(shuffle(BLACK_SYNTHESIS_BELTS)[0] || 'blanche');
    if(belt==='blanche'){
      var a=rnd(2,18), b=rnd(1,9), op=Math.random()<.55?'+':'-';
      if(op==='+') return makeQ(a+' + '+b, a+b);
      var x=Math.max(a,b), y=Math.min(a,b); return makeQ(x+' - '+y, x-y);
    }
    if(belt==='jaune'){
      var a2=rnd(10,89), d=[10,20,30,40,50][rnd(0,4)], add=Math.random()<.55;
      if(add && a2+d<=99) return makeQ(a2+' + '+d, a2+d);
      var x2=Math.max(a2,d+1); return makeQ(x2+' - '+d, x2-d);
    }
    if(belt==='orange'){
      var a3=rnd(11,79), b3=rnd(11,19);
      if(Math.random()<.55 && (a3%10)+(b3%10)<10 && a3+b3<100) return makeQ(a3+' + '+b3, a3+b3);
      var x3=rnd(30,99), y3=rnd(11,29); y3=Math.min(y3,x3-1); return makeQ(x3+' - '+y3, x3-y3);
    }
    if(belt==='vert_clair'){
      var a4=rnd(25,79), b4=rnd(16,48);
      if(Math.random()<.65 && a4+b4<120) return makeQ(a4+' + '+b4, a4+b4);
      var x4=rnd(45,120), y4=rnd(18,39); y4=Math.min(y4,x4-1); return makeQ(x4+' - '+y4, x4-y4);
    }
    if(belt==='vert_fonce'){ var t1=rnd(2,9)*10, m1=rnd(1,9); return makeQ((t1-m1)+' + ? vers '+t1, m1); }
    if(belt==='bleu_clair'){ var a5=rnd(20,99), add5=Math.random()<.5; return makeQ(a5+(add5?' + 9':' - 9'), add5?a5+9:a5-9); }
    if(belt==='bleu_fonce'){ var a6=rnd(20,99), add6=Math.random()<.5; return makeQ(a6+(add6?' + 11':' - 11'), add6?a6+11:a6-11); }
    if(belt==='rose'){
      var a7=rnd(100,900), b7=[100,200,300,400,500][rnd(0,4)], add7=Math.random()<.55;
      if(add7 && a7+b7<=1000) return makeQ(a7+' + '+b7, a7+b7);
      var x7=Math.max(a7,b7+100); return makeQ(x7+' - '+b7, x7-b7);
    }
    if(belt==='beige'){ var target=[100,200,300,400,500,600,700,800,900][rnd(0,8)], a8=target-rnd(1,99); return makeQ(a8+' + ? vers '+target, target-a8); }
    if(belt==='violet'){ var tv=[1,2,10][rnd(0,2)], nv=rnd(1,10); return makeQ(nv+' × '+tv, nv*tv); }
    if(belt==='marron'){ var tm=[3,4,5][rnd(0,2)], nm=rnd(1,10); return makeQ(nm+' × '+tm, nm*tm); }
    if(belt==='rouge'){ var tr=[6,7][rnd(0,1)], nr=rnd(1,10); return makeQ(nr+' × '+tr, nr*tr); }
    if(belt==='gris'){ var tg=[8,9][rnd(0,1)], ng=rnd(1,10); return makeQ(ng+' × '+tg, ng*tg); }
    return genForBelt('blanche');
  }
  function makeQuestions(id){ var arr=[]; for(var i=0;i<TRAINING_COUNT;i++) arr.push(genForBelt(id)); return arr; }
  function setInner(html){ var inner=byId('mathsPopupInnerV2343'); if(inner) inner.innerHTML=html; }
  function headerHTML(){
    return '<div class="maths-v2343-header"><div class="maths-v2343-owl">🦉</div><div class="maths-v2343-title"><h2>🧮 Entraînements de calcul</h2><p>Choisis une réponse, puis enchaîne sans attendre.</p><div class="maths-v2343-note">Correction complète à la fin : pas d’arrêt entre les calculs.</div></div></div>';
  }
  function clearTimer(){ if(state.timer){ clearInterval(state.timer); state.timer=null; } }
  function updateTimer(){
    if(!state.startTime) return;
    state.elapsed = Date.now() - state.startTime;
    var el=byId('mathsTimerValueV2343'); if(el) el.textContent=fmt(state.elapsed);
  }
  function startTimer(){ clearTimer(); state.startTime=Date.now(); state.elapsed=0; updateTimer(); state.timer=setInterval(updateTimer, 250); }
  function stopTimer(){ updateTimer(); clearTimer(); state.startTime=0; }

  var oldClose = window.closeMathsTrainingPopupV2343;
  window.closeMathsTrainingPopupV2343 = function(){ clearTimer(); if(typeof oldClose==='function') return oldClose.apply(this, arguments); var ov=byId('mathsTrainingOverlayV2343'); if(ov) ov.classList.add('hidden'); };

  window.startMathsTrainingV2343 = function(beltId){
    var belt=findBelt(beltId);
    state={belt:belt, questions:makeQuestions(belt.ceinture), index:0, score:0, answers:[], startTime:0, elapsed:0, timer:null, busy:false};
    startTimer();
    renderQuestion();
  };

  function renderQuestion(){
    var q=state.questions[state.index];
    if(!q) return renderResult();
    state.busy=false;
    var opts=(q.options||[]).map(function(opt,i){ return '<button type="button" class="maths-v2343-option" data-index="'+i+'" onclick="answerMathsTrainingV2343('+i+')">'+esc(opt)+'</button>'; }).join('');
    setInner(headerHTML()
      + '<div class="maths-v2343-content"><section class="maths-v2343-panel">'
      + '<div class="maths-v2343-training-head">'
      + '<button type="button" class="maths-v2343-back" onclick="if(!window.returnMHTrainingFromBelt||!window.returnMHTrainingFromBelt())renderMathsTrainingListV2343()">← Retour aux entraînements</button>'
      + '<div class="maths-v2343-training-title">'+esc(state.belt.label)+'<br><small>'+esc(state.belt.colorName)+'</small></div>'
      + '<div class="maths-v2343-timer">⏱ <span id="mathsTimerValueV2343">'+fmt(state.elapsed)+'</span></div>'
      + '</div>'
      + '<div class="maths-v2343-progress">Calcul '+(state.index+1)+' / '+state.questions.length+'</div>'
      + '<div class="maths-v25224-subtle">Pas de correction pendant l’entraînement : on garde le rythme.</div>'
      + '<div class="maths-v2343-question">'+esc(q.q)+'</div>'
      + '<div class="maths-v2343-options">'+opts+'</div>'
      + '</section></div>');
    updateTimer();
  }

  window.answerMathsTrainingV2343 = function(i){
    if(state.busy) return;
    state.busy=true;
    i=Number(i);
    var q=state.questions[state.index];
    if(!q) return renderResult();
    var correct=Number(q.correct);
    var chosenText=(q.options||[])[i];
    var correctText=(q.options||[])[correct];
    var ok=i===correct;
    if(ok) state.score++;
    state.answers.push({q:q.q, chosen:chosenText, correct:correctText, ok:ok});
    state.index++;
    if(state.index >= state.questions.length){ stopTimer(); renderResult(); }
    else renderQuestion();
  };

  function renderReview(){
    var rows = '<div class="maths-v25224-review-row head"><span>N°</span><span>Calcul</span><span>Réponse</span><span>Correction</span><span></span></div>';
    rows += state.answers.map(function(a,i){
      return '<div class="maths-v25224-review-row '+(a.ok?'ok':'ko')+'">'
        + '<span>'+(i+1)+'</span>'
        + '<span>'+esc(a.q)+'</span>'
        + '<span class="'+(a.ok?'maths-v25224-ok':'maths-v25224-ko')+'">'+esc(a.chosen)+'</span>'
        + '<span>'+esc(a.correct)+'</span>'
        + '<span class="'+(a.ok?'maths-v25224-ok':'maths-v25224-ko')+'">'+(a.ok?'✅':'❌')+'</span>'
        + '</div>';
    }).join('');
    return '<div class="maths-v25224-review">'+rows+'</div>';
  }
  function renderResult(){
    stopTimer();
    var total=state.questions.length || TRAINING_COUNT;
    var scoreText='Score '+state.score+' / '+total+' en '+fmt(state.elapsed);
    setInner(headerHTML()
      + '<div class="maths-v2343-content"><section class="maths-v2343-panel">'
      + '<div class="maths-v2343-result">'
      + '<h3>Bravo, entraînement terminé !</h3>'
      + '<div class="maths-v2343-score-grid">'
      + '<div class="maths-v2343-score-card">Score<b>'+state.score+' / '+total+'</b></div>'
      + '<div class="maths-v2343-score-card">Temps total<b>'+fmt(state.elapsed)+'</b></div>'
      + '<div class="maths-v2343-score-card">Moyenne<b>'+avgTime(state.elapsed,total)+'</b></div>'
      + '</div>'
      + '<div class="maths-v2343-record">🦉 Correction des 10 calculs</div>'
      + renderReview()
      + '<div class="maths-v2343-actions">'
      + '<button type="button" class="maths-v2343-action" onclick="startMathsTrainingV2343(\''+esc(state.belt.ceinture)+'\')">🧮 Refaire 10 calculs</button>'
      + '<button type="button" class="maths-v2343-action secondary" onclick="if(!window.returnMHTrainingFromBelt||!window.returnMHTrainingFromBelt())renderMathsTrainingListV2343()">← Retour aux entraînements</button>'
      + '<button type="button" class="maths-v2343-action secondary" onclick="if(!window.returnMHTrainingFromBelt||!window.returnMHTrainingFromBelt())closeMathsTrainingPopupV2343()">Fermer</button>'
      + '</div></div></section></div>');
    try{
      if(window.hibouRecordTrainingSuccessV25221) window.hibouRecordTrainingSuccessV25221('maths', state.belt.label, scoreText);
      else if(window.hibouRecordTrainingSuccessV25220) window.hibouRecordTrainingSuccessV25220('maths', state.belt.label, scoreText);
    }catch(e){}
  }

  window.__maitreHibouV25224MathsFluidAudit = {
    version:'V25.4.0',
    diagnostic:'Les pauses de correction et le délai automatique après chaque calcul ont été supprimés.',
    fonctionnement:'L’élève clique, le calcul suivant apparaît immédiatement. La correction complète apparaît seulement à la fin.',
    source:'Calculs générés localement pour éviter les lenteurs Google Sheets pendant l’entraînement.'
  };
})();
