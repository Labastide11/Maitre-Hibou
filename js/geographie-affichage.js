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
      var geoCardPhotos = {1:'s1-rose-des-vents.jpg',2:'s2-france.jpg',3:'s3-population.jpg',4:'s4-paysages.jpg',5:'s5-ville-campagne.jpg',6:'s6-acteurs-ville.jpg'};
      var geoPhotoName = geoCardPhotos[s.id];
      b.innerHTML = '<img class="geo-session-card-photo" loading="lazy" decoding="async" src="images/geographie-seances/'+geoPhotoName+'" alt="Visuel de '+esc(s.short)+'">'
        + '<div class="geo-session-card-text"><strong>'+esc(s.emoji+' '+s.short)+'</strong><span>'+esc(s.title)+'</span><small>'+esc(s.objective)+'</small></div>';
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
      card.className = 'v24-english-exo' + (s.id === 1 ? ' geo-s1-activity' : '');
      card.innerHTML = '<h3>'+esc(exo.title)+'</h3><p>'+esc(exo.instr)+'</p>';
      if(s.id === 1){ renderGeoS1(card, idx); wrap.appendChild(card); return; }
      if(idx === 0 && s.map) card.insertAdjacentHTML('beforeend','<div class="v24-geo-map-card">'+s.map+'</div>');
      if(exo.type === 'assessment') renderHistoryAssessment(card, exo);
      if(exo.type === 'choice') renderScienceChoice(card, exo);
      if(exo.type === 'match') renderScienceMatch(card, exo);
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
          return s.id === 1 ? card.dataset.geoDone === '1' : (feedback && String(feedback.textContent || '').trim().length > 0);
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

  /* Séance 1 : activités entièrement interactives, images JPG locales. */
  function renderGeoS1(card, idx){
    var base='images/geographie/';
    function el(tag,cls,html,parent){var x=document.createElement(tag);if(cls)x.className=cls;if(html!==undefined)x.innerHTML=html;(parent||card).appendChild(x);return x;}
    function feedback(ok,msg,finished){
      var x=card.querySelector('.v24-english-feedback');
      if(!x)x=el('div','v24-english-feedback','');
      x.className='v24-english-feedback '+(ok?'ok':'bad'); x.textContent=msg;
      if(finished){card.dataset.geoDone='1';card.classList.add('geo-s1-success');}
    }
    function button(label,parent,callback){var b=el('button','geo-s1-btn','',parent);b.type='button';b.textContent=label;b.addEventListener('click',callback);return b;}
    function picture(file,alt,parent){var im=el('img','geo-s1-img',undefined,parent);im.src=base+file;im.alt=alt;im.loading='eager';return im;}
    if(idx===0){
      var panel=el('div','geo-s1-compass','');
      picture('s1-rose.jpg','Rose des vents sans les noms des directions',panel);
      var positions=el('div','geo-s1-directions','',panel), labels=['Nord','Sud','Est','Ouest'];
      var places=['haut','bas','droite','gauche'];
      var used={};
      var controls={};
      places.forEach(function(pos,i){var b=button('? '+pos,positions,function(){
        var chooser=card.querySelector('.geo-s1-picker');chooser.hidden=false;
        chooser.querySelectorAll('button').forEach(function(x){x.disabled=!!used[x.textContent] && controls[pos]!==x.textContent;});
        chooser.dataset.position=pos;
      });controls[pos]=null;b.dataset.place=pos;});
      var picker=el('div','geo-s1-picker','',card);picker.hidden=true;
      labels.forEach(function(label){button(label,picker,function(){var pos=picker.dataset.position;controls[pos]=label;picker.hidden=true;
        positions.querySelector('[data-place="'+pos+'"]').textContent=label+' ('+pos+')';
        if(places.every(function(p){return !!controls[p];}))verify.disabled=false;
      });});
      var verify=button('Vérifier mes quatre directions',card,function(){
        var correct={haut:'Nord',bas:'Sud',droite:'Est',gauche:'Ouest'};
        if(places.every(function(p){return controls[p]===correct[p];})){feedback(true,'Bravo ! Tu sais placer les quatre points cardinaux.',true);verify.disabled=true;}
        else feedback(false,'Regarde la rose des vents : le nord est en haut, puis retrouve les autres directions. Corrige tes réponses.',false);
      });verify.disabled=true;
    }else if(idx===1){
      picture('s1-plan.jpg','Plan avec une école au sud-ouest, un parc au sud-est, un lac au nord-est et une maison au nord-ouest');
      el('div','geo-s1-question','Qu’y a-t-il à l’est de l’école ?');
      var answers=el('div','geo-s1-answers','');['Le lac','Une maison','Le parc'].forEach(function(t){button(t,answers,function(){
        if(t==='Le parc'){feedback(true,'Oui ! Le parc est à droite de l’école, donc à l’est.',true);answers.querySelectorAll('button').forEach(function(x){x.disabled=true;});}
        else feedback(false,'Observe ce qui se trouve juste à droite de l’école. Essaie encore.',false);
      });});
    }else if(idx===2){
      // Une véritable carte sans noms : chaque chiffre renvoie à un symbole de la légende.
      el('div','geo-s1-legend-heading','Observe la carte : les numéros 1 à 4 indiquent quatre lieux.');
      picture('s1-legende.jpg','Carte illustrée : forêt repère 1, lac repère 2, village repère 3, route repère 4. Les repères sont à identifier.',card);
      el('div','geo-s1-legend-heading','Complète la légende : sélectionne un symbole puis ce qu’il représente.');
      var row=el('div','geo-s1-match',''), chosen=null,done={};
      var left=el('div','geo-s1-match-col','',row),right=el('div','geo-s1-match-col','',row);
      var entries=[['1','🌳','Forêt'],['2','💧','Lac'],['3','🏘️','Village'],['4','🛣️','Route']];
      entries.forEach(function(e){var b=button(e[0]+'  '+e[1],left,function(){if(done[e[2]])return;left.querySelectorAll('button').forEach(function(x){x.classList.remove('geo-selected');});b.classList.add('geo-selected');chosen={key:e[2],button:b};});b.setAttribute('aria-label','Repère '+e[0]+' : sélectionner ce symbole');});
      // Les réponses sont volontairement mélangées : jamais alignées avec la bonne réponse.
      ['Route','Village','Forêt','Lac'].forEach(function(key){var b=button(key,right,function(){
        if(!chosen){feedback(false,'Choisis d’abord un repère dans la colonne de gauche.',false);return;}
        if(chosen.key!==key){feedback(false,'Observe le dessin du repère sur la carte, puis essaie encore.',false);return;}
        done[key]=true;b.disabled=true;chosen.button.disabled=true;chosen.button.classList.remove('geo-selected');chosen.button.classList.add('geo-matched');chosen=null;
        var n=Object.keys(done).length;
        if(n===4)feedback(true,'Bravo ! Tu as complété la légende de la carte.',true);
        else feedback(true,'Bonne association ! '+n+' sur 4. Continue.',false);
      });});
    }else if(idx===3){
      var imageBox=el('div','geo-s1-map-targets','');picture('s1-plan.jpg','Plan du quartier : école, parc, lac et maison',imageBox);
      // Positions en pourcentage sur le JPG recadré, dont les quartiers sont clairement séparés.
      [['Maison',22,24],['Lac',73,25],['École',22,64],['Parc',75,66]].forEach(function(t){
        var b=button('',imageBox,function(){if(t[0]==='Parc'){feedback(true,'Oui ! Le parc est à l’est de l’école et au sud du lac.',true);imageBox.querySelectorAll('button').forEach(function(x){x.disabled=true;});}
        else feedback(false,'Ce n’est pas le parc. Cherche en bas à droite du plan.',false);
        });b.className='geo-s1-hotspot';b.style.left=t[1]+'%';b.style.top=t[2]+'%';b.setAttribute('aria-label','Choisir : '+t[0]);b.title=t[0];
      });
      el('div','geo-s1-question','Clique sur le lieu situé à l’est de l’école et au sud du lac.');
    }else if(idx===4){
      var challenge=el('div','geo-s1-map-targets geo-s1-challenge','');picture('s1-defi.jpg','Carte du village : école à gauche, parc au centre, lac en bas à droite, forêt en haut à droite',challenge);
      [['École',28,28],['Parc',54,28],['Forêt',88,19],['Bibliothèque',13,57],['Lac',80,74]].forEach(function(t){
        var b=button('',challenge,function(){if(t[0]==='Parc'){feedback(true,'Mission réussie ! Le parc se trouve à l’est de l’école et au nord du lac.',true);challenge.querySelectorAll('button').forEach(function(x){x.disabled=true;});}
        else feedback(false,'Ce n’est pas le bon lieu. Regarde à droite de l’école, puis au-dessus du lac.',false);
        });b.className='geo-s1-hotspot';b.style.left=t[1]+'%';b.style.top=t[2]+'%';b.title=t[0];b.setAttribute('aria-label','Choisir : '+t[0]);
      });
      el('div','geo-s1-question','Trouve le lieu secret : il est à l’est de l’école et au nord du lac. Clique dessus !');
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
