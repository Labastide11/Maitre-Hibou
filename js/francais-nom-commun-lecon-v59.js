
(function(){
  window.showNomCommunLesson = function(){
    const c = document.getElementById("chatContainer");
    if(!c) return;

    const d = document.createElement("div");
    d.className = "message prof";
    d.innerHTML = `
      <div class="avatar prof">🦉</div>
      <div class="bubble">
        <div class="nom-commun-lesson">
          <h3>✍️ Nom commun</h3>
          <div class="nom-commun-rule">
            Un <b>nom commun</b> sert à nommer une personne, un animal, une chose ou un lieu.
          </div>
          <div class="nom-commun-examples">
            ✅ une personne : <b>un élève</b><br>
            ✅ un animal : <b>un chat</b><br>
            ✅ une chose : <b>une table</b><br>
            ✅ un lieu : <b>une école</b><br><br>
            Souvent, il y a un déterminant devant : <b>un, une, le, la, les, des</b>.<br><br>
            Exemple : dans <b>Le chien dort</b>, le nom commun est <b>chien</b>.
          </div>
          Quand tu as relu la leçon, tu peux commencer le quiz.
          <button class="nom-commun-quiz-btn" onclick="startNomCommunQuizFromLesson()">➡️ Faire le quiz Nom commun</button>
        </div>
      </div>`;
    c.appendChild(d);
    c.scrollTop = c.scrollHeight;
  };

  window.startNomCommunQuizFromLesson = function(){
    if(typeof startLocalQuiz === "function"){
      startLocalQuiz("francais", "✍️ Quiz local Français CE2");
    }else if(typeof startNomCommun === "function"){
      // sécurité si le quiz nom commun existant est codé autrement
      const original = window.__oldStartNomCommunV59;
      if(typeof original === "function") original();
    }
  };

  // On conserve l'ancienne fonction si elle existe, puis on la remplace par la leçon.
  if(typeof window.startNomCommun === "function" && !window.__oldStartNomCommunV59){
    window.__oldStartNomCommunV59 = window.startNomCommun;
    window.startNomCommun = function(){
      showNomCommunLesson();
    };
  }

  function patchNomCommunButtons(){
    document.querySelectorAll("button.quick-btn, button.local-quiz-card").forEach(function(btn){
      const label = (btn.textContent || "").toLowerCase();
      const action = (btn.getAttribute("onclick") || "").toLowerCase();
      if(label.includes("nom commun") || action.includes("startnomcommun")){
        btn.setAttribute("onclick", "startNomCommun()");
      }
    });
  }

  const oldSelect = window.selectSubject;
  if(typeof oldSelect === "function" && !window.__patchNomCommunSelectV59){
    window.__patchNomCommunSelectV59 = true;
    window.selectSubject = function(btn, subject){
      const result = oldSelect.apply(this, arguments);
      setTimeout(patchNomCommunButtons, 0);
      setTimeout(patchNomCommunButtons, 100);
      return result;
    };
  }

  document.addEventListener("DOMContentLoaded", function(){
    setTimeout(patchNomCommunButtons, 100);
  });
  window.addEventListener("load", function(){
    setTimeout(patchNomCommunButtons, 100);
  });
})();
