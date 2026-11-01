(function(){
  if(window.__hibouV25644MathsCeintureAnswerFix) return;
  window.__hibouV25644MathsCeintureAnswerFix = true;

  document.addEventListener('click', function(ev){
    var btn = ev.target && ev.target.closest ? ev.target.closest('.v222-math-option') : null;
    if(!btn || btn.disabled) return;
    var box = btn.closest('.v222-math-options');
    if(!box) return;
    var buttons = Array.prototype.slice.call(box.querySelectorAll('.v222-math-option'));
    var idx = btn.hasAttribute('data-index') ? Number(btn.getAttribute('data-index')) : buttons.indexOf(btn);
    if(!Number.isFinite(idx) || idx < 0 || typeof window.answerMathSkillV222 !== 'function') return;
    ev.preventDefault();
    ev.stopPropagation();
    if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    if(btn.__hibouV25644ClickLock) return;
    btn.__hibouV25644ClickLock = true;
    try{ window.answerMathSkillV222(idx); }
    catch(e){ console.error('Erreur réponse ceinture Maths V25.7.3', e); }
    finally{ setTimeout(function(){ btn.__hibouV25644ClickLock = false; }, 900); }
  }, true);

  try{ document.title = '🦉 Maître Hibou V25.8.84'; }catch(e){}
})();
