
/* Maître Hibou V25.7.70 — clic « Mon parcours récent » */
(function(){
  'use strict';
  if(window.__hibouParcoursRecentClickV25770) return;
  window.__hibouParcoursRecentClickV25770 = true;

  function openParcours(ev){
    if(ev){
      try{ ev.preventDefault(); }catch(e){}
      try{ ev.stopPropagation(); }catch(e){}
    }
    if(typeof window.openHibouRecentJourneyPopupV25770 === 'function'){
      window.openHibouRecentJourneyPopupV25770(ev);
      return true;
    }
    if(typeof window.openHibouProgressConsolidatedV25762 === 'function'){
      window.openHibouProgressConsolidatedV25762(ev);
      return true;
    }
    return false;
  }

  document.addEventListener('click', function(ev){
    var card = ev.target && ev.target.closest ? ev.target.closest('#bandeauLastCard') : null;
    if(!card) return;
    openParcours(ev);
  }, true);

  document.addEventListener('keydown', function(ev){
    if(ev.key !== 'Enter' && ev.key !== ' ') return;
    var card = ev.target && ev.target.closest ? ev.target.closest('#bandeauLastCard') : null;
    if(!card) return;
    openParcours(ev);
  }, true);

  window.openHibouRecentJourneyV25770 = openParcours;
})();
