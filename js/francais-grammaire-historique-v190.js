
(function(){
  if(window.__hibouV190GoogleSheetsGrammarBelts) return;
  window.__hibouV190GoogleSheetsGrammarBelts = true;

  const QUESTION_SHEET_URL = "https://script.google.com/macros/s/AKfycbyzfRPrUV7xKgeXUM0LjbOsOne5DieRjDYxmuVbBBUIGL-F9ahMmJZSfpUDYmBaZIOpvQ/exec?matiere=Grammaire";
  const QUESTIONS_CACHE_KEY = "hibou_v190_questions_grammaire_cache";
  const PROGRESS_PREFIX = "hibou_v168_progress_";
  const BELT_BACKUP_KEY = "hibou_v168_belts_global";

  const GRAMMAR_BELTS_V190 = [
    {ceinture:"blanche", niveau:1, emoji:"⚪", colorName:"blanche", skillId:"grammaire_blanche_phrase_negative", competence:"phrase_negative", label:"Phrase affirmative / négative"},
    {ceinture:"jaune", niveau:2, emoji:"🟡", colorName:"jaune", skillId:"grammaire_jaune_verbe", competence:"verbe", label:"Trouver le verbe"},
    {ceinture:"orange", niveau:3, emoji:"🟠", colorName:"orange", skillId:"grammaire_orange_sujet", competence:"sujet", label:"Trouver le sujet"},
    {ceinture:"verte", niveau:4, emoji:"🟢", colorName:"verte", skillId:"grammaire_verte_nom", competence:"nom", label:"Reconnaître un nom"},
    {ceinture:"bleue", niveau:5, emoji:"🔵", colorName:"bleue", skillId:"grammaire_bleue_determinant", competence:"determinant", label:"Reconnaître un déterminant"},
    {ceinture:"marron", niveau:6, emoji:"🟤", colorName:"marron", skillId:"grammaire_marron_infinitif", competence:"infinitif", label:"Trouver l’infinitif"},
    {ceinture:"noire", niveau:7, emoji:"⚫", colorName:"noire", skillId:"grammaire_noire_adjectif", competence:"adjectif", label:"Reconnaître un adjectif"},
    {ceinture:"rouge", niveau:8, emoji:"🔴", colorName:"rouge", skillId:"grammaire_rouge_groupe_nominal", competence:"groupe_nominal", label:"Reconnaître le groupe nominal"}
  ];

  function esc(value){
    if(typeof escapeHTML === "function") return escapeHTML(value);
    return String(value ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  }
  function cleanName(name){
    return String(name || "eleve").trim().toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
      .replace(/[^a-z0-9_-]/g,"_") || "eleve";
  }
  function currentStudentName(){
    if(window.prenomActuel) return window.prenomActuel;
    try{ const cur=JSON.parse(localStorage.getItem("hibou_current_student")||"{}"); if(cur&&cur.prenom) return cur.prenom; }catch(e){}
    return localStorage.getItem("hibou_last_prenom") || localStorage.getItem("hibou_prenom") || localStorage.getItem("maitreHibouCurrentStudent") || localStorage.getItem("elevePrenom") || "eleve";
  }
  function progressKey(name){ return PROGRESS_PREFIX + cleanName(name); }
  function loadProgress(name){
    try{
      const data=JSON.parse(localStorage.getItem(progressKey(name))||"{}")||{};
      if(!Array.isArray(data.trainings)) data.trainings=[];
      if(!Array.isArray(data.belts)) data.belts=[];
      return data;
    }catch(e){ return {trainings:[], belts:[]}; }
  }
  function saveProgress(name,data){
    data.trainings=Array.isArray(data.trainings)?data.trainings.slice(-120):[];
    data.belts=Array.isArray(data.belts)?data.belts.slice(-120):[];
    localStorage.setItem(progressKey(name), JSON.stringify(data));
  }
  function backupBelt(name,item){
    try{
      const rows=JSON.parse(localStorage.getItem(BELT_BACKUP_KEY)||"[]")||[];
      rows.push(Object.assign({prenom:name}, item));
      localStorage.setItem(BELT_BACKUP_KEY, JSON.stringify(rows.slice(-600)));
    }catch(e){}
  }
  function bestBelt(skillId){
    const order={none:0, bronze:1, argent:2, or:3};
    const rows=loadProgress(currentStudentName()).belts.filter(b=>b && b.skillId===skillId && b.valid!==false);
    if(!rows.length) return null;
    return rows.sort((a,b)=>(order[b.rank]||0)-(order[a.rank]||0) || Number(b.score||0)-Number(a.score||0))[0];
  }
  function medalForScore(score){
    if(score>=19) return {medal:"🥇 Or", rank:"or", valid:true, bonus:80};
    if(score>=17) return {medal:"🥈 Argent", rank:"argent", valid:true, bonus:50};
    if(score>=15) return {medal:"🥉 Bronze", rank:"bronze", valid:true, bonus:30};
    return {medal:"❌ Non validée", rank:"none", valid:false, bonus:0};
  }
  function shuffle(arr){
    const out=(arr||[]).slice();
    for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [out[i],out[j]]=[out[j],out[i]];}
    return out;
  }
  function norm(s){
    return String(s||"").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"_");
  }
  function readCell(row, names){
    for(const n of names){ if(row[n] !== undefined && row[n] !== null && String(row[n]).trim() !== "") return row[n]; }
    return "";
  }
  function rowToQuestion(row){
    const opts=[readCell(row,["A","a"]), readCell(row,["B","b"]), readCell(row,["C","c"]), readCell(row,["D","d"])].map(x=>String(x));
    const answer=String(readCell(row,["reponse","réponse","Reponse","Réponse"]));
    let correct=opts.findIndex(o=>String(o).trim().toLowerCase()===answer.trim().toLowerCase());
    if(correct<0) correct=0;
    const answerText=opts[correct];
    const mixed=shuffle(opts);
    const newCorrect=mixed.findIndex(o=>String(o)===String(answerText));
    return {q:String(readCell(row,["question","Question"])), options:mixed, correct:newCorrect<0?0:newCorrect};
  }
  async function loadSheetQuestions(force){
    if(!force){
      try{
        const cached=JSON.parse(localStorage.getItem(QUESTIONS_CACHE_KEY)||"null");
        if(cached && Array.isArray(cached.rows) && cached.rows.length) return cached.rows;
      }catch(e){}
    }
    const res=await fetch(QUESTION_SHEET_URL + "&t=" + Date.now(), {cache:"no-store"});
    if(!res.ok) throw new Error("HTTP " + res.status);
    const rows=await res.json();
    if(!Array.isArray(rows)) throw new Error("Réponse JSON inattendue");
    localStorage.setItem(QUESTIONS_CACHE_KEY, JSON.stringify({date:Date.now(), rows:rows}));
    return rows;
  }
  async function questionsForBelt(belt){
    let rows=[];
    try{ rows=await loadSheetQuestions(true); }
    catch(e){
      console.warn("V19 Google Sheets indisponible, tentative cache", e);
      try{ rows=(JSON.parse(localStorage.getItem(QUESTIONS_CACHE_KEY)||"{}").rows)||[]; }catch(_e){}
    }
    rows = (rows||[]).filter(row=>{
      const ceinture=norm(readCell(row,["ceinture","Ceinture"]));
      const comp=norm(readCell(row,["competence","compétence","Competence","Compétence"]));
      return ceinture===norm(belt.ceinture) && comp===norm(belt.competence);
    });
    const bank=shuffle(rows.map(rowToQuestion).filter(q=>q.q && q.options.length>=2));
    const out=[]; let i=0;
    while(bank.length && out.length<20){ out.push(bank[i % bank.length]); i++; }
    return shuffle(out).slice(0,20);
  }
  function ensureOverlay(){
    let ov=document.getElementById("skillValidationFullscreenV1861");
    if(!ov){
      ov=document.createElement("div");
      ov.id="skillValidationFullscreenV1861";
      ov.className="modal-overlay skill-validation-fullscreen-v1861 hidden";
      ov.innerHTML='<div class="modal-box"><div style="display:flex;justify-content:space-between;align-items:center;gap:12px"><h2>🥋 Valider une compétence</h2><button class="teacher-btn secondary" onclick="closeSkillValidationFullscreenV1862()">Fermer</button></div><div id="skillValidationFullscreenBodyV1861"></div></div>';
      document.body.appendChild(ov);
    }
    return ov;
  }
  function body(){ ensureOverlay(); return document.getElementById("skillValidationFullscreenBodyV1861"); }
  function highestValidatedFrenchLevel(){
    const rows=loadProgress(currentStudentName()).belts || [];
    let highest=0;
    rows.forEach(function(row){
      if(!row || row.valid===false) return;
      const belt=GRAMMAR_BELTS_V190.find(function(b){ return b.skillId===row.skillId || b.ceinture===row.ceinture; });
      if(belt && belt.niveau>highest) highest=belt.niveau;
    });
    return highest;
  }
  function frenchBeltState(belt){
    const best=bestBelt(belt.skillId);
    const highest=highestValidatedFrenchLevel();
    if(best) return {best:best, unlocked:true, inferred:false};
    if(belt.niveau<=highest) return {best:null, unlocked:false, inferred:true};
    return {best:null, unlocked:belt.niveau===highest+1, inferred:false};
  }
  function isUnlocked(belt){
    return frenchBeltState(belt).unlocked;
  }
  function menuHTML(){
    function previousBeltName(belt){
      const previous=GRAMMAR_BELTS_V190.find(x=>x.niveau===belt.niveau-1);
      return previous ? previous.colorName : "";
    }
    function stateHTML(belt, best, unlocked, inferred){
      if(best) return '<div class="v22-state done">✅ Validée<br><span>'+esc(best.medal)+' · '+esc(best.score)+'/20</span></div>';
      if(inferred) return '<div class="v22-state done">✓ Étape franchie<br><span>Niveau supérieur déjà validé</span></div>';
      if(unlocked) return '<div class="v22-state ready">⭐ Tu es prêt !</div>';
      const prev=previousBeltName(belt);
      return '<div class="v22-state locked">🔒 Valide d’abord<br>la ceinture '+esc(prev)+'</div>';
    }
    function frenchCard(b){
      const state=frenchBeltState(b);
      const best=state.best;
      const unlocked=state.unlocked;
      const disabled=(unlocked || best) ? '' : 'disabled';
      return '<button class="v22-belt-card" '+disabled+' title="'+esc(b.label)+'" onclick="startSkillValidationFullscreenV1862(\''+esc(b.skillId)+'\')">'+
        '<div class="v22-belt-icon">'+b.emoji+'</div>'+
        '<div class="v22-belt-main">'+
          '<div class="v22-belt-name">'+esc(b.label)+'</div>'+
          '<div class="v22-belt-sub">Ceinture '+esc(b.colorName)+'</div>'+
        '</div>'+
        stateHTML(b,best,unlocked,state.inferred)+
      '</button>';
    }
    const mathBelts=(window.MATH_BELTS_V222 || [
      {emoji:'⚪', colorName:'blanche', label:'Petits nombres', skillId:'maths_blanche_petits_nombres', niveau:1}
    ]);
    function mathCard(m){
      const unlocked = (typeof window.isMathUnlockedV222 === "function") ? window.isMathUnlockedV222(m) : (m.niveau===1);
      const state = (typeof window.mathStateHTMLV222 === "function")
        ? window.mathStateHTMLV222(m)
        : '<div class="v22-state ready">⭐ Tu es prêt !</div>';
      return '<button class="v22-belt-card" '+(unlocked?'':'disabled')+' title="'+esc(m.label)+'" onclick="startMathSkillValidationV222(\''+esc(m.skillId)+'\')">'+
        '<div class="v22-belt-icon">'+m.emoji+'</div>'+
        '<div class="v22-belt-main">'+
          '<div class="v22-belt-name">'+esc(m.label)+'</div>'+
          '<div class="v22-belt-sub">Ceinture '+esc(m.colorName)+'</div>'+
        '</div>'+state+
      '</button>';
    }
    return '<div class="v22-skill-header">'+
      '<div class="v22-skill-owl">🦉</div>'+
      '<div class="v22-skill-title"><h2>⭐ Valider une compétence</h2><p>Avance ceinture après ceinture.</p></div>'+
      '<button class="v22-close-btn" onclick="closeSkillValidationFullscreenV1862()" title="Fermer">×</button>'+
    '</div>'+
    '<div class="v22-columns">'+
      '<section class="v22-domain francais"><div class="v22-domain-title">📖 Français</div><div class="v22-belt-list">'+
        GRAMMAR_BELTS_V190.map(frenchCard).join('')+
      '</div></section>'+
      '<section class="v22-domain maths"><div class="v22-domain-title">🔢 Maths</div><div class="v22-belt-list">'+
        mathBelts.map(mathCard).join('')+
      '</div></section>'+
    '</div>'+
    '<div class="v22-help">🏆 <span>Valide les ceintures dans l’ordre et gagne des <strong>Points Curiosité</strong>.</span><span>🥉 🥈 🥇</span></div>';
  }
  function openMenu(){
    const ov=ensureOverlay();
    const b=body();
    if(b) b.innerHTML=menuHTML();
    ov.classList.remove("hidden");
  }
  function closeMenu(){ const ov=document.getElementById("skillValidationFullscreenV1861"); if(ov) ov.classList.add("hidden"); }
  function findBelt(skillId){ return GRAMMAR_BELTS_V190.find(b=>b.skillId===skillId) || GRAMMAR_BELTS_V190.find(b=>b.ceinture===skillId); }

  window.openSkillValidationFullscreenV1862 = window.openSkillValidationFullscreenV1861 = openMenu;
  window.closeSkillValidationFullscreenV1862 = window.closeSkillValidationFullscreenV1861 = closeMenu;
  window.startSkillCheckMenu = openMenu;
  window.openCompetenceValidation = openMenu;

  window.startSkillValidationFullscreenV1862 = window.startSkillValidationFullscreenV1861 = async function(skillId){
    const belt=findBelt(skillId);
    if(!belt){ openMenu(); return; }
    const ov=ensureOverlay(); ov.classList.remove("hidden");
    const b=body();
    if(b) b.innerHTML='<div class="v190-belt-box"><h3>'+belt.emoji+' Ceinture '+esc(belt.colorName)+'</h3><div class="v190-rules">Chargement des questions depuis Google Sheets...</div></div>';
    let questions=[];
    try{ questions=await questionsForBelt(belt); }catch(e){ console.warn(e); }
    if(!questions.length){
      if(b) b.innerHTML='<div class="v190-belt-box"><h3>'+belt.emoji+' Ceinture '+esc(belt.colorName)+'</h3><div class="v190-rules">Je ne trouve pas encore de questions pour cette ceinture dans Google Sheets.<br>Vérifie : <b>ceinture = '+esc(belt.ceinture)+'</b> et <b>competence = '+esc(belt.competence)+'</b>.</div><button class="v190-back-btn" onclick="openSkillValidationFullscreenV1862()">Retour</button></div>';
      return;
    }
    window.beltCheckStateV190 = {belt:belt, questions:questions, index:0, score:0, answered:false, answers:[]};
    if(b) b.innerHTML='<div class="v190-belt-box" id="beltBoxV190"><h3>'+belt.emoji+' Ceinture '+esc(belt.colorName)+'</h3><div class="v190-rules"><b>'+esc(belt.label)+'</b><br>20 questions · pas de rattrapage.<br>15-16/20 = 🥉 Bronze · 17-18/20 = 🥈 Argent · 19-20/20 = 🥇 Or</div><button class="v190-start-btn" onclick="renderBeltQuestionV190()">Je commence la ceinture 🚀</button><button class="v190-back-btn" onclick="openSkillValidationFullscreenV1862()">Retour aux ceintures</button></div>';
  };

  window.renderBeltQuestionV190 = function(){
    const s=window.beltCheckStateV190; if(!s) return;
    const box=document.getElementById("beltBoxV190"); const q=s.questions[s.index]; if(!box||!q) return;
    box.innerHTML='<h3>'+s.belt.emoji+' Ceinture '+esc(s.belt.colorName)+'</h3><div class="v190-progress">Question '+(s.index+1)+' / '+s.questions.length+'</div><div class="v190-question">'+esc(q.q)+'</div><div class="v190-options">'+q.options.map((opt,i)=>'<button class="v190-option" onclick="answerBeltQuestionV190('+i+')">'+esc(opt)+'</button>').join('')+'</div>';
  };

  window.answerBeltQuestionV190 = function(choice){
    const s=window.beltCheckStateV190; if(!s || s.answered) return;
    s.answered=true;
    const q=s.questions[s.index];
    const buttons=document.querySelectorAll("#beltBoxV190 .v190-option");
    const ok=choice===q.correct; if(ok) s.score++;
    // V25.8.39 : aucune correction intermédiaire, mais chaque réponse est mémorisée
    // pour afficher un bilan complet (réussites + erreurs) à la fin de la ceinture.
    s.answers.push({
      index:s.index,
      question:q.q || '',
      given:(q.options && q.options[choice] != null) ? q.options[choice] : '',
      expected:(q.options && q.options[q.correct] != null) ? q.options[q.correct] : '',
      ok:ok
    });
    buttons.forEach((btn)=>{btn.disabled=true;});
    s.index++;
    s.answered=false;
    if(s.index>=s.questions.length) finishBeltCheckV190();
    else renderBeltQuestionV190();
  };

  function finishBeltCheckV190(){
    const s=window.beltCheckStateV190; if(!s) return;
    const result=medalForScore(s.score);
    const pct=Math.round((s.score/20)*100);
    const name=currentStudentName();
    const item={type:"belt", date:new Date().toLocaleString("fr-FR"), skillId:s.belt.skillId, title:"Ceinture "+s.belt.colorName+" - "+s.belt.label, domain:"Grammaire", score:s.score, total:20, pct:pct, medal:result.medal, rank:result.rank, valid:result.valid, source:"google_sheets_v19"};
    const data=loadProgress(name); data.belts.push(item); saveProgress(name,data); backupBelt(name,item);
    if(result.valid){
      try{ localStorage.setItem("hibou_last_success_" + name, result.medal + " " + item.title + " (" + s.score + "/20)"); }catch(e){}
      if(typeof addScore === "function"){
        window.__hibouBeltAwardInProgress=true;
        try{ addScore(result.bonus, "ceinture " + result.rank + " grammaire"); }
        finally{ window.__hibouBeltAwardInProgress=false; }
      }
      if(typeof speak === "function") setTimeout(()=>speak("Bravo pour ta ceinture !"),120);
      if(typeof addMessage === "function") setTimeout(()=>addMessage("prof", result.medal + " Bravo " + esc(name) + " ! Ta " + esc(item.title) + " est sauvegardée."),200);
      try{
        var studentName = '';
        try{ studentName = typeof currentStudentName === 'function' ? currentStudentName() : ''; }catch(_e){}
        var lsuMap = {
          grammaire_blanche_phrase_negative:{code:'GRA-P1-02',label:'Reconnaître une phrase négative'},
          grammaire_jaune_verbe:{code:'GRA-P1-04',label:'Repérer le verbe conjugué'},
          grammaire_orange_sujet:{code:'GRA-P1-06',label:'Repérer le groupe sujet'},
          grammaire_verte_nom:{code:'GRA-P2-01',label:'Reconnaître un nom commun'},
          grammaire_bleue_determinant:{code:'GRA-P3-01',label:'Identifier le déterminant'},
          grammaire_marron_infinitif:{code:'GRA-P1-05',label:'Donner l’infinitif d’un verbe conjugué'},
          grammaire_noire_adjectif:{code:'GRA-P3-02',label:'Identifier l’adjectif'},
          grammaire_rouge_groupe_nominal:{code:'GRA-P3-03',label:'Identifier le groupe nominal'}
        };
        var lsu = lsuMap[s.belt.skillId] || null;
        var frenchMeta = {
          prenom: studentName,
          type:'ceinture_validee',
          matiere:'Français',
          domaine:'Grammaire',
          titre:'Ceinture '+s.belt.colorName+' français validée',
          detail:s.belt.label+' — '+result.medal+' — '+s.score+'/20',
          belt:{colorName:s.belt.colorName,ceinture:s.belt.ceinture,label:s.belt.label,skillId:s.belt.skillId},
          skillId:s.belt.skillId,
          label:s.belt.label,
          ceinture:s.belt.colorName,
          score:s.score,
          total:20,
          niveau:result.rank||result.medal,
          medaille:result.medal,
          source:'ceinture_francais',
          competence_code:lsu ? lsu.code : '',
          competence_label:lsu ? lsu.label : '',
          exercise_types:'ceinture_20_items',
          help_used:0,
          challenge_score:s.score,
          challenge_total:20,
          mastery_status:'reussi_seul',
          learning_session_id:'ceinture-'+String(s.belt.skillId||'francais')+'-'+Date.now().toString(36),
          actionReelle:true,
          force:true
        };
        if(typeof window.hibouTrackEvent==='function'){
          var trackedFrenchBelt = window.hibouTrackEvent(frenchMeta);
          if(!trackedFrenchBelt || !trackedFrenchBelt.competence_code){
            try{ console.error('[V25.8.39 LSU] Ceinture française non codée malgré le mapping', frenchMeta, trackedFrenchBelt); }catch(_e){}
          }
        }else{
          /* V25.8.39 : ne plus retomber sur l'ancien journal V25.8.08 qui perd les champs LSU. */
          try{ console.error('[V25.8.39 LSU] Journal élève canonique indisponible : trace ceinture non envoyée pour éviter une ligne LSU incomplète.', frenchMeta); }catch(_e){}
        }
      }catch(e){ try{console.warn('Parcours récent français non mis à jour',e);}catch(_e){} }
    }
    const box=document.getElementById("beltBoxV190");
    if(box){
      const advice=result.valid ? "Bravo ! Cette médaille est méritée : tu as réussi "+s.score+" questions sur 20." : "Ce n’est pas encore validé. Entraîne-toi puis retente la ceinture.";
      const answers=(s.answers||[]);
      const correction=answers.length ? '<div class="v190-final-correction"><h4>Mes 20 réponses</h4><div class="v190-final-summary">✅ '+answers.filter(function(a){return a.ok;}).length+' réussites · ❌ '+answers.filter(function(a){return !a.ok;}).length+' erreurs</div>'+answers.map(function(a){
        return '<div class="v190-correction-item '+(a.ok?'v190-answer-ok':'v190-answer-error')+'"><div><strong>'+(a.ok?'✅':'❌')+' Question '+(a.index+1)+' :</strong> '+esc(a.question||'')+'</div><div>Ma réponse : <strong>'+esc(a.given||'—')+'</strong></div>'+(!a.ok?'<div>Réponse attendue : <strong>'+esc(a.expected||'—')+'</strong></div>':'')+'</div>';
      }).join('')+'</div>' : '<div class="v190-final-correction">Le détail des réponses n’est pas disponible pour cette tentative.</div>';
      box.innerHTML='<div class="v190-result"><h3>Résultat de la ceinture</h3><div class="v190-medal">'+esc(result.medal)+'</div><div>Score : <strong>'+s.score+'/20</strong> · '+pct+'%</div><div style="margin-top:8px">'+esc(advice)+'</div><div class="v190-scale"><div>0-14<br>❌ non validée</div><div>15-16<br>🥉 Bronze</div><div>17-18<br>🥈 Argent</div><div>19-20<br>🥇 Or</div></div>'+correction+'<button class="v190-start-btn" onclick="openSkillValidationFullscreenV1862()">Voir les autres ceintures</button></div>';
    }
    window.beltCheckStateV190=null;
    if(typeof window.refreshV168BeltCounters === "function") setTimeout(window.refreshV168BeltCounters,0);
    if(typeof renderHibouProfile === "function") setTimeout(renderHibouProfile,100);
    if(typeof window.renderTeacherDashboard === "function") setTimeout(window.renderTeacherDashboard,150);
  }

  window.startBeltCheckV168 = function(skillId){
    const belt=findBelt(skillId);
    if(belt) return window.startSkillValidationFullscreenV1862(belt.skillId);
    return openMenu();
  };

  document.addEventListener("keydown", function(e){ if(e.key==="Escape") closeMenu(); });
})();
