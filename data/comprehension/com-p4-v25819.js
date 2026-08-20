/* Maître Hibou V25.8.19 — Compréhension P4
   Référentiel Progressions CE2 :
   COM-P4-01 Comprendre une information implicite
   COM-P4-02 Comprendre les intentions et les émotions des personnages
   COM-P4-03 Repérer causes et conséquences
   COM-P4-04 Résumer un texte
   Les codes restent strictement internes et ne sont jamais affichés à l’élève.
*/
(function(){
'use strict';

window.HIBOU_LEARNING_ACTIVITIES=window.HIBOU_LEARNING_ACTIVITIES||{};

/* =========================================================
   COM-P4-01 — Comprendre une information implicite
   ========================================================= */
window.HIBOU_LEARNING_ACTIVITIES['COM-P4-01']={
 code:'COM-P4-01',
 domain:'Compréhension de l’écrit',
 title:'Comprendre une information implicite',
 studentGoal:'Je sais comprendre ce que le texte fait comprendre sans le dire directement.',
 lesson:{
  intro:'Une information implicite n’est pas écrite directement. Pour la comprendre, je rassemble les indices du texte et ce que je sais déjà.',
  steps:[
   'Je repère les indices importants.',
   'Je me demande ce qu’ils ont en commun.',
   'Je fais une hypothèse.',
   'Je vérifie que mon hypothèse convient à tous les indices.'
  ],
  example:{
   word:'Le texte fait comprendre',
   chunks:['Les volets claquent.','Les arbres se courbent.'],
   sentence:'Le texte ne dit pas « il y a beaucoup de vent », mais ces deux indices permettent de le comprendre.'
  }
 },
 guided:[
  {
   id:'g1',type:'choice',
   title:'Je comprends ce qui n’est pas écrit',
   prompt:'Que peut-on comprendre ?',
   text:'À peine entrée, Lila retire ses chaussures couvertes de boue et pose son imperméable mouillé près de la porte.',
   choices:['Il a plu dehors.','Lila revient de la plage.','Il fait très chaud.'],
   answer:'Il a plu dehors.',
   help:[
    'Cherche deux indices liés à la météo.',
    'Les chaussures sont boueuses et l’imperméable est mouillé.',
    'Ces indices font penser à la pluie.'
   ],
   feedback:'Oui. La pluie n’est pas nommée, mais les indices permettent de la comprendre.'
  },
  {
   id:'g2',type:'multi',
   title:'Je rassemble les indices',
   prompt:'Touche les deux indices qui permettent de comprendre que le magasin va fermer.',
   text:'Le vendeur éteint une partie des lumières. Il retourne le panneau de la porte sur « Fermé ». Deux clients terminent rapidement leurs achats.',
   items:[
    'Le vendeur éteint une partie des lumières.',
    'Il retourne le panneau sur « Fermé ».',
    'Deux clients sont encore dans le magasin.'
   ],
   answers:[
    'Le vendeur éteint une partie des lumières.',
    'Il retourne le panneau sur « Fermé ».'
   ],
   help:[
    'Cherche les actions qui annoncent directement la fermeture.',
    'Éteindre les lumières est un premier indice.',
    'Retourner le panneau sur « Fermé » est le second indice.'
   ],
   feedback:'Exact. Ces deux indices permettent de comprendre que le magasin ferme.'
  }
 ],
 training:[
  {
   id:'t1',type:'choice',
   title:'Je déduis le lieu',
   prompt:'Où se trouve probablement Malo ?',
   text:'Malo dépose ses chaussures au bord du bassin. Il met son bonnet, puis attend que le maître-nageur donne le signal.',
   choices:['À la piscine','À la bibliothèque','Dans un jardin'],
   answer:'À la piscine',
   help:[
    'Repère les mots liés à un même lieu.',
    'Le bassin et le maître-nageur sont des indices.',
    'Ces deux indices correspondent à la piscine.'
   ],
   feedback:'Bravo. Tu as déduit le lieu grâce à plusieurs indices.'
  },
  {
   id:'t2',type:'choice',
   title:'Je comprends une situation',
   prompt:'Que peut-on comprendre sur le bus ?',
   text:'Noé arrive à l’arrêt en courant. Il voit les portes se refermer puis le véhicule s’éloigner.',
   choices:['Noé a raté le bus.','Le bus est en panne.','Noé vient de descendre du bus.'],
   answer:'Noé a raté le bus.',
   help:[
    'Observe l’ordre des actions.',
    'Noé arrive alors que les portes se ferment.',
    'Le véhicule repart sans lui.'
   ],
   feedback:'Oui. Le texte fait comprendre que Noé a raté le bus.'
  },
  {
   id:'t3',type:'highlight',
   title:'Je trouve l’indice décisif',
   prompt:'Touche la phrase qui permet le mieux de comprendre que le personnage a très froid.',
   items:[
    'Nina regarde les vitrines.',
    'Nina souffle sur ses doigts et remonte son écharpe jusqu’au nez.',
    'Nina porte un sac à dos.'
   ],
   answers:[1],max:1,
   help:[
    'Cherche un comportement lié au froid.',
    'Souffler sur ses doigts est un indice.',
    'Remonter son écharpe en est un autre.'
   ],
   feedback:'Exact. Cette phrase contient les indices les plus utiles.'
  }
 ],
 challenge:[
  {
   id:'c1',type:'choice',
   title:'Mon défi 1',
   prompt:'Sans aide : que peut-on comprendre ?',
   text:'La salle devient silencieuse. Tous les regards se tournent vers le rideau qui commence à s’ouvrir.',
   choices:['Le spectacle va commencer.','La salle va fermer.','Les spectateurs vont quitter la salle.'],
   answer:'Le spectacle va commencer.',
   feedback:'Bravo ! Tu as compris l’information implicite.'
  },
  {
   id:'c2',type:'choice',
   title:'Mon défi 2',
   prompt:'Sans aide : pourquoi Zoé ralentit-elle ?',
   text:'Zoé roule rapidement à vélo. En approchant du carrefour, le feu passe à l’orange puis au rouge.',
   choices:['Elle va s’arrêter.','Elle veut pédaler plus vite.','Elle cherche son chemin.'],
   answer:'Elle va s’arrêter.',
   feedback:'Très bien ! Tu as relié les indices à ce que tu sais.'
  }
 ]
};

/* =========================================================
   COM-P4-02 — Intentions et émotions des personnages
   ========================================================= */
window.HIBOU_LEARNING_ACTIVITIES['COM-P4-02']={
 code:'COM-P4-02',
 domain:'Compréhension de l’écrit',
 title:'Comprendre les intentions et les émotions des personnages',
 studentGoal:'Je sais expliquer ce qu’un personnage ressent et ce qu’il cherche à faire.',
 lesson:{
  intro:'Les émotions et les intentions ne sont pas toujours écrites directement. Je les comprends grâce aux paroles, aux gestes et aux actions du personnage.',
  steps:[
   'Je regarde ce que le personnage fait.',
   'Je regarde ce qu’il dit.',
   'Je repère ses réactions.',
   'Je formule son émotion ou son intention et je la justifie.'
  ],
  example:{
   word:'Ce qu’il ressent / ce qu’il veut',
   chunks:['Elle serre son cadeau contre elle.','Elle sourit.'],
   sentence:'Je peux comprendre qu’elle est contente grâce à ses gestes et à son sourire.'
  }
 },
 guided:[
  {
   id:'g1',type:'choice',
   title:'Quelle émotion ?',
   prompt:'Comment se sent probablement Amir ?',
   text:'Amir ouvre l’enveloppe. Ses yeux s’agrandissent, puis il bondit de sa chaise en criant : « J’ai réussi ! »',
   choices:['Très heureux','Très inquiet','Très ennuyé'],
   answer:'Très heureux',
   help:[
    'Observe sa réaction.',
    'Il bondit et crie « J’ai réussi ! ».',
    'Ces gestes montrent de la joie.'
   ],
   feedback:'Oui. Amir est très heureux.'
  },
  {
   id:'g2',type:'choice',
   title:'Quelle intention ?',
   prompt:'Que cherche à faire Léa ?',
   text:'Léa cache rapidement le dessin derrière son dos quand sa mère entre dans la pièce. Elle lui demande de revenir dans cinq minutes.',
   choices:['Garder une surprise','Jeter le dessin','Montrer immédiatement le dessin'],
   answer:'Garder une surprise',
   help:[
    'Regarde ce qu’elle fait du dessin.',
    'Elle le cache quand sa mère arrive.',
    'Elle veut probablement éviter que sa mère le voie tout de suite.'
   ],
   feedback:'Exact. Léa cherche à garder une surprise.'
  }
 ],
 training:[
  {
   id:'t1',type:'multi',
   title:'Je justifie une émotion',
   prompt:'Touche les indices qui montrent que Tom est inquiet.',
   text:'Tom relit trois fois le message. Il mordille son crayon et regarde sans cesse la porte.',
   items:[
    'Il relit trois fois le message.',
    'Il mordille son crayon.',
    'Il regarde sans cesse la porte.',
    'Le crayon est posé dans sa main.'
   ],
   answers:[
    'Il relit trois fois le message.',
    'Il mordille son crayon.',
    'Il regarde sans cesse la porte.'
   ],
   help:[
    'Cherche les comportements inhabituels.',
    'Relire plusieurs fois montre une préoccupation.',
    'Mordiller son crayon et surveiller la porte renforcent cette idée.'
   ],
   feedback:'Bravo. Plusieurs indices montrent que Tom est inquiet.'
  },
  {
   id:'t2',type:'choice',
   title:'Je comprends son intention',
   prompt:'Pourquoi Yasmine parle-t-elle doucement ?',
   text:'Le bébé dort enfin dans la chambre. Yasmine entre sur la pointe des pieds et chuchote à son frère.',
   choices:['Pour ne pas réveiller le bébé','Parce qu’elle est en colère','Parce qu’elle a oublié ce qu’elle voulait dire'],
   answer:'Pour ne pas réveiller le bébé',
   help:[
    'Cherche ce que fait Yasmine.',
    'Elle marche sur la pointe des pieds et chuchote.',
    'Ces actions ont le même but : ne pas faire de bruit.'
   ],
   feedback:'Oui. Son intention est de ne pas réveiller le bébé.'
  },
  {
   id:'t3',type:'highlight',
   title:'Je repère la preuve',
   prompt:'Touche la phrase qui montre le mieux que Lina est déçue.',
   items:[
    'Lina regarde le tableau des résultats.',
    'Elle baisse la tête et range silencieusement sa médaille dans son sac.',
    'Ses amis discutent près d’elle.'
   ],
   answers:[1],max:1,
   help:[
    'Cherche une réaction qui exprime une émotion.',
    'Baisser la tête est un indice.',
    'Le fait de ranger silencieusement sa médaille renforce cette impression.'
   ],
   feedback:'Exact. Cette réaction permet de comprendre sa déception.'
  }
 ],
 challenge:[
  {
   id:'c1',type:'choice',
   title:'Mon défi 1',
   prompt:'Sans aide : quelle est l’intention de Malo ?',
   text:'Malo place une chaise devant la porte, puis prépare une affiche sur laquelle il écrit : « Ne pas entrer avant 18 h ! »',
   choices:['Empêcher quelqu’un d’entrer pour le moment','Inviter tout le monde à entrer','Changer de pièce'],
   answer:'Empêcher quelqu’un d’entrer pour le moment',
   feedback:'Bravo ! Tu as compris son intention.'
  },
  {
   id:'c2',type:'choice',
   title:'Mon défi 2',
   prompt:'Sans aide : que ressent probablement Inès ?',
   text:'Quand son nom est appelé, Inès avance vers la scène avec un grand sourire. Elle serre son diplôme contre elle en retournant à sa place.',
   choices:['De la fierté','De la peur','De l’ennui'],
   answer:'De la fierté',
   feedback:'Très bien ! Ses gestes et son sourire permettent de comprendre son émotion.'
  }
 ]
};

/* =========================================================
   COM-P4-03 — Repérer causes et conséquences
   ========================================================= */
window.HIBOU_LEARNING_ACTIVITIES['COM-P4-03']={
 code:'COM-P4-03',
 domain:'Compréhension de l’écrit',
 title:'Repérer causes et conséquences',
 studentGoal:'Je sais expliquer pourquoi quelque chose arrive et ce que cela provoque.',
 lesson:{
  intro:'Une cause explique pourquoi un événement arrive. Une conséquence explique ce qui se produit ensuite à cause de cet événement.',
  steps:[
   'Je repère l’événement.',
   'Je cherche ce qui l’a provoqué : la cause.',
   'Je cherche ce qu’il provoque ensuite : la conséquence.',
   'Je peux utiliser « parce que », « donc » ou « à cause de ».'
  ],
  example:{
   word:'Cause → conséquence',
   chunks:['Il pleut beaucoup.','Le match est annulé.'],
   sentence:'Le match est annulé parce qu’il pleut beaucoup. La pluie est la cause ; l’annulation est la conséquence.'
  }
 },
 guided:[
  {
   id:'g1',type:'choice',
   title:'Je trouve la cause',
   prompt:'Pourquoi le match est-il interrompu ?',
   text:'Un orage éclate au-dessus du stade. L’arbitre interrompt immédiatement le match et demande aux joueurs de rentrer.',
   choices:['Parce qu’un orage éclate.','Parce que les joueurs sont fatigués.','Parce que le stade est vide.'],
   answer:'Parce qu’un orage éclate.',
   help:[
    'Cherche ce qui arrive juste avant la décision de l’arbitre.',
    'L’orage est l’événement déclencheur.',
    'Il provoque l’arrêt du match.'
   ],
   feedback:'Oui. L’orage est la cause de l’interruption du match.'
  },
  {
   id:'g2',type:'choice',
   title:'Je trouve la conséquence',
   prompt:'Quelle est la conséquence de la panne ?',
   text:'Le bus tombe en panne quelques kilomètres avant l’école. Les élèves arrivent donc en retard.',
   choices:['Les élèves arrivent en retard.','Le bus devient neuf.','Les élèves partent plus tôt.'],
   answer:'Les élèves arrivent en retard.',
   help:[
    'La panne est déjà la cause.',
    'Cherche ce qui arrive ensuite.',
    'Le mot « donc » annonce la conséquence.'
   ],
   feedback:'Exact. Le retard est la conséquence de la panne.'
  }
 ],
 training:[
  {
   id:'t1',type:'multi',
   title:'Cause et conséquence',
   prompt:'Touche la cause puis la conséquence de l’événement.',
   text:'Le vent souffle très fort. Une grosse branche tombe alors sur le chemin, qui devient impossible à emprunter.',
   items:[
    'Le vent souffle très fort.',
    'Une grosse branche tombe sur le chemin.',
    'Le chemin devient impossible à emprunter.',
    'Le chemin traverse la forêt.'
   ],
   answers:[
    'Le vent souffle très fort.',
    'Une grosse branche tombe sur le chemin.',
    'Le chemin devient impossible à emprunter.'
   ],
   help:[
    'Cherche la chaîne des événements.',
    'Le vent provoque la chute de la branche.',
    'La branche bloque ensuite le chemin.'
   ],
   feedback:'Bravo. Tu as retrouvé la chaîne cause → événement → conséquence.'
  },
  {
   id:'t2',type:'choice',
   title:'Je complète avec « parce que »',
   prompt:'Quelle phrase est correcte ?',
   text:'Le sol est verglacé. La directrice décide de fermer la cour.',
   choices:[
    'La cour est fermée parce que le sol est verglacé.',
    'Le sol est verglacé parce que la cour est fermée.',
    'La cour est verglacée parce que la directrice est fermée.'
   ],
   answer:'La cour est fermée parce que le sol est verglacé.',
   help:[
    '« Parce que » introduit la cause.',
    'Pourquoi la cour est-elle fermée ?',
    'Parce que le sol est verglacé.'
   ],
   feedback:'Exact. Tu as correctement relié la conséquence à sa cause.'
  },
  {
   id:'t3',type:'choice',
   title:'Je complète avec « donc »',
   prompt:'Quelle phrase est correcte ?',
   text:'Mina a oublié son parapluie. Une forte pluie commence au moment où elle sort.',
   choices:[
    'Il pleut, donc Mina risque d’être mouillée.',
    'Mina est mouillée, donc il commence à pleuvoir.',
    'Mina oublie son parapluie, donc la pluie commence.'
   ],
   answer:'Il pleut, donc Mina risque d’être mouillée.',
   help:[
    '« Donc » introduit une conséquence.',
    'La pluie peut provoquer quoi ?',
    'Mina risque d’être mouillée.'
   ],
   feedback:'Oui. La conséquence est correctement exprimée.'
  }
 ],
 challenge:[
  {
   id:'c1',type:'choice',
   title:'Mon défi 1',
   prompt:'Sans aide : quelle est la cause du retard de Léo ?',
   text:'Un accident bloque la route pendant vingt minutes. Léo arrive en retard à son rendez-vous.',
   choices:['L’accident qui bloque la route','Le rendez-vous','Léo arrive en retard'],
   answer:'L’accident qui bloque la route',
   feedback:'Bravo ! Tu as repéré la cause.'
  },
  {
   id:'c2',type:'choice',
   title:'Mon défi 2',
   prompt:'Sans aide : quelle est la conséquence ?',
   text:'Le congélateur est resté ouvert toute la nuit. Au matin, plusieurs aliments sont décongelés.',
   choices:['Plusieurs aliments sont décongelés.','Le congélateur est resté ouvert.','La nuit a duré longtemps.'],
   answer:'Plusieurs aliments sont décongelés.',
   feedback:'Très bien ! Tu as repéré la conséquence.'
  }
 ]
};

/* =========================================================
   COM-P4-04 — Résumer un texte
   ========================================================= */
window.HIBOU_LEARNING_ACTIVITIES['COM-P4-04']={
 code:'COM-P4-04',
 domain:'Compréhension de l’écrit',
 title:'Résumer un texte',
 studentGoal:'Je sais raconter ou expliquer un texte plus brièvement en gardant l’essentiel.',
 lesson:{
  intro:'Résumer, c’est raconter le texte beaucoup plus brièvement sans changer son sens. Je garde les personnages ou le sujet, les événements importants et leur ordre.',
  steps:[
   'Je repère le sujet ou les personnages principaux.',
   'Je garde les événements ou idées importantes.',
   'Je retire les détails secondaires.',
   'Je respecte l’ordre et le sens du texte.'
  ],
  example:{
   word:'Un texte plus court',
   chunks:['Léa rate son bus.','Elle appelle son père.','Il vient la chercher.'],
   sentence:'Résumé : Léa rate son bus et appelle son père, qui vient la chercher.'
  }
 },
 guided:[
  {
   id:'g1',type:'multi',
   title:'Je sélectionne l’essentiel',
   prompt:'Touche les trois informations à garder pour résumer.',
   text:'Sami part au parc avec son cerf-volant rouge. Une rafale l’emporte dans un arbre. Sami demande de l’aide à un jardinier, qui réussit à le décrocher avec une longue perche. Le jardinier porte une casquette verte.',
   items:[
    'Sami va au parc avec son cerf-volant.',
    'Le cerf-volant reste coincé dans un arbre.',
    'Un jardinier aide Sami à le récupérer.',
    'Le cerf-volant est rouge.',
    'Le jardinier porte une casquette verte.'
   ],
   answers:[
    'Sami va au parc avec son cerf-volant.',
    'Le cerf-volant reste coincé dans un arbre.',
    'Un jardinier aide Sami à le récupérer.'
   ],
   help:[
    'Garde le début, le problème et la solution.',
    'Les couleurs sont des détails.',
    'Le résumé doit permettre de comprendre toute l’histoire.'
   ],
   feedback:'Exact. Ces trois informations suffisent pour raconter l’essentiel.'
  },
  {
   id:'g2',type:'choice',
   title:'Je choisis le meilleur résumé',
   prompt:'Quel résumé convient le mieux ?',
   text:'Sami part au parc avec son cerf-volant. Une rafale le coince dans un arbre. Un jardinier l’aide à le récupérer.',
   choices:[
    'Au parc, le cerf-volant de Sami se coince dans un arbre, mais un jardinier l’aide à le récupérer.',
    'Sami possède un cerf-volant et le jardinier possède une perche.',
    'Il y a un parc avec des arbres et du vent.'
   ],
   answer:'Au parc, le cerf-volant de Sami se coince dans un arbre, mais un jardinier l’aide à le récupérer.',
   help:[
    'Le résumé doit conserver le problème et sa résolution.',
    'Évite une simple liste de détails.',
    'La première proposition raconte l’essentiel dans l’ordre.'
   ],
   feedback:'Oui. Ce résumé est court, fidèle et complet.'
  }
 ],
 training:[
  {
   id:'t1',type:'highlight',
   title:'Je retire un détail',
   prompt:'Touche la phrase qui peut être supprimée du résumé.',
   items:[
    'Une panne immobilise le train.',
    'Les voyageurs doivent attendre un autre train.',
    'Les sièges du wagon sont bleus.'
   ],
   answers:[2],max:1,
   help:[
    'Quelle information n’aide pas à comprendre l’événement principal ?',
    'La panne et l’attente sont importantes.',
    'La couleur des sièges est secondaire.'
   ],
   feedback:'Bravo. La couleur des sièges est un détail inutile pour le résumé.'
  },
  {
   id:'t2',type:'choice',
   title:'Je respecte l’ordre',
   prompt:'Quel résumé respecte l’ordre des événements ?',
   text:'Mila entend un bruit dans le jardin. Elle aperçoit un chaton coincé derrière une barrière. Elle ouvre le portillon et le chaton peut sortir.',
   choices:[
    'Mila entend un bruit, découvre un chaton coincé puis l’aide à sortir.',
    'Mila libère un chaton puis entend un bruit et le découvre.',
    'Un chaton sort, puis Mila ouvre une barrière avant de l’entendre.'
   ],
   answer:'Mila entend un bruit, découvre un chaton coincé puis l’aide à sortir.',
   help:[
    'Repère ce qui arrive d’abord.',
    'Ensuite Mila découvre le chaton.',
    'Enfin elle l’aide.'
   ],
   feedback:'Exact. Le résumé respecte la chronologie.'
  },
  {
   id:'t3',type:'choice',
   title:'Je garde le sens',
   prompt:'Quel résumé reste fidèle au texte ?',
   text:'À cause de la neige, la sortie scolaire est reportée au vendredi suivant. Les élèves devront donc attendre une semaine.',
   choices:[
    'La sortie est reportée d’une semaine à cause de la neige.',
    'La sortie est annulée définitivement.',
    'Les élèves partent immédiatement malgré la neige.'
   ],
   answer:'La sortie est reportée d’une semaine à cause de la neige.',
   help:[
    'Attention à ne pas transformer « reportée » en « annulée ».',
    'Le résumé doit garder la cause et la nouvelle situation.',
    'La première phrase respecte exactement le sens.'
   ],
   feedback:'Oui. Le résumé est fidèle au texte.'
  }
 ],
 challenge:[
  {
   id:'c1',type:'choice',
   title:'Mon défi 1',
   prompt:'Sans aide : choisis le meilleur résumé.',
   text:'Au début de la randonnée, Inès oublie sa gourde dans la voiture. Son frère partage son eau avec elle jusqu’au retour au parking.',
   choices:[
    'Inès oublie sa gourde, alors son frère partage son eau pendant la randonnée.',
    'Inès a une voiture et un frère.',
    'Le frère d’Inès aime boire de l’eau.'
   ],
   answer:'Inès oublie sa gourde, alors son frère partage son eau pendant la randonnée.',
   feedback:'Bravo ! Tu as choisi un résumé fidèle et concis.'
  },
  {
   id:'c2',type:'multi',
   title:'Mon défi 2',
   prompt:'Sans aide : touche uniquement les informations indispensables au résumé.',
   text:'Pendant un match, Adam se tord la cheville. L’entraîneur l’aide à sortir du terrain et appelle ses parents. Adam porte le numéro 8 et le match se joue sur un terrain synthétique.',
   items:[
    'Adam se tord la cheville.',
    'L’entraîneur l’aide à sortir du terrain.',
    'Ses parents sont appelés.',
    'Adam porte le numéro 8.',
    'Le terrain est synthétique.'
   ],
   answers:[
    'Adam se tord la cheville.',
    'L’entraîneur l’aide à sortir du terrain.',
    'Ses parents sont appelés.'
   ],
   feedback:'Très bien ! Tu as conservé seulement les informations essentielles.'
  }
 ]
};

})();