
/* Maître Hibou V25.7.68 — Popup dédiée « Mon parcours récent » */
(function(){
  'use strict';
  if(window.__hibouRecentJourneyPopupV25768) return;
  window.__hibouRecentJourneyPopupV25768 = true;

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
  function eventText(e){ return clean((e && (e.affichage || e.texte || e.titre || e.activite)) || 'Activité'); }
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
      return '<article class="hrj-event '+(e.resultat==='erreur'?'is-error':'')+'">'
        + '<span class="hrj-event-icon">'+icon(e)+'</span>'
        + '<div class="hrj-event-text"><strong>'+esc(eventText(e))+'</strong>'
        + '<small>'+esc(formatDate(eventDate(e))) + (e.source ? ' · ' + esc(e.source) : '') + '</small></div>'
        + '</article>';
    }).join('');
  }
  function ensure(){
    if(overlay && document.body.contains(overlay)) return overlay;
    overlay = document.createElement('div');
    overlay.id = 'hibouRecentJourneyOverlayV25768';
    overlay.className = 'hrj-overlay hidden';
    overlay.innerHTML =
      '<div class="hrj-dialog" role="dialog" aria-modal="true" aria-label="Mon parcours récent">'
      + '<button class="hrj-close" type="button" aria-label="Fermer">×</button>'
      + '<div id="hibouRecentJourneyBodyV25768"></div>'
      + '</div>';
    document.body.appendChild(overlay);
    overlay.querySelector('.hrj-close').onclick = close;
    overlay.onclick = function(e){ if(e.target === overlay) close(); };
    injectStyles();
    return overlay;
  }
  function injectStyles(){
    if(document.getElementById('hibouRecentJourneyStylesV25768')) return;
    var css = document.createElement('style');
    css.id = 'hibouRecentJourneyStylesV25768';
    css.textContent =
      '.hrj-overlay{position:fixed;inset:0;background:rgba(21,24,45,.45);display:flex;align-items:center;justify-content:center;z-index:999999;padding:16px;}'
      + '.hrj-overlay.hidden{display:none;}'
      + '.hrj-dialog{width:min(760px,100%);max-height:min(88vh,900px);overflow:auto;background:#fff;border-radius:24px;box-shadow:0 18px 50px rgba(0,0,0,.18);padding:18px 18px 20px;position:relative;border:3px solid #efe7ff;}'
      + '.hrj-close{position:absolute;right:12px;top:10px;width:42px;height:42px;border:none;border-radius:999px;background:#f3efff;color:#5a37a6;font-size:28px;cursor:pointer;}'
      + '.hrj-header{display:flex;gap:14px;align-items:center;margin-bottom:14px;padding-right:48px;}'
      + '.hrj-avatar{width:76px;height:76px;object-fit:contain;border-radius:18px;background:#fff6f4;border:2px solid #f0e5ff;padding:8px;}'
      + '.hrj-chip{display:inline-flex;align-items:center;gap:6px;background:#f2eefe;color:#5b3fa5;border-radius:999px;padding:6px 12px;font-weight:800;font-size:13px;margin-bottom:6px;}'
      + '.hrj-header h2{margin:0;font-size:30px;color:#2f2c68;}'
      + '.hrj-header p{margin:6px 0 0;color:#6c6688;font-size:16px;}'
      + '.hrj-card{background:#fbfbff;border:2px solid #ece7fb;border-radius:18px;padding:14px;}'
      + '.hrj-card h3{margin:0 0 10px;color:#2f2c68;font-size:20px;}'
      + '.hrj-event{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-bottom:1px solid #ece7fb;}'
      + '.hrj-event:last-child{border-bottom:none;}'
      + '.hrj-event-icon{width:34px;height:34px;border-radius:999px;background:#f1efff;display:flex;align-items:center;justify-content:center;font-size:18px;flex:0 0 auto;}'
      + '.hrj-event.is-error .hrj-event-icon{background:#fff1f1;}'
      + '.hrj-event-text strong{display:block;color:#2f2c68;font-size:16px;line-height:1.35;}'
      + '.hrj-event-text small{display:block;margin-top:3px;color:#6c6688;font-size:13px;}'
      + '.hrj-empty{padding:10px 0;color:#6c6688;}'
      + '@media (max-width:600px){.hrj-dialog{padding:14px 14px 16px;border-radius:20px;}.hrj-header h2{font-size:24px;}.hrj-header p{font-size:15px;}.hrj-avatar{width:62px;height:62px;}}';
    document.head.appendChild(css);
  }
  function render(){
    ensure();
    var body = document.getElementById('hibouRecentJourneyBodyV25768');
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

  window.openHibouRecentJourneyPopupV25768 = open;
  window.closeHibouRecentJourneyPopupV25768 = close;

  ['hibou:student-event','hibou:student-changed','hibou:student-snapshot'].forEach(function(t){
    document.addEventListener(t, function(){
      if(overlay && !overlay.classList.contains('hidden')) render();
    });
  });
})();
