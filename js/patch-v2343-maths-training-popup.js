
(function(){
  if(window.__maitreHibouMathsTrainingV2343) return;
  window.__maitreHibouMathsTrainingV2343 = true;

  const SHEET_URL = "https://script.google.com/macros/s/AKfycbyzfRPrUV7xKgeXUM0LjbOsOne5DieRjDYxmuVbBBUIGL-F9ahMmJZSfpUDYmBaZIOpvQ/exec?matiere=Maths";
  const CACHE_KEY = "hibou_v222_questions_maths_cache";
  const CACHE_MAX_AGE_MS = 1000 * 60 * 60 * 24; // V25.4.0 : cache 24h pour ouvrir les calculs plus vite
  const FETCH_TIMEOUT_MS = 1800; // au-delà, on bascule sur le cache ou le générateur local
  const RECORD_PREFIX = "hibou_v2343_maths_training_record_";
  const TRAINING_COUNT = 10;
  const BLACK_SYNTHESIS_BELTS = ["blanche","jaune","orange","vert_clair","vert_fonce","bleu_clair","bleu_fonce","rose","beige","violet","marron","rouge","gris"];

  const FALLBACK_BELTS = [
    {ceinture:"blanche", niveau:1, emoji:"⚪", color:"#F8F8FF", border:"#D8D4FF", label:"Petits nombres", colorName:"Ceinture blanche"},
    {ceinture:"jaune", niveau:2, emoji:"🟡", color:"#FFD93D", border:"#FFD93D", label:"Dizaines", colorName:"Ceinture jaune"},
    {ceinture:"orange", niveau:3, emoji:"🟠", color:"#FF9B42", border:"#FFB067", label:"Sans retenue", colorName:"Ceinture orange"},
    {ceinture:"vert_clair", niveau:4, emoji:"🟢", color:"#8BE28B", border:"#B8F0B8", label:"Avec retenue", colorName:"Ceinture vert clair"},
    {ceinture:"vert_fonce", niveau:5, emoji:"🟢", color:"#229E45", border:"#B8F0B8", label:"Complément à la dizaine", colorName:"Ceinture vert foncé"},
    {ceinture:"bleu_clair", niveau:6, emoji:"🔵", color:"#8FD4FF", border:"#BDE8FF", label:"Ajouter / retrancher 9", colorName:"Ceinture bleu clair"},
    {ceinture:"bleu_fonce", niveau:7, emoji:"🔵", color:"#2176FF", border:"#BDE8FF", label:"Ajouter / retrancher 11", colorName:"Ceinture bleu foncé"},
    {ceinture:"rose", niveau:8, emoji:"🌸", color:"#FF9DD2", border:"#FFD0E8", label:"Centaines", colorName:"Ceinture rose"},
    {ceinture:"beige", niveau:9, emoji:"🟫", color:"#E2C69D", border:"#F0DEC2", label:"Complément à la centaine", colorName:"Ceinture beige"},
    {ceinture:"violet", niveau:10, emoji:"🟣", color:"#9C4DFF", border:"#DFC7FF", label:"Tables 1, 2 et 10", colorName:"Ceinture violette"},
    {ceinture:"marron", niveau:11, emoji:"🟤", color:"#9A6A3A", border:"#E1C7AB", label:"Tables 3, 4 et 5", colorName:"Ceinture marron"},
    {ceinture:"rouge", niveau:12, emoji:"🔴", color:"#FF3B57", border:"#FFD3DA", label:"Tables 6 et 7", colorName:"Ceinture rouge"},
    {ceinture:"gris", niveau:13, emoji:"⚙️", color:"#A8A8B8", border:"#DCDCE8", label:"Tables 8 et 9", colorName:"Ceinture grise"},
    {ceinture:"noir", niveau:14, emoji:"⚫", color:"#222633", border:"#C8C8D4", label:"Ceinture noire — synthèse", colorName:"Mélange des compétences de la blanche à la marron"}
  ];

  let state = {
    belt:null,
    questions:[],
    index:0,
    score:0,
    startTime:0,
    elapsed:0,
    timer:null,
    timerRaf:null,
    timerInterval:null,
    autoAdvance:null,
    answered:false
  };
  let mathsRowsCache = null;
  let mathsRowsLoadingPromise = null;

  function byId(id){ return document.getElementById(id); }
  function esc(v){
    return String(v == null ? "" : v).replace(/[&<>"']/g,function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c];
    });
  }
  function norm(v){
    return String(v == null ? "" : v).trim().toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
      .replace(/[’']/g,"")
      .replace(/[^a-z0-9]+/g,"_")
      .replace(/^_+|_+$/g,"");
  }
  function studentKey(){
    let name = "eleve";
    try{
      name = window.prenomActuel || localStorage.getItem("hibou_prenom") || localStorage.getItem("hibou_last_prenom") || localStorage.getItem("maitreHibouCurrentStudent") || "eleve";
    }catch(e){}
    return norm(name || "eleve");
  }
  function allBelts(){
    const source = Array.isArray(window.MATH_BELTS_V222) && window.MATH_BELTS_V222.length ? window.MATH_BELTS_V222 : FALLBACK_BELTS;
    const fallbackMap = {};
    FALLBACK_BELTS.forEach(function(b){ fallbackMap[b.ceinture]=b; });
    return source.map(function(b){
      const fb = fallbackMap[b.ceinture] || {};
      return {
        ceinture:b.ceinture,
        niveau:b.niveau || fb.niveau || 1,
        emoji:b.emoji || fb.emoji || "🧮",
        color:fb.color || "#EAE8FF",
        border:fb.border || "#EAE8FF",
        label:b.label || fb.label || b.competence || b.ceinture,
        colorName:(b.ceinture === "noir") ? "Mélange des compétences de la blanche à la marron" : (fb.colorName || ("Ceinture " + (b.colorName || b.ceinture))),
        competence:b.competence || fb.label || "",
        skillId:b.skillId || ("maths_"+b.ceinture)
      };
    }).sort(function(a,b){ return (a.niveau||0)-(b.niveau||0); });
  }
  function findBelt(id){
    return allBelts().find(function(b){ return norm(b.ceinture) === norm(id) || norm(b.skillId) === norm(id); }) || allBelts()[0];
  }
  function fmt(ms){
    ms = Math.max(0, Number(ms||0));
    const total = Math.floor(ms/1000);
    const m = Math.floor(total/60);
    const s = total%60;
    return String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0");
  }
  function avgTime(ms, n){
    if(!n) return "—";
    return Math.round((ms/1000)/n) + " s";
  }
  function clearAutoAdvance(){
    if(state.autoAdvance){ clearTimeout(state.autoAdvance); state.autoAdvance = null; }
  }
  function updateTimerDisplayV2343(){
    if(!state.startTime) return;
    state.elapsed = Date.now() - state.startTime;
    const el = byId("mathsTimerValueV2343");
    if(el) el.textContent = fmt(state.elapsed);
  }
  function clearTimer(){
    if(state.timer){ clearInterval(state.timer); state.timer = null; }
    if(state.timerInterval){ clearInterval(state.timerInterval); state.timerInterval = null; }
    if(state.timerRaf && typeof cancelAnimationFrame === "function"){ cancelAnimationFrame(state.timerRaf); state.timerRaf = null; }
  }
  function tickTimerV2343(){
    updateTimerDisplayV2343();
  }
  function startTimer(){
    clearTimer();
    state.startTime = Date.now();
    state.elapsed = 0;
    updateTimerDisplayV2343();
    // V25.4.0 : un seul intervalle suffit. L'ancien requestAnimationFrame mettait à jour le DOM ~60 fois/s.
    state.timerInterval = setInterval(updateTimerDisplayV2343, 250);
  }
  function stopTimer(){
    updateTimerDisplayV2343();
    clearTimer();
  }
  function overlay(){
    let ov = byId("mathsTrainingOverlayV2343");
    if(ov) return ov;
    ov = document.createElement("div");
    ov.id = "mathsTrainingOverlayV2343";
    ov.className = "hidden";
    ov.setAttribute("role","dialog");
    ov.setAttribute("aria-modal","true");
    ov.innerHTML =
      '<div class="maths-v2343-popup">'
      + '<div class="maths-v2343-topbar">'
      + '<div class="maths-v2343-chip">🧮 Maths</div>'
      + '<button class="maths-v2343-close" type="button" onclick="if(!window.returnMHTrainingFromBelt||!window.returnMHTrainingFromBelt())closeMathsTrainingPopupV2343()" aria-label="Fermer la popup Maths">×</button>'
      + '</div>'
      + '<div id="mathsPopupInnerV2343"></div>'
      + '</div>';
    document.body.appendChild(ov);
    ov.addEventListener("click", function(ev){
      if(ev.target === ov) closeMathsTrainingPopupV2343();
    });
    return ov;
  }
  function setInner(html){
    const inner = byId("mathsPopupInnerV2343");
    if(inner) inner.innerHTML = html;
  }
  function lockPage(lock){
    document.documentElement.style.overflow = lock ? "hidden" : "";
    document.body.style.overflow = lock ? "hidden" : "";
  }
  function hideOldMathsUI(){
    const panel = byId("v2173ActivitiesPanel");
    if(panel){ panel.classList.remove("open"); panel.innerHTML = ""; panel.dataset.subject = ""; }
    const q = byId("quickQuestions");
    if(q){ q.style.display = "none"; q.style.visibility = "hidden"; q.innerHTML = ""; }
    document.querySelectorAll(".subject-btn").forEach(function(b){ b.classList.remove("active"); b.setAttribute("aria-expanded","false"); });
    document.querySelectorAll('.subject-btn[data-subject="maths"]').forEach(function(b){ b.classList.add("active"); b.setAttribute("aria-expanded","true"); });
  }

  window.openMathsTrainingPopupV2343 = function(){
    hideOldMathsUI();
    const ov = overlay();
    ov.classList.remove("hidden");
    lockPage(true);
    renderList();
    try{ setTimeout(function(){ if(typeof window.preloadMathsRowsV2343 === "function") window.preloadMathsRowsV2343(); }, 80); }catch(e){}
  };
  window.closeMathsTrainingPopupV2343 = function(){
    clearAutoAdvance();
    stopTimer();
    const ov = overlay();
    ov.classList.add("hidden");
    lockPage(false);
  };

  function headerHTML(){
    return '<div class="maths-v2343-header">'
      + '<div class="maths-v2343-owl">🦉</div>'
      + '<div class="maths-v2343-title">'
      + '<h2>🧮 Entraînements de calcul</h2>'
      + '<p>Choisis une ceinture pour t’entraîner.</p>'
      + '<div class="maths-v2343-note">Le passage officiel se fait dans « Valider une compétence ».</div>'
      + '</div>'
      + '</div>';
  }
  function renderList(){
    clearAutoAdvance();
    stopTimer();
    const rows = allBelts().map(function(b){
      return '<article class="maths-v2343-belt-card">'
        + '<div class="maths-v2343-dot" style="--belt-color:'+esc(b.color)+';border-color:'+esc(b.border)+'"></div>'
        + '<div class="maths-v2343-belt-main"><strong>'+esc(b.label)+'</strong><span>'+esc(b.colorName)+'</span></div>'
        + '<button type="button" class="maths-v2343-train-btn" onclick="startMathsTrainingV2343(\''+esc(b.ceinture)+'\')">🧮 S’entraîner — 10 calculs</button>'
        + '</article>';
    }).join("");
    setInner(headerHTML()
      + '<div class="maths-v2343-content"><section class="maths-v2343-panel">'
      + '<h3 class="maths-v2343-panel-title">Maths</h3>'
      + '<div class="maths-v2343-list">'+rows+'</div>'
      + '</section></div>');
  }
  window.renderMathsTrainingListV2343 = renderList;

  function readCell(row, names, index){
    if(Array.isArray(row)) return row[index] == null ? "" : row[index];
    for(let i=0;i<names.length;i++){
      const n = names[i];
      if(row && row[n] != null && String(row[n]).trim() !== "") return row[n];
    }
    return "";
  }
  function shuffle(a){
    const arr = (a||[]).slice();
    for(let i=arr.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }
  function safeEvalQuestion(q){
    const s = String(q||"").replace(/×/g,"*").replace(/x/g,"*").replace(/:/g,"/").replace(/=/g,"").replace(/[^\d+\-*/(). ]/g,"").trim();
    if(!s || !/^[\d+\-*/(). ]+$/.test(s)) return null;
    try{
      const val = Function('"use strict";return ('+s+')')();
      return Number.isFinite(val) ? Math.round(val) : null;
    }catch(e){ return null; }
  }
  function optionsAround(answer){
    answer = Number(answer);
    const set = new Set([answer]);
    const deltas = shuffle([-12,-10,-9,-5,-4,-3,-2,-1,1,2,3,4,5,9,10,12,20]);
    for(const d of deltas){
      if(set.size >= 4) break;
      const v = answer + d;
      if(v >= 0) set.add(v);
    }
    while(set.size < 4) set.add(answer + Math.floor(Math.random()*30)+1);
    return shuffle(Array.from(set)).map(String);
  }
  function rowToQuestion(row){
    const q = String(readCell(row,["question","Question"],5)).trim();
    if(!q) return null;
    let options = [
      readCell(row,["A","a"],6),
      readCell(row,["B","b"],7),
      readCell(row,["C","c"],8),
      readCell(row,["D","d"],9)
    ].filter(function(v){ return v != null && String(v).trim() !== ""; }).map(function(v){ return String(v).trim(); });
    let answerRaw = String(readCell(row,["reponse","réponse","Reponse","Réponse"],10)).trim();
    let correct = -1;
    if(/^[ABCD]$/i.test(answerRaw)) correct = "ABCD".indexOf(answerRaw.toUpperCase());
    if(correct < 0) correct = options.findIndex(function(o){ return norm(o) === norm(answerRaw); });
    if(options.length < 2){
      const computed = safeEvalQuestion(q);
      if(computed != null){
        answerRaw = String(computed);
        options = optionsAround(computed);
        correct = options.findIndex(function(o){ return String(o) === String(computed); });
      }
    }
    if(correct < 0 && answerRaw){
      options.push(answerRaw);
      options = Array.from(new Set(options));
      while(options.length < 4){
        const n = Number(answerRaw);
        options.push(String(Number.isFinite(n) ? n + options.length + 1 : options.length + 1));
        options = Array.from(new Set(options));
      }
      options = shuffle(options).slice(0,4);
      correct = options.findIndex(function(o){ return norm(o) === norm(answerRaw); });
    }
    if(!options.length || correct < 0) return null;
    const correctValue = options[correct];
    const shuffled = shuffle(options);
    return {
      q:q.replace(/\s*[.…_]+\s*$/," ?"),
      options:shuffled,
      correct:shuffled.findIndex(function(o){ return norm(o) === norm(correctValue); })
    };
  }
  function rowCeinture(row){ return norm(readCell(row,["ceinture","Ceinture"],0)); }
  function getCachedRows(maxAge){
    try{
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
      if(!cached || !Array.isArray(cached.rows)) return null;
      const age = Date.now() - Number(cached.date || 0);
      if(maxAge === Infinity || age <= maxAge) return cached.rows;
    }catch(e){}
    return null;
  }
  async function loadRows(force){
    if(!force && mathsRowsCache) return mathsRowsCache;
    const freshCache = getCachedRows(CACHE_MAX_AGE_MS);
    if(!force && freshCache){ mathsRowsCache = freshCache; return mathsRowsCache; }
    if(!force && mathsRowsLoadingPromise) return mathsRowsLoadingPromise;

    const job = (async function(){
      const oldCache = getCachedRows(Infinity) || [];
      const controller = (typeof AbortController !== "undefined") ? new AbortController() : null;
      const timer = controller ? setTimeout(function(){ try{ controller.abort(); }catch(e){} }, FETCH_TIMEOUT_MS) : null;
      try{
        const res = await fetch(SHEET_URL + "&mhcache=maths_v25217", {
          cache:"force-cache",
          signal: controller ? controller.signal : undefined
        });
        if(!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        const rows = Array.isArray(data) ? data : (Array.isArray(data.rows) ? data.rows : (Array.isArray(data.data) ? data.data : []));
        if(rows.length){
          mathsRowsCache = rows;
          try{ localStorage.setItem(CACHE_KEY, JSON.stringify({date:Date.now(), rows:rows})); }catch(e){}
          return rows;
        }
      }catch(e){
        console.warn("Maître Hibou Maths : Sheet indisponible ou trop lent, utilisation du cache ou du générateur local.", e);
      }finally{
        if(timer) clearTimeout(timer);
      }
      mathsRowsCache = oldCache;
      return oldCache;
    })();

    if(!force) mathsRowsLoadingPromise = job;
    try{ return await job; }
    finally{ if(mathsRowsLoadingPromise === job) mathsRowsLoadingPromise = null; }
  }
  window.preloadMathsRowsV2343 = function(){
    try{
      if(mathsRowsCache) return Promise.resolve(mathsRowsCache);
      const cached = getCachedRows(CACHE_MAX_AGE_MS);
      if(cached){ mathsRowsCache = cached; return Promise.resolve(mathsRowsCache); }
      return loadRows(false).catch(function(e){ console.warn("Préchargement maths impossible", e); return null; });
    }catch(e){ return Promise.resolve(null); }
  };
  window.refreshMathsRowsV2343 = function(){
    mathsRowsCache = null;
    mathsRowsLoadingPromise = null;
    try{ localStorage.removeItem(CACHE_KEY); }catch(e){}
    return loadRows(true);
  };

  function rnd(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
  function makeQ(expr, answer){ const opts = optionsAround(answer); return {q:expr+" = ?", options:opts, correct:opts.findIndex(function(o){return Number(o)===Number(answer);})}; }
  function genForBelt(id){
    const belt = norm(id);
    if(belt === "noir"){
      const ids = shuffle(BLACK_SYNTHESIS_BELTS);
      return genForBelt(ids[0] || "blanche");
    }
    if(belt === "blanche"){
      const a=rnd(2,18), b=rnd(1,9), op=Math.random()<.55?"+":"-";
      if(op==="+") return makeQ(a+" + "+b, a+b);
      const x=Math.max(a,b), y=Math.min(a,b); return makeQ(x+" - "+y, x-y);
    }
    if(belt === "jaune"){
      const a=rnd(10,89), d=[10,20,30,40,50][rnd(0,4)], add=Math.random()<.55;
      if(add && a+d<=99) return makeQ(a+" + "+d, a+d);
      const x=Math.max(a,d+1); return makeQ(x+" - "+d, x-d);
    }
    if(belt === "orange"){
      const a=rnd(11,79), b=rnd(11,19);
      if(Math.random()<.55 && (a%10)+(b%10)<10 && a+b<100) return makeQ(a+" + "+b, a+b);
      const x=rnd(30,99), y=rnd(11,29); return makeQ(x+" - "+Math.min(y,x-1), x-Math.min(y,x-1));
    }
    if(belt === "vert_clair"){
      const a=rnd(25,79), b=rnd(16,48);
      if(Math.random()<.65 && a+b<120) return makeQ(a+" + "+b, a+b);
      const x=rnd(45,120), y=rnd(18,39); return makeQ(x+" - "+Math.min(y,x-1), x-Math.min(y,x-1));
    }
    if(belt === "vert_fonce"){
      const a=rnd(1,9), d=rnd(2,9)*10; return makeQ(d-a+" + ? vers "+d, a);
    }
    if(belt === "bleu_clair"){
      const a=rnd(20,99), add=Math.random()<.5; return makeQ(a+(add?" + 9":" - 9"), add?a+9:a-9);
    }
    if(belt === "bleu_fonce"){
      const a=rnd(20,99), add=Math.random()<.5; return makeQ(a+(add?" + 11":" - 11"), add?a+11:a-11);
    }
    if(belt === "rose"){
      const a=rnd(100,900), b=[100,200,300,400,500][rnd(0,4)], add=Math.random()<.55;
      if(add && a+b<=1000) return makeQ(a+" + "+b, a+b);
      const x=Math.max(a,b+100); return makeQ(x+" - "+b, x-b);
    }
    if(belt === "beige"){
      const target=[100,200,300,400,500,600,700,800,900][rnd(0,8)];
      const a=target-rnd(1,99); return makeQ(a+" + ? vers "+target, target-a);
    }
    if(belt === "violet"){
      const t=[1,2,10][rnd(0,2)], n=rnd(1,10); return makeQ(n+" × "+t, n*t);
    }
    if(belt === "marron"){
      const t=[3,4,5][rnd(0,2)], n=rnd(1,10); return makeQ(n+" × "+t, n*t);
    }
    if(belt === "rouge"){
      const t=[6,7][rnd(0,1)], n=rnd(1,10); return makeQ(n+" × "+t, n*t);
    }
    if(belt === "gris"){
      const t=[8,9][rnd(0,1)], n=rnd(1,10); return makeQ(n+" × "+t, n*t);
    }
    return genForBelt("blanche");
  }
  function fallbackQuestions(beltId, count){
    const arr = [];
    for(let i=0;i<count;i++) arr.push(genForBelt(beltId));
    return arr;
  }
  async function questionsForBelt(belt){
    const rows = await loadRows();
    const id = norm(belt.ceinture);
    let candidates = [];
    if(id === "noir"){
      const allowed = BLACK_SYNTHESIS_BELTS.map(norm);
      candidates = rows.filter(function(r){ return allowed.includes(rowCeinture(r)); });
    }else{
      candidates = rows.filter(function(r){ return rowCeinture(r) === id; });
    }
    let bank = shuffle(candidates.map(rowToQuestion).filter(Boolean));
    if(bank.length < TRAINING_COUNT){
      bank = bank.concat(fallbackQuestions(id, TRAINING_COUNT - bank.length));
    }
    return shuffle(bank).slice(0, TRAINING_COUNT);
  }

  window.startMathsTrainingV2343 = async function(beltId){
    const belt = findBelt(beltId);
    state.belt = belt;
    state.questions = [];
    state.index = 0;
    state.score = 0;
    state.answered = false;
    clearAutoAdvance();
    setInner(headerHTML()
      + '<div class="maths-v2343-content"><section class="maths-v2343-panel">'
      + '<div class="maths-v2343-loading">🦉 Préparation de 10 calculs...</div>'
      + '</section></div>');
    try{
      state.questions = await questionsForBelt(belt);
    }catch(e){
      console.warn("Maître Hibou Maths : génération locale utilisée.", e);
      state.questions = fallbackQuestions(belt.ceinture, TRAINING_COUNT);
    }
    state.index = 0;
    state.score = 0;
    startTimer();
    renderQuestion();
  };
  function renderQuestion(){
    const q = state.questions[state.index];
    if(!q){ renderResult(); return; }
    state.answered = false;
    const opts = (q.options || []).map(function(opt, i){
      return '<button type="button" class="maths-v2343-option" data-index="'+i+'" onclick="answerMathsTrainingV2343('+i+')">'+esc(opt)+'</button>';
    }).join("");
    setInner(headerHTML()
      + '<div class="maths-v2343-content"><section class="maths-v2343-panel">'
      + '<div class="maths-v2343-training-head">'
      + '<button type="button" class="maths-v2343-back" onclick="if(!window.returnMHTrainingFromBelt||!window.returnMHTrainingFromBelt())renderMathsTrainingListV2343()">← Retour aux entraînements</button>'
      + '<div class="maths-v2343-training-title">'+esc(state.belt.label)+'<br><small>'+esc(state.belt.colorName)+'</small></div>'
      + '<div class="maths-v2343-timer">⏱ <span id="mathsTimerValueV2343">'+fmt(state.elapsed)+'</span></div>'
      + '</div>'
      + '<div class="maths-v2343-progress">Calcul '+(state.index+1)+' / '+state.questions.length+'</div>'
      + '<div class="maths-v2343-question">'+esc(q.q)+'</div>'
      + '<div class="maths-v2343-options">'+opts+'</div>'
      + '<div id="mathsFeedbackV2343" class="maths-v2343-feedback"></div>'
      + '</section></div>');
    updateTimerDisplayV2343();
  }
  function goNextMathsTrainingV2343(){
    clearAutoAdvance();
    state.index++;
    if(state.index >= state.questions.length) renderResult();
    else renderQuestion();
  }
  window.nextMathsTrainingV2343 = goNextMathsTrainingV2343;
  window.answerMathsTrainingV2343 = function(i){
    if(state.answered) return;
    state.answered = true;
    clearAutoAdvance();
    updateTimerDisplayV2343();
    // V25.4.0 : si c'est le dernier calcul, on fige le chrono au moment exact de la réponse.
    // Le court délai d'affichage de la correction ne doit pas être ajouté au temps final.
    const isLastMathsQuestionV25218 = state.index >= (state.questions.length - 1);
    if(isLastMathsQuestionV25218){
      clearTimer();
      state.startTime = 0;
    }
    const q = state.questions[state.index];
    const buttons = document.querySelectorAll(".maths-v2343-option");
    buttons.forEach(function(btn){ btn.disabled = true; });
    const good = Number(i) === Number(q.correct);
    if(good) state.score++;
    buttons.forEach(function(btn){
      const idx = Number(btn.getAttribute("data-index"));
      if(idx === Number(q.correct)) btn.classList.add("correct");
      else if(idx === Number(i)) btn.classList.add("wrong");
    });
    const fb = byId("mathsFeedbackV2343");
    if(fb){
      fb.innerHTML = (good ? "✅ Bien joué !" : "🦉 Regarde la bonne réponse.")
        + '<br><span style="display:inline-block;margin-top:6px;font-weight:900;color:#6C63A8;">'
        + (isLastMathsQuestionV25218 ? 'Résultat de l’entraînement…' : 'Calcul suivant automatique…')
        + '</span>';
    }
    state.autoAdvance = setTimeout(goNextMathsTrainingV2343, isLastMathsQuestionV25218 ? 550 : (good ? 650 : 1100));
  };
  function recordKey(belt){ return RECORD_PREFIX + studentKey() + "_" + norm(belt.ceinture); }
  function loadRecord(belt){
    try{ return JSON.parse(localStorage.getItem(recordKey(belt)) || "null"); }catch(e){ return null; }
  }
  function saveRecord(belt, data){
    try{ localStorage.setItem(recordKey(belt), JSON.stringify(data)); }catch(e){}
  }
  function renderResult(){
    stopTimer();
    const total = state.questions.length || TRAINING_COUNT;
    const previous = loadRecord(state.belt);
    let recordText = "Continue : ton prochain défi est de garder la précision en allant un peu plus vite.";
    let isNew = false;
    if(!previous || state.score > Number(previous.score||0) || (state.score === Number(previous.score||0) && state.elapsed < Number(previous.time||Infinity))){
      saveRecord(state.belt, {score:state.score, total:total, time:state.elapsed, date:new Date().toISOString()});
      isNew = true;
      recordText = "🏁 Nouveau record personnel pour cette ceinture !";
    }else if(previous){
      recordText = "🏁 Record actuel : " + previous.score + "/" + previous.total + " en " + fmt(previous.time) + ".";
    }
    setInner(headerHTML()
      + '<div class="maths-v2343-content"><section class="maths-v2343-panel">'
      + '<div class="maths-v2343-result">'
      + '<h3>Bravo, entraînement terminé !</h3>'
      + '<div class="maths-v2343-score-grid">'
      + '<div class="maths-v2343-score-card">Score<b>'+state.score+' / '+total+'</b></div>'
      + '<div class="maths-v2343-score-card">Temps total<b>'+fmt(state.elapsed)+'</b></div>'
      + '<div class="maths-v2343-score-card">Moyenne<b>'+avgTime(state.elapsed,total)+'</b></div>'
      + '</div>'
      + '<div class="maths-v2343-record">'+esc(recordText)+'</div>'
      + '<div class="maths-v2343-actions">'
      + '<button type="button" class="maths-v2343-action" onclick="startMathsTrainingV2343(\''+esc(state.belt.ceinture)+'\')">🧮 Refaire 10 calculs</button>'
      + '<button type="button" class="maths-v2343-action secondary" onclick="if(!window.returnMHTrainingFromBelt||!window.returnMHTrainingFromBelt())renderMathsTrainingListV2343()">← Retour aux entraînements</button>'
      + '<button type="button" class="maths-v2343-action secondary" onclick="if(!window.returnMHTrainingFromBelt||!window.returnMHTrainingFromBelt())closeMathsTrainingPopupV2343()">Fermer</button>'
      + '</div>'
      + '<div class="maths-v2343-note">Le temps sert à progresser, pas à te mettre la pression.</div>'
      + '</div>'
      + '</section></div>');
    try{
      var mhLabel = (state.belt && (state.belt.label || state.belt.colorName || state.belt.ceinture)) || 'calcul mental';
      var mhScore = 'Score ' + state.score + ' / ' + total + ' en ' + fmt(state.elapsed);
      if(window.hibouRecordTrainingSuccessV25220) window.hibouRecordTrainingSuccessV25220('maths', mhLabel, mhScore);
      else if(window.hibouRecordTrainingSuccessV25219) window.hibouRecordTrainingSuccessV25219('maths', mhLabel, mhScore);
      else if(window.hibouRecordSuccessV25220) window.hibouRecordSuccessV25220('🧮 Entraînement maths : ' + mhLabel + ' — ' + mhScore, 'entrainement');
    }catch(e){}
  }

  function interceptMathsClick(ev){
    const target = ev.target && ev.target.closest && ev.target.closest('.subject-btn[data-subject="maths"], button[data-subject="maths"], [onclick*="maths"]');
    if(!target) return;
    if(target.closest && target.closest("#mathsTrainingOverlayV2343")) return;
    const isSubject = target.matches && (target.matches('.subject-btn[data-subject="maths"]') || target.getAttribute('data-subject') === 'maths');
    if(!isSubject) return;
    ev.preventDefault();
    ev.stopPropagation();
    if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    window.openMathsTrainingPopupV2343();
  }
  document.addEventListener("click", interceptMathsClick, true);
  const previousSelectSubjectV2343 = window.selectSubject;
  if(typeof previousSelectSubjectV2343 === "function"){
    window.selectSubject = function(btn, subject){
      if(norm(subject) === "maths"){
        window.openMathsTrainingPopupV2343();
        return false;
      }
      return previousSelectSubjectV2343.apply(this, arguments);
    };
  }
  function patchMathsButtons(){
    document.querySelectorAll('.subject-btn[data-subject="maths"]').forEach(function(btn){
      btn.setAttribute("aria-label","Maths : ouvrir les entraînements de calcul");
      btn.setAttribute("title","Maths : ouvrir les entraînements de calcul");
    });
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", patchMathsButtons);
  else patchMathsButtons();
  window.addEventListener("load", function(){ [0,100,350,900,1800,3500].forEach(function(ms){ setTimeout(patchMathsButtons, ms); }); });
})();
