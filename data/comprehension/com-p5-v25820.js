/* Maître Hibou V25.8.20 — Compréhension P5
   Référentiel Progressions CE2 :
   COM-P5-01 Choisir une stratégie lorsqu’on ne comprend pas
   COM-P5-02 Synthétiser plusieurs informations
   COM-P5-03 Adapter ses stratégies au type de texte
   COM-P5-04 Vérifier et réparer sa compréhension
   Les codes restent strictement internes et ne sont jamais affichés à l’élève.
*/
(function(){
'use strict';

window.HIBOU_LEARNING_ACTIVITIES=window.HIBOU_LEARNING_ACTIVITIES||{};

/* =========================================================
   COM-P5-01 — Choisir une stratégie lorsqu’on ne comprend pas
   ========================================================= */
window.HIBOU_LEARNING_ACTIVITIES['COM-P5-01']={
 code:'COM-P5-01',
 domain:'Compréhension de l’écrit',
 title:'Choisir une stratégie lorsqu’on ne comprend pas',
 studentGoal:'Je sais choisir quoi faire lorsque je ne comprends pas un passage.',
 lesson:{
  intro:'Quand je ne comprends pas, je ne continue pas au hasard. Je choisis une stratégie adaptée au problème rencontré.',
  steps:[
   'Je repère précisément ce que je ne comprends pas.',
   'Je choisis une stratégie : relire, ralentir, chercher un indice, découper la phrase ou regarder le contexte.',
   'J’essaie cette stratégie.',
   'Je vérifie si elle m’a permis de mieux comprendre.'
  ],
  example:{
   word:'Je choisis une stratégie',
   chunks:['mot inconnu','phrase trop longue','information oubliée'],
   sentence:'Mot inconnu : j’utilise le contexte. Phrase difficile : je la relis plus lentement. Information oubliée : je retourne dans le texte.'
  }
 },
 guided:[
  {
   id:'g1',type:'choice',
   title:'Quelle stratégie choisir ?',
   prompt:'Tu comprends tous les mots sauf « cabossée ». Que fais-tu d’abord ?',
   text:'La vieille boîte en métal est cabossée sur un côté, comme si elle avait reçu plusieurs coups.',
   choices:[
    'Je regarde les mots autour pour comprendre.',
    'Je saute tout le paragraphe.',
    'Je choisis un sens au hasard.'
   ],
   answer:'Je regarde les mots autour pour comprendre.',
   help:[
    'Le problème vient d’un mot inconnu.',
    'Cherche un indice dans la même phrase.',
    '« Comme si elle avait reçu plusieurs coups » aide à comprendre.'
   ],
   feedback:'Oui. Le contexte est la meilleure stratégie pour comprendre ce mot.'
  },
  {
   id:'g2',type:'choice',
   title:'Je choisis une autre stratégie',
   prompt:'La phrase est très longue et tu t’y perds. Quelle stratégie est la plus utile ?',
   text:'Après avoir traversé la place, longé la mairie et attendu que le feu passe au vert, Mila rejoint enfin l’arrêt de bus où son amie l’attend.',
   choices:[
    'Je relis en séparant les différentes actions.',
    'Je lis encore plus vite.',
    'Je regarde uniquement le dernier mot.'
   ],
   answer:'Je relis en séparant les différentes actions.',
   help:[
    'Le problème vient de la longueur de la phrase.',
    'Découpe-la en petits morceaux.',
    'Repère successivement : traverser, longer, attendre, rejoindre.'
   ],
   feedback:'Exact. Découper une phrase longue aide à retrouver son sens.'
  }
 ],
 training:[
  {
   id:'t1',type:'choice',
   title:'Je sais où chercher',
   prompt:'Tu ne sais plus pourquoi Tom est parti. Que fais-tu ?',
   text:'Tom ferme son sac. Quelques lignes plus haut, le texte expliquait la raison de son départ.',
   choices:[
    'Je retourne quelques lignes en arrière.',
    'Je continue sans chercher.',
    'Je relis uniquement le titre.'
   ],
   answer:'Je retourne quelques lignes en arrière.',
   help:[
    'L’information a déjà été donnée.',
    'Elle se trouve avant le passage actuel.',
    'Il faut revenir dans le texte.'
   ],
   feedback:'Bravo. Tu as choisi une stratégie adaptée à une information oubliée.'
  },
  {
   id:'t2',type:'choice',
   title:'Je ralentis au bon moment',
   prompt:'Que faire devant ce passage difficile ?',
   text:'Le personnage hésite, change d’avis, puis revient sur sa première décision.',
   choices:[
    'Je ralentis et je relis chaque étape.',
    'Je saute le passage.',
    'Je remplace les mots par d’autres au hasard.'
   ],
   answer:'Je ralentis et je relis chaque étape.',
   help:[
    'Plusieurs changements se succèdent.',
    'Il faut suivre l’ordre.',
    'Lire plus lentement aide à garder la chronologie.'
   ],
   feedback:'Oui. Ralentir est utile quand plusieurs étapes se suivent.'
  },
  {
   id:'t3',type:'multi',
   title:'Plusieurs stratégies possibles',
   prompt:'Quelles stratégies peuvent t’aider si une phrase reste difficile ?',
   items:[
    'La relire lentement.',
    'La découper en groupes de sens.',
    'Chercher les mots qui relient les idées.',
    'Deviner sans relire.'
   ],
   answers:[
    'La relire lentement.',
    'La découper en groupes de sens.',
    'Chercher les mots qui relient les idées.'
   ],
   help:[
    'Cherche les stratégies qui permettent de mieux observer la phrase.',
    'Relire et découper sont utiles.',
    'Les mots comme « mais », « parce que », « ensuite » peuvent aider.'
   ],
   feedback:'Exact. Plusieurs stratégies peuvent être combinées.'
  }
 ],
 challenge:[
  {
   id:'c1',type:'choice',
   title:'Mon défi 1',
   prompt:'Sans aide : tu ne comprends pas à qui renvoie « elle ». Que fais-tu ?',
   text:'Mina pose la boîte devant Léa. Elle sourit.',
   choices:[
    'Je regarde les personnages cités juste avant et je vérifie le sens.',
    'Je choisis automatiquement Mina.',
    'Je continue sans me poser de question.'
   ],
   answer:'Je regarde les personnages cités juste avant et je vérifie le sens.',
   feedback:'Bravo ! Tu as choisi une stratégie adaptée au problème.'
  },
  {
   id:'c2',type:'choice',
   title:'Mon défi 2',
   prompt:'Sans aide : un mot inconnu bloque ta compréhension. Quelle première stratégie est la plus utile ?',
   text:'Le ruisseau devient tumultueux après l’orage : l’eau accélère, forme de gros remous et frappe les rochers.',
   choices:[
    'Utiliser les indices du contexte.',
    'Ignorer tout le passage.',
    'Changer le mot par n’importe quel autre.'
   ],
   answer:'Utiliser les indices du contexte.',
   feedback:'Très bien ! Le contexte permet ici de comprendre le mot.'
  }
 ]
};

/* =========================================================
   COM-P5-02 — Synthétiser plusieurs informations
   ========================================================= */
window.HIBOU_LEARNING_ACTIVITIES['COM-P5-02']={
 code:'COM-P5-02',
 domain:'Compréhension de l’écrit',
 title:'Synthétiser plusieurs informations',
 studentGoal:'Je sais rapprocher plusieurs informations pour construire une réponse.',
 lesson:{
  intro:'Certaines questions demandent de réunir plusieurs informations éloignées dans le texte. Je dois les rapprocher pour construire une réponse complète.',
  steps:[
   'Je repère les informations qui répondent chacune à une partie de la question.',
   'Je les rassemble.',
   'Je cherche ce qu’elles permettent de comprendre ensemble.',
   'Je formule une réponse complète avec mes mots.'
  ],
  example:{
   word:'Je rassemble',
   chunks:['Il ferme les volets.','Il prépare une valise.','Il confie le chat au voisin.'],
   sentence:'En réunissant ces informations, je comprends qu’il prépare un départ de plusieurs jours.'
  }
 },
 guided:[
  {
   id:'g1',type:'multi',
   title:'Je rassemble les informations',
   prompt:'Touche les trois indices qui montrent que la famille prépare un voyage.',
   text:'Les valises sont prêtes dans l’entrée. Maman vérifie les billets sur son téléphone. Papa confie les clés de la maison au voisin. La table de la cuisine est encore dressée.',
   items:[
    'Les valises sont prêtes.',
    'Maman vérifie les billets.',
    'Papa confie les clés au voisin.',
    'La table est dressée.'
   ],
   answers:[
    'Les valises sont prêtes.',
    'Maman vérifie les billets.',
    'Papa confie les clés au voisin.'
   ],
   help:[
    'Cherche les éléments liés à un départ.',
    'Valises + billets sont déjà deux indices forts.',
    'Confier les clés au voisin renforce l’idée d’une absence.'
   ],
   feedback:'Oui. Ces trois informations permettent de comprendre qu’un voyage se prépare.'
  },
  {
   id:'g2',type:'choice',
   title:'Je construis une réponse complète',
   prompt:'Quelle synthèse est la meilleure ?',
   text:'Lina arrive tôt au gymnase. Elle vérifie son matériel, relit les consignes et demande une dernière précision à son entraîneur.',
   choices:[
    'Lina se prépare sérieusement avant l’activité.',
    'Lina possède du matériel.',
    'L’entraîneur parle à Lina.'
   ],
   answer:'Lina se prépare sérieusement avant l’activité.',
   help:[
    'La question demande de rassembler plusieurs actions.',
    'Arriver tôt, vérifier, relire et demander une précision vont dans le même sens.',
    'Cherche une idée générale qui regroupe tout.'
   ],
   feedback:'Exact. Cette phrase synthétise plusieurs informations.'
  }
 ],
 training:[
  {
   id:'t1',type:'choice',
   title:'Je rapproche des informations éloignées',
   prompt:'Que peut-on comprendre sur le personnage ?',
   text:'Au début du texte, Noé refuse de monter sur scène. Plus tard, il répète plusieurs fois son texte dans le couloir. À la fin, il accepte de participer au spectacle.',
   choices:[
    'Noé réussit peu à peu à dépasser son hésitation.',
    'Noé déteste définitivement le théâtre.',
    'Noé oublie complètement son texte.'
   ],
   answer:'Noé réussit peu à peu à dépasser son hésitation.',
   help:[
    'Compare le début et la fin.',
    'Au début il refuse, puis il répète, enfin il accepte.',
    'Il y a une évolution.'
   ],
   feedback:'Bravo. Tu as synthétisé plusieurs moments du texte.'
  },
  {
   id:'t2',type:'multi',
   title:'Je sélectionne ce qui va ensemble',
   prompt:'Quelles informations permettent de conclure que la rivière a fortement monté ?',
   items:[
    'L’eau recouvre le petit pont.',
    'Les berges habituelles ne sont plus visibles.',
    'Les pompiers interdisent l’accès au chemin.',
    'Un oiseau vole au-dessus des arbres.'
   ],
   answers:[
    'L’eau recouvre le petit pont.',
    'Les berges habituelles ne sont plus visibles.',
    'Les pompiers interdisent l’accès au chemin.'
   ],
   help:[
    'Cherche les informations liées au niveau de l’eau.',
    'Le pont et les berges sont de bons repères.',
    'L’interdiction du chemin confirme le danger.'
   ],
   feedback:'Oui. Ensemble, ces informations montrent une forte montée de la rivière.'
  },
  {
   id:'t3',type:'choice',
   title:'Je formule l’idée générale',
   prompt:'Quelle phrase résume ce que montrent toutes ces informations ?',
   text:'Le musée installe des rampes d’accès. Des panneaux sont écrits en gros caractères. Des visites adaptées sont proposées à certains groupes.',
   choices:[
    'Le musée cherche à être accessible à davantage de visiteurs.',
    'Le musée change seulement sa décoration.',
    'Le musée ferme plusieurs salles.'
   ],
   answer:'Le musée cherche à être accessible à davantage de visiteurs.',
   help:[
    'Cherche le point commun entre les trois actions.',
    'Rampes, gros caractères et visites adaptées facilitent l’accès.',
    'La synthèse doit englober toutes les informations.'
   ],
   feedback:'Exact. Tu as construit une idée générale à partir de plusieurs informations.'
  }
 ],
 challenge:[
  {
   id:'c1',type:'choice',
   title:'Mon défi 1',
   prompt:'Sans aide : quelle synthèse est la meilleure ?',
   text:'Maya emprunte chaque semaine un nouveau roman. Elle échange souvent des livres avec ses amis et note les titres qu’elle aimerait découvrir.',
   choices:[
    'Maya aime beaucoup lire et découvrir de nouveaux livres.',
    'Maya possède un cahier.',
    'Maya voit ses amis chaque semaine.'
   ],
   answer:'Maya aime beaucoup lire et découvrir de nouveaux livres.',
   feedback:'Bravo ! Tu as synthétisé plusieurs informations.'
  },
  {
   id:'c2',type:'choice',
   title:'Mon défi 2',
   prompt:'Sans aide : que peut-on comprendre ?',
   text:'La cour est vide. Les portes de l’école sont fermées. Une affiche indique : « Rendez-vous lundi ».',
   choices:[
    'L’école est fermée pour le moment.',
    'Tous les élèves sont en classe.',
    'Une fête commence dans la cour.'
   ],
   answer:'L’école est fermée pour le moment.',
   feedback:'Très bien ! Tu as rapproché les indices pour construire la réponse.'
  }
 ]
};

/* =========================================================
   COM-P5-03 — Adapter ses stratégies au type de texte
   ========================================================= */
window.HIBOU_LEARNING_ACTIVITIES['COM-P5-03']={
 code:'COM-P5-03',
 domain:'Compréhension de l’écrit',
 title:'Adapter ses stratégies au type de texte',
 studentGoal:'Je sais choisir ma manière de lire en fonction du texte et de ce que je cherche.',
 lesson:{
  intro:'Je ne lis pas tous les textes de la même manière. Selon le type de texte et mon objectif, je peux lire tout le passage, chercher une rubrique, suivre des étapes ou repérer des indices précis.',
  steps:[
   'J’identifie le type de texte.',
   'Je me demande ce que je cherche.',
   'Je choisis la stratégie la plus efficace.',
   'Je vérifie que cette stratégie m’a permis de trouver l’information.'
  ],
  example:{
   word:'Un texte, une stratégie',
   chunks:['recette → étapes','documentaire → titres','récit → ordre des événements'],
   sentence:'Pour trouver rapidement une information dans un documentaire, je m’aide des titres et sous-titres.'
  }
 },
 guided:[
  {
   id:'g1',type:'choice',
   title:'Je lis une recette',
   prompt:'Tu veux savoir quand ajouter les œufs. Quelle stratégie est la meilleure ?',
   document:{
    title:'Gâteau au yaourt',
    sections:[
     {subtitle:'Ingrédients',text:'Yaourt, farine, sucre, trois œufs, huile.'},
     {subtitle:'Préparation',text:'1. Mélanger le yaourt et le sucre. 2. Ajouter les œufs. 3. Verser la farine puis l’huile.'}
    ]
   },
   choices:[
    'Je cherche dans les étapes de préparation.',
    'Je lis uniquement le titre.',
    'Je regarde seulement la liste des ingrédients.'
   ],
   answer:'Je cherche dans les étapes de préparation.',
   help:[
    'La question porte sur le moment où faire une action.',
    'Une recette donne l’ordre dans la préparation.',
    'Les ingrédients ne suffisent pas à connaître le moment.'
   ],
   feedback:'Oui. Pour une recette, les étapes sont essentielles.'
  },
  {
   id:'g2',type:'choice',
   title:'Je lis un documentaire',
   prompt:'Tu veux savoir où vit l’animal. Que regardes-tu d’abord ?',
   document:{
    title:'Le castor',
    sections:[
     {subtitle:'Son habitat',text:'Il vit près des rivières et des plans d’eau.'},
     {subtitle:'Son alimentation',text:'Il mange surtout des végétaux.'},
     {subtitle:'Sa famille',text:'Les petits vivent avec leurs parents pendant plusieurs mois.'}
    ]
   },
   choices:[
    'Le sous-titre « Son habitat ».',
    'Le dernier mot du texte.',
    'Toutes les phrases au hasard.'
   ],
   answer:'Le sous-titre « Son habitat ».',
   help:[
    'Cherche une rubrique qui reprend l’idée de lieu de vie.',
    '« Habitat » signifie le lieu où vit un animal.',
    'Le sous-titre permet de trouver rapidement la bonne partie.'
   ],
   feedback:'Exact. Le type documentaire permet une recherche ciblée.'
  }
 ],
 training:[
  {
   id:'t1',type:'choice',
   title:'Je lis un récit',
   prompt:'Tu veux comprendre pourquoi le héros change d’avis. Quelle stratégie est la plus utile ?',
   choices:[
    'Relire les événements et les paroles du personnage autour du changement.',
    'Chercher uniquement le titre.',
    'Lire seulement la dernière ligne.'
   ],
   answer:'Relire les événements et les paroles du personnage autour du changement.',
   help:[
    'Dans un récit, les actions et paroles expliquent souvent les décisions.',
    'Il faut regarder ce qui se passe avant et après.',
    'Une seule ligne ne suffit pas toujours.'
   ],
   feedback:'Bravo. Tu adaptes ta lecture à un récit.'
  },
  {
   id:'t2',type:'choice',
   title:'Je lis une règle de jeu',
   prompt:'Tu veux savoir comment gagner. Où cherches-tu en priorité ?',
   document:{
    title:'Le jeu des explorateurs',
    sections:[
     {subtitle:'Matériel',text:'Un dé, quatre pions et un plateau.'},
     {subtitle:'Déroulement',text:'Chaque joueur avance du nombre indiqué par le dé.'},
     {subtitle:'But du jeu',text:'Le premier joueur qui atteint le trésor gagne la partie.'}
    ]
   },
   choices:[
    'Dans « But du jeu ».',
    'Dans « Matériel ».',
    'Dans le titre uniquement.'
   ],
   answer:'Dans « But du jeu ».',
   help:[
    'La question porte sur la condition de victoire.',
    'Le « but » explique ce qu’il faut réussir.',
    'La liste du matériel ne donne pas cette information.'
   ],
   feedback:'Oui. Tu utilises l’organisation du texte pour aller directement à l’information.'
  },
  {
   id:'t3',type:'multi',
   title:'Je choisis les bonnes stratégies',
   prompt:'Pour comprendre un texte documentaire, quelles stratégies sont utiles ?',
   items:[
    'Lire le titre et les sous-titres.',
    'Observer les légendes.',
    'Chercher directement la rubrique qui correspond à la question.',
    'Lire seulement les mots les plus longs.'
   ],
   answers:[
    'Lire le titre et les sous-titres.',
    'Observer les légendes.',
    'Chercher directement la rubrique qui correspond à la question.'
   ],
   help:[
    'Le documentaire est organisé en parties.',
    'Les légendes apportent aussi des informations.',
    'Les sous-titres permettent une recherche ciblée.'
   ],
   feedback:'Exact. Tu connais plusieurs stratégies adaptées au documentaire.'
  }
 ],
 challenge:[
  {
   id:'c1',type:'choice',
   title:'Mon défi 1',
   prompt:'Sans aide : pour vérifier l’ordre d’un bricolage, quelle stratégie est la meilleure ?',
   choices:[
    'Suivre les étapes numérotées.',
    'Lire uniquement la liste du matériel.',
    'Regarder le titre puis arrêter.'
   ],
   answer:'Suivre les étapes numérotées.',
   feedback:'Bravo ! Tu adaptes ta stratégie au texte.'
  },
  {
   id:'c2',type:'choice',
   title:'Mon défi 2',
   prompt:'Sans aide : dans un récit, tu veux comprendre l’évolution d’un personnage. Que fais-tu ?',
   choices:[
    'Je compare ses actions et réactions au début et à la fin.',
    'Je lis seulement le titre.',
    'Je cherche uniquement un nombre dans le texte.'
   ],
   answer:'Je compare ses actions et réactions au début et à la fin.',
   feedback:'Très bien ! Tu choisis une stratégie adaptée à ton objectif.'
  }
 ]
};

/* =========================================================
   COM-P5-04 — Vérifier et réparer sa compréhension
   ========================================================= */
window.HIBOU_LEARNING_ACTIVITIES['COM-P5-04']={
 code:'COM-P5-04',
 domain:'Compréhension de l’écrit',
 title:'Vérifier et réparer sa compréhension',
 studentGoal:'Je sais reconnaître que je n’ai pas compris et agir pour mieux comprendre.',
 lesson:{
  intro:'Un bon lecteur vérifie régulièrement qu’il comprend. S’il remarque une contradiction, un passage flou ou une réponse impossible à justifier, il revient au texte et répare sa compréhension.',
  steps:[
   'Je me demande si ce que j’ai compris est logique.',
   'Je cherche ce qui me pose problème.',
   'Je reviens au texte et j’essaie une autre stratégie.',
   'Je vérifie que ma nouvelle compréhension correspond à tous les indices.'
  ],
  example:{
   word:'Je vérifie',
   chunks:['Ma réponse contredit le texte.','Je reviens au passage.','Je corrige mon idée.'],
   sentence:'Si ma réponse ne peut pas être prouvée par le texte, je dois la revoir.'
  }
 },
 guided:[
  {
   id:'g1',type:'choice',
   title:'Je repère une erreur de compréhension',
   prompt:'Quelle réponse doit être corrigée ?',
   text:'Le texte dit : « Lina arrive après la fermeture du magasin et trouve la porte verrouillée. »',
   choices:[
    'Lina entre dans le magasin pour acheter quelque chose.',
    'Lina arrive trop tard.',
    'Le magasin est fermé.'
   ],
   answer:'Lina entre dans le magasin pour acheter quelque chose.',
   help:[
    'Compare chaque réponse avec le texte.',
    'La porte est verrouillée.',
    'Lina ne peut donc pas entrer.'
   ],
   feedback:'Oui. Cette réponse contredit le texte et doit être réparée.'
  },
  {
   id:'g2',type:'choice',
   title:'Comment réparer ?',
   prompt:'Tu avais compris que Lina était entrée dans le magasin. Que dois-tu faire ?',
   choices:[
    'Relire le passage et corriger ma réponse.',
    'Garder ma première idée même si elle contredit le texte.',
    'Inventer une nouvelle phrase.'
   ],
   answer:'Relire le passage et corriger ma réponse.',
   help:[
    'Une compréhension doit rester fidèle au texte.',
    'Si une contradiction apparaît, il faut revenir au passage.',
    'Ensuite, on corrige l’idée.'
   ],
   feedback:'Exact. Revenir au texte permet de réparer sa compréhension.'
  }
 ],
 training:[
  {
   id:'t1',type:'choice',
   title:'Je vérifie avec les indices',
   prompt:'Quelle réponse est la mieux justifiée ?',
   text:'Malo met son casque, vérifie les freins puis monte sur son vélo.',
   choices:[
    'Malo se prépare à faire du vélo.',
    'Malo va prendre l’avion.',
    'Malo se prépare à nager.'
   ],
   answer:'Malo se prépare à faire du vélo.',
   help:[
    'Cherche les indices matériels.',
    'Casque + freins + vélo vont ensemble.',
    'La réponse doit correspondre à tous les indices.'
   ],
   feedback:'Bravo. Tu vérifies ta compréhension avec plusieurs indices.'
  },
  {
   id:'t2',type:'highlight',
   title:'Je repère ce qui ne va pas',
   prompt:'Touche l’idée qui contredit le texte.',
   text:'La randonnée est annulée car le sentier est inondé. Le groupe reste donc au centre et prépare une activité en intérieur.',
   items:[
    'Le sentier est inondé.',
    'Le groupe part quand même en randonnée.',
    'Une activité en intérieur est organisée.'
   ],
   answers:[1],max:1,
   help:[
    'Le texte dit explicitement que la randonnée est annulée.',
    'Une idée contraire doit être rejetée.',
    'Le groupe reste au centre.'
   ],
   feedback:'Exact. Cette idée ne peut pas être conservée.'
  },
  {
   id:'t3',type:'multi',
   title:'Je répare ma compréhension',
   prompt:'Quelles actions peuvent t’aider si tu réalises que tu ne comprends plus ?',
   items:[
    'Relire le passage.',
    'Chercher les mots de liaison.',
    'Revenir à la phrase précédente.',
    'Continuer sans vérifier.'
   ],
   answers:[
    'Relire le passage.',
    'Chercher les mots de liaison.',
    'Revenir à la phrase précédente.'
   ],
   help:[
    'Cherche les actions qui permettent de revenir au sens.',
    'Relire est utile.',
    'Les mots de liaison et les phrases précédentes peuvent éclairer le passage.'
   ],
   feedback:'Oui. Ces stratégies permettent de réparer une compréhension fragile.'
  }
 ],
 challenge:[
  {
   id:'c1',type:'choice',
   title:'Mon défi 1',
   prompt:'Sans aide : quelle réponse est incompatible avec le texte ?',
   text:'Le car arrive avec dix minutes d’avance. Les élèves montent calmement et partent à l’heure prévue.',
   choices:[
    'Le car est en retard.',
    'Les élèves montent calmement.',
    'Le départ a lieu à l’heure prévue.'
   ],
   answer:'Le car est en retard.',
   feedback:'Bravo ! Tu as repéré une contradiction.'
  },
  {
   id:'c2',type:'choice',
   title:'Mon défi 2',
   prompt:'Sans aide : tu hésites entre deux réponses. Que fais-tu ?',
   choices:[
    'Je retourne au texte pour chercher les indices qui permettent de choisir.',
    'Je choisis au hasard.',
    'Je garde les deux réponses sans vérifier.'
   ],
   answer:'Je retourne au texte pour chercher les indices qui permettent de choisir.',
   feedback:'Très bien ! Tu sais vérifier et réparer ta compréhension.'
  }
 ]
};

})();