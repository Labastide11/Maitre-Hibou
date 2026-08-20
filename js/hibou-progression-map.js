(function(){
  'use strict';
  const normalize=value=>String(value||'').trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[’']/g,' ').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();

  const rows=[
    // Grammaire
    {domain:'francais',codes:['GRA-P1-02','GRA-P1-03'], title:'Phrase affirmative ou négative', aliases:['Phrase affirmative / négative','Reconnaître une phrase affirmative ou négative','Forme affirmative et négative','grammaire_blanche_phrase_negative','Grammaire ceinture blanche']},
    {domain:'francais',codes:['GRA-P1-04'], title:'Le verbe conjugué', aliases:['Trouver le verbe','Repérer le verbe conjugué','Je reconnais un verbe','grammaire_jaune_verbe','Grammaire ceinture jaune']},
    {domain:'francais',codes:['GRA-P1-06'], title:'Le sujet du verbe', aliases:['Trouver le sujet','Repérer le groupe sujet','grammaire_orange_sujet','Grammaire ceinture orange']},
    {domain:'francais',codes:['GRA-P2-01'], title:'Le nom commun', aliases:['Reconnaître un nom','Reconnaître un nom commun','Je reconnais un nom commun','grammaire_verte_nom','Grammaire ceinture verte']},
    {domain:'francais',codes:['GRA-P3-01'], title:'Le déterminant', aliases:['Reconnaître un déterminant','Identifier le déterminant','grammaire_bleue_determinant','Grammaire ceinture bleue']},
    {domain:'francais',codes:['GRA-P1-05'], title:'L’infinitif du verbe', aliases:['Trouver l’infinitif','Donner l’infinitif','grammaire_marron_infinitif','Grammaire ceinture marron']},
    {domain:'francais',codes:['GRA-P3-02'], title:'L’adjectif', aliases:['Reconnaître un adjectif','Identifier l’adjectif','grammaire_noire_adjectif','Grammaire ceinture noire']},
    {domain:'francais',codes:['GRA-P3-03'], title:'Le groupe nominal', aliases:['Reconnaître le groupe nominal','Identifier le groupe nominal','grammaire_rouge_groupe_nominal','Grammaire ceinture rouge']},

    // Référentiel commun Lecture / compréhension / littérature
    {domain:'francais',codes:["LEC-P1-01"], title:"Décoder un mot inconnu", aliases:["Décoder un mot inconnu", "Je sais lire un mot que je n’ai jamais rencontré."]},
    {domain:'francais',codes:["LEC-P1-02"], title:"Reconnaître rapidement les mots fréquents", aliases:["Reconnaître rapidement les mots fréquents", "Je sais lire immédiatement les mots que je rencontre souvent."]},
    {domain:'francais',codes:["LEC-P1-03"], title:"Lire par groupes de sens", aliases:["Lire par groupes de sens", "Je sais regrouper les mots qui vont ensemble quand je lis."]},
    {domain:'francais',codes:["LEC-P1-04"], title:"Respecter la ponctuation", aliases:["Respecter la ponctuation", "Je sais utiliser la ponctuation pour guider ma lecture."]},
    {domain:'francais',codes:["COM-P1-01"], title:"Identifier les personnages", aliases:["Identifier les personnages", "Je sais dire qui sont les personnages d’un récit."]},
    {domain:'francais',codes:["COM-P1-02"], title:"Repérer le lieu et le moment", aliases:["Repérer le lieu et le moment", "Je sais dire où et quand se déroule une histoire lorsque le texte permet de le savoir."]},
    {domain:'francais',codes:["COM-P1-03"], title:"Ordonner les événements", aliases:["Ordonner les événements", "Je sais remettre les moments importants d’une histoire dans l’ordre."]},
    {domain:'francais',codes:["COM-P1-04"], title:"Retrouver une information explicite", aliases:["Retrouver une information explicite", "Je sais retrouver dans le texte une information qui est écrite."]},
    {domain:'francais',codes:["COM-P1-05"], title:"Justifier avec un indice du texte", aliases:["Justifier avec un indice du texte", "Je sais montrer ce qui, dans le texte, me permet de répondre."]},
    {domain:'francais',codes:["LIT-P1-01"], title:"Entrer dans son parcours de lecteur", aliases:["Entrer dans son parcours de lecteur", "Je sais parler simplement d’un livre que j’ai lu ou entendu."]},
    {domain:'francais',codes:["LEC-P2-01"], title:"Lire avec exactitude", aliases:["Lire avec exactitude", "Je sais lire un texte en faisant peu d’erreurs."]},
    {domain:'francais',codes:["LEC-P2-02"], title:"Maintenir une lecture régulière", aliases:["Maintenir une lecture régulière", "Je sais lire avec un rythme régulier."]},
    {domain:'francais',codes:["LEC-P2-03"], title:"Préparer une lecture à voix haute", aliases:["Préparer une lecture à voix haute", "Je sais préparer un texte avant de le lire à quelqu’un."]},
    {domain:'francais',codes:["LEC-P2-04"], title:"Adapter sa voix au sens", aliases:["Adapter sa voix au sens", "Je sais utiliser ma voix pour faire entendre le sens du texte."]},
    {domain:'francais',codes:["COM-P2-01"], title:"Comprendre un mot grâce au contexte ou à sa formation", aliases:["Comprendre un mot grâce au contexte ou à sa formation", "Je sais chercher le sens d’un mot inconnu à partir du texte et du mot lui-même."]},
    {domain:'francais',codes:["COM-P2-02"], title:"Identifier le référent d’un pronom", aliases:["Identifier le référent d’un pronom", "Je sais retrouver qui ou quoi est désigné par un pronom."]},
    {domain:'francais',codes:["COM-P2-03"], title:"Identifier les reprises nominales", aliases:["Identifier les reprises nominales", "Je sais comprendre que plusieurs expressions peuvent désigner le même personnage ou la même chose."]},
    {domain:'francais',codes:["COM-P2-04"], title:"Mettre en relation texte et illustration", aliases:["Mettre en relation texte et illustration", "Je sais utiliser l’illustration pour compléter ce que je comprends du texte."]},
    {domain:'francais',codes:["COM-P2-05"], title:"Reformuler l’essentiel", aliases:["Reformuler l’essentiel", "Je sais redire avec mes mots ce que j’ai compris."]},
    {domain:'francais',codes:["LIT-P2-01"], title:"Reconnaître un récit d’aventure", aliases:["Reconnaître un récit d’aventure", "Je sais reconnaître quelques caractéristiques d’un récit d’aventure."]},
    {domain:'francais',codes:["LIT-P2-02"], title:"Présenter une lecture personnelle", aliases:["Présenter une lecture personnelle", "Je sais présenter un livre et donner envie ou non de le lire."]},
    {domain:'francais',codes:["LEC-P3-01"], title:"Lire avec fluidité et réaliser les liaisons", aliases:["Lire avec fluidité et réaliser les liaisons", "Je sais lire sans couper inutilement les phrases et faire les liaisons appropriées."]},
    {domain:'francais',codes:["LEC-P3-02"], title:"Lire un dialogue à plusieurs voix", aliases:["Lire un dialogue à plusieurs voix", "Je sais faire entendre les différents personnages d’un dialogue."]},
    {domain:'francais',codes:["LEC-P3-03"], title:"Améliorer sa lecture après entraînement", aliases:["Améliorer sa lecture après entraînement", "Je sais utiliser plusieurs lectures pour progresser."]},
    {domain:'francais',codes:["COM-P3-01"], title:"Distinguer l’essentiel des détails", aliases:["Distinguer l’essentiel des détails", "Je sais repérer les informations indispensables pour comprendre un texte."]},
    {domain:'francais',codes:["COM-P3-02"], title:"Produire une inférence simple", aliases:["Produire une inférence simple", "Je sais comprendre une information qui n’est pas écrite directement."]},
    {domain:'francais',codes:["COM-P3-03"], title:"Justifier avec plusieurs indices", aliases:["Justifier avec plusieurs indices", "Je sais rapprocher plusieurs indices pour expliquer une réponse."]},
    {domain:'francais',codes:["COM-P3-04"], title:"Comprendre l’organisation d’un texte documentaire", aliases:["Comprendre l’organisation d’un texte documentaire", "Je sais utiliser l’organisation d’un documentaire pour mieux le comprendre."]},
    {domain:'francais',codes:["LIT-P3-01"], title:"Reconnaître mythe et légende", aliases:["Reconnaître mythe et légende", "Je sais reconnaître quelques caractéristiques d’un mythe ou d’une légende."]},
    {domain:'francais',codes:["LIT-P3-02"], title:"Mettre des œuvres en réseau", aliases:["Mettre des œuvres en réseau", "Je sais trouver des liens entre plusieurs œuvres."]},
    {domain:'francais',codes:["LEC-P4-01"], title:"Adapter sa lecture à un texte documentaire", aliases:["Adapter sa lecture à un texte documentaire", "Je sais utiliser l’organisation d’un documentaire pour le lire efficacement."]},
    {domain:'francais',codes:["LEC-P4-02"], title:"Lire une scène de théâtre avec expressivité", aliases:["Lire une scène de théâtre avec expressivité", "Je sais faire vivre un personnage lorsque je lis du théâtre."]},
    {domain:'francais',codes:["COM-P4-01"], title:"Comprendre une information implicite", aliases:["Comprendre une information implicite", "Je sais comprendre ce que le texte fait comprendre sans le dire directement."]},
    {domain:'francais',codes:["COM-P4-02"], title:"Comprendre les intentions et les émotions des personnages", aliases:["Comprendre les intentions et les émotions des personnages", "Je sais expliquer ce qu’un personnage ressent et ce qu’il cherche à faire."]},
    {domain:'francais',codes:["COM-P4-03"], title:"Repérer causes et conséquences", aliases:["Repérer causes et conséquences", "Je sais expliquer pourquoi quelque chose arrive et ce que cela provoque."]},
    {domain:'francais',codes:["COM-P4-04"], title:"Résumer un texte", aliases:["Résumer un texte", "Je sais raconter ou expliquer un texte plus brièvement en gardant l’essentiel."]},
    {domain:'francais',codes:["LIT-P4-01"], title:"Reconnaître et lire un poème", aliases:["Reconnaître et lire un poème", "Je sais reconnaître un poème et le mettre en voix."]},
    {domain:'francais',codes:["LIT-P4-02"], title:"Reconnaître le théâtre", aliases:["Reconnaître le théâtre", "Je sais reconnaître les principales caractéristiques d’un texte théâtral."]},
    {domain:'francais',codes:["LEC-P5-01"], title:"Lire seul avec exactitude et fluidité", aliases:["Lire seul avec exactitude et fluidité", "Je sais découvrir seul un nouveau texte adapté au CE2 et le lire avec fluidité."]},
    {domain:'francais',codes:["LEC-P5-02"], title:"Adapter sa lecture au genre du texte", aliases:["Adapter sa lecture au genre du texte", "Je sais modifier ma façon de lire selon le texte."]},
    {domain:'francais',codes:["COM-P5-01"], title:"Choisir une stratégie lorsqu’on ne comprend pas", aliases:["Choisir une stratégie lorsqu’on ne comprend pas", "Je sais choisir quoi faire lorsque je ne comprends pas un passage."]},
    {domain:'francais',codes:["COM-P5-02"], title:"Synthétiser plusieurs informations", aliases:["Synthétiser plusieurs informations", "Je sais rapprocher plusieurs informations pour construire une réponse."]},
    {domain:'francais',codes:["COM-P5-03"], title:"Adapter ses stratégies au type de texte", aliases:["Adapter ses stratégies au type de texte", "Je sais choisir ma manière de lire en fonction du texte et de ce que je cherche."]},
    {domain:'francais',codes:["COM-P5-04"], title:"Vérifier et réparer sa compréhension", aliases:["Vérifier et réparer sa compréhension", "Je sais reconnaître que je n’ai pas compris et agir pour mieux comprendre."]},
    {domain:'francais',codes:["LIT-P5-01"], title:"Présenter son parcours de lecteur", aliases:["Présenter son parcours de lecteur", "Je sais parler des livres que j’ai rencontrés pendant l’année et de mes préférences."]},
    {domain:'francais',codes:["LIT-P5-02"], title:"Comparer plusieurs œuvres", aliases:["Comparer plusieurs œuvres", "Je sais établir des liens entre plusieurs livres ou textes."]},

    // Calcul mental
    {domain:'maths',codes:['CAL-P1-01','CAL-P2-01'], title:'Premiers calculs', aliases:['Petits nombres','Premiers automatismes de calcul mental','maths_blanche_petits_nombres','Maths ceinture blanche','Ceinture blanche Premiers calculs','Je sais effectuer mentalement des additions et des soustractions simples reconnaître des nombres proches et utiliser les doubles et les moitiés']},
    {domain:'maths',codes:['CAL-P1-01'], title:'Dizaines entières', aliases:['Dizaines','Ajouter et retrancher des dizaines entières','Ajouter ou enlever des dizaines entières','maths_jaune_dizaines','Maths ceinture jaune','Ceinture jaune Dizaines entières']},
    {domain:'maths',codes:['CAL-P2-03'], title:'Calculs sans retenue', aliases:['Sans retenue','Additions et soustractions sans retenue','maths_orange_sans_retenue','Maths ceinture orange','Ceinture orange Calculs sans retenue']},
    {domain:'maths',codes:['CAL-P2-03','CAL-P4-02'], title:'Calculs avec retenue', aliases:['Avec retenue','Additions et soustractions avec retenue','maths_vert_clair_avec_retenue','Maths ceinture vert clair','Ceinture vert clair Calculs avec retenue']},
    {domain:'maths',codes:['CAL-P1-02'], title:'Complément à la dizaine', aliases:['Complément dizaine','Complement dizaine','Complément à la dizaine suivante','Trouver le complément à la dizaine suivante','maths_vert_fonce_complement_dizaine','Maths ceinture vert foncé','Ceinture vert foncé Complément à la dizaine']},
    {domain:'maths',codes:['CAL-P1-03'], title:'Ajouter ou retrancher 9', aliases:['Ajouter / retrancher 9','Plus ou moins 9','Plus moins 9','maths_bleu_clair_plus_moins_9','Maths ceinture bleu clair','Ceinture bleu clair Ajouter ou retrancher 9']},
    {domain:'maths',codes:['CAL-P4-02'], title:'Ajouter ou retrancher 11', aliases:['Ajouter / retrancher 11','Plus ou moins 11','Plus moins 11','maths_bleu_fonce_plus_moins_11','Maths ceinture bleu foncé','Ceinture bleu foncé Ajouter ou retrancher 11']},
    {domain:'maths',codes:['CAL-P1-01'], title:'Centaines entières', aliases:['Centaines','Ajouter et retrancher des centaines entières','maths_rose_centaines','Maths ceinture rose','Ceinture rose Centaines entières']},
    {domain:'maths',codes:['CAL-P1-02'], title:'Complément à la centaine', aliases:['Complément centaine','Complement centaine','Complément à la centaine suivante','Trouver le complément à la centaine suivante','maths_beige_complement_centaine','Maths ceinture beige','Ceinture beige Complément à la centaine']},
    {domain:'maths',codes:['CAL-P3-01'], title:'Tables de 1, 2 et 10', aliases:['Tables 1 2 10','Tables x1 x2 x10','Tables de multiplication de 1 2 et 10','maths_violet_tables_1_2_10','Maths ceinture violette','Ceinture violette Tables de 1 2 et 10']},
    {domain:'maths',codes:['CAL-P3-01'], title:'Tables de 3, 4 et 5', aliases:['Tables 3 4 5','Tables x3 x4 x5','Tables de multiplication de 3 4 et 5','maths_marron_tables_3_4_5','Maths ceinture marron','Ceinture marron Tables de 3 4 et 5']},
    {domain:'maths',codes:['CAL-P3-01'], title:'Tables de 6 et 7', aliases:['Tables 6 7','Tables x6 x7','Tables de multiplication de 6 et 7','maths_rouge_tables_6_7','Maths ceinture rouge','Ceinture rouge Tables de 6 et 7']},
    {domain:'maths',codes:['CAL-P3-01','CAL-P3-02'], title:'Tables de 8 et 9', aliases:['Tables 8 9','Tables x8 x9','Tables de multiplication de 8 et 9','maths_gris_tables_8_9','Maths ceinture grise','Ceinture grise Tables de 8 et 9']},
    {domain:'maths',codes:['CAL-P2-02'], title:'Multiplier par 10, 100 ou 1 000', aliases:['Multiplier par 10 100 1000','Multiplier par 10 100 ou 1000','maths_noir_multiplier_10_100_1000','Maths ceinture noire','Ceinture noire Multiplier par 10 100 ou 1000']}
  ];

  const byCode={};
  const byAlias={};
  rows.forEach(row=>{
    row.aliases=[row.title].concat(row.aliases||[]);
    row.codes.forEach(code=>byCode[code]=row);
    row.aliases.forEach(alias=>byAlias[normalize(alias)]=row);
  });

  const api={rows,byCode,byAlias,normalize};
  window.HIBOU_PROGRESSION=api;
  // Compatibilité avec le nom utilisé dans les versions précédentes de l'application.
  window.HIBOU_PROGRESSION_GRAMMAR=api;
})();
