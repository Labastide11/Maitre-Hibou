
/* Maître Hibou V25.7.67 — clic « Mon parcours récent » */
(function(){
  'use strict';
  if(window.__hibouParcoursRecentClickV25767) return;
  window.__hibouParcoursRecentClickV25767 = true;

  function openParcours(ev){
    if(ev){
      try{ ev.preventDefault(); }catch(e){}
      try{ ev.stopPropagation(); }catch(e){}
    }
    if(typeof window.openHibouProgressConsolidatedV25762 === 'function'){
      window.openHibouProgressConsolidatedV25762(ev);
      return true;
    }
    if(typeof window.openProgressPopup === 'function'){
      window.openProgressPopup();
      return true;
    }
    console.warn('Maître Hibou V25.7.67 : popup Mes progrès indisponible.');
    return false;
  }

  /* Délégation : reste valide même si le bandeau est reconstruit dynamiquement. */
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

  window.openHibouRecentJourneyV25767 = openParcours;
})();
