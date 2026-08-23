
/* Maître Hibou V25.7.69 — Popup dédiée « Mon parcours récent » */
(function(){
  'use strict';
  if(window.__hibouRecentJourneyPopupV25769) return;
  window.__hibouRecentJourneyPopupV25769 = true;

  var overlay = null;

  function clean(v){ return String(v == null ? '' : v).replace(/\s+/g,' ').trim(); }
  function esc(v){ return clean(v).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function currentName(){ return window.hibouStudentSystem ? window.hibouStudentSystem.currentName() : ''; }
  function eventDate(e){ return e && (e.date_iso || e.date || ''); }
  function formatDate(v){
    var d = new Date(v || '');
    if(isNaN(d)) return clean(v);
    return d.toLocaleDateString('fr-FR') + ' à ' + d.toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'});
  }
  function eventText(e){
    var raw = clean((e && (e.affichage || e.texte || e.titre || e.activite)) || 'Activité');
    // Nettoyage des répétitions fréquentes issues des traces techniques.
    raw = raw.replace(/\s*[—-]\s*(\d+\/\d+)\s*[—-]\s*\1\b/g,' — $1');
    raw = raw.replace(/\s*[—-]\s*(🥇\s*Or|🥈\s*Argent|🥉\s*Bronze)\s*[—-]\s*(\d+\/\d+)\s*[—-]\s*\2\s*[—-]\s*\1/gi,' — $1 — $2');
    return raw;
  }
  function domainLabel(e){
    var m = clean((e && (e.matiere || e.domaine)) || '');
    if(m) return m;
    var src = clean((e && e.source) || '');
    if(/lecture/i.test(src)) return 'Lecture';
    if(/francais|français/i.test(src)) return 'Français';
    if(/math/i.test(src)) return 'Maths';
    return '';
  }
  function resultLabel(e){
    if(!e) return '';
    var medal = clean(e.medaille || '');
    var score = (e.score!=='' && e.score!=null && e.total!=='' && e.total!=null) ? clean(e.score)+'/'+clean(e.total) : '';
    if(medal){
      var nice = /or/i.test(medal) ? '🥇 Or' : /argent/i.test(medal) ? '🥈 Argent' : /bronze/i.test(medal) ? '🥉 Bronze' : medal;
      return score ? nice+' — '+score : nice;
    }
    if(e.resultat==='reussite') return score ? '✅ Réussite — '+score : '✅ Réussite';
    if(e.resultat==='erreur') return '🎯 À reprendre';
    return score ? score : '';
  }
  function icon(e){
    if(!e) return '🧭';
    if(e.resultat === 'erreur') return '❌';
    if(e.type === 'ceinture_validee' || e.type === 'ceinture_francais_validee' || e.categorie === 'ceinture') return '🏅';
    if(/question/.test(e.type || '')) return '💬';
    if(/record/.test((e.type || '') + ' ' + (e.categorie || ''))) return '⏱️';
    if(/lecture/.test(e.type || '')) return '📖';
    if(/entrainement/.test(e.type || '')) return '🧮';
    return e.resultat === 'reussite' ? '✅' : '🧭';
  }
  function history(){
    var n = currentName();
    return window.hibouGetEventHistory ? window.hibouGetEventHistory(n) : [];
  }
  function currentStudentData(){
    var obj = null;
    try{ obj = window.__hibouStudentSnapshot && window.__hibouStudentSnapshot.eleve ? window.__hibouStudentSnapshot.eleve : null; }catch(e){}
    if(obj && obj.prenom) return obj;
    try{
      var ls = JSON.parse(localStorage.getItem('hibou_current_student') || '{}');
      if(ls && ls.prenom) return ls;
    }catch(e){}
    return { prenom: currentName() || 'Élève', sexe: '' };
  }
  function avatarPath(){
    var s = clean(currentStudentData().sexe).toLowerCase();
    if(/^f/.test(s)) return 'images/portrait_fille.png';
    if(/^g/.test(s) || /^m/.test(s) || /gar/.test(s) || /boy/.test(s)) return 'images/portrait_garcon.png';
    return 'images/portrait_neutre.png';
  }
  function avatarHtml(){
    var name = clean(currentStudentData().prenom || currentName() || 'Élève');
    return '<img class="hrj-avatar" src="'+avatarPath()+'" alt="Portrait de '+esc(name)+'">';
  }
  function listHtml(rows){
    if(!rows.length) return '<div class="hrj-empty">Aucune activité enregistrée pour le moment.</div>';
    return rows.map(function(e){
      var dom = domainLabel(e);
      var res = resultLabel(e);
      return '<article class="hrj-event '+(e.resultat==='erreur'?'is-error':'')+'">'
        + '<span class="hrj-event-icon">'+icon(e)+'</span>'
        + '<div class="hrj-event-text">'
        + '<strong>'+esc(eventText(e))+'</strong>'
        + '<div class="hrj-event-meta">'+esc(formatDate(eventDate(e)))+(dom?' · '+esc(dom):'')+'</div>'
        + (res?'<div class="hrj-event-result">'+esc(res)+'</div>':'')
        + '</div>'
        + '</article>';
    }).join('');
  }
  function ensure(){
    if(overlay && document.body.contains(overlay)) return overlay;
    overlay = document.createElement('div');
    overlay.id = 'hibouRecentJourneyOverlayV25769';
    overlay.className = 'hrj-overlay hidden';
    overlay.innerHTML =
      '<div class="hrj-dialog" role="dialog" aria-modal="true" aria-label="Mon parcours récent">'
      + '<button class="hrj-close" type="button" aria-label="Fermer">×</button>'
      + '<div id="hibouRecentJourneyBodyV25769"></div>'
      + '</div>';
    document.body.appendChild(overlay);
    overlay.querySelector('.hrj-close').onclick = close;
    overlay.onclick = function(e){ if(e.target === overlay) close(); };
    injectStyles();
    return overlay;
  }
  function injectStyles(){
    if(document.getElementById('hibouRecentJourneyStylesV25769')) return;
    var css = document.createElement('style');
    css.id = 'hibouRecentJourneyStylesV25769';
    css.textContent =
      '.hrj-overlay{position:fixed;inset:0;background:rgba(21,24,45,.45);display:flex;align-items:center;justify-content:center;z-index:999999;padding:16px;}'
      + '.hrj-overlay.hidden{display:none;}'
      + '.hrj-dialog{width:min(820px,100%);max-height:min(90vh,920px);overflow:auto;background:#ffffff;border-radius:24px;box-shadow:0 18px 50px rgba(0,0,0,.20);padding:18px 18px 22px;position:relative;border:3px solid #ece7fb;}'
      + '.hrj-close{position:absolute;right:12px;top:10px;width:42px;height:42px;border:none;border-radius:999px;background:#f3efff;color:#5a37a6;font-size:28px;cursor:pointer;}'
      + '.hrj-header{display:flex;gap:18px;align-items:center;margin-bottom:16px;padding:20px 56px 20px 20px;border-radius:20px;background:linear-gradient(135deg,#17336e,#1d4f91);color:#fff;}'
      + '.hrj-avatar{width:78px;height:78px;object-fit:contain;border-radius:18px;background:#fff;border:3px solid rgba(255,255,255,.85);padding:7px;box-shadow:0 4px 14px rgba(0,0,0,.12);}'
      + '.hrj-chip{display:inline-flex;align-items:center;gap:6px;background:#ffffff;color:#3f3a85;border-radius:999px;padding:6px 12px;font-weight:900;font-size:13px;margin-bottom:6px;}'
      + '.hrj-header h2{margin:0;font-size:31px;color:#ffffff;line-height:1.1;}'
      + '.hrj-header p{margin:7px 0 0;color:#eef4ff;font-size:16px;line-height:1.35;max-width:520px;}'
      + '.hrj-card{background:#ffffff;border:2px solid #ece7fb;border-radius:18px;padding:16px;}'
      + '.hrj-card h3{margin:0 0 12px;color:#263264;font-size:22px;}'
      + '.hrj-event{display:flex;gap:14px;align-items:flex-start;padding:14px 4px;border-bottom:1px solid #ece7fb;}'
      + '.hrj-event:last-child{border-bottom:none;}'
      + '.hrj-event-icon{width:40px;height:40px;border-radius:12px;background:#f1efff;display:flex;align-items:center;justify-content:center;font-size:20px;flex:0 0 auto;}'
      + '.hrj-event.is-error .hrj-event-icon{background:#fff1f1;}'
      + '.hrj-event-text strong{display:block;color:#20295a;font-size:18px;line-height:1.35;font-weight:850;}'
      + '.hrj-event-text small{display:block;margin-top:3px;color:#6c6688;font-size:13px;}'
      + '.hrj-event-meta{margin-top:5px;color:#6a6f89;font-size:14px;}.hrj-event-result{display:inline-block;margin-top:7px;padding:5px 9px;border-radius:999px;background:#eef7ef;color:#225f35;font-size:14px;font-weight:850;}.hrj-empty{padding:12px 0;color:#6c6688;font-size:15px;}'
      + '@media (max-width:600px){.hrj-dialog{padding:12px 12px 16px;border-radius:20px;}.hrj-header{padding:16px 48px 16px 14px;gap:12px;}.hrj-header h2{font-size:25px;}.hrj-header p{font-size:14px;}.hrj-avatar{width:62px;height:62px;}.hrj-event-text strong{font-size:16px;}.hrj-event-meta,.hrj-event-result{font-size:13px;}}';
    document.head.appendChild(css);
  }
  function render(){
    ensure();
    var body = document.getElementById('hibouRecentJourneyBodyV25769');
    if(!body) return;
    var name = clean(currentStudentData().prenom || currentName() || 'Élève');
    var recent = history().slice(0, 20);
    body.innerHTML =
      '<header class="hrj-header">'
      + avatarHtml()
      + '<div><span class="hrj-chip">🧭 Mon parcours récent</span><h2>'+esc(name)+'</h2><p>Voici les dernières activités que tu as réalisées dans Maître Hibou.</p></div>'
      + '</header>'
      + '<section class="hrj-card"><h3>🕘 Mes activités récentes</h3>' + listHtml(recent) + '</section>';
  }
  function open(ev){
    if(ev && ev.preventDefault) ev.preventDefault();
    render();
    ensure().classList.remove('hidden');
    document.body.classList.add('hibou-recent-popup-open');
  }
  function close(){
    if(overlay) overlay.classList.add('hidden');
    document.body.classList.remove('hibou-recent-popup-open');
  }

  window.openHibouRecentJourneyPopupV25769 = open;
  window.closeHibouRecentJourneyPopupV25769 = close;

  ['hibou:student-event','hibou:student-changed','hibou:student-snapshot'].forEach(function(t){
    document.addEventListener(t, function(){
      if(overlay && !overlay.classList.contains('hidden')) render();
    });
  });
})();
