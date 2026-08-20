(function(){
  'use strict';
  if(window.__HIBOU_LECTURE_25763) return;
  window.__HIBOU_LECTURE_25763 = true;

  const ITEMS = [{"code":"LEC-P1-01","domain":"Lecture et fluence","title":"Décoder un mot inconnu","jeSais":"Je sais lire un mot que je n’ai jamais rencontré.","checklist":["J’observe toutes les lettres et groupes de lettres.","Je découpe le mot si nécessaire.","Je relis le mot dans la phrase.","Je peux corriger ma première lecture."],"proofs":["Lecture de mots nouveaux.","Lecture d’un texte inédit.","Autocorrection en situation de lecture."],"lsu":"Identifier les mots de manière de plus en plus aisée."},{"code":"LEC-P1-02","domain":"Lecture et fluence","title":"Reconnaître rapidement les mots fréquents","jeSais":"Je sais lire immédiatement les mots que je rencontre souvent.","checklist":["Je reconnais le mot sans le syllaber.","Je lis avec peu d’hésitations.","Je reconnais le même mot dans différents textes."],"proofs":["Gammes de mots.","Lecture de phrases.","Lecture d’un texte courant."],"lsu":"Identifier les mots de manière de plus en plus aisée."},{"code":"LEC-P1-03","domain":"Lecture et fluence","title":"Lire par groupes de sens","jeSais":"Je sais regrouper les mots qui vont ensemble quand je lis.","checklist":["Je ne lis pas mot après mot.","Je repère les groupes qui forment une unité de sens.","Mes pauses ne coupent pas la phrase au mauvais endroit."],"proofs":["Lecture préparée.","Lecture enregistrée.","Observation en classe."],"lsu":"Lire à voix haute."},{"code":"LEC-P1-04","domain":"Lecture et fluence","title":"Respecter la ponctuation","jeSais":"Je sais utiliser la ponctuation pour guider ma lecture.","checklist":["Je marque le point.","Je tiens compte de la virgule.","Je fais entendre une question.","Je fais entendre une exclamation."],"proofs":["Lecture d’un court texte.","Lecture dialoguée."],"lsu":"Lire à voix haute."},{"code":"COM-P1-01","domain":"Compréhension de l’écrit","title":"Identifier les personnages","jeSais":"Je sais dire qui sont les personnages d’un récit.","checklist":["Je retrouve le personnage principal.","Je repère les autres personnages.","Je ne confonds pas personnage et lieu."],"proofs":["Questions après lecture.","Fiche personnage.","Reformulation orale."],"lsu":"Comprendre un texte."},{"code":"COM-P1-02","domain":"Compréhension de l’écrit","title":"Repérer le lieu et le moment","jeSais":"Je sais dire où et quand se déroule une histoire lorsque le texte permet de le savoir.","checklist":["Je cherche les indices de lieu.","Je cherche les indices de temps.","Je distingue ce qui est écrit de ce que j’imagine."],"proofs":["Questions explicites.","Surlignage d’indices."],"lsu":"Comprendre un texte."},{"code":"COM-P1-03","domain":"Compréhension de l’écrit","title":"Ordonner les événements","jeSais":"Je sais remettre les moments importants d’une histoire dans l’ordre.","checklist":["Je retrouve le début.","Je repère les événements principaux.","Je respecte leur ordre."],"proofs":["Images à remettre en ordre.","Phrases à classer.","Récit oral."],"lsu":"Comprendre un texte."},{"code":"COM-P1-04","domain":"Compréhension de l’écrit","title":"Retrouver une information explicite","jeSais":"Je sais retrouver dans le texte une information qui est écrite.","checklist":["Je comprends ce que la question demande.","Je retourne dans le texte.","Je repère le passage utile."],"proofs":["Questions de lecture.","Recherche d’informations."],"lsu":"Comprendre un texte."},{"code":"COM-P1-05","domain":"Compréhension de l’écrit","title":"Justifier avec un indice du texte","jeSais":"Je sais montrer ce qui, dans le texte, me permet de répondre.","checklist":["Je retrouve un indice précis.","Mon indice correspond à ma réponse.","Je peux expliquer mon choix."],"proofs":["Réponse avec surlignage de l’indice.","Justification orale."],"lsu":"Comprendre un texte."},{"code":"LIT-P1-01","domain":"Culture littéraire","title":"Entrer dans son parcours de lecteur","jeSais":"Je sais parler simplement d’un livre que j’ai lu ou entendu.","checklist":["Je donne son titre.","Je peux dire de quoi il parle.","Je dis si je l’ai aimé ou non.","J’explique simplement pourquoi."],"proofs":["Carnet de lecteur.","Présentation orale.","Choix personnel de lecture."],"lsu":"Devenir lecteur."},{"code":"LEC-P2-01","domain":"Lecture et fluence","title":"Lire avec exactitude","jeSais":"Je sais lire un texte en faisant peu d’erreurs.","checklist":["Je regarde précisément les mots.","Je ne remplace pas un mot par un autre.","Je me corrige lorsque ma lecture ne convient pas."],"proofs":["Lecture préparée ou non préparée.","Relevé d’erreurs."],"lsu":"Lire à voix haute."},{"code":"LEC-P2-02","domain":"Lecture et fluence","title":"Maintenir une lecture régulière","jeSais":"Je sais lire avec un rythme régulier.","checklist":["Je limite les longues hésitations.","Je ne précipite pas ma lecture.","Mon débit reste assez stable."],"proofs":["Lecture chronométrée utilisée comme indicateur.","Observation en situation de lecture."],"lsu":"Lire à voix haute."},{"code":"LEC-P2-03","domain":"Lecture et fluence","title":"Préparer une lecture à voix haute","jeSais":"Je sais préparer un texte avant de le lire à quelqu’un.","checklist":["Je repère les mots difficiles.","Je repère la ponctuation.","Je marque les groupes de sens.","Je relis avant de présenter."],"proofs":["Texte annoté.","Lecture préparée."],"lsu":"Lire à voix haute."},{"code":"LEC-P2-04","domain":"Lecture et fluence","title":"Adapter sa voix au sens","jeSais":"Je sais utiliser ma voix pour faire entendre le sens du texte.","checklist":["J’adapte mon ton.","Je fais entendre les émotions.","Je respecte le rythme de la phrase."],"proofs":["Lecture d’un dialogue.","Lecture d’une poésie.","Lecture expressive."],"lsu":"Lire à voix haute."},{"code":"COM-P2-01","domain":"Compréhension de l’écrit","title":"Comprendre un mot grâce au contexte ou à sa formation","jeSais":"Je sais chercher le sens d’un mot inconnu à partir du texte et du mot lui-même.","checklist":["Je lis les mots autour.","Je regarde les parties du mot que je connais.","Je propose un sens possible.","Je vérifie si ce sens convient."],"proofs":["Mots étudiés en contexte.","Justification d’une hypothèse de sens."],"lsu":"Comprendre un texte."},{"code":"COM-P2-02","domain":"Compréhension de l’écrit","title":"Identifier le référent d’un pronom","jeSais":"Je sais retrouver qui ou quoi est désigné par un pronom.","checklist":["Je repère le pronom.","Je cherche ce qu’il remplace.","Je vérifie avec le sens du texte."],"proofs":["Chaînes de reprises.","Questions ciblées."],"lsu":"Comprendre un texte."},{"code":"COM-P2-03","domain":"Compréhension de l’écrit","title":"Identifier les reprises nominales","jeSais":"Je sais comprendre que plusieurs expressions peuvent désigner le même personnage ou la même chose.","checklist":["Je repère les différentes désignations.","Je les relie au bon référent.","Je vérifie la cohérence."],"proofs":["Surlignage des chaînes anaphoriques.","Exercice de mise en relation."],"lsu":"Comprendre un texte."},{"code":"COM-P2-04","domain":"Compréhension de l’écrit","title":"Mettre en relation texte et illustration","jeSais":"Je sais utiliser l’illustration pour compléter ce que je comprends du texte.","checklist":["Je lis d’abord le texte.","Je regarde ce qu’apporte l’image.","Je distingue information écrite et information illustrée."],"proofs":["Comparaison texte-image.","Justification orale."],"lsu":"Comprendre un texte."},{"code":"COM-P2-05","domain":"Compréhension de l’écrit","title":"Reformuler l’essentiel","jeSais":"Je sais redire avec mes mots ce que j’ai compris.","checklist":["Je conserve les informations importantes.","Je ne récite pas le texte.","Ma reformulation respecte le sens."],"proofs":["Reformulation orale.","Phrase-résumé."],"lsu":"Comprendre un texte."},{"code":"LIT-P2-01","domain":"Culture littéraire","title":"Reconnaître un récit d’aventure","jeSais":"Je sais reconnaître quelques caractéristiques d’un récit d’aventure.","checklist":["Je repère le héros ou les héros.","J’identifie le problème ou la quête.","Je repère des obstacles ou des péripéties."],"proofs":["Classement de textes.","Justification à partir d’un texte."],"lsu":"Devenir lecteur."},{"code":"LIT-P2-02","domain":"Culture littéraire","title":"Présenter une lecture personnelle","jeSais":"Je sais présenter un livre et donner envie ou non de le lire.","checklist":["Je donne le titre et l’auteur si je les connais.","Je présente brièvement le livre.","Je donne mon avis.","Je justifie mon avis."],"proofs":["Présentation orale.","Carnet de lecteur."],"lsu":"Devenir lecteur."},{"code":"LEC-P3-01","domain":"Lecture et fluence","title":"Lire avec fluidité et réaliser les liaisons","jeSais":"Je sais lire sans couper inutilement les phrases et faire les liaisons appropriées.","checklist":["Je lis par groupes de sens.","Je réalise les liaisons courantes.","Je garde un rythme régulier."],"proofs":["Lecture enregistrée.","Observation en situation de lecture."],"lsu":"Lire à voix haute."},{"code":"LEC-P3-02","domain":"Lecture et fluence","title":"Lire un dialogue à plusieurs voix","jeSais":"Je sais faire entendre les différents personnages d’un dialogue.","checklist":["Je repère qui parle.","Je change ma voix si nécessaire.","Je respecte la ponctuation et le rythme."],"proofs":["Lecture dialoguée.","Petite mise en voix."],"lsu":"Lire à voix haute."},{"code":"LEC-P3-03","domain":"Lecture et fluence","title":"Améliorer sa lecture après entraînement","jeSais":"Je sais utiliser plusieurs lectures pour progresser.","checklist":["Je repère ce qui me gêne.","Je retravaille les passages difficiles.","Ma nouvelle lecture est plus précise ou plus fluide."],"proofs":["Comparaison entre une première et une dernière lecture."],"lsu":"Lire à voix haute."},{"code":"COM-P3-01","domain":"Compréhension de l’écrit","title":"Distinguer l’essentiel des détails","jeSais":"Je sais repérer les informations indispensables pour comprendre un texte.","checklist":["Je repère de qui ou de quoi parle le texte.","Je trouve les événements ou idées principales.","Je laisse de côté les détails secondaires quand je résume."],"proofs":["Choix d’informations essentielles.","Recherche d’un titre.","Résumé."],"lsu":"Comprendre un texte."},{"code":"COM-P3-02","domain":"Compréhension de l’écrit","title":"Produire une inférence simple","jeSais":"Je sais comprendre une information qui n’est pas écrite directement.","checklist":["Je cherche les indices du texte.","J’utilise ce que je connais.","J’en déduis une information.","J’explique mon raisonnement."],"proofs":["Mini-textes implicites.","Question « Comment le sais-tu ? »."],"lsu":"Comprendre un texte."},{"code":"COM-P3-03","domain":"Compréhension de l’écrit","title":"Justifier avec plusieurs indices","jeSais":"Je sais rapprocher plusieurs indices pour expliquer une réponse.","checklist":["Je trouve au moins deux informations utiles.","Je les mets en relation.","J’explique ce qu’elles me permettent de comprendre."],"proofs":["Réponses argumentées.","Surlignage de plusieurs indices."],"lsu":"Comprendre un texte."},{"code":"COM-P3-04","domain":"Compréhension de l’écrit","title":"Comprendre l’organisation d’un texte documentaire","jeSais":"Je sais utiliser l’organisation d’un documentaire pour mieux le comprendre.","checklist":["J’utilise le titre.","Je regarde les sous-titres.","Je repère les paragraphes.","J’utilise les images, légendes ou encadrés."],"proofs":["Recherche documentaire.","Questions ciblées."],"lsu":"Comprendre un texte."},{"code":"LIT-P3-01","domain":"Culture littéraire","title":"Reconnaître mythe et légende","jeSais":"Je sais reconnaître quelques caractéristiques d’un mythe ou d’une légende.","checklist":["Je repère des personnages extraordinaires ou fondateurs.","Je reconnais des éléments merveilleux ou symboliques.","Je peux rapprocher le texte d’autres récits connus."],"proofs":["Comparaison de textes.","Classement de textes."],"lsu":"Devenir lecteur."},{"code":"LIT-P3-02","domain":"Culture littéraire","title":"Mettre des œuvres en réseau","jeSais":"Je sais trouver des liens entre plusieurs œuvres.","checklist":["Je compare les personnages, thèmes ou situations.","Je repère des ressemblances et des différences.","J’explique le lien que j’ai trouvé."],"proofs":["Carnet de lecteur.","Réseau de lectures.","Présentation orale."],"lsu":"Devenir lecteur."},{"code":"LEC-P4-01","domain":"Lecture et fluence","title":"Adapter sa lecture à un texte documentaire","jeSais":"Je sais utiliser l’organisation d’un documentaire pour le lire efficacement.","checklist":["Je ne lis pas forcément tout dans l’ordre.","Je repère les titres et sous-titres.","Je consulte les légendes et illustrations.","Je retrouve rapidement une information."],"proofs":["Recherche documentaire.","Lecture ciblée."],"lsu":"Lire et comprendre des textes."},{"code":"LEC-P4-02","domain":"Lecture et fluence","title":"Lire une scène de théâtre avec expressivité","jeSais":"Je sais faire vivre un personnage lorsque je lis du théâtre.","checklist":["Je repère les répliques.","Je respecte les indications utiles.","J’utilise ma voix pour incarner le personnage.","Je fais entendre la ponctuation."],"proofs":["Scène lue ou jouée.","Lecture en groupe."],"lsu":"Lire à voix haute."},{"code":"COM-P4-01","domain":"Compréhension de l’écrit","title":"Comprendre une information implicite","jeSais":"Je sais comprendre ce que le texte fait comprendre sans le dire directement.","checklist":["Je repère les indices.","Je mobilise mes connaissances.","Je vérifie mon interprétation.","Je peux l’expliquer."],"proofs":["Textes courts à implicite.","Justification de l’interprétation."],"lsu":"Comprendre un texte."},{"code":"COM-P4-02","domain":"Compréhension de l’écrit","title":"Comprendre les intentions et les émotions des personnages","jeSais":"Je sais expliquer ce qu’un personnage ressent et ce qu’il cherche à faire.","checklist":["Je repère ses paroles ou ses actions.","Je repère les réactions des autres.","Je formule une émotion ou une intention.","Je la justifie."],"proofs":["Portrait psychologique.","Question ouverte justifiée."],"lsu":"Comprendre un texte."},{"code":"COM-P4-03","domain":"Compréhension de l’écrit","title":"Repérer causes et conséquences","jeSais":"Je sais expliquer pourquoi quelque chose arrive et ce que cela provoque.","checklist":["Je repère l’événement.","Je cherche sa cause.","Je trouve sa conséquence.","Je peux utiliser « parce que », « donc » ou « à cause de »."],"proofs":["Schéma cause-conséquence.","Questions de compréhension."],"lsu":"Comprendre un texte."},{"code":"COM-P4-04","domain":"Compréhension de l’écrit","title":"Résumer un texte","jeSais":"Je sais raconter ou expliquer un texte plus brièvement en gardant l’essentiel.","checklist":["Je retire les détails secondaires.","Je garde les événements ou idées importants.","Je respecte l’ordre et le sens.","Mon résumé est beaucoup plus court que le texte."],"proofs":["Résumé oral.","Résumé court écrit."],"lsu":"Comprendre un texte."},{"code":"LIT-P4-01","domain":"Culture littéraire","title":"Reconnaître et lire un poème","jeSais":"Je sais reconnaître un poème et le mettre en voix.","checklist":["Je repère sa présentation particulière.","Je respecte les vers et la ponctuation.","Je cherche une manière expressive de le lire."],"proofs":["Lecture de poésie.","Récitation ou mise en voix."],"lsu":"Devenir lecteur."},{"code":"LIT-P4-02","domain":"Culture littéraire","title":"Reconnaître le théâtre","jeSais":"Je sais reconnaître les principales caractéristiques d’un texte théâtral.","checklist":["Je repère les personnages.","Je repère les répliques.","Je distingue les paroles et les indications de mise en scène."],"proofs":["Identification dans un extrait.","Comparaison récit-théâtre."],"lsu":"Devenir lecteur."},{"code":"LEC-P5-01","domain":"Lecture et fluence","title":"Lire seul avec exactitude et fluidité","jeSais":"Je sais découvrir seul un nouveau texte adapté au CE2 et le lire avec fluidité.","checklist":["Je décode les mots nouveaux.","Je reconnais rapidement les mots connus.","Je respecte les groupes de sens.","Je comprends suffisamment pour poursuivre seul."],"proofs":["Lecture d’un texte inédit.","Lecture autonome."],"lsu":"Identifier les mots et lire à voix haute."},{"code":"LEC-P5-02","domain":"Lecture et fluence","title":"Adapter sa lecture au genre du texte","jeSais":"Je sais modifier ma façon de lire selon le texte.","checklist":["Je reconnais le type ou le genre du texte.","J’adapte le rythme et l’intonation.","Je n’aborde pas de la même manière un récit, une poésie, du théâtre ou un documentaire."],"proofs":["Lectures comparées de plusieurs genres."],"lsu":"Lire à voix haute."},{"code":"COM-P5-01","domain":"Compréhension de l’écrit","title":"Choisir une stratégie lorsqu’on ne comprend pas","jeSais":"Je sais choisir quoi faire lorsque je ne comprends pas un passage.","checklist":["Je repère ce que je ne comprends pas.","Je choisis une stratégie adaptée.","J’essaie avant de demander de l’aide.","Je vérifie si j’ai mieux compris."],"proofs":["Verbalisation de la stratégie choisie.","Situation de lecture autonome."],"lsu":"Comprendre un texte."},{"code":"COM-P5-02","domain":"Compréhension de l’écrit","title":"Synthétiser plusieurs informations","jeSais":"Je sais rapprocher plusieurs informations pour construire une réponse.","checklist":["Je cherche les informations utiles.","Elles peuvent se trouver à différents endroits.","Je les mets en relation.","Je formule une réponse qui les rassemble."],"proofs":["Question de synthèse.","Lecture documentaire."],"lsu":"Comprendre un texte."},{"code":"COM-P5-03","domain":"Compréhension de l’écrit","title":"Adapter ses stratégies au type de texte","jeSais":"Je sais choisir ma manière de lire en fonction du texte et de ce que je cherche.","checklist":["J’identifie le type de texte.","Je sais ce que je cherche.","J’utilise la structure du texte.","Je modifie ma stratégie si elle ne fonctionne pas."],"proofs":["Lecture d’un récit, d’un documentaire ou d’une règle de jeu.","Tâche de recherche d’informations."],"lsu":"Comprendre un texte."},{"code":"COM-P5-04","domain":"Compréhension de l’écrit","title":"Vérifier et réparer sa compréhension","jeSais":"Je sais reconnaître que je n’ai pas compris et agir pour mieux comprendre.","checklist":["Je relis la phrase ou le paragraphe.","Je cherche un indice avant ou après.","Je vérifie à qui renvoient les pronoms.","J’utilise le contexte ou la formation du mot.","Je consulte un outil si nécessaire.","Je peux modifier ce que j’avais d’abord compris."],"proofs":["Verbalisation du raisonnement.","Texte comportant une ambiguïté.","Correction autonome."],"lsu":"Comprendre un texte."},{"code":"LIT-P5-01","domain":"Culture littéraire","title":"Présenter son parcours de lecteur","jeSais":"Je sais parler des livres que j’ai rencontrés pendant l’année et de mes préférences.","checklist":["Je cite plusieurs œuvres.","Je me souviens de quelques personnages ou thèmes.","J’exprime mes goûts.","Je justifie mes préférences."],"proofs":["Carnet de lecteur.","Bilan oral."],"lsu":"Devenir lecteur."},{"code":"LIT-P5-02","domain":"Culture littéraire","title":"Comparer plusieurs œuvres","jeSais":"Je sais établir des liens entre plusieurs livres ou textes.","checklist":["Je trouve des points communs.","Je trouve des différences.","Je compare les genres, personnages, thèmes ou univers.","J’explique mon rapprochement."],"proofs":["Réseau littéraire.","Comparaison orale ou écrite."],"lsu":"Devenir lecteur."}];
  const state={tab:'LEC', selected:null};
  const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function periodFromDate(d=new Date()){
    const ymd=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();
    if(ymd < 20261017) return 1;
    if(ymd < 20261219) return 2;
    if(ymd < 20270206) return 3;
    if(ymd < 20270403) return 4;
    return 5;
  }
  function currentPeriod(){
    const forced=Number(localStorage.getItem('hibouLectureTestPeriod')||0);
    return forced>=1&&forced<=5 ? forced : periodFromDate();
  }
  function codePeriod(code){ const m=String(code).match(/-P([1-5])-/); return m?Number(m[1]):1; }
  function currentItems(prefix){
    const p=currentPeriod();
    return ITEMS.filter(x=>x.code.startsWith(prefix+'-') && codePeriod(x.code)===p);
  }
  function iconFor(prefix){ return prefix==='LEC'?'📘':prefix==='COM'?'🔎':'📚'; }
  function labelFor(prefix){ return prefix==='LEC'?'Je lis':prefix==='COM'?'Je comprends':'Je découvre des œuvres'; }
  function inner(){ return document.getElementById('frenchPopupInnerV2348'); }

  function bindCurrentReadingOwlV25830(){
    const host=inner();
    if(!host) return;
    const owl=host.querySelector('.fr-v2348-owl');
    if(owl) bindLongPressV25830(owl);
  }

  function readingCardHTML(){
    return '<button type="button" class="fr-v25720-domain-card fr-v25763-reading-card" data-hibou-reading-card="1" onclick="openHibouReadingV25763()">'
      +'<div class="fr-v25720-domain-icon">📖</div>'
      +'<div class="fr-v25720-domain-title">Lecture &amp; compréhension</div>'
      +'<div class="fr-v25720-domain-desc">Lire, comprendre, interpréter, découvrir des œuvres</div>'
      +'<div class="fr-v25720-domain-arrow">›</div></button>';
  }
  function ensureCard(){
    const grid=document.querySelector('#frenchTrainingOverlayV2348 .fr-v25720-domain-grid');
    if(!grid || grid.querySelector('[data-hibou-reading-card]')) return;
    grid.insertAdjacentHTML('beforeend', readingCardHTML());
  }

  function titleBlock(){
    return '<div class="fr-v2348-header"><div class="fr-v2348-owl">🦉</div><div class="fr-v2348-title">'
      +'<h2>📖 Lecture &amp; compréhension</h2><p>Choisis une activité liée à la progression de la classe.</p>'
      +'<div class="fr-v23411-grammar-note">Même référentiel que Progressions CE2 · période '+currentPeriod()+'.</div></div></div>';
  }
  function renderHome(){
    const host=inner(); if(!host) return;
    const tabs=['LEC','COM','LIT'].map(k=>'<button type="button" class="fr-v25763-tab '+(state.tab===k?'active':'')+'" onclick="selectHibouReadingTabV25763(\''+k+'\')">'+iconFor(k)+' '+labelFor(k)+'</button>').join('');
    const list=currentItems(state.tab).map(x=>'<button type="button" class="fr-v25763-item" aria-label="Ouvrir '+esc(x.title)+'" onclick="openHibouReadingMissionV25763(\''+esc(x.code)+'\')">'
      +'<div class="fr-v25763-item-icon">'+iconFor(state.tab)+'</div>'
      +'<div class="fr-v25763-item-main"><strong>'+esc(x.title)+'</strong><span>'+esc(x.jeSais)+'</span></div>'
      +'<span class="fr-v25763-go" aria-hidden="true">›</span></button>').join('');
    host.innerHTML=titleBlock()+'<div class="fr-v2348-content"><section class="fr-v2348-panel"><div class="fr-v25763-shell">'
      +'<div class="fr-v25763-head"><button type="button" class="fr-v25763-back" onclick="renderFrenchDomainMenuV25720()">← Menu Français</button><span class="fr-v25763-period">Période '+currentPeriod()+'</span></div>'
      +'<div class="fr-v25763-tabs">'+tabs+'</div><div class="fr-v25763-list">'+(list||'<div class="fr-v2348-note">Aucune activité pour cette période.</div>')+'</div>'
      +'</div></section></div>';
    requestAnimationFrame(bindCurrentReadingOwlV25830);
  }
  function renderMission(code){
    const x=ITEMS.find(i=>i.code===code); if(!x) return renderHome(); state.selected=x;
    try{
      if(window.hibouLearningEngineV25822 && window.HIBOU_LEARNING_ACTIVITIES && window.HIBOU_LEARNING_ACTIVITIES[code]){
        if(window.hibouLearningEngineV25822.open(code)) return;
      }
    }catch(e){}
    const steps=(x.checklist||[]).slice(0,5).map((s,i)=>'<li><strong>'+(i+1)+'.</strong> '+esc(s)+'</li>').join('');
    const proof=(x.proofs&&x.proofs[0]) ? '<div class="fr-v2348-note" style="margin-top:12px"><strong>Pour montrer que tu sais faire :</strong> '+esc(x.proofs[0])+'</div>' : '';
    const host=inner(); if(!host) return;
    host.innerHTML=titleBlock()+'<div class="fr-v2348-content"><section class="fr-v2348-panel"><div class="fr-v25763-shell">'
      +'<div class="fr-v25763-head"><button type="button" class="fr-v25763-back" onclick="openHibouReadingV25763()">← Retour</button><span class="fr-v25763-period">'+iconFor(x.code.slice(0,3))+' Période '+codePeriod(x.code)+'</span></div>'
      +'<div class="fr-v25763-mission"><h3>'+esc(x.title)+'</h3><div class="fr-v25763-je-sais">🎯 '+esc(x.jeSais)+'</div>'
      +'<ul class="fr-v25763-steps">'+steps+'</ul>'+proof
      +'<div class="fr-v25763-actions"><button type="button" class="fr-v25763-action" onclick="finishHibouReadingMissionV25763(\''+esc(x.code)+'\')">✅ J’ai fait l’activité</button>'
      +'<button type="button" class="fr-v25763-action secondary" onclick="openHibouReadingV25763()">Choisir une autre activité</button></div></div>'
      +'</div></section></div>';
    requestAnimationFrame(bindCurrentReadingOwlV25830);
  }
  window.openHibouReadingV25763=function(){ state.selected=null; renderHome(); };
  window.selectHibouReadingTabV25763=function(tab){ if(['LEC','COM','LIT'].includes(tab)){state.tab=tab;renderHome();} };
  window.openHibouReadingMissionV25763=renderMission;
  window.finishHibouReadingMissionV25763=function(code){
    const x=ITEMS.find(i=>i.code===code); if(!x) return;
    const testMode=Number(localStorage.getItem('hibouLectureTestPeriod')||0)>=1;
    try{
      if(testMode){
        /* V25.8.30 : test enseignant, aucune trace élève. */
      } else if(window.hibouFrenchTrackV25717) window.hibouFrenchTrackV25717({
        type:'activite_lecture_terminee', domaine:'Lecture & compréhension', titre:x.title,
        detail:code+' — '+x.jeSais, source:'lecture_46_codes'
      });
      else if(window.hibouRecordTrainingSuccessV25221) window.hibouRecordTrainingSuccessV25221('français', x.title, code);
    }catch(e){}
    const host=inner(); if(host){
      const btn=host.querySelector('.fr-v25763-action'); if(btn){btn.textContent='✅ Activité terminée';btn.disabled=true;}
      const mission=host.querySelector('.fr-v25763-mission');
      if(mission) mission.insertAdjacentHTML('beforeend','<div class="fr-v2348-feedback" style="margin-top:12px">'+(testMode?'🧪 Test enseignant terminé — aucune trace élève enregistrée.':'🦉 Bravo ! Cette activité est ajoutée à ton parcours récent.')+'</div>');
    }
  };
  /* V25.8.30 — Mode test enseignant Français : appui long 3 s sur le hibou. */
  const TEST_KEY='hibouLectureTestPeriod';
  let teacherHoldTimer=null;

  function forcedTestPeriod(){
    const p=Number(localStorage.getItem(TEST_KEY)||0);
    return p>=1&&p<=5?p:0;
  }
  function isFrenchTestMode(){ return forcedTestPeriod()>0; }

  function closeFrenchTeacherTestV25830(){
    const ov=document.getElementById('hibouFrenchTeacherTestOverlayV25830');
    if(ov){
      ov.classList.add('hidden');
      ov.setAttribute('aria-hidden','true');
      ov.style.pointerEvents='none';
    }
  }

  function refreshTeacherTestPopupV25830(){
    const ov=document.getElementById('hibouFrenchTeacherTestOverlayV25830');
    if(!ov) return;
    const p=forcedTestPeriod();
    ov.querySelectorAll('[data-fr-test-period]').forEach(btn=>{
      const n=Number(btn.getAttribute('data-fr-test-period')||0);
      const active=(p===0&&n===0)||(p===n);
      btn.classList.toggle('active',active);
      btn.setAttribute('aria-pressed',active?'true':'false');
    });
    const status=ov.querySelector('[data-fr-test-status]');
    if(status) status.textContent=p
      ? 'Période test active : P'+p+' · aucune trace élève ne sera enregistrée.'
      : 'Mode automatique : la période réelle de la classe est utilisée.';
  }

  function setFrenchTeacherTestPeriodV25830(period){
    const p=Number(period)||0;
    if(p>=1&&p<=5) localStorage.setItem(TEST_KEY,String(p));
    else localStorage.removeItem(TEST_KEY);
    refreshTeacherTestPopupV25830();
    enhanceFrenchTestUIV25830();
    try{
      const host=inner();
      if(host&&host.querySelector('.fr-v25763-shell')) renderHome();
    }catch(e){}
  }

  function ensureFrenchTeacherTestOverlayV25830(){
    let ov=document.getElementById('hibouFrenchTeacherTestOverlayV25830');
    if(ov) return ov;
    ov=document.createElement('div');
    ov.id='hibouFrenchTeacherTestOverlayV25830';
    ov.className='hibou-fr-test-overlay-v25830 hidden';
    ov.innerHTML=
      '<div class="hibou-fr-test-popup-v25830" role="dialog" aria-modal="true" aria-labelledby="hibouFrTestTitleV25830">'
      +'<div class="hibou-fr-test-head-v25830"><div><span>🧪</span><strong id="hibouFrTestTitleV25830">Test enseignant — Français</strong></div><button type="button" class="hibou-fr-test-close-v25830" aria-label="Fermer">×</button></div>'
      +'<p class="hibou-fr-test-intro-v25830">Choisis la période à afficher dans <strong>Lecture &amp; compréhension</strong>.</p>'
      +'<div class="hibou-fr-test-periods-v25830">'
      +'<button type="button" data-fr-test-period="0">Automatique</button>'
      +'<button type="button" data-fr-test-period="1">P1</button>'
      +'<button type="button" data-fr-test-period="2">P2</button>'
      +'<button type="button" data-fr-test-period="3">P3</button>'
      +'<button type="button" data-fr-test-period="4">P4</button>'
      +'<button type="button" data-fr-test-period="5">P5</button>'
      +'</div><div class="hibou-fr-test-status-v25830" data-fr-test-status></div>'
      +'<div class="hibou-fr-test-note-v25830">🔒 Ce réglage est local à cet appareil. Il ne modifie ni la période scolaire réelle ni le parcours des élèves.</div>'
      +'</div>';
    document.documentElement.appendChild(ov);
    ov.addEventListener('click',ev=>{if(ev.target===ov)closeFrenchTeacherTestV25830();});
    ov.querySelector('.hibou-fr-test-close-v25830').addEventListener('click',ev=>{
      ev.preventDefault();ev.stopPropagation();closeFrenchTeacherTestV25830();
    });
    ov.querySelector('.hibou-fr-test-close-v25830').addEventListener('pointerup',ev=>{
      ev.preventDefault();ev.stopPropagation();closeFrenchTeacherTestV25830();
    });
    ov.querySelectorAll('[data-fr-test-period]').forEach(btn=>{
      btn.addEventListener('click',()=>setFrenchTeacherTestPeriodV25830(Number(btn.getAttribute('data-fr-test-period')||0)));
    });
    return ov;
  }

  function openFrenchTeacherTestV25830(){
    const ov=ensureFrenchTeacherTestOverlayV25830();
    refreshTeacherTestPopupV25830();
    ov.classList.remove('hidden');
    ov.setAttribute('aria-hidden','false');
    ov.style.pointerEvents='auto';
    ov.style.zIndex='2147483646';
    const closeBtn=ov.querySelector('.hibou-fr-test-close-v25830');
    if(closeBtn){ try{ closeBtn.focus({preventScroll:true}); }catch(e){ closeBtn.focus(); } }
  }

  function cancelHoldV25830(){
    if(teacherHoldTimer){clearTimeout(teacherHoldTimer);teacherHoldTimer=null;}
  }

  function bindLongPressV25830(owl){
    if(!owl||owl.dataset.frTeacherHoldV25830==='1')return;
    owl.dataset.frTeacherHoldV25830='1';
    owl.addEventListener('contextmenu',ev=>ev.preventDefault());
    const start=ev=>{
      if(ev.pointerType==='mouse'&&ev.button!==0)return;
      cancelHoldV25830();
      owl.classList.add('hibou-fr-secret-hold-v25830');
      teacherHoldTimer=setTimeout(()=>{
        teacherHoldTimer=null;
        owl.classList.remove('hibou-fr-secret-hold-v25830');
        try{navigator.vibrate&&navigator.vibrate(40);}catch(e){}
        openFrenchTeacherTestV25830();
      },3000);
    };
    const cancel=()=>{
      cancelHoldV25830();
      owl.classList.remove('hibou-fr-secret-hold-v25830');
    };
    owl.addEventListener('pointerdown',start);
    ['pointerup','pointercancel','pointerleave'].forEach(evt=>owl.addEventListener(evt,cancel));
  }

  function enhanceFrenchTestUIV25830(){
    const french=document.getElementById('frenchTrainingOverlayV2348');
    if(!french)return;

    /* Bind both the main Français owl and the owl recreated in Lecture & compréhension. */
    french.querySelectorAll('.fr-v2348-owl').forEach(bindLongPressV25830);
    bindCurrentReadingOwlV25830();

    /* V25.8.30 : le mode test reste entièrement invisible dans les vues élèves. */
    french.querySelectorAll('.hibou-fr-test-badge-v25830,.hibou-fr-test-badge-v25827,.hibou-fr-test-badge-v25826,.hibou-fr-test-badge-v25822')
      .forEach(el=>el.remove());
  }

  window.openFrenchTeacherTestV25830=openFrenchTeacherTestV25830;
  window.openFrenchTeacherTestV25829=openFrenchTeacherTestV25830;
  window.openFrenchTeacherTestV25828=openFrenchTeacherTestV25830;
  window.openFrenchTeacherTestV25827=openFrenchTeacherTestV25830;
  window.openFrenchTeacherTestV25826=openFrenchTeacherTestV25830;
  window.openFrenchTeacherTestV25822=openFrenchTeacherTestV25830;
  window.closeFrenchTeacherTestV25830=closeFrenchTeacherTestV25830;
  window.closeFrenchTeacherTestV25829=closeFrenchTeacherTestV25830;
  window.closeFrenchTeacherTestV25828=closeFrenchTeacherTestV25830;
  window.closeFrenchTeacherTestV25827=closeFrenchTeacherTestV25830;
  window.closeFrenchTeacherTestV25826=closeFrenchTeacherTestV25830;
  window.closeFrenchTeacherTestV25822=closeFrenchTeacherTestV25830;
  window.setFrenchTeacherTestPeriodV25830=setFrenchTeacherTestPeriodV25830;
  window.isHibouFrenchTestModeV25830=isFrenchTestMode;

  window.HIBOU_LECTURE_46={items:ITEMS,currentPeriod,periodFromDate,isTestMode:isFrenchTestMode,forcedTestPeriod};

  let uiRefreshQueuedV25830=false;
  function scheduleFrenchUiRefreshV25830(){
    if(uiRefreshQueuedV25830)return;
    uiRefreshQueuedV25830=true;
    requestAnimationFrame(()=>{
      uiRefreshQueuedV25830=false;
      ensureCard();
      enhanceFrenchTestUIV25830();
    });
  }
  const obs=new MutationObserver(mutations=>{
    /* Ignore mutations created inside the test badge/popup themselves. */
    const relevant=mutations.some(m=>{
      const t=m.target && (m.target.nodeType===1?m.target:m.target.parentElement);
      return !(t && (t.closest?.('.hibou-fr-test-overlay-v25830')));
    });
    if(relevant)scheduleFrenchUiRefreshV25830();
  });
  obs.observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener('keydown',ev=>{if(ev.key==='Escape')closeFrenchTeacherTestV25830();});

  function initV25830(){ensureCard();enhanceFrenchTestUIV25830();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initV25830,{once:true});else initV25830();
  [200,600,1200,2200].forEach(ms=>setTimeout(initV25830,ms));
})();
