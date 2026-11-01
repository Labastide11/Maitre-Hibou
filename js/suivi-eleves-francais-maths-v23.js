
/* V23 - Tableau enseignant utile : Suivi des élèves, sans troisième popup */
(function(){
  if(window.__hibouV23SuiviEleves) return;
  window.__hibouV23SuiviEleves = true;

  const FRENCH_BELTS = [
    {skillId:"grammaire_blanche_phrase_negative", ceinture:"blanche", emoji:"⚪", short:"Phrase", label:"Phrase affirmative / négative", level:1},
    {skillId:"grammaire_jaune_verbe", ceinture:"jaune", emoji:"🟡", short:"Verbe", label:"Trouver le verbe", level:2},
    {skillId:"grammaire_orange_sujet", ceinture:"orange", emoji:"🟠", short:"Sujet", label:"Trouver le sujet", level:3},
    {skillId:"grammaire_verte_nom", ceinture:"verte", emoji:"🟢", short:"Nom", label:"Reconnaître un nom", level:4},
    {skillId:"grammaire_bleue_determinant", ceinture:"bleue", emoji:"🔵", short:"Déterminant", label:"Reconnaître un déterminant", level:5},
    {skillId:"grammaire_marron_infinitif", ceinture:"marron", emoji:"🟤", short:"Infinitif", label:"Trouver l’infinitif", level:6},
    {skillId:"grammaire_noire_adjectif", ceinture:"noire", emoji:"⚫", short:"Adjectif", label:"Reconnaître l’adjectif", level:7},
    {skillId:"grammaire_rouge_groupe_nominal", ceinture:"rouge", emoji:"🔴", short:"Groupe nominal", label:"Reconnaître le groupe nominal", level:8}
  ];

  const MATH_BELTS = window.MATH_BELTS_V222 || [
    {skillId:"maths_blanche_petits_nombres", ceinture:"blanche", emoji:"⚪", label:"Petits nombres", level:1},
    {skillId:"maths_jaune_dizaines", ceinture:"jaune", emoji:"🟡", label:"Dizaines", level:2},
    {skillId:"maths_orange_sans_retenue", ceinture:"orange", emoji:"🟠", label:"Sans retenue", level:3},
    {skillId:"maths_vert_clair_avec_retenue", ceinture:"vert_clair", emoji:"🟢", label:"Avec retenue", level:4},
    {skillId:"maths_vert_fonce_complement_dizaine", ceinture:"vert_fonce", emoji:"🟢", label:"Complément dizaine", level:5},
    {skillId:"maths_bleu_clair_plus_moins_9", ceinture:"bleu_clair", emoji:"🔵", label:"+9 / -9", level:6},
    {skillId:"maths_bleu_fonce_plus_moins_11", ceinture:"bleu_fonce", emoji:"🔵", label:"+11 / -11", level:7},
    {skillId:"maths_rose_centaines", ceinture:"rose", emoji:"🌸", label:"Centaines", level:8},
    {skillId:"maths_beige_complement_centaine", ceinture:"beige", emoji:"🤍", label:"Complément centaine", level:9},
    {skillId:"maths_violet_tables_1_2_10", ceinture:"violet", emoji:"🟣", label:"Tables ×1 ×2 ×10", level:10},
    {skillId:"maths_marron_tables_3_4_5", ceinture:"marron", emoji:"🟤", label:"Tables ×3 ×4 ×5", level:11},
    {skillId:"maths_rouge_tables_6_7", ceinture:"rouge", emoji:"🔴", label:"Tables ×6 ×7", level:12},
    {skillId:"maths_gris_tables_8_9", ceinture:"gris", emoji:"⚫", label:"Tables ×8 ×9", level:13},
    {skillId:"maths_noir_multiplier_10_100_1000", ceinture:"noir", emoji:"⚫", label:"×10 ×100 ×1000", level:14}
  ];

  function h(str){
    if(typeof escapeHTML === "function") return escapeHTML(str);
    return String(str ?? "").replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }
  function cleanName(name){
    return String(name || "eleve").trim().toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
      .replace(/[^a-z0-9_-]/g,"_") || "eleve";
  }
  function medalRank(m){
    const s=String(m||"").toLowerCase();
    if(s.includes("or") || s.includes("🥇")) return 3;
    if(s.includes("argent") || s.includes("🥈")) return 2;
    if(s.includes("bronze") || s.includes("🥉")) return 1;
    return 0;
  }
  function medalEmoji(m){
    const s=String(m||"").toLowerCase();
    if(s.includes("🥇") || s.includes("or")) return "🥇";
    if(s.includes("🥈") || s.includes("argent")) return "🥈";
    if(s.includes("🥉") || s.includes("bronze")) return "🥉";
    return "";
  }
  function levelFromFrenchSkill(skillId){
    const b=FRENCH_BELTS.find(x=>x.skillId===skillId);
    return b ? b.level : 0;
  }
  function levelFromMathSkill(skillId, ceinture){
    const b=MATH_BELTS.find(x=>x.skillId===skillId) || MATH_BELTS.find(x=>x.ceinture===ceinture);
    return b ? (b.level || b.niveau || 0) : 0;
  }
  function readJSON(key, fallback){
    try{ return JSON.parse(localStorage.getItem(key) || ""); }catch(e){ return fallback; }
  }
  function getNames(){
    let names=[];
    try{
      if(typeof getKnownStudentsV168 === "function") names = getKnownStudentsV168() || [];
      else if(typeof getKnownStudentNames === "function") names = getKnownStudentNames() || [];
    }catch(e){}
    try{
      const roster = JSON.parse(localStorage.getItem("hibou_roster") || "[]");
      names = names.concat(roster || []);
    }catch(e){}
    try{
      Object.keys(localStorage).forEach(k=>{
        let m = k.match(/^hibou_v168_progress_(.+)$/) || k.match(/^hibou_v222_maths_progress_(.+)$/) || k.match(/^hibou_curiosity_points_(.+)$/);
        if(m) names.push(m[1].replace(/_/g," "));
      });
    }catch(e){}
    return Array.from(new Set(names.map(n=>String(n||"").trim()).filter(Boolean))).sort((a,b)=>a.localeCompare(b,"fr"));
  }
  function loadFrenchBelts(name){
    let data=null;
    try{
      if(typeof loadProgress === "function") data = loadProgress(name);
    }catch(e){}
    if(!data) data = readJSON("hibou_v168_progress_" + cleanName(name), {belts:[]});
    return (data && Array.isArray(data.belts)) ? data.belts : [];
  }
  function loadMathBelts(name){
    const data = readJSON("hibou_v222_maths_progress_" + cleanName(name), {belts:[]});
    return (data && Array.isArray(data.belts)) ? data.belts : [];
  }
  function bestFrench(name){
    const rows = loadFrenchBelts(name).filter(b=>b && (b.valid !== false));
    if(!rows.length) return null;
    rows.sort((a,b)=>{
      const la=levelFromFrenchSkill(a.skillId), lb=levelFromFrenchSkill(b.skillId);
      return lb-la || medalRank(b.medal||b.medaille)-medalRank(a.medal||a.medaille) || (Number(b.score)||0)-(Number(a.score)||0);
    });
    const r=rows[0];
    const belt=FRENCH_BELTS.find(x=>x.skillId===r.skillId) || {};
    return {
      raw:r,
      level:levelFromFrenchSkill(r.skillId),
      text:(belt.emoji||"🏆")+" "+(belt.short||r.title||r.label||"Ceinture")+" "+(medalEmoji(r.medal||r.medaille)||""),
      detail:(belt.emoji||"🏆")+" "+(belt.label||r.title||r.label||"Ceinture")+" "+(medalEmoji(r.medal||r.medaille)||""),
      score:r.score || "",
      date:r.date || ""
    };
  }
  function bestMath(name){
    const rows = loadMathBelts(name);
    if(!rows.length) return null;
    rows.sort((a,b)=>{
      const la=levelFromMathSkill(a.skillId,a.ceinture), lb=levelFromMathSkill(b.skillId,b.ceinture);
      return lb-la || medalRank(b.medal||b.medaille)-medalRank(a.medal||a.medaille) || (Number(b.score)||0)-(Number(a.score)||0);
    });
    const r=rows[0];
    const belt=MATH_BELTS.find(x=>x.skillId===r.skillId) || MATH_BELTS.find(x=>x.ceinture===r.ceinture) || {};
    return {
      raw:r,
      level:levelFromMathSkill(r.skillId,r.ceinture),
      text:(belt.emoji||"🏆")+" "+(belt.label||r.label||"Ceinture")+" "+(medalEmoji(r.medal||r.medaille)||""),
      detail:(belt.emoji||"🏆")+" "+(belt.label||r.label||"Ceinture")+" "+(medalEmoji(r.medal||r.medaille)||""),
      score:r.score || "",
      date:r.date || ""
    };
  }
  function questionJournal(){
    try{
      if(typeof getQuestionJournal === "function") return getQuestionJournal() || [];
    }catch(e){}
    return readJSON("hibou_question_journal", []);
  }
  function questionCount(name){
    const target=cleanName(name);
    return questionJournal().filter(q=>cleanName(q.student || q.prenom || q.eleve || q.name)===target).length;
  }
  function curiosityPoints(name){
    const key="hibou_curiosity_points_" + cleanName(name);
    const direct=Number(localStorage.getItem(key) || 0);
    if(direct) return direct;
    return questionJournal()
      .filter(q=>cleanName(q.student || q.prenom || q.eleve || q.name)===cleanName(name))
      .reduce((sum,q)=>sum + (Number(q.pointsCuriosite || q.points || 0) || 0), 0);
  }
  function studentHistory(name){
    try{
      const data = typeof getStudentData==="function" ? getStudentData(name) : null;
      return (data && data.history) || [];
    }catch(e){ return []; }
  }
  function lastConnection(name){
    const history = studentHistory(name);
    if(history && history[0] && history[0].date) return history[0].date;
    const f=bestFrench(name), m=bestMath(name);
    const d=(m && m.date) || (f && f.date) || "";
    if(d){
      try{ return new Date(d).toLocaleDateString("fr-FR"); }catch(e){ return String(d).slice(0,10); }
    }
    return "—";
  }
  function alertFor(row){
    const f=row.french, m=row.math;
    const total=(f?1:0)+(m?1:0);
    const q=row.questions;
    if(!f && !m) return {label:"Aucune ceinture validée", cls:"danger"};
    if(total===1 && q>0) return {label:"À encourager", cls:"warn"};
    if(f && m && ((f.level||0)+(m.level||0) >= 10)) return {label:"Très bonne progression", cls:"ok"};
    if(f && m && ((f.level||0)+(m.level||0) >= 5)) return {label:"Belle progression", cls:"progress"};
    if(total===1) return {label:"Besoin d'accompagnement", cls:"warn"};
    return {label:"RAS", cls:"ok"};
  }
  function allRows(){
    return getNames().map(name=>{
      const row = {
        name,
        french:bestFrench(name),
        math:bestMath(name),
        questions:questionCount(name),
        points:curiosityPoints(name),
        last:lastConnection(name)
      };
      row.alert=alertFor(row);
      return row;
    });
  }
  function rowHTML(r, i){
    return `<tr data-v23-student="${h(r.name)}" onclick="selectStudentV23('${encodeURIComponent(r.name)}')">
      <td><strong>${h(r.name)}</strong></td>
      <td>${r.french ? h(r.french.text) : "—"}</td>
      <td>${r.math ? h(r.math.text) : "—"}</td>
      <td><span class="v23-pill ${r.alert.cls}">${h(r.alert.label)}</span></td>
    </tr>`;
  }
  function detailHTML(r){
    if(!r) return `<div class="v23-student-card"><h3>🦉 Élève</h3><div class="v23-note">Clique sur un prénom pour afficher le détail ici, sans ouvrir une nouvelle fenêtre.</div></div>`;
    return `<div class="v23-student-card">
      <h3>${h(r.name)}</h3>
      <div class="v23-detail-line"><span class="v23-detail-label">Français</span><span class="v23-detail-value">${r.french ? h(r.french.detail) : "—"}</span></div>
      <div class="v23-detail-line"><span class="v23-detail-label">Maths</span><span class="v23-detail-value">${r.math ? h(r.math.detail) : "—"}</span></div>
      <div class="v23-detail-line"><span class="v23-detail-label">Questions posées</span><span class="v23-detail-value">${h(r.questions)}</span></div>
      <div class="v23-detail-line"><span class="v23-detail-label">Points Curiosité</span><span class="v23-detail-value">${h(r.points)}</span></div>
      <div class="v23-detail-line"><span class="v23-detail-label">Dernière activité</span><span class="v23-detail-value">${h(r.last)}</span></div>
      <div class="v23-note">${h(r.alert.label)}</div>
    </div>`;
  }
  function renderSuivi(rows){
    const selectedName = localStorage.getItem("hibou_v23_selected_student") || (rows[0] && rows[0].name) || "";
    const selected = rows.find(r=>r.name===selectedName) || rows[0] || null;
    const total=rows.length;
    const noBelt=rows.filter(r=>!r.french && !r.math).length;
    const both=rows.filter(r=>r.french && r.math).length;
    const alerts=rows.filter(r=>r.alert.cls==="danger" || r.alert.cls==="warn").length;
    return `<div class="v23-summary-grid">
      <div class="v23-summary-card"><strong>${total}</strong><span>élèves</span></div>
      <div class="v23-summary-card"><strong>${both}</strong><span>Français + Maths</span></div>
      <div class="v23-summary-card"><strong>${noBelt}</strong><span>sans ceinture</span></div>
      <div class="v23-summary-card"><strong>${alerts}</strong><span>alertes</span></div>
    </div>
    <div class="v23-follow-layout">
      <div class="v23-table-wrap">
        <table class="v23-table">
          <thead><tr><th>Prénom</th><th>Français</th><th>Maths</th><th>Alerte pédagogique</th></tr></thead>
          <tbody>${rows.length ? rows.map(rowHTML).join("") : `<tr><td colspan="4">Aucun élève enregistré pour le moment.</td></tr>`}</tbody>
        </table>
      </div>
      <div id="v23StudentDetail">${detailHTML(selected)}</div>
    </div>`;
  }
  function renderRewards(rows){
    const cards = rows.filter(r=>r.french || r.math).map(r=>`<div class="v23-reward-card">
      <strong>${h(r.name)}</strong><br>
      📖 ${r.french ? h(r.french.text) : "—"}<br>
      🔢 ${r.math ? h(r.math.text) : "—"}
    </div>`).join("");
    return cards ? `<div class="v23-reward-grid">${cards}</div>` : `<div class="v23-empty">Aucune récompense enregistrée pour le moment.</div>`;
  }
  function renderQuestions(rows){
    const q = questionJournal();
    const byStudent = rows.map(r=>`<tr><td><strong>${h(r.name)}</strong></td><td>${h(r.questions)}</td><td>${h(r.points)}</td><td>${h(r.last)}</td></tr>`).join("");
    const recent = q.slice(0,12).map(item=>`<div class="history-item"><strong>${h(item.student || item.prenom || item.eleve || "Élève")}</strong> — ${h(item.correctedQuestion || item.questionCorrigee || item.question || item.questionOriginale || "")}</div>`).join("") || `<div class="history-item">Aucune question enregistrée.</div>`;
    return `<div class="v23-table-wrap"><table class="v23-table"><thead><tr><th>Prénom</th><th>Questions posées</th><th>Points Curiosité</th><th>Dernière activité</th></tr></thead><tbody>${byStudent || `<tr><td colspan="4">Aucun élève enregistré.</td></tr>`}</tbody></table></div>
    <div class="v23-note">Dernières questions</div><div class="history-list">${recent}</div>`;
  }
  function renderSecurity(){
    const logs=readJSON("hibou_blocked_log", []);
    const recent=(logs||[]).slice(0,20).map(l=>`<div class="blocked-item"><strong>${h(l.student||"Élève")}</strong> — ${h(l.question||"")}<br><small>${h(l.reason||l.category||"")}</small></div>`).join("") || `<div class="blocked-item">Aucune question bloquée.</div>`;
    return `<div class="security-panel">
      <h3>🛡️ Sécurité CE2</h3>
      <div class="security-grid">
        <div class="security-card"><strong>Mode</strong><br><span class="security-status strict">Strict CE2</span></div>
        <div class="security-card"><strong>Questions bloquées</strong><br>${(logs||[]).length}</div>
        <div class="security-card"><strong>Conseil</strong><br>Vérifier régulièrement les questions bloquées.</div>
      </div>
      <div class="blocked-log">${recent}</div>
    </div>`;
  }
  window.selectStudentV23 = function(encodedName){
    const name=decodeURIComponent(encodedName);
    localStorage.setItem("hibou_v23_selected_student", name);
    const rows=allRows();
    const r=rows.find(x=>x.name===name);
    const detail=document.getElementById("v23StudentDetail");
    if(detail) detail.innerHTML=detailHTML(r);
    document.querySelectorAll("[data-v23-student]").forEach(tr=>tr.classList.toggle("selected", tr.getAttribute("data-v23-student")===name));
  };
  window.setTeacherTabV23 = function(tab){
    const selected = ["suivi","recompenses","questions","securite"].includes(tab) ? tab : "suivi";
    localStorage.setItem("hibou_v23_teacher_tab", selected);
    document.querySelectorAll(".v23-teacher-tab").forEach(btn=>btn.classList.toggle("active", btn.dataset.tab===selected));
    document.querySelectorAll(".v23-pane").forEach(p=>p.classList.toggle("active", p.dataset.pane===selected));
  };

  const previousRenderTeacherDashboardV23 = window.renderTeacherDashboard;
  window.renderTeacherDashboard = function(){
    const content = document.getElementById("teacherDashboardContent");
    if(!content){
      if(typeof previousRenderTeacherDashboardV23 === "function") return previousRenderTeacherDashboardV23.apply(this, arguments);
      return;
    }

    ["teacherChallengeContent","teacherPhase33Content","teacherSafetyContent"].forEach(id=>{
      const el=document.getElementById(id);
      if(el) el.innerHTML="";
    });

    const rows=allRows();
    const active=localStorage.getItem("hibou_v23_teacher_tab") || "suivi";
    content.innerHTML = `
      <div class="v23-teacher-tabs">
        <button class="v23-teacher-tab" data-tab="suivi" onclick="setTeacherTabV23('suivi')">📊 Suivi des élèves</button>
        <button class="v23-teacher-tab" data-tab="recompenses" onclick="setTeacherTabV23('recompenses')">🏆 Récompenses</button>
        <button class="v23-teacher-tab" data-tab="questions" onclick="setTeacherTabV23('questions')">📦 Boîte à questions</button>
        <button class="v23-teacher-tab" data-tab="securite" onclick="setTeacherTabV23('securite')">🛡️ Sécurité CE2</button>
      </div>
      <div class="v23-pane" data-pane="suivi">${renderSuivi(rows)}</div>
      <div class="v23-pane" data-pane="recompenses">${renderRewards(rows)}</div>
      <div class="v23-pane" data-pane="questions">${renderQuestions(rows)}</div>
      <div class="v23-pane" data-pane="securite">${renderSecurity()}</div>
      <div class="teacher-small">V23 : tableau pédagogique simplifié. Les anciens onglets techniques sont masqués.</div>
    `;
    setTeacherTabV23(active);
    const selectedName = localStorage.getItem("hibou_v23_selected_student") || (rows[0] && rows[0].name);
    if(selectedName) selectStudentV23(encodeURIComponent(selectedName));
  };

  const previousExportTeacherCSVV23 = window.exportTeacherCSV;
  window.exportTeacherCSV = function(){
    const rows=allRows();
    if(!rows.length && typeof previousExportTeacherCSVV23 === "function") return previousExportTeacherCSVV23();
    const lines=[["Prenom","Francais","Maths","Alerte pedagogique","Questions posees","Points curiosite","Derniere activite"]];
    rows.forEach(r=>lines.push([r.name, r.french?r.french.text:"", r.math?r.math.text:"", r.alert.label, r.questions, r.points, r.last]));
    const csv=lines.map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(";")).join("\n");
    const blob=new Blob(["\ufeff"+csv], {type:"text/csv;charset=utf-8;"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url; a.download="maitre_hibou_v23_suivi_eleves.csv"; a.click();
    URL.revokeObjectURL(url);
  };
})();
