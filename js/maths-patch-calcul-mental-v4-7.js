(function(){
  function patchCalculMentalButtons(){
    document.querySelectorAll('button.quick-btn').forEach(function(btn){
      var label = (btn.textContent || '').toLowerCase();
      var action = (btn.getAttribute('onclick') || '').toLowerCase();
      if (label.includes("calcul mental") || action.includes("calcul mental ce2")) {
        btn.textContent = "⚡ Calcul mental";
        btn.setAttribute("onclick", "startCalculMentalCE2()");
      }
    });
  }

  var previousSelectSubjectCM = window.selectSubject;
  if (typeof previousSelectSubjectCM === "function" && !window.__calculMentalPatched) {
    window.__calculMentalPatched = true;
    window.selectSubject = function(btn, subject){
      previousSelectSubjectCM(btn, subject);
      setTimeout(patchCalculMentalButtons, 0);
      setTimeout(patchCalculMentalButtons, 100);
    };
  }

  document.addEventListener("DOMContentLoaded", function(){
    patchCalculMentalButtons();
    setTimeout(patchCalculMentalButtons, 200);
  });
  window.addEventListener("load", function(){
    patchCalculMentalButtons();
    setTimeout(patchCalculMentalButtons, 200);
  });
})();
