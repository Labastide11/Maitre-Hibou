
(function(){
  function getVerbeLesson(){
    return document.querySelector(".verbe-lesson[data-verbe='true'], .verbe-lesson");
  }

  function scrollToVerbeLesson(box){
    const chat = document.getElementById("chatContainer");
    if(box){
      box.setAttribute("data-verbe", "true");
      box.scrollIntoView({behavior:"smooth", block:"center"});
      if(chat) setTimeout(function(){ chat.scrollTop = chat.scrollHeight; }, 80);
      return true;
    }
    return false;
  }

  window.showVerbeLesson = function(){
    const existing = getVerbeLesson();
    if(existing){
      scrollToVerbeLesson(existing);
      return;
    }

    const c = document.getElementById("chatContainer");
    if(!c) return;

    const d = document.createElement("div");
    d.className = "message prof";
    d.innerHTML = `
      <div class="avatar prof">🦉</div>
      <div class="bubble">
        <div class="verbe-lesson" data-verbe="true">
          <h3>✍️ Le verbe</h3>
          <div class="verbe-rule">
            Un <b>verbe</b> indique souvent une action ou ce que fait quelqu'un.
          </div>
          <div class="verbe-examples">
            ✅ Dans <b>Le chat dort</b>, le verbe est <b>dort</b>.<br>
            ✅ Dans <b>Les enfants jouent</b>, le verbe est <b>jouent</b>.<br>
            ✅ Dans <b>Je mange une pomme</b>, le verbe est <b>mange</b>.<br><br>
            Astuce : on peut souvent mettre <b>ne ... pas</b> autour du verbe.<br>
            Exemple : Le chat <b>ne dort pas</b>.
          </div>
          Quand tu as relu la leçon, tu peux faire le quiz.
          <button class="verbe-quiz-btn" onclick="startVerbeQuizFromLesson()">➡️ Faire le quiz Verbe</button>
        </div>
      </div>`;
    c.appendChild(d);
    c.scrollTop = c.scrollHeight;
  };

  window.startVerbeQuizFromLesson = function(){
    if(typeof startSkillCheck === "function"){
      startSkillCheck("verbe");
    }else if(typeof startLocalQuiz === "function"){
      startLocalQuiz("francais", "✍️ Quiz local Français CE2");
    }
  };

  window.startVerbe = function(){
    showVerbeLesson();
  };

  function patchFrancaisMenu(){
    document.querySelectorAll("button.quick-btn, button.local-quiz-card").forEach(function(btn){
      const label = (btn.textContent || "").toLowerCase();
      const action = (btn.getAttribute("onclick") || "").toLowerCase();

      if(label.includes("verbe") || action.includes("verbe") || action.includes("aide-moi à reconnaître un verbe")){
        btn.setAttribute("onclick", "startVerbe()");
      }
    });

    // Si le sous-menu français existe mais sans bouton Verbe local, on l'ajoute.
    const q = document.getElementById("quickQuestions");
    const active = document.querySelector(".subject-btn.active");
    if(q && active && active.getAttribute("data-subject") === "francais" && !q.querySelector("#verbeQuickBtnV63")){
      q.insertAdjacentHTML("beforeend", '<button id="verbeQuickBtnV63" class="quick-btn" onclick="startVerbe()">✍️ Le verbe</button>');
    }
  }

  const oldSelect = window.selectSubject;
  if(typeof oldSelect === "function" && !window.__patchVerbeSelectV63){
    window.__patchVerbeSelectV63 = true;
    window.selectSubject = function(btn, subject){
      const result = oldSelect.apply(this, arguments);
      setTimeout(patchFrancaisMenu, 0);
      setTimeout(patchFrancaisMenu, 120);
      return result;
    };
  }

  document.addEventListener("DOMContentLoaded", function(){
    setTimeout(patchFrancaisMenu, 100);
  });
  window.addEventListener("load", function(){
    setTimeout(patchFrancaisMenu, 100);
  });
})();
