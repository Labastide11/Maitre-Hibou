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
        {label:"un champignon",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Forest_Mushroom.JPG/640px-Forest_Mushroom.JPG"},
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
        {src:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Forest_Mushroom.JPG/640px-Forest_Mushroom.JPG",label:"Un champignon"}
      ],options:["Le nuage, parce qu'il bouge.","Le champignon, parce qu'il grandit et se nourrit.","Les deux sont vivants."],correct:1,retry:true,explanation:"Le champignon est vivant : il grandit et se nourrit. Un nuage bouge, mais il n'est pas vivant."}
    ]},
    {id:2,title:"Séance 2",short:"La vie d'une plante",emoji:"🌿",objective:"Je sais expliquer les étapes de la vie d'une plante.",criteria:["Graine, germination, tige, feuilles, fleur, fruit","Vocabulaire de la plante","Besoins d'une plante"],exos:[
      {type:"order",title:"Remets les étapes dans l'ordre",instr:"Clique les étapes dans le bon ordre de croissance.",bank:["La fleur devient un fruit avec des graines","La plante fait des feuilles et une tige","La graine germe","On plante une graine dans la terre","Une fleur apparaît"],correctOrder:["On plante une graine dans la terre","La graine germe","La plante fait des feuilles et une tige","Une fleur apparaît","La fleur devient un fruit avec des graines"],help:[{icon:"🌰",text:"1. On plante la graine dans la terre"},{icon:"🌱",text:"2. La graine germe"},{icon:"🌿",text:"3. La plante grandit"},{icon:"🌸",text:"4. Une fleur apparaît"},{icon:"🍎",text:"5. Le fruit contient des graines"}]},
      {type:"match",title:"Relie le mot à sa définition",instr:"Clique un mot puis sa définition.",left:["Racine","Tige","Feuille","Fleur"],right:["Fixe la plante et absorbe l'eau","Porte les feuilles","Capte la lumière du soleil","Deviendra un fruit"],pairs:[0,1,2,3]},
      {type:"choice",title:"Besoins d'une plante",instr:"De quoi une plante a-t-elle besoin pour pousser ?",options:["Eau, lumière et terre","Bonbons et musique","Uniquement de l'obscurité"],correct:0}
    ]},
    {id:3,title:"Séance 3",short:"La vie des animaux",emoji:"🐣",objective:"Je sais décrire les grandes étapes de la vie d'un animal.",criteria:["Naissance, croissance, adulte, reproduction","Ovipare et vivipare","Classer des animaux"],exos:[
      {type:"sort",title:"Ovipare ou vivipare ?",instr:"Ovipare = naît d'un œuf. Vivipare = naît directement formé.",items:["🐔 la poule","🐄 la vache","🐍 le serpent","🐱 le chat","🐟 le poisson","🐘 l'éléphant"],zones:["Ovipare","Vivipare"],zoneIcons:["🥚","🤱"],zoneColors:["#FDEBC8","#E3D4F0"],help:[{icon:"🥚",text:"Ovipare : le bébé naît dans un œuf."},{icon:"🤱",text:"Vivipare : le bébé naît déjà formé."}],correct:[0,1,0,1,0,1]},
      {type:"order",title:"Étapes de la vie",instr:"Clique les étapes dans l'ordre.",bank:["Il devient adulte","Il naît","Il se reproduit à son tour","Il grandit"],correctOrder:["Il naît","Il grandit","Il devient adulte","Il se reproduit à son tour"]},
      {type:"choice",title:"Vrai ou faux",instr:"Tous les bébés animaux ressemblent exactement à leurs parents dès la naissance.",options:["Vrai","Faux"],correct:1}
    ]},
    {id:4,title:"Séance 4",short:"Déchets et biodiversité",emoji:"♻️",objective:"Je sais trier les déchets et protéger la biodiversité.",criteria:["Associer un déchet à la bonne poubelle","Comprendre le recyclage","Protéger la biodiversité"],exos:[
      {type:"sort",title:"Trie les déchets",instr:"Clique un déchet puis la bonne poubelle.",items:["🍾 une bouteille en verre","📦 une boîte en carton","🍌 une peau de banane","🥫 une canette","📰 un journal","🍎 un trognon de pomme"],zones:["Emballages / papier / carton","Verre","Biodéchets"],zoneIcons:["♻️","🍾","🍂"],zoneColors:["#FCEFC0","#CDE9D8","#E4D3B8"],help:[{icon:"🟡",text:"Jaune : emballages, papier, carton, métal."},{icon:"🟢",text:"Vert : verre."},{icon:"🟤",text:"Marron : biodéchets."}],correct:[1,0,2,0,0,2]},
      {type:"choice",title:"Le recyclage",instr:"Choisis la bonne définition.",options:["Transformer un déchet en nouvel objet","Jeter un déchet n'importe où","Brûler tous les déchets"],correct:0},
      {type:"checklist",title:"Pourquoi protéger la biodiversité ?",instr:"Coche les bonnes raisons.",items:["Chaque espèce a un rôle dans la nature","Les animaux et plantes nous aident à vivre","Si une espèce disparaît, cela peut perturber l'écosystème"]}
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
