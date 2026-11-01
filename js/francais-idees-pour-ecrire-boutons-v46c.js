
(function(){
  function patchIdeesPourEcrireButtons(){
    document.querySelectorAll('button.quick-btn').forEach(function(btn){
      var label = (btn.textContent || '').toLowerCase();
      var action = (btn.getAttribute('onclick') || '').toLowerCase();
      if (
        label.includes("idée d'histoire") ||
        label.includes("idées d'histoire") ||
        label.includes("idées pour écrire") ||
        action.includes("super-héros") ||
        action.includes("super héros") ||
        action.includes("aide-moi à écrire")
      ) {
        btn.textContent = "✏️ Idées pour écrire";
        btn.setAttribute("onclick", "startIdeesPourEcrire()");
      }
    });
  }

  var oldSelectSubject = window.selectSubject;
  if (typeof oldSelectSubject === "function") {
    window.selectSubject = function(btn, subject){
      oldSelectSubject(btn, subject);
      setTimeout(patchIdeesPourEcrireButtons, 0);
      setTimeout(patchIdeesPourEcrireButtons, 100);
    };
  }

  var oldSendQuick = window.sendQuick;
  if (typeof oldSendQuick === "function") {
    window.sendQuick = function(text){
      var t = String(text || "").toLowerCase();
      if (
        t.includes("aide-moi à écrire une histoire") ||
        t.includes("super-héros") ||
        t.includes("super héros") ||
        t.includes("idées pour écrire")
      ) {
        if (typeof startIdeesPourEcrire === "function") {
          startIdeesPourEcrire();
          return;
        }
      }
      return oldSendQuick(text);
    };
  }

  document.addEventListener("DOMContentLoaded", function(){
    patchIdeesPourEcrireButtons();
    setTimeout(patchIdeesPourEcrireButtons, 200);
  });
  window.addEventListener("load", function(){
    patchIdeesPourEcrireButtons();
    setTimeout(patchIdeesPourEcrireButtons, 200);
  });
})();
