/* Maître Hibou V25.8.10 — contenu Lecture P1 */
(function(){
'use strict';
window.HIBOU_LEARNING_ACTIVITIES=window.HIBOU_LEARNING_ACTIVITIES||{};
// Règle pédagogique V25.8.10 :
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
})();