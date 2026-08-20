/* Maître Hibou V25.8.15 — Conseil personnalisé et explicite
   Source : student_snapshot réel (API V2.7.4) + parcours local récent.
   Le conseil dit quoi faire, sur quoi, et pourquoi. */
(function(){
  'use strict';
  if(window.__hibouAdviceV25815) return;
  window.__hibouAdviceV25815 = true;

  var state={
    student:'',
    snapshot:null,
    loading:false,
    loadedAt:0,
    recommendation:null
  };

  function clean(v){return String(v==null?'':v).replace(/\s+/g,' ').trim();}
  function norm(v){
    return clean(v).toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g,'')
      .replace(/[’']/g,'')
      .replace(/[^a-z0-9]+/g,'_')
      .replace(/^_+|_+$/g,'');
  }
  function esc(v){
    return String(v==null?'':v).replace(/[&<>"']/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function currentName(){
    try{
      if(typeof window.prenomActuel!=='undefined' && window.prenomActuel) return clean(window.prenomActuel);
    }catch(e){}
    var ids=['v21HeaderName','v21HeroName','eleveNom'];
    for(var i=0;i<ids.length;i++){
      var el=document.getElementById(ids[i]), t=clean(el&&el.textContent);
      if(t && t!=='Élève' && t!=='Jo') return t;
    }
    try{
      return clean(localStorage.getItem('hibou_last_prenom')||
                   localStorage.getItem('hibou_prenom')||
                   localStorage.getItem('elevePrenom')||'');
    }catch(e){return''}
  }

  function history(){
    try{
      return window.hibouGetEventHistory ? (window.hibouGetEventHistory(currentName())||[]) : [];
    }catch(e){return[]}
  }

  function apiConfig(){
    try{
      return {
        url:clean(localStorage.getItem('hibou_sync_api_url_v25754')||''),
        key:clean(localStorage.getItem('hibou_sync_device_key_v25754')||'')
      };
    }catch(e){return{url:'',key:''}}
  }

  function fetchSnapshot(force){
    var name=currentName();
    if(!name || name==='Élève') return Promise.resolve(null);
    if(!force && state.student===name && state.snapshot && Date.now()-state.loadedAt<30000){
      return Promise.resolve(state.snapshot);
    }
    if(state.loading) return Promise.resolve(state.snapshot);

    var cfg=apiConfig();
    if(!cfg.url || !cfg.key) return Promise.resolve(state.snapshot);

    state.loading=true;
    var sep=cfg.url.indexOf('?')>=0?'&':'?';
    var url=cfg.url+sep+
      'action=student_snapshot'+
      '&prenom='+encodeURIComponent(name)+
      '&limit=300'+
      '&device_key='+encodeURIComponent(cfg.key)+
      '&tablet_key='+encodeURIComponent(cfg.key)+
      '&_='+(Date.now());

    return fetch(url,{cache:'no-store'})
      .then(function(r){return r.json()})
      .then(function(data){
        state.loading=false;
        if(data && data.snapshot){
          state.student=name;
          state.snapshot=data.snapshot;
          state.loadedAt=Date.now();
          computeAndRender();
          try{
            document.dispatchEvent(new CustomEvent('hibou:advice-snapshot',{
              detail:{snapshot:state.snapshot}
            }));
          }catch(e){}
        }
        return state.snapshot;
      })
      .catch(function(){
        state.loading=false;
        return state.snapshot;
      });
  }

  function pct(score,total){
    score=Number(score); total=Number(total);
    if(!isFinite(score)||!isFinite(total)||total<=0) return null;
    return Math.round(score*100/total);
  }

  function rowPct(r){
    if(!r) return null;
    var p=pct(r.score,r.total);
    if(p!=null) return p;
    var text=clean(r.validations||r.resultat||r.texte);
    var m=text.match(/(\d{1,2})\s*\/\s*(10|20)/);
    return m?pct(Number(m[1]),Number(m[2])):null;
  }

  function isMathText(v){
    var s=norm(v);
    return /math|calcul|nombre|addition|soustraction|multiplication|division|table|complement/.test(s);
  }
  function isFrenchText(v){
    var s=norm(v);
    return /franc|grammaire|verbe|sujet|phrase|nom|determinant|adjectif|groupe_nominal|infinitif|lecture|orthographe|conjugaison/.test(s);
  }

  function friendlyLabel(r){
    var raw=clean(r&&(r.competence_label||r.competenceLabel||r.activite||r.competence||r.skill_label||r.skill||r.titre||r.texte)||'');
    raw=raw
      .replace(/^[✅❌⭐🏅🥇🥈🥉🧠📖🧮\s]+/,'')
      .replace(/\b(?:LEC|COM|LIT)-?P\d-?\d{1,2}\b/gi,'')
      .replace(/\b(?:score|résultat)\s*:?\s*\d+\s*\/\s*\d+\b/gi,'')
      .replace(/\s+[—-]\s+\d+\s*\/\s*\d+.*$/,'')
      .replace(/\s+/g,' ')
      .trim();
    if(!raw || /^[A-Z]{2,5}[-_]/.test(raw)) return 'cette compétence';
    if(raw.length>78) raw=raw.slice(0,75).replace(/\s+\S*$/,'')+'…';
    return raw.charAt(0).toLowerCase()+raw.slice(1);
  }

  function masteryKey(r){
    return norm(r&&(r.mastery_status||r.statut_maitrise||r.mastery)||'');
  }

  function isLearningTrace(r){
    if(!r) return false;
    return !!(
      masteryKey(r) ||
      clean(r.competence_label||r.competenceLabel) ||
      clean(r.learning_session_id||r.session_id) ||
      /^hibou_learning_engine/.test(clean(r.source))
    );
  }

  function learningMetrics(r){
    var bits=[];
    if(r && r.score!=='' && r.score!=null && r.total!=='' && r.total!=null){
      bits.push(clean(r.score)+'/'+clean(r.total));
    }
    if(r && r.challenge_score!=='' && r.challenge_score!=null && r.challenge_total!=='' && r.challenge_total!=null){
      bits.push('défi '+clean(r.challenge_score)+'/'+clean(r.challenge_total));
    }
    var h=Number(r&&r.help_used);
    if(isFinite(h) && h>0) bits.push(h+' aide'+(h>1?'s':''));
    return bits.join(' · ');
  }

  function learningTraces(){
    return recentRows().filter(isLearningTrace);
  }

  function currentLearningStates(){
    var rows=learningTraces(), seen={}, current=[];
    for(var i=0;i<rows.length;i++){
      var r=rows[i];
      var key=norm(r.competence_code||r.competence_label||friendlyLabel(r));
      if(!key || seen[key]) continue;
      seen[key]=true;
      current.push(r);
    }
    return current;
  }

  function latestLearningByStatus(status){
    var rows=currentLearningStates();
    for(var i=0;i<rows.length;i++){
      if(masteryKey(rows[i])===status) return rows[i];
    }
    return null;
  }

  function latestLearningTrace(){
    var rows=currentLearningStates();
    return rows.length?rows[0]:null;
  }

  function recentRows(){
    var snap=state.snapshot||{};
    var rows=[];
    if(Array.isArray(snap.reussites)) rows=rows.concat(snap.reussites);
    rows=rows.concat(history());
    rows=rows.filter(Boolean);
    rows.sort(function(a,b){
      return clean(b.date_iso||b.date||b.timestamp).localeCompare(clean(a.date_iso||a.date||a.timestamp));
    });
    return rows.slice(0,60);
  }

  function recentDifficulty(){
    var rows=recentRows();
    for(var i=0;i<rows.length;i++){
      var r=rows[i], p=rowPct(r), status=norm(r.resultat||r.statut||r.status);
      if(status==='erreur' || status==='echec' || status==='echoue' || (p!=null && p<70)){
        return {row:r,pct:p,label:friendlyLabel(r)};
      }
    }
    return null;
  }

  function repeatedDifficulty(){
    var rows=recentRows(), counts={};
    for(var i=0;i<Math.min(rows.length,15);i++){
      var r=rows[i], p=rowPct(r), status=norm(r.resultat||r.statut||r.status);
      if(!(status==='erreur'||status==='echec'||(p!=null&&p<70))) continue;
      var label=friendlyLabel(r), key=norm(label);
      if(!key || key==='cette_competence') continue;
      counts[key]=(counts[key]||{n:0,label:label,row:r});
      counts[key].n++;
      if(counts[key].n>=2) return counts[key];
    }
    return null;
  }

  function latestStrongResult(){
    var rows=recentRows();
    for(var i=0;i<rows.length;i++){
      var p=rowPct(rows[i]);
      if(p!=null && p>=85) return {row:rows[i],pct:p,label:friendlyLabel(rows[i])};
    }
    return null;
  }

  function bestCalc(){
    var snap=state.snapshot||{}, records=Array.isArray(snap.records)?snap.records.slice():[];
    records.sort(function(a,b){return clean(b.date).localeCompare(clean(a.date))});
    var last=records[0]||null, best=null;
    records.forEach(function(r){
      var p=rowPct(r);
      if(p==null) return;
      if(!best || p>best.pct || (p===best.pct && Number(r.temps_secondes||99999)<best.time)){
        best={pct:p,time:Number(r.temps_secondes||99999),row:r};
      }
    });
    return {last:last,best:best};
  }

  function latestQuestion(){
    var q=(state.snapshot&&Array.isArray(state.snapshot.questions))?state.snapshot.questions.slice():[];
    if(!q.length) return null;
    q.sort(function(a,b){
      return (clean(b.date_only||b.date)+' '+clean(b.heure))
        .localeCompare(clean(a.date_only||a.date)+' '+clean(a.heure));
    });
    return q[0]||null;
  }

  function explainedQuestion(){
    var q=(state.snapshot&&Array.isArray(state.snapshot.questions))?state.snapshot.questions.slice():[];
    for(var i=0;i<q.length;i++){
      var r=q[i];
      if(clean(r.reponseIA)||/explique/.test(norm(r.statut))||clean(r.dateExplication)) return r;
    }
    return null;
  }

  function subjectFrom(r){
    var text=clean(r&&(r.matiere||r.domaine||r.activite||r.competence||r.texte)||'');
    if(isFrenchText(text)) return 'francais';
    if(isMathText(text)) return 'maths';
    return 'maths';
  }

  function recommendation(){
    // V25.8.15 : les traces pédagogiques du moteur d'exercices
    // deviennent prioritaires dans le conseil.
    var reinforce=latestLearningByStatus('a_renforcer');
    if(reinforce){
      var reinforceLabel=friendlyLabel(reinforce), reinforceMetrics=learningMetrics(reinforce);
      return {
        action:'train',
        subject:'francais',
        short:'Reprendre cette compétence',
        title:'🧠 Reprends « '+reinforceLabel+' ».',
        why:(reinforceMetrics?('Ton dernier bilan est '+reinforceMetrics+'. '):'')
          +'Cette compétence est encore à renforcer. Relis la stratégie puis refais l’activité tranquillement.'
      };
    }

    var withHelp=latestLearningByStatus('reussi_avec_aide');
    if(withHelp){
      var helpLabel=friendlyLabel(withHelp), helpMetrics=learningMetrics(withHelp);
      return {
        action:'train',
        subject:'francais',
        short:'Réessayer sans aide',
        title:'🎯 Refais « '+helpLabel+' » en essayant sans aide.',
        why:(helpMetrics?('Tu as réussi ('+helpMetrics+'). '):'Tu as réussi. ')
          +'La prochaine étape est de réussir la même compétence de façon plus autonome.'
      };
    }

    var independent=latestLearningByStatus('reussi_seul');
    if(independent){
      var independentLabel=friendlyLabel(independent), independentMetrics=learningMetrics(independent);
      return {
        action:'train',
        subject:'francais',
        short:'Confirmer plus tard',
        title:'🟢 Tu as réussi seul « '+independentLabel+' ».',
        why:(independentMetrics?('Ton bilan est '+independentMetrics+'. '):'')
          +'Ne la refais pas tout de suite : poursuis ton parcours et reviens-y un autre jour pour confirmer cette réussite.'
      };
    }

    var mastered=latestLearningByStatus('maitrise_plusieurs_fois');
    if(mastered){
      var masteredLabel=friendlyLabel(mastered);
      return {
        action:'train',
        subject:'francais',
        short:'Passer à la suite',
        title:'⭐ « '+masteredLabel+' » est maintenant bien maîtrisé.',
        why:'Tu as réussi cette compétence plusieurs fois sans aide. Choisis maintenant une nouvelle compétence de lecture ou de compréhension.'
      };
    }

    var repeat=repeatedDifficulty();
    if(repeat){
      return {
        action:'lesson',
        subject:subjectFrom(repeat.row),
        short:'Revoir une leçon',
        title:'📚 Revois la leçon sur '+repeat.label+'.',
        why:'Cette compétence t’a posé plusieurs difficultés récemment. Revois l’explication, puis refais un petit entraînement.'
      };
    }

    var diff=recentDifficulty();
    if(diff){
      return {
        action:'train',
        subject:subjectFrom(diff.row),
        short:'M’entraîner',
        title:'🧠 Entraîne-toi encore sur '+diff.label+'.',
        why:diff.pct!=null
          ? 'Ton dernier résultat est de '+diff.pct+' %. Un entraînement court t’aidera à rendre cette compétence plus solide.'
          : 'Cette compétence t’a posé une difficulté récemment. Reprends-la tranquillement avant de continuer.'
      };
    }

    var strong=latestStrongResult();
    if(strong){
      return {
        action:'belt',
        subject:subjectFrom(strong.row),
        short:'Passer une ceinture',
        title:'⭐ Tu peux tenter une ceinture sur '+strong.label+'.',
        why:'Ton dernier résultat est de '+strong.pct+' %. Tes réussites récentes montrent que tu peux essayer l’étape suivante.'
      };
    }

    var calc=bestCalc();
    if(calc.last){
      var cp=rowPct(calc.last);
      if(cp!=null && cp<80){
        return {
          action:'train',subject:'maths',short:'M’entraîner',
          title:'🧮 Continue le calcul mental.',
          why:'Ton dernier score est de '+clean(calc.last.score)+'/'+clean(calc.last.total)+'. Cherche d’abord à être régulier avant de vouloir aller plus vite.'
        };
      }
      if(cp!=null && cp>=90){
        return {
          action:'belt',subject:'maths',short:'Passer une ceinture',
          title:'⭐ Tu es prêt pour un nouveau défi de calcul.',
          why:'Ton dernier score est de '+clean(calc.last.score)+'/'+clean(calc.last.total)+'. Tes résultats sont suffisamment solides pour tenter la suite.'
        };
      }
    }

    var explained=explainedQuestion();
    if(explained){
      var qtext=clean(explained.questionCorrigee||explained.questionOriginale);
      if(qtext.length>62) qtext=qtext.slice(0,59).replace(/\s+\S*$/,'')+'…';
      return {
        action:'questions',subject:'',short:'Voir mes questions',
        title:'💬 Retourne voir ta question : « '+qtext+' »',
        why:'Elle fait partie de ton parcours. Relire une question expliquée peut t’aider à mieux retenir ce que tu as découvert.'
      };
    }

    var q=latestQuestion();
    if(q){
      return {
        action:'train',subject:'maths',short:'M’entraîner',
        title:'🧠 Poursuis avec un petit entraînement.',
        why:'Tu avances régulièrement. Choisis une compétence que tu veux rendre encore plus facile et entraîne-toi quelques minutes.'
      };
    }

    return {
      action:'question',subject:'',short:'Poser une question',
      title:'💬 Une chose t’intrigue ? Pose une vraie question.',
      why:'Tu n’as pas encore de question dans ton parcours. Demande quelque chose que tu aimerais réellement comprendre ou découvrir.'
    };
  }

  function setRecommended(rec){
    var oldMap={
      train:document.getElementById('v24AdviceTrain'),
      belt:document.getElementById('v24AdviceBelt'),
      question:document.getElementById('v24AdviceQuestion')
    };
    Object.keys(oldMap).forEach(function(k){
      if(oldMap[k]) oldMap[k].classList.remove('recommended');
    });
    if(rec.action==='train' && oldMap.train) oldMap.train.classList.add('recommended');
    if(rec.action==='belt' && oldMap.belt) oldMap.belt.classList.add('recommended');
    if((rec.action==='question'||rec.action==='questions') && oldMap.question) oldMap.question.classList.add('recommended');

    var dash={
      train:document.getElementById('v2574TrainBtn'),
      belt:document.getElementById('v2574BeltBtn'),
      lesson:document.getElementById('v2574LessonBtn'),
      question:document.getElementById('v2574QuestionBtn')
    };
    Object.keys(dash).forEach(function(k){
      if(dash[k]) dash[k].classList.remove('v25815-recommended');
    });
    var key=rec.action==='questions'?'question':rec.action;
    if(dash[key]) dash[key].classList.add('v25815-recommended');
  }

  function openQuestions(){
    try{
      if(typeof window.openHibouProgressHubV25814==='function'){
        window.openHibouProgressHubV25814();
      }else if(typeof window.openHibouProgressHubV25791==='function'){
        window.openHibouProgressHubV25791();
      }
      window.setTimeout(function(){
        var tab=document.querySelector('[data-hp79-tab="questions"]');
        if(tab && tab.click) tab.click();
      },160);
    }catch(e){}
  }

  function configureQuestionButton(rec){
    var btn=document.getElementById('v24AdviceQuestion');
    if(!btn) return;
    if(rec.action==='questions'){
      btn.innerHTML='💬 Voir mes questions<small>dans mon parcours</small>';
      if(!btn.__v25815QuestionsBound){
        btn.__v25815QuestionsBound=true;
        btn.addEventListener('click',function(ev){
          if((state.recommendation||{}).action!=='questions') return;
          ev.preventDefault(); ev.stopImmediatePropagation(); openQuestions();
        },true);
      }
    }else{
      btn.innerHTML='💬 Poser une question<small>Points Curiosité</small>';
    }
  }

  function render(rec){
    state.recommendation=rec;

    var box=document.getElementById('v24AdviceText');
    if(box){
      box.innerHTML=
        '<div class="v25807-advice-action">'+esc(rec.title)+'</div>'+
        '<div class="v25807-advice-why">'+esc(rec.why)+'</div>';
    }

    var title=document.querySelector('#v24AdviceCard .v24-advice-title');
    if(title) title.textContent='Voici ce que je te conseille maintenant';

    configureQuestionButton(rec);
    setRecommended(rec);

    var strip=document.getElementById('v2574AdviceStrip');
    if(strip){
      strip.innerHTML=
        '<span class="tag">💡 Conseil de Maître Hibou :</span> '+
        '<span class="tip">'+esc(rec.short)+'</span> '+
        '<span class="note">'+esc(rec.title.replace(/^[^\s]+\s*/,''))+'</span>';
    }
  }

  function computeAndRender(){
    try{render(recommendation())}catch(e){}
  }

  function boot(){
    computeAndRender();
    fetchSnapshot(true).then(computeAndRender);

    document.addEventListener('hibou:student-changed',function(){
      state.student=''; state.snapshot=null; state.loadedAt=0;
      window.setTimeout(function(){fetchSnapshot(true)},250);
    });

    document.addEventListener('hibou:belts-updated',function(){
      window.setTimeout(function(){fetchSnapshot(true)},350);
    });

    // V25.8.15 : conseil stable.
    // Aucun rafraîchissement périodique. Le conseil est recalculé uniquement
    // quand le parcours de l'élève change réellement.
    ['hibou:progress-updated','hibou:student-event','hibou:learning-activity-saved','hibou:question-sent','hibou:calculation-updated'].forEach(function(evt){
      document.addEventListener(evt,function(){
        window.setTimeout(function(){ fetchSnapshot(true).then(computeAndRender); },250);
      });
    });
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',boot,{once:true});
  }else{
    boot();
  }

  window.addEventListener('load',function(){
    window.setTimeout(function(){fetchSnapshot(true)},500);
  },{once:true});
})();
