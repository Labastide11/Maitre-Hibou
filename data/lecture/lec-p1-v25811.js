/* Maître Hibou V25.8.11 — contenu Lecture P1 */
(function(){
'use strict';
window.HIBOU_LEARNING_ACTIVITIES=window.HIBOU_LEARNING_ACTIVITIES||{};
// Règle pédagogique V25.8.11 :
 // pour les exercices de reconstruction, utiliser des mots dont le découpage
 // est net pour un élève de CE2 et éviter les mots pouvant prêter à discussion
 // entre syllabes orales, syllabes écrites et groupes de lettres.
window.HIBOU_LEARNING_ACTIVITIES['LEC-P1-01']={
  code:'LEC-P1-01',
  domain:'Lecture et fluence',
  title:'Décoder un mot inconnu',
  studentGoal:'Je sais lire un mot que je n’ai jamais rencontré.',
  lesson:{
    intro:'Quand je rencontre un mot nouveau, je ne devine pas. Je regarde le mot avec précision.',
    steps:[
      'J’observe toutes les lettres et les groupes de lettres.',
      'Je découpe le mot en petites parties si nécessaire.',
      'Je rassemble les parties pour lire le mot entier.',
      'Je relis le mot dans la phrase pour vérifier que ma lecture convient.'
    ],
    example:{word:'éléphant',chunks:['é','lé','phant'],sentence:'Au zoo, nous observons un éléphant.'}
  },
  guided:[
    {id:'g1',type:'order',title:'Je reconstruis le mot',prompt:'Remets les morceaux dans le bon ordre pour former « éléphant ».',items:['phant','é','lé'],answer:['é','lé','phant'],help:['Le mot commence par « é ».','Puis on lit « lé ».','La fin du mot est « phant ».'],feedback:'Très bien : é - lé - phant.'},
    {id:'g2',type:'choice',title:'Je regarde toutes les lettres',prompt:'Quel mot est exactement écrit ?',stem:'extraordinaire',choices:['extraordinaire','extraordinnnaire','extrordinaire'],answer:'extraordinaire',help:['Regarde le début : ex-tra...','Observe aussi le milieu « or-di ».','Compare lettre par lettre.'],feedback:'Oui. Tu as observé le mot avec précision.'}
  ],
  training:[
    {id:'t1',type:'chunks',title:'Je découpe pour mieux lire',prompt:'Choisis le bon découpage du mot « navigateur ».',choices:['na / vi / ga / teur','nav / iga / teur','na / vig / ate / ur'],answer:'na / vi / ga / teur',help:['Cherche des petites parties que tu peux lire facilement.','Le début se lit « na - vi ».','La fin se lit « ga - teur ».'],feedback:'Bravo : na - vi - ga - teur.'},
    {id:'t2',type:'order',title:'Je rassemble les morceaux',prompt:'Remets les morceaux dans l’ordre pour former « domino ».',items:['no','do','mi'],answer:['do','mi','no'],help:['Le mot commence par « do ».','Le milieu est « mi ».','La fin est « no ».'],feedback:'Oui : do - mi - no.'},
    {id:'t3',type:'context',title:'Je vérifie dans la phrase',prompt:'Quel mot complète correctement la phrase ?',stem:'Le chevalier enfile son ______ avant le combat.',choices:['armure','armoire','amure'],answer:'armure',help:['Lis toute la phrase.','Un chevalier porte quelque chose pour se protéger.','Relis précisément les trois mots proposés.'],feedback:'Exact. « Armure » convient au sens de la phrase et aux lettres du mot.'}
  ],
  challenge:[
    {id:'c1',type:'order',title:'Mon défi 1',prompt:'Sans aide : remets les morceaux dans l’ordre pour former « parasol ».',items:['sol','pa','ra'],answer:['pa','ra','sol'],feedback:'Bravo ! Tu as reconstruit le mot sans aide.'},
    {id:'c2',type:'choice',title:'Mon défi 2',prompt:'Sans aide : quel mot est exactement écrit dans la phrase ?',stem:'La scientifique observe le microscope.',choices:['microscope','microscoppe','microscopee'],answer:'microscope',feedback:'Bravo ! Tu as lu le mot avec précision.'}
  ]
};


/* ------------------------------------------------------------
   LEC-P1-02 — Reconnaître rapidement les mots fréquents
   ------------------------------------------------------------ */
window.HIBOU_LEARNING_ACTIVITIES['LEC-P1-02']={
  code:'LEC-P1-02',
  domain:'Lecture et fluence',
  title:'Reconnaître rapidement les mots fréquents',
  studentGoal:'Je sais lire immédiatement les mots que je rencontre souvent.',
  lesson:{
    intro:'Certains mots reviennent très souvent. Plus je les reconnais vite, plus ma lecture devient fluide.',
    steps:[
      'Je regarde le mot en entier.',
      'Je le reconnais sans avoir besoin de le découper.',
      'Je vérifie qu’il s’agit exactement du bon mot.',
      'Je relis la phrase sans m’arrêter sur ce mot.'
    ],
    example:{word:'dans',chunks:['dans'],sentence:'Le chat dort dans son panier.'}
  },
  guided:[
    {id:'g1',type:'multi',title:'Je repère un mot fréquent',prompt:'Touche toutes les fois où tu vois le mot « dans ».',items:['dans','avec','dans','pour','dans','sans'],answers:['dans','dans','dans'],help:['Regarde la première lettre.','Le mot se termine par « ns ».','Il faut trouver exactement « dans ».'],feedback:'Bravo ! Tu as retrouvé toutes les occurrences de « dans ».'},
    {id:'g2',type:'choice',title:'Je reconnais le mot entier',prompt:'Quel mot est écrit ?',stem:'toujours',choices:['toujours','tous jours','toujour'],answer:'toujours',help:['Regarde le mot en entier.','Il commence par « tou ».','Il se termine par « jours ».'],feedback:'Oui : « toujours ». Tu l’as reconnu sans le déformer.'}
  ],
  training:[
    {id:'t1',type:'multi',title:'Je trouve le même mot',prompt:'Touche toutes les fois où tu vois le mot « parce ».',items:['parce','par','parce','place','parce','passe'],answers:['parce','parce','parce'],help:['Observe les lettres « par ».','Ensuite on lit « ce ».','Ne choisis que le mot exactement identique.'],feedback:'Très bien. Tu as reconnu « parce » rapidement.'},
    {id:'t2',type:'choice',title:'Je lis sans hésiter',prompt:'Quel mot complète la phrase ?',stem:'Nous allons ______ à la bibliothèque.',choices:['souvent','soufflant','suivant'],answer:'souvent',help:['Lis toute la phrase.','Cherche le mot que tu connais déjà.','Vérifie toutes les lettres.'],feedback:'Exact : « souvent ».'},
    {id:'t3',type:'multi',title:'Je reconnais des mots fréquents',prompt:'Touche seulement les mots très fréquents que tu peux lire immédiatement.',items:['avec','forêt','pour','maison','dans','girafe'],answers:['avec','pour','dans'],help:['Cherche des petits mots que tu rencontres dans beaucoup de phrases.','« avec » en fait partie.','Regarde aussi « pour » et « dans ».'],feedback:'Bravo ! Ces mots doivent devenir de plus en plus rapides à reconnaître.'}
  ],
  challenge:[
    {id:'c1',type:'multi',title:'Mon défi 1',prompt:'Sans aide : touche toutes les fois où tu vois « toujours ».',items:['toujours','tous','toujours','jour','toujours','tour'],answers:['toujours','toujours','toujours'],feedback:'Bravo ! Tu reconnais « toujours » rapidement.'},
    {id:'c2',type:'choice',title:'Mon défi 2',prompt:'Sans aide : quel mot est exactement écrit ?',stem:'pendant',choices:['pendant','pandant','pendent'],answer:'pendant',feedback:'Très bien ! Tu as reconnu le mot avec précision.'}
  ]
};

/* ------------------------------------------------------------
   LEC-P1-03 — Lire par groupes de sens
   ------------------------------------------------------------ */
window.HIBOU_LEARNING_ACTIVITIES['LEC-P1-03']={
  code:'LEC-P1-03',
  domain:'Lecture et fluence',
  title:'Lire par groupes de sens',
  studentGoal:'Je sais regrouper les mots qui vont ensemble quand je lis.',
  lesson:{
    intro:'Pour bien lire une phrase, je ne m’arrête pas après chaque mot. Je regroupe les mots qui vont ensemble.',
    steps:[
      'Je lis toute la phrase une première fois.',
      'Je cherche les mots qui forment une petite unité de sens.',
      'Je fais une courte pause entre les groupes.',
      'Je vérifie que mes pauses n’abîment pas le sens de la phrase.'
    ],
    example:{word:'Le petit chat / dort sur le canapé.',chunks:['Le petit chat','dort sur le canapé'],sentence:'Le petit chat dort sur le canapé.'}
  },
  guided:[
    {id:'g1',type:'order',title:'Je reconstruis les groupes',prompt:'Remets les groupes dans l’ordre pour retrouver la phrase.',items:['dans le jardin.','Les enfants','jouent'],answer:['Les enfants','jouent','dans le jardin.'],help:['Commence par qui fait l’action.','Ensuite cherche l’action.','Termine par le lieu.'],feedback:'Très bien : Les enfants / jouent / dans le jardin.'},
    {id:'g2',type:'choice',title:'Je choisis les bonnes pauses',prompt:'Quelle lecture respecte le mieux les groupes de sens ?',stem:'La petite fille range ses livres dans son cartable.',choices:['La petite fille / range ses livres / dans son cartable.','La petite / fille range / ses livres dans / son cartable.','La / petite fille range ses / livres dans son cartable.'],answer:'La petite fille / range ses livres / dans son cartable.',help:['Ne coupe pas « la petite fille ».','Garde ensemble « dans son cartable ».','Cherche une lecture qui reste naturelle.'],feedback:'Oui. Les groupes correspondent bien au sens de la phrase.'}
  ],
  training:[
    {id:'t1',type:'order',title:'Je lis en groupes',prompt:'Remets les groupes dans l’ordre.',items:['près de la rivière.','Un héron','reste immobile'],answer:['Un héron','reste immobile','près de la rivière.'],help:['Commence par le personnage ou l’animal.','Puis l’action.','Termine par le lieu.'],feedback:'Exact : Un héron / reste immobile / près de la rivière.'},
    {id:'t2',type:'choice',title:'Je garde les mots ensemble',prompt:'Quelle lecture est la plus naturelle ?',stem:'Mon frère prépare un gâteau au chocolat.',choices:['Mon frère / prépare un gâteau / au chocolat.','Mon / frère prépare / un gâteau au / chocolat.','Mon frère prépare / un / gâteau au chocolat.'],answer:'Mon frère / prépare un gâteau / au chocolat.',help:['« Mon frère » forme un groupe.','« au chocolat » reste ensemble.','Évite les pauses au milieu d’un groupe.'],feedback:'Bravo. Tes pauses aident à comprendre la phrase.'},
    {id:'t3',type:'order',title:'Je reconstruis une phrase',prompt:'Remets les groupes dans l’ordre.',items:['ouvre doucement','la porte.','La maîtresse'],answer:['La maîtresse','ouvre doucement','la porte.'],help:['Qui fait l’action ?','Quelle est l’action ?','Qu’est-ce qui est ouvert ?'],feedback:'Très bien : La maîtresse / ouvre doucement / la porte.'}
  ],
  challenge:[
    {id:'c1',type:'choice',title:'Mon défi 1',prompt:'Sans aide : choisis la meilleure façon de lire cette phrase.',stem:'Le vieux chien observe les oiseaux depuis la fenêtre.',choices:['Le vieux chien / observe les oiseaux / depuis la fenêtre.','Le vieux / chien observe / les oiseaux depuis / la fenêtre.','Le / vieux chien observe les / oiseaux depuis la fenêtre.'],answer:'Le vieux chien / observe les oiseaux / depuis la fenêtre.',feedback:'Bravo ! Tu as bien repéré les groupes de sens.'},
    {id:'c2',type:'order',title:'Mon défi 2',prompt:'Sans aide : remets les groupes dans l’ordre.',items:['après la récréation.','Les élèves','retournent en classe'],answer:['Les élèves','retournent en classe','après la récréation.'],feedback:'Très bien ! La phrase est reconstruite par groupes de sens.'}
  ]
};

/* ------------------------------------------------------------
   LEC-P1-04 — Respecter la ponctuation
   ------------------------------------------------------------ */
window.HIBOU_LEARNING_ACTIVITIES['LEC-P1-04']={
  code:'LEC-P1-04',
  domain:'Lecture et fluence',
  title:'Respecter la ponctuation',
  studentGoal:'Je sais utiliser la ponctuation pour guider ma lecture.',
  lesson:{
    intro:'La ponctuation me dit comment lire : où m’arrêter, où faire une petite pause et quelle intonation utiliser.',
    steps:[
      'Au point, je marque un vrai arrêt.',
      'À la virgule, je fais une petite pause.',
      'Au point d’interrogation, ma voix fait entendre une question.',
      'Au point d’exclamation, ma voix fait entendre une émotion ou une insistance.'
    ],
    example:{word:'Tu viens ?',chunks:['Tu viens','?'],sentence:'Tu viens ?'}
  },
  guided:[
    {id:'g1',type:'choice',title:'Je choisis le bon signe',prompt:'Quel signe termine cette question ?',stem:'Où as-tu posé ton cahier __',choices:['?','.','!'],answer:'?',help:['La phrase demande une information.','On entend une question.','Une question se termine par « ? ».'],feedback:'Oui. Le point d’interrogation indique une question.'},
    {id:'g2',type:'choice',title:'Je marque la petite pause',prompt:'Quel signe convient au milieu de cette phrase ?',stem:'Dans mon sac __ il y a un livre et une trousse.',choices:[',','.','?'],answer:',',help:['La phrase n’est pas terminée.','Il faut seulement une petite pause.','Choisis la virgule.'],feedback:'Exact. La virgule marque une petite pause.'}
  ],
  training:[
    {id:'t1',type:'choice',title:'Je reconnais une exclamation',prompt:'Quel signe termine cette phrase ?',stem:'Attention au ballon __',choices:['!','?','.'],answer:'!',help:['On avertit quelqu’un.','La voix est plus forte.','Choisis le point d’exclamation.'],feedback:'Bravo. Le point d’exclamation convient.'},
    {id:'t2',type:'order',title:'Je lis en respectant les pauses',prompt:'Remets les morceaux dans l’ordre.',items:['puis elle sort.','Lina ferme son livre,','range son crayon,'],answer:['Lina ferme son livre,','range son crayon,','puis elle sort.'],help:['Commence par « Lina ».','Les virgules indiquent que la phrase continue.','Le point termine la phrase.'],feedback:'Très bien. Les virgules organisent les petites pauses avant le point final.'},
    {id:'t3',type:'choice',title:'Je choisis l’intonation',prompt:'Comment dois-tu lire cette phrase ?',stem:'Quel magnifique dessin !',choices:['Avec de l’enthousiasme.','Comme une question.','Sans aucune pause ni expression.'],answer:'Avec de l’enthousiasme.',help:['Observe le signe final.','Le « ! » exprime souvent une émotion.','Fais entendre l’admiration.'],feedback:'Oui. Le point d’exclamation guide l’intonation.'}
  ],
  challenge:[
    {id:'c1',type:'choice',title:'Mon défi 1',prompt:'Sans aide : quel signe manque ?',stem:'Est-ce que tu as terminé __',choices:['?','!','.'],answer:'?',feedback:'Bravo ! Tu as reconnu une question.'},
    {id:'c2',type:'choice',title:'Mon défi 2',prompt:'Sans aide : quelle lecture convient ?',stem:'Stop ! Le feu est rouge.',choices:['Je marque fortement « Stop ! », puis je poursuis la phrase.','Je lis tout sans pause.','Je fais monter la voix comme pour poser une question.'],answer:'Je marque fortement « Stop ! », puis je poursuis la phrase.',feedback:'Très bien ! Tu utilises la ponctuation pour guider ta lecture.'}
  ]
};

})();
