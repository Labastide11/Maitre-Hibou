(function(){
  const COMP_KEY = "hibou_competences_multiplication_v50";
  window.multiplicationPoseeSession = null;

  function loadCompetences(){
    try { return JSON.parse(localStorage.getItem(COMP_KEY)) || {}; }
    catch(e){ return {}; }
  }

  function saveCompetences(data){
    localStorage.setItem(COMP_KEY, JSON.stringify(data));
  }

  function getCompetences(){
    return Object.assign({
      mult_ligne:0,
      mult_1_sans:0,
      mult_1_avec:0,
      mult_2_avec:0
    }, loadCompetences());
  }

  function medal(count){
    if(count >= 5) return "🥇 OR";
    if(count >= 3) return "🥈 ARGENT";
    if(count >= 1) return "🥉 BRONZE";
    return "⬜ À DÉCOUVRIR";
  }

  window.hibouRenderCompetencesMultiplication = function(){
    const c = getCompetences();
    return `
      <div class="competences-box" style="background:#F7F6FF;border:2px solid #EAE8FF;border-radius:16px;padding:12px;margin:12px 0;font-weight:800;">
        <h3 style="margin:0 0 8px 0;color:var(--primary);font-family:"Trebuchet MS", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;">🎯 Compétences Multiplication</h3>
        <div class="competence-row" style="background:#fff;border:2px solid #ECEBF3;border-radius:12px;padding:8px 10px;margin:6px 0;"><strong>${medal(c.mult_ligne)}</strong> Je sais multiplier en ligne</div>
        <div class="competence-row" style="background:#fff;border:2px solid #ECEBF3;border-radius:12px;padding:8px 10px;margin:6px 0;"><strong>${medal(c.mult_1_sans)}</strong> Je sais multiplier à 1 chiffre sans retenue</div>
        <div class="competence-row" style="background:#fff;border:2px solid #ECEBF3;border-radius:12px;padding:8px 10px;margin:6px 0;"><strong>${medal(c.mult_1_avec)}</strong> Je sais multiplier à 1 chiffre avec retenue</div>
        <div class="competence-row" style="background:#fff;border:2px solid #ECEBF3;border-radius:12px;padding:8px 10px;margin:6px 0;"><strong>${medal(c.mult_2_avec)}</strong> Je sais multiplier à 2 chiffres avec retenue</div>
      </div>
    `;
  };

  function validateCompetence(kind, score, total){
    if(score < total) return false;
    const c = getCompetences();
    c[kind] = (c[kind] || 0) + 1;
    saveCompetences(c);
    if(typeof addScore === "function") addScore(20, "compétence multiplication validée");
    return true;
  }

  function getSessionConfig(level){
    if(level === "ligne"){
      return {
        title:"🤖 Multiplier en ligne",
        competence:"Je sais multiplier en ligne",
        kind:"mult_ligne",
        exos:[
          {q:"24 × 3", a:72, hint:"Décompose : 20 × 3 puis 4 × 3."},
          {q:"57 × 4", a:228, hint:"Décompose : 50 × 4 puis 7 × 4."}
        ]
      };
    }
    if(level === "sans"){
      return {
        title:"✏️ Multiplication posée sans retenue",
        competence:"Je sais multiplier à 1 chiffre sans retenue",
        kind:"mult_1_sans",
        exos:[
          {q:"21 × 3", a:63, hint:"Multiplie les unités puis les dizaines."},
          {q:"32 × 2", a:64, hint:"2 × 2 unités, puis 3 dizaines × 2."},
          {q:"41 × 4", a:164, hint:"4 × 1 puis 4 × 4 dizaines."}
        ]
      };
    }
    if(level === "avec"){
      return {
        title:"🚀 Multiplication posée avec retenue",
        competence:"Je sais multiplier à 1 chiffre avec retenue",
        kind:"mult_1_avec",
        exos:[
          {q:"28 × 4", a:112, hint:"8 × 4 = 32 : je pose 2 et je retiens 3."},
          {q:"53 × 6", a:318, hint:"3 × 6 = 18 : je pose 8 et je retiens 1."},
          {q:"79 × 5", a:395, hint:"9 × 5 = 45 : je pose 5 et je retiens 4."}
        ]
      };
    }
    return {
      title:"🥇 Multiplication posée à 2 chiffres avec retenue",
      competence:"Je sais multiplier à 2 chiffres avec retenue",
      kind:"mult_2_avec",
      exos:[
        {q:"24 × 12", a:288, hint:"Calcule 24 × 2 puis 24 × 10, puis additionne."},
        {q:"38 × 24", a:912, hint:"Calcule 38 × 4 puis 38 × 20, puis additionne."}
      ]
    };
  }

  window.startMultiplicationPosee = function(){
    const c = document.getElementById("chatContainer");
    const d = document.createElement("div");
    d.className = "message prof";
    d.innerHTML = `
      <div class="avatar prof">🦉</div>
      <div class="bubble">
        <div class="multi-box">
          <h3>✖️ Multiplication posée</h3>
          <div class="multi-desc">
            Sens : une multiplication, c'est une addition répétée.<br>
            Exemple : 4 × 3, c'est 3 + 3 + 3 + 3.
          </div>
          Choisis une compétence. Tu répondras directement dans le chat.
          <div class="multi-levels">
            <button class="multi-btn" onclick="launchMultiplicationPosee('ligne')">🤖 En ligne</button>
            <button class="multi-btn" onclick="launchMultiplicationPosee('sans')">✏️ Sans retenue</button>
            <button class="multi-btn" onclick="launchMultiplicationPosee('avec')">🚀 Avec retenue</button>
            <button class="multi-btn secondary" onclick="launchMultiplicationPosee('deux')">🥇 2 chiffres avec retenue</button>
          </div>
        </div>
      </div>`;
    c.appendChild(d);
    c.scrollTop = c.scrollHeight;
  };

  window.launchMultiplicationPosee = function(level){
    const cfg = getSessionConfig(level);
    window.multiplicationPoseeSession = {
      level,
      title:cfg.title,
      competence:cfg.competence,
      kind:cfg.kind,
      exos:cfg.exos,
      index:0,
      score:0,
      tries:0
    };
    addMessage("prof", `${cfg.title}<br><br>🎯 Compétence travaillée : <b>${cfg.competence}</b><br><br>Tu auras ${cfg.exos.length} calculs. Écris seulement le résultat dans le chat.`);
    askMultiplicationPosee();
  };

  function askMultiplicationPosee(){
    const s = window.multiplicationPoseeSession;
    if(!s) return;
    const ex = s.exos[s.index];
    addMessage("prof", `Exercice ${s.index+1}/${s.exos.length}<br><br><b>${ex.q}</b><br><br>Écris uniquement le résultat.`);
  }

  const previousSend = window.sendMessage;
  window.sendMessage = function(){
    const s = window.multiplicationPoseeSession;
    if(!s) return previousSend();

    const input = document.getElementById("userInput");
    const raw = (input.value || "").trim();
    if(!raw) return;

    addMessage("user", raw);
    input.value = "";

    const normalized = raw.replace(/\s/g,"").replace(",",".");
    const answer = Number(normalized);
    const ex = s.exos[s.index];

    if(!Number.isFinite(answer)){
      addMessage("prof", "Écris seulement un nombre, par exemple : 318.");
      return;
    }

    s.tries++;

    if(answer === ex.a){
      s.score++;
      if(typeof addScore === "function") addScore(s.tries === 1 ? 5 : 2, "multiplication posée");
      addMessage("prof", s.tries === 1 ? "✅ Bravo, bonne réponse !" : "✅ Bien corrigé !");
      s.index++;
      s.tries = 0;

      if(s.index >= s.exos.length){
        finishMultiplicationPosee();
      }else{
        askMultiplicationPosee();
      }
      return;
    }

    if(s.tries === 1){
      addMessage("prof", "❌ Ce n'est pas encore ça. Recalcule, je te repropose le même calcul.");
      askMultiplicationPosee();
    }else if(s.tries === 2){
      addMessage("prof", `💡 Indice : ${ex.hint}`);
      askMultiplicationPosee();
    }else{
      addMessage("prof", `🦉 Correction : <b>${ex.q} = ${ex.a}</b>`);
      s.index++;
      s.tries = 0;
      if(s.index >= s.exos.length){
        finishMultiplicationPosee();
      }else{
        askMultiplicationPosee();
      }
    }
  };

  function finishMultiplicationPosee(){
    const s = window.multiplicationPoseeSession;
    const total = s.exos.length;
    const perfect = s.score === total;
    let msg = `🏆 Résultat : <b>${s.score}/${total}</b><br>🎯 Compétence travaillée : <b>${s.competence}</b>`;
    if(perfect){
      const ok = validateCompetence(s.kind, s.score, total);
      if(ok) msg += `<br><br>⭐ Compétence validée ! +20 points bonus.`;
    }else{
      msg += `<br><br>🟡 Compétence pas encore validée. Tu peux recommencer plus tard.`;
    }
    addMessage("prof", msg);
    if(typeof logActivity === "function") logActivity("Multiplication posée", s.score, `${s.competence} · ${s.score}/${total}`);
    window.multiplicationPoseeSession = null;
  }

  // Ajoute le bloc compétences dans Mes progrès sans modifier le reste.
  const oldOpenProgress = window.openProgressPopup;
  if(typeof oldOpenProgress === "function" && !window.__multiProgressV50){
    window.__multiProgressV50 = true;
    window.openProgressPopup = function(){
      oldOpenProgress();
      setTimeout(function(){
        const zone = document.getElementById("progressPopupContent");
        if(zone && !zone.querySelector(".competences-box")){
          zone.innerHTML += window.hibouRenderCompetencesMultiplication();
        }
      }, 80);
    };
  }
})();
