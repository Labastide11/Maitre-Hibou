/* Maître Hibou V25.8.17 — moteur commun d'exercices */
(function(){
'use strict';
if(window.__hibouLearningEngineV25817)return;
window.__hibouLearningEngineV25817=true;

const activities=()=>window.HIBOU_LEARNING_ACTIVITIES||{};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const state={activity:null,stage:'lesson',index:0,answers:{},helpUsed:0,startAt:0,sessionId:'',exerciseTypes:new Set(),challengeScore:0,challengeTotal:0};

function host(){return document.getElementById('frenchPopupInnerV2348');}
function nowId(){return 'learn_'+Date.now()+'_'+Math.random().toString(36).slice(2,8);}
function reset(a){state.activity=a;state.stage='lesson';state.index=0;state.answers={};state.helpUsed=0;state.startAt=Date.now();state.sessionId=nowId();state.exerciseTypes=new Set();state.challengeScore=0;state.challengeTotal=(a.challenge||[]).length;}
function titleBlock(){const a=state.activity;return '<div class="fr-v2348-header"><div class="fr-v2348-owl">🦉</div><div class="fr-v2348-title"><h2>📖 '+esc(a.title)+'</h2><p>'+esc(a.studentGoal)+'</p></div></div>';}
function progressHTML(){
 const stages=[['lesson','📘','Je comprends'],['guided','🧩',"J'essaie"],['training','🎯',"Je m'entraîne"],['challenge','⭐','Mon défi'],['summary','🦉','Mon bilan']];
 const order=stages.map(x=>x[0]),current=order.indexOf(state.stage);
 return '<div class="hle-progress">'+stages.map((s,i)=>'<div class="hle-step '+(i===current?'active ':'')+(i<current?'done':'')+'"><span>'+s[1]+'</span><small>'+s[2]+'</small></div>').join('')+'</div>';
}
function shell(content){const h=host();if(!h)return;h.innerHTML=titleBlock()+'<div class="fr-v2348-content"><section class="fr-v2348-panel"><div class="hle-shell">'+progressHTML()+content+'</div></section></div>';}

function renderLesson(){
 state.stage='lesson';state.index=0;const l=state.activity.lesson||{};
 shell('<div class="hle-card hle-lesson"><h3>📘 Je comprends</h3><p class="hle-intro">'+esc(l.intro||'')+'</p><ol class="hle-lesson-steps">'+(l.steps||[]).map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol>'
 +(l.example?'<div class="hle-example"><strong>Exemple</strong><div class="hle-word">'+esc(l.example.word)+'</div><div class="hle-chunks">'+(l.example.chunks||[]).map(x=>'<span>'+esc(x)+'</span>').join('<b>·</b>')+'</div><p>'+esc(l.example.sentence||'')+'</p></div>':'')
 +'<div class="hle-actions"><button class="hle-primary" type="button" onclick="hibouLearningNextV25817()">🧩 J’essaie avec Maître Hibou</button><button class="hle-secondary" type="button" onclick="openHibouReadingV25763()">← Choisir une autre activité</button></div></div>');
}
function stageItems(){return state.activity[state.stage]||[];}
function answerRecord(ex){return state.answers[ex.id]||(state.answers[ex.id]={correct:false,attempts:0,help:0,done:false});}
function currentExercise(){return stageItems()[state.index]||null;}

function optionsHTML(ex){
 if(ex.type==='highlight'){
   const rec=answerRecord(ex), selected=rec.selected||[];
   return '<div class="hle-highlight-list">'+(ex.items||[]).map((c,i)=>{
     const active=selected.indexOf(i)>=0?' selected':'';
     return '<button type="button" class="hle-highlight'+active+'" onclick="hibouLearningToggleHighlightV25817('+i+')">'+esc(c)+'</button>';
   }).join('')+'</div>';
 }
 if(ex.type==='multi'){
   const rec=answerRecord(ex), selected=rec.selected||[];
   return '<div class="hle-choice-grid hle-multi-grid">'+(ex.items||[]).map((c,i)=>{
     const active=selected.indexOf(i)>=0?' selected':'';
     return '<button type="button" class="hle-choice hle-multi'+active+'" onclick="hibouLearningToggleMultiV25817('+i+')">'+esc(c)+'</button>';
   }).join('')+'</div>';
 }
 if(ex.type==='order'){
   const rec=answerRecord(ex),seq=rec.sequence||[];
   const counts={};seq.forEach(x=>counts[x.value]=(counts[x.value]||0)+1);
   const seen={};const remaining=(ex.items||[]).filter(item=>{seen[item]=(seen[item]||0)+1;return (counts[item]||0)<seen[item];});
   return '<div class="hle-order-zone"><div class="hle-order-answer">'+(seq.length?seq.map((x,i)=>'<button type="button" onclick="hibouLearningRemoveChunkV25817('+i+')">'+esc(x.value)+'</button>').join('<span>→</span>'):'<em>Touche les morceaux dans l’ordre.</em>')+'</div><div class="hle-order-bank">'+remaining.map(x=>'<button type="button" onclick="hibouLearningAddChunkV25817(\''+String(x).replace(/\\/g,'\\\\').replace(/'/g,"\\'")+'\')">'+esc(x)+'</button>').join('')+'</div></div>';
 }
 return '<div class="hle-choice-grid">'+(ex.choices||[]).map(c=>'<button type="button" class="hle-choice" onclick="hibouLearningChooseV25817(\''+String(c).replace(/\\/g,'\\\\').replace(/'/g,"\\'")+'\')">'+esc(c)+'</button>').join('')+'</div>';
}

function renderExercise(){
 const ex=currentExercise();if(!ex){advanceStage();return;}const rec=answerRecord(ex);state.exerciseTypes.add(ex.type||'choice');const noHelp=state.stage==='challenge';
 shell('<div class="hle-card"><div class="hle-stage-label">'+(state.stage==='guided'?'🧩 J’essaie avec Maître Hibou':state.stage==='training'?'🎯 Je m’entraîne':'⭐ Mon défi')+'</div><div class="hle-question-count">Question '+(state.index+1)+' / '+stageItems().length+'</div><h3>'+esc(ex.title||'À toi de jouer')+'</h3><p class="hle-prompt">'+esc(ex.prompt||'')+'</p>'
 +(ex.visual?'<div class="hle-visual-card" role="img" aria-label="'+esc(ex.visualLabel||'Illustration')+'"><div class="hle-visual-emoji">'+esc(ex.visual)+'</div>'+(ex.visualCaption?'<small>'+esc(ex.visualCaption)+'</small>':'')+'</div>':'')
 +(ex.text?'<div class="hle-reading-text">'+esc(ex.text)+'</div>':'')
 +(ex.stem?'<div class="hle-stem">'+esc(ex.stem)+'</div>':'')+optionsHTML(ex)
 +'<div class="hle-feedback '+(rec.feedback?(rec.correct?'ok':'bad'):'')+'">'+(rec.feedback?esc(rec.feedback):'')+'</div>'
 +'<div class="hle-actions">'+((ex.type==='order'||ex.type==='multi'||ex.type==='highlight')?'<button class="hle-primary" type="button" onclick="'+(ex.type==='multi'?'hibouLearningValidateMultiV25817()':ex.type==='highlight'?'hibouLearningValidateHighlightV25817()':'hibouLearningValidateOrderV25817()')+'">Vérifier</button>':'')+(!noHelp?'<button class="hle-help" type="button" onclick="hibouLearningHelpV25817()">💡 Aide</button>':'')+(rec.done?'<button class="hle-primary" type="button" onclick="hibouLearningNextExerciseV25817()">Continuer →</button>':'')+'</div>'
 +(!noHelp?'<div id="hleHelp" class="hle-helpbox"></div>':'')+'</div>');
}
function markResult(ex,correct){
 const rec=answerRecord(ex);if(rec.done)return;rec.attempts++;
 if(correct){rec.correct=true;rec.done=true;rec.feedback=ex.feedback||'Bravo !';if(state.stage==='challenge')state.challengeScore++;}
 else{rec.feedback='Pas encore. Observe bien et essaie de nouveau.';}
 renderExercise();
}
function choose(value){const ex=currentExercise();if(ex)markResult(ex,String(value)===String(ex.answer));}
function addChunk(value){const ex=currentExercise();if(!ex||ex.type!=='order')return;const rec=answerRecord(ex);if(rec.done)return;rec.sequence=rec.sequence||[];rec.sequence.push({value});renderExercise();}
function removeChunk(i){const ex=currentExercise();if(!ex||ex.type!=='order')return;const rec=answerRecord(ex);if(rec.done)return;rec.sequence=rec.sequence||[];rec.sequence.splice(i,1);renderExercise();}
function toggleHighlight(i){
 const ex=currentExercise();if(!ex||ex.type!=='highlight')return;
 const rec=answerRecord(ex);if(rec.done)return;
 rec.selected=rec.selected||[];
 const max=Number(ex.max||0),p=rec.selected.indexOf(i);
 if(p>=0)rec.selected.splice(p,1);
 else{if(max===1)rec.selected=[i];else rec.selected.push(i);}
 renderExercise();
}
function validateHighlight(){
 const ex=currentExercise();if(!ex||ex.type!=='highlight')return;
 const rec=answerRecord(ex),sel=(rec.selected||[]).slice().sort((a,b)=>a-b);
 const expected=(ex.answers||[]).map(Number).sort((a,b)=>a-b);
 const ok=JSON.stringify(sel)===JSON.stringify(expected);
 if(!ok)rec.selected=[];
 markResult(ex,ok);
}
function toggleMulti(i){
 const ex=currentExercise();if(!ex||ex.type!=='multi')return;
 const rec=answerRecord(ex);if(rec.done)return;
 rec.selected=rec.selected||[];
 const p=rec.selected.indexOf(i);
 if(p>=0)rec.selected.splice(p,1);else rec.selected.push(i);
 renderExercise();
}
function validateMulti(){
 const ex=currentExercise();if(!ex||ex.type!=='multi')return;
 const rec=answerRecord(ex),sel=(rec.selected||[]).map(i=>String((ex.items||[])[i])).sort();
 const expected=(ex.answers||[]).map(String).sort();
 const ok=JSON.stringify(sel)===JSON.stringify(expected);
 if(!ok)rec.selected=[];
 markResult(ex,ok);
}
function validateOrder(){const ex=currentExercise();if(!ex||ex.type!=='order')return;const rec=answerRecord(ex),seq=(rec.sequence||[]).map(x=>x.value),ok=JSON.stringify(seq)===JSON.stringify(ex.answer||[]);if(!ok)rec.sequence=[];markResult(ex,ok);}
function help(){const ex=currentExercise();if(!ex||state.stage==='challenge')return;const rec=answerRecord(ex),helps=ex.help||[];if(!helps.length)return;const i=Math.min(rec.help||0,helps.length-1);rec.help=(rec.help||0)+1;state.helpUsed++;const box=document.getElementById('hleHelp');if(box){box.textContent='💡 '+helps[i];box.classList.add('show');}}
function nextExercise(){const ex=currentExercise();if(!ex)return;const rec=answerRecord(ex);if(!rec.done)return;state.index++;if(state.index>=stageItems().length)advanceStage();else renderExercise();}
function advanceStage(){if(state.stage==='lesson'){state.stage='guided';state.index=0;renderExercise();return;}if(state.stage==='guided'){state.stage='training';state.index=0;renderExercise();return;}if(state.stage==='training'){state.stage='challenge';state.index=0;renderExercise();return;}if(state.stage==='challenge'){renderSummary();}}

function scoreTraining(){const ids=[...(state.activity.guided||[]),...(state.activity.training||[])].map(x=>x.id);return{score:ids.filter(id=>state.answers[id]&&state.answers[id].correct).length,total:ids.length};}
function previousIndependentSuccesses(code){
 try{const h=window.hibouGetEventHistory?window.hibouGetEventHistory():[];const sessions=new Set();(h||[]).forEach(e=>{if(e&&e.competence_code===code&&e.mastery_status==='reussi_seul'&&Number(e.help_used||0)===0&&e.learning_session_id)sessions.add(e.learning_session_id);});return sessions.size;}catch(e){return 0;}
}
function mastery(){
 const s=scoreTraining(),pct=s.total?Math.round(100*s.score/s.total):0,ch=state.challengeTotal?Math.round(100*state.challengeScore/state.challengeTotal):0;
 if(pct<60||ch<50)return{key:'a_renforcer',label:'À renforcer',icon:'🔴'};
 if(state.helpUsed>0)return{key:'reussi_avec_aide',label:'Réussi avec aide',icon:'🟡'};
 if(pct>=80&&ch===100){return previousIndependentSuccesses(state.activity.code)>=2?{key:'maitrise_plusieurs_fois',label:'Maîtrisé plusieurs fois',icon:'⭐'}:{key:'reussi_seul',label:'Réussi seul',icon:'🟢'};}
 return{key:'a_renforcer',label:'À renforcer',icon:'🔴'};
}
function trackSummary(m){
 const s=scoreTraining(),elapsed=Math.max(1,Math.round((Date.now()-state.startAt)/1000));
 const payload={type:'lecture_comprehension',matiere:'Français',domaine:state.activity.domain||'Lecture et compréhension',titre:state.activity.title,detail:m.label,score:s.score,total:s.total,temps_secondes:elapsed,resultat:m.label+' · défi '+state.challengeScore+'/'+state.challengeTotal,source:'hibou_learning_engine_v25817',competence_code:state.activity.code,competence_label:state.activity.title,exercise_types:Array.from(state.exerciseTypes).join(','),help_used:state.helpUsed,challenge_score:state.challengeScore,challenge_total:state.challengeTotal,mastery_status:m.key,learning_session_id:state.sessionId};
 try{
   var saved=null;
   if(window.hibouTrackLearningActivity)saved=window.hibouTrackLearningActivity(payload);
   else if(window.hibouTrackEvent)saved=window.hibouTrackEvent(payload);
   try{document.dispatchEvent(new CustomEvent('hibou:learning-activity-saved',{detail:{payload:payload,saved:saved}}));}catch(_e){}
   return saved;
 }catch(e){}
}
function renderSummary(){
 state.stage='summary';const m=mastery(),s=scoreTraining();if(!state.answers.__tracked){trackSummary(m);state.answers.__tracked=true;}
 let advice=m.key==='a_renforcer'?'Relis la stratégie puis refais l’activité tranquillement.':m.key==='reussi_avec_aide'?'Tu as réussi avec de l’aide. La prochaine fois, essaie d’utiliser moins d’aides.':m.key==='reussi_seul'?'Très bien. Refais cette compétence un autre jour pour confirmer ta réussite.':'Tu as réussi plusieurs fois sans aide. Cette compétence est maintenant bien solide.';
 shell('<div class="hle-card hle-summary"><h3>🦉 Mon bilan</h3><div class="hle-status '+m.key+'"><span>'+m.icon+'</span><strong>'+esc(m.label)+'</strong></div><div class="hle-scoreboard"><div><strong>'+s.score+'/'+s.total+'</strong><span>Entraînement</span></div><div><strong>'+state.challengeScore+'/'+state.challengeTotal+'</strong><span>Défi</span></div><div><strong>'+state.helpUsed+'</strong><span>Aide'+(state.helpUsed>1?'s':'')+' utilisée'+(state.helpUsed>1?'s':'')+'</span></div></div><p class="hle-bilan-advice">'+esc(advice)+'</p><div class="hle-saved">✅ Cette activité est ajoutée à ton parcours.</div><div class="hle-actions"><button class="hle-primary" type="button" onclick="hibouLearningRestartV25817()">Refaire l’activité</button><button class="hle-secondary" type="button" onclick="openHibouReadingV25763()">Choisir une autre activité</button></div></div>');
}
function open(code){const a=activities()[code];if(!a)return false;reset(a);renderLesson();return true;}
window.hibouLearningEngineV25817={open,activities};
window.hibouLearningNextV25817=function(){if(state.stage==='lesson')advanceStage();};
window.hibouLearningChooseV25817=choose;
window.hibouLearningToggleHighlightV25817=toggleHighlight;
window.hibouLearningValidateHighlightV25817=validateHighlight;
window.hibouLearningToggleMultiV25817=toggleMulti;
window.hibouLearningValidateMultiV25817=validateMulti;
window.hibouLearningAddChunkV25817=addChunk;
window.hibouLearningRemoveChunkV25817=removeChunk;
window.hibouLearningValidateOrderV25817=validateOrder;
window.hibouLearningHelpV25817=help;
window.hibouLearningNextExerciseV25817=nextExercise;
window.hibouLearningRestartV25817=function(){if(state.activity){reset(state.activity);renderLesson();}};
})();