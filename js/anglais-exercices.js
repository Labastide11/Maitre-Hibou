/* Maître Hibou — moteur autonome Anglais extrait du dernier index.html. */
(function(){
'use strict';
var esc=function(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
function saveBilanResult(subject,result){
  var sys=window.MHStandaloneProgress;
  if(sys&&typeof sys.saveBilanResult==='function')return sys.saveBilanResult(subject,result);
  console.warn('Journal de parcours non disponible : bilan non enregistré');return false;
}
  var ENGLISH_SESSIONS = [
    {
      id:1, title:'Séance 1', short:'Saluer', emoji:'👋',
      objective:'Je sais saluer et dire au revoir en anglais.',
      criteria:['Hello / Hi / Goodbye','Je choisis selon la situation','Je m’entraîne à parler'],
      exos:[
        {type:'englishS1',title:'J’écoute et je reconnais',instr:'Écoute, puis choisis le mot entendu.'},
        {type:'englishS1',title:'Bonjour ou au revoir ?',instr:'Observe la photo et lis la légende. Choisis ce que tu peux dire.'},
        {type:'englishS1',title:'J’associe les mots',instr:'Choisis un mot anglais, puis sa traduction.'},
        {type:'englishS1',title:'Je choisis la bonne réponse',instr:'Lis la situation, puis réponds au personnage.'},
        {type:'englishS1',title:'À moi de parler !',instr:'Entraîne-toi à répondre à voix haute.'}
      ]
    },
    {
      id:2, title:'Séance 2', short:'My name is...', emoji:'🪪',
      objective:'Je sais demander et dire mon prénom en anglais.',
      criteria:['Je reconnais la question','Je dis My name is…','Je m’entraîne à parler'],
      exos:[
        {type:'englishS2',title:'J’écoute et je reconnais',instr:'Écoute, puis choisis la phrase entendue.'},
        {type:'englishS2',title:'Qui parle ?',instr:'Écoute le prénom, puis choisis le bon personnage.'},
        {type:'englishS2',title:'Je remets les mots dans l’ordre',instr:'Clique les mots pour construire la phrase.'},
        {type:'englishS2',title:'Je complète le dialogue',instr:'Lis la situation, puis choisis la phrase qui manque.'},
        {type:'englishS2',title:'À moi de parler !',instr:'Entraîne-toi à demander et à dire ton prénom.'}
      ]
    },
    {
      id:3, title:'Séance 3', short:'How are you?', emoji:'🙂',
      objective:'Je sais demander et dire comment je me sens en anglais.',
      criteria:['happy / sad / tired / hungry','Je réponds à How are you?','Je m’entraîne à parler'],
      exos:[
        {type:'englishS3',title:'J’écoute et je reconnais',instr:'Écoute la phrase, puis choisis la situation correspondante.'},
        {type:'englishS3',title:'J’observe les photos',instr:'Observe la photo et lis la légende. Choisis la phrase anglaise.'},
        {type:'englishS3',title:'J’associe les mots',instr:'Choisis une photo, puis le bon mot anglais.'},
        {type:'englishS3',title:'Je complète le dialogue',instr:'Choisis la réponse qui correspond à la situation.'},
        {type:'englishS3',title:'À moi de parler !',instr:'Entraîne-toi à demander et à dire comment tu vas.'}
      ]
    },
    {
      id:4, title:'Séance 4', short:'Numbers 1–10', emoji:'🔢',
      objective:'Je sais reconnaître et dire les nombres de 1 à 10 en anglais.',
      criteria:['Je comprends les nombres à l’oral','Je compte des objets','J’associe chiffres et mots'],
      exos:[
        {type:'englishS4',title:'J’écoute et je reconnais',instr:'Écoute le nombre, puis choisis le bon chiffre.'},
        {type:'englishS4',title:'Je compte les objets',instr:'Compte les objets, puis choisis le nombre anglais.'},
        {type:'englishS4',title:'J’associe les nombres',instr:'Choisis un chiffre, puis le mot anglais correspondant.'},
        {type:'englishS4',title:'Quel nombre manque ?',instr:'Observe le train et retrouve le nombre manquant.'},
        {type:'englishS4',title:'À moi de parler !',instr:'Entraîne-toi à compter et à dire les nombres à voix haute.'}
      ]
    },
    {
      id:5, title:'Séance 5', short:'How old are you?', emoji:'🎂',
      objective:'Je sais demander et dire un âge en anglais.',
      criteria:['Je demande How old are you?','Je réponds I am… years old','Je reconnais seven, eight et nine'],
      exos:[
        {type:'englishS5',title:'J’écoute les âges',instr:'Écoute la phrase, puis choisis la carte d’âge.'},
        {type:'englishS5',title:'Je lis la carte et je compte',instr:'Lis l’âge indiqué ou compte les bougies, puis choisis la phrase anglaise.'},
        {type:'englishS5',title:'Je remets les mots en ordre',instr:'Construis la phrase qui correspond à la carte d’âge.'},
        {type:'englishS5',title:'Je complète le dialogue',instr:'Lis la carte du personnage, puis réponds à How old are you?'},
        {type:'englishS5',title:'À moi de parler !',instr:'Entraîne-toi à demander et à dire un âge à voix haute.'}
      ]
    },
    {
      id:6, title:'Séance 6', short:'Bilan', emoji:'⭐',
      objective:'Je vérifie les compétences essentielles en anglais.',
      criteria:['Je salue et je prends congé','Je me présente','Je comprends des consignes','Je connais les nombres','Je parle de moi'],
      exos:[
        {type:'englishAssessment', title:'Bilan Anglais', instr:'Réponds aux 15 questions, puis affiche ton bilan par compétence.', skills:[
          {id:'saluer', icon:'👋', title:'Saluer', desc:'Bonjour, au revoir, prendre contact'},
          {id:'presenter', icon:'🪪', title:'Se présenter', desc:'Dire et demander le prénom'},
          {id:'classe', icon:'🎧', title:'Consignes simples', desc:'Comprendre les mots de la classe'},
          {id:'nombres', icon:'🔢', title:'Nombres', desc:'Reconnaître les nombres de 1 à 10'},
          {id:'soi', icon:'🙂', title:'Parler de soi', desc:'Âge, état, phrase simple'}
        ], questions:[
          {skill:'saluer', q:'Tu arrives le matin. Que peux-tu dire ?', options:['Hello!','Goodbye!','Seven!'], correct:0},
          {skill:'saluer', q:'Écoute. Quel mot entends-tu ?', audio:'Good bye.', options:['Hello','Goodbye','Thank you'], correct:1},
          {skill:'saluer', q:'Que veut dire “Thank you” ?', options:['Merci','Bonjour','J’ai 8 ans'], correct:0},
          {skill:'presenter', q:'Quelle phrase veut dire “Je m’appelle Lina” ?', options:['My name is Lina.','How are you?','I am eight.'], correct:0},
          {skill:'presenter', q:'Quelle question demande le prénom ?', options:['What is your name?','How old are you?','What colour is it?'], correct:0},
          {skill:'presenter', q:'Écoute. Quelle phrase entends-tu ?', audio:'My name is Adam.', options:['My name is Adam','Goodbye Adam','I am Adam years old'], correct:0},
          {skill:'classe', q:'Que veut dire “Listen” ?', options:['Écoute','Dessine','Ferme'], correct:0},
          {skill:'classe', q:'Que veut dire “Repeat” ?', options:['Répète','Saute','Compte'], correct:0},
          {skill:'classe', q:'Écoute. Quelle consigne entends-tu ?', audio:'Open your book.', options:['Open your book','Close your book','Take a pen'], correct:0},
          {skill:'nombres', q:'Quel nombre correspond à “one” ?', options:['1','2','10'], correct:0},
          {skill:'nombres', q:'Écoute. Quel nombre entends-tu ?', audio:'Seven', options:['5','7','9'], correct:1},
          {skill:'nombres', q:'Quel mot correspond au nombre 10 ?', options:['ten','two','three'], correct:0},
          {skill:'soi', q:'Quelle question demande l’âge ?', options:['How old are you?','What is your name?','Good morning!'], correct:0},
          {skill:'soi', q:'Que veut dire “I am eight years old” ?', options:['J’ai 8 ans','Je suis triste','Je m’appelle Eight'], correct:0},
          {skill:'soi', q:'Écoute. Comment va la personne ?', audio:"I'm fine, thank you.", options:['Elle va bien','Elle a faim','Elle part'], correct:0}
        ]}
      ]
    }
  ];

  function speakEnglish(text){
    try{
      if(!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      var spokenText = String(text || '').replace(/\bGoodbye\b/g, 'Good bye');
      var u = new SpeechSynthesisUtterance(spokenText);
      u.lang = 'en-GB';
      u.rate = 0.78;
      u.pitch = 1;
      var voices = [];
      try{ voices = window.speechSynthesis.getVoices() || []; }catch(e){}
      var voice = voices.filter(function(v){return /^en-GB/i.test(v.lang || '');})[0]
        || voices.filter(function(v){return /^en-US/i.test(v.lang || '');})[0]
        || voices.filter(function(v){return /^en/i.test(v.lang || '');})[0];
      if(voice) u.voice = voice;
      window.speechSynthesis.speak(u);
    }catch(e){}
  }

  function renderEnglishHome(grid){
    grid.className = 'v24-english-shell';
    grid.innerHTML =
      '<div class="v24-english-intro">'
      + '<div class="v24-english-panel"><h3>English Time CE2</h3><p>Choisis une séance. Tout reste dans cette popup : écouter, répondre, vérifier, puis revenir aux séances.</p></div>'
      + '<div class="v24-english-panel"><h3>Objectif</h3><p>Des activités courtes pour saluer, se présenter, compter et construire une petite conversation.</p></div>'
      + '</div>'
      + '<div class="v24-english-sessions" id="v24EnglishSessions"></div>';
    var wrap = grid.querySelector('#v24EnglishSessions');
    ENGLISH_SESSIONS.forEach(function(s){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'v24-english-session-card';
      b.innerHTML = '<img class="v24-subject-thumb" src="images/anglais-seance-'+s.id+'.jpg" alt="Illustration de la séance '+s.id+'" loading="lazy"><span class="v24-subject-card-body"><strong>'+s.emoji+' '+esc(s.short)+'</strong><span>'+esc(s.title)+'</span><small>'+esc(s.objective)+'</small></span>';
      b.addEventListener('click', function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        renderEnglishSession(grid, s.id);
      }, true);
      wrap.appendChild(b);
    });
  }

  function renderEnglishSession(grid, id){
    var s = ENGLISH_SESSIONS.filter(function(x){return x.id === id;})[0] || ENGLISH_SESSIONS[0];
    grid.className = 'v24-english-shell';
    grid.innerHTML =
      '<div class="v24-english-toolbar">'
      + '<button type="button" class="v24-english-back" id="v24EnglishBack">← Séances</button>'
      + '<div><div class="v24-english-objective">'+esc(s.emoji+' '+s.title+' — '+s.objective)+'</div>'
      + '<div class="v24-english-criteria">'+s.criteria.map(function(c){return '<span>✓ '+esc(c)+'</span>';}).join('')+'</div></div>'
      + '</div>'
      + '<div class="v24-english-exercises" id="v24EnglishExercises"></div>';
    grid.querySelector('#v24EnglishBack').addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      renderEnglishHome(grid);
    }, true);
    var wrap = grid.querySelector('#v24EnglishExercises');
    wrap.dataset.englishSession = String(s.id);
    if(s.id === 1) renderEnglishS1Intro(wrap);
    if(s.id === 2) renderEnglishS2Intro(wrap);
    if(s.id === 3) renderEnglishS3Intro(wrap);
    if(s.id === 4) renderEnglishS4Intro(wrap);
    if(s.id === 5) renderEnglishS5Intro(wrap);
    s.exos.forEach(function(exo, idx){
      var card = document.createElement('section');
      card.className = 'v24-english-exo';
      card.setAttribute('data-english-exercise-type', exo.type || '');
      card.innerHTML = '<h3>'+esc(exo.title)+'</h3><p>'+esc(exo.instr)+'</p>';
      if(s.id === 1){renderEnglishS1(card,idx);wrap.appendChild(card);return;}
      if(s.id === 2){renderEnglishS2(card,idx);wrap.appendChild(card);return;}
      if(s.id === 3){renderEnglishS3(card,idx);wrap.appendChild(card);return;}
      if(s.id === 4){renderEnglishS4(card,idx);wrap.appendChild(card);return;}
      if(s.id === 5){renderEnglishS5(card,idx);wrap.appendChild(card);return;}
      if(exo.type === 'listenSeries'){
        card.classList.add('v24-english-listen-card');
        renderEnglishListenSeries(card, exo);
      }
      if(exo.type === 'choice') renderEnglishChoice(card, exo);
      if(exo.type === 'match') renderEnglishMatch(card, exo);
      if(exo.type === 'order') renderEnglishOrder(card, exo);
      if(exo.type === 'free') renderEnglishFree(card, exo);
      if(exo.type === 'checklist') renderEnglishChecklist(card, exo);
      if(exo.type === 'englishAssessment') renderEnglishAssessment(card, exo);
      wrap.appendChild(card);
    });

    /* Séances photo : deux colonnes de cartes indépendantes, sans trous de grille.
       Les mêmes nœuds et leurs événements sont déplacés ; aucune réponse n'est recréée. */
    if(s.id === 1 || s.id === 3){
      var photoCards = Array.prototype.slice.call(wrap.querySelectorAll(':scope > .v24-english-exo'));
      var columnLeft = document.createElement('div');
      var columnRight = document.createElement('div');
      columnLeft.className = 'mh-english-activity-column';
      columnRight.className = 'mh-english-activity-column';
      if(s.id === 3){
        // L'association de quatre photos a besoin de la largeur entière de la page.
        // Placement en deux rangées d'exercices courts autour de la carte panoramique.
        columnLeft.appendChild(photoCards[0]);
        columnRight.appendChild(photoCards[1]);
        wrap.appendChild(columnLeft);
        wrap.appendChild(columnRight);
        photoCards[2].classList.add('en3-full-width-match');
        wrap.appendChild(photoCards[2]);
        var lowerLeft=document.createElement('div');
        var lowerRight=document.createElement('div');
        lowerLeft.className='mh-english-activity-column';
        lowerRight.className='mh-english-activity-column';
        lowerLeft.appendChild(photoCards[3]);
        lowerRight.appendChild(photoCards[4]);
        wrap.appendChild(lowerLeft);
        wrap.appendChild(lowerRight);
      }else{
        var positions=[0,1,0,1,0];
        photoCards.forEach(function(card,i){
          (positions[i] ? columnRight : columnLeft).appendChild(card);
        });
        wrap.appendChild(columnLeft);
        wrap.appendChild(columnRight);
      }
      wrap.classList.add('mh-english-two-columns');
    }

    /* V25.7.57 — Anglais : logique validée des Sciences pour les séances 1 à 5. */
    if(s.id >= 1 && s.id <= 5){
      var exerciseCards = Array.prototype.slice.call(wrap.querySelectorAll('.v24-english-exo'));
      var finishBox = document.createElement('section');
      finishBox.className = 'v24-english-exo v25743-english-finish';
      finishBox.innerHTML = '<h3>'+esc(s.emoji+' Fin de la séance')+'</h3><p>Réalise les '+exerciseCards.length+' exercices avant d’enregistrer cette séance dans ton parcours.</p>';

      var finishButton = document.createElement('button');
      finishButton.type = 'button';
      finishButton.className = 'v24-english-check';
      finishButton.disabled = true;
      finishButton.textContent = 'Exercices terminés : 0 / '+exerciseCards.length;
      finishBox.appendChild(finishButton);
      wrap.appendChild(finishBox);

      /* Séance 4 : deux colonnes indépendantes pour éviter les grandes cases vides.
         On déplace les éléments existants, sans recréer les exercices ou leurs écouteurs. */
      if(s.id === 4){
        var leftColumn = document.createElement('div');
        var rightColumn = document.createElement('div');
        leftColumn.className = 'mh-english-s4-column';
        rightColumn.className = 'mh-english-s4-column';
        // Colonne gauche : écoute, association des nombres, oral.
        [0,2,4].forEach(function(i){ if(exerciseCards[i]) leftColumn.appendChild(exerciseCards[i]); });
        // Colonne droite : objets illustrés, train, validation.
        [1,3].forEach(function(i){ if(exerciseCards[i]) rightColumn.appendChild(exerciseCards[i]); });
        rightColumn.appendChild(finishBox);
        wrap.appendChild(leftColumn);
        wrap.appendChild(rightColumn);
        wrap.classList.add('mh-english-s4-balanced');
      }

      /* Séance 5 : même principe de colonnes indépendantes que la séance 4.
         On déplace les cartes déjà initialisées : images, audio, réponses et suivi restent actifs. */
      if(s.id === 5){
        var ageLeft = document.createElement('div');
        var ageRight = document.createElement('div');
        ageLeft.className = 'mh-english-s5-column';
        ageRight.className = 'mh-english-s5-column';
        // À gauche : écoute (courte), phrase à construire, entraînement oral.
        [0,2,4].forEach(function(i){ if(exerciseCards[i]) ageLeft.appendChild(exerciseCards[i]); });
        // À droite : lecture des cartes d'âge, dialogue illustré, bilan.
        [1,3].forEach(function(i){ if(exerciseCards[i]) ageRight.appendChild(exerciseCards[i]); });
        ageRight.appendChild(finishBox);
        wrap.appendChild(ageLeft);
        wrap.appendChild(ageRight);
        wrap.classList.add('mh-english-s5-balanced');
      }

      function englishExerciseFinished(card){
        if(s.id >= 1 && s.id <= 5) return card.dataset.englishDone === '1';
        var type = card.getAttribute('data-english-exercise-type') || '';
        var feedback = card.querySelector('.v24-english-feedback');
        var text = String(feedback && feedback.textContent || '').trim();
        if(type === 'listenSeries'){
          var progress = card.querySelector('.v24-english-listen-progress');
          return /série terminée/i.test(String(progress && progress.textContent || ''));
        }
        if(type === 'match') return /toutes les paires sont correctes/i.test(text);
        if(type === 'order') return /parfait, le bon ordre est trouvé/i.test(text);
        if(type === 'free') return /phrase enregistrée/i.test(text);
        if(type === 'choice') return /bravo, c.est correct|bonne réponse en vert/i.test(text);
        if(type === 'checklist') return /bilan est complet/i.test(text);
        return text.length > 0;
      }

      function refreshEnglishSessionButton(){
        var finished = exerciseCards.filter(englishExerciseFinished).length;
        finishButton.disabled = finished < exerciseCards.length;
        finishButton.textContent = finished < exerciseCards.length
          ? 'Exercices terminés : '+finished+' / '+exerciseCards.length
          : '✅ J’ai terminé la séance';
      }

      exerciseCards.forEach(function(card){
        try{
          new MutationObserver(refreshEnglishSessionButton).observe(card, {
            childList:true, subtree:true, characterData:true, attributes:true,
            attributeFilter:['class']
          });
        }catch(error){}
      });
      refreshEnglishSessionButton();

      finishButton.addEventListener('click', function(ev){
        ev.preventDefault();
        if(finishButton.disabled || finishButton.dataset.recorded === '1') return;

        var detailText = s.short+' — '+exerciseCards.length+' exercices terminés';
        var payload = {
          type:'entrainement_termine',
          matiere:'Anglais',
          domaine:s.short,
          titre:'Séance d’anglais terminée',
          detail:detailText,
          score:exerciseCards.length,
          total:exerciseCards.length,
          source:'anglais_seance_'+s.id
        };
        var recorded = false;
        try{
          if(typeof window.hibouTrackEvent === 'function'){
            window.hibouTrackEvent(payload);
            recorded = true;
          }else if(typeof window.hibouRecordSuccess === 'function'){
            window.hibouRecordSuccess(s.emoji+' Anglais — '+s.short+' — séance terminée', 'entrainement', payload);
            recorded = true;
          }else if(typeof window.hibouRecordTrainingSuccess === 'function'){
            window.hibouRecordTrainingSuccess('anglais', s.short, exerciseCards.length+' exercices terminés');
            recorded = true;
          }
        }catch(error){
          try{ console.error('Anglais séance '+s.id+' : journal non alimenté', error); }catch(ignore){}
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

  /* Anglais, séance 1 : écoute, situations photographiées, vocabulaire et oral. */
  /* Séance 2 : demander et dire son prénom. Prénoms fictifs pour les portraits. */
  /* Séance 3 : comprendre et utiliser How are you? avec des situations illustrées. */
  /* Séance 4 : nombres de 1 à 10, collections exactes et illustrations locales. */
  function renderEnglishS5Intro(wrap){
    var box=document.createElement('details');box.className='en5-discovery';box.innerHTML='<summary>🦉 Aide (masquée) — Demander et dire un âge</summary><p>How old are you? = Quel âge as-tu ?</p><p>I am eight years old. = J’ai huit ans.</p><p>On peut aussi dire I’m eight years old. Lis toujours la carte : le visage ne donne pas l’âge.</p>';['How old are you?','I am seven years old.','I am eight years old.','I am nine years old.'].forEach(function(text){var b=document.createElement('button');b.type='button';b.className='en5-btn';b.textContent='🔊 '+text;b.addEventListener('click',function(){speakEnglish(text);});box.appendChild(b);});wrap.appendChild(box);
  }
  function renderEnglishS5(card,idx){
    card.classList.add('en5-activity');var words=['one','two','three','four','five','six','seven','eight','nine','ten'],ticket=0;
    function el(tag,cls,text,parent){var n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;(parent||card).appendChild(n);return n;}
    function btn(text,parent,fn){var b=el('button','en5-btn',text,parent);b.type='button';b.addEventListener('click',fn);return b;}
    function mix(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),v=a[i];a[i]=a[j];a[j]=v;}return a;}
    function say(ok,text,finished){var f=card.querySelector('.v24-english-feedback');if(!f)f=el('div','v24-english-feedback','');f.className='v24-english-feedback '+(ok?'ok':'ko');f.setAttribute('role','status');f.textContent=text;if(finished){card.dataset.englishDone='1';card.classList.add('en5-success');}}
    function audio(text,after){var current=++ticket;if(!window.speechSynthesis||typeof window.SpeechSynthesisUtterance!=='function'){say(false,'La lecture audio n’est pas disponible sur ce navigateur. Utilise un navigateur avec une voix anglaise pour cet exercice.');return;}try{window.speechSynthesis.cancel();var u=new window.SpeechSynthesisUtterance(text);u.lang='en-GB';u.rate=0.78;var voices=window.speechSynthesis.getVoices()||[],voice=voices.filter(function(v){return /^en-GB/i.test(v.lang||'');})[0]||voices.filter(function(v){return /^en/i.test(v.lang||'');})[0];if(voice)u.voice=voice;u.onend=function(){if(current===ticket&&card.isConnected&&after)after();};u.onerror=function(e){if(current===ticket&&e.error!=='canceled'&&e.error!=='interrupted')say(false,'Le son n’a pas pu être lu. Vérifie le son de ton appareil, puis réessaie.');};window.speechSynthesis.speak(u);}catch(error){say(false,'Le son n’a pas pu être lu. Réessaie avec le bouton Écouter.');}}

    function picture(parent,file,alt){var im=el('img','en5-picture',undefined,parent);im.src='images/anglais/s5/'+file+'.webp';im.alt=alt;return im;}
    function phrase(n){return 'I am '+words[n-1]+' years old.';}
    function ageOptions(parent,target,done){var solved=false;mix([7,8,9]).forEach(function(n){btn(phrase(n),parent,function(){if(solved)return;if(n!==target){say(false,'Observe la carte ou recompte les bougies, puis essaie encore.');return;}solved=true;parent.querySelectorAll('button').forEach(function(b){b.disabled=true;});done();});});}
    if(idx===0){
      var rounds=mix([7,8,9]),step=0,progress=el('p','en5-progress',''),area=el('div','en5-round','');
      function draw(){area.replaceChildren();progress.textContent='Écoute '+(step+1)+' sur 3';var target=rounds[step],heard=false,solved=false,options;btn('🔊 Écouter',area,function(){audio(phrase(target),function(){heard=true;if(!solved)options.querySelectorAll('button').forEach(function(b){b.disabled=false;});});});options=el('div','en5-options','',area);mix([7,8,9]).forEach(function(n){var b=btn(n+' ans',options,function(){if(!heard||solved)return;if(n!==target){say(false,'Réécoute et essaie une autre carte.');return;}solved=true;options.querySelectorAll('button').forEach(function(x){x.disabled=true;});step++;if(step===3){progress.textContent='3 écoutes réussies sur 3';say(true,'Bravo ! Tu comprends ces trois âges.',true);}else{say(true,'Bonne réponse !');btn('Écoute suivante',area,draw);}});b.disabled=true;});}draw();
    }else if(idx===1){
      var rounds=[{n:8,cake:false},{n:7,cake:true},{n:9,cake:false},{n:8,cake:true},{n:7,cake:false},{n:9,cake:true}],step=0,progress=el('p','en5-progress',''),area=el('div','en5-round','');
      function draw(){area.replaceChildren();var r=rounds[step];progress.textContent='Image '+(step+1)+' sur 6';el('p','en5-context',r.cake?'Une bougie représente une année. Compte les bougies.':'Lis l’âge écrit sur la carte.',area);picture(area,(r.cake?'cake-':'age-')+r.n,r.cake?'Gâteau avec des bougies séparées à compter.':'Personnage tenant une carte indiquant '+r.n+' ans.');var options=el('div','en5-options','',area);ageOptions(options,r.n,function(){step++;if(step===rounds.length){progress.textContent='6 images réussies sur 6';say(true,'Bravo ! Tu sais dire ces âges en anglais.',true);}else{say(true,'Bonne réponse !');btn('Image suivante',area,draw);}});}draw();
    }else if(idx===2){
      var rounds=[8,9,7],step=0,progress=el('p','en5-progress',''),area=el('div','en5-round','');
      function draw(){area.replaceChildren();var n=rounds[step],tokens=['I','am',words[n-1],'years','old.'],selected=[],solved=false;progress.textContent='Phrase '+(step+1)+' sur 3';picture(area,'age-'+n,'Personnage tenant une carte indiquant '+n+' ans.');var line=el('p','en5-sentence','Choisis les mots dans l’ordre.',area),pool=el('div','en5-options','',area),buttons=[];[2,4,0,3,1].forEach(function(i){var b=btn(tokens[i],pool,function(){if(solved)return;selected.push({i:i,b:b});b.disabled=true;line.textContent=selected.map(function(x){return tokens[x.i];}).join(' ');});buttons.push(b);});btn('↶ Annuler le dernier mot',area,function(){if(solved||!selected.length)return;selected.pop().b.disabled=false;line.textContent=selected.length?selected.map(function(x){return tokens[x.i];}).join(' '):'Choisis les mots dans l’ordre.';});btn('Vérifier',area,function(){if(solved)return;if(selected.length!==5||selected.some(function(x,i){return x.i!==i;})){say(false,'Relis ta phrase. Utilise Annuler pour changer les derniers mots.');return;}solved=true;step++;if(step===3){progress.textContent='3 phrases réussies sur 3';say(true,'Bravo ! Tu construis la phrase pour dire un âge.',true);}else{say(true,'Bonne phrase !');btn('Phrase suivante',area,draw);}});}draw();
    }else if(idx===3){
      var rounds=[9,7,8],step=0,progress=el('p','en5-progress',''),area=el('div','en5-round','');
      function draw(){area.replaceChildren();var n=rounds[step];progress.textContent='Dialogue '+(step+1)+' sur 3';picture(area,'age-'+n,'Personnage tenant une carte indiquant '+n+' ans.');el('p','en5-question','How old are you?',area);btn('🔊 Écouter la question',area,function(){audio('How old are you?');});el('p','en5-context','Réponds à la place du personnage en lisant sa carte.',area);var options=el('div','en5-options','',area);ageOptions(options,n,function(){step++;if(step===3){progress.textContent='3 dialogues réussis sur 3';say(true,'Bravo ! Tu sais répondre à la question.',true);}else{say(true,'Bonne réponse !');btn('Dialogue suivant',area,draw);}});}draw();
    }else{
      el('p','en5-help','Parle à voix haute. Le logiciel ne vérifie pas ta prononciation.');var step=0,progress=el('p','en5-progress',''),area=el('div','en5-round',''),rounds=[{text:'Demande son âge à un camarade ou à un adulte.',model:'How old are you?'},{text:'Dis l’âge de ce personnage en parlant à sa place.',n:8,model:phrase(8)},{text:'Dis ton propre âge : I am… years old. Tu peux écouter un exemple avec huit ans.',model:phrase(8)}];
      function draw(){area.replaceChildren();var r=rounds[step];progress.textContent='Situation '+(step+1)+' sur 3';el('p','en5-context',r.text,area);if(r.n)picture(area,'age-'+r.n,'Personnage tenant une carte indiquant '+r.n+' ans.');btn('🔊 Écouter un modèle',area,function(){audio(r.model);});var confirm=btn('J’ai parlé à voix haute',area,function(){confirm.disabled=true;ticket++;if(window.speechSynthesis)window.speechSynthesis.cancel();step++;if(step===3){progress.textContent='3 situations pratiquées sur 3';say(true,'Tu as terminé ton entraînement oral.',true);}else draw();});}draw();
    }
  }

  function renderEnglishS4Intro(wrap){
    var words=['one','two','three','four','five','six','seven','eight','nine','ten'];
    var box=document.createElement('details');box.className='en4-discovery';var title=document.createElement('summary');title.textContent='🦉 Aide (masquée) — Les nombres de 1 à 10';box.appendChild(title);var p=document.createElement('p');p.textContent='Clique sur une carte pour écouter le nombre en anglais.';box.appendChild(p);var list=document.createElement('div');list.className='en4-number-grid';words.forEach(function(word,i){var b=document.createElement('button');b.type='button';b.className='en4-btn';var number=document.createElement('strong');number.textContent=i+1;var label=document.createElement('span');label.textContent=word;b.appendChild(number);b.appendChild(label);b.setAttribute('aria-label','Écouter '+word);b.addEventListener('click',function(){speakEnglish(word);});list.appendChild(b);});box.appendChild(list);wrap.appendChild(box);
  }
  function renderEnglishS4(card,idx){
    card.classList.add('en4-activity');var words=['one','two','three','four','five','six','seven','eight','nine','ten'],ticket=0;
    function el(tag,cls,text,parent){var n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;(parent||card).appendChild(n);return n;}
    function btn(text,parent,fn){var b=el('button','en4-btn',text,parent);b.type='button';b.addEventListener('click',fn);return b;}
    function mix(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),v=a[i];a[i]=a[j];a[j]=v;}return a;}
    function say(ok,text,finished){var f=card.querySelector('.v24-english-feedback');if(!f)f=el('div','v24-english-feedback','');f.className='v24-english-feedback '+(ok?'ok':'ko');f.setAttribute('role','status');f.textContent=text;if(finished){card.dataset.englishDone='1';card.classList.add('en4-success');}}
    function audio(text,after){var current=++ticket;if(!window.speechSynthesis||typeof window.SpeechSynthesisUtterance!=='function'){say(false,'La lecture audio n’est pas disponible sur ce navigateur. Utilise un navigateur avec une voix anglaise pour cet exercice.');return;}try{window.speechSynthesis.cancel();var u=new window.SpeechSynthesisUtterance(text);u.lang='en-GB';u.rate=0.78;var voices=window.speechSynthesis.getVoices()||[],voice=voices.filter(function(v){return /^en-GB/i.test(v.lang||'');})[0]||voices.filter(function(v){return /^en/i.test(v.lang||'');})[0];if(voice)u.voice=voice;u.onend=function(){if(current===ticket&&card.isConnected&&after)after();};u.onerror=function(e){if(current===ticket&&e.error!=='canceled'&&e.error!=='interrupted')say(false,'Le son n’a pas pu être lu. Vérifie le son de ton appareil, puis réessaie.');};window.speechSynthesis.speak(u);}catch(error){say(false,'Le son n’a pas pu être lu. Réessaie avec le bouton Écouter.');}}
    function collection(parent,file,kind){var image=el('img','en4-collection',undefined,parent);image.src='images/anglais/s4/'+file;image.alt='Des '+kind+' séparés à compter.';return image;}
    function choicesFor(n){return mix([n].concat(mix([1,2,3,4,5,6,7,8,9,10].filter(function(x){return x!==n;})).slice(0,3)));}
    if(idx===0){
      var rounds=mix([1,2,3,4,5,6,7,8,9,10]),step=0,progress=el('p','en4-progress',''),area=el('div','en4-listen','');
      function draw(){area.replaceChildren();progress.textContent='Écoute '+(step+1)+' sur 10';var target=rounds[step],heard=false,solved=false,options;btn('🔊 Écouter',area,function(){audio(words[target-1],function(){heard=true;if(!solved)options.querySelectorAll('button').forEach(function(b){b.disabled=false;});});});options=el('div','en4-number-choices','',area);mix([1,2,3,4,5,6,7,8,9,10]).forEach(function(number){var b=btn(String(number),options,function(){if(!heard||solved)return;if(number!==target){say(false,'Réécoute et choisis un autre chiffre.');return;}solved=true;b.classList.add('matched');options.querySelectorAll('button').forEach(function(x){x.disabled=true;});step++;if(step===rounds.length){progress.textContent='10 écoutes réussies sur 10';say(true,'Bravo ! Tu reconnais les nombres de 1 à 10.',true);}else{say(true,'Bonne réponse !');btn('Écoute suivante',area,draw);}});b.disabled=true;});}draw();
    }else if(idx===1){
      var rounds=[{file:'collection-a.svg',n:3,kind:'crayons'},{file:'collection-b.svg',n:6,kind:'cubes'},{file:'collection-c.svg',n:8,kind:'jetons'},{file:'collection-d.svg',n:10,kind:'crayons'}],step=0,progress=el('p','en4-progress',''),area=el('div','en4-count','');
      function drawCount(){area.replaceChildren();progress.textContent='Collection '+(step+1)+' sur 4';var round=rounds[step],solved=false;collection(area,round.file,round.kind);var options=el('div','en4-word-options','',area);choicesFor(round.n).forEach(function(number){btn(words[number-1],options,function(){if(solved)return;if(number!==round.n){say(false,'Compte chaque objet une seule fois, puis essaie encore.');return;}solved=true;options.querySelectorAll('button').forEach(function(b){b.disabled=true;});step++;if(step===rounds.length){progress.textContent='4 collections réussies sur 4';say(true,'Bravo ! Tu sais choisir le nombre anglais qui correspond.',true);}else{say(true,'Bonne réponse !');btn('Collection suivante',area,drawCount);}});});}drawCount();
    }else if(idx===2){
      var serie=0,progress=el('p','en4-progress',''),area=el('div','en4-association','');
      function drawMatch(){area.replaceChildren();progress.textContent='Série '+(serie+1)+' sur 2';var values=serie===0?[1,2,3,4,5]:[6,7,8,9,10],permutation=serie===0?[2,4,0,1,3]:[3,0,4,2,1],selected=null,count=0;var row=el('div','en4-match','',area),left=el('div','en4-match-col','',row),right=el('div','en4-match-col','',row);values.forEach(function(number){var b=btn(String(number),left,function(){left.querySelectorAll('button').forEach(function(x){x.classList.remove('selected');x.setAttribute('aria-pressed','false');});b.classList.add('selected');b.setAttribute('aria-pressed','true');selected={number:number,button:b};});b.setAttribute('aria-pressed','false');});
        // Les deux permutations ne placent jamais une bonne réponse en face.
        permutation.forEach(function(i){var number=values[i],b=btn(words[number-1],right,function(){if(!selected){say(false,'Choisis d’abord un chiffre.');return;}if(selected.number!==number){say(false,'Ce n’est pas encore la bonne association. Essaie un autre mot.');return;}selected.button.disabled=true;selected.button.classList.remove('selected');selected.button.classList.add('matched');selected.button.setAttribute('aria-pressed','false');b.disabled=true;b.classList.add('matched');selected=null;count++;if(count===values.length){serie++;if(serie===2){progress.textContent='10 associations réussies sur 10';say(true,'Bravo ! Les deux séries sont terminées.',true);}else{say(true,'Première série réussie !');btn('Série suivante',area,drawMatch);}}else say(true,'Bonne association ! '+count+' sur 5.');});});
      }drawMatch();
    }else if(idx===3){
      var rounds=[{values:[1,2,3,4,5],blank:2},{values:[4,5,6,7,8],blank:1},{values:[6,7,8,9,10],blank:3},{values:[1,2,3,4,5],blank:0}],step=0,progress=el('p','en4-progress',''),area=el('div','en4-trains','');
      function train(round){var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 145" role="img" aria-label="Train avec un nombre manquant"><g transform="translate(12 20)"><rect x="0" y="20" width="65" height="70" rx="9" fill="#f5a445" stroke="#7f623f" stroke-width="2"/><rect x="5" y="0" width="35" height="30" rx="6" fill="#7255ce"/><rect x="13" y="7" width="18" height="16" rx="3" fill="#dceaf8"/><circle cx="16" cy="93" r="10" fill="#524760"/><circle cx="51" cy="93" r="10" fill="#524760"/>';round.values.forEach(function(n,i){var x=75+i*84,missing=i===round.blank;svg+='<path d="M'+(x-10)+' 74H'+x+'" stroke="#635674" stroke-width="4"/><rect x="'+x+'" y="28" width="72" height="60" rx="10" fill="'+(missing?'#eee8fb':'#e4f1ed')+'" stroke="'+(missing?'#8c71d9':'#86b7a4')+'" stroke-width="2"'+(missing?' stroke-dasharray="6 4"':'')+'/><text x="'+(x+36)+'" y="71" text-anchor="middle" font-family="Arial,sans-serif" font-size="34" font-weight="700" fill="#29264c">'+(missing?'?':n)+'</text><circle cx="'+(x+17)+'" cy="94" r="8" fill="#524760"/><circle cx="'+(x+55)+'" cy="94" r="8" fill="#524760"/>';});return svg+'</g></svg>';}
      function drawTrain(){area.replaceChildren();progress.textContent='Train '+(step+1)+' sur 4';var round=rounds[step],target=round.values[round.blank],solved=false;var visual=el('div','en4-train','',area);visual.innerHTML=train(round);el('p','en4-help','Choisis le nombre manquant en anglais.',area);var options=el('div','en4-word-options','',area);choicesFor(target).forEach(function(number){btn(words[number-1],options,function(){if(solved)return;if(number!==target){say(false,'Observe les wagons avant et après la case vide. Essaie encore.');return;}solved=true;options.querySelectorAll('button').forEach(function(b){b.disabled=true;});step++;if(step===rounds.length){progress.textContent='4 trains réussis sur 4';say(true,'Bravo ! Tu as complété les quatre trains.',true);}else{say(true,'Bonne réponse !');btn('Train suivant',area,drawTrain);}});});}drawTrain();
    }else{
      el('p','en4-help','Parle à voix haute. Le logiciel ne vérifie pas ta prononciation.');var step=0,progress=el('p','en4-progress',''),area=el('div','en4-oral','');
      var rounds=[{text:'Compte de one à ten en anglais.',model:words.join(', ')+'.'},{text:'Compte ces objets à voix haute, puis dis leur nombre en anglais.',file:'collection-e.svg',kind:'crayons',model:'seven'},{text:'Dis en anglais combien tu vois de cubes.',file:'collection-f.svg',kind:'cubes',model:'five'}];
      function drawOral(){area.replaceChildren();progress.textContent='Situation '+(step+1)+' sur 3';var round=rounds[step];el('p','en4-context',round.text,area);if(round.file)collection(area,round.file,round.kind);else{var strip=el('div','en4-spoken-numbers','',area);words.forEach(function(word,i){el('span','en4-number-tag',String(i+1),strip);});}btn('🔊 Écouter un modèle',area,function(){audio(round.model);});var confirm=btn('J’ai parlé à voix haute',area,function(){confirm.disabled=true;ticket++;if(window.speechSynthesis)window.speechSynthesis.cancel();step++;if(step===rounds.length){progress.textContent='3 situations pratiquées sur 3';say(true,'Tu as terminé ton entraînement oral. Tu peux recompter avec un camarade.',true);}else{say(true,'Continue avec la situation suivante.');drawOral();}});}drawOral();
    }
  }

  function renderEnglishS3Intro(wrap){
    var box=document.createElement('details');box.className='en3-discovery';
    var title=document.createElement('summary');title.textContent='🦉 Aide (masquée) — Les mots pour dire comment je me sens';box.appendChild(title);
    var p=document.createElement('p');p.textContent='How are you? = Comment vas-tu ? I’m… = Je suis…';box.appendChild(p);
    var words=document.createElement('p');words.textContent='happy = content ; sad = triste ; tired = fatigué ; hungry = qui a faim. I’m hungry = J’ai faim.';box.appendChild(words);
    var note=document.createElement('p');note.textContent='Les photos et leurs légendes illustrent des situations pour apprendre ces mots.';box.appendChild(note);wrap.appendChild(box);
  }
  function renderEnglishS3(card,idx){
    card.classList.add('en3-activity');
    var states=[
      {key:'happy',phrase:"I'm happy.",label:'Cet enfant est content.'},
      {key:'sad',phrase:"I'm sad.",label:'Cet enfant se sent triste.'},
      {key:'tired',phrase:"I'm tired.",label:'Cet enfant est fatigué.'},
      {key:'hungry',phrase:"I'm hungry.",label:'Cet enfant a faim et attend son repas.'}
    ];
    var ticket=0;
    function el(tag,cls,text,parent){var n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;(parent||card).appendChild(n);return n;}
    function btn(text,parent,fn){var b=el('button','en3-btn',text,parent);b.type='button';b.addEventListener('click',fn);return b;}
    function say(ok,text,done){var n=card.querySelector('.v24-english-feedback');if(!n)n=el('div','v24-english-feedback','');n.className='v24-english-feedback '+(ok?'ok':'ko');n.setAttribute('role','status');n.textContent=text;if(done){card.dataset.englishDone='1';card.classList.add('en3-success');}}
    function mix(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),v=a[i];a[i]=a[j];a[j]=v;}return a;}
    function photo(parent,state){var n=el('img','en3-photo',undefined,parent);n.src='images/anglais/s3/'+state.key+'.jpg';n.alt=state.label;n.loading='eager';return n;}
    function audio(text,after){
      var current=++ticket;
      if(!window.speechSynthesis||typeof window.SpeechSynthesisUtterance!=='function'){say(false,'La lecture audio n’est pas disponible sur ce navigateur. Utilise un navigateur avec une voix anglaise pour cet exercice.');return;}
      try{window.speechSynthesis.cancel();var u=new window.SpeechSynthesisUtterance(text);u.lang='en-GB';u.rate=0.78;var voices=window.speechSynthesis.getVoices()||[];var voice=voices.filter(function(v){return /^en-GB/i.test(v.lang||'');})[0]||voices.filter(function(v){return /^en/i.test(v.lang||'');})[0];if(voice)u.voice=voice;
        u.onend=function(){if(current===ticket&&card.isConnected&&after)after();};u.onerror=function(e){if(current===ticket&&e.error!=='canceled'&&e.error!=='interrupted')say(false,'Le son n’a pas pu être lu. Vérifie le son de ton appareil, puis réessaie.');};window.speechSynthesis.speak(u);
      }catch(error){say(false,'Le son n’a pas pu être lu. Réessaie avec le bouton Écouter.');}
    }
    if(idx===0){
      var rounds=mix(states),step=0,previous='',progress=el('p','en3-progress',''),area=el('div','en3-listen','');
      function drawListen(){
        area.replaceChildren();progress.textContent='Écoute '+(step+1)+' sur 4';var state=rounds[step],heard=false,solved=false,options;
        btn('🔊 Écouter',area,function(){audio(state.phrase,function(){heard=true;if(!solved)options.querySelectorAll('button').forEach(function(b){b.disabled=false;});});});
        options=el('div','en3-photo-options','',area);var order=mix(states);if(order.map(function(s){return s.key;}).join(',')===previous)order.push(order.shift());previous=order.map(function(s){return s.key;}).join(',');
        order.forEach(function(choice){var b=btn(choice.label,options,function(){if(!heard||solved)return;if(choice.key!==state.key){say(false,'Réécoute et cherche la situation qui correspond.');return;}solved=true;b.classList.add('matched');options.querySelectorAll('button').forEach(function(x){x.disabled=true;});step++;if(step===rounds.length){progress.textContent='4 écoutes réussies sur 4';say(true,'Bravo ! Tu reconnais les quatre expressions.',true);}else{say(true,'Bonne réponse !');btn('Écoute suivante',area,drawListen);}});b.classList.add('en3-photo-btn');b.disabled=true;photo(b,choice);});
      }drawListen();
    }else if(idx===1){
      var rounds=mix(states),step=0,progress=el('p','en3-progress',''),area=el('div','en3-observe','');
      function drawObserve(){
        area.replaceChildren();progress.textContent='Situation '+(step+1)+' sur 4';var state=rounds[step];photo(area,state);el('p','en3-caption',state.label,area);var solved=false,options=el('div','en3-word-options','',area);
        mix(states).forEach(function(choice){btn(choice.phrase,options,function(){if(solved)return;if(choice.key!==state.key){say(false,'Relis la légende, puis choisis la phrase anglaise qui correspond.');return;}solved=true;options.querySelectorAll('button').forEach(function(b){b.disabled=true;});step++;if(step===rounds.length){progress.textContent='4 situations réussies sur 4';say(true,'Bravo ! Tu sais décrire les quatre situations en anglais.',true);}else{say(true,'Bonne réponse !');btn('Situation suivante',area,drawObserve);}});});
      }drawObserve();
    }else if(idx===2){
      var row=el('div','en3-match en3-match-horizontal',''),left=el('div','en3-match-col en3-match-photos','',row),right=el('div','en3-match-col en3-match-words','',row),selected=null,count=0;
      left.setAttribute('role','group');left.setAttribute('aria-label','Choisis une photographie');
      right.setAttribute('role','group');right.setAttribute('aria-label','Choisis le mot anglais correspondant');
      states.forEach(function(state){var b=btn(state.label,left,function(){left.querySelectorAll('button').forEach(function(x){x.classList.remove('selected');x.setAttribute('aria-pressed','false');});b.classList.add('selected');b.setAttribute('aria-pressed','true');selected={state:state,button:b};});b.classList.add('en3-photo-btn');b.setAttribute('aria-pressed','false');photo(b,state);});
      // Permutation sans réponse correcte directement en face de son image.
      [2,3,1,0].forEach(function(i){var state=states[i],b=btn(state.key,right,function(){if(!selected){say(false,'Choisis d’abord une photo.');return;}if(selected.state.key!==state.key){say(false,'Relis la légende de la photo et essaie un autre mot.');return;}selected.button.disabled=true;selected.button.classList.remove('selected');selected.button.setAttribute('aria-pressed','false');selected.button.classList.add('matched');b.disabled=true;b.classList.add('matched');selected=null;count++;say(true,count===4?'Bravo ! Les quatre associations sont correctes.':'Bonne association ! '+count+' sur 4.',count===4);});});
    }else if(idx===3){
      var rounds=[states[0],states[2],states[3]],step=0,progress=el('p','en3-progress',''),area=el('div','en3-dialogue','');
      function drawDialogue(){area.replaceChildren();progress.textContent='Dialogue '+(step+1)+' sur 3';var state=rounds[step],solved=false;photo(area,state);el('p','en3-caption',state.label,area);el('p','en3-bubble','— How are you?\n— …',area);btn('🔊 Écouter la question',area,function(){audio('How are you?');});var options=el('div','en3-word-options','',area);mix(states).forEach(function(choice){btn(choice.phrase,options,function(){if(solved)return;if(choice.key!==state.key){say(false,'Choisis la réponse qui correspond à la légende de cette scène.');return;}solved=true;options.querySelectorAll('button').forEach(function(b){b.disabled=true;});step++;if(step===rounds.length){progress.textContent='3 dialogues réussis sur 3';say(true,'Bravo ! Tu sais répondre à How are you?',true);}else{say(true,'Bonne réponse !');btn('Dialogue suivant',area,drawDialogue);}});});}drawDialogue();
    }else{
      el('p','en3-help','Entraîne-toi à parler. Le logiciel ne vérifie pas ta prononciation.');
      var rounds=[{q:'Demande à un camarade comment il va.',model:'How are you?'},{q:'Réponds à How are you? Choisis une réponse parmi les quatre expressions apprises.',choose:true},{q:'Dans le jeu, tu as faim. Réponds en anglais à How are you?',model:"I'm hungry."}],step=0,progress=el('p','en3-progress',''),area=el('div','en3-oral','');
      function drawOral(){area.replaceChildren();progress.textContent='Situation '+(step+1)+' sur 3';var round=rounds[step];el('p','en3-context',round.q,area);if(round.choose){var models=el('div','en3-word-options','',area);states.forEach(function(state){btn('🔊 '+state.phrase,models,function(){audio(state.phrase);});});}else btn('🔊 Écouter un modèle',area,function(){audio(round.model);});var confirm=btn('J’ai parlé à voix haute',area,function(){confirm.disabled=true;ticket++;if(window.speechSynthesis)window.speechSynthesis.cancel();step++;if(step===rounds.length){progress.textContent='3 situations pratiquées sur 3';say(true,'Tu as terminé ton entraînement oral. Rejoue les échanges avec un camarade si tu le souhaites.',true);}else{say(true,'Continue avec la situation suivante.');drawOral();}});}drawOral();
    }
  }

  function renderEnglishS2Intro(wrap){
    var box=document.createElement('details');box.className='en2-discovery';
    var summary=document.createElement('summary');summary.textContent='🦉 Aide (masquée) — Les phrases à connaître';box.appendChild(summary);
    var p=document.createElement('p');p.textContent='What is your name? = Comment t’appelles-tu ? My name is… = Je m’appelle…';box.appendChild(p);
    var example=document.createElement('p');example.textContent='Exemple : My name is Emma. Les trois personnages des photos portent des prénoms fictifs.';box.appendChild(example);wrap.appendChild(box);
  }
  function renderEnglishS2(card,idx){
    card.classList.add('en2-activity');
    var audioTicket=0;
    function el(tag,cls,text,parent){var n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;(parent||card).appendChild(n);return n;}
    function btn(text,parent,fn){var b=el('button','en2-btn',text,parent);b.type='button';b.addEventListener('click',fn);return b;}
    function say(ok,text,finished){var n=card.querySelector('.v24-english-feedback');if(!n)n=el('div','v24-english-feedback','');n.className='v24-english-feedback '+(ok?'ok':'ko');n.setAttribute('role','status');n.textContent=text;if(finished){card.dataset.englishDone='1';card.classList.add('en2-success');}}
    function mix(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),v=a[i];a[i]=a[j];a[j]=v;}return a;}
    function audio(text,after){
      var ticket=++audioTicket;
      if(!window.speechSynthesis||typeof window.SpeechSynthesisUtterance!=='function'){say(false,'La lecture audio n’est pas disponible sur ce navigateur. Utilise un navigateur avec une voix anglaise pour cet exercice.');return;}
      try{window.speechSynthesis.cancel();var u=new window.SpeechSynthesisUtterance(text);u.lang='en-GB';u.rate=0.78;var voices=window.speechSynthesis.getVoices()||[];var voice=voices.filter(function(v){return /^en-GB/i.test(v.lang||'');})[0]||voices.filter(function(v){return /^en/i.test(v.lang||'');})[0];if(voice)u.voice=voice;
        u.onend=function(){if(ticket===audioTicket&&card.isConnected&&after)after();};u.onerror=function(e){if(ticket===audioTicket&&e.error!=='canceled'&&e.error!=='interrupted')say(false,'Le son n’a pas pu être lu. Vérifie le son de ton appareil, puis réessaie.');};window.speechSynthesis.speak(u);
      }catch(error){say(false,'Le son n’a pas pu être lu. Réessaie avec le bouton Écouter.');}
    }
    if(idx===0){
      var items=mix(['My name is Emma.','What is your name?','My name is Emma.','What is your name?']),step=0;
      var progress=el('p','en2-progress',''),area=el('div','en2-listen','');
      function draw(){area.replaceChildren();progress.textContent='Écoute '+(step+1)+' sur 4';var heard=false,solved=false,options,item=items[step];btn('🔊 Écouter',area,function(){audio(item,function(){heard=true;if(!solved)options.querySelectorAll('button').forEach(function(b){b.disabled=false;});});});options=el('div','en2-options','',area);mix(['My name is Emma.','What is your name?']).forEach(function(phrase){var b=btn(phrase,options,function(){if(!heard||solved)return;if(phrase!==item){say(false,'Réécoute : entends-tu une question ou une présentation ?');return;}solved=true;options.querySelectorAll('button').forEach(function(x){x.disabled=true;});step++;if(step===4){progress.textContent='4 écoutes réussies sur 4';say(true,'Bravo ! Tu reconnais la question et la présentation.',true);}else{say(true,'Bonne réponse !');btn('Écoute suivante',area,draw);}});b.disabled=true;});}draw();
    }else if(idx===1){
      el('p','en2-help','Les prénoms Emma, Léo et Lina sont inventés pour ces personnages.');
      var people=[{key:'emma',name:'Emma',spoken:'Emma'},{key:'leo',name:'Léo',spoken:'Leo'},{key:'lina',name:'Lina',spoken:'Lina'}];
      var previousPeopleOrder='',rounds=mix([people[0],people[1],people[2],people[1]]),step=0,progress=el('p','en2-progress',''),area=el('div','en2-who','');
      function drawPeople(){area.replaceChildren();progress.textContent='Portrait '+(step+1)+' sur 4';var heard=false,solved=false,options,personForRound=rounds[step];btn('🔊 Écouter',area,function(){audio('My name is '+personForRound.spoken+'.',function(){heard=true;if(!solved)options.querySelectorAll('button').forEach(function(b){b.disabled=false;});});});options=el('div','en2-portraits','',area);var peopleOrder=mix(people);if(peopleOrder.map(function(p){return p.key;}).join(',')===previousPeopleOrder)peopleOrder.push(peopleOrder.shift());previousPeopleOrder=peopleOrder.map(function(p){return p.key;}).join(',');peopleOrder.forEach(function(person){var b=btn(person.name,options,function(){if(!heard||solved)return;if(person.key!==personForRound.key){say(false,'Réécoute et cherche le prénom entendu sous les portraits.');return;}solved=true;b.classList.add('matched');options.querySelectorAll('button').forEach(function(x){x.disabled=true;});step++;if(step===rounds.length){progress.textContent='4 portraits trouvés sur 4';say(true,'Bravo ! Tu sais qui se présente.',true);}else{say(true,'C’est le bon personnage !');btn('Portrait suivant',area,drawPeople);}});b.classList.add('en2-portrait');b.disabled=true;var image=el('img','en2-portrait-img',undefined);image.src='images/anglais/s2/'+person.key+'.jpg';image.alt='Portrait du personnage fictif '+person.name;image.loading='eager';b.prepend(image);});}drawPeople();
    }else if(idx===2){
      var phrases=[['My','name','is','Emma.'],['What','is','your','name?'],['My','name','is','Lina.']],step=0;
      var progress=el('p','en2-progress',''),area=el('div','en2-order','');
      function drawOrder(){area.replaceChildren();progress.textContent='Phrase '+(step+1)+' sur 3';el('p','en2-help',step===1?'Construis la question pour demander un prénom.':'Construis la phrase pour se présenter.',area);var chosen=[],bank,slots=el('div','en2-slots','',area);slots.setAttribute('aria-label','Ma phrase');slots.setAttribute('aria-live','polite');var words=phrases[step];var order=mix([0,1,2,3]);if(order.every(function(v,n){return v===n;}))order=[2,0,3,1];bank=el('div','en2-options en2-bank','',area);
        function refresh(){slots.textContent=chosen.length?chosen.map(function(item){return item.text;}).join(' '):'Ta phrase apparaîtra ici.';check.disabled=chosen.length!==words.length;undo.disabled=!chosen.length;}
        order.forEach(function(n){var b=btn(words[n],bank,function(){chosen.push({text:words[n],button:b});b.disabled=true;refresh();});});
        var controls=el('div','en2-options','',area);var undo=btn('Annuler le dernier mot',controls,function(){var last=chosen.pop();if(last)last.button.disabled=false;refresh();});var check=btn('Vérifier ma phrase',controls,function(){if(!chosen.every(function(item,n){return item.text===words[n];})){say(false,'Ce n’est pas encore le bon ordre. Annule des mots et essaie encore.');return;}bank.querySelectorAll('button').forEach(function(b){b.disabled=true;});check.disabled=true;undo.disabled=true;step++;if(step===phrases.length){progress.textContent='3 phrases réussies sur 3';say(true,'Bravo ! Tu sais construire les deux phrases utiles.',true);}else{say(true,'La phrase est correcte !');btn('Phrase suivante',area,drawOrder);}});refresh();
      }drawOrder();
    }else if(idx===3){
      var rounds=[{context:'Emma demande son prénom à Léo.',line:'Emma : What is your name?',options:['What is your name?','My name is Leo.','Goodbye!'],answer:1},{context:'Tu veux demander son prénom à Lina.',line:'Toi : …',options:['My name is Lina.','Hello!','What is your name?'],answer:2},{context:'Léo demande son prénom à Emma.',line:'Léo : What is your name?',options:['My name is Emma.','What is your name?','Goodbye!'],answer:0}],step=0;
      var progress=el('p','en2-progress',''),area=el('div','en2-dialogue','');
      function drawDialogue(){area.replaceChildren();progress.textContent='Échange '+(step+1)+' sur 3';var round=rounds[step];el('p','en2-context',round.context,area);el('p','en2-bubble',round.line,area);if(step!==1)btn('🔊 Écouter la question',area,function(){audio('What is your name?');});var options=el('div','en2-answer-options','',area);round.options.forEach(function(text,n){btn(text,options,function(){if(n!==round.answer){say(false,'Relis la situation : faut-il demander le prénom ou répondre ?');return;}options.querySelectorAll('button').forEach(function(b){b.disabled=true;});step++;if(step===rounds.length){progress.textContent='3 échanges réussis sur 3';say(true,'Bravo ! Tu sais demander et dire un prénom.',true);}else{say(true,'Bonne réponse !');btn('Échange suivant',area,drawDialogue);}});});}drawDialogue();
    }else{
      el('p','en2-help','Réponds à voix haute. Le logiciel ne vérifie pas ta prononciation.');
      var rounds=[{text:'Demande son prénom à un camarade.',model:'What is your name?'},{text:'Présente-toi : dis My name is… puis ton propre prénom.',model:'My name is Emma.'},{text:'Avec un camarade, demandez vos prénoms puis répondez chacun votre tour.',model:'What is your name? My name is Leo.'}],step=0;
      var progress=el('p','en2-progress',''),area=el('div','en2-oral','');
      function drawOral(){area.replaceChildren();var current=rounds[step];progress.textContent='Situation '+(step+1)+' sur 3';el('p','en2-context',current.text,area);if(step>0)el('p','en2-help','Le modèle utilise un prénom fictif. Remplace-le par le tien.',area);btn('🔊 Écouter un modèle',area,function(){audio(current.model);});var confirm=btn('J’ai parlé à voix haute',area,function(){confirm.disabled=true;audioTicket++;if(window.speechSynthesis)window.speechSynthesis.cancel();step++;if(step===rounds.length){progress.textContent='3 situations pratiquées sur 3';say(true,'Tu as terminé ton entraînement oral. Tu peux rejouer le dialogue avec un camarade.',true);}else{say(true,'Continue avec la situation suivante.');drawOral();}});}drawOral();
    }
  }

  function renderEnglishS1Intro(wrap){
    var box=document.createElement('details');box.className='en1-discovery';
    var summary=document.createElement('summary');summary.textContent='🦉 Aide (masquée) — Les trois mots à connaître';box.appendChild(summary);
    var p=document.createElement('p');p.textContent='Hello = Bonjour. Hi = Salut. Goodbye = Au revoir. Hello et Hi servent tous les deux à saluer.';box.appendChild(p);
    var notice=document.createElement('p');notice.textContent='Pour les écoutes, active le son de ton appareil.';box.appendChild(notice);wrap.appendChild(box);
  }

  function renderEnglishS1(card,idx){
    card.classList.add('en1-activity');
    var done=false,audioVersion=0;
    function el(tag,cls,text,parent){var n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;(parent||card).appendChild(n);return n;}
    function btn(text,parent,action){var b=el('button','en1-btn',text,parent);b.type='button';b.addEventListener('click',action);return b;}
    function say(ok,text,complete){var n=card.querySelector('.v24-english-feedback');if(!n)n=el('div','v24-english-feedback','');n.className='v24-english-feedback '+(ok?'ok':'ko');n.setAttribute('role','status');n.textContent=text;if(complete){done=true;card.dataset.englishDone='1';card.classList.add('en1-success');}}
    function shuffled(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=a[i];a[i]=a[j];a[j]=x;}return a;}
    function play(word,after){
      var ticket=++audioVersion;
      if(!window.speechSynthesis||typeof window.SpeechSynthesisUtterance!=='function'){say(false,'La lecture audio n’est pas disponible sur ce navigateur. Utilise un navigateur avec une voix anglaise pour cet exercice.');return;}
      try{
        window.speechSynthesis.cancel();
        var speech=new window.SpeechSynthesisUtterance(word);speech.lang='en-GB';speech.rate=0.78;
        var voices=window.speechSynthesis.getVoices()||[];
        var voice=voices.filter(function(v){return /^en-GB/i.test(v.lang||'');})[0]||voices.filter(function(v){return /^en/i.test(v.lang||'');})[0];if(voice)speech.voice=voice;
        speech.onend=function(){if(ticket===audioVersion&&card.isConnected&&after)after();};
        speech.onerror=function(e){if(ticket===audioVersion&&e.error!=='canceled'&&e.error!=='interrupted')say(false,'Le son n’a pas pu être lu. Vérifie le son de ton appareil, puis réessaie.');};
        window.speechSynthesis.speak(speech);
      }catch(error){say(false,'Le son n’a pas pu être lu. Réessaie avec le bouton Écouter.');}
    }
    if(idx===0){
      var words=shuffled(['Hello!','Hi!','Goodbye!','Hello!']),step=0;
      var progress=el('p','en1-progress',''),zone=el('div','en1-listen','');
      function drawListen(){
        zone.replaceChildren();progress.textContent='Écoute '+(step+1)+' sur '+words.length;
        var heard=false,solved=false,answers;
        btn('🔊 Écouter',zone,function(){play(words[step],function(){heard=true;if(!solved)answers.querySelectorAll('button').forEach(function(b){b.disabled=false;});});});
        answers=el('div','en1-options','',zone);
        shuffled(['Hello!','Hi!','Goodbye!']).forEach(function(word){var b=btn(word,answers,function(){if(!heard||solved)return;if(word!==words[step]){say(false,'Réécoute et essaie un autre mot.');return;}solved=true;answers.querySelectorAll('button').forEach(function(x){x.disabled=true;});step++;if(step===words.length){say(true,'Bravo ! Tu as reconnu les quatre mots entendus.',true);progress.textContent='4 écoutes réussies sur 4';}else{say(true,'Bonne réponse ! Passe à l’écoute suivante.');btn('Écoute suivante',zone,function(){audioVersion++;drawListen();});}});b.disabled=true;});
      }drawListen();
    }else if(idx===1){
      var count=0,grid=el('div','en1-photo-grid','');
      var scenes=[
        {file:'arrive-classe',caption:'J’arrive à l’école. Je salue la personne qui m’accueille.',kind:'hello'},
        {file:'depart-classe',caption:'Je pars de l’école. Je dis au revoir.',kind:'goodbye'},
        {file:'retrouvailles',caption:'Je retrouve mes amis à l’école. Je les salue.',kind:'hello'},
        {file:'sortie-ecole',caption:'Des élèves disent au revoir à des visiteurs qui partent.',kind:'goodbye'}
      ];
      scenes.forEach(function(scene,n){var box=el('div','en1-photo-scene','',grid),img=el('img','en1-scene-img',undefined,box);img.src='images/anglais/s1/'+scene.file+'.jpg';img.alt=scene.caption;img.loading='eager';el('p','en1-caption',scene.caption,box);var options=el('div','en1-photo-options','',box),solved=false;var choices=n%2?[['goodbye','Goodbye!'],['hello','Hello! / Hi!']]:[['hello','Hello! / Hi!'],['goodbye','Goodbye!']];choices.forEach(function(choice){btn(choice[1],options,function(){if(solved)return;if(choice[0]!==scene.kind){say(false,'Relis la légende : est-ce que tu arrives ou est-ce que tu pars ?');return;}solved=true;count++;box.classList.add('matched');options.querySelectorAll('button').forEach(function(b){b.disabled=true;});say(true,count===4?'Bravo ! Tu sais saluer et dire au revoir.':'Bonne réponse ! '+count+' photos sur 4.',count===4);});});});
    }else if(idx===2){
      var row=el('div','en1-match',''),left=el('div','en1-match-col','',row),right=el('div','en1-match-col','',row),chosen=null,count=0;
      var pairs=[['Hello!','Bonjour'],['Hi!','Salut'],['Goodbye!','Au revoir']];
      pairs.forEach(function(pair){var b=btn(pair[0],left,function(){left.querySelectorAll('button').forEach(function(x){x.classList.remove('selected');x.setAttribute('aria-pressed','false');});b.classList.add('selected');b.setAttribute('aria-pressed','true');chosen={pair:pair,button:b};});b.setAttribute('aria-pressed','false');});
      // Aucun mot ne fait face à sa bonne traduction.
      [2,0,1].forEach(function(n){var pair=pairs[n],b=btn(pair[1],right,function(){if(!chosen){say(false,'Choisis d’abord un mot anglais.');return;}if(chosen.pair[0]!==pair[0]){say(false,'Relis les mots et essaie une autre association.');return;}chosen.button.disabled=true;chosen.button.classList.remove('selected');chosen.button.setAttribute('aria-pressed','false');chosen.button.classList.add('matched');b.disabled=true;b.classList.add('matched');chosen=null;count++;say(true,count===3?'Bravo ! Les trois associations sont correctes.':'Bonne association ! '+count+' sur 3.',count===3);});});
    }else if(idx===3){
      var rounds=[{context:'Tu rencontres Emma le matin.',line:'Emma : Hello!',valid:['Hello!','Hi!']},{context:'Tu quittes la classe pour rentrer chez toi.',line:'Ton enseignant : Goodbye!',valid:['Goodbye!']},{context:'Tu retrouves un ami dans la cour.',line:'Ton ami : Hi!',valid:['Hello!','Hi!']}],step=0;
      var progress=el('p','en1-progress',''),area=el('div','en1-dialogue','');
      function drawDialogue(){area.replaceChildren();var round=rounds[step];progress.textContent='Échange '+(step+1)+' sur 3';el('p','en1-context',round.context,area);el('p','en1-bubble',round.line,area);btn('🔊 Écouter la réplique',area,function(){play(round.line.slice(round.line.indexOf(':')+1).trim());});var choices=el('div','en1-options','',area);shuffled(['Hello!','Hi!','Goodbye!']).forEach(function(word){btn(word,choices,function(){if(round.valid.indexOf(word)<0){say(false,'Regarde le contexte : on se rencontre ou on se quitte ?');return;}choices.querySelectorAll('button').forEach(function(b){b.disabled=true;});step++;if(step===rounds.length){say(true,'Bravo ! Tu sais répondre à une salutation.',true);progress.textContent='3 échanges réussis sur 3';}else{say(true,word==='Goodbye!'?'Bonne réponse !':'Hello et Hi conviennent tous les deux ici.');btn('Échange suivant',area,drawDialogue);}});});}drawDialogue();
    }else{
      el('p','en1-help','Dis ta réponse à voix haute. Tu peux écouter un modèle. Le logiciel ne vérifie pas ta prononciation.');
      var situations=[{text:'Tu arrives en classe. Salue ton enseignant.',model:'Hello!'},{text:'Tu retrouves un ami. Salue-le.',model:'Hi!'},{text:'Tu pars de l’école. Dis au revoir.',model:'Goodbye!'}],step=0;
      var progress=el('p','en1-progress',''),area=el('div','en1-oral','');
      function drawOral(){area.replaceChildren();progress.textContent='Situation '+(step+1)+' sur 3';el('p','en1-context',situations[step].text,area);btn('🔊 Écouter un modèle',area,function(){play(situations[step].model);});var confirm=btn('J’ai dit ma réponse à voix haute',area,function(){confirm.disabled=true;audioVersion++;if(window.speechSynthesis)window.speechSynthesis.cancel();step++;if(step===situations.length){say(true,'Tu as terminé ton entraînement oral. Tu peux refaire ces échanges avec un camarade.',true);progress.textContent='3 situations pratiquées sur 3';}else{say(true,'Continue avec la situation suivante.');drawOral();}});}drawOral();
    }
  }

  function renderEnglishAssessment(card, exo){
    card.classList.add('v24-history-assessment-card');
    var selected = {};
    var skills = exo.skills || [];
    var questions = exo.questions || [];
    var questionEls = [];

    var skillBox = document.createElement('div');
    skillBox.className = 'v24-history-skills';
    skills.forEach(function(s){
      var d = document.createElement('div');
      d.className = 'v24-history-skill';
      d.innerHTML = esc(s.icon || '✓') + ' ' + esc(s.title || '') + '<small>' + esc(s.desc || '') + '</small>';
      skillBox.appendChild(d);
    });
    card.appendChild(skillBox);

    var list = document.createElement('div');
    list.className = 'v24-history-assessment-list';
    skills.forEach(function(skill, si){
      var group = document.createElement('section');
      group.className = 'v24-history-skill-group';
      group.innerHTML = '<h4>'+(si+1)+'. '+esc(skill.icon || '✓')+' '+esc(skill.title || '')+'<small>'+esc(skill.desc || '')+'</small></h4>';
      questions.forEach(function(q, qi){
        if(q.skill !== skill.id) return;
        var box = document.createElement('div');
        box.className = 'v24-history-question';
        box.innerHTML = '<b>Question '+(qi+1)+'</b><p>'+esc(q.q)+'</p>';
        if(q.audio){
          var speak = document.createElement('button');
          speak.type = 'button';
          speak.className = 'v24-english-speak';
          speak.textContent = '🔊 Écouter';
          speak.addEventListener('click', function(ev){
            ev.preventDefault();
            speakEnglish(q.audio);
          }, true);
          box.appendChild(speak);
        }
        var opts = document.createElement('div');
        opts.className = 'v24-history-options';
        q.options.forEach(function(opt, oi){
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'v24-history-option';
          btn.textContent = opt;
          btn.addEventListener('click', function(ev){
            ev.preventDefault();
            selected[qi] = oi;
            Array.prototype.forEach.call(opts.children, function(b){ b.classList.remove('selected'); });
            btn.classList.add('selected');
          }, true);
          opts.appendChild(btn);
        });
        box.appendChild(opts);
        questionEls[qi] = box;
        group.appendChild(box);
      });
      list.appendChild(group);
    });
    card.appendChild(list);

    var resultBtn = document.createElement('button');
    resultBtn.type = 'button';
    resultBtn.className = 'v24-history-result-btn';
    resultBtn.textContent = 'Voir mon bilan';
    var result = document.createElement('div');
    result.className = 'v24-history-final-message';
    result.style.display = 'none';
    resultBtn.addEventListener('click', function(ev){
      ev.preventDefault();
      if(Object.keys(selected).length < questions.length){
        result.style.display = 'block';
        result.innerHTML = 'Il reste ' + (questions.length - Object.keys(selected).length) + ' réponse(s) à choisir avant le bilan.';
        return;
      }
      var scores = {};
      skills.forEach(function(s){ scores[s.id] = {ok:0,total:0,skill:s}; });
      questions.forEach(function(q, qi){
        if(!scores[q.skill]) scores[q.skill] = {ok:0,total:0,skill:{id:q.skill,title:q.skill,icon:'✓'}};
        scores[q.skill].total++;
        if(selected[qi] === q.correct) scores[q.skill].ok++;
        var qBox = questionEls[qi];
        Array.prototype.forEach.call(qBox.querySelectorAll('.v24-history-option'), function(b, oi){
          b.disabled = true;
          b.classList.toggle('correct', oi === q.correct);
          b.classList.toggle('wrong', oi === selected[qi] && oi !== q.correct);
        });
      });
      var totalOk = questions.reduce(function(sum, q, qi){ return sum + (selected[qi] === q.correct ? 1 : 0); }, 0);
      var redCount = 0;
      var html = '<div class="v24-history-results">';
      Object.keys(scores).forEach(function(id){
        var s = scores[id];
        var color = s.ok === 3 ? 'green' : (s.ok === 2 ? 'orange' : 'red');
        if(color === 'red') redCount++;
        var label = color === 'green' ? 'Acquis' : (color === 'orange' ? 'Presque acquis' : 'À retravailler');
        html += '<div class="v24-history-result '+color+'">'+esc(s.skill.icon || '✓')+' '+esc(s.skill.title || id)+'<small>'+s.ok+' / '+s.total+' - '+label+'</small></div>';
      });
      html += '</div>';
      var validated = redCount === 0;
      html += '<div class="v24-history-final-message">'+(validated ? 'Bravo, bilan Anglais validé : aucune compétence en rouge.' : 'Bilan terminé : regarde les compétences rouges à retravailler.')+' Score : '+totalOk+' / '+questions.length+'.</div>';
      result.style.display = 'block';
      result.innerHTML = html;
      saveBilanResult('anglais', {subject:'Anglais', icon:'🇬🇧', score:totalOk, total:questions.length, validated:validated, date:new Date().toISOString(), skills:Object.keys(scores).map(function(id){var s=scores[id];return {id:id,title:s.skill.title,ok:s.ok,total:s.total,color:s.ok===3?'green':(s.ok===2?'orange':'red')};})});
    }, true);
    card.appendChild(resultBtn);
    card.appendChild(result);
  }

  function shuffleEnglishItems(items){
    var copy = (items || []).slice();
    for(var i = copy.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function renderEnglishFeedback(card, ok, text){
    var fb = card.querySelector('.v24-english-feedback');
    if(!fb){
      fb = document.createElement('div');
      fb.className = 'v24-english-feedback';
      card.appendChild(fb);
    }
    fb.className = 'v24-english-feedback ' + (ok ? 'ok' : 'ko');
    fb.textContent = text;
  }

  function renderEnglishListenSeries(card, exo){
    var items = shuffleEnglishItems(exo.items);
    var index = 0;
    var score = 0;
    var zone = document.createElement('div');
    card.appendChild(zone);

    function showCurrent(){
      if(index >= items.length){
        zone.innerHTML =
          '<div class="v24-english-listen-progress">✅ Série terminée</div>'
          + '<div class="v24-english-listen-prompt">Score : '+score+' / '+items.length+'</div>'
          + '<button type="button" class="v24-english-check" id="v24ListenRestart">Recommencer</button>';
        zone.querySelector('#v24ListenRestart').addEventListener('click', function(ev){
          ev.preventDefault();
          items = shuffleEnglishItems(exo.items);
          index = 0;
          score = 0;
          showCurrent();
        }, true);
        return;
      }

      var item = items[index];
      zone.innerHTML =
        '<div class="v24-english-listen-progress">Question '+(index + 1)+' / '+items.length+'</div>'
        + '<div class="v24-english-listen-prompt">Écoute, puis choisis.</div>'
        + '<button type="button" class="v24-english-speak" id="v24ListenSpeak">🔊 Écouter</button>'
        + '<div class="v24-english-options" id="v24ListenOptions"></div>'
        + '<div class="v24-english-feedback" id="v24ListenFeedback"></div>';
      var options = zone.querySelector('#v24ListenOptions');
      item.options.forEach(function(opt, i){
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'v24-english-option';
        b.textContent = opt;
        b.addEventListener('click', function(ev){
          ev.preventDefault();
          var ok = i === item.correct;
          if(ok) score++;
          Array.prototype.forEach.call(options.querySelectorAll('button'), function(x){x.disabled = true;});
          b.classList.add(ok ? 'correct' : 'wrong');
          if(options.children[item.correct]) options.children[item.correct].classList.add('correct');
          var fb = zone.querySelector('#v24ListenFeedback');
          fb.className = 'v24-english-feedback ' + (ok ? 'ok' : 'ko');
          fb.textContent = ok ? 'Correct.' : 'Réponse à retenir.';
          setTimeout(function(){
            index++;
            showCurrent();
          }, 850);
        }, true);
        options.appendChild(b);
      });
      zone.querySelector('#v24ListenSpeak').addEventListener('click', function(ev){
        ev.preventDefault();
        speakEnglish(item.audio);
      }, true);
    }

    showCurrent();
  }

  function renderEnglishChoice(card, exo){
    if(exo.audio){
      var speak = document.createElement('button');
      speak.type = 'button';
      speak.className = 'v24-english-speak';
      speak.textContent = '🔊 Écouter';
      speak.addEventListener('click', function(ev){ev.preventDefault(); speakEnglish(exo.audio);}, true);
      card.appendChild(speak);
    }
    if(exo.image){
      var imgBox = document.createElement('div');
      imgBox.className = 'v24-geo-map-card v24-geo-question-image';
      imgBox.innerHTML = exo.image;
      card.appendChild(imgBox);
    }
    var wrap = document.createElement('div');
    wrap.className = 'v24-english-options';
    exo.options.forEach(function(opt, i){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'v24-english-option';
      b.textContent = opt;
      b.addEventListener('click', function(ev){
        ev.preventDefault();
        var ok = i === exo.correct;
        Array.prototype.forEach.call(wrap.querySelectorAll('button'), function(x){x.disabled = true;});
        b.classList.add(ok ? 'correct' : 'wrong');
        var good = wrap.children[exo.correct];
        if(good) good.classList.add('correct');
        renderEnglishFeedback(card, ok, ok ? 'Bravo, c’est correct.' : 'Regarde la bonne réponse en vert.');
      }, true);
      wrap.appendChild(b);
    });
    card.appendChild(wrap);
    renderEnglishFeedback(card, true, '');
  }

  function renderEnglishMatch(card, exo){
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
      b.addEventListener('click', function(ev){
        ev.preventDefault();
        if(b.classList.contains('done')) return;
        Array.prototype.forEach.call(left.children, function(x){x.classList.remove('selected');});
        b.classList.add('selected');
        selected = i;
      }, true);
      left.appendChild(b);
    });
    exo.right.forEach(function(txt, i){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'v24-english-match-item';
      b.textContent = txt;
      b.addEventListener('click', function(ev){
        ev.preventDefault();
        if(selected < 0 || b.classList.contains('done')) return;
        var ok = exo.pairs[selected] === i;
        if(ok){
          left.children[selected].classList.add('done');
          left.children[selected].classList.remove('selected');
          b.classList.add('done');
          selected = -1;
          done++;
          renderEnglishFeedback(card, true, done === exo.left.length ? 'Toutes les paires sont correctes.' : 'Bonne paire.');
        }else{
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

  function renderEnglishOrder(card, exo){
    var bank = document.createElement('div');
    var zone = document.createElement('div');
    bank.className = 'v24-english-bank';
    zone.className = 'v24-english-zone';
    var placed = [];
    var words = exo.bank.slice().sort(function(){return Math.random() - 0.5;});
    function redraw(){
      bank.innerHTML = '';
      zone.innerHTML = '';
      words.forEach(function(w, index){
        if(placed.some(function(p){return p.index === index;})) return;
        var t = document.createElement('button');
        t.type = 'button';
        t.className = 'v24-english-token';
        t.textContent = w;
        t.addEventListener('click', function(ev){
          ev.preventDefault();
          placed.push({word:w,index:index});
          redraw();
        }, true);
        bank.appendChild(t);
      });
      placed.forEach(function(p, pos){
        var t = document.createElement('button');
        t.type = 'button';
        t.className = 'v24-english-token placed';
        t.textContent = p.word;
        t.addEventListener('click', function(ev){
          ev.preventDefault();
          placed.splice(pos, 1);
          redraw();
        }, true);
        zone.appendChild(t);
      });
    }
    redraw();
    var check = document.createElement('button');
    check.type = 'button';
    check.className = 'v24-english-check';
    check.textContent = 'Vérifier';
    check.addEventListener('click', function(ev){
      ev.preventDefault();
      var answer = placed.map(function(p){return p.word;});
      var ok = JSON.stringify(answer) === JSON.stringify(exo.correctOrder);
      renderEnglishFeedback(card, ok, ok ? 'Parfait, le bon ordre est trouvé.' : 'Pas encore. Clique un mot placé pour le retirer.');
    }, true);
    card.appendChild(bank);
    card.appendChild(zone);
    card.appendChild(check);
    renderEnglishFeedback(card, true, '');
  }

  function renderEnglishFree(card, exo){
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
      renderEnglishFeedback(card, ok, ok ? 'Phrase enregistrée dans la popup. Exemple possible : '+(exo.sample || exo.hint || '') : 'Écris d’abord une petite phrase.');
    }, true);
    card.appendChild(ta);
    card.appendChild(check);
    renderEnglishFeedback(card, true, '');
  }

  function renderEnglishChecklist(card, exo){
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
    check.addEventListener('click', function(ev){
      ev.preventDefault();
      var boxes = Array.prototype.slice.call(card.querySelectorAll('input[type="checkbox"]'));
      var ok = boxes.length > 0 && boxes.every(function(b){return b.checked;});
      renderEnglishFeedback(card, ok, ok ? 'Bravo, le bilan est complet.' : 'Coche ce que tu sais faire avant de valider.');
    }, true);
    card.appendChild(check);
    renderEnglishFeedback(card, true, '');
  }


window.MHEnglish={home:renderEnglishHome,session:renderEnglishSession,sessions:ENGLISH_SESSIONS};
})();
