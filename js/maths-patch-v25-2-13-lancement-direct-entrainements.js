(function(){
  if(window.__maitreHibouV25213DirectTrainingLaunch) return;
  window.__maitreHibouV25213DirectTrainingLaunch = true;

  var VERSION_TITLE = '🦉 Maître Hibou V25.8.84';

  function byId(id){ return document.getElementById(id); }
  function norm(v){
    return String(v == null ? '' : v).trim().toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g,'')
      .replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'');
  }
  function setTitle(){ try{ document.title = VERSION_TITLE; }catch(e){} }

  function closeChoicePopup(){
    var ov = byId('trainingChoiceFullscreenV2406');
    if(ov){
      ov.classList.add('hidden');
      ov.setAttribute('aria-hidden','true');
    }
  }

  function showSafeLoading(subject){
    if(subject === 'francais'){
      var fr = byId('frenchPopupInnerV2348');
      if(fr){
        fr.innerHTML = '<div class="fr-v2348-header"><div class="fr-v2348-owl">🦉</div><div class="fr-v2348-title"><h2>📖 Entraînement de français</h2><p>Préparation de l’exercice...</p></div></div><div class="fr-v2348-content"><section class="fr-v2348-panel"><div class="fr-v2348-feedback" style="padding:28px">🦉 Chargement de l’entraînement...</div></section></div>';
      }
    }
    if(subject === 'maths'){
      var ma = byId('mathsPopupInnerV2343');
      if(ma){
        ma.innerHTML = '<div class="maths-v2343-header"><div class="maths-v2343-owl">🦉</div><div class="maths-v2343-title"><h2>🧮 Entraînement de calcul</h2><p>Préparation de l’exercice...</p></div></div><div class="maths-v2343-content"><section class="maths-v2343-panel"><div class="maths-v2343-loading">🦉 Préparation de 10 calculs...</div></section></div>';
      }
    }
  }

  function launchFrenchTrainingDirect(beltId){
    closeChoicePopup();
    if(typeof window.openFrenchTrainingPopupV2348 === 'function'){
      window.openFrenchTrainingPopupV2348();
    }
    showSafeLoading('francais');
    if(typeof window.startFrenchTrainingV2348 === 'function'){
      return window.startFrenchTrainingV2348(beltId || 'blanche');
    }
    return false;
  }

  function launchMathsTrainingDirect(beltId){
    closeChoicePopup();
    if(typeof window.openMathsTrainingPopupV2343 === 'function'){
      window.openMathsTrainingPopupV2343();
    }
    showSafeLoading('maths');
    if(typeof window.startMathsTrainingV2343 === 'function'){
      return window.startMathsTrainingV2343(beltId || 'blanche');
    }
    return false;
  }

  window.startTrainingFromChoiceV2413 = function(subject, beltId){
    subject = norm(subject);
    if(subject === 'francais' || subject === 'français') return launchFrenchTrainingDirect(beltId || 'blanche');
    if(subject === 'maths') return launchMathsTrainingDirect(beltId || 'blanche');
    return false;
  };

  // Sécurité : si un ancien bouton garde un onclick inline, on intercepte quand même le clic
  // dans la fenêtre « M'entraîner » et on route vers le vrai exercice.
  document.addEventListener('click', function(ev){
    var card = ev.target && ev.target.closest ? ev.target.closest('#trainingChoiceFullscreenV2406 .v22-belt-card.practice-card') : null;
    if(!card) return;
    var onclick = card.getAttribute('onclick') || '';
    var m = onclick.match(/startTrainingFromChoiceV2413\(["']([^"']+)["']\s*,\s*["']([^"']+)["']\)/);
    if(!m) return;
    ev.preventDefault();
    ev.stopPropagation();
    if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    window.startTrainingFromChoiceV2413(m[1], m[2]);
  }, true);

  setTitle();
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setTitle);
  window.addEventListener('load', setTitle);
  setInterval(setTitle, 1000);
})();
