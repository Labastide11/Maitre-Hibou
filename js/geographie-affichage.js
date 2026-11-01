/* Maître Hibou CE2 — Géographie externalisée depuis index.html (31-10-2026).
   Une seule source de vérité pour le rendu, les aides et les scores. */
(function(){
  'use strict';
  window.MH_GEO_RENDER_FACTORY = function(deps){
    var esc=deps.esc;
    var renderHistoryAssessment=deps.renderHistoryAssessment,
        renderScienceChoice=deps.renderScienceChoice,
        renderScienceMatch=deps.renderScienceMatch,
        renderScienceOrder=deps.renderScienceOrder,
        renderScienceSort=deps.renderScienceSort,
        renderScienceChecklist=deps.renderScienceChecklist,
        renderEnglishFeedback=deps.renderEnglishFeedback;
  var GEO_SESSIONS = [
    {id:1,title:'Séance 1',short:'Se repérer sur une carte',emoji:'🧭',objective:'Je sais me repérer sur un plan ou une carte simple.',criteria:['Points cardinaux','Légende','Symboles simples'],exos:[
      {type:'geo-s1-compass',title:'La rose des vents',instr:'Place les quatre points cardinaux.'},
      {type:'geo-s1-plan',title:'Je lis un plan',instr:'Observe le plan puis réponds.'},
      {type:'geo-s1-legend',title:'Je comprends la légende',instr:'Associe chaque symbole à ce qu’il représente.'},
      {type:'geo-s1-place',title:'Je retrouve un lieu',instr:'Clique sur le bon endroit du plan.'},
      {type:'geo-s1-challenge',title:'Défi du géographe',instr:'Résous l’énigme pour retrouver le lieu secret.'}
    ]},
    {id:2,title:'Séance 2',short:'Repères de la France',emoji:'🇫🇷',objective:'Je connais quelques grands repères géographiques de la France.',criteria:['Fleuves','Europe','Hexagone'],exos:[
      {type:'geo-s2',title:'Les fleuves de France',instr:'Observe la carte, puis associe chaque fleuve à son indice.'},
      {type:'geo-s2',title:'Sur quel continent ?',instr:'Observe la carte du monde et retrouve le continent de la France.'},
      {type:'geo-s2',title:'La forme de la France',instr:'Observe la figure et retrouve son nombre de côtés.'},
      {type:'geo-s2',title:'Le bon fleuve',instr:'Utilise les indices pour retrouver les fleuves.'},
      {type:'geo-s2',title:'Défi du géographe',instr:'Réunis trois indices pour compléter ta mission.'}
    ]},
    {id:3,title:'Séance 3',short:'Population',emoji:'👥',objective:'Je comprends que les habitants ne vivent pas partout en même nombre.',criteria:['Observer','Comparer','Habitants'],exos:[
      {type:'geo-s3',title:'Beaucoup ou peu d’habitants ?',instr:'Observe les deux paysages. Où voit-on le plus de logements rapprochés ?'},
      {type:'geo-s3',title:'Je classe les paysages',instr:'Classe les cinq lieux du plus grand au plus petit nombre d’habitants.'},
      {type:'geo-s3',title:'Je lis une carte de population',instr:'Observe la légende, puis réponds aux questions.'},
      {type:'geo-s3',title:'Je compare deux lieux',instr:'Compare deux espaces de même taille.'},
      {type:'geo-s3',title:'Défi du géographe',instr:'Résous trois énigmes sur les habitants.'}
    ]},
    {id:4,title:'Séance 4',short:'Paysages de France',emoji:'🏞️',map:GEO_MAP_LANDSCAPES,objective:'Je sais reconnaître différents paysages de France.',criteria:['Littoral','Montagne','Campagne','Ville'],exos:[
      {type:'match',title:'Paysage et caractéristique',instr:'Relie le paysage à sa description.',left:['La montagne','Le littoral','La campagne','La ville'],right:['Des sommets','Le bord de la mer','Des champs et villages','Des immeubles et rues'],pairs:[0,1,2,3]},
      {type:'sort',title:'Trie les éléments',instr:'Clique un élément puis le paysage.',items:['🏔️ un sommet enneigé','🌊 une plage','🚜 un champ cultivé','🏢 un grand immeuble'],zones:['Nature','Ville'],zoneIcons:['🌿','🏙️'],zoneColors:['#DCEAD9','#F6DDBE'],correct:[0,0,0,1]},
      {type:'choice',title:'Intrus',instr:'Lequel n’est PAS un type de paysage ?',options:['La montagne','Le littoral','Le mercredi'],correct:2}
    ]},
    {id:5,title:'Séance 5',short:'Ville ou campagne',emoji:'🏘️',objective:'Je sais comparer la vie en ville et à la campagne.',criteria:['Observer','Classer','Décrire','Justifier'],exos:[
      {type:'geo-s5',title:'Habitat et description',instr:'Choisis une photo, puis sa description.'},
      {type:'geo-s5',title:'Ville ou campagne ?',instr:'Choisis une photo, puis le bon lieu.'},
      {type:'geo-s5',title:'À toi de décrire',instr:'Écris une phrase pour décrire ton lieu de vie.'},
      {type:'geo-s5',title:'J’observe les indices',instr:'Observe chaque photo et choisis l’indice visible.'},
      {type:'geo-s5',title:'Le défi du géographe',instr:'Lis la description, puis choisis la bonne photo.'}
    ]},
    {id:6,title:'Séance 6',short:'La ville et ses acteurs',emoji:'🏙️',objective:'Je sais expliquer à quoi sert une ville et qui y participe.',criteria:['Acteurs','Lieux','Besoins','Observer'],exos:[
      {type:'geo-s6',title:'Qui fait quoi ?',instr:'Choisis un acteur, puis son rôle.'},
      {type:'geo-s6',title:'À quoi sert ce lieu ?',instr:'Choisis une action, puis le besoin correspondant.'},
      {type:'geo-s6',title:'Où dois-je aller ?',instr:'Choisis le lieu qui répond au besoin.'},
      {type:'geo-s6',title:'J’observe les indices',instr:'Observe la photo, puis choisis l’indice visible.'},
      {type:'geo-s6',title:'Le défi du géographe',instr:'Lis la situation et choisis la bonne réponse.'}
    ]}
  ];

  function renderGeoHome(grid){
    grid.className = 'v24-english-shell';
    grid.innerHTML = '<div class="v24-english-intro"><div class="v24-english-panel"><h3>Géographie CE2</h3><p>Choisis une séance. Les cartes aident à lire, classer et se repérer.</p></div><div class="v24-english-panel"><h3>Cartes</h3><p>Rose des vents, légende, France simplifiée, densité et paysages.</p></div></div><div class="v24-english-sessions" id="v24GeoSessions"></div>';
    var wrap = grid.querySelector('#v24GeoSessions');
    GEO_SESSIONS.forEach(function(s){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'v24-english-session-card';
      b.style.setProperty('--mh-poster-image', 'url("images/geographie-carte-seance-'+s.id+'.jpg")');
      b.innerHTML = '<img class="v24-subject-thumb" src="images/geographie-carte-seance-'+s.id+'.jpg" alt="Carte illustrant la séance '+s.id+'" loading="lazy"><span class="v24-subject-card-body"><strong>'+esc(s.emoji+' '+s.short)+'</strong><span>'+esc(s.title)+'</span><small>'+esc(s.objective)+'</small></span>';
      b.addEventListener('click', function(ev){ev.preventDefault();ev.stopPropagation();renderGeoSession(grid, s.id);}, true);
      wrap.appendChild(b);
    });
  }

  /* NAV-01 : consultation des leçons sans démonter les exercices en cours. */
  var GEO_LESSON_LINKS = {
    1:[['P2-04','Utiliser un plan et se repérer']],
    2:[['P1-01','Localiser la France']],
    3:[['P1-02','Carte de population'],['P1-04','Espaces plus ou moins peuplés']],
    4:[['P2-01','Paysage urbain'],['P3-01','Espace rural'],['P3-02','Littoral et montagne']],
    5:[['P2-02','Les formes d’habitat'],['P2-01','Paysage urbain'],['P3-01','Espace rural']],
    6:[['P2-03','Les fonctions du quartier'],['P2-06','Déplacements et aménagements']]
  };
  function showGeoLessons(sessionId, trigger){
    var entries=GEO_LESSON_LINKS[sessionId] || [];
    if(!entries.length) return;
    var lastFocus=document.activeElement;
    var veil=document.createElement('div');
    veil.className='mh-geo-nav01-overlay';
    veil.setAttribute('role','dialog');veil.setAttribute('aria-modal','true');
    veil.setAttribute('aria-label','Leçons de géographie');
    veil.style.cssText='position:fixed;inset:0;z-index:2147483000;background:rgba(21,35,45,.72);display:flex;align-items:center;justify-content:center;padding:12px;box-sizing:border-box';
    var panel=document.createElement('div');
    panel.style.cssText='background:white;border-radius:17px;width:min(980px,100%);height:min(92vh,900px);display:flex;flex-direction:column;overflow:hidden;box-shadow:0 15px 55px #0005';
    var bar=document.createElement('div');
    bar.style.cssText='display:flex;align-items:center;flex-wrap:wrap;gap:8px;padding:10px 14px;background:#eef8f4;border-bottom:1px solid #c7ded4';
    var heading=document.createElement('strong');heading.textContent='Mes leçons de géographie';heading.style.cssText='margin-right:auto;color:#205447';bar.appendChild(heading);
    var close=document.createElement('button');close.type='button';close.textContent='← Retour aux exercices';close.style.cssText='cursor:pointer;border:0;border-radius:10px;background:#256f5a;color:white;font-weight:700;padding:10px 14px';bar.appendChild(close);
    var choices=document.createElement('div');choices.style.cssText='display:flex;gap:7px;flex-wrap:wrap;padding:9px 12px';
    var frame=document.createElement('iframe');frame.title='Leçon de géographie';frame.style.cssText='width:100%;border:0;flex:1;min-height:0;background:white';
    var buttons=[];
    entries.forEach(function(item){
      var code=item[0],label=item[1];
      var b=document.createElement('button');b.type='button';b.textContent=code+' · '+label;
      b.style.cssText='cursor:pointer;border:1px solid #bbd8cb;border-radius:9px;padding:9px 11px;background:white;color:#205447;font-weight:600';
      b.addEventListener('click',function(){
        buttons.forEach(function(x){x.style.background='white';x.setAttribute('aria-pressed','false');});
        b.style.background='#d9f3e9';b.setAttribute('aria-pressed','true');
        frame.src='bibliotheque_geographie/lecons/geographie-'+code.toLowerCase()+'.html';
      });
      buttons.push(b);choices.appendChild(b);
    });
    var hint=document.createElement('span');hint.textContent='Tes réponses restent enregistrées dans cette séance.';hint.style.cssText='font-size:12px;color:#48665d;padding:0 12px 8px';
    panel.appendChild(bar);panel.appendChild(choices);panel.appendChild(hint);panel.appendChild(frame);veil.appendChild(panel);
    function dismiss(){document.removeEventListener('keydown',onKey,true);veil.remove();if(lastFocus && lastFocus.focus)lastFocus.focus();else if(trigger)trigger.focus();}
    function onKey(ev){if(ev.key==='Escape'){ev.preventDefault();dismiss();}else if(ev.key==='Tab'){
      var focusables=Array.prototype.slice.call(panel.querySelectorAll('button'));
      if(!focusables.length)return;
      if(ev.shiftKey && document.activeElement===focusables[0]){ev.preventDefault();focusables[focusables.length-1].focus();}
      else if(!ev.shiftKey && document.activeElement===focusables[focusables.length-1]){ev.preventDefault();focusables[0].focus();}
    }}
    close.addEventListener('click',dismiss);
    veil.addEventListener('click',function(ev){if(ev.target===veil)dismiss();});
    document.body.appendChild(veil);document.addEventListener('keydown',onKey,true);
    buttons[0].click();close.focus();
  }


  /* Aides CE2 : appliquées au moteur de géographie effectivement utilisé dans index.html. */
  var MH_GEO_HINTS_20261031 = [['Observe la rose des vents : elle indique quatre directions. Cherche leurs initiales.', 'Choisis un bâtiment du plan, puis suis les rues avec ton doigt.', "Observe chaque dessin de la légende et cherche ce qu'il pourrait représenter dans un quartier.", "Cherche d'abord un point de repère facile à reconnaître sur le plan.", 'Lis chaque indice séparément et élimine les lieux qui ne conviennent pas.'], ['Lis les noms inscrits sur la carte avant de faire ton choix.', "Observe la forme de la France et les espaces qui l'entourent.", 'Lis le titre de la carte et regarde les symboles utilisés.', 'Commence par retrouver le lieu demandé sur la carte.', 'Vérifie ton choix en confrontant plusieurs indices de la carte.'], ['Regarde la légende : elle explique les couleurs et les nombres.', 'Compare les différentes zones de la carte, sans te presser.', "Cherche les endroits qui comptent le plus d'habitants et ceux qui en comptent moins.", 'Utilise la légende pour comprendre les différences entre les lieux.', 'Observe les lettres et les nombres avant de répondre.'], ["Observe les bâtiments, les routes et la végétation sur l'image.", "Cherche un détail qui permet de distinguer un espace urbain d'un espace rural.", 'Compare les formes du relief et les éléments naturels.', 'Repère deux ressemblances et une différence entre les paysages.', 'Explique ton choix avec un élément visible sur la photographie.'], ['Observe si les maisons sont rapprochées ou éloignées.', 'Cherche les différences entre un village, une ville et la campagne.', 'Repère les routes et les espaces naturels sur la photographie.', 'Compare la taille et la disposition des habitations.', 'Choisis un détail précis pour justifier ta réponse.'], ['Observe les activités des personnes et les bâtiments du quartier.', 'Cherche à quoi sert chaque lieu pour ses habitants.', 'Repère les services qui rendent la vie quotidienne plus facile.', 'Demande-toi de quoi les habitants ont besoin dans ce lieu.', 'Compare les documents avant de choisir et explique ton raisonnement.']];
  function mhGeoHelp20261031(card, sessionId, index){
    if(card.querySelector('.mh-geo-help-20261031')) return;
    var tip=(MH_GEO_HINTS_20261031[sessionId-1]||[])[index] || 'Observe le document, puis relis la consigne.';
    var instruction=card.querySelector('p');
    if(!instruction) return;
    var holder=document.createElement('div');
    holder.className='mh-geo-help-20261031';
    holder.style.cssText='display:block!important;visibility:visible!important;opacity:1!important;margin:9px 0 12px!important;flex:0 0 auto!important';
    var button=document.createElement('button');
    button.type='button';button.textContent='💡 Aide';
    button.setAttribute('aria-expanded','false');
    button.style.cssText='display:inline-block!important;visibility:visible!important;opacity:1!important;position:static!important;background:#fff4dc!important;color:#634316!important;border:2px solid #d5a450!important;border-radius:12px!important;padding:9px 15px!important;font-size:15px!important;font-weight:800!important;cursor:pointer!important;width:auto!important;min-height:40px!important';
    var panel=document.createElement('div');
    panel.hidden=true;
    panel.style.cssText='margin:8px 0 0;padding:11px 13px;background:#fff9e9;color:#46330d;border-left:4px solid #d5a450;border-radius:9px;line-height:1.5;font-weight:650';
    panel.textContent='🦉 '+tip;
    button.addEventListener('click',function(event){event.preventDefault();event.stopPropagation();panel.hidden=!panel.hidden;button.textContent=panel.hidden?'💡 Aide':'💡 Cacher l’aide';button.setAttribute('aria-expanded',String(!panel.hidden));});
    holder.appendChild(button);holder.appendChild(panel);
    instruction.insertAdjacentElement('afterend',holder);
  }

  function renderGeoSession(grid, id){
    var s = GEO_SESSIONS.filter(function(x){return x.id === id;})[0] || GEO_SESSIONS[0];
    grid.className = 'v24-english-shell';
    grid.innerHTML = '<div class="v24-english-toolbar"><button type="button" class="v24-english-back" id="v24GeoBack">← Séances</button><div><div class="v24-english-objective">'+esc(s.emoji+' '+s.title+' — '+s.objective)+'</div><div class="v24-english-criteria">'+s.criteria.map(function(c){return '<span>✓ '+esc(c)+'</span>';}).join('')+'</div></div></div><div class="v24-english-exercises" id="v24GeoExercises"></div>';
    grid.querySelector('#v24GeoBack').addEventListener('click', function(ev){ev.preventDefault();ev.stopPropagation();renderGeoHome(grid);}, true);

    /* NAV-01 : le bouton est placé dans la barre de séance, sans reconstruire les exercices. */
    var nav01Button=document.createElement('button');
    nav01Button.type='button';
    nav01Button.className='v24-english-back mh-geo-nav01-button';
    nav01Button.textContent='📖 Voir la leçon';
    nav01Button.style.cssText='margin-left:8px;background:#e0f4eb;color:#195943;border:1px solid #8bc8af;cursor:pointer;white-space:nowrap';
    nav01Button.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();showGeoLessons(s.id,nav01Button);});
    grid.querySelector('#v24GeoBack').insertAdjacentElement('afterend',nav01Button);

    var wrap = grid.querySelector('#v24GeoExercises');
    s.exos.forEach(function(exo, idx){
      var card = document.createElement('section');
      card.className = 'v24-english-exo' + (s.id === 1 ? ' geo-s1-activity' : (s.id === 2 ? ' geo-s2-activity' : (s.id === 3 ? ' geo-s3-activity' : '')));
      card.innerHTML = '<h3>'+esc(exo.title)+'</h3><p>'+esc(exo.instr)+'</p>';
      if(s.id === 1){ renderGeoS1(card, idx); mhGeoHelp20261031(card,s.id,idx); wrap.appendChild(card); return; }
      if(s.id === 2){ renderGeoS2(card, idx); mhGeoHelp20261031(card,s.id,idx); wrap.appendChild(card); return; }
      if(s.id === 3){ renderGeoS3(card, idx); mhGeoHelp20261031(card,s.id,idx); wrap.appendChild(card); return; }
      if(s.id === 4){ renderGeoS4(card, idx); mhGeoHelp20261031(card,s.id,idx); wrap.appendChild(card); return; }
      if(s.id === 5){ renderGeoS5(card, idx); mhGeoHelp20261031(card,s.id,idx); wrap.appendChild(card); return; }
      if(s.id === 6){ renderGeoS6(card, idx); mhGeoHelp20261031(card,s.id,idx); wrap.appendChild(card); return; }
      if(idx === 0 && s.map) card.insertAdjacentHTML('beforeend','<div class="v24-geo-map-card">'+s.map+'</div>');
      if(exo.type === 'assessment') renderHistoryAssessment(card, exo);
      if(exo.type === 'choice') renderScienceChoice(card, exo);
      if(exo.type === 'match') renderScienceMatch(card, exo);
      if(exo.type === 'order') renderScienceOrder(card, exo);
      if(exo.type === 'sort') renderScienceSort(card, exo);
      if(exo.type === 'checklist') renderScienceChecklist(card, exo);
      if(exo.type === 'free') renderGeoFree(card, exo);
      mhGeoHelp20261031(card,s.id,idx);
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
          return (s.id >= 1 && s.id <= 6) ? card.dataset.geoDone === '1' : (feedback && String(feedback.textContent || '').trim().length > 0);
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

  /* Séance 3 : cinq activités interactives, supports JPG intégrés au dépôt. */
  /* Séance 4 : photographies locales, associations mélangées et tri en quatre paysages. */
  /* Séance 5 : cinq activités d'observation, photographies locales. */
  /* Séance 6 : lieux, acteurs et besoins de la ville. Toutes les photos sont locales. */
  function renderGeoS6(card, idx){
    card.classList.add('geo-s6-activity');
    var photos={mairie:'La mairie',boulangerie:'La boulangerie',bibliotheque:'La bibliothèque',bus:'L’arrêt de bus',immeuble:'L’immeuble d’habitation',marche:'Le marché'};
    function el(tag,cls,text,parent){var n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;(parent||card).appendChild(n);return n;}
    function btn(text,parent,action){var b=el('button','geo-s6-btn',text,parent);b.type='button';b.addEventListener('click',action);return b;}
    function picture(parent,key){var i=el('img','geo-s6-img',undefined,parent);i.src='images/geographie/s6/'+key+'.jpg';i.alt=photos[key];i.loading='eager';return i;}
    function say(ok,text,done){var f=card.querySelector('.v24-english-feedback');if(!f)f=el('div','v24-english-feedback','');f.className='v24-english-feedback '+(ok?'ok':'bad');f.setAttribute('role','status');f.textContent=text;if(done){card.dataset.geoDone='1';card.classList.add('geo-s6-success');}}
    function select(button,parent){parent.querySelectorAll('button').forEach(function(b){b.classList.remove('selected');b.setAttribute('aria-pressed','false');});button.classList.add('selected');button.setAttribute('aria-pressed','true');}
    if(idx===0){
      el('p','geo-s6-help','La municipalité, c’est le maire et son équipe. Elle s’occupe par exemple des écoles et des rues.');
      var row=el('div','geo-s6-match',''),left=el('div','geo-s6-col','',row),right=el('div','geo-s6-col','',row),chosen=null,count=0;
      var entries=[['habitants','Les habitants','immeuble','Vivent dans la ville.'],['commercants','Les commerçants','boulangerie','Vendent des produits dans les magasins ou au marché.'],['municipalite','La municipalité','mairie','S’occupe de la ville, par exemple des écoles et des rues.']];
      entries.forEach(function(e){var b=btn(e[1],left,function(){select(b,left);chosen={button:b,key:e[0]};});b.classList.add('geo-s6-photo');b.setAttribute('aria-pressed','false');picture(b,e[2]);});
      // Aucune bonne réponse n'est sur la même ligne que l'acteur associé.
      [2,0,1].forEach(function(n){var e=entries[n],b=btn(e[3],right,function(){if(!chosen){say(false,'Choisis d’abord un acteur.');return;}if(chosen.key!==e[0]){say(false,'Relis le rôle et essaie une autre association.');return;}chosen.button.disabled=true;chosen.button.classList.remove('selected');chosen.button.classList.add('matched');chosen.button.setAttribute('aria-pressed','false');b.disabled=true;b.classList.add('matched');chosen=null;count++;say(true,count===3?'Bravo ! Tu connais le rôle des trois acteurs.':'Bonne association ! '+count+' sur 3.',count===3);});});
    }else if(idx===1){
      el('p','geo-s6-help','Un lieu peut servir à plusieurs choses. Ici, classe l’action écrite sous chaque photo.');
      var options=el('div','geo-s6-options',''),zones=el('div','geo-s6-options',''),chosen=null,count=0;
      [['immeuble','habiter','Dormir chez soi'],['boulangerie','nourrir','Acheter du pain pour manger'],['bus','deplacer','Prendre le bus'],['mairie','travailler','Travailler dans les bureaux de la mairie']].forEach(function(e){var b=btn(e[2],options,function(){select(b,options);chosen={button:b,key:e[1]};});b.classList.add('geo-s6-photo');b.setAttribute('aria-pressed','false');picture(b,e[0]);});
      var zoneBox=el('div','geo-s6-zones','',zones);
      [['deplacer','Se déplacer'],['travailler','Travailler'],['nourrir','Se nourrir'],['habiter','Habiter']].forEach(function(e){btn(e[1],zoneBox,function(){if(!chosen){say(false,'Choisis d’abord une action sous une photo.');return;}if(chosen.key!==e[0]){say(false,'Relis l’action : quel besoin permet-elle de satisfaire ?');return;}chosen.button.disabled=true;chosen.button.classList.remove('selected');chosen.button.classList.add('matched');chosen.button.setAttribute('aria-pressed','false');el('span','geo-s6-result',e[1],chosen.button);chosen=null;count++;say(true,count===4?'Bravo ! Tu connais quatre activités de la ville.':'Bien classé ! '+count+' sur 4.',count===4);});});
    }else if(idx===2){
      sequence([
        {q:'Je veux emprunter un livre. Où dois-je aller ?',options:['mairie','bibliotheque','boulangerie'],answer:1},
        {q:'Je veux acheter une baguette. Où dois-je aller ?',options:['boulangerie','immeuble','bibliotheque'],answer:0},
        {q:'Je veux prendre le bus. Où dois-je attendre ?',options:['marche','mairie','bus'],answer:2}
      ],true,'Mission');
    }else if(idx===3){
      sequence([
        {photo:'marche',q:'Quel indice montre que l’on peut acheter de quoi manger ?',options:['Les livres sur les étagères','Les fruits et les légumes sur les étals','Les balcons des logements'],answer:1},
        {photo:'bibliotheque',q:'Quel indice montre que ce lieu permet de lire ?',options:['Les livres rangés sur les rayons','Les véhicules dans la rue','Les paniers de légumes'],answer:0},
        {photo:'bus',q:'Quel indice permet de reconnaître un arrêt de bus ?',options:['Les étals de nourriture','Les fenêtres des logements','Le panneau ou l’abri pour les voyageurs'],answer:2}
      ],false,'Observation');
    }else{
      sequence([
        {q:'Amel veut acheter des fruits pour le repas. Quel lieu peut-elle choisir ?',options:['bibliotheque','bus','marche'],answer:2},
        {photo:'mairie',q:'Noé remarque un lampadaire de la rue cassé. Qui peut-il prévenir avec un adulte ?',options:['La municipalité','Les commerçants','Les habitants d’une autre ville'],answer:0},
        {q:'Lou habite dans un appartement. Quelle photo montre son lieu de vie ?',options:['mairie','immeuble','boulangerie'],answer:1}
      ],true,'Énigme');
    }
    function sequence(rounds,pictures,label){
      var step=0,progress=el('p','geo-s6-progress',''),area=el('div','geo-s6-sequence','');
      function draw(){area.replaceChildren();progress.textContent=label+' '+(step+1)+' sur '+rounds.length;var r=rounds[step];if(r.photo)picture(area,r.photo);el('p','geo-s6-question',r.q,area);var hasPhotos=pictures&&r.options.every(function(k){return !!photos[k];});var choices=el('div',hasPhotos?'geo-s6-choices':'geo-s6-answers','',area);r.options.forEach(function(option,n){var b=btn(hasPhotos?photos[option]:option,choices,function(){if(n!==r.answer){say(false,'Observe les indices et essaie une autre réponse.');return;}step++;if(step===rounds.length){choices.querySelectorAll('button').forEach(function(x){x.disabled=true;});progress.textContent=rounds.length+' sur '+rounds.length+' réussies';say(true,'Bravo ! Tu as réussi les trois situations.',true);}else{say(true,'Bonne réponse ! Continue.');draw();}});if(hasPhotos){b.classList.add('geo-s6-photo');picture(b,option);}});}
      draw();
    }
  }

  function renderGeoS5(card, idx){
    card.classList.add('geo-s5-activity');
    function el(tag,cls,text,parent){var n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;(parent||card).appendChild(n);return n;}
    function btn(text,parent,action){var b=el('button','geo-s5-btn',text,parent);b.type='button';b.addEventListener('click',action);return b;}
    function image(parent,key,alt){var n=el('img','geo-s5-img',undefined,parent);n.src='images/geographie/s5/'+key+'.jpg';n.alt=alt;n.loading='eager';return n;}
    function say(ok,text,done){var f=card.querySelector('.v24-english-feedback');if(!f)f=el('div','v24-english-feedback','');f.className='v24-english-feedback '+(ok?'ok':'bad');f.setAttribute('role','status');f.textContent=text;if(done){card.dataset.geoDone='1';card.classList.add('geo-s5-success');}}
    function select(b,root){root.querySelectorAll('button').forEach(function(x){x.classList.remove('selected');x.setAttribute('aria-pressed','false');});b.classList.add('selected');b.setAttribute('aria-pressed','true');}
    if(idx===0){
      var row=el('div','geo-s5-match',''),left=el('div','geo-s5-col','',row),right=el('div','geo-s5-col','',row),chosen=null,count=0;
      var entries=[['centre','Le centre-ville','Des immeubles anciens et des commerces'],['ensemble','Le grand ensemble','De grands bâtiments avec beaucoup de logements'],['lotissement','Le lotissement','Des maisons individuelles regroupées, avec des jardins']];
      entries.forEach(function(e){var b=btn(e[1],left,function(){select(b,left);chosen={button:b,key:e[0]};});b.classList.add('geo-s5-photo');b.setAttribute('aria-pressed','false');image(b,e[0],e[1]);});
      [2,0,1].forEach(function(n){var e=entries[n],b=btn(e[2],right,function(){if(!chosen){say(false,'Choisis d’abord une photo.');return;}if(chosen.key!==e[0]){say(false,'Observe les bâtiments, puis essaie une autre description.');return;}chosen.button.disabled=true;chosen.button.classList.remove('selected');chosen.button.classList.add('matched');chosen.button.setAttribute('aria-pressed','false');b.disabled=true;b.classList.add('matched');chosen=null;count++;say(true,count===3?'Bravo ! Tu reconnais les trois types d’habitat.':'Bonne association ! '+count+' sur 3.',count===3);});});
    }else if(idx===1){
      var photos=el('div','geo-s5-options',''),zones=el('div','geo-s5-options',''),chosen=null,count=0;
      [['rue','ville','Rue et bâtiments rapprochés'],['champs','campagne','Champs cultivés'],['ensemble','ville','Grands immeubles'],['village','campagne','Village et espaces cultivés']].forEach(function(e,n){var b=btn('Photo '+(n+1),photos,function(){select(b,photos);chosen={button:b,key:e[1]};});b.classList.add('geo-s5-photo');b.setAttribute('aria-pressed','false');image(b,e[0],e[2]);});
      [['campagne','Plutôt à la campagne'],['ville','Plutôt en ville']].forEach(function(e){btn(e[1],zones,function(){if(!chosen){say(false,'Choisis d’abord une photo.');return;}if(chosen.key!==e[0]){say(false,'Observe les constructions et la place occupée par les champs.');return;}chosen.button.disabled=true;chosen.button.classList.remove('selected');chosen.button.classList.add('matched');chosen.button.setAttribute('aria-pressed','false');el('span','geo-s5-result',e[1],chosen.button);chosen=null;count++;say(true,count===4?'Bravo ! Les quatre photos sont classées.':'Bien classé ! '+count+' sur 4.',count===4);});});
    }else if(idx===2){
      el('p','geo-s5-help','Aide : J’habite… Je vois… Pense à la majuscule et au point. Ne donne pas ton adresse.');
      var input=el('textarea','v24-english-write',undefined);input.rows=4;input.placeholder='J’habite…';input.setAttribute('aria-label','Ma phrase pour décrire mon lieu de vie');
      var end=btn('J’ai écrit et relu ma phrase',card,function(){var value=input.value.trim();if(value.split(/\s+/).length<4){say(false,'Écris une phrase avec au moins quatre mots pour décrire ton lieu de vie.');return;}if(!/^[A-ZÀÂÇÉÈÊËÎÏÔÙÛÜŸŒ]/.test(value)||!/[.!?]$/.test(value)){say(false,'Ajoute une majuscule au début et un point à la fin.');return;}say(true,'Ta phrase est terminée. Tu pourras la relire avec ton enseignant.',true);input.readOnly=true;end.disabled=true;});
    }else if(idx===3){
      var rounds=[{photo:'ensemble',q:'Quel indice est visible sur cette photo ?',options:['De grands champs cultivés','Un haut immeuble avec de nombreux balcons','Des maisons isolées'],answer:1},{photo:'champs',q:'Quel indice est visible sur cette photo ?',options:['Une grande surface cultivée','Des boutiques au pied des immeubles','Plusieurs tours d’habitation'],answer:0},{photo:'rue',q:'Quel indice est visible sur cette photo ?',options:['Des champs entre les maisons','Une ferme isolée','Des immeubles rapprochés le long d’une rue'],answer:2},{photo:'village',q:'Quel indice est visible sur cette photo ?',options:['De hautes tours partout','Un village entouré de champs','Une avenue bordée de commerces'],answer:1}];
      sequence(rounds,false);
    }else{
      var rounds=[{q:'Je vois des maisons individuelles regroupées. Chaque maison a son jardin.',options:['ensemble','lotissement','centre'],answer:1},{q:'Je vois un haut immeuble avec beaucoup de logements et des espaces verts au pied.',options:['ensemble','centre','lotissement'],answer:0},{q:'Je vois une rue avec des immeubles anciens rapprochés et des commerces.',options:['lotissement','ensemble','centre'],answer:2}];sequence(rounds,true);
    }
    function sequence(rounds,pictures){
      var current=0,progress=el('p','geo-s5-progress',''),area=el('div','geo-s5-sequence','');
      function draw(){area.replaceChildren();progress.textContent=(pictures?'Énigme ':'Photo ')+(current+1)+' sur '+rounds.length;var round=rounds[current];if(round.photo)image(area,round.photo,'Photo à observer pour trouver un indice');el('p','geo-s5-question',round.q,area);var choices=el('div',pictures?'geo-s5-riddle-options':'geo-s5-answers','',area);round.options.forEach(function(option,n){var b=btn(pictures?'Photo '+(n+1):option,choices,function(){if(n!==round.answer){say(false,'Observe les photos et cherche les indices. Essaie encore.');return;}current++;if(current===rounds.length){choices.querySelectorAll('button').forEach(function(x){x.disabled=true;});progress.textContent=rounds.length+' sur '+rounds.length+' réussies';say(true,pictures?'Bravo ! Les trois énigmes sont résolues.':'Bravo ! Tu sais utiliser les indices des photos.',true);}else{say(true,'Bonne réponse ! Observe la photo suivante.');draw();}});if(pictures){b.classList.add('geo-s5-photo');image(b,option,'Photo '+(n+1)+' : observe les bâtiments');}});}
      draw();
    }
  }

  function renderGeoS4(card, idx){
    card.classList.add('geo-s4-activity');
    var base='images/geographie/s4/';
    function el(tag,cls,text,parent){var n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;(parent||card).appendChild(n);return n;}
    function button(text,parent,action){var b=el('button','geo-s4-button',text,parent);b.type='button';b.addEventListener('click',action);return b;}
    function photo(b,file,alt){var i=document.createElement('img');i.src=base+file+'.jpg';i.alt=alt;i.loading='eager';b.prepend(i);}
    function feedback(ok,text,done){var f=card.querySelector('.v24-english-feedback');if(!f)f=el('div','v24-english-feedback','');f.className='v24-english-feedback '+(ok?'ok':'bad');f.setAttribute('role','status');f.textContent=text;if(done){card.dataset.geoDone='1';card.classList.add('geo-s4-success');}}
    if(idx===0){
      card.querySelector('p').textContent='Choisis une photo, puis sa description.';
      var row=el('div','geo-s4-match',''),left=el('div','geo-s4-column','',row),right=el('div','geo-s4-column','',row),selected=null,count=0;
      var entries=[['montagne','La montagne','Des sommets'],['littoral','Le littoral','Le bord de la mer'],['campagne','La campagne','Des champs et des villages'],['ville','La ville','Des immeubles et des rues']];
      entries.forEach(function(e){var b=button(e[1],left,function(){left.querySelectorAll('button').forEach(function(x){x.classList.remove('selected');x.setAttribute('aria-pressed','false');});b.classList.add('selected');b.setAttribute('aria-pressed','true');selected={entry:e,button:b};});b.classList.add('geo-s4-photo');b.setAttribute('aria-pressed','false');photo(b,e[0],e[1]+' : photographie à observer');});
      // Permutation sans aucune bonne réponse directement en face.
      [2,3,1,0].forEach(function(index){var e=entries[index];var b=button(e[2],right,function(){if(!selected){feedback(false,'Choisis d’abord une photo.');return;}if(selected.entry[0]!==e[0]){feedback(false,'Observe la photo et essaie une autre description.');return;}selected.button.disabled=true;selected.button.classList.remove('selected');selected.button.classList.add('matched');selected.button.setAttribute('aria-pressed','false');b.disabled=true;b.classList.add('matched');selected=null;count++;feedback(true,count===4?'Bravo ! Tu reconnais les quatre paysages.':'Bonne association ! '+count+' sur 4.',count===4);});});
    }else if(idx===1){
      card.querySelector('p').textContent='Choisis une photo, puis son paysage.';
      var options=el('div','geo-s4-elements',''),zones=el('div','geo-s4-zones',''),selected=null,count=0;
      [['sommet','montagne','Un sommet enneigé'],['plage','littoral','Une plage'],['champ','campagne','Un champ cultivé'],['immeuble','ville','Un grand immeuble']].forEach(function(e,i){var b=button('Photo '+(i+1),options,function(){options.querySelectorAll('button').forEach(function(x){x.classList.remove('selected');x.setAttribute('aria-pressed','false');});b.classList.add('selected');b.setAttribute('aria-pressed','true');selected={kind:e[1],button:b};});b.classList.add('geo-s4-photo');b.setAttribute('aria-pressed','false');photo(b,e[0],e[2]);});
      [['ville','Ville'],['campagne','Campagne'],['littoral','Littoral'],['montagne','Montagne']].forEach(function(e){button(e[1],zones,function(){if(!selected){feedback(false,'Choisis d’abord une photo.');return;}if(selected.kind!==e[0]){feedback(false,'Observe les indices de la photo et essaie encore.');return;}selected.button.disabled=true;selected.button.classList.remove('selected');selected.button.classList.add('matched');selected.button.setAttribute('aria-pressed','false');var label=el('span','geo-s4-sorted',e[1],selected.button);selected=null;count++;feedback(true,count===4?'Bravo ! Les quatre éléments sont bien classés.':'Bien classé ! '+count+' sur 4.',count===4);});});
    }else{
      var options=el('div','geo-s4-intrus','');['La montagne','Le littoral','Le mercredi'].forEach(function(text){button(text,options,function(){if(text==='Le mercredi'){feedback(true,'Bravo ! Le mercredi est un jour de la semaine.',true);options.querySelectorAll('button').forEach(function(b){b.disabled=true;});}else feedback(false,'Cherche le mot qui désigne autre chose qu’un paysage.');});});
    }
  }

  function renderGeoS3(card, idx){
    var locations=[
      {label:'Centre-ville',count:2500,img:1},
      {label:'Quartier d’immeubles',count:900,img:2},
      {label:'Quartier de maisons',count:300,img:3},
      {label:'Village',count:100,img:4},
      {label:'Campagne',count:20,img:5}
    ];
    function make(tag, cls, content, into){var n=document.createElement(tag);if(cls)n.className=cls;if(content!==undefined)n.textContent=content;(into||card).appendChild(n);return n;}
    function photo(i,into,label){var fig=make('figure','geo-s3-photo',undefined,into);var im=make('img','',undefined,fig);im.src='images/geographie/s3-paysage-'+i+'.jpg';im.alt=label||'Vue aérienne de paysage '+i;im.loading='lazy';if(label)make('figcaption','',label,fig);return fig;}
    function action(label, cb,into){var b=make('button','geo-s3-btn',label,into);b.type='button';b.addEventListener('click',cb);return b;}
    var feedback=make('div','geo-s3-feedback',undefined,card);feedback.setAttribute('aria-live','polite');
    function tell(ok, msg){feedback.textContent=msg;feedback.className='geo-s3-feedback '+(ok?'ok':'retry');if(ok){card.dataset.geoDone='1';card.classList.add('geo-s3-success');}}
    function question(text){return make('div','geo-s3-question',text,card);}
    if(idx===0){
      var row=make('div','geo-s3-images',undefined,card);photo(1,row,'A — Centre-ville');photo(5,row,'B — Campagne');
      question('Dans quel paysage voit-on le plus de logements rapprochés ?');
      action('Paysage A',function(){tell(true,'Oui ! Les bâtiments sont plus nombreux et plus rapprochés dans le paysage A.')});
      action('Paysage B',function(){tell(false,'Observe les bâtiments : dans quel paysage sont-ils plus rapprochés ?')});
    }
    if(idx===1){
      make('p','geo-s3-explain','Les cinq lieux représentent chacun un espace de même taille. Les nombres d’habitants sont des exemples pour cet exercice.',card);
      var shuffled=[locations[3],locations[0],locations[4],locations[2],locations[1]];
      var place=make('div','geo-s3-sort-items',undefined,card);var order=[];
      var reset=action('Recommencer',function(){order=[];draw();feedback.textContent='';feedback.className='geo-s3-feedback'});
      function draw(){place.innerHTML='';shuffled.forEach(function(loc){var selected=order.indexOf(loc)>=0;var b=document.createElement('button');b.type='button';b.className='geo-s3-item'+(selected?' chosen':'');b.disabled=selected;var im=document.createElement('img');im.src='images/geographie/s3-paysage-'+loc.img+'.jpg';im.alt=loc.label;b.appendChild(im);var txt=document.createElement('span');txt.textContent=loc.label+' — '+loc.count+' habitants';b.appendChild(txt);b.addEventListener('click',function(){order.push(loc);draw()});place.appendChild(b);});var steps=make('div','geo-s3-current',undefined,place);steps.textContent='Ton classement : '+(order.map(function(x){return x.label}).join(' → ')||'Choisis le lieu qui compte le plus d’habitants.');}
      draw();action('Vérifier mon classement',function(){if(order.length!==5){tell(false,'Classe les cinq paysages avant de vérifier.');return;}if(order.every(function(x,i){return x===locations[i]}))tell(true,'Bravo ! Pour une même surface, 2 500 habitants, c’est plus que 900, 300, 100 ou 20.');else tell(false,'Regarde les nombres d’habitants et commence par le plus grand.');});
    }
    if(idx===2){
      make('div','geo-s3-map-title','Carte d’entraînement — nombre d’habitants dans cinq espaces de même taille',card);
      var map=make('div','geo-s3-schematic',undefined,card);
      [['A',2500],['B',100],['C',900],['D',20],['E',300]].forEach(function(pair){var t=make('div','geo-s3-region',undefined,map);t.style.background=pair[1]>=900?'#a94c55':pair[1]>=300?'#edaa66':'#b9ddb5';make('strong','',pair[0],t);make('small','',pair[1]+' hab.',t)});
      make('p','geo-s3-explain','Légende : rouge = beaucoup d’habitants ; orange = un nombre moyen ; vert = peu d’habitants.',card);
      var qs=[['Dans quel espace vivent le plus d’habitants ?','A'],['Quel espace compte 20 habitants ?','D'],['Quel espace compte 300 habitants ?','E']];var qn=0;
      function render(){if(qn>=qs.length){tell(true,'Bravo ! Tu sais lire la légende et comparer des nombres d’habitants.');return;}var old=card.querySelector('.geo-s3-question');if(old)old.remove();card.querySelectorAll('.geo-s3-qbtn').forEach(function(b){b.remove()});question((qn+1)+'/3 — '+qs[qn][0]);['C','A','E','D','B'].forEach(function(v){var b=action(v,function(){if(v===qs[qn][1]){qn++;render();}else tell(false,'Relis la carte et sa légende : chaque case porte une lettre et un nombre.');});b.classList.add('geo-s3-qbtn');});}render();
    }
    if(idx===3){
      var comparison=make('div','geo-s3-compare',undefined,card);[['Lieu A',50,5],['Lieu B',500,2]].forEach(function(item){var c=make('div','geo-s3-compare-item',undefined,comparison);photo(item[2],c,item[0]);make('strong','',item[1]+' habitants',c);});
      make('p','geo-s3-explain','Les deux espaces ont exactement la même taille. Les nombres d’habitants sont donnés pour comparer.',card);
      question('Dans quel espace vivent le plus d’habitants ?');
      action('Lieu A',function(){tell(false,'50 est plus petit que 500. Réessaie.')});action('Lieu B',function(){tell(true,'Exact ! 500 habitants, c’est plus que 50 pour un espace de même taille.')});
    }
    if(idx===4){
      var mission=[['Je suis un lieu avec très peu de maisons éloignées les unes des autres.','Campagne',['Village','Campagne','Centre-ville']],['Dans deux espaces de même taille, où vit-on le plus nombreux ?','800 habitants',['80 habitants','800 habitants','8 habitants']],['Sur notre carte d’entraînement, quelle couleur montre peu d’habitants ?','Vert',['Rouge','Orange','Vert']]];var step=0;
      var holder=make('div','geo-s3-challenge',undefined,card);photo(5,holder,'Observe les paysages et les indices.');
      function show(){holder.querySelectorAll('.geo-s3-task').forEach(function(e){e.remove()});if(step===3){tell(true,'Mission réussie ! Tu sais observer, lire une légende et comparer des habitants.');return;}var block=make('div','geo-s3-task',undefined,holder);make('strong','',(step+1)+'/3 — '+mission[step][0],block);mission[step][2].forEach(function(v){action(v,function(){if(v===mission[step][1]){step++;feedback.textContent='';feedback.className='geo-s3-feedback';show();}else tell(false,'Ce n’est pas encore ça. Observe ou compare les indices.');},block)});}show();
    }
  }

  /* Séance 2 : cinq activités CE2. Cartes JPG locales, vérification explicite. */
  function renderGeoS2(card, idx){
    var imageBase='images/geographie/';
    function node(tag,cls,text,parent){var e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;(parent||card).appendChild(e);return e;}
    function photo(name,alt){var im=node('img','geo-s2-map');im.src=imageBase+name;im.alt=alt;return im;}
    function btn(label,fn,parent){var b=node('button','geo-s2-btn',label,parent);b.type='button';b.addEventListener('click',fn);return b;}
    function say(ok,message,complete){var f=card.querySelector('.geo-s2-feedback');if(!f)f=node('div','geo-s2-feedback','');f.textContent=message;f.className='geo-s2-feedback '+(ok?'ok':'retry');if(complete){card.dataset.geoDone='1';card.classList.add('geo-s2-success');}}
    function choice(question,options,answer,help){node('div','geo-s2-question',question);var zone=node('div','geo-s2-options','');options.forEach(function(o){btn(o,function(){if(card.dataset.geoDone==='1')return;if(o===answer){say(true,'Bravo ! '+help,true);zone.querySelectorAll('button').forEach(function(x){x.disabled=true;});}else say(false,'Ce n’est pas encore cela. Observe la carte et essaie une autre réponse.',false);},zone);});}
    if(idx===0){
      photo('s2-fleuves.jpg','Carte schématique de la France avec la Seine, la Loire et le Rhône.');
      node('div','geo-s2-question','Choisis un fleuve, puis son indice.');
      var left=node('div','geo-s2-match',''),a=node('div','geo-s2-match-col','',left),b=node('div','geo-s2-match-col','',left),selected=null,done={};
      var rows=[['La Seine','Traverse Paris'],['La Loire','Le plus long fleuve de France'],['Le Rhône','Se jette dans la mer Méditerranée']];
      rows.forEach(function(row){var x=btn(row[0],function(){if(done[row[0]])return;a.querySelectorAll('button').forEach(function(z){z.classList.remove('geo-s2-selected');});x.classList.add('geo-s2-selected');selected={name:row[0],answer:row[1],button:x};},a);});
      // Aucune bonne réponse ne se trouve directement en face de son fleuve.
      ['Se jette dans la mer Méditerranée','Traverse Paris','Le plus long fleuve de France'].forEach(function(label){var x=btn(label,function(){if(!selected){say(false,'Choisis d’abord un fleuve.',false);return;}if(label!==selected.answer){say(false,'Relis l’indice du fleuve. Essaie encore.',false);return;}done[selected.name]=true;selected.button.disabled=true;selected.button.classList.remove('geo-s2-selected');x.disabled=true;selected=null;var count=Object.keys(done).length;say(true,count===3?'Bravo ! Tu connais les trois fleuves.':'Bonne association ! '+count+' sur 3.',count===3);},b);});
    }else if(idx===1){photo('s2-europe.jpg','Carte du monde simplifiée : France repérée en Europe.');choice('Sur quel continent se trouve la France ?',['En Afrique','En Amérique','En Europe'],'En Europe','La France se trouve en Europe.');
    }else if(idx===2){photo('s2-hexagone.jpg','Schéma d’un hexagone avec ses six sommets numérotés.');choice('Combien de côtés compte un hexagone ?',['5 côtés','6 côtés','4 côtés'],'6 côtés','Hexa signifie six : un hexagone a six côtés.');
    }else if(idx===3){photo('s2-fleuves.jpg','Carte des trois grands fleuves : Seine, Loire et Rhône.');choice('Quel fleuve se jette dans la mer Méditerranée ?',['La Loire','Le Rhône','La Seine'],'Le Rhône','Le Rhône coule vers le sud et rejoint la Méditerranée.');
    }else{
      photo('s2-europe.jpg','France située en Europe sur une carte du monde simplifiée.');
      node('div','geo-s2-question','Mission : trouve les trois bons repères de la France.');
      var steps=[{q:'1. La France se trouve…',options:['En Europe','En Afrique','En Asie'],a:'En Europe'},
        {q:'2. On compare souvent sa forme à…',options:['Un triangle','Un cercle','Un hexagone'],a:'Un hexagone'},
        {q:'3. Quel fleuve traverse Paris ?',options:['Le Rhône','La Seine','La Loire'],a:'La Seine'}],step=0;
      var q=node('div','geo-s2-question',''),choices=node('div','geo-s2-options','');
      function draw(){q.textContent=steps[step].q;choices.replaceChildren();steps[step].options.forEach(function(o){btn(o,function(){if(o!==steps[step].a){say(false,'Cherche encore : utilise les cartes des exercices précédents.',false);return;}step++;if(step===steps.length){choices.replaceChildren();q.textContent='Mission réussie !';say(true,'Bravo ! Tu sais situer la France, reconnaître sa forme et nommer un fleuve.',true);}else{say(true,'Bonne réponse ! Continue le défi.',false);draw();}},choices);});}draw();
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
      picture('s1-legende.jpg?v=20261026-correctif2','Carte illustrée : forêt repère 1, lac repère 2, village repère 3, route repère 4. Les repères sont à identifier.',card);
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
