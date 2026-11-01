
(function(){
  function getNomCommunLesson(){
    return document.querySelector(".nom-commun-lesson[data-nom-commun='true'], .nom-commun-lesson");
  }

  function scrollToNomCommunLesson(box){
    const chat = document.getElementById("chatContainer");
    if(box){
      box.setAttribute("data-nom-commun", "true");
      box.scrollIntoView({behavior:"smooth", block:"center"});
      if(chat) setTimeout(function(){ chat.scrollTop = chat.scrollHeight; }, 80);
      return true;
    }
    return false;
  }

  const oldShowNomCommunLesson = window.showNomCommunLesson;
  if(typeof oldShowNomCommunLesson === "function" && !window.__nomCommunUniqueV62){
    window.__nomCommunUniqueV62 = true;

    window.showNomCommunLesson = function(){
      const existing = getNomCommunLesson();
      if(existing){
        scrollToNomCommunLesson(existing);
        return;
      }

      const result = oldShowNomCommunLesson.apply(this, arguments);

      setTimeout(function(){
        const box = document.querySelector(".nom-commun-lesson");
        if(box) box.setAttribute("data-nom-commun", "true");
      }, 50);

      return result;
    };
  }

  const oldStartNomCommun = window.startNomCommun;
  if(typeof oldStartNomCommun === "function" && !window.__startNomCommunUniqueV62){
    window.__startNomCommunUniqueV62 = true;
    window.startNomCommun = function(){
      const existing = getNomCommunLesson();
      if(existing){
        scrollToNomCommunLesson(existing);
        return;
      }
      return oldStartNomCommun.apply(this, arguments);
    };
  }
})();
