
(function(){
  'use strict';
  var state=null, overlay=null;
  function student(){try{return typeof prenomActuel!=='undefined'?String(prenomActuel||'').trim():''}catch(e){return ''}}
  function key(){return student().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9_-]/g,'_')}
  function today(){var d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
  function historyKey(){return 'hibou_defi_tables_v1_'+key()}
  function history(){try{var v=JSON.parse(localStorage.getItem(historyKey())||'[]');return Array.isArray(v)?v:[]}catch(e){return []}}
  function shuf(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
  function makeQuestions(table,level){var pool=[];var multipliers=level==='decouverte'?[1,2,3,4,5]:[1,2,3,4,5,6,7,8,9,10];for(var x=0;x<10;x++){
    var t=table==='mixte' ? 2+x%9:Number(table);
    for(var k=0;k<multipliers.length;k++)pool.push({a:t,b:multipliers[k]});
  }
    pool=shuf(pool);var questions=[],seen={};for(var p=0;p<pool.length&&questions.length<10;p++){var q=pool[p],id=q.a+'x'+q.b;if(seen[id])continue;seen[id]=true;questions.push(q)}return questions;
  }
  function ensure(){if(overlay)return;overlay=document.createElement('div');overlay.id='htg-overlay';overlay.hidden=true;overlay.innerHTML='<div id="htg-panel" role="dialog" aria-modal="true" aria-label="Défi des tables"></div>';document.body.appendChild(overlay);overlay.addEventListener('click',function(e){if(e.target===overlay)close()});}
  function panel(){return document.getElementById('htg-panel')}
  function close(){if(overlay)overlay.hidden=true;state=null}
  function startScreen(){ensure();overlay.hidden=false;state=null;var p=panel();p.innerHTML='<div class="htg-head"><h2>🦉 Défi des tables</h2><button class="htg-light" id="htg-close" aria-label="Fermer">✕</button></div><p>Choisis ta table et relève 10 défis !</p><label for="htg-table">Ma table</label><select id="htg-table">'+[2,3,4,5,6,7,8,9,10].map(function(n){return '<option value="'+n+'">Table de '+n+'</option>'}).join('')+'<option value="mixte">Toutes les tables mélangées</option></select><label for="htg-level">Mon niveau</label><select id="htg-level"><option value="decouverte">Découverte — jusqu’à ×5</option><option value="entrainement" selected>Entraînement — jusqu’à ×10</option><option value="defi">Défi — tables jusqu’à ×10</option></select><div class="htg-foot"><button id="htg-start">Commencer</button></div><p class="htg-mini">La vitesse ne compte pas. Une récompense par table et par niveau chaque jour.</p>';
  document.getElementById('htg-close').onclick=close;document.getElementById('htg-start').onclick=function(){var table=document.getElementById('htg-table').value,level=document.getElementById('htg-level').value;state={table:table,level:level,qs:makeQuestions(table,level),pos:0,correct:0,miss:[],answered:false,practice:false};renderQ()};}
  function options(q){var good=q.a*q.b,choices=[good],candidates=shuf([good-q.a,good+q.a,good+q.b,good-q.b,good+2*q.a,good+10,good-10,good+2]);candidates.forEach(function(n){if(n>0&&!choices.includes(n)&&choices.length<4)choices.push(n)});var v=1;while(choices.length<4){var n=good+v++;if(!choices.includes(n))choices.push(n)}return shuf(choices)}
  function hint(q){if(q.b===9)return 'Astuce : '+q.a+' × 10 = '+q.a*10+', puis enlève '+q.a+'.';if(q.b===5)return 'Astuce : prends la moitié de '+q.a*10+'.';if(q.b===6)return 'Astuce : '+q.a+' × 5 = '+q.a*5+', puis ajoute '+q.a+'.';if(q.b===4)return 'Astuce : double '+q.a+', puis double encore.';if(q.b===8)return 'Astuce : double trois fois '+q.a+'.';return 'Astuce : pars d’un résultat connu et ajoute ou retire un paquet de '+q.a+'.'}
  function renderQ(){var q=state.qs[state.pos],p=panel(),opts=options(q);state.answered=false;p.innerHTML='<div class="htg-head"><strong>Calcul '+(state.pos+1)+' / '+state.qs.length+'</strong><strong>⭐ '+state.correct+' bonne(s) réponse(s)</strong><button class="htg-light" id="htg-close">✕</button></div><div class="htg-progress"><div class="htg-fill" style="width:'+(100*state.pos/state.qs.length)+'%"></div></div><p>Combien font…</p><div class="htg-sum">'+q.a+' × '+q.b+' = ?</div><div class="htg-choices">'+opts.map(function(n){return '<button data-answer="'+n+'">'+n+'</button>'}).join('')+'</div><div id="htg-feedback" aria-live="polite"></div><div id="htg-next"></div>';document.getElementById('htg-close').onclick=close;panel().querySelectorAll('[data-answer]').forEach(function(b){b.onclick=function(){answer(Number(b.dataset.answer))}})}
  function answer(choice){if(state.answered)return;state.answered=true;var q=state.qs[state.pos],good=q.a*q.b,ok=choice===good;if(ok)state.correct++;else state.miss.push({a:q.a,b:q.b,result:good});panel().querySelectorAll('[data-answer]').forEach(function(b){var v=Number(b.dataset.answer);b.disabled=true;if(v===good)b.classList.add('htg-right');if(v===choice&&!ok)b.classList.add('htg-wrong')});document.getElementById('htg-feedback').innerHTML='<div class="htg-feedback">'+(ok?'Bravo ! Bonne réponse.':'La bonne réponse est '+good+'.<br>'+hint(q))+'</div>';var btn=document.createElement('button');btn.textContent=state.pos===state.qs.length-1?'Voir mon résultat':'Calcul suivant →';btn.onclick=function(){state.pos++;if(state.pos>=state.qs.length)finish();else renderQ()};document.getElementById('htg-next').appendChild(btn)}
  function finish(){var count=state.correct,stars=count===10?3:count>=8?2:count>=6?1:0,points=stars*5,notes='',saved=false;
    if(state.practice)points=0;
    if(!student()){points=0;notes='Identifie-toi dans Maître Hibou pour enregistrer tes points.'}
    else {var rows=history(),previous=rows.some(function(r){return r.date===today()&&r.table===state.table&&r.level===state.level&&r.points>0});if(previous){points=0;notes='Tu as déjà obtenu les points de cette table et de ce niveau aujourd’hui.'}
      var row={date:today(),table:state.table,level:state.level,score:count,total:state.qs.length,stars:stars,points:points,errors:state.miss,at:new Date().toISOString()};
      try{localStorage.setItem(historyKey(),JSON.stringify(rows.concat([row]).slice(-120)));saved=true}catch(e){points=0;notes='Impossible d’enregistrer les résultats : aucun point attribué.'}
      if(points&&saved){try{if(typeof addScore==='function'){addScore(points,'Défi des tables '+state.table+' '+state.level)}else{points=0;notes='Compteur Maître Hibou indisponible.'}}catch(e){points=0;notes='Erreur du compteur de points.'}}
      // Le journal officiel de Maître Hibou conserve la partie et la synchronise
      // vers parcours_eleves via hibou-sync, si la tablette est configurée.
      if(saved && typeof window.hibouTrackEvent==='function'){
        try{
          window.hibouTrackEvent({
            id_evenement:'defi-tables-'+key()+'-'+row.at.replace(/[^0-9]/g,'')+'-'+Math.random().toString(36).slice(2,8),
            date_iso:row.at,
            prenom:student(),
            type:'entrainement_termine',
            titre:'Défi des tables — '+(state.table==='mixte'?'Tables mélangées':'Table de '+state.table),
            detail:'Niveau '+state.level+' · '+count+'/'+state.qs.length+' · '+points+' point(s) Hibou · '+state.miss.length+' erreur(s)',
            matiere:'maths',
            domaine:'Tables de multiplication — '+state.level,
            score:count,
            total:state.qs.length,
            resultat:count>=8?'reussite':count>=6?'encours':'a_renforcer',
            source:'maitre_hibou_defi_tables_v25882'
          });
        }catch(syncError){console.warn('Journal du Défi des tables indisponible',syncError)}
      }
    }
    var mistakes=state.miss.slice(),p=panel();p.innerHTML='<div class="htg-head"><h2>🏆 Défi terminé !</h2><button class="htg-light" id="htg-close">✕</button></div><div class="htg-sum">'+count+' / '+state.qs.length+'</div><p style="font-size:24px">'+'⭐'.repeat(stars)+'</p><h3>'+(points?'+'+points+' points Hibou !':'Continue à t’entraîner !')+'</h3>'+(notes?'<p class="htg-feedback">'+notes+'</p>':'')+(mistakes.length?'<p>À revoir : '+mistakes.map(function(x){return x.a+' × '+x.b}).join(' · ')+'</p>':'<p>Tu as réussi tous les calculs !</p>')+'<div class="htg-foot"><button id="htg-retry">Rejouer</button><button class="htg-light" id="htg-new">Changer de table</button></div>';document.getElementById('htg-close').onclick=close;document.getElementById('htg-retry').onclick=function(){state={table:state.table,level:state.level,qs:mistakes.length?mistakes.map(function(x){return {a:x.a,b:x.b}}):makeQuestions(state.table,state.level),pos:0,correct:0,miss:[],answered:false,practice:true};renderQ()};document.getElementById('htg-new').onclick=startScreen;
  }
  window.openHibouTablesGame=startScreen;
})();
