/* V7.8 - Correctif lien manquant : bouton "Défi tables 2 à 10" */
(function(){
  window.startMasterTablesChallenge = function(){
    if (typeof makeTablesChallenge20Questions === "function" && typeof startLocalQuiz === "function") {
      const questions = makeTablesChallenge20Questions();
      startLocalQuiz("maths", "🏆 Défi tables 2 à 10", questions, true);
      return;
    }
    if (typeof startActiveChallenge === "function") {
      startActiveChallenge();
      return;
    }
    alert("Le défi tables n'est pas disponible pour le moment.");
  };

  function patchDefiTablesButton(){
    document.querySelectorAll("button.quick-btn").forEach(function(btn){
      const label = (btn.textContent || "").toLowerCase();
      if(label.includes("défi tables") || label.includes("tables 2 à 10")){
        btn.setAttribute("onclick", "startMasterTablesChallenge()");
      }
    });
  }

  const oldSelectSubjectV78 = window.selectSubject;
  if(typeof oldSelectSubjectV78 === "function" && !window.__patchDefiTablesSelectV78){
    window.__patchDefiTablesSelectV78 = true;
    window.selectSubject = function(btn, subject){
      const result = oldSelectSubjectV78.apply(this, arguments);
      setTimeout(patchDefiTablesButton, 50);
      return result;
    };
  }

  document.addEventListener("DOMContentLoaded", function(){
    setTimeout(patchDefiTablesButton, 150);
  });
  window.addEventListener("load", function(){
    setTimeout(patchDefiTablesButton, 150);
  });
})();
