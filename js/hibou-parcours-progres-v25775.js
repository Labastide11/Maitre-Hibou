/* Maître Hibou V25.7.75 — Ce que j'ai appris et validé / Mon parcours et mes progrès */
(function(){
  'use strict';
  if(window.__hibouProgressHubV25775) return;
  window.__hibouProgressHubV25775 = true;

  var VERSION = '🦉 Maître Hibou V25.7.75';
  var latestSnapshot = null;
  var overlay = null;
  var quoteIndex = -1;

  var QUOTES = [
    {theme:'La confiance', text:'Je crois en toi.'},
    {theme:'La confiance', text:'J’ai confiance en toi.'},
    {theme:'La confiance', text:'Même quand c’est dur et que cela représente un vrai défi, tu peux puiser dans tes ressources pour y arriver, à ton rythme.'},
    {theme:'La confiance', text:'Tu es capable de réaliser bien plus que ce que tu crois.'},
    {theme:'La motivation', text:'Mets ton cœur dans tout ce que tu fais.'},
    {theme:'La motivation', text:'Tu n’es pas en train d’échouer, tu es en train d’apprendre.'},
    {theme:'Pour progresser', text:'Tu as le droit de demander de l’aide.'},
    {theme:'Pour progresser', text:'Ta valeur ne se résume pas à une note.'},
    {theme:'Pour progresser', text:'Tes erreurs sont des chances de progresser plus vite.'}
  ];

  function clean(v){ return String(v == null ? '' : v).replace(/\s+/g,' ').trim(); }
  function esc(v){ return clean(v).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function norm(v){ return clean(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'_'); }
  function rank(v){ v=clean(v); return /or|🥇/i.test(v)?3:/argent|🥈/i.test(v)?2:/bronze|🥉/i.test(v)?1:0; }
  function setVersion(){ try{ document.title = VERSION; }catch(e){} }

  function currentName(){
    try{ if(window.hibouStudentSystem && window.hibouStudentSystem.currentName) return clean(window.hibouStudentSystem.currentName()); }catch(e){}
    try{
      var obj=JSON.parse(localStorage.getItem('hibou_current_student')||'{}');
      if(obj&&obj.prenom) return clean(obj.prenom);
    }catch(e){}
    try{ return clean(window.prenomActuel||localStorage.getItem('hibou_prenom')||localStorage.getItem('elevePrenom')||'Élève')||'Élève'; }catch(e){ return 'Élève'; }
  }

  function studentData(){
    if(latestSnapshot && latestSnapshot.eleve) return latestSnapshot.eleve;
    try{
      var obj=JSON.parse(localStorage.getItem('hibou_current_student')||'{}');
      if(obj&&obj.prenom) return obj;
    }catch(e){}
    return {prenom:currentName(),sexe:''};
  }

  function avatarPath(){
    var s=clean(studentData().sexe).toLowerCase();
    if(/^f/.test(s)) return 'images/portrait_fille.png';
    if(/^g/.test(s)||/^m/.test(s)||/gar/.test(s)||/boy/.test(s)) return 'images/portrait_garcon.png';
    return 'images/portrait_neutre.png';
  }

  function history(){
    try{ return window.hibouGetEventHistory ? (window.hibouGetEventHistory(currentName())||[]) : []; }catch(e){ return []; }
  }

  function bestCompetences(){
    var rows=(latestSnapshot&&Array.isArray(latestSnapshot.competences))?latestSnapshot.competences:[];
    var best={};
    rows.forEach(function(r){
      var key=norm(r.skill_id||r.skillId||r.competence||r.texte||r.activite);
      if(!key) return;
      var rr=rank(r.medaille||r.medal||r.rank);
      var score=parseInt(String(r.validations||'').split('/')[0],10)||Number(r.score)||0;
      if(!best[key] || rr>best[key].rank || (rr===best[key].rank && score>best[key].score)) best[key]={rank:rr,score:score,row:r};
    });
    return Object.keys(best).map(function(k){return best[k].row;}).sort(function(a,b){return String(b.date||'').localeCompare(String(a.date||''));});
  }

  function medalCounts(){
    var c={or:0,argent:0,bronze:0};
    bestCompetences().forEach(function(r){
      var x=rank(r.medaille||r.medal||r.rank);
      if(x===3)c.or++; else if(x===2)c.argent++; else if(x===1)c.bronze++;
    });
    return c;
  }

  function formatDate(v){
    var d=new Date(v||'');
    if(isNaN(d)) return clean(v);
    return d.toLocaleDateString('fr-FR')+' à '+d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
  }

  function eventTitle(e){
    var raw=clean(e&&(e.titre||e.texte||e.affichage||e.activite)||'Activité');
    raw=raw.replace(/^[✅❌🧭⭐🏅📖🧮💬\s]+/,'');
    raw=raw.replace(/\s+[—-]\s+(LEC|COM|LIT)-P\d-\d{2}\b/gi,'');
    raw=raw.replace(/\s+[—-]\s+Je sais\b.*$/i,'');
    raw=raw.replace(/\s+[—-]\s+(?:🥇|🥈|🥉)?\s*(?:Or|Argent|Bronze)\b.*$/i,'');
    raw=raw.replace(/\s+[—-]\s+\d+\/\d+\b.*$/i,'');
    return clean(raw)||'Activité';
  }

  function eventIcon(e){
    var type=clean(e&&e.type);
    if(/lecture/.test(type)) return '📖';
    if(/ceinture/.test(type)) return '🏅';
    if(/entrainement/.test(type)) return '🧮';
    if(/question/.test(type)) return '💬';
    if(e&&e.resultat==='erreur') return '🎯';
    return e&&e.resultat==='reussite'?'✅':'🧭';
  }

  function eventResult(e){
    if(!e) return '';
    var medal=clean(e.medaille||'');
    var score=(e.score!==''&&e.score!=null&&e.total!==''&&e.total!=null)?clean(e.score)+'/'+clean(e.total):'';
    if(medal){
      var nice=/or/i.test(medal)?'🥇 Or':/argent/i.test(medal)?'🥈 Argent':/bronze/i.test(medal)?'🥉 Bronze':medal;
      return score?nice+' · '+score:nice;
    }
    if(score) return score;
    if(e.resultat==='reussite') return 'Réussite';
    if(e.resultat==='erreur') return 'À reprendre';
    return '';
  }

  function eventRow(e){
    var dom=clean(e.matiere||e.domaine||'');
    var res=eventResult(e);
    return '<article class="hp75-event">'
      +'<span class="hp75-event-icon">'+eventIcon(e)+'</span>'
      +'<div><strong>'+esc(eventTitle(e))+'</strong>'
      +'<small>'+esc(formatDate(e.date_iso||e.date||''))+(dom?' · '+esc(dom):'')+'</small>'
      +(res?'<span class="hp75-result">'+esc(res)+'</span>':'')
      +'</div></article>';
  }

  function recentHTML(){
    var rows=history().slice(0,8);
    return rows.length?rows.map(eventRow).join(''):'<div class="hp75-empty">Aucune activité récente pour le moment.</div>';
  }

  function beltsHTML(){
    var rows=bestCompetences();
    if(!rows.length) return '<div class="hp75-empty">Aucune ceinture validée pour le moment.</div>';
    return rows.slice(0,10).map(function(r){
      var medal=clean(r.medaille||'');
      var score=clean(r.validations||'');
      return '<div class="hp75-belt"><strong>'+esc(r.competence||r.texte||r.activite||'Compétence')+'</strong><span>'+esc(medal)+(score?' · '+esc(score):'')+'</span></div>';
    }).join('');
  }

  function successes(){
    return history().filter(function(e){
      return e && (e.resultat==='reussite' || /ceinture.*validee/.test(clean(e.type)) || rank(e.medaille)>0);
    }).slice(0,6);
  }

  function successHTML(){
    var rows=successes();
    return rows.length?rows.map(eventRow).join(''):'<div class="hp75-empty">Tes prochaines réussites apparaîtront ici.</div>';
  }

  function calcRecords(){
    var out=[];
    var snap=(latestSnapshot&&Array.isArray(latestSnapshot.records))?latestSnapshot.records:[];
    snap.forEach(function(r){
      out.push({score:Number(r.score)||0,total:Number(r.total)||10,time:Number(r.temps_secondes||r.temps||0)||0,date:r.date||''});
    });
    history().forEach(function(e){
      if(!e) return;
      var maths=/math/i.test(clean(e.matiere));
      var train=/entrainement/.test(clean(e.type));
      if(maths&&train&&e.score!==''&&e.score!=null){
        out.push({score:Number(e.score)||0,total:Number(e.total)||10,time:Number(e.temps_secondes)||0,date:e.date_iso||e.date||''});
      }
    });
    var seen={};
    out=out.filter(function(r){var k=[r.score,r.total,r.time,r.date].join('|');if(seen[k])return false;seen[k]=1;return true;});
    out.sort(function(a,b){return String(b.date||'').localeCompare(String(a.date||''));});
    return out;
  }

  function calcHTML(){
    var rows=calcRecords();
    if(!rows.length) return '<div class="hp75-empty">Aucun entraînement de calcul mental enregistré pour le moment.</div>';
    var last=rows[0];
    var best=rows.slice().sort(function(a,b){var ra=a.total?a.score/a.total:0, rb=b.total?b.score/b.total:0;return (rb-ra)||((a.time||999999)-(b.time||999999));})[0];
    var times=rows.map(function(r){return r.time;}).filter(function(t){return t>0;});
    var bestTime=times.length?Math.min.apply(Math,times):0;
    return '<div class="hp75-calc-grid">'
      +'<div><span>Mon dernier score</span><strong>'+esc(last.score)+'/'+esc(last.total)+'</strong></div>'
      +'<div><span>Mon meilleur score</span><strong>'+esc(best.score)+'/'+esc(best.total)+'</strong></div>'
      +'<div><span>Mon meilleur temps</span><strong>'+(bestTime?esc(bestTime)+' s':'—')+'</strong></div>'
      +'</div>';
  }

  function objectiveText(){
    var h=history();
    var retry=h.find(function(e){return e&&e.resultat==='erreur';});
    if(retry) return 'Je reprends tranquillement : '+eventTitle(retry)+'.';
    if(!bestCompetences().length) return 'Je m’entraîne, puis j’essaie ma première ceinture quand je me sens prêt.';
    return 'Je continue à m’entraîner régulièrement et j’avance à mon rythme.';
  }

  function prideText(){
    var h=history();
    var belt=h.find(function(e){return e&&/ceinture.*validee/.test(clean(e.type));});
    var success=belt||h.find(function(e){return e&&e.resultat==='reussite';});
    if(success) return eventTitle(success)+(eventResult(success)?' — '+eventResult(success):'');
    var belts=bestCompetences();
    if(belts.length) return clean(belts[0].competence||'Une compétence validée')+' — '+clean(belts[0].medaille||'');
    return 'Chaque activité terminée est déjà un pas en avant.';
  }

  function chooseQuote(){
    if(QUOTES.length<=1) return 0;
    var n=quoteIndex;
    while(n===quoteIndex) n=Math.floor(Math.random()*QUOTES.length);
    quoteIndex=n;
    return n;
  }

  function ensureStyles(){
    if(document.getElementById('hibouProgressHubStylesV25775')) return;
    var st=document.createElement('style');
    st.id='hibouProgressHubStylesV25775';
    st.textContent=''
      +'.hp75-overlay{position:fixed;inset:0;z-index:2147483200;background:rgba(21,25,54,.58);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:18px}.hp75-overlay.hidden{display:none!important}'
      +'.hp75-dialog{width:min(1080px,100%);max-height:92vh;overflow:auto;background:#f9fbff;border:4px solid #dfe5ff;border-radius:30px;box-shadow:0 28px 80px rgba(24,28,70,.32);padding:20px;position:relative;color:#22275b}'
      +'.hp75-close{position:absolute;right:16px;top:14px;width:46px;height:46px;border:0;border-radius:50%;background:#fff;color:#42508d;font-size:30px;font-weight:900;cursor:pointer;box-shadow:0 5px 16px rgba(0,0,0,.12)}'
      +'.hp75-hero{display:grid;grid-template-columns:96px 1fr;gap:18px;align-items:center;padding:18px 64px 18px 18px;border-radius:24px;background:linear-gradient(135deg,#17336e,#285a99);color:#fff}'
      +'.hp75-avatar{width:92px;height:92px;object-fit:contain;border-radius:22px;background:#fff;border:3px solid rgba(255,255,255,.9);padding:8px}'
      +'.hp75-hero h2{margin:0;font:1000 34px/1 "Trebuchet MS",system-ui,sans-serif}.hp75-hero p{margin:7px 0 0;color:#eaf2ff;font-weight:800}'
      +'.hp75-quote{margin-top:12px;padding:12px 14px;border-radius:18px;background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.22)}.hp75-quote em{display:block;font-style:normal;font-size:12px;font-weight:1000;text-transform:uppercase;letter-spacing:.06em;color:#ffdf74}.hp75-quote strong{display:block;margin-top:4px;font-size:17px;line-height:1.3;color:#fff}'
      +'.hp75-highlights{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:14px 0}.hp75-highlight{background:#fff;border:2px solid #e6e8f8;border-radius:18px;padding:13px 15px}.hp75-highlight b{display:block;color:#5d48b8;margin-bottom:5px}.hp75-highlight span{font-weight:900;line-height:1.25;color:#31345e}'
      +'.hp75-section{background:#fff;border:2px solid #e6e8f8;border-radius:20px;padding:16px;margin-top:12px}.hp75-section h3{margin:0 0 12px;font:1000 22px/1.1 "Trebuchet MS",system-ui,sans-serif;color:#2d3271}.hp75-number{display:inline-flex;width:28px;height:28px;border-radius:9px;background:#eeebff;color:#5944b7;align-items:center;justify-content:center;margin-right:7px;font-size:15px}'
      +'.hp75-event{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #ececf5}.hp75-event:last-child{border-bottom:0}.hp75-event-icon{width:36px;height:36px;border-radius:11px;background:#f2efff;display:flex;align-items:center;justify-content:center;flex:0 0 36px}.hp75-event strong{display:block;font-size:16px;line-height:1.28;color:#252b61}.hp75-event small{display:block;margin-top:3px;color:#777a98;font-weight:700}.hp75-result{display:inline-block;margin-top:5px;padding:3px 8px;border-radius:999px;background:#edf8ef;color:#28663a;font-size:12px;font-weight:1000}'
      +'.hp75-medals{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.hp75-medal{text-align:center;padding:12px;border-radius:16px;background:#faf9ff;border:2px solid #ece8ff}.hp75-medal span{display:block;font-size:32px}.hp75-medal b{display:block;font-size:28px;color:#34386d}.hp75-medal small{font-weight:900;color:#696d8f}'
      +'.hp75-belt{display:flex;justify-content:space-between;gap:12px;padding:9px 0;border-bottom:1px solid #ececf5}.hp75-belt:last-child{border-bottom:0}.hp75-belt strong{color:#292f67}.hp75-belt span{font-weight:900;color:#5d6287;white-space:nowrap}'
      +'.hp75-calc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.hp75-calc-grid div{background:#f5f8ff;border:2px solid #e0e8fb;border-radius:17px;padding:13px;text-align:center}.hp75-calc-grid span{display:block;color:#5d6388;font-weight:900}.hp75-calc-grid strong{display:block;margin-top:5px;font-size:26px;color:#183b78}.hp75-empty{padding:8px 0;color:#777a98;font-weight:800}'
      +'@media(max-width:760px){.hp75-dialog{padding:12px;border-radius:22px}.hp75-hero{grid-template-columns:72px 1fr;padding:14px 52px 14px 14px}.hp75-avatar{width:68px;height:68px}.hp75-hero h2{font-size:25px}.hp75-quote strong{font-size:14px}.hp75-highlights{grid-template-columns:1fr}.hp75-medals,.hp75-calc-grid{grid-template-columns:1fr}.hp75-belt{display:block}.hp75-belt span{display:block;margin-top:4px;white-space:normal}}';
    document.head.appendChild(st);
  }

  function ensureOverlay(){
    if(overlay&&document.body.contains(overlay)) return overlay;
    ensureStyles();
    overlay=document.createElement('div');
    overlay.id='hibouProgressHubOverlayV25775';
    overlay.className='hp75-overlay hidden';
    overlay.innerHTML='<div class="hp75-dialog" role="dialog" aria-modal="true" aria-label="Mon parcours et mes progrès"><button class="hp75-close" type="button" aria-label="Fermer">×</button><div id="hibouProgressHubBodyV25775"></div></div>';
    document.body.appendChild(overlay);
    overlay.querySelector('.hp75-close').addEventListener('click',close);
    overlay.addEventListener('click',function(e){if(e.target===overlay)close();});
    return overlay;
  }

  function renderHeader(){
    var card=document.getElementById('bandeauLastCard');
    if(!card) return;
    var c=medalCounts();
    card.classList.add('hp75-top-card');
    card.setAttribute('role','button');
    card.setAttribute('tabindex','0');
    card.setAttribute('title','Ouvrir Mon parcours et mes progrès');
    card.setAttribute('aria-label','Ce que j’ai appris et validé. Ouvrir Mon parcours et mes progrès.');
    card.innerHTML='<span class="hp75-top-icon" aria-hidden="true">⭐</span><span class="hp75-top-content"><span class="hp75-top-title">Ce que j’ai appris et validé</span><span class="hp75-top-medals"><b>🥇 '+c.or+'</b><b>🥈 '+c.argent+'</b><b>🥉 '+c.bronze+'</b></span></span>';
  }

  function renderPopup(){
    ensureOverlay();
    var body=document.getElementById('hibouProgressHubBodyV25775');
    if(!body) return;
    var st=studentData();
    var name=clean(st.prenom||currentName()||'Élève');
    var c=medalCounts();
    var q=QUOTES[quoteIndex>=0?quoteIndex:chooseQuote()];
    body.innerHTML=''
      +'<header class="hp75-hero"><img class="hp75-avatar" src="'+avatarPath()+'" alt="Portrait de '+esc(name)+'"><div><h2>'+esc(name)+' — Mon parcours et mes progrès</h2><p>Je regarde ce que j’ai fait, ce que j’ai validé et comment je progresse.</p><div class="hp75-quote"><em>'+esc(q.theme)+'</em><strong>'+esc(q.text)+'</strong></div></div></header>'
      +'<div class="hp75-highlights"><div class="hp75-highlight"><b>🎯 Mon petit objectif du moment</b><span>'+esc(objectiveText())+'</span></div><div class="hp75-highlight"><b>🌟 Ma dernière fierté</b><span>'+esc(prideText())+'</span></div></div>'
      +'<section class="hp75-section"><h3><span class="hp75-number">1</span>🧭 Mon parcours récent</h3>'+recentHTML()+'</section>'
      +'<section class="hp75-section"><h3><span class="hp75-number">2</span>🏅 Mes médailles</h3><div class="hp75-medals"><div class="hp75-medal"><span>🥇</span><b>'+c.or+'</b><small>Or</small></div><div class="hp75-medal"><span>🥈</span><b>'+c.argent+'</b><small>Argent</small></div><div class="hp75-medal"><span>🥉</span><b>'+c.bronze+'</b><small>Bronze</small></div></div></section>'
      +'<section class="hp75-section"><h3><span class="hp75-number">3</span>🎗️ Mes ceintures</h3>'+beltsHTML()+'</section>'
      +'<section class="hp75-section"><h3><span class="hp75-number">4</span>🌟 Mes réussites</h3>'+successHTML()+'</section>'
      +'<section class="hp75-section"><h3><span class="hp75-number">5</span>🧮 Calcul mental</h3>'+calcHTML()+'</section>';
  }

  function open(ev){
    if(ev&&ev.preventDefault)ev.preventDefault();
    quoteIndex=chooseQuote();
    renderPopup();
    ensureOverlay().classList.remove('hidden');
    try{
      if(window.hibouRefreshStudent) window.hibouRefreshStudent(true).then(function(snap){ if(snap){latestSnapshot=snap;renderHeader();renderPopup();} });
    }catch(e){}
  }

  function close(){ if(overlay) overlay.classList.add('hidden'); }

  function bindTopCard(){
    var card=document.getElementById('bandeauLastCard');
    if(!card||card.__hp75Bound) return;
    card.__hp75Bound=true;
    card.addEventListener('click',open,true);
    card.addEventListener('keydown',function(ev){if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();open(ev);}},true);
  }

  function refresh(force){
    renderHeader();
    bindTopCard();
    try{
      if(window.hibouRefreshStudent) return window.hibouRefreshStudent(!!force).then(function(snap){if(snap)latestSnapshot=snap;renderHeader();if(overlay&&!overlay.classList.contains('hidden'))renderPopup();return snap;});
    }catch(e){}
    return Promise.resolve(null);
  }

  function boot(){
    setVersion();
    ensureStyles();
    renderHeader();
    bindTopCard();
    setTimeout(function(){refresh(false);},350);
    setTimeout(function(){renderHeader();bindTopCard();},1200);
  }

  window.openHibouProgressHubV25775=open;
  window.closeHibouProgressHubV25775=close;

  document.addEventListener('hibou:student-snapshot',function(e){
    if(e&&e.detail&&e.detail.snapshot) latestSnapshot=e.detail.snapshot;
    renderHeader();
    if(overlay&&!overlay.classList.contains('hidden')) renderPopup();
  });
  ['hibou:student-event','hibou:belts-updated'].forEach(function(t){document.addEventListener(t,function(){setTimeout(function(){renderHeader();if(overlay&&!overlay.classList.contains('hidden'))renderPopup();},0);});});
  document.addEventListener('hibou:student-changed',function(){latestSnapshot=null;setTimeout(function(){refresh(true);},120);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
  window.addEventListener('load',function(){setVersion();renderHeader();bindTopCard();},{once:true});
  setInterval(function(){setVersion();renderHeader();bindTopCard();},2500);
})();
