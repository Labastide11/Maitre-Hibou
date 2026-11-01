
(function(){
  function patchVerbeButtonDirect(){
    document.querySelectorAll("button.quick-btn").forEach(function(btn){
      const label = (btn.textContent || "").toLowerCase();
      const onclick = (btn.getAttribute("onclick") || "");
      if(label.includes("verbe") || onclick.includes("Explique-moi le verbe")){
        btn.setAttribute("onclick", "startVerbe()");
      }
    });
  }

  const oldUpdateQuickQuestions = window.updateQuickQuestions;
  if(typeof oldUpdateQuickQuestions === "function" && !window.__patchVerbeDirectV64){
    window.__patchVerbeDirectV64 = true;
    window.updateQuickQuestions = function(subject){
      const result = oldUpdateQuickQuestions.apply(this, arguments);
      setTimeout(patchVerbeButtonDirect, 0);
      return result;
    };
  }

  document.addEventListener("DOMContentLoaded", function(){
    setTimeout(patchVerbeButtonDirect, 100);
  });
  window.addEventListener("load", function(){
    setTimeout(patchVerbeButtonDirect, 100);
  });
})();
