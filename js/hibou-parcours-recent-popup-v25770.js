
/* Maître Hibou V25.7.70 — Mon parcours récent, version élève lisible */
(function(){
  'use strict';
  if(window.__hibouRecentJourneyPopupV25770) return;
  window.__hibouRecentJourneyPopupV25770 = true;

  var overlay = null;

  function clean(v){ return String(v == null ? '' : v).replace(/\s+/g,' ').trim(); }
  function esc(v){ return clean(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function currentName(){ return window.hibouStudentSystem ? window.hibouStudentSystem.currentName() : ''; }
  function history(){ return window.hibouGetEventHistory ? window.hibouGetEventHistory(currentName()) : []; }

  function currentStudentData(){
    try{
      if(window.__hibouStudentSnapshot && window.__hibouStudentSnapshot.eleve) return window.__hibouStudentSnapshot.eleve;
    }catch(e){}
    try{
      var obj=JSON.parse(localStorage.getItem('hibou_current_student')||'{}');
      if(obj && obj.prenom) return obj;
    }catch(e){}
    return {prenom:currentName()||'Élève',sexe:''};
  }

  function avatarPath(){
    var s=clean(currentStudentData().sexe).toLowerCase();
    if(/^f/.test(s)) return 'images/portrait_fille.png';
    if(/^g/.test(s)||/^m/.test(s)||/gar/.test(s)||/boy/.test(s)) return 'images/portrait_garcon.png';
    return 'images/portrait_neutre.png';
  }

  function formatDate(v){
    var d=new Date(v||'');
    if(isNaN(d)) return clean(v);
    return d.toLocaleDateString('fr-FR')+' à '+d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
  }

  function medalLabel(v){
    v=clean(v).toLowerCase();
    if(!v) return '';
    if(/or/.test(v)) return '🥇 Or';
    if(/argent/.test(v)) return '🥈 Argent';
    if(/bronze/.test(v)) return '🥉 Bronze';
    return clean(v);
  }

  function scoreLabel(e){
    if(!e) return '';
    if(e.score!=='' && e.score!=null && e.total!=='' && e.total!=null){
      return clean(e.score)+'/'+clean(e.total);
    }
    return '';
  }

  function domainLabel(e){
    var m=clean((e&&(e.matiere||e.domaine))||'');
    if(m) return m;
    var src=clean((e&&e.source)||'');
    if(/lecture/i.test(src)) return 'Lecture';
    if(/francais|français/i.test(src)) return 'Français';
    if(/math/i.test(src)) return 'Maths';
    return '';
  }

  function titleFromEvent(e){
    if(!e) return 'Activité';

    /* On privilégie les champs métier, pas la trace technique complète. */
    var type=clean(e.type);
    var texte=clean(e.texte||e.affichage||e.titre||'');
    var activite=clean(e.activite||'');

    if(/lecture/.test(type)){
      var t=texte
        .replace(/^[✅🎯📖🧭\s]+/,'')
        .replace(/\s+[—-]\s+(LEC|COM|LIT)-P\d-\d{2}\b/gi,'')
        .replace(/\s+[—-]\s+Je sais\b.*$/i,'');
      return clean(t)||'Activité de lecture';
    }

    if(/ceinture_francais/.test(type)){
      var m=texte.match(/Ceinture français validée\s*[—-]\s*(.*?)\s*[—-]\s*(?:🥇|🥈|🥉|Or|Argent|Bronze)/i);
      if(m && m[1]) return clean(m[1]);
      return activite && activite!=='Grammaire' ? activite : 'Ceinture de français';
    }

    if(/ceinture_validee/.test(type) && /math/i.test(clean(e.source))){
      return activite || 'Ceinture de mathématiques';
    }

    if(/entrainement/.test(type)){
      var em=texte.match(/Entra[iî]nement[^:]*:\s*(.*?)\s*[—-]\s*\d+/i);
      return em&&em[1]?clean(em[1]):(activite||'Entraînement');
    }

    /* Dernier recours : retirer codes et résultat répété. */
    return clean(
      texte
        .replace(/^[✅🎯📖🧭🏅\s]+/,'')
        .replace(/\s+[—-]\s+(LEC|COM|LIT)-P\d-\d{2}\b/gi,'')
        .replace(/\s+[—-]\s+(?:🥇|🥈|🥉)?\s*(?:Or|Argent|Bronze)\b.*$/i,'')
        .replace(/\s+[—-]\s+\d+\/\d+\b.*$/i,'')
    ) || activite || 'Activité';
  }

  function resultLabel(e){
    var medal=medalLabel(e&&e.medaille);
    var score=scoreLabel(e);
    if(medal && score) return medal+' · '+score;
    if(medal) return medal;
    if(score) return score;
    if(e&&e.resultat==='reussite') return '✅ Réussite';
    if(e&&e.resultat==='erreur') return '🎯 À reprendre';
    return '';
  }

  function icon(e){
    var type=clean(e&&e.type);
    if(/lecture/.test(type)) return '📖';
    if(/ceinture/.test(type)) return '🏅';
    if(/entrainement/.test(type)) return '🧮';
    if(/question/.test(type)) return '💬';
    if(e&&e.resultat==='erreur') return '🎯';
    return '🧭';
  }

  function listHtml(rows){
    if(!rows.length) return '<div class="hrj-empty">Aucune activité enregistrée pour le moment.</div>';
    return rows.slice(0,20).map(function(e){
      var dom=domainLabel(e);
      var res=resultLabel(e);
      return '<article class="hrj-event">'
        +'<span class="hrj-event-icon">'+icon(e)+'</span>'
        +'<div class="hrj-event-text">'
        +'<strong>'+esc(titleFromEvent(e))+'</strong>'
        +'<div class="hrj-event-meta">'+esc(formatDate(e.date_iso||e.date||''))+(dom?' · '+esc(dom):'')+'</div>'
        +(res?'<div class="hrj-event-result">'+esc(res)+'</div>':'')
        +'</div></article>';
    }).join('');
  }

  function injectStyles(){
    if(document.getElementById('hibouRecentJourneyStylesV25770')) return;
    var st=document.createElement('style');
    st.id='hibouRecentJourneyStylesV25770';
    st.textContent=
      '.hrj-overlay{position:fixed;inset:0;background:rgba(21,24,45,.45);display:flex;align-items:center;justify-content:center;z-index:999999;padding:16px}'
      +'.hrj-overlay.hidden{display:none}'
      +'.hrj-dialog{width:min(820px,100%);max-height:90vh;overflow:auto;background:#fff;border-radius:24px;box-shadow:0 18px 50px rgba(0,0,0,.2);padding:18px;border:3px solid #ece7fb;position:relative}'
      +'.hrj-close{position:absolute;right:12px;top:10px;width:42px;height:42px;border:0;border-radius:999px;background:#fff;color:#3d4b78;font-size:28px;cursor:pointer;z-index:2}'
      +'.hrj-header{display:flex;gap:18px;align-items:center;padding:18px 58px 18px 20px;margin-bottom:16px;border-radius:20px;background:linear-gradient(135deg,#17336e,#1d4f91);color:#fff}'
      +'.hrj-avatar{width:76px;height:76px;object-fit:contain;border-radius:18px;background:#fff;border:3px solid rgba(255,255,255,.9);padding:7px;box-shadow:0 4px 14px rgba(0,0,0,.12);flex:0 0 auto}'
      +'.hrj-headtext{min-width:0;flex:1}'
      +'.hrj-chip{display:inline-flex;background:#fff;color:#3f3a85;border-radius:999px;padding:6px 12px;font-weight:900;font-size:13px;margin-bottom:7px}'
      +'.hrj-header h2{margin:0;color:#fff;font-size:31px;line-height:1.05}'
      +'.hrj-header p{margin:7px 0 0;color:#eef4ff;font-size:16px;line-height:1.2;white-space:nowrap}'
      +'.hrj-card{background:#fff;border:2px solid #ece7fb;border-radius:18px;padding:16px}'
      +'.hrj-card h3{margin:0 0 12px;color:#263264;font-size:22px}'
      +'.hrj-event{display:flex;gap:14px;align-items:flex-start;padding:14px 4px;border-bottom:1px solid #ece7fb}'
      +'.hrj-event:last-child{border-bottom:0}'
      +'.hrj-event-icon{width:40px;height:40px;border-radius:12px;background:#f1efff;display:flex;align-items:center;justify-content:center;font-size:20px;flex:0 0 auto}'
      +'.hrj-event-text{min-width:0;flex:1}'
      +'.hrj-event-text strong{display:block;color:#20295a;font-size:18px;line-height:1.3;font-weight:850}'
      +'.hrj-event-meta{margin-top:5px;color:#6a6f89;font-size:14px}'
      +'.hrj-event-result{display:inline-block;margin-top:7px;padding:5px 10px;border-radius:999px;background:#eef7ef;color:#225f35;font-size:14px;font-weight:850}'
      +'.hrj-empty{padding:12px 0;color:#6c6688;font-size:15px}'
      +'@media(max-width:720px){.hrj-header p{white-space:normal}.hrj-dialog{padding:12px}.hrj-header{padding:15px 48px 15px 14px;gap:12px}.hrj-header h2{font-size:25px}.hrj-header p{font-size:14px}.hrj-avatar{width:62px;height:62px}.hrj-event-text strong{font-size:16px}.hrj-event-meta,.hrj-event-result{font-size:13px}}';
    document.head.appendChild(st);
  }

  function ensure(){
    if(overlay&&document.body.contains(overlay)) return overlay;
    overlay=document.createElement('div');
    overlay.id='hibouRecentJourneyOverlayV25770';
    overlay.className='hrj-overlay hidden';
    overlay.innerHTML='<div class="hrj-dialog" role="dialog" aria-modal="true" aria-label="Mon parcours récent">'
      +'<button class="hrj-close" type="button" aria-label="Fermer">×</button>'
      +'<div id="hibouRecentJourneyBodyV25770"></div></div>';
    document.body.appendChild(overlay);
    overlay.querySelector('.hrj-close').onclick=close;
    overlay.onclick=function(e){if(e.target===overlay)close();};
    injectStyles();
    return overlay;
  }

  function render(){
    ensure();
    var body=document.getElementById('hibouRecentJourneyBodyV25770');
    if(!body) return;
    var st=currentStudentData();
    var name=clean(st.prenom||currentName()||'Élève');
    body.innerHTML='<header class="hrj-header">'
      +'<img class="hrj-avatar" src="'+avatarPath()+'" alt="Portrait de '+esc(name)+'">'
      +'<div class="hrj-headtext"><span class="hrj-chip">🧭 Mon parcours récent</span>'
      +'<h2>'+esc(name)+'</h2>'
      +'<p>Voici les dernières activités que tu as réalisées dans Maître Hibou.</p></div>'
      +'</header>'
      +'<section class="hrj-card"><h3>🕘 Mes activités récentes</h3>'+listHtml(history())+'</section>';
  }

  function open(ev){
    if(ev&&ev.preventDefault)ev.preventDefault();
    render();
    ensure().classList.remove('hidden');
  }
  function close(){if(overlay)overlay.classList.add('hidden');}

  window.openHibouRecentJourneyPopupV25770=open;
  window.closeHibouRecentJourneyPopupV25770=close;

  ['hibou:student-event','hibou:student-changed','hibou:student-snapshot'].forEach(function(t){
    document.addEventListener(t,function(){
      if(overlay&&!overlay.classList.contains('hidden'))render();
    });
  });
})();
