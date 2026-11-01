
(function(){
'use strict';
var overlay=null, game=null;
function byId(x){return document.getElementById(x)}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function student(){try{return typeof prenomActuel!=='undefined'?String(prenomActuel||'').trim():''}catch(e){return ''}}
function key(){return student().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9_-]/g,'_')}
function day(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function historyKey(){return 'hibou_defi_suites_v1_'+key()}
function history(){try{var r=JSON.parse(localStorage.getItem(historyKey())||'[]');return Array.isArray(r)?r:[]}catch(e){return []}}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function makeExercises(level){
 var steps=level==='facile'?[2,5,10]:level==='moyen'?[2,3,5,10]:[2,3,4,5,10,25,100];
 var res=[];
 for(var i=0;i<10;i++){
   var step=steps[i%steps.length]*(level==='facile'?1:(i%3===1?-1:1));
   var start;
   if(level==='facile') start=[0,4,10,12,20,24,30,40,50,60][i];
   else if(level==='moyen') start=step<0?35+i*11:11+i*13;
   else start=step<0?(Math.abs(step)*5+17+i*7):(23+i*37);
   if(step<0 && start+4*step<0)start=Math.abs(step)*5+17+i*7;
   var sequence=Array.from({length:5},function(_,j){return start+j*step});
   // Niveau 1 : les deux premiers sont donnés ; niveaux suivants : trous à différentes positions.
   var missing=level==='facile'?[2,3,4]:level==='moyen'?(i%2?[1,3,4]:[2,3,4]):(i%2?[0,2,4]:[1,2,4]);
   res.push({sequence:sequence,missing:missing,step:step,tries:0,firstSuccess:false});
 }
 return shuffle(res);
}
function ensure(){if(overlay)return;overlay=document.createElement('div');overlay.id='hsg-overlay';overlay.hidden=true;overlay.innerHTML='<div id="hsg-panel" role="dialog" aria-modal="true" aria-label="Défi des suites"></div>';document.body.appendChild(overlay)}
function panel(){return byId('hsg-panel')}
function close(){if(overlay)overlay.hidden=true;game=null}
function begin(){ensure();overlay.hidden=false;game=null;panel().innerHTML='<div class="hsg-top"><div class="hsg-head"><h2>🦉 Le Défi des suites</h2><button id="hsg-close" class="hsg-secondary" aria-label="Fermer">✕</button></div><p>Écris les nombres manquants, puis vérifie tes réponses !</p></div><label for="hsg-level">Choisis ton niveau</label><select id="hsg-level"><option value="facile">⭐ Explorateur : +2, +5, +10</option><option value="moyen">⭐⭐ Aventurier : autres départs et comptes à rebours</option><option value="expert">⭐⭐⭐ Expert : nombres manquants partout, +25, +100…</option></select><p class="hsg-small">10 suites par partie. Sans chronomètre. Il faut réussir la vérification pour avancer.</p><div class="hsg-row"><button id="hsg-start">Commencer</button></div>';byId('hsg-close').onclick=close;byId('hsg-start').onclick=function(){var level=byId('hsg-level').value;game={level:level,exercises:makeExercises(level),index:0,firstCorrect:0,errors:0,misses:[],completed:false};showExercise()}}
function getValues(ex){return ex.missing.map(function(i){return (byId('hsg-val-'+i)||{}).value||''})}
function showExercise(){var ex=game.exercises[game.index],html='<div class="hsg-head"><h2>🦉 Défi des suites</h2><button class="hsg-secondary" id="hsg-close">✕</button></div><strong>Exercice '+(game.index+1)+' / 10</strong><div class="hsg-progress"><div class="hsg-fill" style="width:'+(10*game.index)+'%"></div></div><p>Complète la suite en écrivant les nombres manquants.</p><div class="hsg-sequence">';
 ex.sequence.forEach(function(n,i){html+=ex.missing.includes(i)?'<input class="hsg-num" id="hsg-val-'+i+'" inputmode="numeric" type="number" aria-label="Nombre manquant, case '+(i+1)+'" placeholder="?" autocomplete="off">':'<div class="hsg-num">'+n+'</div>'});
 html+='</div><div id="hsg-feedback" role="status" aria-live="polite"></div><div class="hsg-row"><button id="hsg-check">Vérifier mes réponses</button><button id="hsg-next" disabled>Exercice suivant →</button></div><p class="hsg-small">Le bouton « Exercice suivant » se débloque après une vérification réussie.</p>';
 panel().innerHTML=html;byId('hsg-close').onclick=close;byId('hsg-check').onclick=check;byId('hsg-next').onclick=next;panel().querySelectorAll('input.hsg-num').forEach(function(input){input.addEventListener('input',function(){if(!game.exercises[game.index].validated){input.classList.remove('hsg-good','hsg-bad');byId('hsg-feedback').textContent=''}})});var first=panel().querySelector('input.hsg-num');if(first)first.focus();}
function check(){var ex=game.exercises[game.index];if(ex.validated)return;var values=getValues(ex);ex.tries++;var ok=true;ex.missing.forEach(function(i,j){var input=byId('hsg-val-'+i),value=values[j].trim(),right=value!==''&&Number(value)===ex.sequence[i];input.classList.toggle('hsg-good',right);input.classList.toggle('hsg-bad',!right);if(!right)ok=false});
 if(ok){ex.validated=true;ex.firstSuccess=ex.tries===1;if(ex.firstSuccess)game.firstCorrect++;byId('hsg-feedback').innerHTML='<div class="hsg-feedback ok">Bravo ! Toute la suite est juste. Tu peux passer à l’exercice suivant.</div>';byId('hsg-check').disabled=true;byId('hsg-next').disabled=false;panel().querySelectorAll('input.hsg-num').forEach(function(input){input.readOnly=true})}
 else{game.errors++;if(ex.tries===1)game.misses.push({suite:ex.sequence.slice(),step:ex.step});byId('hsg-feedback').innerHTML='<div class="hsg-feedback">Il y a des erreurs. Corrige les cases rouges, puis vérifie encore.'+(ex.tries>=2?'<p>💡 Aide : à chaque étape, '+(ex.step>0?'ajoute ':'enlève ')+Math.abs(ex.step)+'.</p>':'<p>Observe l’écart entre les nombres déjà écrits.</p>')+'</div>'}
}
function next(){var ex=game.exercises[game.index];if(!ex.validated)return;game.index++;if(game.index>=10)finish();else showExercise()}
function finish(){if(game.completed)return;game.completed=true;var total=game.firstCorrect,stars=total===10?3:total>=8?2:total>=6?1:0,points=stars*5,notes='',saved=false,row=null;
 if(!student()){points=0;notes='Connecte-toi avec ton prénom dans Maître Hibou pour gagner des points.'}
 else{
   var entries=history(),claimed=entries.some(function(x){return x.date===day()&&x.level===game.level&&x.points>0});
   if(claimed){points=0;notes='Tu as déjà reçu les points de ce niveau aujourd’hui. Tu peux continuer à t’entraîner.'}
   row={date:day(),level:game.level,score:total,total:10,stars:stars,points:points,corrected:10-total,errors:game.misses,at:new Date().toISOString()};
   try{localStorage.setItem(historyKey(),JSON.stringify(entries.concat([row]).slice(-120)));saved=true}catch(e){points=0;notes='L’enregistrement local a échoué : aucun point attribué.'}
   if(saved&&points){try{if(typeof addScore==='function')addScore(points,'Défi des suites '+game.level);else {points=0;notes='Compteur de points indisponible.'}}catch(e){points=0;notes='Impossible de créditer les points.'}}
   if(saved&&typeof window.hibouTrackEvent==='function')try{window.hibouTrackEvent({id_evenement:'defi-suites-'+key()+'-'+row.at.replace(/[^0-9]/g,''),date_iso:row.at,prenom:student(),type:'entrainement_termine',titre:'Défi des suites — '+game.level,detail:total+'/10 réussies du premier coup · '+(10-total)+' suite(s) corrigée(s) · '+points+' point(s) Hibou',matiere:'maths',domaine:'Suites numériques',score:total,total:10,resultat:total>=8?'reussite':total>=6?'encours':'a_renforcer',source:'maitre_hibou_defi_suites_v25883'})}catch(e){console.warn('Journal suites indisponible',e)}
 }
 panel().innerHTML='<div class="hsg-head"><h2>🏆 Défi terminé !</h2><button class="hsg-secondary" id="hsg-close">✕</button></div><div class="hsg-top" style="text-align:center"><h2>'+total+' / 10</h2><p>'+'⭐'.repeat(stars)+'</p><h3>'+(points?'+'+points+' points Hibou !':'Bravo pour tes efforts !')+'</h3><p>Tu as terminé et corrigé les 10 suites.</p></div>'+(notes?'<p class="hsg-feedback">'+esc(notes)+'</p>':'')+'<div class="hsg-summary"><strong>'+total+'</strong> suites correctes dès la première vérification.<p>'+(10-total)+' suite(s) à retravailler.</p></div><div class="hsg-row"><button id="hsg-retry">Rejouer</button><button id="hsg-select" class="hsg-secondary">Changer de niveau</button></div>';
 byId('hsg-close').onclick=close;byId('hsg-retry').onclick=function(){var level=game.level;game={level:level,exercises:makeExercises(level),index:0,firstCorrect:0,errors:0,misses:[],completed:false};showExercise()};byId('hsg-select').onclick=begin;
}
window.openHibouSuitesGame=begin;
})();
