(function(){
  function patchMathsMenu(){
    const q = document.getElementById("quickQuestions");
    if(!q) return;

    // Si le menu Maths est affiché, on force un sous-menu clair.
    const active = document.querySelector(".subject-btn.active");
    const subject = active ? active.getAttribute("data-subject") : "";
    if(subject === "maths"){
      q.innerHTML = `
        <button class="quick-btn" onclick="startCalculMentalCE2()">⚡ Calcul mental</button>
        <button class="quick-btn" onclick="startMultiplicationPosee()">✖️ Multiplication posée</button>
        <button class="quick-btn" onclick="startLocalQuiz('maths','🧮 Quiz local Maths CE2')">🧮 Quiz Maths</button>
        <button class="quick-btn" onclick="window.open('https://www.logicieleducatif.fr/jeu/tables-de-multiplication','_blank')">🌐 Tables de multiplication</button>
      `;
    }
  }

  const oldSelect = window.selectSubject;
  if(typeof oldSelect === "function" && !window.__patchMenuMultiV50){
    window.__patchMenuMultiV50 = true;
    window.selectSubject = function(btn, subject){
      oldSelect(btn, subject);
      setTimeout(patchMathsMenu, 0);
      setTimeout(patchMathsMenu, 100);
    };
  }

  document.addEventListener("DOMContentLoaded", patchMathsMenu);
  window.addEventListener("load", patchMathsMenu);
})();
