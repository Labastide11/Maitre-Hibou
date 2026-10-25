/* Maître Hibou — géographie : moteur d'affichage indépendant.
 * Les contrôles partagés (correction, suivi) sont fournis depuis index.html.
 */
(function(){
  'use strict';
  window.MH_GEO_RENDER_FACTORY = function(deps){
    var GEO_SESSIONS=deps.GEO_SESSIONS, esc=deps.esc;
    var renderHistoryAssessment=deps.renderHistoryAssessment,
        renderScienceChoice=deps.renderScienceChoice,
        renderScienceMatch=deps.renderScienceMatch,
        renderScienceOrder=deps.renderScienceOrder,
        renderScienceSort=deps.renderScienceSort,
        renderScienceChecklist=deps.renderScienceChecklist,
        renderEnglishFeedback=deps.renderEnglishFeedback;
  function renderGeoHome(grid){
    grid.className = 'v24-english-shell';
    grid.innerHTML = '<div class="v24-english-intro"><div class="v24-english-panel"><h3>Géographie CE2</h3><p>Choisis une séance. Les cartes aident à lire, classer et se repérer.</p></div><div class="v24-english-panel"><h3>Cartes</h3><p>Rose des vents, légende, France simplifiée, densité et paysages.</p></div></div><div class="v24-english-sessions" id="v24GeoSessions"></div>';
    var wrap = grid.querySelector('#v24GeoSessions');
    GEO_SESSIONS.forEach(function(s){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'v24-english-session-card';
      b.innerHTML = '<strong>'+esc(s.emoji+' '+s.short)+'</strong><span>'+esc(s.title)+'</span><small>'+esc(s.objective)+'</small>';
      b.addEventListener('click', function(ev){ev.preventDefault();ev.stopPropagation();renderGeoSession(grid, s.id);}, true);
      wrap.appendChild(b);
    });
  }

  function renderGeoSession(grid, id){
    var s = GEO_SESSIONS.filter(function(x){return x.id === id;})[0] || GEO_SESSIONS[0];
    grid.className = 'v24-english-shell';
    grid.innerHTML = '<div class="v24-english-toolbar"><button type="button" class="v24-english-back" id="v24GeoBack">← Séances</button><div><div class="v24-english-objective">'+esc(s.emoji+' '+s.title+' — '+s.objective)+'</div><div class="v24-english-criteria">'+s.criteria.map(function(c){return '<span>✓ '+esc(c)+'</span>';}).join('')+'</div></div></div><div class="v24-english-exercises" id="v24GeoExercises"></div>';
    grid.querySelector('#v24GeoBack').addEventListener('click', function(ev){ev.preventDefault();ev.stopPropagation();renderGeoHome(grid);}, true);
    var wrap = grid.querySelector('#v24GeoExercises');
    if(s.id === 1) grid.classList.add('geo-session1-large');
    s.exos.forEach(function(exo, idx){
      var card = document.createElement('section');
      card.className = 'v24-english-exo' + (s.id === 1 && idx === 0 ? ' geo-s1-compass-card' : '') + (s.id === 1 && idx === 2 ? ' geo-s1-map-card' : '');
      card.innerHTML = '<h3>'+esc(exo.title)+'</h3><p>'+esc(exo.instr)+'</p>';
      if(idx === 0 && s.id === 1) card.insertAdjacentHTML('beforeend','<figure class="geo-rose-visible"><img src="images/geographie-seance1-rose-des-vents.jpg" alt="Rose des vents : Nord en haut, Sud en bas, Est à droite et Ouest à gauche"><figcaption>Observe la rose des vents avant de relier chaque direction.</figcaption></figure>');
      else if(idx === 0 && s.map) card.insertAdjacentHTML('beforeend','<div class=\"v24-geo-map-card\">'+s.map+'</div>');
      if(s.id === 1 && idx === 2){
        card.insertAdjacentHTML('beforeend','<figure class="geo-legend-map-s1"><img src="images/geographie-seance1-carte-legende.jpg" alt="Plan imaginaire du village des Tilleuls avec sa légende : forêt verte, route grise, ville beige et lac bleu"><figcaption>Observe le plan et sa légende avant de répondre.</figcaption></figure>');
      }
      if(exo.type === 'assessment') renderHistoryAssessment(card, exo);
      if(exo.type === 'choice') renderScienceChoice(card, exo);
      if(exo.type === 'match'){
        if(s.id === 1 && idx === 1) renderGeoPhotoMatch(card);
        else renderScienceMatch(card, exo);
      }
      if(exo.type === 'order') renderScienceOrder(card, exo);
      if(exo.type === 'sort') renderScienceSort(card, exo);
      if(exo.type === 'checklist') renderScienceChecklist(card, exo);
      if(exo.type === 'free') renderGeoFree(card, exo);
      wrap.appendChild(card);
    });

    /* V25.7.57 — Géographie : même logique validée que Sciences et Anglais pour les 6 séances. */
    if(s.id >= 1 && s.id <= 6){
      var exerciseCards = Array.prototype.slice.call(wrap.querySelectorAll('.v24-english-exo'));
      var finishBox = document.createElement('section');
      finishBox.className = 'v24-english-exo v25744-geo-finish';
      finishBox.innerHTML = '<h3>'+esc(s.emoji+' Fin de la séance')+'</h3><p>Réalise les '+exerciseCards.length+' exercices avant d’enregistrer cette séance dans ton parcours.</p>';

      var finishButton = document.createElement('button');
      finishButton.type = 'button';
      finishButton.className = 'v24-english-check';
      finishButton.disabled = true;
      finishButton.textContent = 'Exercices terminés : 0 / '+exerciseCards.length;
      finishBox.appendChild(finishButton);
      wrap.appendChild(finishBox);

      function refreshGeoSessionButton(){
        var finished = exerciseCards.filter(function(card){
          var feedback = card.querySelector('.v24-english-feedback');
          return feedback && String(feedback.textContent || '').trim().length > 0;
        }).length;
        finishButton.disabled = finished < exerciseCards.length;
        finishButton.textContent = finished < exerciseCards.length
          ? 'Exercices terminés : '+finished+' / '+exerciseCards.length
          : '✅ J’ai terminé la séance';
      }

      exerciseCards.forEach(function(card){
        try{
          new MutationObserver(refreshGeoSessionButton).observe(card, {
            childList:true, subtree:true, characterData:true, attributes:true,
            attributeFilter:['class']
          });
        }catch(error){}
      });
      refreshGeoSessionButton();

      finishButton.addEventListener('click', function(ev){
        ev.preventDefault();
        if(finishButton.disabled || finishButton.dataset.recorded === '1') return;

        var detailText = s.short+' — '+exerciseCards.length+' exercices terminés';
        var payload = {
          type:'entrainement_termine',
          matiere:'Géographie',
          domaine:s.short,
          titre:'Séance de géographie terminée',
          detail:detailText,
          score:exerciseCards.length,
          total:exerciseCards.length,
          source:'geographie_seance_'+s.id
        };
        var recorded = false;
        try{
          if(typeof window.hibouTrackEvent === 'function'){
            window.hibouTrackEvent(payload);
            recorded = true;
          }else if(typeof window.hibouRecordSuccess === 'function'){
            window.hibouRecordSuccess(s.emoji+' Géographie — '+s.short+' — séance terminée', 'entrainement', payload);
            recorded = true;
          }else if(typeof window.hibouRecordTrainingSuccess === 'function'){
            window.hibouRecordTrainingSuccess('géographie', s.short, exerciseCards.length+' exercices terminés');
            recorded = true;
          }
        }catch(error){
          try{ console.error('Géographie séance '+s.id+' : journal non alimenté', error); }catch(ignore){}
        }

        if(recorded){
          finishButton.dataset.recorded = '1';
          finishButton.disabled = true;
          finishButton.textContent = '✅ Séance enregistrée dans mon parcours';
          var confirmation = document.createElement('div');
          confirmation.className = 'v24-english-feedback ok';
          confirmation.textContent = 'La séance '+s.short+' a été ajoutée à Mon parcours récent.';
          finishBox.appendChild(confirmation);
          try{
            document.dispatchEvent(new CustomEvent('hibou:student-event', {detail:payload}));
            window.dispatchEvent(new CustomEvent('hibou:student-event', {detail:payload}));
          }catch(ignore){}
        }else{
          alert('Le journal élève n’est pas encore disponible. Recharge la page puis recommence.');
        }
      }, true);
    }
  }

  /* Séance 1 – exercice 2 : les PHOTOS sont les options cliquables, pas des décorations. */
  function renderGeoPhotoMatch(card){
    var photos = [
      {kind:'ville',file:'images/geographie-seance1-ville.jpg',alt:'Rue et bâtiments en ville'},
      {kind:'foret',file:'https://commons.wikimedia.org/wiki/Special:FilePath/For%C3%AAt%20Vosgienne.jpg?width=720',alt:'Véritable forêt de feuillus'},
      {kind:'route',file:'images/geographie-seance1-route.jpg',alt:'Route avec autobus et passage piéton'},
      {kind:'eau',file:'https://www.randonneespourpetitsetgrands.com/images/lac-de-la-cregut9.JPG',alt:'Lac entouré de forêts'}
    ];
    /* Réponses mélangées : aucune photo face à la bonne réponse sur sa ligne. */
    var answers=[
      {kind:'eau',text:'Une rivière ou un lac'},
      {kind:'ville',text:'Une ville'},
      {kind:'route',text:'Une route'},
      {kind:'foret',text:'Une forêt'}
    ];
    var box=document.createElement('div'); box.className='geo-photo-match';
    var left=document.createElement('div'); left.className='geo-photo-match-photos';
    var right=document.createElement('div'); right.className='geo-photo-match-answers';
    var selected=null, matched=0, leftButtons=[];
    photos.forEach(function(p){
      var b=document.createElement('button');b.type='button';b.className='geo-photo-choice';
      var image=document.createElement('img');image.src=p.file;image.alt=p.alt;image.loading='eager';
      var label=document.createElement('span');label.textContent='Choisis cette photo';
      b.appendChild(image);b.appendChild(label);
      b.addEventListener('click',function(e){e.preventDefault();if(b.disabled)return;
        leftButtons.forEach(function(x){x.classList.remove('selected');});
        b.classList.add('selected');selected=p.kind;
      });
      left.appendChild(b);leftButtons.push(b);
    });
    answers.forEach(function(answer){
      var b=document.createElement('button');b.type='button';b.className='geo-photo-answer';b.textContent=answer.text;
      b.addEventListener('click',function(e){e.preventDefault();if(b.disabled)return;
        if(!selected){renderEnglishFeedback(card,false,'Clique d’abord sur une photographie.');return;}
        if(selected!==answer.kind){renderEnglishFeedback(card,false,'Ce n’est pas la bonne association. Essaie encore.');return;}
        var selectedButton=leftButtons[photos.findIndex(function(p){return p.kind===selected;})];
        selectedButton.classList.remove('selected'); selectedButton.classList.add('done');selectedButton.disabled=true;
        b.classList.add('done');b.disabled=true;selected=null;matched++;
        if(matched===4){renderEnglishFeedback(card,true,'Bravo ! Les 4 associations sont correctes.');}
        else {feedback.textContent='Bonne association ! '+matched+' / 4';}
      });
      right.appendChild(b);
    });
    box.appendChild(left);box.appendChild(right);card.appendChild(box);
    var feedback=document.createElement('div');feedback.className='geo-photo-progress';feedback.textContent='0 / 4 associations réussies';card.appendChild(feedback);
    var observer=new MutationObserver(function(){feedback.textContent=matched+' / 4 associations réussies';});
    observer.observe(box,{attributes:true,subtree:true,attributeFilter:['class']});
    /* Ne pas valider avant la quatrième bonne réponse. */
  }

  function renderGeoFree(card, exo){
    var ta = document.createElement('textarea');
    ta.className = 'v24-english-write';
    ta.placeholder = exo.hint || '';
    var check = document.createElement('button');
    check.type = 'button';
    check.className = 'v24-english-check';
    check.textContent = 'J’ai fini';
    check.addEventListener('click', function(ev){
      ev.preventDefault();
      var ok = ta.value.trim().length >= 3;
      renderEnglishFeedback(card, ok, ok ? 'Phrase validée.' : 'Écris d’abord une petite phrase.');
    }, true);
    card.appendChild(ta);
    card.appendChild(check);
    renderEnglishFeedback(card, true, '');
  }


    return {renderGeoHome:renderGeoHome,renderGeoSession:renderGeoSession,renderGeoFree:renderGeoFree};
  };
})();
