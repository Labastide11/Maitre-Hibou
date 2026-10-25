(function(){
"use strict";
  var SCIENCE_SVG_CLOSED_LIT = '<svg width="120" height="80" viewBox="0 0 120 80"><rect x="10" y="30" width="26" height="14" fill="#333" rx="2"/><line x1="36" y1="37" x2="60" y2="15" stroke="#333" stroke-width="3"/><line x1="60" y1="15" x2="90" y2="15" stroke="#333" stroke-width="3"/><circle cx="95" cy="25" r="12" fill="#FFD65C" stroke="#333" stroke-width="2"/><line x1="95" y1="37" x2="95" y2="55" stroke="#333" stroke-width="3"/><line x1="95" y1="55" x2="10" y2="55" stroke="#333" stroke-width="3"/><line x1="10" y1="55" x2="10" y2="30" stroke="#333" stroke-width="3"/></svg>';
  var SCIENCE_SVG_OPEN_DARK = '<svg width="120" height="80" viewBox="0 0 120 80"><rect x="10" y="30" width="26" height="14" fill="#333" rx="2"/><line x1="36" y1="37" x2="60" y2="15" stroke="#333" stroke-width="3"/><line x1="60" y1="15" x2="90" y2="15" stroke="#333" stroke-width="3"/><circle cx="95" cy="25" r="12" fill="#e8e2cf" stroke="#333" stroke-width="2"/><line x1="95" y1="37" x2="95" y2="55" stroke="#333" stroke-width="3"/><line x1="95" y1="55" x2="55" y2="55" stroke="#333" stroke-width="3"/><line x1="10" y1="55" x2="10" y2="30" stroke="#333" stroke-width="3"/></svg>';

  var SCIENCE_SESSIONS = [
    {id:1,title:"Séance 1",short:"Vivant / non-vivant",emoji:"🌱",objective:"Je sais distinguer ce qui est vivant de ce qui ne l'est pas.",criteria:["Naître, grandir, se nourrir, se reproduire, mourir","Classer des éléments","Justifier mon choix"],exos:[
      {type:"sort",title:"Trie les éléments",instr:"Touche une photo puis la bonne catégorie.",items:[
        {label:"un oiseau",image:"images-lecons/sciences/vivant-cartes/oiseau.webp"},
        {label:"un caillou",image:"images-lecons/sciences/vivant-cartes/pierre.webp"},
        {label:"un arbre",image:"images-lecons/sciences/vivant-cartes/arbre.webp"},
        {label:"une voiture",image:"images-lecons/sciences/vivant-cartes/voiture.webp"},
        {label:"une chenille",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Caterpillar_on_a_green_leaf.jpg/640px-Caterpillar_on_a_green_leaf.jpg"},
        {label:"un champignon",image:"https://upload.wikimedia.org/wikipedia/commons/c/c6/Champignon_Mushroom_%282925054398%29.jpg"},
        {label:"une chaise",image:"images-lecons/sciences/vivant-cartes/chaise.webp"},
        {label:"un ballon",image:"images-lecons/sciences/vivant-cartes/ballon.webp"}
      ],zones:["Vivant","Non-vivant"],zoneIcons:["🌱","🪨"],zoneColors:["#D9EDD1","#E6E1D3"],correct:[0,1,0,1,0,0,1,1]},
      {type:"choice",title:"Vrai ou faux",instr:"Un caillou grandit tout seul comme une plante.",options:["Vrai","Faux"],correct:1},
      {type:"choice",title:"Complète",instr:"Un être vivant peut...",options:["se reproduire","rester identique pour toujours","ne jamais avoir besoin de nourriture"],correct:0},
      {type:"choice",title:"Qui grandit ?",instr:"Observe les deux photographies. Pourquoi l'arbre est-il vivant ?",photos:[
        {src:"https://commons.wikimedia.org/wiki/Special:FilePath/Oak_sapling.jpg?width=480",label:"Un jeune chêne"},
        {src:"images-lecons/sciences/vivant-cartes/arbre.webp",label:"Un grand arbre"}
      ],options:["Parce qu'il grandit et a besoin d'eau.","Parce qu'il est vert.","Parce qu'il ne bouge pas."],correct:0,retry:true,explanation:"Un arbre est vivant : il grandit et il a besoin d'eau. Être vert ne suffit pas pour être vivant."},
      {type:"choice",title:"Le défi de Maître Hibou",instr:"Le nuage se déplace, le champignon ne marche pas. Lequel est vivant ?",photos:[
        {src:"https://commons.wikimedia.org/wiki/Special:FilePath/Cumulus%20cloud%20-2025.jpg?width=480",label:"Un nuage"},
        {src:"https://upload.wikimedia.org/wikipedia/commons/c/c6/Champignon_Mushroom_%282925054398%29.jpg",label:"Un champignon"}
      ],options:["Le nuage, parce qu'il bouge.","Le champignon, parce qu'il grandit et se nourrit.","Les deux sont vivants."],correct:1,retry:true,explanation:"Le champignon est vivant : il grandit et se nourrit. Un nuage bouge, mais il n'est pas vivant."}
    ]},
    {id:2,title:"Séance 2",short:"La vie d'une plante",emoji:"🌿",objective:"Je sais expliquer les étapes de la vie d'une plante.",criteria:["Observer les cinq étapes du haricot","Nommer les parties d'une plante","Comprendre ses besoins"],exos:[
      {type:"order",title:"De la graine à la plante",instr:"Touche les cinq photographies dans l'ordre de la vie du haricot.",photoSteps:[
        {label:"Une graine",src:"https://commons.wikimedia.org/wiki/Special:FilePath/Bean%20germination.jpg?width=480"},
        {label:"La graine germe",src:"https://commons.wikimedia.org/wiki/Special:FilePath/Haricot%2001.JPG?width=480"},
        {label:"Une jeune plante",src:"https://commons.wikimedia.org/wiki/Special:FilePath/Haricot%2003.JPG?width=480"},
        {label:"La plante fleurit",src:"https://commons.wikimedia.org/wiki/Special:FilePath/Common%20Bean%2C%20blossoms.jpg?width=480"},
        {label:"Des gousses avec des graines",src:"https://commons.wikimedia.org/wiki/Special:FilePath/Phaseolus%20vulgaris%20white%20bean%20seedpods%2C%20witte%20boon%20rijpe%20peulen.jpg?width=480"}
      ],correctOrder:["Une graine","La graine germe","Une jeune plante","La plante fleurit","Des gousses avec des graines"],hint:"La graine germe, la jeune plante grandit, puis les fleurs donnent des gousses qui contiennent des graines."},
      {type:"match",title:"Les parties de la plante",instr:"Observe le haricot. Associe chaque partie à son rôle.",photos:[{src:"https://commons.wikimedia.org/wiki/Special:FilePath/Navy%20Bean%20Seed%20to%20Seedling%20Germination.jpg?width=600",label:"Le haricot : racines, tige et feuilles"}],left:["Les racines","La tige","Les feuilles","La fleur"],right:["Capte la lumière du soleil","Peut donner une gousse contenant des graines","Absorbent de l'eau","Porte les feuilles"],pairs:[2,3,0,1]},
      {type:"choice",title:"Les besoins d'une plante",instr:"Une plante manque d'eau et ses feuilles se flétrissent. Pourquoi ?",photos:[{src:"https://commons.wikimedia.org/wiki/Special:FilePath/Pinto%20Bean%20Plant.jpg?width=500",label:"Un plant de haricot"}],options:["Parce qu'elle a besoin d'eau pour vivre.","Parce que ses feuilles deviennent des graines.","Parce qu'elle n'a pas de fleurs."],correct:0,retry:true,hint:"Pense à ce que tu fais quand la terre d'une plante est sèche.",explanation:"Une plante a besoin d'eau pour vivre et grandir. Elle a aussi besoin de lumière et d'air."},
      {type:"choice",title:"Que va-t-il se passer ?",instr:"Une graine de haricot commence à germer. Quelle partie apparaît en premier ?",photos:[{src:"https://commons.wikimedia.org/wiki/Special:FilePath/Bean%20germination.jpg?width=500",label:"Une graine qui germe"}],options:["Une racine","Une fleur","Une gousse"],correct:0,retry:true,hint:"Cherche la partie qui absorbe l'eau dans le sol.",explanation:"Lors de la germination, une petite racine apparaît avant la tige, les feuilles et la fleur."},
      {type:"choice",title:"Le défi de Maître Hibou",instr:"À quoi servent les graines dans une gousse de haricot ?",photos:[{src:"https://commons.wikimedia.org/wiki/Special:FilePath/Phaseolus%20vulgaris%20white%20bean%20seedpods%2C%20witte%20boon%20rijpe%20peulen.jpg?width=500",label:"Une gousse contenant des graines"}],options:["À faire naître de nouveaux plants de haricot.","À rendre les feuilles plus vertes.","À transformer les fleurs en cailloux."],correct:0,retry:true,hint:"Rappelle-toi ce qui est à l'origine d'une nouvelle plante.",explanation:"Une graine peut germer et donner naissance à une nouvelle plante : c'est le cycle de vie."}
    ]},
    {id:3,title:"Séance 3",short:"La vie des animaux",emoji:"🐣",objective:"Je sais décrire les grandes étapes de la vie d'un animal.",criteria:["Ordonner les étapes de la vie d'une poule","Distinguer ovipare et vivipare","Comprendre les transformations"],exos:[
      {type:"order",title:"De l'œuf à la poule",instr:"Touche les quatre photographies dans l'ordre de croissance.",photoSteps:[
        {label:"Un œuf",src:"images-lecons/sciences/seance3/oeuf-poule.jpg"},
        {label:"Le poussin sort de l'œuf",src:"images-lecons/sciences/seance3/poussin-eclosion.jpg"},
        {label:"Un jeune poulet",src:"images-lecons/sciences/seance3/jeune-poulet.jpg"},
        {label:"Une poule adulte",src:"images-lecons/sciences/seance3/poule-adulte.jpg"}
      ],correctOrder:["Un œuf","Le poussin sort de l'œuf","Un jeune poulet","Une poule adulte"],hint:"L'animal commence dans l'œuf, naît, puis grandit jusqu'à devenir adulte.",success:"Bravo, les étapes de la vie de la poule sont dans le bon ordre."},
      {type:"sort",title:"Ovipare ou vivipare ?",instr:"Observe la photo, puis touche le bon groupe.",items:[
        {label:"une poule",image:"images-lecons/sciences/seance3/poule.jpg"},
        {label:"une vache",image:"images-lecons/sciences/seance3/vache.jpg"},
        {label:"une tortue",image:"images-lecons/sciences/seance3/tortue.jpg"},
        {label:"un chat",image:"images-lecons/sciences/seance3/chat.jpg"},
        {label:"un canard",image:"images-lecons/sciences/seance3/canard.jpg"},
        {label:"un éléphant",image:"images-lecons/sciences/seance3/elephant.jpg"}
      ],zones:["Ovipare","Vivipare"],zoneIcons:["🥚","🐘"],zoneColors:["#FDEBC8","#E3D4F0"],help:[{icon:"🥚",text:"Ovipare : le petit se développe dans un œuf pondu."},{icon:"🐘",text:"Vivipare : le petit se développe dans le ventre de sa mère."}],correct:[0,1,0,1,0,1]},
      {type:"match",title:"Qui devient qui ?",instr:"Associe chaque jeune animal à l'adulte correspondant.",left:["Une chenille","Un têtard","Un poussin"],right:["Une grenouille","Une poule","Un papillon"],pairs:[2,0,1],photos:[
        {src:"images-lecons/sciences/vivant-cartes/grenouille.webp",label:"Une grenouille"},
        {src:"images-lecons/sciences/seance3/papillon-adulte.jpg",label:"Un papillon"},
        {src:"images-lecons/sciences/seance3/jeune-poulet.jpg",label:"Un jeune poulet"}
      ]},
      {type:"order",title:"Le cycle de vie du papillon",instr:"Remets les quatre étapes dans l'ordre.",photoSteps:[
        {label:"Des œufs",src:"images-lecons/sciences/seance3/papillon-oeufs.jpg"},
        {label:"Une chenille",src:"images-lecons/sciences/seance3/papillon-chenille.jpg"},
        {label:"Une chrysalide",src:"images-lecons/sciences/seance3/papillon-chrysalide.jpg"},
        {label:"Un papillon",src:"images-lecons/sciences/seance3/papillon-adulte.jpg"}
      ],correctOrder:["Des œufs","Une chenille","Une chrysalide","Un papillon"],hint:"Le papillon pond des œufs. Une chenille en sort, devient chrysalide, puis papillon.",success:"Bravo, le cycle de vie du papillon est dans le bon ordre."},
      {type:"choice",title:"Le défi de Maître Hibou",instr:"Le têtard ne ressemble pas à la grenouille. Est-ce pourtant le même animal qui grandit ?",photos:[
        {src:"images-lecons/sciences/seance3/tetard.jpg",label:"Un têtard"},
        {src:"images-lecons/sciences/vivant-cartes/grenouille.webp",label:"Une grenouille"}
      ],options:["Oui, le têtard se transforme en grenouille.","Non, ce sont deux animaux sans rapport.","Non, le têtard devient un poisson."],correct:0,retry:true,hint:"Observe ce que devient un têtard au fil du temps.",explanation:"Le têtard grandit et se transforme en grenouille. On appelle ce changement une métamorphose."}
    ]},
    {id:4,title:"Séance 4",short:"Déchets et biodiversité",emoji:"♻️",objective:"Je sais trier les déchets et protéger la biodiversité.",criteria:["Classer six déchets","Comprendre le recyclage","Protéger les êtres vivants et leurs habitats"],exos:[
      {type:"sort",title:"1. Je trie les déchets",instr:"Touche un déchet puis choisis la bonne catégorie.",items:[
        {label:"une bouteille en verre",image:"images-lecons/sciences/seance4/bouteille-verre.jpg"},
        {label:"une boîte en carton",image:"images-lecons/sciences/seance4/boite-carton.jpg"},
        {label:"une peau de banane",image:"images-lecons/sciences/seance4/peau-banane.jpg"},
        {label:"une canette",image:"images-lecons/sciences/seance4/canette.jpg"},
        {label:"un journal",image:"images-lecons/sciences/seance4/journal.jpg"},
        {label:"un trognon de pomme",image:"images-lecons/sciences/seance4/trognon-pomme.jpg"}
      ],zones:["Emballages et papiers","Verre","Biodéchets"],zoneIcons:["♻️","🍾","🍂"],zoneColors:["#FCEFC0","#CDE9D8","#E4D3B8"],help:[{icon:"🟡",text:"Emballages et papiers : carton, canette, journal."},{icon:"🟢",text:"Verre : bouteilles et bocaux."},{icon:"🟤",text:"Biodéchets : épluchures et restes de fruits."}],correct:[1,0,2,0,0,2]},
      {type:"choice",title:"2. Que devient un déchet ?",instr:"Une bouteille en plastique a été collectée pour être recyclée. Que peut-on fabriquer ?",photos:[{src:"images-lecons/sciences/seance4/bouteilles-plastique.jpg",label:"Des bouteilles en plastique à recycler"}],options:["Un nouvel objet en plastique.","Une pierre naturelle.","Une nouvelle graine."],correct:0,retry:true,hint:"Le recyclage permet de réutiliser la matière d'un déchet.",explanation:"Certains plastiques peuvent être transformés en nouvelles matières et en nouveaux objets."},
      {type:"choice",title:"3. À quoi servent les abeilles ?",instr:"Observe cette abeille sur une fleur. Pourquoi est-elle utile à beaucoup de plantes ?",photos:[{src:"images-lecons/sciences/seance4/abeille-fleur.jpg",label:"Une abeille visite une fleur"}],options:["Elle transporte du pollen de fleur en fleur.","Elle fabrique les feuilles des plantes.","Elle arrose les fleurs."],correct:0,retry:true,hint:"Quand elle visite plusieurs fleurs, de petits grains s'accrochent à elle.",explanation:"Les abeilles transportent du pollen. Elles aident ainsi de nombreuses plantes à produire des graines."},
      {type:"choice",title:"4. Je protège la nature",instr:"Dans un parc, quel geste protège les animaux et les plantes ?",photos:[{src:"images-lecons/sciences/seance4/jardin-protege.jpg",label:"Un jardin accueille de nombreux êtres vivants"}],options:["Rester sur le chemin et emporter ses déchets.","Enlever toutes les fleurs sauvages pour faire de la place.","Déplacer un nid pour mieux observer les oiseaux."],correct:0,retry:true,hint:"Pense à ce dont les petits animaux ont besoin pour vivre tranquilles.",explanation:"Emporter ses déchets et respecter les habitats aide à protéger les êtres vivants."},
      {type:"choice",title:"5. Le défi de Maître Hibou",instr:"On retire tous les buissons et les feuilles mortes d'un jardin. Que risque-t-il de se passer ?",photos:[{src:"images-lecons/sciences/seance4/herisson-abri.jpg",label:"Un hérisson et d'autres animaux vivent au jardin"}],options:["Des petits animaux perdent leurs abris.","Les hérissons trouvent forcément plus de nourriture.","Tous les animaux viennent habiter dans ce jardin."],correct:0,retry:true,hint:"À quoi servent les feuilles et les buissons pour un hérisson ?",explanation:"Les buissons et les feuilles mortes peuvent abriter des petits animaux. Préserver ces endroits aide à protéger la biodiversité."}
    ]},
    {id:5,title:"Séance 5",short:"L'eau dans la nature",emoji:"💧",objective:"Je sais nommer les états de l'eau et le cycle de l'eau.",criteria:["Solide, liquide, gaz","Cycle de l'eau","Propriétés de l'eau"],exos:[
      {type:"match",title:"Relie l'état à l'exemple",instr:"Clique un état puis le bon exemple.",left:["Solide","Liquide","Gaz"],right:["Un glaçon","L'eau de la rivière","La vapeur d'eau"],pairs:[0,1,2]},
      {type:"order",title:"Cycle de l'eau",instr:"Clique les étapes dans l'ordre.",bank:["Il pleut","L'eau s'évapore vers le ciel","La vapeur forme des nuages","L'eau retourne dans les rivières et la mer"],correctOrder:["L'eau s'évapore vers le ciel","La vapeur forme des nuages","Il pleut","L'eau retourne dans les rivières et la mer"],help:[{icon:"☀️",text:"1. Évaporation"},{icon:"☁️",text:"2. Condensation"},{icon:"🌧️",text:"3. Précipitation"},{icon:"🌊",text:"4. Retour vers les rivières et la mer"}]},
      {type:"choice",title:"Vrai ou faux",instr:"L'eau pure a un goût sucré.",options:["Vrai","Faux"],correct:1}
    ]},
    {id:6,title:"Séance 6",short:"Circuit électrique",emoji:"💡",objective:"Je sais faire circuler le courant dans un circuit simple.",criteria:["Pile, fil, ampoule, interrupteur","Circuit fermé","Reconnaître un circuit qui fonctionne"],exos:[
      {type:"choice",title:"Quel circuit allume l'ampoule ?",instr:"Observe les deux schémas et choisis celui qui fonctionne.",imgOptions:[SCIENCE_SVG_CLOSED_LIT,SCIENCE_SVG_OPEN_DARK],correct:0},
      {type:"match",title:"Relie le composant à son nom",instr:"Clique un composant puis son nom.",left:["🔋","💡","🔌","🔘"],right:["La pile","L'ampoule","Le fil électrique","L'interrupteur"],pairs:[0,1,2,3]},
      {type:"checklist",title:"Bilan sciences",instr:"Coche ce que tu sais faire.",items:["Distinguer vivant / non-vivant","Expliquer la vie d'une plante","Expliquer la vie d'un animal","Trier les déchets","Nommer les états de l'eau","Fermer un circuit électrique"]}
    ]}
  ];


window.MHScienceSessions = SCIENCE_SESSIONS;
})();
