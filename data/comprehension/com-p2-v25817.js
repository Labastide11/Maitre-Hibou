/* Maître Hibou V25.8.17 — Compréhension P2
   Les codes COM-P2 restent strictement internes. */
(function(){
'use strict';
window.HIBOU_LEARNING_ACTIVITIES=window.HIBOU_LEARNING_ACTIVITIES||{};

/* COM-P2-01 — Comprendre un mot grâce au contexte ou à sa formation */
window.HIBOU_LEARNING_ACTIVITIES['COM-P2-01']={
 code:'COM-P2-01',domain:'Compréhension de l’écrit',
 title:'Comprendre un mot grâce au contexte ou à sa formation',
 studentGoal:'Je sais chercher le sens d’un mot inconnu à partir du texte et du mot lui-même.',
 lesson:{
  intro:'Quand je rencontre un mot inconnu, je peux utiliser les mots autour et les parties du mot que je connais.',
  steps:['Je lis la phrase entière.','Je cherche des indices dans les mots autour.','Je regarde si je reconnais une partie du mot.','Je propose un sens puis je vérifie qu’il convient dans la phrase.'],
  example:{word:'imprudent',chunks:['im','prudent'],sentence:'Il traverse sans regarder : il est imprudent. Le préfixe « im- » aide à comprendre le contraire de prudent.'}
 },
 guided:[
  {id:'g1',type:'choice',title:'Je m’aide du contexte',prompt:'Que signifie probablement « trempé » ?',text:'Léo sort de la piscine. Son maillot dégouline et sa serviette est trempée.',choices:['Très mouillée','Très chaude','Très légère'],answer:'Très mouillée',help:['Regarde ce qui se passe après la piscine.','Le maillot dégouline.','Une serviette « trempée » est pleine d’eau.'],feedback:'Oui. Le contexte montre que « trempée » signifie très mouillée.'},
  {id:'g2',type:'highlight',title:'Je trouve l’indice utile',prompt:'Touche la phrase qui aide le plus à comprendre « silencieux ».',items:['La classe entre dans la bibliothèque.','Personne ne parle et on n’entend presque aucun bruit.','Les élèves choisissent un livre.'],answers:[1],max:1,help:['Cherche une phrase qui explique l’absence de bruit.','« Personne ne parle » est un indice très fort.','Choisis la deuxième phrase.'],feedback:'Exact. Cette phrase permet de comprendre « silencieux ».'}
 ],
 training:[
  {id:'t1',type:'choice',title:'Je regarde la formation du mot',prompt:'Que peut vouloir dire « relire » ?',choices:['Lire une nouvelle fois','Arrêter de lire','Lire très vite'],answer:'Lire une nouvelle fois',help:['Regarde le début « re- ».','On retrouve ce préfixe dans refaire, recommencer…','Il indique qu’on fait l’action une nouvelle fois.'],feedback:'Bravo. « Relire » signifie lire une nouvelle fois.'},
  {id:'t2',type:'choice',title:'Je vérifie avec la phrase',prompt:'Que signifie « minuscule » ici ?',text:'Dans sa main, Ana tient une minuscule graine, plus petite qu’un grain de riz.',choices:['Très petite','Très lourde','Très brillante'],answer:'Très petite',help:['La phrase compare la graine à un grain de riz.','Elle est encore plus petite.','Le mot décrit sa taille.'],feedback:'Oui. « Minuscule » signifie très petite.'},
  {id:'t3',type:'highlight',title:'Je choisis le meilleur indice',prompt:'Quel indice aide à comprendre « épuisé » ?',items:['Samir rentre de la course.','Il s’assoit immédiatement et dit qu’il n’a plus de force.','Son maillot est rouge.'],answers:[1],max:1,help:['Cherche un indice sur l’état du personnage.','« Il n’a plus de force » donne le sens.','La couleur du maillot n’aide pas.'],feedback:'Exact. « N’a plus de force » permet de comprendre « épuisé ».'}
 ],
 challenge:[
  {id:'c1',type:'choice',title:'Mon défi 1',prompt:'Sans aide : que signifie « inhabituel » ?',text:'D’habitude la cour est pleine d’élèves. Aujourd’hui, elle est complètement vide : c’est inhabituel.',choices:['Qui n’est pas habituel','Qui est très bruyant','Qui est obligatoire'],answer:'Qui n’est pas habituel',feedback:'Bravo ! Tu as utilisé le contexte et la formation du mot.'},
  {id:'c2',type:'choice',title:'Mon défi 2',prompt:'Sans aide : que signifie « invisible » ?',text:'Le caméléon se confond avec les feuilles. De loin, il devient presque invisible.',choices:['Qu’on ne peut presque pas voir','Qu’on ne peut pas entendre','Qui ne bouge jamais'],answer:'Qu’on ne peut presque pas voir',feedback:'Très bien ! Le contexte permet de comprendre le mot.'}
 ]};

/* COM-P2-02 — Identifier le référent d’un pronom */
window.HIBOU_LEARNING_ACTIVITIES['COM-P2-02']={
 code:'COM-P2-02',domain:'Compréhension de l’écrit',
 title:'Identifier le référent d’un pronom',
 studentGoal:'Je sais retrouver qui ou quoi est désigné par un pronom.',
 lesson:{
  intro:'Un pronom comme il, elle, ils, elles ou lui remplace souvent un nom déjà cité. Je dois retrouver ce qu’il désigne.',
  steps:['Je repère le pronom.','Je regarde les noms cités avant.','Je vérifie le genre et le nombre.','Je relis la phrase avec le nom à la place du pronom pour vérifier le sens.'],
  example:{word:'elle',chunks:['Mina','elle'],sentence:'Mina prend son vélo. Elle part au parc. « Elle » désigne Mina.'}
 },
 guided:[
  {id:'g1',type:'choice',title:'Qui est « il » ?',prompt:'Qui est désigné par « il » ?',text:'Paul pose son sac. Il enlève ensuite son manteau.',choices:['Paul','le sac','le manteau'],answer:'Paul',help:['« Il » remplace une personne masculine.','Qui vient d’être nommé ?','Relis : « Paul enlève ensuite son manteau. »'],feedback:'Oui. « Il » désigne Paul.'},
  {id:'g2',type:'highlight',title:'Je retrouve le nom remplacé',prompt:'Touche le groupe de mots remplacé par « elles ».',items:['Les deux sœurs préparent la table.','Elles placent les assiettes.','Le repas est presque prêt.'],answers:[0],max:1,help:['« Elles » désigne plusieurs personnes féminines.','Cherche un groupe au pluriel.','Ce sont « les deux sœurs ».'],feedback:'Exact. « Elles » reprend « les deux sœurs ».'}
 ],
 training:[
  {id:'t1',type:'choice',title:'Que remplace « lui » ?',prompt:'Qui reçoit le ballon ?',text:'Noé voit Amir dans la cour et lui lance le ballon.',choices:['Amir','Noé','la cour'],answer:'Amir',help:['« Lui » désigne la personne qui reçoit quelque chose.','Noé lance le ballon à quelqu’un.','C’est Amir qui le reçoit.'],feedback:'Oui. « Lui » désigne Amir.'},
  {id:'t2',type:'choice',title:'Qui est « elle » ?',prompt:'Qui est désigné par « elle » ?',text:'La maîtresse appelle Jade. Elle lui demande d’effacer le tableau.',choices:['La maîtresse','Jade','le tableau'],answer:'La maîtresse',help:['Qui fait l’action de demander ?','Le premier personnage est le sujet de la phrase.','Relis avec « La maîtresse demande… ».'],feedback:'Exact. Ici, « elle » désigne la maîtresse.'},
  {id:'t3',type:'highlight',title:'Je vérifie dans le texte',prompt:'Touche la phrase qui contient le nom remplacé par « ils ».',items:['Les chiens courent vers la rivière.','Ils plongent dans l’eau.','Le maître les rappelle.'],answers:[0],max:1,help:['« Ils » désigne plusieurs êtres masculins ou mixtes.','Cherche le groupe au pluriel juste avant.','Ce sont « les chiens ».'],feedback:'Bravo. « Ils » reprend « les chiens ».'}
 ],
 challenge:[
  {id:'c1',type:'choice',title:'Mon défi 1',prompt:'Sans aide : qui est « elle » ?',text:'Lina rejoint sa cousine Zoé. Elle porte une casquette jaune.',choices:['Lina','Zoé','Impossible à savoir avec certitude'],answer:'Impossible à savoir avec certitude',feedback:'Très bien ! Le texte est ambigu : « elle » peut désigner Lina ou Zoé.'},
  {id:'c2',type:'choice',title:'Mon défi 2',prompt:'Sans aide : que désigne « le » ?',text:'Malo prend le livre posé sur la table et le range dans son sac.',choices:['Le livre','La table','Le sac'],answer:'Le livre',feedback:'Bravo ! « Le » reprend « le livre ».'}
 ]};

/* COM-P2-03 — Identifier les reprises nominales */
window.HIBOU_LEARNING_ACTIVITIES['COM-P2-03']={
 code:'COM-P2-03',domain:'Compréhension de l’écrit',
 title:'Identifier les reprises nominales',
 studentGoal:'Je sais comprendre que plusieurs expressions peuvent désigner le même personnage ou la même chose.',
 lesson:{
  intro:'Dans un texte, on évite de répéter toujours le même nom. Plusieurs expressions peuvent donc désigner le même personnage ou le même objet.',
  steps:['Je repère les différents groupes nominaux.','Je cherche s’ils peuvent désigner la même personne ou la même chose.','Je vérifie les informations données par le texte.','Je relie les expressions qui parlent du même référent.'],
  example:{word:'le garçon',chunks:['Tom','le jeune joueur','le garçon'],sentence:'Tom entre sur le terrain. Le jeune joueur salue son équipe. « Tom » et « le jeune joueur » désignent la même personne.'}
 },
 guided:[
  {id:'g1',type:'multi',title:'Même personnage',prompt:'Touche les expressions qui désignent la même personne.',text:'Mme Martin entre dans la classe. La maîtresse pose ses dossiers puis l’enseignante salue les élèves.',items:['Mme Martin','la maîtresse','l’enseignante','les élèves'],answers:['Mme Martin','la maîtresse','l’enseignante'],help:['Cherche les expressions qui peuvent parler d’une adulte qui enseigne.','Mme Martin est la maîtresse.','« L’enseignante » désigne aussi Mme Martin.'],feedback:'Oui. Les trois expressions désignent la même personne.'},
  {id:'g2',type:'choice',title:'Qui est « le jeune animal » ?',prompt:'Qui est désigné par « le jeune animal » ?',text:'Le poulain s’approche de sa mère. Le jeune animal renifle l’herbe.',choices:['Le poulain','La mère','L’herbe'],answer:'Le poulain',help:['Un poulain est un jeune cheval.','« Le jeune animal » reprend le nom donné avant.','Relis en remplaçant par « le poulain ».'],feedback:'Exact. « Le jeune animal » désigne le poulain.'}
 ],
 training:[
  {id:'t1',type:'multi',title:'Je relie les désignations',prompt:'Touche les expressions qui désignent Lucas.',text:'Lucas entre sur scène. Le jeune comédien respire profondément. Le garçon commence enfin sa réplique.',items:['Lucas','le jeune comédien','le garçon','sa réplique'],answers:['Lucas','le jeune comédien','le garçon'],help:['Les trois expressions parlent d’une personne.','Le contexte reste centré sur Lucas.','Une réplique n’est pas une personne.'],feedback:'Très bien. Ces trois expressions parlent de Lucas.'},
  {id:'t2',type:'choice',title:'Même objet',prompt:'Que désigne « le véhicule » ?',text:'Un camion rouge s’arrête devant l’école. Le véhicule transporte des cartons.',choices:['Le camion rouge','L’école','Les cartons'],answer:'Le camion rouge',help:['Un camion est un véhicule.','Le mot plus général reprend le nom précis.','Relis avec « le camion rouge transporte… ».'],feedback:'Oui. « Le véhicule » désigne le camion rouge.'},
  {id:'t3',type:'highlight',title:'Je retrouve une reprise',prompt:'Touche la phrase où le renard est désigné autrement.',items:['Le renard sort du bois.','L’animal roux s’arrête près du chemin.','Un oiseau s’envole.'],answers:[1],max:1,help:['Cherche une expression qui décrit le renard.','Le renard est un animal roux.','Choisis la deuxième phrase.'],feedback:'Exact. « L’animal roux » reprend « le renard ».'}
 ],
 challenge:[
  {id:'c1',type:'multi',title:'Mon défi 1',prompt:'Sans aide : touche toutes les expressions qui désignent Emma.',text:'Emma gagne la course. La jeune sportive sourit. La championne rejoint ensuite ses amis.',items:['Emma','la jeune sportive','la championne','ses amis'],answers:['Emma','la jeune sportive','la championne'],feedback:'Bravo ! Tu as retrouvé les différentes désignations d’Emma.'},
  {id:'c2',type:'choice',title:'Mon défi 2',prompt:'Sans aide : que désigne « l’instrument » ?',text:'Sami pose sa guitare sur une chaise. L’instrument a besoin d’être accordé.',choices:['La guitare','La chaise','Sami'],answer:'La guitare',feedback:'Très bien ! « L’instrument » reprend « la guitare ».'}
 ]};

/* COM-P2-04 — Mettre en relation texte et illustration */
window.HIBOU_LEARNING_ACTIVITIES['COM-P2-04']={
 code:'COM-P2-04',domain:'Compréhension de l’écrit',
 title:'Mettre en relation texte et illustration',
 studentGoal:'Je sais utiliser l’illustration pour compléter ce que je comprends du texte.',
 lesson:{
  intro:'Le texte et l’illustration ne donnent pas toujours exactement les mêmes informations. Je lis d’abord le texte, puis je regarde ce que l’image ajoute.',
  steps:['Je lis le texte sans regarder l’image trop vite.','Je repère ce que le texte dit clairement.','J’observe ensuite l’illustration.','Je distingue ce qui vient du texte et ce qui vient de l’image.'],
  example:{word:'Texte + image',chunks:['texte','illustration'],sentence:'Le texte dit : « Léa attend le bus. » L’image peut montrer qu’il pleut, même si ce détail n’est pas écrit.'}
 },
 guided:[
  {id:'g1',type:'choice',title:'Que montre l’image en plus ?',prompt:'Quelle information est apportée uniquement par l’illustration ?',text:'Texte : « Lina attend le bus devant l’école. »',visual:'🌧️  👧☂️  🚌',visualLabel:'Une fille avec un parapluie attend un bus sous la pluie.',visualCaption:'Observe l’illustration.',choices:['Il pleut','Lina attend le bus','Lina est devant l’école'],answer:'Il pleut',help:['Le texte dit déjà qu’elle attend le bus.','Le texte donne aussi le lieu.','La pluie apparaît seulement dans l’image.'],feedback:'Oui. L’illustration ajoute qu’il pleut.'},
  {id:'g2',type:'choice',title:'Texte ou illustration ?',prompt:'D’où vient l’information « le chien est marron » ?',text:'Texte : « Le chien court vers son maître. »',visual:'🐕🟤   🧍',visualLabel:'Un chien marron court vers une personne.',choices:['Du texte','De l’illustration','Des deux'],answer:'De l’illustration',help:['Relis le texte : parle-t-il de couleur ?','La couleur n’est pas écrite.','Elle est visible uniquement dans l’image.'],feedback:'Exact. La couleur vient de l’illustration.'}
 ],
 training:[
  {id:'t1',type:'choice',title:'Je distingue les sources',prompt:'Quelle information est donnée par le texte ET par l’image ?',text:'Texte : « Tom fait du vélo dans le parc. »',visual:'🌳  🚲👦  🌳',visualLabel:'Un garçon fait du vélo dans un parc.',choices:['Tom fait du vélo','Le vélo est rouge','Il y a deux grands arbres'],answer:'Tom fait du vélo',help:['Cherche une information visible et également écrite.','L’action principale apparaît dans les deux.','Les détails de couleur ou de nombre ne sont pas écrits.'],feedback:'Bravo. L’action est donnée par le texte et par l’image.'},
  {id:'t2',type:'choice',title:'L’image complète le texte',prompt:'Que peut-on apprendre grâce à l’image ?',text:'Texte : « La famille pique-nique près du lac. »',visual:'👨‍👩‍👧‍👦 🧺  🦆🦆  🌊',visualLabel:'Une famille pique-nique près d’un lac avec deux canards.',choices:['Il y a deux canards','La famille pique-nique','Ils sont près d’un lac'],answer:'Il y a deux canards',help:['Les deux autres informations sont déjà dans le texte.','Cherche le détail visible seulement dans l’image.','Compte les canards.'],feedback:'Oui. L’image ajoute la présence de deux canards.'},
  {id:'t3',type:'choice',title:'Je ne mélange pas',prompt:'Quelle information est seulement écrite dans le texte ?',text:'Texte : « À huit heures, Max quitte la maison. »',visual:'🏠  👦🎒  ☀️',visualLabel:'Un garçon avec un sac quitte une maison sous le soleil.',choices:['Il est huit heures','Max quitte la maison','Il y a du soleil'],answer:'Il est huit heures',help:['L’heure est-elle visible dans l’image ?','La sortie de la maison apparaît dans les deux.','Le soleil est uniquement dans l’image.'],feedback:'Exact. L’heure vient seulement du texte.'}
 ],
 challenge:[
  {id:'c1',type:'choice',title:'Mon défi 1',prompt:'Sans aide : quelle information vient seulement de l’image ?',text:'Texte : « Nora lit sur un banc. »',visual:'👧📖  🪑  🐿️',visualLabel:'Une fille lit sur un banc pendant qu’un écureuil est proche.',choices:['Nora lit','Nora est sur un banc','Un écureuil est près d’elle'],answer:'Un écureuil est près d’elle',feedback:'Bravo ! Tu as distingué ce que l’image ajoute.'},
  {id:'c2',type:'choice',title:'Mon défi 2',prompt:'Sans aide : quelle information est présente dans le texte et l’image ?',text:'Texte : « Deux enfants jouent au ballon sur la plage. »',visual:'👧⚽👦  🏖️',visualLabel:'Deux enfants jouent au ballon sur une plage.',choices:['Deux enfants jouent au ballon','Le ballon est bleu','Il fait très chaud'],answer:'Deux enfants jouent au ballon',feedback:'Très bien ! Cette information est présente dans les deux.'}
 ]};

/* COM-P2-05 — Reformuler l’essentiel */
window.HIBOU_LEARNING_ACTIVITIES['COM-P2-05']={
 code:'COM-P2-05',domain:'Compréhension de l’écrit',
 title:'Reformuler l’essentiel',
 studentGoal:'Je sais redire avec mes mots ce que j’ai compris.',
 lesson:{
  intro:'Reformuler, ce n’est pas réciter le texte. Je garde les informations importantes et je les redis plus simplement avec mes mots.',
  steps:['Je repère de qui ou de quoi parle le texte.','Je garde l’action ou l’idée importante.','Je laisse de côté les petits détails.','Je redis le sens avec une phrase plus simple.'],
  example:{word:'Reformuler',chunks:['garder l’essentiel','dire autrement'],sentence:'Texte : « Léa se dépêche car elle va rater son bus. » Reformulation : « Léa court pour ne pas manquer le bus. »'}
 },
 guided:[
  {id:'g1',type:'choice',title:'Je choisis la meilleure reformulation',prompt:'Quelle phrase dit la même chose plus simplement ?',text:'Milo met rapidement ses chaussures parce que ses amis l’attendent dehors.',choices:['Milo se dépêche de se chausser pour rejoindre ses amis.','Milo possède des chaussures.','Les amis de Milo sont dehors depuis longtemps.'],answer:'Milo se dépêche de se chausser pour rejoindre ses amis.',help:['Garde Milo, l’idée de se dépêcher et les amis.','Ne choisis pas un détail seulement.','La bonne phrase conserve le sens général.'],feedback:'Oui. Cette phrase reformule l’essentiel.'},
  {id:'g2',type:'highlight',title:'Je repère l’idée importante',prompt:'Touche la phrase la plus importante pour comprendre ce passage.',items:['Le réveil de Sarah est bleu.','Sarah se lève très tôt pour partir en voyage.','Sa valise est près de la porte.'],answers:[1],max:1,help:['Quelle phrase explique surtout ce qui se passe ?','La couleur du réveil est un détail.','Le départ en voyage est l’idée centrale.'],feedback:'Exact. Cette phrase porte l’information essentielle.'}
 ],
 training:[
  {id:'t1',type:'choice',title:'Je garde l’essentiel',prompt:'Quelle reformulation convient le mieux ?',text:'Après plusieurs essais, Yanis réussit enfin à faire tenir sa tour de cubes sans qu’elle tombe.',choices:['Yanis réussit finalement à construire sa tour.','Yanis joue avec des cubes de plusieurs couleurs.','La tour de Yanis est très haute et rouge.'],answer:'Yanis réussit finalement à construire sa tour.',help:['Cherche le résultat principal.','Les couleurs ne sont pas importantes.','L’idée essentielle est la réussite après plusieurs essais.'],feedback:'Bravo. Tu as gardé l’essentiel.'},
  {id:'t2',type:'choice',title:'Je ne change pas le sens',prompt:'Quelle phrase respecte le texte ?',text:'Le bus est en retard, alors Inès prévient son père qu’elle arrivera plus tard.',choices:['Inès prévient son père à cause du retard du bus.','Inès décide de ne pas rentrer chez elle.','Le père d’Inès conduit le bus.'],answer:'Inès prévient son père à cause du retard du bus.',help:['Garde la cause et l’action importante.','N’ajoute pas une information qui n’existe pas.','La bonne reformulation doit respecter le sens.'],feedback:'Exact. La reformulation respecte le texte.'},
  {id:'t3',type:'highlight',title:'Je laisse un détail de côté',prompt:'Touche la phrase qui est surtout un détail secondaire.',items:['Le chat s’est échappé par la fenêtre.','Toute la famille le cherche dans le quartier.','Le collier du chat est vert avec une petite clochette.'],answers:[2],max:1,help:['Le texte raconte surtout une recherche.','Quelle information pourrait être retirée sans perdre l’histoire principale ?','La description du collier est un détail.'],feedback:'Oui. La couleur du collier est un détail secondaire.'}
 ],
 challenge:[
  {id:'c1',type:'choice',title:'Mon défi 1',prompt:'Sans aide : choisis la meilleure reformulation.',text:'Le vent devient très fort. Les organisateurs arrêtent la course pour protéger les participants.',choices:['La course est interrompue à cause du vent fort.','Les participants aiment courir quand il y a du vent.','Les organisateurs regardent la météo.'],answer:'La course est interrompue à cause du vent fort.',feedback:'Bravo ! Tu as reformulé l’essentiel.'},
  {id:'c2',type:'choice',title:'Mon défi 2',prompt:'Sans aide : quelle phrase garde l’idée principale ?',text:'Emma cherche longtemps ses lunettes avant de découvrir qu’elles étaient posées sur sa tête.',choices:['Emma retrouve ses lunettes sur sa tête après les avoir cherchées.','Emma porte souvent des lunettes.','Les lunettes d’Emma sont légères.'],answer:'Emma retrouve ses lunettes sur sa tête après les avoir cherchées.',feedback:'Très bien ! Tu as gardé l’idée principale sans ajouter de détail.'}
 ]};

})();