(function(){
  'use strict';
  if(window.__HIBOU_FRENCH_TEST_TRIGGER_V25832) return;
  window.__HIBOU_FRENCH_TEST_TRIGGER_V25832 = true;

  let timer = null;
  let activePointerId = null;
  let fired = false;
  let startX = 0, startY = 0;

  function clearHold(){
    if(timer){ clearTimeout(timer); timer = null; }
    activePointerId = null;
  }

  function isReadingOwl(target){
    if(!target || !target.closest) return null;
    const owl = target.closest('.fr-v2348-owl');
    if(!owl) return null;
    const french = owl.closest('#frenchTrainingOverlayV2348');
    return french ? owl : null;
  }

  function openTeacherTest(){
    const fn =
      window.openFrenchTeacherTestV25831 ||
      window.openFrenchTeacherTestV25830 ||
      window.openFrenchTeacherTestV25829 ||
      window.openFrenchTeacherTestV25828 ||
      window.openFrenchTeacherTestV25827 ||
      window.openFrenchTeacherTestV25826 ||
      window.openFrenchTeacherTestV25822;

    if(typeof fn === 'function'){
      fn();
      return true;
    }
    return false;
  }

  document.addEventListener('pointerdown', function(ev){
    const owl = isReadingOwl(ev.target);
    if(!owl) return;
    if(ev.pointerType === 'mouse' && ev.button !== 0) return;

    clearHold();
    fired = false;
    activePointerId = ev.pointerId;
    startX = ev.clientX || 0;
    startY = ev.clientY || 0;

    owl.classList.add('hibou-fr-secret-hold-v25831');

    timer = setTimeout(function(){
      timer = null;
      fired = openTeacherTest();
      owl.classList.remove('hibou-fr-secret-hold-v25831');
      if(fired){
        try{ navigator.vibrate && navigator.vibrate(40); }catch(e){}
      }
    }, 2000);
  }, true);

  document.addEventListener('pointermove', function(ev){
    if(activePointerId === null || ev.pointerId !== activePointerId || !timer) return;
    const dx = Math.abs((ev.clientX || 0) - startX);
    const dy = Math.abs((ev.clientY || 0) - startY);
    /* Tolerance prevents tiny tablet/mouse movements from cancelling the hold. */
    if(dx > 24 || dy > 24) clearHold();
  }, true);

  document.addEventListener('pointerup', function(ev){
    if(activePointerId !== null && ev.pointerId === activePointerId) clearHold();
  }, true);

  document.addEventListener('pointercancel', function(ev){
    if(activePointerId !== null && ev.pointerId === activePointerId) clearHold();
  }, true);

  /* Prevent the browser context menu on the hidden teacher trigger. */
  document.addEventListener('contextmenu', function(ev){
    if(isReadingOwl(ev.target)) ev.preventDefault();
  }, true);

  /* Do not cancel on pointerleave: this was too fragile on tablets. */
})();