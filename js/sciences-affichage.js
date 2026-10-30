window.MHCreateScienceEngine = function(deps){
"use strict";
var esc=deps.esc, renderEnglishFeedback=deps.renderEnglishFeedback, saveBilanResult=deps.saveBilanResult;
var SCIENCE_SESSIONS=window.MHScienceSessions;
  function renderScienceHome(grid){
    grid.className = 'v24-english-shell';
    grid.innerHTML = '<div class="v24-english-intro"><div class="v24-english-panel"><h3>Sciences CE2</h3><p>Choisis une séance. Observe, classe, relie et vérifie tes réponses.</p></div><div class="v24-english-panel"><h3>Objectif</h3><p>Comprendre le vivant, la matière, l’eau, les déchets et les objets électriques.</p></div></div><div class="v24-english-sessions" id="v24ScienceSessions"></div>';
    var wrap = grid.querySelector('#v24ScienceSessions');
    SCIENCE_SESSIONS.forEach(function(s){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'v24-english-session-card mh-science-illustrated-card';
      var thumb = document.createElement('img');
      thumb.className = 'mh-science-session-image';
      thumb.src = 'images/sciences-seance-'+s.id+'.jpg';
      thumb.alt = s.short+' — '+s.objective;
      thumb.loading = 'lazy';
      thumb.decoding = 'async';
      thumb.addEventListener('error', function(){
        thumb.hidden = true;
        var fallback = b.querySelector('.mh-science-fallback');
        if(fallback) fallback.hidden = false;
      });
      b.appendChild(thumb);
      var fallback = document.createElement('span');
      fallback.className = 'mh-science-fallback';
      fallback.hidden = true;
      fallback.textContent = s.emoji+' '+s.short+' — '+s.title+' — '+s.objective;
      b.appendChild(fallback);
      b.setAttribute('aria-label', s.short+' : '+s.objective);
      b.addEventListener('click', function(ev){ev.preventDefault();ev.stopPropagation();renderScienceSession(grid, s.id);}, true);
      wrap.appendChild(b);
    });
  }

  /* Indices CE2 : un par exercice, sans divulguer la réponse. */
  var SCIENCE_PEDAGOGICAL_HINTS = {1: ["Demande-toi si chaque élément naît, grandit et a besoin de se nourrir. Bouger ne suffit pas.", "Observe la différence entre grandir parce qu'on est vivant et changer de taille sous l'effet de quelque chose.", "Pense aux besoins et aux étapes de la vie d'un être vivant.", "Compare le jeune arbre et le grand arbre. Qu'est-ce qui a changé avec le temps ?", "Un objet peut se déplacer sans être vivant. Cherche plutôt ce qui grandit et se nourrit."], 2: ["Pars de ce qu'on plante dans la terre, puis observe les changements jusqu'à l'apparition de nouvelles graines.", "Observe ce qui se trouve sous la terre, ce qui porte les feuilles et ce qui peut devenir un fruit.", "Imagine une plante privée d'eau, de lumière ou d'air. De quoi a-t-elle besoin pour grandir ?", "Observe le stade actuel de la plante : quel changement pourrait venir ensuite ?", "Appuie-toi sur les photos du cycle de vie et sur les besoins d'une plante."], 3: ["Observe les changements de l'animal depuis l'œuf jusqu'à l'âge adulte.", "Réfléchis à la façon dont chaque animal donne naissance à ses petits, sans te fier à sa taille.", "Compare les jeunes animaux et les adultes. Cherche ce qui change en grandissant.", "Commence par le tout début de la vie du papillon, puis repère les transformations.", "Utilise les indices du cycle de vie : naissance, croissance et transformation."], 4: ["Regarde la matière de chaque objet et cherche le bac adapté. Pense aussi aux consignes de tri locales.", "Imagine le chemin suivi par ce déchet après son utilisation.", "Observe ce que font les abeilles quand elles passent d'une fleur à une autre.", "Demande-toi quelle action protège les plantes, les animaux et leur milieu.", "Cherche les conséquences de chaque geste sur les êtres vivants."], 5: ["Observe chaque image : l'eau garde-t-elle une forme, coule-t-elle, ou est-elle invisible sous forme de gaz ?", "Compare l'image avant et après. Cherche ce qui a changé dans l'état de l'eau.", "Repère le rôle du Soleil, des nuages et de la pluie avant de remettre les images en ordre.", "Observe une surface froide et l'air qui l'entoure. D'où l'eau pourrait-elle venir ?", "Pense aux changements d'état et au trajet de l'eau dans la nature."], 6: ["Regarde le rôle de chaque élément : fournir l'énergie, relier les éléments, éclairer ou ouvrir le circuit.", "Suis le trajet possible du courant : peut-il faire une boucle complète ?", "Pour chaque situation, imagine le trajet du courant et cherche si le circuit reste fermé.", "Observe les fils et les contacts. Le courant peut-il passer partout ?", "Cherche si tous les éléments nécessaires sont reliés dans une boucle continue."]};

  function renderScienceSession(grid, id){
    var s = SCIENCE_SESSIONS.filter(function(x){return x.id === id;})[0] || SCIENCE_SESSIONS[0];
    grid.className = 'v24-english-shell';
    grid.innerHTML = '<div class="v24-english-toolbar"><button type="button" class="v24-english-back" id="v24ScienceBack">← Séances</button><div><div class="v24-english-objective">'+esc(s.emoji+' '+s.title+' — '+s.objective)+'</div><div class="v24-english-criteria">'+s.criteria.map(function(c){return '<span>✓ '+esc(c)+'</span>';}).join('')+'</div></div></div><div class="v24-english-exercises" id="v24ScienceExercises"></div>';
    grid.querySelector('#v24ScienceBack').addEventListener('click', function(ev){ev.preventDefault();ev.stopPropagation();renderScienceHome(grid);}, true);
    var wrap = grid.querySelector('#v24ScienceExercises');
    s.exos.forEach(function(exo, exoIndex){
      var card = document.createElement('section');
      card.className = 'v24-english-exo';
      if(s.id === 4 && exo.photos && exo.photos.length === 1){
        card.classList.add('mh-science-s4-wide-photo');
      }
      card.innerHTML = '<h3>'+esc(exo.title)+'</h3><p>'+esc(exo.instr)+'</p>';
      /* Aide systématique, avant tout choix et pour tous les types d'exercice. */
      var directHelp = (SCIENCE_PEDAGOGICAL_HINTS[s.id] || [])[exoIndex];
      renderScienceHelp(card, [{icon:'🦉',text:directHelp || 'Relis la consigne, observe les documents et compare les indices.'}]);
      if(exo.type === 'choice') renderScienceChoice(card, exo);
      if(exo.type === 'match') renderScienceMatch(card, exo);
      if(exo.type === 'order') renderScienceOrder(card, exo);
      if(exo.type === 'sort') renderScienceSort(card, exo);
      if(exo.type === 'checklist') renderScienceChecklist(card, exo);
      if(exo.type === 'circuitPredictions') renderScienceCircuitPredictions(card, exo);
      if(exo.type === 'scienceAssessment') renderScienceAssessmentV25740(card, exo);
      wrap.appendChild(card);
    });

    /* V25.7.57 — Sciences : même logique validée pour les séances 1 à 6. */
    if(s.id >= 1 && s.id <= 6){
      var exerciseCount = s.exos.length;
      var finishBox = document.createElement('section');
      finishBox.className = 'v24-english-exo v25742-science-finish';
      finishBox.innerHTML = '<h3>'+esc(s.emoji+' Fin de la séance')+'</h3><p>Réalise les '+exerciseCount+' exercices avant d’enregistrer cette séance dans ton parcours.</p>';

      var finishButton = document.createElement('button');
      finishButton.type = 'button';
      finishButton.className = 'v24-english-check';
      finishButton.disabled = true;
      finishButton.textContent = 'Termine les '+exerciseCount+' exercices';
      finishBox.appendChild(finishButton);
      wrap.appendChild(finishBox);

      var exerciseCards = Array.prototype.slice.call(wrap.querySelectorAll('.v24-english-exo')).filter(function(card){
        return !card.classList.contains('v25742-science-finish');
      });

      function refreshScienceSessionButton(){
        var finished = exerciseCards.filter(function(card){
          return card.dataset.mhScienceCompleted === '1';
        }).length;
        finishButton.disabled = finished < exerciseCards.length;
        finishButton.textContent = finished < exerciseCards.length
          ? 'Exercices terminés : '+finished+' / '+exerciseCards.length
          : '✅ J’ai terminé la séance';
      }

      exerciseCards.forEach(function(card){
        try{
          new MutationObserver(refreshScienceSessionButton).observe(card, {
            childList:true, subtree:true, characterData:true, attributes:true,
            attributeFilter:['class']
          });
        }catch(error){}
      });
      refreshScienceSessionButton();

      finishButton.addEventListener('click', function(ev){
        ev.preventDefault();
        if(finishButton.disabled || finishButton.dataset.recorded === '1') return;

        var firstTryScore = exerciseCards.filter(function(card){return card.dataset.mhScienceSolved === '1' && card.dataset.mhScienceMistake !== '1';}).length;
        var detailText = s.short+' — '+exerciseCards.length+' exercices terminés · '+firstTryScore+'/'+exerciseCards.length+' réussis sans erreur';
        var payload = {
          type:'entrainement_termine',
          matiere:'Sciences',
          domaine:s.short,
          titre:'Séance de sciences terminée',
          detail:detailText,
          score:firstTryScore,
          total:exerciseCards.length,
          source:'sciences_seance_'+s.id
        };
        /* Le journal exige un prénom actif et renvoie un événement en cas de succès. */
        var recordedEvent = null;
        var studentName = '';
        try {
          if(window.hibouStudentSystem && typeof window.hibouStudentSystem.currentName === 'function'){
            studentName = window.hibouStudentSystem.currentName() || '';
          }
        } catch(ignore) {}
        if(!studentName){
          alert('Choisis ton prénom sur l’accueil de Maître Hibou avant d’enregistrer ta séance. Ton score reste affiché ici.');
          return;
        }
        payload.prenom = studentName;
        try {
          if(typeof window.hibouTrackEvent === 'function'){
            recordedEvent = window.hibouTrackEvent(payload);
          }
        }catch(error){
          try{console.error('Sciences : erreur du journal élève',error);}catch(ignore){}
        }
        var inHistory = false;
        try {
          if(recordedEvent && typeof window.hibouGetEventHistory === 'function'){
            var history = window.hibouGetEventHistory(studentName) || [];
            inHistory = history.some(function(item){
              return item.id_evenement === recordedEvent.id_evenement;
            });
          }
        }catch(error){
          try{console.error('Sciences : contrôle du journal impossible',error);}catch(ignore){}
        }
        if(recordedEvent && inHistory){
          finishButton.dataset.recorded = '1';
          finishButton.disabled = true;
          finishButton.textContent = '✅ Séance enregistrée dans mon parcours';
          var confirmation = document.createElement('div');
          confirmation.className = 'v24-english-feedback ok';
          confirmation.textContent = 'La séance '+s.short+' est bien enregistrée pour '+studentName+' : '+firstTryScore+'/'+exerciseCards.length+'.';
          finishBox.appendChild(confirmation);
        }else{
          alert('La séance n’a pas été confirmée dans Mon parcours récent. Vérifie que ton prénom est bien sélectionné, puis réessaie avec ce bouton.');
        }
      }, true);
    }
  }

  function renderScienceAssessmentV25740(card, exo){
    card.classList.add('v24-history-assessment-card');
    var selected = {};
    var skills = exo.skills || [];
    var questions = exo.questions || [];
    var questionEls = [];

    var skillBox = document.createElement('div');
    skillBox.className = 'v24-history-skills';
    skills.forEach(function(skill){
      var item = document.createElement('div');
      item.className = 'v24-history-skill';
      item.innerHTML = esc(skill.icon || '🧪')+' '+esc(skill.title || '')+'<small>'+esc(skill.desc || '')+'</small>';
      skillBox.appendChild(item);
    });
    card.appendChild(skillBox);

    var list = document.createElement('div');
    list.className = 'v24-history-assessment-list';
    skills.forEach(function(skill, skillIndex){
      var group = document.createElement('section');
      group.className = 'v24-history-skill-group';
      group.innerHTML = '<h4>'+(skillIndex+1)+'. '+esc(skill.icon || '🧪')+' '+esc(skill.title || '')+'<small>'+esc(skill.desc || '')+'</small></h4>';
      questions.forEach(function(question, questionIndex){
        if(question.skill !== skill.id) return;
        var box = document.createElement('div');
        box.className = 'v24-history-question';
        box.innerHTML = '<b>Question '+(questionIndex+1)+'</b><p>'+esc(question.q)+'</p>';
        var options = document.createElement('div');
        options.className = 'v24-history-options';
        (question.options || []).forEach(function(option, optionIndex){
          var button = document.createElement('button');
          button.type = 'button';
          button.className = 'v24-history-option';
          button.textContent = option;
          button.addEventListener('click', function(ev){
            ev.preventDefault();
            selected[questionIndex] = optionIndex;
            Array.prototype.forEach.call(options.children, function(b){ b.classList.remove('selected'); });
            button.classList.add('selected');
          }, true);
          options.appendChild(button);
        });
        box.appendChild(options);
        questionEls[questionIndex] = box;
        group.appendChild(box);
      });
      list.appendChild(group);
    });
    card.appendChild(list);

    var resultButton = document.createElement('button');
    resultButton.type = 'button';
    resultButton.className = 'v24-history-result-btn';
    resultButton.textContent = 'Voir mon bilan';
    var result = document.createElement('div');
    result.className = 'v24-history-final-message';
    result.style.display = 'none';

    resultButton.addEventListener('click', function(ev){
      ev.preventDefault();
      if(Object.keys(selected).length < questions.length){
        result.style.display = 'block';
        result.innerHTML = 'Il reste '+(questions.length-Object.keys(selected).length)+' réponse(s) à choisir avant le bilan.';
        return;
      }

      var scores = {};
      skills.forEach(function(skill){ scores[skill.id] = {ok:0,total:0,skill:skill}; });
      questions.forEach(function(question, questionIndex){
        if(!scores[question.skill]) scores[question.skill] = {ok:0,total:0,skill:{id:question.skill,title:question.skill,icon:'🧪'}};
        scores[question.skill].total++;
        if(selected[questionIndex] === question.correct) scores[question.skill].ok++;
        var questionBox = questionEls[questionIndex];
        Array.prototype.forEach.call(questionBox.querySelectorAll('.v24-history-option'), function(button, optionIndex){
          button.disabled = true;
          button.classList.toggle('correct', optionIndex === question.correct);
          button.classList.toggle('wrong', optionIndex === selected[questionIndex] && optionIndex !== question.correct);
        });
      });

      var totalOk = questions.reduce(function(sum, question, questionIndex){
        return sum + (selected[questionIndex] === question.correct ? 1 : 0);
      }, 0);
      var redCount = 0;
      var html = '<div class="v24-history-results">';
      Object.keys(scores).forEach(function(id){
        var score = scores[id];
        var ratio = score.total ? score.ok / score.total : 0;
        var color = ratio === 1 ? 'green' : (ratio >= 2/3 ? 'orange' : 'red');
        if(color === 'red') redCount++;
        var label = color === 'green' ? 'Acquis' : (color === 'orange' ? 'Presque acquis' : 'À retravailler');
        html += '<div class="v24-history-result '+color+'">'+esc(score.skill.icon || '🧪')+' '+esc(score.skill.title || id)+'<small>'+score.ok+' / '+score.total+' - '+label+'</small></div>';
      });
      html += '</div>';
      var validated = redCount === 0;
      html += '<div class="v24-history-final-message">'+(validated ? 'Bravo, bilan Sciences validé : aucune compétence en rouge.' : 'Bilan terminé : regarde les compétences rouges à retravailler.')+' Score : '+totalOk+' / '+questions.length+'.</div>';
      result.style.display = 'block';
      result.innerHTML = html;
      card.dataset.mhScienceCompleted='1';
      card.dataset.mhScienceSolved = totalOk === questions.length ? '1' : '0';
      resultButton.disabled = true;
      resultButton.textContent = '✅ Bilan enregistré dans mon parcours';

      /* Même porte d’entrée que l’entraînement Maths : appel immédiat au journal élève. */
      var scoreText = 'Score '+totalOk+' / '+questions.length;
      var logged = false;
      try{
        if(typeof window.hibouRecordTrainingSuccessV25221 === 'function'){
          window.hibouRecordTrainingSuccessV25221('sciences', 'Bilan Sciences', scoreText);
          logged = true;
        }else if(typeof window.hibouRecordTrainingSuccess === 'function'){
          window.hibouRecordTrainingSuccess('sciences', 'Bilan Sciences', scoreText);
          logged = true;
        }else if(typeof window.hibouRecordSuccess === 'function'){
          window.hibouRecordSuccess('🧪 Bilan Sciences terminé — '+totalOk+'/'+questions.length, 'entrainement', {
            matiere:'Sciences', domaine:'Bilan', titre:'Bilan Sciences terminé', detail:totalOk+'/'+questions.length,
            score:totalOk, total:questions.length, source:'bilan_sciences', actionReelle:true
          });
          logged = true;
        }
      }catch(error){
        try{ console.error('Journal Sciences V25.7.57', error); }catch(ignore){}
      }

      saveBilanResult('sciences', {
        subject:'Sciences', icon:'🧪', score:totalOk, total:questions.length,
        validated:validated, date:new Date().toISOString(), __hibouJournalLogged:logged,
        skills:Object.keys(scores).map(function(id){
          var score=scores[id], ratio=score.total?score.ok/score.total:0;
          return {id:id,title:score.skill.title,ok:score.ok,total:score.total,color:ratio===1?'green':(ratio>=2/3?'orange':'red')};
        })
      });

      try{
        if(typeof window.hibouRenderRecentEvent === 'function') window.hibouRenderRecentEvent();
      }catch(ignore){}
    }, true);

    card.appendChild(resultButton);
    card.appendChild(result);
  }

  function renderScienceHelp(card, help){
    if(card.querySelector('.v24-science-help-btn')) return;
    if(!help || !help.length) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'v24-science-help-btn';
    btn.textContent = '💡 Aide';
    var panel = document.createElement('div');
    panel.className = 'v24-science-help-panel';
    help.forEach(function(h){var d=document.createElement('div');d.className='v24-science-help-card';d.innerHTML='<strong>'+esc(h.icon)+'</strong> '+esc(h.text);panel.appendChild(d);});
    btn.addEventListener('click', function(ev){ev.preventDefault();panel.classList.toggle('open');btn.textContent = panel.classList.contains('open') ? '💡 Cacher l’aide' : '💡 Aide';}, true);
    card.appendChild(btn);
    card.appendChild(panel);
  }

  function renderSciencePhotos(card, photos){
    if(!photos || !photos.length) return;
    if(!document.getElementById('mh-science-s2-image-styles')){
      var style=document.createElement('style'); style.id='mh-science-s2-image-styles';
      style.textContent='.mh-science-photos{display:flex;flex-wrap:wrap;gap:12px;margin:12px 0}.mh-science-photos figure{flex:1 1 180px;max-width:330px;min-width:0;margin:0;border:2px solid #d3ead7;border-radius:12px;overflow:hidden;background:#fff;text-align:center}.mh-science-photos img{display:block;width:100%;height:155px;object-fit:contain;background:#f6f9f7}.mh-science-photos figcaption{padding:8px;font-weight:850;font-size:14px}.mh-science-photo-step{display:flex!important;flex-direction:column!important;width:160px;min-height:155px;padding:7px!important;gap:5px!important}.mh-science-photo-step img{width:100%;height:100px;object-fit:contain;border-radius:8px;background:#fff}.mh-science-photo-step span{font-size:13px;line-height:1.2}.mh-science-photo-step.selected{outline:3px solid #2da85c}.mh-science-photo-list{display:flex;flex-wrap:wrap;gap:9px;margin:10px 0}.mh-science-photo-sequence{display:flex;flex-wrap:wrap;gap:7px;min-height:46px;margin:8px 0}.mh-science-photo-sequence button{padding:9px;border:2px solid #a9dbc0;border-radius:9px;background:#f1fff6;font-weight:800;cursor:pointer}@media(max-width:650px){.mh-science-photos img{height:120px}.mh-science-photo-step{width:130px;min-height:142px}.mh-science-photo-step img{height:85px}}';
      document.head.appendChild(style);
    }
    if(!document.getElementById('mh-science-s4-wide-photo-style')){
      var wideStyle=document.createElement('style');
      wideStyle.id='mh-science-s4-wide-photo-style';
      wideStyle.textContent =
        '.mh-science-s4-wide-photo .mh-science-photos{display:block;width:100%;margin:12px 0}' +
        '.mh-science-s4-wide-photo .mh-science-photos figure{max-width:none;width:100%;margin:0}' +
        '.mh-science-s4-wide-photo .mh-science-photos img{width:100%;height:clamp(200px,25vw,300px);object-fit:cover;object-position:center}' +
        '.mh-science-s4-wide-photo .mh-science-photos figcaption{font-size:14px;padding:10px}' +
        '@media(max-width:650px){.mh-science-s4-wide-photo .mh-science-photos img{height:220px}}';
      document.head.appendChild(wideStyle);
    }
    var holder=document.createElement('div');holder.className='mh-science-photos';
    photos.forEach(function(photo){
      var fig=document.createElement('figure'), img=document.createElement('img'), label=document.createElement('figcaption');
      img.src=photo.src;img.alt=photo.label;img.loading='lazy';img.onerror=function(){img.hidden=true;fig.setAttribute('data-image-unavailable','true');};
      label.textContent=photo.label;fig.appendChild(img);fig.appendChild(label);holder.appendChild(fig);
    }); card.appendChild(holder);
  }

  function renderScienceCircuitPredictions(card, exo){
    renderSciencePhotos(card, exo.photos);
    var answers = exo.answers || ["Elle s'allume.", "Elle s'éteint."];
    var state = {};
    var list = document.createElement('div');
    list.className = 'mh-science-circuit-predictions';
    (exo.situations || []).forEach(function(item, index){
      var group = document.createElement('div');
      group.className = 'mh-science-circuit-situation';
      var question = document.createElement('p');
      question.textContent = (index + 1) + '. ' + item.question;
      var choices = document.createElement('div');
      choices.className = 'v24-english-options';
      answers.forEach(function(answer, ai){
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'v24-english-option';
        button.textContent = answer;
        button.addEventListener('click', function(ev){
          ev.preventDefault();
          if(card.dataset.mhScienceSolved === '1') return;
          state[index] = ai;
          Array.prototype.forEach.call(choices.children, function(b){b.classList.remove('selected','correct','wrong');});
          button.classList.add('selected');
        });
        choices.appendChild(button);
      });
      group.appendChild(question);
      group.appendChild(choices);
      list.appendChild(group);
    });
    card.appendChild(list);
    var check = document.createElement('button');
    check.type = 'button';
    check.className = 'v24-english-check';
    check.textContent = 'Vérifier mes trois réponses';
    var attempts = 0;
    check.addEventListener('click', function(ev){
      ev.preventDefault();
      if(Object.keys(state).length !== exo.situations.length){
        renderEnglishFeedback(card,false,'Réponds aux trois situations avant de vérifier.');
        return;
      }
      var wrong = exo.situations.map(function(item,i){return state[i] === item.correct ? -1 : i;}).filter(function(i){return i >= 0;});
      if(wrong.length){
        card.dataset.mhScienceMistake='1';
        attempts++;
        renderEnglishFeedback(card,false,'Regarde la situation '+(wrong[0]+1)+'. '+(exo.situations[wrong[0]].hint || 'Réessaie.'));
        return;
      }
      card.dataset.mhScienceSolved = '1';
      card.dataset.mhScienceCompleted = '1';
      Array.prototype.forEach.call(list.querySelectorAll('button'), function(b){b.disabled=true;});
      check.disabled = true;
      renderEnglishFeedback(card,true,exo.explanation || 'Bravo, les trois réponses sont correctes.');
    });
    card.appendChild(check);
    renderEnglishFeedback(card,true,'');
  }

  function renderScienceChoice(card, exo){
    if(exo.image){
      var imgBox = document.createElement('div');
      imgBox.className = 'v24-geo-map-card v24-geo-question-image';
      imgBox.innerHTML = exo.image;
      card.appendChild(imgBox);
    }
    renderSciencePhotos(card, exo.photos);
    renderScienceHelp(card, exo.help || [{icon:'🦉',text:exo.hint || 'Relis la consigne et observe les images avant de choisir.'}]);
    var wrap = document.createElement('div');
    wrap.className = 'v24-english-options';
    var opts = exo.imgOptions || exo.options || [];
    opts.forEach(function(opt, i){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'v24-english-option' + (exo.imgOptions ? ' v24-science-svg-option' : '');
      if(exo.imgOptions) b.innerHTML = opt; else b.textContent = opt;
      b.addEventListener('click', function(ev){
        ev.preventDefault();
        if(card.dataset.mhScienceSolved === '1') return;
        var ok = i === exo.correct;
        var tries = Number(card.dataset.mhScienceTries || 0) + 1;
        card.dataset.mhScienceTries = String(tries);
        Array.prototype.forEach.call(wrap.children,function(x){x.classList.remove('correct','wrong');});
        if(ok){
          b.classList.add('correct');
          card.dataset.mhScienceSolved = '1';
          card.dataset.mhScienceCompleted = '1';
          Array.prototype.forEach.call(wrap.children,function(x){x.disabled=true;});
          renderEnglishFeedback(card,true,tries===1?'Bravo, c’est correct.':'Bravo, tu as trouvé après avoir réfléchi.');
        }else if(tries === 1){
          card.dataset.mhScienceMistake='1';
          b.classList.add('wrong');
          b.disabled=true;
          renderEnglishFeedback(card,false,exo.hint || 'Observe les détails et relis la consigne. Essaie encore.');
        }else{
          card.dataset.mhScienceMistake='1';
          card.dataset.mhScienceCompleted='1';
          b.classList.add('wrong');
          Array.prototype.forEach.call(wrap.children,function(x){x.disabled=true;});
          if(wrap.children[exo.correct]) wrap.children[exo.correct].classList.add('correct');
          renderEnglishFeedback(card,false,exo.explanation || 'Observe la réponse en vert et relis la leçon.');
        }
      }, true);
      wrap.appendChild(b);
    });
    card.appendChild(wrap);
    renderEnglishFeedback(card, true, '');
  }

  function renderScienceMatch(card, exo){
    renderSciencePhotos(card, exo.photos);
    var wrap = document.createElement('div');
    wrap.className = 'v24-english-match';
    var left = document.createElement('div');
    var right = document.createElement('div');
    left.className = right.className = 'v24-english-match-col';
    var selected = -1;
    var done = 0;
    exo.left.forEach(function(txt, i){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'v24-english-match-item';
      b.textContent = txt;
      b.addEventListener('click', function(ev){ev.preventDefault();if(b.classList.contains('done')) return;Array.prototype.forEach.call(left.children,function(x){x.classList.remove('selected');});b.classList.add('selected');selected=i;}, true);
      left.appendChild(b);
    });
    var order = exo.right.map(function(_, i){return i;}).sort(function(){return Math.random() - 0.5;});
    if(order.length > 1 && order.every(function(v,i){return v === i;})) order.reverse();
    order.forEach(function(origIndex){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'v24-english-match-item';
      b.textContent = exo.right[origIndex];
      b.addEventListener('click', function(ev){
        ev.preventDefault();
        if(selected < 0 || b.classList.contains('done')) return;
        var ok = exo.pairs[selected] === origIndex;
        if(ok){
          left.children[selected].classList.add('done');
          left.children[selected].classList.remove('selected');
          b.classList.add('done');
          selected = -1;
          done++;
          if(done === exo.left.length){card.dataset.mhScienceCompleted='1';card.dataset.mhScienceSolved='1';}
          renderEnglishFeedback(card, true, done === exo.left.length ? 'Toutes les paires sont correctes.' : 'Bonne paire.');
        }else{
          card.dataset.mhScienceMistake='1';
          renderEnglishFeedback(card, false, 'Essaie une autre paire.');
        }
      }, true);
      right.appendChild(b);
    });
    wrap.appendChild(left);
    wrap.appendChild(right);
    card.appendChild(wrap);
    renderEnglishFeedback(card, true, '');
  }

  function renderScienceOrder(card, exo){
    if(exo.photoSteps && exo.photoSteps.length){
      renderSciencePhotos(card, []);
      var photoBank=document.createElement('div'); photoBank.className='mh-science-photo-list';
      var selectedItems=[];var sequence=document.createElement('div'); sequence.className='mh-science-photo-sequence';
      var shuffled=exo.photoSteps.slice().sort(function(){return Math.random()-.5;});
      if(shuffled.every(function(x,i){return x.label===exo.correctOrder[i];})) shuffled.reverse();
      function redrawPhotos(){
        photoBank.innerHTML='';sequence.innerHTML='';
        shuffled.forEach(function(photo){
          if(selectedItems.indexOf(photo)>=0) return;
          var btn=document.createElement('button');btn.type='button';btn.className='v24-english-token mh-science-photo-step';
          var img=document.createElement('img');img.src=photo.src;img.alt=photo.label;img.loading='lazy';
          img.onerror=function(){img.hidden=true;}; var lab=document.createElement('span');lab.textContent=photo.label;
          btn.appendChild(img);btn.appendChild(lab);
          btn.onclick=function(e){e.preventDefault();selectedItems.push(photo);redrawPhotos();};photoBank.appendChild(btn);
        });
        selectedItems.forEach(function(photo,i){var btn=document.createElement('button');btn.type='button';btn.textContent=(i+1)+'. '+photo.label;btn.onclick=function(e){e.preventDefault();selectedItems.splice(i,1);redrawPhotos();};sequence.appendChild(btn);});
      }
      var validate=document.createElement('button');validate.type='button';validate.className='v24-english-check';validate.textContent='Vérifier l’ordre';
      validate.onclick=function(e){e.preventDefault();if(selectedItems.length!==exo.photoSteps.length){renderEnglishFeedback(card,false,'Place toutes les étapes avant de vérifier.');return;}
        var ok=selectedItems.every(function(x,i){return x.label===exo.correctOrder[i];});
        if(!ok) card.dataset.mhScienceMistake='1';
        renderEnglishFeedback(card,ok,ok?(exo.success || 'Bravo, les étapes sont dans le bon ordre.'):(exo.hint||'Observe les étapes et réessaie.'));
        if(ok){card.dataset.mhScienceCompleted='1';card.dataset.mhScienceSolved='1';photoBank.querySelectorAll('button').forEach(function(b){b.disabled=true;});sequence.querySelectorAll('button').forEach(function(b){b.disabled=true;});validate.disabled=true;}
      };
      redrawPhotos();card.appendChild(photoBank);card.appendChild(sequence);card.appendChild(validate);renderEnglishFeedback(card,true,'');return;
    }
    renderScienceHelp(card, exo.help);
    var bank = document.createElement('div');
    var zone = document.createElement('div');
    bank.className = 'v24-english-bank';
    zone.className = 'v24-english-zone';
    var placed = [];
    var words = exo.bank.slice().sort(function(){return Math.random() - 0.5;});
    function redraw(){
      bank.innerHTML = '';
      zone.innerHTML = '';
      words.forEach(function(w, i){
        if(placed.some(function(p){return p.i === i;})) return;
        var t = document.createElement('button');t.type='button';t.className='v24-english-token';t.textContent=w;t.addEventListener('click',function(ev){ev.preventDefault();placed.push({w:w,i:i});redraw();},true);bank.appendChild(t);
      });
      placed.forEach(function(p, pos){
        var t = document.createElement('button');t.type='button';t.className='v24-english-token placed';t.textContent=p.w;t.addEventListener('click',function(ev){ev.preventDefault();placed.splice(pos,1);redraw();},true);zone.appendChild(t);
      });
    }
    redraw();
    var check = document.createElement('button');
    check.type = 'button';
    check.className = 'v24-english-check';
    check.textContent = 'Vérifier';
    check.addEventListener('click', function(ev){ev.preventDefault();var ok=JSON.stringify(placed.map(function(p){return p.w;}))===JSON.stringify(exo.correctOrder);if(ok){card.dataset.mhScienceCompleted='1';card.dataset.mhScienceSolved='1';}else{card.dataset.mhScienceMistake='1';}
      renderEnglishFeedback(card, ok, ok ? 'Parfait, bon ordre.' : 'Pas encore. Clique un mot placé pour le retirer.');}, true);
    card.appendChild(bank);card.appendChild(zone);card.appendChild(check);renderEnglishFeedback(card, true, '');
  }

  function ensureScienceSortPhotoStyles(){
    if(document.getElementById('mh-science-sort-photo-styles')) return;
    var style = document.createElement('style');
    style.id = 'mh-science-sort-photo-styles';
    style.textContent = ''+
      '.v24-science-sort-item.mh-photo-card{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;width:112px;min-height:128px;padding:8px 8px 10px;text-align:center;gap:7px;}' +
      '.v24-science-sort-item.mh-photo-card img{width:92px;height:68px;object-fit:cover;border-radius:10px;border:2px solid #D9EAD9;display:block;background:#fff;}' +
      '.v24-science-sort-item.mh-photo-card .mh-photo-label{display:block;font-size:12px;line-height:1.2;font-weight:1000;color:#1F3B2A;}' +
      '.v24-science-sort-item.mh-photo-card.placed img,.v24-science-sort-item.mh-photo-card.placed .mh-photo-label{opacity:.55;}' +
      '@media (max-width: 900px){.v24-science-sort-item.mh-photo-card{width:104px;min-height:122px;padding:7px 7px 9px}.v24-science-sort-item.mh-photo-card img{width:86px;height:64px}.v24-science-sort-item.mh-photo-card .mh-photo-label{font-size:11px;}}';
    document.head.appendChild(style);
  }

  function getScienceSortItemMeta(item){
    if(item && typeof item === 'object'){
      return {
        label: String(item.label || item.text || item.name || ''),
        image: item.image || item.src || '',
        rawText: String(item.label || item.text || item.name || '')
      };
    }
    return {label: String(item), image: '', rawText: String(item)};
  }

  function renderScienceSort(card, exo){
    renderScienceHelp(card, exo.help);
    ensureScienceSortPhotoStyles();
    var bank = document.createElement('div');
    bank.className = 'v24-science-sort-bank';
    var zones = document.createElement('div');
    zones.className = 'v24-science-sort-zones';
    var selected = null;
    var count = 0;
    var itemEls = [];
    exo.items.forEach(function(item, i){
      var meta = getScienceSortItemMeta(item);
      var b = document.createElement('button');
      b.type='button';
      b.className='v24-science-sort-item';
      if(meta.image){
        b.classList.add('mh-photo-card');
        var img = document.createElement('img');
        img.src = meta.image;
        img.alt = meta.label;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.onerror = function(){img.hidden=true;b.classList.add('mh-photo-unavailable');};
        var label = document.createElement('span');
        label.className = 'mh-photo-label';
        label.textContent = meta.label;
        b.appendChild(img);
        b.appendChild(label);
      }else{
        b.textContent = meta.label;
      }
      b.addEventListener('click',function(ev){ev.preventDefault();if(b.classList.contains('placed')) return;itemEls.forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');selected=i;},true);
      itemEls.push(b);bank.appendChild(b);
    });
    exo.zones.forEach(function(name, zi){
      var z = document.createElement('div');
      z.className='v24-science-sort-zone';
      z.innerHTML='<h4><span class="v24-science-zone-swatch" style="background:'+esc(exo.zoneColors[zi] || '#D9EDD1')+'">'+esc(exo.zoneIcons[zi] || '')+'</span>'+esc(name)+'</h4>';
      z.addEventListener('click',function(ev){
        ev.preventDefault();
        if(selected == null) return;
        var ok = exo.correct[selected] === zi;
        if(!ok){
          card.dataset.mhScienceMistake='1';
          renderEnglishFeedback(card, false, 'Essaie encore : cet élément est-il vivant ?');
          return;
        }
        var chip = document.createElement('span');
        chip.className = 'v24-science-chip';
        chip.textContent = getScienceSortItemMeta(exo.items[selected]).label;
        z.appendChild(chip);
        itemEls[selected].classList.add('placed');
        itemEls[selected].classList.remove('selected');
        selected = null;
        count++;
        renderEnglishFeedback(card, true, 'Bien classé.');
        if(count === exo.items.length){card.dataset.mhScienceCompleted='1';card.dataset.mhScienceSolved='1';renderEnglishFeedback(card, true, 'Tri terminé.');}
      },true);
      zones.appendChild(z);
    });
    card.appendChild(bank);card.appendChild(zones);renderEnglishFeedback(card, true, '');
  }

  function renderScienceChecklist(card, exo){
    exo.items.forEach(function(txt){
      var label = document.createElement('label');
      label.className = 'v24-english-checkrow';
      label.innerHTML = '<input type="checkbox"> <span>'+esc(txt)+'</span>';
      card.appendChild(label);
    });
    var check = document.createElement('button');
    check.type = 'button';
    check.className = 'v24-english-check';
    check.textContent = 'Valider';
    check.addEventListener('click', function(ev){ev.preventDefault();var boxes=Array.prototype.slice.call(card.querySelectorAll('input[type="checkbox"]'));var ok=boxes.length>0&&boxes.every(function(b){return b.checked;});if(ok){card.dataset.mhScienceCompleted='1';card.dataset.mhScienceSolved='1';}else{card.dataset.mhScienceMistake='1';}renderEnglishFeedback(card, ok, ok ? 'Bilan validé.' : 'Coche les bonnes réponses avant de valider.');}, true);
    card.appendChild(check);
    renderEnglishFeedback(card, true, '');
  }


return {renderScienceHome:renderScienceHome,renderScienceSession:renderScienceSession,renderScienceChoice:renderScienceChoice,renderScienceMatch:renderScienceMatch,renderScienceOrder:renderScienceOrder,renderScienceSort:renderScienceSort,renderScienceChecklist:renderScienceChecklist,renderScienceAssessmentV25740:renderScienceAssessmentV25740};
};
