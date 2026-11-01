
(function(){
  const challengeQuestions = [
    {q:"7 × 5 = ?", options:["30","35","40","45"], answer:"35", skill:"Tables de multiplication"},
    {q:"48 + 27 = ?", options:["65","75","85","95"], answer:"75", skill:"Calcul mental"},
    {q:"100 - 36 = ?", options:["54","64","74","84"], answer:"64", skill:"Calcul mental"},
    {q:"6 × 8 = ?", options:["42","48","54","56"], answer:"48", skill:"Tables de multiplication"},
    {q:"25 + 25 + 25 = ?", options:["50","65","75","100"], answer:"75", skill:"Addition"}
  ];

  let challengeState = { index:0, score:0, locked:false };

  function ensureChallengePopup(){
    if(document.getElementById("challengePopupOverlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "challengePopupOverlay";
    overlay.className = "challenge-popup-overlay";
    overlay.innerHTML = `
      <div class="challenge-popup-box" role="dialog" aria-modal="true" aria-label="Défi du maître">
        <div class="challenge-popup-head">
          <div class="challenge-popup-owl">🦉</div>
          <div>
            <div class="challenge-popup-title">Défi du maître</div>
            <div class="challenge-popup-sub">Réponds à 5 questions dans cette fenêtre.</div>
          </div>
        </div>

        <div class="challenge-popup-task" id="challengeTaskText">
          🎯 Mission du jour : réussir le plus de questions possible en Maths. Récompense : jusqu'à <b>50 points</b>.
        </div>

        <div class="challenge-popup-progress">
          <div class="challenge-popup-bar"><div class="challenge-popup-fill" id="challengePopupFill"></div></div>
          <div class="challenge-popup-count" id="challengePopupCount">0 / 5</div>
        </div>

        <div class="challenge-game-zone" id="challengeGameZone"></div>
      </div>
    `;
    overlay.addEventListener("click", function(e){
      if(e.target === overlay) closeMasterChallengePopup();
    });
    document.body.appendChild(overlay);
  }

  function updateSideProgress(){
    const fill = document.querySelector(".mockup-progress-fill");
    const text = document.querySelector(".mockup-progress-text");
    if(fill) fill.style.width = Math.round((challengeState.index / challengeQuestions.length) * 100) + "%";
    if(text) text.textContent = challengeState.index + " / " + challengeQuestions.length + " questions";
  }

  function updatePopupProgress(){
    const fill = document.getElementById("challengePopupFill");
    const count = document.getElementById("challengePopupCount");
    const pct = Math.round((challengeState.index / challengeQuestions.length) * 100);
    if(fill) fill.style.width = pct + "%";
    if(count) count.textContent = challengeState.index + " / " + challengeQuestions.length;
    updateSideProgress();
  }

  function renderStart(){
    challengeState = { index:0, score:0, locked:false };
    updatePopupProgress();
    const zone = document.getElementById("challengeGameZone");
    if(!zone) return;
    zone.innerHTML = `
      <div class="challenge-result-box">
        <div class="challenge-result-title">Prêt pour le défi ?</div>
        <div class="challenge-result-score">5 questions de maths CE2</div>
        <div class="challenge-reward">🎁 Jusqu'à +50 points</div>
      </div>
      <div class="challenge-popup-actions">
        <button class="challenge-popup-btn primary full" onclick="startPopupMasterChallenge()">🚀 Commencer le défi</button>
        <button class="challenge-popup-btn secondary full" onclick="closeMasterChallengePopup()">Fermer</button>
      </div>
    `;
  }

  function renderQuestion(){
    challengeState.locked = false;
    updatePopupProgress();
    const zone = document.getElementById("challengeGameZone");
    if(!zone) return;

    const item = challengeQuestions[challengeState.index];
    const buttons = item.options.map(function(opt){
      return `<button class="challenge-option" onclick="answerPopupMasterChallenge('${String(opt).replace(/'/g,"\\'")}')">${opt}</button>`;
    }).join("");

    zone.innerHTML = `
      <div class="challenge-question-card">
        <div class="challenge-question-number">Question ${challengeState.index + 1} / ${challengeQuestions.length} · ${item.skill}</div>
        <div class="challenge-question-text">${item.q}</div>
        <div class="challenge-options">${buttons}</div>
        <div class="challenge-feedback" id="challengeFeedback"></div>
      </div>
      <div class="challenge-popup-actions">
        <button class="challenge-popup-btn secondary full" onclick="closeMasterChallengePopup()">🔙 Quitter le défi</button>
      </div>
    `;
  }

  function addChallengePoints(points){
    try{
      if(typeof addPoints === "function"){
        addPoints(points);
        return;
      }
      const scoreEl = document.getElementById("scoreVal");
      if(scoreEl){
        const current = parseInt(scoreEl.textContent || "0", 10) || 0;
        scoreEl.textContent = current + points;
      }
    }catch(e){}
  }

  function renderEnd(){
    challengeState.index = challengeQuestions.length;
    updatePopupProgress();
    const zone = document.getElementById("challengeGameZone");
    if(!zone) return;

    const points = challengeState.score * 10;
    if(points > 0 && !challengeState.rewardGiven){
      challengeState.rewardGiven = true;
      addChallengePoints(points);
    }

    const success = challengeState.score >= 4;
    zone.innerHTML = `
      <div class="challenge-result-box">
        <div class="challenge-result-title">${success ? "🎉 Défi réussi !" : "💪 Défi terminé !"}</div>
        <div class="challenge-result-score">Score : ${challengeState.score} / ${challengeQuestions.length}</div>
        <div class="challenge-reward">⭐ +${points} points</div>
        <div style="margin-top:12px;font-weight:900;color:#2D2B55;">
          ${success ? "Bravo, tu as très bien travaillé !" : "Tu peux réessayer pour battre ton score."}
        </div>
      </div>
      <div class="challenge-popup-actions">
        <button class="challenge-popup-btn primary" onclick="startPopupMasterChallenge()">🔁 Rejouer</button>
        <button class="challenge-popup-btn purple" onclick="closeMasterChallengePopup()">Terminer</button>
      </div>
    `;
  }

  window.openMasterChallengePopup = function(){
    ensureChallengePopup();
    const overlay = document.getElementById("challengePopupOverlay");
    if(overlay) overlay.classList.add("visible");
    renderStart();
  };

  window.closeMasterChallengePopup = function(){
    const overlay = document.getElementById("challengePopupOverlay");
    if(overlay) overlay.classList.remove("visible");
  };

  window.startPopupMasterChallenge = function(){
    challengeState = { index:0, score:0, locked:false, rewardGiven:false };
    renderQuestion();
  };

  window.answerPopupMasterChallenge = function(choice){
    if(challengeState.locked) return;
    challengeState.locked = true;

    const item = challengeQuestions[challengeState.index];
    const ok = choice === item.answer;
    if(ok) challengeState.score++;

    document.querySelectorAll(".challenge-option").forEach(function(btn){
      btn.disabled = true;
      const val = (btn.textContent || "").trim();
      if(val === item.answer) btn.classList.add("correct");
      else if(val === choice) btn.classList.add("wrong");
    });

    const feedback = document.getElementById("challengeFeedback");
    if(feedback){
      feedback.className = "challenge-feedback " + (ok ? "ok" : "bad");
      feedback.textContent = ok ? "✅ Bravo !" : "❌ Presque ! La bonne réponse était " + item.answer + ".";
    }

    setTimeout(function(){
      challengeState.index++;
      if(challengeState.index >= challengeQuestions.length) renderEnd();
      else renderQuestion();
    }, 950);
  };

  function makeChallengeClickable(){
    ensureChallengePopup();

    document.querySelectorAll(".mockup-challenge-top").forEach(function(el){
      el.onclick = openMasterChallengePopup;
      el.title = "Ouvrir le défi du maître";
    });

    const sideCards = document.querySelectorAll(".mockup-side-card");
    if(sideCards[0]){
      sideCards[0].onclick = openMasterChallengePopup;
      sideCards[0].title = "Ouvrir le défi du maître";
      if(!sideCards[0].querySelector(".challenge-click-note")){
        const note = document.createElement("div");
        note.className = "challenge-click-note";
        note.textContent = "👆 Clique ici pour jouer le défi";
        sideCards[0].appendChild(note);
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function(){
    setTimeout(makeChallengeClickable, 180);
  });
  window.addEventListener("load", function(){
    setTimeout(makeChallengeClickable, 240);
  });
})();
