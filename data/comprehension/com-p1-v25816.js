/* Maître Hibou V25.8.16 — Compréhension P1 */
(function(){
'use strict';
window.HIBOU_LEARNING_ACTIVITIES=window.HIBOU_LEARNING_ACTIVITIES||{};

window.HIBOU_LEARNING_ACTIVITIES['COM-P1-01']={
 code:'COM-P1-01',domain:'Compréhension de l’écrit',title:'Identifier les personnages',
 studentGoal:'Je sais dire qui sont les personnages d’un récit.',
 lesson:{intro:'Les personnages sont les personnes ou les animaux qui participent à l’histoire. Un lieu ou un objet n’est pas un personnage.',steps:['Je cherche qui agit ou parle dans l’histoire.','Je repère le personnage principal.','Je repère les autres personnages.','Je ne confonds pas un personnage avec un lieu ou un objet.'],example:{word:'Lina et son chien Oslo courent dans le parc.',chunks:['Lina','Oslo'],sentence:'Les personnages sont Lina et Oslo. Le parc est un lieu.'}},
 guided:[
  {id:'g1',type:'multi',title:'Qui sont les personnages ?',prompt:'Touche tous les personnages.',text:'Malo entre dans la cuisine. Sa sœur Inès lui montre un gâteau. Le four est encore chaud.',items:['Malo','Inès','la cuisine','le four'],answers:['Malo','Inès'],help:['Cherche qui fait quelque chose.','Malo entre dans la cuisine.','Inès montre un gâteau.'],feedback:'Oui. Malo et Inès sont les personnages.'},
  {id:'g2',type:'highlight',title:'Je trouve le personnage principal',prompt:'Touche la phrase qui montre qui est au centre de l’histoire.',items:['Nora prépare son sac pour partir en randonnée.','Son père ferme la voiture.','La montagne apparaît au loin.'],answers:[0],max:1,help:['Qui fait l’action principale au début ?','Cherche la personne dont on parle d’abord.','C’est Nora.'],feedback:'Exact. Nora est le personnage principal de ce petit passage.'}
 ],
 training:[
  {id:'t1',type:'multi',title:'Personnage ou lieu ?',prompt:'Touche seulement les personnages.',text:'À la ferme, Tom nourrit les poules avec sa grand-mère. Le tracteur est garé près de la grange.',items:['Tom','sa grand-mère','la ferme','le tracteur','la grange'],answers:['Tom','sa grand-mère'],help:['Les personnages peuvent agir.','Tom nourrit les poules.','Sa grand-mère est avec lui.'],feedback:'Bravo. Tu as distingué les personnages des lieux et des objets.'},
  {id:'t2',type:'choice',title:'Qui agit ?',prompt:'Qui ferme la fenêtre ?',text:'Éva lit près de la fenêtre. Son frère Sami entre dans la chambre et ferme la fenêtre avant de sortir.',choices:['Éva','Sami','la chambre'],answer:'Sami',help:['Relis la seconde phrase.','Cherche le verbe « ferme ».','Le sujet de « ferme » est Sami.'],feedback:'Oui. C’est Sami qui ferme la fenêtre.'},
  {id:'t3',type:'highlight',title:'Je retrouve un personnage',prompt:'Touche la phrase où apparaît un nouveau personnage.',items:['Léo avance seul dans le sentier.','Tout à coup, une vieille dame lui demande son chemin.','Le vent souffle dans les arbres.'],answers:[1],max:1,help:['Cherche une personne qui n’était pas là au début.','Elle parle à Léo.','C’est la vieille dame.'],feedback:'Exact. La vieille dame est un nouveau personnage.'}
 ],
 challenge:[
  {id:'c1',type:'multi',title:'Mon défi 1',prompt:'Sans aide : touche tous les personnages.',text:'Yanis ouvre la porte du jardin. Son chat Pixel bondit dehors. La voisine Madame Roux lui fait signe depuis son balcon.',items:['Yanis','Pixel','Madame Roux','le jardin','le balcon'],answers:['Yanis','Pixel','Madame Roux'],feedback:'Bravo ! Tu as identifié tous les personnages.'},
  {id:'c2',type:'choice',title:'Mon défi 2',prompt:'Sans aide : qui est le personnage principal ?',text:'Maya cherche son cerf-volant dans tout le parc. Son oncle l’aide quelques minutes, puis Maya l’aperçoit enfin dans un arbre.',choices:['Maya','son oncle','le cerf-volant'],answer:'Maya',feedback:'Très bien ! Maya est au centre de l’histoire.'}
 ]};

window.HIBOU_LEARNING_ACTIVITIES['COM-P1-02']={
 code:'COM-P1-02',domain:'Compréhension de l’écrit',title:'Repérer le lieu et le moment',
 studentGoal:'Je sais dire où et quand se déroule une histoire lorsque le texte permet de le savoir.',
 lesson:{intro:'Pour savoir où et quand se passe une histoire, je cherche des indices précis dans le texte. Je n’invente pas ce qui n’est pas écrit.',steps:['Je cherche les mots qui indiquent un lieu.','Je cherche les mots qui indiquent un moment.','Je vérifie que ma réponse est bien écrite dans le texte.','Si le texte ne le dit pas, je peux répondre : « On ne sait pas. »'],example:{word:'Ce matin, dans la cour de l’école, les élèves attendent le maître.',chunks:['Ce matin','dans la cour de l’école'],sentence:'Moment : ce matin. Lieu : la cour de l’école.'}},
 guided:[
  {id:'g1',type:'highlight',title:'Où se passe l’histoire ?',prompt:'Touche la phrase qui donne le lieu.',items:['Après le goûter, Noé prend son ballon.','Il rejoint ses amis sur le terrain de sport.','Ils commencent une partie.'],answers:[1],max:1,help:['Cherche un endroit.','Regarde la phrase avec « sur ».','Le lieu est le terrain de sport.'],feedback:'Oui. L’histoire se passe sur le terrain de sport.'},
  {id:'g2',type:'choice',title:'Quand cela se passe-t-il ?',prompt:'Quel moment est indiqué par le texte ?',text:'Dimanche matin, Lila accompagne son père au marché.',choices:['Dimanche matin','Dimanche soir','On ne sait pas'],answer:'Dimanche matin',help:['Le moment est écrit dès le début.','Cherche le jour et le moment de la journée.','Relis les deux premiers mots.'],feedback:'Exact : dimanche matin.'}
 ],
 training:[
  {id:'t1',type:'choice',title:'Je n’invente pas',prompt:'À quelle saison se passe cette scène ?',text:'À huit heures, Adam arrive à la piscine avec son sac bleu.',choices:['En été','En hiver','On ne sait pas'],answer:'On ne sait pas',help:['Cherche un indice de saison.','Le texte donne une heure et un lieu, mais pas de saison.','Quand ce n’est pas écrit, réponds « On ne sait pas ».'],feedback:'Bravo. Le texte ne permet pas de connaître la saison.'},
  {id:'t2',type:'highlight',title:'Je repère le moment',prompt:'Touche la phrase qui indique quand cela se passe.',items:['La rue est encore calme.','À la tombée de la nuit, les lampadaires s’allument.','Mina regarde par la fenêtre.'],answers:[1],max:1,help:['Cherche une expression de temps.','Elle indique que le jour se termine.','C’est « À la tombée de la nuit ».'],feedback:'Oui. Cette phrase donne le moment.'},
  {id:'t3',type:'choice',title:'Je repère le lieu',prompt:'Où sont les personnages ?',text:'Après la sonnerie, les élèves rangent leurs cahiers puis descendent dans la cour.',choices:['Dans la cour','À la cantine','Dans un parc'],answer:'Dans la cour',help:['Cherche le dernier endroit cité.','Les élèves « descendent dans… ».','Le mot utile est « cour ».'],feedback:'Exact : ils sont dans la cour.'}
 ],
 challenge:[
  {id:'c1',type:'choice',title:'Mon défi 1',prompt:'Sans aide : quand se déroule la scène ?',text:'Juste avant le déjeuner, Amir termine son dessin.',choices:['Avant le déjeuner','Après le dîner','On ne sait pas'],answer:'Avant le déjeuner',feedback:'Bravo ! Tu as trouvé l’indice de temps.'},
  {id:'c2',type:'choice',title:'Mon défi 2',prompt:'Sans aide : dans quelle ville se passe l’histoire ?',text:'Clara attend le bus devant la médiathèque. Il commence à pleuvoir.',choices:['À Paris','À Toulouse','On ne sait pas'],answer:'On ne sait pas',feedback:'Très bien ! Tu n’as pas inventé une information absente du texte.'}
 ]};

window.HIBOU_LEARNING_ACTIVITIES['COM-P1-03']={
 code:'COM-P1-03',domain:'Compréhension de l’écrit',title:'Ordonner les événements',
 studentGoal:'Je sais remettre les moments importants d’une histoire dans l’ordre.',
 lesson:{intro:'Pour remettre une histoire dans l’ordre, je cherche ce qui arrive d’abord, ensuite et à la fin.',steps:['Je retrouve le début.','Je repère les événements importants.','Je cherche les mots qui indiquent l’ordre : puis, ensuite, enfin…','Je vérifie que mon ordre raconte une histoire logique.'],example:{word:'D’abord / puis / enfin',chunks:['Lina met ses chaussures','elle sort','elle rejoint ses amis'],sentence:'D’abord Lina met ses chaussures, puis elle sort, enfin elle rejoint ses amis.'}},
 guided:[
  {id:'g1',type:'order',title:'Je remets l’histoire dans l’ordre',prompt:'Remets les événements dans l’ordre.',text:'Nina prend une assiette. Elle coupe une part de gâteau. Puis elle s’assoit à table.',items:['Elle s’assoit à table.','Nina prend une assiette.','Elle coupe une part de gâteau.'],answer:['Nina prend une assiette.','Elle coupe une part de gâteau.','Elle s’assoit à table.'],help:['Cherche ce qui arrive en premier.','Avant de manger, Nina prend une assiette.','La dernière action est de s’asseoir.'],feedback:'Très bien. Les trois événements sont dans l’ordre.'},
  {id:'g2',type:'choice',title:'Que se passe-t-il d’abord ?',prompt:'Quelle action arrive en premier ?',text:'Hugo ouvre son parapluie. Il traverse la rue. Enfin, il entre dans la boulangerie.',choices:['Hugo ouvre son parapluie.','Il traverse la rue.','Il entre dans la boulangerie.'],answer:'Hugo ouvre son parapluie.',help:['Lis la première phrase.','Le mot « enfin » annonce la dernière action.','Le début est l’ouverture du parapluie.'],feedback:'Oui. Hugo ouvre d’abord son parapluie.'}
 ],
 training:[
  {id:'t1',type:'order',title:'Je retrouve la chronologie',prompt:'Remets les événements dans l’ordre.',items:['Le bus arrive.','Zoé attend à l’arrêt.','Zoé monte dans le bus.'],answer:['Zoé attend à l’arrêt.','Le bus arrive.','Zoé monte dans le bus.'],help:['On attend avant que le bus arrive.','Le bus arrive avant qu’on monte dedans.','Termine par la montée dans le bus.'],feedback:'Exact. La chronologie est correcte.'},
  {id:'t2',type:'order',title:'Du début à la fin',prompt:'Remets les étapes dans l’ordre.',text:'Pour planter sa graine, Malo remplit un pot de terre, fait un petit trou, dépose la graine puis l’arrose.',items:['Malo arrose la graine.','Malo remplit le pot de terre.','Malo dépose la graine.','Malo fait un petit trou.'],answer:['Malo remplit le pot de terre.','Malo fait un petit trou.','Malo dépose la graine.','Malo arrose la graine.'],help:['Commence par préparer le pot.','Le trou doit être fait avant de déposer la graine.','On arrose à la fin.'],feedback:'Bravo. Tu as remis toutes les étapes dans l’ordre.'},
  {id:'t3',type:'choice',title:'Que se passe-t-il à la fin ?',prompt:'Quelle est la dernière action ?',text:'Le chat saute sur la chaise, renifle le coussin puis se couche dessus.',choices:['Il saute sur la chaise.','Il renifle le coussin.','Il se couche sur le coussin.'],answer:'Il se couche sur le coussin.',help:['Cherche le mot « puis ».','Après avoir reniflé, que fait le chat ?','La dernière action est se coucher.'],feedback:'Oui. Le chat se couche à la fin.'}
 ],
 challenge:[
  {id:'c1',type:'order',title:'Mon défi 1',prompt:'Sans aide : remets les événements dans l’ordre.',items:['Le film commence.','La famille achète les billets.','Tout le monde s’installe dans la salle.'],answer:['La famille achète les billets.','Tout le monde s’installe dans la salle.','Le film commence.'],feedback:'Bravo ! Tu as retrouvé la chronologie.'},
  {id:'c2',type:'order',title:'Mon défi 2',prompt:'Sans aide : remets les événements dans l’ordre.',items:['Léa ouvre son cadeau.','Les invités chantent « Joyeux anniversaire ».','Léa souffle ses bougies.'],answer:['Les invités chantent « Joyeux anniversaire ».','Léa souffle ses bougies.','Léa ouvre son cadeau.'],feedback:'Très bien ! Tu as remis les moments importants dans l’ordre.'}
 ]};

window.HIBOU_LEARNING_ACTIVITIES['COM-P1-04']={
 code:'COM-P1-04',domain:'Compréhension de l’écrit',title:'Retrouver une information explicite',
 studentGoal:'Je sais retrouver dans le texte une information qui est écrite.',
 lesson:{intro:'Une information explicite est écrite directement dans le texte. Je retourne dans le texte pour retrouver les mots qui répondent à la question.',steps:['Je lis bien la question.','Je repère les mots importants de la question.','Je retourne dans le texte.','Je trouve le passage qui donne directement la réponse.'],example:{word:'Quelle couleur ?',chunks:['Son vélo est rouge.'],sentence:'Question : De quelle couleur est le vélo ? Réponse : rouge.'}},
 guided:[
  {id:'g1',type:'highlight',title:'Je retrouve la réponse dans le texte',prompt:'Quelle phrase répond à la question : « Que mange Léo ? »',items:['Léo rentre de l’école.','Il mange une pomme dans la cuisine.','Puis il commence ses devoirs.'],answers:[1],max:1,help:['Cherche le verbe « mange ».','La réponse est dans la deuxième phrase.','On y lit « une pomme ».'],feedback:'Oui. La deuxième phrase donne directement la réponse.'},
  {id:'g2',type:'choice',title:'Je lis précisément',prompt:'Combien de livres Mia emprunte-t-elle ?',text:'À la bibliothèque, Mia choisit trois livres et une bande dessinée.',choices:['Deux','Trois','Quatre'],answer:'Trois',help:['Cherche le nombre écrit devant « livres ».','Ne compte pas la bande dessinée.','Le texte dit « trois livres ».'],feedback:'Exact : Mia emprunte trois livres.'}
 ],
 training:[
  {id:'t1',type:'highlight',title:'Je trouve le passage utile',prompt:'Touche la phrase qui indique l’heure du départ.',items:['La classe prépare les sacs.','Le car partira à neuf heures.','Les élèves sont impatients.'],answers:[1],max:1,help:['Cherche un nombre qui indique une heure.','La réponse est dans la phrase avec « car ».','Il part à neuf heures.'],feedback:'Bravo. Tu as retrouvé le passage utile.'},
  {id:'t2',type:'choice',title:'Je retrouve un détail écrit',prompt:'Quel animal Salomé observe-t-elle ?',text:'Au bord de l’étang, Salomé observe longtemps une libellule bleue posée sur un roseau.',choices:['Une libellule','Un papillon','Une grenouille'],answer:'Une libellule',help:['Relis après le verbe « observe ».','Le nom de l’animal est écrit.','C’est une libellule.'],feedback:'Oui. L’information est écrite directement dans le texte.'},
  {id:'t3',type:'highlight',title:'Je cherche une information précise',prompt:'Touche la phrase qui répond à : « Où se trouve la clé ? »',items:['Papa cherche ses lunettes.','La clé est posée sur la petite table de l’entrée.','Le téléphone sonne dans le salon.'],answers:[1],max:1,help:['Repère le mot « clé ».','La même phrase indique un endroit.','Elle est sur la petite table de l’entrée.'],feedback:'Exact. Tu as trouvé l’information demandée.'}
 ],
 challenge:[
  {id:'c1',type:'choice',title:'Mon défi 1',prompt:'Sans aide : quel jour aura lieu la sortie ?',text:'La sortie au musée est prévue jeudi. Les élèves doivent apporter un petit sac.',choices:['Mardi','Jeudi','Vendredi'],answer:'Jeudi',feedback:'Bravo ! La réponse était écrite dans le texte.'},
  {id:'c2',type:'highlight',title:'Mon défi 2',prompt:'Sans aide : touche la phrase qui répond à « Qui accompagne Yasmine ? »',items:['Yasmine va chez le dentiste.','Sa tante l’accompagne en voiture.','Le rendez-vous est à quatorze heures.'],answers:[1],max:1,feedback:'Très bien ! La deuxième phrase donne la réponse.'}
 ]};

window.HIBOU_LEARNING_ACTIVITIES['COM-P1-05']={
 code:'COM-P1-05',domain:'Compréhension de l’écrit',title:'Justifier avec un indice du texte',
 studentGoal:'Je sais montrer ce qui, dans le texte, me permet de répondre.',
 lesson:{intro:'Après avoir répondu, je peux montrer l’indice précis du texte qui prouve ma réponse.',steps:['Je réponds à la question.','Je retourne dans le texte.','Je choisis la phrase ou les mots qui prouvent ma réponse.','Je vérifie que mon indice correspond vraiment à ma réponse.'],example:{word:'Comment le sais-tu ?',chunks:['Le sol est mouillé.'],sentence:'Réponse : il a plu. Indice : « Le sol est mouillé. »'}},
 guided:[
  {id:'g1',type:'choice',title:'Je réponds',prompt:'Où est Lina ?',text:'Lina enfile son bonnet, ses gants et ses patins. Elle rejoint ensuite la glace avec son frère.',choices:['À la patinoire','À la piscine','À la bibliothèque'],answer:'À la patinoire',help:['Cherche les objets qu’elle met.','Elle enfile des patins.','On utilise des patins sur une patinoire.'],feedback:'Oui : Lina est à la patinoire.'},
  {id:'g2',type:'highlight',title:'Je montre mon indice',prompt:'Touche l’indice qui justifie la réponse « Lina est à la patinoire ».',items:['Lina enfile son bonnet.','Lina enfile ses patins.','Elle est avec son frère.'],answers:[1],max:1,help:['Quel élément est directement lié au lieu ?','Les patins sont l’indice le plus utile.','Choisis la phrase avec « patins ».'],feedback:'Exact. « Lina enfile ses patins » est l’indice le plus précis.'}
 ],
 training:[
  {id:'t1',type:'highlight',title:'Je choisis le bon indice',prompt:'Quel indice prouve que Tom est pressé ?',items:['Tom regarde sa montre toutes les trente secondes.','Tom porte un pull bleu.','La porte est ouverte.'],answers:[0],max:1,help:['Cherche une action qui montre l’impatience.','Regarder souvent l’heure est un indice.','La couleur du pull n’aide pas.'],feedback:'Oui. Regarder sans cesse sa montre montre qu’il est pressé.'},
  {id:'t2',type:'choice',title:'Je réponds grâce au texte',prompt:'Quel temps fait-il ?',text:'Mila ouvre son parapluie et court sous l’auvent pour ne pas être mouillée.',choices:['Il pleut','Il neige','Il fait très chaud'],answer:'Il pleut',help:['Cherche un objet utilisé quand il pleut.','Mila ouvre son parapluie.','Elle veut éviter d’être mouillée.'],feedback:'Exact : il pleut.'},
  {id:'t3',type:'highlight',title:'Je justifie ma réponse',prompt:'Touche l’indice qui prouve qu’il pleut.',items:['Mila court.','Mila ouvre son parapluie.','Mila est dehors.'],answers:[1],max:1,help:['Quel élément prouve vraiment la pluie ?','Courir ne suffit pas.','Le parapluie est l’indice précis.'],feedback:'Bravo. Tu as choisi l’indice qui correspond exactement à la réponse.'}
 ],
 challenge:[
  {id:'c1',type:'highlight',title:'Mon défi 1',prompt:'Sans aide : touche l’indice qui montre que Max a froid.',items:['Max ferme son livre.','Max remonte la fermeture de son manteau jusqu’au menton.','Max regarde la route.'],answers:[1],max:1,feedback:'Bravo ! Cet indice permet de comprendre que Max a froid.'},
  {id:'c2',type:'highlight',title:'Mon défi 2',prompt:'Sans aide : touche l’indice qui montre que Zoé est contente.',items:['Zoé serre son cadeau contre elle avec un grand sourire.','Zoé pose son sac près de la porte.','Zoé regarde l’horloge.'],answers:[0],max:1,feedback:'Très bien ! Le grand sourire est un indice précis.'}
 ]};

})();