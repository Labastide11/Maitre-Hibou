
(function(){
  if(window.__maitreHibouV25225FrancaisPrechargeRapide) return;
  window.__maitreHibouV25225FrancaisPrechargeRapide = true;
  try{ document.title = '🦉 Maître Hibou V25.8.84'; }catch(e){}

  var BASE_URL = 'https://script.google.com/macros/s/AKfycbyzfRPrUV7xKgeXUM0LjbOsOne5DieRjDYxmuVbBBUIGL-F9ahMmJZSfpUDYmBaZIOpvQ/exec';
  var SHEET_NAME = 'grammaire';
  var CACHE_KEY = 'hibou_v25225_francais_grammaire_rows_cache';
  var OLD_CACHE_KEY = 'hibou_v25222_francais_grammaire_rows_cache';
  var CACHE_TTL = 24 * 60 * 60 * 1000;
  var TRAINING_COUNT = 10;
  var BELT_COUNT = 20;
  var frenchBeltState = null;
  var FRENCH_PROGRESS_PREFIX = 'hibou_fr_ceintures_v1_';
  var MAX_WAIT_BEFORE_LOCAL = 450;
  var FETCH_TIMEOUT = 2600;

  var rowsCache = null;
  var rowsLoadingPromise = null;
  var state = {belt:null, questions:[], index:0, score:0, answered:false, source:'banque locale'};

  var BELTS = [
    {id:'blanche', ceinture:'blanche', title:'Phrase affirmative / négative', label:'Ceinture blanche', desc:'Reconnaître et transformer les phrases.', emoji:'⚪', color:'radial-gradient(circle at 35% 25%,#FFFFFF,#EDE7FF 68%,#C8B8F2)', skills:['phrase','affirmative','negative','négative','negation','forme']},
    {id:'jaune', ceinture:'jaune', title:'Le verbe', label:'Ceinture jaune', desc:'Trouver le verbe conjugué.', emoji:'🟡', color:'radial-gradient(circle at 35% 25%,#FFF7B0,#FFD93D 62%,#D9A900)', skills:['verbe']},
    {id:'orange', ceinture:'orange', title:'Le sujet', label:'Ceinture orange', desc:'Identifier le sujet du verbe.', emoji:'🟠', color:'radial-gradient(circle at 35% 25%,#FFD9BF,#FF8A5B 62%,#E75F2B)', skills:['sujet']},
    {id:'verte', ceinture:'verte', title:'Le nom commun', label:'Ceinture verte', desc:'Reconnaître les noms communs.', emoji:'🟢', color:'radial-gradient(circle at 35% 25%,#BDF6C8,#4FD46C 62%,#229B43)', skills:['nom','nom_commun','nomcommun']},
    {id:'bleue', ceinture:'bleue', title:'Le déterminant', label:'Ceinture bleue', desc:'Associer et repérer les déterminants.', emoji:'🔵', color:'radial-gradient(circle at 35% 25%,#CDEAFF,#5AA9FF 62%,#2169CF)', skills:['determinant','déterminant','determiner']},
    {id:'marron', ceinture:'marron', title:'L’infinitif', label:'Ceinture marron', desc:'Retrouver l’infinitif d’un verbe.', emoji:'🟤', color:'radial-gradient(circle at 35% 25%,#F0D1A7,#C08143 62%,#8B5526)', skills:['infinitif']},
    {id:'noire', ceinture:'noire', title:'L’adjectif', label:'Ceinture noire', desc:'Reconnaître les adjectifs.', emoji:'⚫', color:'radial-gradient(circle at 35% 25%,#777,#222 66%,#050505)', skills:['adjectif']},
    {id:'rouge', ceinture:'rouge', title:'Le groupe nominal', label:'Ceinture rouge', desc:'Repérer et enrichir le groupe nominal.', emoji:'🔴', color:'radial-gradient(circle at 35% 25%,#FF9FA8,#E52837 64%,#A90F1D)', skills:['groupe_nominal','groupe nominal','gn']}
  ];
  var IDEAS_CARD = {id:'idees', title:'Idées pour écrire', label:'Entraînement d’écriture', desc:'Tirer une idée et écrire une phrase ou un début d’histoire.', color:'radial-gradient(circle at 35% 25%,#FFF6A8,#FFD93D 62%,#E0A900)'};

  var LOCAL_BANK = {
  "blanche": [
    {
      "q": "La phrase « Le chat dort sur le tapis. » est-elle affirmative ou négative ?",
      "options": [
        "affirmative",
        "négative"
      ],
      "correct": 0
    },
    {
      "q": "La phrase « Je ne mange pas de soupe. » est-elle affirmative ou négative ?",
      "options": [
        "affirmative",
        "négative"
      ],
      "correct": 1
    },
    {
      "q": "La phrase « Maître Hibou sourit. » est-elle affirmative ou négative ?",
      "options": [
        "affirmative",
        "négative"
      ],
      "correct": 0
    },
    {
      "q": "La phrase « Les élèves ne bavardent pas. » est-elle affirmative ou négative ?",
      "options": [
        "affirmative",
        "négative"
      ],
      "correct": 1
    },
    {
      "q": "La phrase « Le soleil brille aujourd’hui. » est-elle affirmative ou négative ?",
      "options": [
        "affirmative",
        "négative"
      ],
      "correct": 0
    },
    {
      "q": "La phrase « Nous n’avons plus de feutres. » est-elle affirmative ou négative ?",
      "options": [
        "affirmative",
        "négative"
      ],
      "correct": 1
    },
    {
      "q": "La phrase « Mon frère range sa chambre. » est-elle affirmative ou négative ?",
      "options": [
        "affirmative",
        "négative"
      ],
      "correct": 0
    },
    {
      "q": "La phrase « Elle ne trouve jamais sa gomme. » est-elle affirmative ou négative ?",
      "options": [
        "affirmative",
        "négative"
      ],
      "correct": 1
    },
    {
      "q": "La phrase « Les oiseaux chantent dans le jardin. » est-elle affirmative ou négative ?",
      "options": [
        "affirmative",
        "négative"
      ],
      "correct": 0
    },
    {
      "q": "La phrase « Tu n’oublies pas ton cartable. » est-elle affirmative ou négative ?",
      "options": [
        "affirmative",
        "négative"
      ],
      "correct": 1
    },
    {
      "q": "Quelle est la forme négative de « Il joue au ballon. » ?",
      "options": [
        "Il ne joue pas au ballon.",
        "Il joue au ballon pas.",
        "Il ne joue au ballon."
      ],
      "correct": 0
    },
    {
      "q": "Quelle est la forme négative de « Nous sommes prêts. » ?",
      "options": [
        "Nous ne sommes pas prêts.",
        "Nous sommes pas prêts.",
        "Nous ne prêts sommes pas."
      ],
      "correct": 0
    },
    {
      "q": "Quelle est la forme négative de « Elle chante. » ?",
      "options": [
        "Elle ne chante pas.",
        "Elle chante ne pas.",
        "Elle pas chante."
      ],
      "correct": 0
    },
    {
      "q": "Quelle est la forme négative de « Les enfants courent. » ?",
      "options": [
        "Les enfants ne courent pas.",
        "Les enfants ne pas courent.",
        "Les enfants courent ne."
      ],
      "correct": 0
    },
    {
      "q": "Quelle est la forme affirmative de « Tu ne dessines pas. » ?",
      "options": [
        "Tu dessines.",
        "Tu pas dessines.",
        "Tu ne dessines."
      ],
      "correct": 0
    },
    {
      "q": "Quelle est la forme affirmative de « Il ne parle plus. » ?",
      "options": [
        "Il parle.",
        "Il ne parle.",
        "Il parle plus pas."
      ],
      "correct": 0
    },
    {
      "q": "Quelle est la forme affirmative de « Je ne ferme pas la porte. » ?",
      "options": [
        "Je ferme la porte.",
        "Je pas ferme la porte.",
        "Je ne ferme la porte."
      ],
      "correct": 0
    },
    {
      "q": "Quelle est la forme affirmative de « Nous ne jouons jamais dehors. » ?",
      "options": [
        "Nous jouons dehors.",
        "Nous jouons jamais dehors.",
        "Nous ne jouons dehors."
      ],
      "correct": 0
    },
    {
      "q": "Quelle phrase est négative ?",
      "options": [
        "La maîtresse écrit.",
        "La maîtresse n’écrit pas.",
        "La maîtresse explique."
      ],
      "correct": 1
    },
    {
      "q": "Quelle phrase est affirmative ?",
      "options": [
        "Il ne lit jamais.",
        "Il lit souvent.",
        "Il ne lit pas."
      ],
      "correct": 1
    }
  ],
  "jaune": [
    {
      "q": "Dans « Les enfants jouent dans la cour. », quel mot est le verbe ?",
      "options": [
        "enfants",
        "jouent",
        "cour"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Le chat dort sur le canapé. », quel mot est le verbe ?",
      "options": [
        "chat",
        "dort",
        "canapé"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Tu regardes un livre. », quel mot est le verbe ?",
      "options": [
        "Tu",
        "regardes",
        "livre"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Lina dessine une fleur. », quel mot est le verbe ?",
      "options": [
        "Lina",
        "dessine",
        "fleur"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Les oiseaux chantent le matin. », quel mot est le verbe ?",
      "options": [
        "oiseaux",
        "chantent",
        "matin"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Mon frère prépare le goûter. », quel mot est le verbe ?",
      "options": [
        "frère",
        "prépare",
        "goûter"
      ],
      "correct": 1
    },
    {
      "q": "Dans « La maîtresse ouvre la porte. », quel mot est le verbe ?",
      "options": [
        "maîtresse",
        "ouvre",
        "porte"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Les poissons nagent dans l’eau. », quel mot est le verbe ?",
      "options": [
        "poissons",
        "nagent",
        "eau"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Nous écrivons une phrase. », quel mot est le verbe ?",
      "options": [
        "Nous",
        "écrivons",
        "phrase"
      ],
      "correct": 1
    },
    {
      "q": "Dans « La pluie tombe doucement. », quel mot est le verbe ?",
      "options": [
        "pluie",
        "tombe",
        "doucement"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Les élèves rangent leurs cahiers. », quel mot est le verbe ?",
      "options": [
        "élèves",
        "rangent",
        "cahiers"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Le facteur apporte une lettre. », quel mot est le verbe ?",
      "options": [
        "facteur",
        "apporte",
        "lettre"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Mila ferme la fenêtre. », quel mot est le verbe ?",
      "options": [
        "Mila",
        "ferme",
        "fenêtre"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Vous lisez une histoire. », quel mot est le verbe ?",
      "options": [
        "Vous",
        "lisez",
        "histoire"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Le bébé sourit à sa maman. », quel mot est le verbe ?",
      "options": [
        "bébé",
        "sourit",
        "maman"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Les abeilles fabriquent du miel. », quel mot est le verbe ?",
      "options": [
        "abeilles",
        "fabriquent",
        "miel"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Je cherche mon crayon. », quel mot est le verbe ?",
      "options": [
        "Je",
        "cherche",
        "crayon"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Le train arrive à la gare. », quel mot est le verbe ?",
      "options": [
        "train",
        "arrive",
        "gare"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Les feuilles tombent en automne. », quel mot est le verbe ?",
      "options": [
        "feuilles",
        "tombent",
        "automne"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Le chien aboie dans le jardin. », quel mot est le verbe ?",
      "options": [
        "chien",
        "aboie",
        "jardin"
      ],
      "correct": 1
    }
  ],
  "orange": [
    {
      "q": "Dans « Le chien aboie. », quel est le sujet du verbe ?",
      "options": [
        "Le chien",
        "aboie",
        "Le"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Les élèves écrivent. », quel est le sujet du verbe ?",
      "options": [
        "écrivent",
        "Les élèves",
        "Les"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Ma sœur chante. », quel est le sujet du verbe ?",
      "options": [
        "Ma sœur",
        "chante",
        "sœur chante"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Le petit garçon court. », quel est le sujet du verbe ?",
      "options": [
        "court",
        "Le petit garçon",
        "garçon court"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Nous jouons au ballon. », quel est le sujet du verbe ?",
      "options": [
        "jouons",
        "ballon",
        "Nous"
      ],
      "correct": 2
    },
    {
      "q": "Dans « Les fleurs poussent au printemps. », quel est le sujet du verbe ?",
      "options": [
        "Les fleurs",
        "poussent",
        "printemps"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Tu lis une histoire. », quel est le sujet du verbe ?",
      "options": [
        "histoire",
        "Tu",
        "lis"
      ],
      "correct": 1
    },
    {
      "q": "Dans « La grande girafe mange. », quel est le sujet du verbe ?",
      "options": [
        "mange",
        "La grande girafe",
        "girafe mange"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Mes amis arrivent demain. », quel est le sujet du verbe ?",
      "options": [
        "arrivent",
        "Mes amis",
        "demain"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Elle prépare le repas. », quel est le sujet du verbe ?",
      "options": [
        "prépare",
        "Elle",
        "repas"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Les petits oiseaux chantent. », quel est le sujet du verbe ?",
      "options": [
        "Les petits oiseaux",
        "chantent",
        "oiseaux chantent"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Le boulanger travaille tôt. », quel est le sujet du verbe ?",
      "options": [
        "travaille",
        "Le boulanger",
        "tôt"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Vous dansez ensemble. », quel est le sujet du verbe ?",
      "options": [
        "dansez",
        "ensemble",
        "Vous"
      ],
      "correct": 2
    },
    {
      "q": "Dans « Mon nouveau vélo roule bien. », quel est le sujet du verbe ?",
      "options": [
        "Mon nouveau vélo",
        "roule",
        "bien"
      ],
      "correct": 0
    },
    {
      "q": "Dans « La maîtresse explique la consigne. », quel est le sujet du verbe ?",
      "options": [
        "La maîtresse",
        "explique",
        "consigne"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Ils jouent dans la cour. », quel est le sujet du verbe ?",
      "options": [
        "jouent",
        "Ils",
        "cour"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Le vent souffle fort. », quel est le sujet du verbe ?",
      "options": [
        "Le vent",
        "souffle",
        "fort"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Les enfants de CE2 dessinent. », quel est le sujet du verbe ?",
      "options": [
        "dessinent",
        "Les enfants de CE2",
        "CE2 dessinent"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Je termine mon travail. », quel est le sujet du verbe ?",
      "options": [
        "travail",
        "termine",
        "Je"
      ],
      "correct": 2
    },
    {
      "q": "Dans « Notre chat gris dort. », quel est le sujet du verbe ?",
      "options": [
        "Notre chat gris",
        "dort",
        "gris dort"
      ],
      "correct": 0
    }
  ],
  "verte": [
    {
      "q": "Dans « Le chat miaule. », quel mot est un nom commun ?",
      "options": [
        "Le",
        "chat",
        "miaule"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Une fleur pousse. », quel mot est un nom commun ?",
      "options": [
        "Une",
        "fleur",
        "pousse"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Les enfants courent. », quel mot est un nom commun ?",
      "options": [
        "Les",
        "enfants",
        "courent"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Le soleil brille. », quel mot est un nom commun ?",
      "options": [
        "Le",
        "soleil",
        "brille"
      ],
      "correct": 1
    },
    {
      "q": "Dans « La table bouge. », quel mot est un nom commun ?",
      "options": [
        "La",
        "table",
        "bouge"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Une voiture roule. », quel mot est un nom commun ?",
      "options": [
        "Une",
        "voiture",
        "roule"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Ce livre tombe. », quel mot est un nom commun ?",
      "options": [
        "Ce",
        "livre",
        "tombe"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Mon crayon casse. », quel mot est un nom commun ?",
      "options": [
        "Mon",
        "crayon",
        "casse"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Le lapin saute. », quel mot est un nom commun ?",
      "options": [
        "Le",
        "lapin",
        "saute"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Une étoile scintille. », quel mot est un nom commun ?",
      "options": [
        "Une",
        "étoile",
        "scintille"
      ],
      "correct": 1
    },
    {
      "q": "Dans « La cloche sonne. », quel mot est un nom commun ?",
      "options": [
        "La",
        "cloche",
        "sonne"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Les feuilles volent. », quel mot est un nom commun ?",
      "options": [
        "Les",
        "feuilles",
        "volent"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Le facteur arrive. », quel mot est un nom commun ?",
      "options": [
        "Le",
        "facteur",
        "arrive"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Cette porte grince. », quel mot est un nom commun ?",
      "options": [
        "Cette",
        "porte",
        "grince"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Un nuage passe. », quel mot est un nom commun ?",
      "options": [
        "Un",
        "nuage",
        "passe"
      ],
      "correct": 1
    },
    {
      "q": "Dans « La tortue avance. », quel mot est un nom commun ?",
      "options": [
        "La",
        "tortue",
        "avance"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Les crayons roulent. », quel mot est un nom commun ?",
      "options": [
        "Les",
        "crayons",
        "roulent"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Une lampe éclaire. », quel mot est un nom commun ?",
      "options": [
        "Une",
        "lampe",
        "éclaire"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Le bateau avance. », quel mot est un nom commun ?",
      "options": [
        "Le",
        "bateau",
        "avance"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Ce gâteau refroidit. », quel mot est un nom commun ?",
      "options": [
        "Ce",
        "gâteau",
        "refroidit"
      ],
      "correct": 1
    }
  ],
  "bleue": [
    {
      "q": "Dans « Le petit chien dort. », quel mot est le déterminant ?",
      "options": [
        "Le",
        "petit",
        "chien"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Mes crayons sont rangés. », quel mot est le déterminant ?",
      "options": [
        "Mes",
        "crayons",
        "rangés"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Une jolie fleur pousse. », quel mot est le déterminant ?",
      "options": [
        "Une",
        "jolie",
        "fleur"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Les enfants jouent. », quel mot est le déterminant ?",
      "options": [
        "Les",
        "enfants",
        "jouent"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Mon cartable est lourd. », quel mot est le déterminant ?",
      "options": [
        "Mon",
        "cartable",
        "lourd"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Cette porte est ouverte. », quel mot est le déterminant ?",
      "options": [
        "Cette",
        "porte",
        "ouverte"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Des oiseaux chantent. », quel mot est le déterminant ?",
      "options": [
        "Des",
        "oiseaux",
        "chantent"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Un ballon roule. », quel mot est le déterminant ?",
      "options": [
        "Un",
        "ballon",
        "roule"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Ta trousse est bleue. », quel mot est le déterminant ?",
      "options": [
        "Ta",
        "trousse",
        "bleue"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Ces livres sont neufs. », quel mot est le déterminant ?",
      "options": [
        "Ces",
        "livres",
        "neufs"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Notre classe est calme. », quel mot est le déterminant ?",
      "options": [
        "Notre",
        "classe",
        "calme"
      ],
      "correct": 0
    },
    {
      "q": "Dans « La pluie tombe. », quel mot est le déterminant ?",
      "options": [
        "La",
        "pluie",
        "tombe"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Vos chaussures brillent. », quel mot est le déterminant ?",
      "options": [
        "Vos",
        "chaussures",
        "brillent"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Ce chien aboie. », quel mot est le déterminant ?",
      "options": [
        "Ce",
        "chien",
        "aboie"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Son vélo avance. », quel mot est le déterminant ?",
      "options": [
        "Son",
        "vélo",
        "avance"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Quelques élèves dessinent. », quel mot est le déterminant ?",
      "options": [
        "Quelques",
        "élèves",
        "dessinent"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Ma sœur chante. », quel mot est le déterminant ?",
      "options": [
        "Ma",
        "sœur",
        "chante"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Leurs manteaux sèchent. », quel mot est le déterminant ?",
      "options": [
        "Leurs",
        "manteaux",
        "sèchent"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Tes cahiers sont là. », quel mot est le déterminant ?",
      "options": [
        "Tes",
        "cahiers",
        "là"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Chaque enfant écoute. », quel mot est le déterminant ?",
      "options": [
        "Chaque",
        "enfant",
        "écoute"
      ],
      "correct": 0
    }
  ],
  "marron": [
    {
      "q": "Quel est l’infinitif du verbe « mange » ?",
      "options": [
        "manger",
        "mangé",
        "mangeons"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « finit » ?",
      "options": [
        "finir",
        "fini",
        "finissons"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « court » ?",
      "options": [
        "courir",
        "couru",
        "courons"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « chante » ?",
      "options": [
        "chanter",
        "chanté",
        "chantons"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « jouons » ?",
      "options": [
        "jouer",
        "joué",
        "jouent"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « prend » ?",
      "options": [
        "prendre",
        "pris",
        "prends"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « écrivent » ?",
      "options": [
        "écrire",
        "écrit",
        "écrivons"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « dort » ?",
      "options": [
        "dormir",
        "dormi",
        "dormons"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « partons » ?",
      "options": [
        "partir",
        "parti",
        "partent"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « regardes » ?",
      "options": [
        "regarder",
        "regardé",
        "regardons"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « va » ?",
      "options": [
        "aller",
        "allé",
        "allons"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « fait » ?",
      "options": [
        "faire",
        "faites",
        "faisons"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « dit » ?",
      "options": [
        "dire",
        "disons",
        "disent"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « lit » ?",
      "options": [
        "lire",
        "lisons",
        "lisent"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « boivent » ?",
      "options": [
        "boire",
        "bois",
        "buvons"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « vient » ?",
      "options": [
        "venir",
        "venus",
        "venons"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « ouvrent » ?",
      "options": [
        "ouvrir",
        "ouvert",
        "ouvrons"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « sautent » ?",
      "options": [
        "sauter",
        "sauté",
        "sautons"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « dessinons » ?",
      "options": [
        "dessiner",
        "dessiné",
        "dessinent"
      ],
      "correct": 0
    },
    {
      "q": "Quel est l’infinitif du verbe « sourit » ?",
      "options": [
        "sourire",
        "souri",
        "sourions"
      ],
      "correct": 0
    }
  ],
  "noire": [
    {
      "q": "Dans « Le grand arbre bouge. », quel mot est un adjectif ?",
      "options": [
        "Le",
        "grand",
        "arbre"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Une jolie fleur pousse. », quel mot est un adjectif ?",
      "options": [
        "Une",
        "jolie",
        "fleur"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Un petit chien aboie. », quel mot est un adjectif ?",
      "options": [
        "Un",
        "petit",
        "chien"
      ],
      "correct": 1
    },
    {
      "q": "Dans « La maison blanche brille. », quel mot est un adjectif ?",
      "options": [
        "maison",
        "blanche",
        "brille"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Le ballon rouge roule. », quel mot est un adjectif ?",
      "options": [
        "ballon",
        "rouge",
        "roule"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Une longue corde tombe. », quel mot est un adjectif ?",
      "options": [
        "Une",
        "longue",
        "corde"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Ce vieux vélo grince. », quel mot est un adjectif ?",
      "options": [
        "Ce",
        "vieux",
        "vélo"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Le lapin rapide saute. », quel mot est un adjectif ?",
      "options": [
        "lapin",
        "rapide",
        "saute"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Une douce musique commence. », quel mot est un adjectif ?",
      "options": [
        "Une",
        "douce",
        "musique"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Le gros nuage avance. », quel mot est un adjectif ?",
      "options": [
        "gros",
        "nuage",
        "avance"
      ],
      "correct": 0
    },
    {
      "q": "Dans « La soupe chaude fume. », quel mot est un adjectif ?",
      "options": [
        "soupe",
        "chaude",
        "fume"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Le jeune garçon sourit. », quel mot est un adjectif ?",
      "options": [
        "Le",
        "jeune",
        "garçon"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Une belle étoile brille. », quel mot est un adjectif ?",
      "options": [
        "belle",
        "étoile",
        "brille"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Ce livre épais est lourd. », quel mot est un adjectif ?",
      "options": [
        "livre",
        "épais",
        "est"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Le petit bateau flotte. », quel mot est un adjectif ?",
      "options": [
        "petit",
        "bateau",
        "flotte"
      ],
      "correct": 0
    },
    {
      "q": "Dans « La porte verte grince. », quel mot est un adjectif ?",
      "options": [
        "porte",
        "verte",
        "grince"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Un chat noir dort. », quel mot est un adjectif ?",
      "options": [
        "chat",
        "noir",
        "dort"
      ],
      "correct": 1
    },
    {
      "q": "Dans « La grande girafe marche. », quel mot est un adjectif ?",
      "options": [
        "grande",
        "girafe",
        "marche"
      ],
      "correct": 0
    },
    {
      "q": "Dans « Un drôle de bruit retentit. », quel mot est un adjectif ?",
      "options": [
        "Un",
        "drôle",
        "bruit"
      ],
      "correct": 1
    },
    {
      "q": "Dans « Le sac léger tombe. », quel mot est un adjectif ?",
      "options": [
        "sac",
        "léger",
        "tombe"
      ],
      "correct": 1
    }
  ],
  "rouge": [
    {
      "q": "Pour désigner « chat », quel groupe de mots est un groupe nominal ?",
      "options": [
        "le petit chat",
        "court vite",
        "mange une pomme"
      ],
      "correct": 0
    },
    {
      "q": "Pour désigner « maison », quel groupe de mots est un groupe nominal ?",
      "options": [
        "une grande maison",
        "chante fort",
        "saute très haut"
      ],
      "correct": 0
    },
    {
      "q": "Pour désigner « rouges », quel groupe de mots est un groupe nominal ?",
      "options": [
        "des fleurs rouges",
        "pousse dans le jardin",
        "elle joue"
      ],
      "correct": 0
    },
    {
      "q": "Pour désigner « vélo », quel groupe de mots est un groupe nominal ?",
      "options": [
        "mon vieux vélo",
        "roule vite",
        "je dessine"
      ],
      "correct": 0
    },
    {
      "q": "Pour désigner « robe », quel groupe de mots est un groupe nominal ?",
      "options": [
        "la jolie robe",
        "sont arrivés",
        "regarde ici"
      ],
      "correct": 0
    },
    {
      "q": "Pour désigner « arbre », quel groupe de mots est un groupe nominal ?",
      "options": [
        "un grand arbre",
        "parle doucement",
        "nous courons"
      ],
      "correct": 0
    },
    {
      "q": "Pour désigner « cahiers », quel groupe de mots est un groupe nominal ?",
      "options": [
        "ses nouveaux cahiers",
        "écrit vite",
        "vient demain"
      ],
      "correct": 0
    },
    {
      "q": "Pour désigner « étoile », quel groupe de mots est un groupe nominal ?",
      "options": [
        "cette belle étoile",
        "tombe soudain",
        "tu regardes"
      ],
      "correct": 0
    },
    {
      "q": "Pour désigner « lapins », quel groupe de mots est un groupe nominal ?",
      "options": [
        "les petits lapins",
        "mange une carotte",
        "il dort"
      ],
      "correct": 0
    },
    {
      "q": "Pour désigner « amusante », quel groupe de mots est un groupe nominal ?",
      "options": [
        "une histoire amusante",
        "sourit souvent",
        "elle marche"
      ],
      "correct": 0
    },
    {
      "q": "Quel groupe nominal enrichit « le chien » avec un adjectif ?",
      "options": [
        "le chien noir",
        "le chien aboie",
        "chien très vite"
      ],
      "correct": 0
    },
    {
      "q": "Quel groupe nominal enrichit « une maison » avec un adjectif ?",
      "options": [
        "une grande maison",
        "une maison dort",
        "maison court"
      ],
      "correct": 0
    },
    {
      "q": "Quel groupe nominal enrichit « des fleurs » avec un adjectif ?",
      "options": [
        "des jolies fleurs",
        "des fleurs poussent",
        "fleurs bien"
      ],
      "correct": 0
    },
    {
      "q": "Quel groupe nominal enrichit « mon cartable » avec un adjectif ?",
      "options": [
        "mon cartable bleu",
        "mon cartable tombe",
        "cartable très"
      ],
      "correct": 0
    },
    {
      "q": "Quel groupe nominal enrichit « la voiture » avec un adjectif ?",
      "options": [
        "la petite voiture",
        "la voiture roule",
        "voiture lentement"
      ],
      "correct": 0
    },
    {
      "q": "Quel groupe nominal enrichit « un livre » avec un adjectif ?",
      "options": [
        "un livre épais",
        "un livre raconte",
        "livre trop"
      ],
      "correct": 0
    },
    {
      "q": "Quel groupe nominal enrichit « ce chat » avec un adjectif ?",
      "options": [
        "ce chat gris",
        "ce chat miaule",
        "chat ici"
      ],
      "correct": 0
    },
    {
      "q": "Quel groupe nominal enrichit « les oiseaux » avec un adjectif ?",
      "options": [
        "les oiseaux colorés",
        "les oiseaux volent",
        "oiseaux vite"
      ],
      "correct": 0
    },
    {
      "q": "Quel groupe nominal enrichit « une table » avec un adjectif ?",
      "options": [
        "une table ronde",
        "une table bouge",
        "table souvent"
      ],
      "correct": 0
    },
    {
      "q": "Quel groupe nominal enrichit « le jardin » avec un adjectif ?",
      "options": [
        "le jardin fleuri",
        "le jardin pousse",
        "jardin maintenant"
      ],
      "correct": 0
    }
  ]
};
  var LOCAL_IDEAS = [
    {prompt:'Imagine qu’un hibou trouve une clé brillante dans la cour de l’école.', example:'Ce matin, Maître Hibou découvre une petite clé dorée sous le banc.'},
    {prompt:'Un cartable se met soudain à parler pendant la classe.', example:'Au moment de sortir le cahier, une voix sort du cartable de Lina.'},
    {prompt:'Tu ouvres un livre et la première page devient une porte.', example:'La page tremble, puis elle s’ouvre comme l’entrée d’un château.'}
  ];

  function byId(id){ return document.getElementById(id); }
  function esc(v){ return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c];}); }
  function norm(v){ return String(v==null?'':v).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,''); }
  function shuffle(a){ var arr=(a||[]).slice(); for(var i=arr.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=arr[i]; arr[i]=arr[j]; arr[j]=t; } return arr; }
  function shuffleQuestionOptions(q, targetCorrectIndex){
    q = q || {};
    var opts = (q.options || []).slice();
    var correct = Number(q.correct);
    if(!Number.isFinite(correct) || correct < 0 || correct >= opts.length) correct = 0;
    if(opts.length < 2) return q;
    var pairs = opts.map(function(opt, idx){ return {opt:opt, oldIndex:idx}; });
    pairs = shuffle(pairs);
    var newCorrect = pairs.findIndex(function(p){ return p.oldIndex === correct; });
    if(newCorrect < 0) newCorrect = 0;
    var target = Number(targetCorrectIndex);
    if(Number.isFinite(target) && target >= 0 && target < pairs.length && target !== newCorrect){
      var tmp = pairs[target];
      pairs[target] = pairs[newCorrect];
      pairs[newCorrect] = tmp;
      newCorrect = target;
    }
    var mixed = Object.assign({}, q);
    mixed.options = pairs.map(function(p){ return p.opt; });
    mixed.correct = newCorrect;
    return mixed;
  }
  function mixTrainingQuestions(qs){
    var list = shuffle(qs || []);
    var counts = {};
    return list.map(function(q){
      var len = (q && q.options ? q.options.length : 0);
      if(len < 2) return q;
      var positions = [];
      for(var i=0;i<len;i++) positions.push(i);
      var min = Math.min.apply(null, positions.map(function(pos){ return counts[pos] || 0; }));
      var candidates = positions.filter(function(pos){ return (counts[pos] || 0) === min; });
      var target = shuffle(candidates)[0];
      var mixed = shuffleQuestionOptions(q, target);
      counts[mixed.correct] = (counts[mixed.correct] || 0) + 1;
      return mixed;
    });
  }
  function lockPage(lock){ try{ document.documentElement.style.overflow=lock?'hidden':''; document.body.style.overflow=lock?'hidden':''; }catch(e){} }
  function addParam(url,k,v){ return url + (url.indexOf('?')===-1 ? '?' : '&') + encodeURIComponent(k) + '=' + encodeURIComponent(v); }
  function findBelt(id){ id=norm(id); return BELTS.filter(function(b){ return norm(b.id)===id || norm(b.ceinture)===id || norm(b.skillId)===id; })[0] || BELTS[0]; }

  function readStoredRows(){
    if(rowsCache && rowsCache.length) return rowsCache;
    try{
      var raw = localStorage.getItem(CACHE_KEY) || localStorage.getItem(OLD_CACHE_KEY);
      if(!raw) return null;
      var obj = JSON.parse(raw);
      if(!obj || !Array.isArray(obj.rows)) return null;
      if(obj.t && Date.now() - obj.t > CACHE_TTL) return null;
      rowsCache = obj.rows;
      return rowsCache;
    }catch(e){ return null; }
  }
  function storeRows(rows){
    rowsCache = Array.isArray(rows) ? rows : [];
    try{ localStorage.setItem(CACHE_KEY, JSON.stringify({t:Date.now(), rows:rowsCache})); }catch(e){}
    return rowsCache;
  }
  function responseRows(data){
    var rows=[];
    if(Array.isArray(data)) rows=data;
    else if(data && Array.isArray(data.rows)) rows=data.rows;
    else if(data && Array.isArray(data.data)) rows=data.data;
    else if(data && Array.isArray(data.questions)) rows=data.questions;
    else if(data && data.result && Array.isArray(data.result)) rows=data.result;
    if(rows.length && Array.isArray(rows[0])){
      var first = rows[0].map(norm);
      if(first.indexOf('question')!==-1 || first.indexOf('ceinture')!==-1){
        var header = rows[0].map(function(h){ return String(h||'').trim(); });
        return rows.slice(1).map(function(r){ var o={}; header.forEach(function(h,i){ o[h]=r[i]; }); return o; });
      }
    }
    return rows;
  }
  function loadByJsonp(url){
    return new Promise(function(resolve,reject){
      var cb='__hibouFrV25225_'+Date.now()+'_'+Math.floor(Math.random()*10000);
      var done=false;
      var script=document.createElement('script');
      function cleanup(){ try{ delete window[cb]; }catch(e){ window[cb]=undefined; } try{ if(script.parentNode) script.parentNode.removeChild(script); }catch(e){} }
      var timer=setTimeout(function(){ if(done) return; done=true; cleanup(); reject(new Error('timeout')); }, FETCH_TIMEOUT);
      window[cb]=function(data){ if(done) return; done=true; clearTimeout(timer); cleanup(); resolve(responseRows(data)); };
      script.onerror=function(){ if(done) return; done=true; clearTimeout(timer); cleanup(); reject(new Error('jsonp error')); };
      script.src=addParam(addParam(addParam(url,'action','questions'),'sheet',SHEET_NAME),'callback',cb);
      document.head.appendChild(script);
    });
  }
  function preloadGrammar(force){
    if(!force){ var existing=readStoredRows(); if(existing && existing.length) return Promise.resolve(existing); }
    if(rowsLoadingPromise && !force) return rowsLoadingPromise;
    rowsLoadingPromise = loadByJsonp(BASE_URL).then(function(rows){ return storeRows(rows||[]); }).catch(function(){ return readStoredRows() || []; }).finally(function(){ rowsLoadingPromise=null; });
    return rowsLoadingPromise;
  }
  window.preloadFrenchGrammarRowsV25225 = function(){ return preloadGrammar(false); };
  window.preloadFrenchGrammarRowsV25222 = window.preloadFrenchGrammarRowsV25225;
  window.preloadFrenchGrammarRowsV23411 = window.preloadFrenchGrammarRowsV25225;
  window.refreshFrenchGrammarSheetV25225 = function(){ rowsCache=null; rowsLoadingPromise=null; try{ localStorage.removeItem(CACHE_KEY); localStorage.removeItem(OLD_CACHE_KEY); }catch(e){} return preloadGrammar(true); };

  function readCell(row,names,index){
    if(Array.isArray(row)) return row[index] == null ? '' : row[index];
    var keys=Object.keys(row||{});
    for(var i=0;i<names.length;i++){
      var wanted=names[i];
      if(row && Object.prototype.hasOwnProperty.call(row,wanted) && String(row[wanted]||'').trim()!=='') return row[wanted];
      for(var k=0;k<keys.length;k++) if(norm(keys[k])===norm(wanted) && String(row[keys[k]]||'').trim()!=='') return row[keys[k]];
    }
    return '';
  }
  function rowToQuestion(row){
    var q = readCell(row,['question','Question','consigne','Consigne'],5);
    if(!String(q||'').trim()) return null;
    var opts=[];
    [['A','a','option_a','choix_a','reponse_a'],['B','b','option_b','choix_b','reponse_b'],['C','c','option_c','choix_c','reponse_c'],['D','d','option_d','choix_d','reponse_d']].forEach(function(names,idx){ var v=readCell(row,names,6+idx); if(String(v||'').trim()) opts.push(String(v)); });
    if(opts.length<2){
      var type=norm(readCell(row,['type','mode'],3)+' '+q);
      if(type.indexOf('vrai')!==-1 || type.indexOf('faux')!==-1) opts=['Vrai','Faux'];
    }
    if(opts.length<2) return null;
    var rep = String(readCell(row,['reponse','réponse','bonne_reponse','bonne réponse','correct'],10)||'').trim();
    var repNorm=norm(rep);
    var correct = -1;
    if(/^[A-D]$/i.test(rep)) correct = rep.toUpperCase().charCodeAt(0)-65;
    else if(/^[1-4]$/.test(rep)) correct = Number(rep)-1;
    else { correct = opts.findIndex(function(o){ return norm(o)===repNorm; }); }
    if(correct<0 || correct>=opts.length) correct=0;
    return {q:String(q), options:opts, correct:correct, mode:String(readCell(row,['mode','type'],4)||'')};
  }
  function rowMatches(row,belt){
    var ceinture = norm(readCell(row,['ceinture','couleur'],0));
    var competence = norm(readCell(row,['competence','compétence','skill','notion'],2));
    var niveau = norm(readCell(row,['niveau','level'],1));
    var question = norm(readCell(row,['question','consigne'],5));
    var mode = norm(readCell(row,['mode','type'],4));
    var blob = [ceinture, competence, niveau, question, mode].join('_');
    var forbidden = /determinant|determiner|sujet|verbe|nom|adjectif|infinitif|groupe_nominal|groupe_nominal/;
    if(belt.id==='blanche'){
      var isWhite = ceinture==='blanche' || blob.indexOf('grammaire_blanche')!==-1 || blob.indexOf('phrase_negative')!==-1 || blob.indexOf('phrase_affirmative')!==-1;
      var isNotion = /phrase|affirmative|negative|negation|forme/.test(blob);
      return isWhite && isNotion && !forbidden.test(blob);
    }
    if(ceinture && ceinture===norm(belt.ceinture)){
      return belt.skills.some(function(s){ return blob.indexOf(norm(s))!==-1; }) || competence==='' || competence===norm(belt.id);
    }
    return belt.skills.some(function(s){ return blob.indexOf(norm(s))!==-1; });
  }
  function questionsFromRows(belt, rows){
    return (rows||[]).filter(function(r){ return rowMatches(r,belt); }).map(rowToQuestion).filter(Boolean);
  }
  // Interdire les doublons, y compris dans les banques Google Sheets.
  // Une même consigne normalisée ne peut apparaître qu'une fois par entraînement.
  function uniqueQuestions(rows){
    var seen = new Set();
    return (rows || []).filter(function(q){
      if(!q || !q.q || !Array.isArray(q.options) || q.options.length<2) return false;
      var key=norm(q.q);
      if(!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  function chooseTrainingQuestions(belt, remote){
    var sheets=shuffle(uniqueQuestions(remote));
    var local=shuffle(uniqueQuestions(LOCAL_BANK[belt.id] || []));
    var chosen=uniqueQuestions(sheets.concat(local)).slice(0,TRAINING_COUNT);
    if(chosen.length<TRAINING_COUNT){
      console.warn('Grammaire : moins de 10 questions distinctes pour la ceinture',belt.id);
    }
    return mixTrainingQuestions(chosen);
  }
  function localQuestions(belt){
    return chooseTrainingQuestions(belt, []);
  }

  function overlay(){
    var ov=byId('frenchTrainingOverlayV2348');
    if(ov) return ov;
    ov=document.createElement('div');
    ov.id='frenchTrainingOverlayV2348';
    ov.className='hidden';
    ov.setAttribute('role','dialog');
    ov.setAttribute('aria-modal','true');
    ov.setAttribute('aria-label','Français - entraînements');
    ov.innerHTML='<div class="fr-v2348-popup"><div class="fr-v2348-topbar"><div class="fr-v2348-chip">📖 Français</div><button class="fr-v2348-close" type="button" onclick="if(!window.returnMHTrainingFromBelt||!window.returnMHTrainingFromBelt())closeFrenchTrainingPopupV2348()" aria-label="Fermer la popup Français">×</button></div><div id="frenchPopupInnerV2348"></div></div>';
    document.body.appendChild(ov);
    ov.addEventListener('click',function(ev){ if(ev.target===ov) window.closeFrenchTrainingPopupV2348(); });
    return ov;
  }
  function setInner(html){ var inner=byId('frenchPopupInnerV2348'); if(inner) inner.innerHTML=html; }
  function headerHTML(title, subtitle, note){
    title = title || '📖 Français';
    subtitle = subtitle || 'Choisis un domaine.';
    note = note || 'Choisis un domaine.';
    return '<div class="fr-v2348-header"><div class="fr-v2348-owl">🦉</div><div class="fr-v2348-title"><h2>'+esc(title)+'</h2><p>'+esc(subtitle)+'</p><div class="fr-v23411-grammar-note">'+esc(note)+'</div></div></div>';
  }
  // Bandeau unique des entraînements des 8 ceintures (pas des menus historiques).
  function trainingHeaderHTML(belt){
    var color=(belt && belt.ceinture) || 'blanche';
    return '<div class="fr-v2348-header fr-ce2-training-header">'
      + '<div class="fr-v2348-owl" aria-hidden="true">🦉</div>'
      + '<div class="fr-v2348-title"><h2>Grammaire — Ceinture '+esc(color)+'</h2></div>'
      + '</div>';
  }
  function frenchStudentKey(){
    var name='';try{name=window.prenomActuel||localStorage.getItem('hibou_prenom')||localStorage.getItem('maitreHibouCurrentStudent')||localStorage.getItem('elevePrenom')||'';}catch(e){}
    return norm(name||'invite');
  }
  function frenchKey(belt){return FRENCH_PROGRESS_PREFIX+frenchStudentKey()+'_'+norm(belt.id);}
  function frenchProgress(belt){
    try{var v=JSON.parse(localStorage.getItem(frenchKey(belt))||'null');return v&&Array.isArray(v.attempts)?v:{attempts:[],best:0};}catch(e){return {attempts:[],best:0};}
  }
  function frenchStep(belt){
    var d=frenchProgress(belt);if(Number(d.best)>=15)return 2;
    var a=d.attempts||[], first=-1;
    for(var i=0;i<a.length;i++){if(a[i]&&a[i].score>=7&&a[i].total===10){first=i;break;}}
    if(first===-1)return 0;
    for(var j=first+1;j<a.length;j++){if(a[j]&&a[j].score>=8&&a[j].total===10)return 2;}
    return 1;
  }
  function saveFrenchAttempt(belt,score,total){
    var d=frenchProgress(belt);var attempt={id:'fr-'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2),score:score,total:total,date:new Date().toISOString()};d.attempts.push(attempt);
    // Conserver les réussites historiques et l'ordre des tentatives.
    try{localStorage.setItem(frenchKey(belt),JSON.stringify(d));}catch(e){console.warn('Sauvegarde Français impossible',e);}
    // Une trace distincte par tentative : persistée par le journal vers parcours_eleves.
    try{if(typeof window.hibouTrackEvent==='function')window.hibouTrackEvent({type:'entrainement_termine',matiere:'Français',domaine:'Grammaire',titre:'Défi de grammaire · ceinture '+belt.id,score:score,total:total,source:'ceintures_grammaire',resultat:score>=7?'reussite':'a_renforcer',exercise_types:'french_belt_practice_'+belt.id,learning_session_id:attempt.id,competence_label:belt.title||belt.label||'',date_iso:attempt.date});}catch(e){console.warn('Journal défi de grammaire indisponible',e);}
    try{window.dispatchEvent(new CustomEvent('hibou:french-belt-progress',{detail:{ceinture:belt.id,step:frenchStep(belt)}}));}catch(e){}
  }
  function saveFrenchBelt(belt,score){var d=frenchProgress(belt);d.best=Math.max(Number(d.best||0),score);try{localStorage.setItem(frenchKey(belt),JSON.stringify(d));}catch(e){} }
  function frenchMedal(score,denom){return score>=(denom===10?10:19)?'🥇 Or':score>=(denom===10?9:17)?'🥈 Argent':score>=(denom===10?8:15)?'🥉 Bronze':'';}
  function frenchReward(belt){return 'images/maitre-hibou-ceinture-'+encodeURIComponent(belt.id)+'.jpg';}
  function frenchRewardHTML(belt){return '<img alt="Maître Hibou avec sa ceinture '+esc(belt.id)+'" src="'+frenchReward(belt)+'" style="display:block;max-width:min(100%,320px);max-height:250px;object-fit:contain;margin:8px auto;border-radius:16px">';}
  window.hibouFrenchBeltStep=function(id){return frenchStep(findBelt(id));};
  window.hibouFrenchBeltBest=function(id){return frenchProgress(findBelt(id)).best||0;};
  function startFrenchBeltValidation(id){
    if(typeof window.hibouLoadBeltProgress==='function') window.hibouLoadBeltProgress();
    var belt=findBelt(id);if(frenchStep(belt)<2)return;
    // Annuler tout changement d'écran différé d'un entraînement précédent.
    try{if(state && state.nextTimer){clearTimeout(state.nextTimer);state.nextTimer=null;}}catch(e){}
    var unique=uniqueQuestions(LOCAL_BANK[belt.id]||[]);
    if(unique.length<20){console.warn('Ceinture : moins de 20 questions',belt.id);return;}
    frenchBeltState={belt:belt,questions:mixTrainingQuestions(shuffle(unique).slice(0,BELT_COUNT)),index:0,score:0,answers:[],finished:false};
    renderFrenchBeltQuestion();
  }
  window.startFrenchBeltValidationMH=startFrenchBeltValidation;
  function renderFrenchBeltQuestion(){
    var st=frenchBeltState;if(!st||st.finished)return;
    if(st.index>=st.questions.length)return renderFrenchBeltResult();
    var q=st.questions[st.index];
    setInner(trainingHeaderHTML(st.belt)+'<div class="fr-v2348-content fr-ce2-question-screen"><section class="fr-v2348-panel">'
      +'<div class="fr-v2348-progress">Passage de ceinture · Question '+(st.index+1)+' sur 20</div>'
      +'<div class="fr-v2348-question">'+esc(q.q)+'</div><div class="fr-v2348-options">'
      +(q.options||[]).map(function(o,i){return '<button class="fr-belt-validation-option" data-index="'+i+'" type="button">'+esc(o)+'</button>';}).join('')
      +'</div><p style="font-size:.85rem;text-align:center">Tu découvriras tes corrections à la fin.</p></section></div>');
  }
  function frenchBeltAnswer(i){
    var st=frenchBeltState;if(!st||st.finished)return;
    var q=st.questions[st.index];if(!q)return;
    var ok=i===Number(q.correct);if(ok)st.score++;
    st.answers.push({q:q.q,chosen:q.options[i]||'—',correct:q.options[q.correct],ok:ok});
    st.index++;renderFrenchBeltQuestion();
  }
  function renderFrenchBeltResult(){
    var st=frenchBeltState;if(!st||st.finished)return;st.finished=true;
    var pass=st.score>=15;
    if(pass)saveFrenchBelt(st.belt,st.score);
    // Toutes les tentatives de validation sont traçables, même sous 15/20.
    try{if(typeof window.hibouTrackEvent==='function')window.hibouTrackEvent({type:pass?'ceinture_validee':'ceinture_tentee',matiere:'Français',domaine:'Grammaire',titre:'Ceinture '+st.belt.id+' de grammaire '+(pass?'validée':'à reprendre'),score:st.score,total:20,source:'ceinture_grammaire',resultat:pass?'reussite':'a_reprendre',medaille:pass?frenchMedal(st.score,20):'',exercise_types:'french_belt_validation_'+st.belt.id,learning_session_id:'fr-belt-'+st.belt.id+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2),competence_label:st.belt.title||''});}catch(e){console.warn('Journal validation de grammaire indisponible',e);}
    var best=frenchProgress(st.belt).best||0;
    var summary=pass?'Bravo ! Tu as obtenu ta ceinture '+st.belt.id+' !':'Tu n’as pas encore obtenu ta ceinture. Tu peux réessayer sans refaire les deux défis !';
    var corrections=st.answers.map(function(a){return '<div style="padding:7px 0;border-bottom:1px solid #ddd"><strong>'+esc(a.q)+'</strong><div>'+(a.ok?'✅ ':'❌ ')+esc(a.chosen)+' · Réponse : '+esc(a.correct)+'</div></div>';}).join('');
    setInner(trainingHeaderHTML(st.belt)+'<div class="fr-v2348-content fr-ce2-result-screen"><section class="fr-v2348-panel"><div class="fr-v2348-result">'
      +'<h3>'+esc(summary)+'</h3>'+(pass?frenchRewardHTML(st.belt):'<div style="font-size:50px">🦉</div>')
      +'<p><strong>Score : '+st.score+'/20</strong> · '+(frenchMedal(st.score,20)||'Continue tes efforts !')+'</p>'
      +'<p>Meilleur résultat conservé : '+best+'/20 '+esc(frenchMedal(best,20))+'</p>'
      +'<details><summary>Voir les corrections</summary>'+corrections+'</details>'
      +'<div class="fr-v2348-actions"><button class="fr-v2348-action" onclick="startFrenchBeltValidationMH(\''+esc(st.belt.id)+'\')">Repasser ma ceinture</button>'
      +'<button class="fr-v2348-action secondary" onclick="if(!window.returnMHTrainingFromBelt||!window.returnMHTrainingFromBelt())closeFrenchTrainingPopupV2348()">Terminer</button></div></div></section></div>');
  }
  document.addEventListener('click',function(e){
    var btn=e.target&&e.target.closest&&e.target.closest('#frenchTrainingOverlayV2348 .fr-belt-validation-option');
    if(!btn)return;
    e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
    frenchBeltAnswer(Number(btn.getAttribute('data-index')));
  },true);
  function rowHTML(belt){ var isIdeas=belt.id==='idees'; var step=isIdeas?0:frenchStep(belt); var marker=isIdeas?'':(step===2?'🔓 Prêt pour la ceinture':('🔒 Défi '+(step+1)+'/2 · '+(step===0?'7/10':'8/10')+' minimum'));  return '<div class="fr-v23411-row '+(isIdeas?'fr-v23411-ideas-row':'')+'"><div class="fr-v23411-dot" style="background:'+esc(belt.color)+'"></div><div class="fr-v23411-main"><strong>'+esc(belt.title)+'</strong><span>'+esc(belt.label)+'</span><div class="fr-v23411-mode">'+esc(belt.desc)+'</div><div style="font-size:.84rem;font-weight:700">'+marker+'</div></div><button type="button" class="fr-v23411-train-btn" onclick="startFrenchTrainingV2348(\''+esc(belt.id)+'\')">'+(isIdeas?'✏️ S’entraîner':'📖 S’entraîner — 10 questions')+'</button>'+(step===2?'<button type="button" class="fr-v23411-train-btn" onclick="startFrenchBeltValidationMH(\''+esc(belt.id)+'\')">🔓 Passer ma ceinture · 20 questions</button>':'')+'</div>'; }
  function domainCardHTML(cfg){
    var disabled = !!cfg.disabled;
    var action = disabled ? '' : ' onclick="'+cfg.onclick+'"';
    return '<button type="button" class="fr-v25720-domain-card '+esc(cfg.className||'')+' '+(disabled?'is-disabled':'')+'" '+(disabled?'disabled aria-disabled="true"':'')+action+'>'+ 
      '<div class="fr-v25720-domain-icon">'+esc(cfg.icon)+'</div>'+ 
      '<div class="fr-v25720-domain-title">'+esc(cfg.title)+'</div>'+ 
      '<div class="fr-v25720-domain-desc">'+esc(cfg.desc)+'</div>'+ 
      (disabled ? '<div class="fr-v25720-domain-soon">🔒 Bientôt disponible</div>' : '<div class="fr-v25720-domain-arrow">›</div>')+
    '</button>';
  }
  function renderDomainMenu(){
    setInner(headerHTML('📖 Français','Choisis un domaine.','Choisis un domaine.')+
      '<div class="fr-v2348-content"><section class="fr-v2348-panel fr-v25720-domain-panel"><div class="fr-v25720-domain-grid">'+
      domainCardHTML({className:'writing',icon:'✏️',title:'Production d’écrit',desc:'Trouver une idée et écrire',onclick:'startFrenchTrainingV2348(\'idees\')'})+
      domainCardHTML({className:'vocab',icon:'🧩',title:'Vocabulaire',desc:'Familles, synonymes, contraires, mots génériques',onclick:'openHibouVocabulaireV25724()'})+
      domainCardHTML({className:'ortho',icon:'🔤',title:'Orthographe',desc:'Accords, mots fréquents, dictées',disabled:true})+
      '</div></section></div>');
  }
  function renderGrammarList(){
    setInner(headerHTML('📘 Grammaire','Choisis une ceinture pour t’entraîner.','Google Sheets est préchargé en arrière-plan ; si le réseau ralentit, l’entraînement démarre quand même.')+
      '<div class="fr-v2348-content"><section class="fr-v2348-panel"><div class="fr-v2348-training-head"><button type="button" class="fr-v2348-back" onclick="renderFrenchDomainMenuV25720()">← Retour au menu Français</button><div class="fr-v2348-training-title">Grammaire</div><div></div></div><h3 class="fr-v23411-section-title fr-v25718-section-grammar">Ceintures de grammaire</h3><div class="fr-v23411-list">'+BELTS.map(rowHTML).join('')+'</div></section></div>');
  }
  function renderList(){ renderDomainMenu(); }
  window.renderFrenchDomainMenuV25720 = renderDomainMenu;
  window.renderFrenchGrammarListV25720 = renderGrammarList;
  window.renderFrenchTrainingListV2348 = renderDomainMenu;
  window.openFrenchTrainingPopupV2348 = function(){ var ov=overlay(); renderDomainMenu(); preloadGrammar(false); ov.classList.remove('hidden'); lockPage(true); };
  window.closeFrenchTrainingPopupV2348 = function(){ try{ clearTimeout(state.nextTimer); }catch(e){} var ov=byId('frenchTrainingOverlayV2348'); if(ov) ov.classList.add('hidden'); lockPage(false); };

  function renderQuestion(){
    var q=state.questions[state.index];
    if(!q) return renderResult();
    state.answered=false;
    var opts=(q.options||[]).map(function(opt,i){ return '<button type="button" class="fr-v2348-option" data-index="'+i+'">'+esc(opt)+'</button>'; }).join('');
    // L'élève doit voir seulement sa ceinture, sa progression, la question et les réponses.
    // On conserve la classe des boutons et les data-index utilisés par la correction existante.
    setInner(trainingHeaderHTML(state.belt)
      + '<div class="fr-v2348-content fr-ce2-question-screen"><section class="fr-v2348-panel">'
      + '<div class="fr-v2348-progress">Question '+(state.index+1)+' sur '+state.questions.length+'</div>'
      + '<div class="fr-v2348-question">'+esc(q.q)+'</div>'
      + '<div class="fr-v2348-options">'+opts+'</div>'
      + '<div id="frFeedbackV2348" class="fr-v2348-feedback"></div>'
      + '</section></div>');
  }
  function renderResult(){
    try{ clearTimeout(state.nextTimer); }catch(e){}
    var total=state.questions.length || TRAINING_COUNT;
    var pct=Math.round((state.score/total)*100);
    if(!state.savedAttempt){saveFrenchAttempt(state.belt,state.score,total);state.savedAttempt=true;}
    var step=frenchStep(state.belt), medals=frenchMedal(state.score,10);
    var cheer=step===2?'Félicitations ! Tu es prêt à passer ta ceinture '+state.belt.id+' !':step===1?'Bravo ! Premier défi réussi. Réussis maintenant 8 questions sur 10 dans une nouvelle série.':'Maître Hibou t’encourage ! Ton premier objectif est de réussir 7 questions sur 10.';
    var validationButton=step===2?'<button type="button" class="fr-v2348-action" onclick="startFrenchBeltValidationMH(\''+esc(state.belt.id)+'\')">🔓 Passer ma ceinture · 20 questions</button>':'<button type="button" class="fr-v2348-action secondary" disabled aria-disabled="true" style="opacity:.55">🔒 Passage de ceinture verrouillé · '+(step===0?'7/10':'8/10')+' à atteindre</button>';
    setInner(trainingHeaderHTML(state.belt)
      + '<div class="fr-v2348-content fr-ce2-result-screen"><section class="fr-v2348-panel">'
      + '<div class="fr-v2348-result"><h3>🦉 '+esc(cheer)+'</h3><div style="font-size:1.5rem;margin:10px">'+(medals||'💪 En progrès')+'</div><div style="font-weight:700;margin:10px">Défi 1 : 7/10 minimum '+(step>=1?'✅':'🔒')+' · Défi 2 : 8/10 minimum '+(step===2?'✅':'🔒')+'</div>'
      + '<div class="fr-v2348-score-grid"><div class="fr-v2348-score-card">Score<b>'+state.score+' / '+total+'</b></div>'
      + '<div class="fr-v2348-score-card">Réussite<b>'+pct+'%</b></div></div>'
      + '<div class="fr-v2348-actions">'+validationButton
      + '<button type="button" class="fr-v2348-action" onclick="startFrenchTrainingV2348(\''+esc(state.belt.id)+'\')">Refaire l’entraînement</button>'
      + '<button type="button" class="fr-v2348-action secondary" onclick="if(!window.returnMHTrainingFromBelt||!window.returnMHTrainingFromBelt())closeFrenchTrainingPopupV2348()">Terminer</button>'
      + '</div></div></section></div>');
    // Le défi est déjà journalisé une fois par saveFrenchAttempt (avec son identifiant stable).
  }
  function renderIdea(){ var item=shuffle(LOCAL_IDEAS)[0]; setInner(headerHTML('✍️ Production d’écrit','Trouve une idée et écris.','L’événement est ajouté au parcours seulement quand tu cliques sur J’ai terminé mon écrit.')+'<div class="fr-v2348-content"><section class="fr-v2348-panel"><div class="fr-v2348-training-head"><button type="button" class="fr-v2348-back" onclick="renderFrenchDomainMenuV25720()">← Retour au menu Français</button><div class="fr-v2348-training-title">✏️ Idées pour écrire</div><div></div></div><div class="fr-v2348-idea-box"><div class="fr-v2348-progress">Idée d’écriture</div><div class="fr-v2348-idea-card">'+esc(item.prompt)+'</div><div class="fr-v2348-example"><strong>Pour t’aider :</strong><br>'+esc(item.example)+'</div><textarea class="fr-v2348-textarea" placeholder="Écris ici ta phrase ou ton début d’histoire..."></textarea><div class="fr-v2348-actions"><button type="button" class="fr-v2348-action" onclick="window.hibouFrenchWritingDoneV25717&&window.hibouFrenchWritingDoneV25717(this)">✅ J’ai terminé mon écrit</button><button type="button" class="fr-v2348-action" onclick="startFrenchTrainingV2348(\'idees\')">🎲 Nouvelle idée</button><button type="button" class="fr-v2348-action secondary" onclick="renderFrenchDomainMenuV25720()">← Retour au menu Français</button></div></div></section></div>'); }

  function startWithRows(belt, rows, source){
    var qs = questionsFromRows(belt, rows||[]);
    // Les questions distantes sont prioritaires ; les questions locales complètent
    // uniquement les places manquantes. Aucune question en double dans la série.
    state.questions = chooseTrainingQuestions(belt, qs);
    if(uniqueQuestions(qs).length){
      state.source = source || 'Google Sheets · onglet grammaire';
    }else{
      state.source = 'banque locale immédiate';
      preloadGrammar(false);
    }
    renderQuestion();
  }
  window.startFrenchTrainingV2348 = function(activityId){
    if(typeof window.hibouLoadBeltProgress==='function') window.hibouLoadBeltProgress();
    if(activityId==='idees') return renderIdea();
    var belt=findBelt(activityId);
    try{ clearTimeout(state.nextTimer); }catch(e){}
    state={belt:belt, questions:[], index:0, score:0, answered:false, source:'banque locale', nextTimer:null};
    var cached = readStoredRows();
    if(cached && cached.length){ return startWithRows(belt, cached, 'Google Sheets préchargé'); }
    setInner(trainingHeaderHTML(belt)+'<div class="fr-v2348-content fr-ce2-question-screen"><section class="fr-v2348-panel"><div class="fr-v2348-feedback" style="padding:18px">Préparation des questions...</div></section></div>');
    var done=false;
    var p = preloadGrammar(false);
    var timer=setTimeout(function(){ if(done) return; done=true; startWithRows(belt, null, 'banque locale immédiate'); }, MAX_WAIT_BEFORE_LOCAL);
    p.then(function(rows){ if(done) return; done=true; clearTimeout(timer); startWithRows(belt, rows, 'Google Sheets préchargé'); }).catch(function(){ if(done) return; done=true; clearTimeout(timer); startWithRows(belt, null, 'banque locale immédiate'); });
  };
  window.answerFrenchTrainingV2348 = function(i){
    i=Number(i);
    if(state.answered) return;
    var q=state.questions[state.index];
    if(!q) return renderResult();
    state.answered=true;
    var correct=Number(q.correct); if(!Number.isFinite(correct)) correct=0;
    var buttons=[].slice.call(document.querySelectorAll('#frenchTrainingOverlayV2348 .fr-v2348-option'));
    buttons.forEach(function(btn){ btn.disabled=true; });
    var ok = i===correct;
    if(ok) state.score++;
    buttons.forEach(function(btn){ var idx=Number(btn.getAttribute('data-index')); if(idx===correct) btn.classList.add('correct'); if(idx===i && !ok) btn.classList.add('wrong'); });
    var fb=byId('frFeedbackV2348'); if(fb) fb.innerHTML = ok ? '✅ Bravo !' : '💡 La bonne réponse était : <strong>'+esc((q.options||[])[correct]||'')+'</strong>';
    clearTimeout(state.nextTimer);
    state.nextTimer=setTimeout(function(){ state.index++; state.answered=false; if(state.index>=state.questions.length) renderResult(); else renderQuestion(); }, ok ? 520 : 850);
  };

  if(!window.__maitreHibouV25225FrenchClickInstalled){
    window.__maitreHibouV25225FrenchClickInstalled = true;
    document.addEventListener('click', function(ev){
      var btn = ev.target && ev.target.closest ? ev.target.closest('#frenchTrainingOverlayV2348 .fr-v2348-option:not(.fr-belt-validation-option)') : null;
      if(!btn) return;
      ev.preventDefault(); ev.stopPropagation(); if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
      window.answerFrenchTrainingV2348(Number(btn.getAttribute('data-index')));
    }, true);
  }

  function boot(){
    preloadGrammar(false);
    setTimeout(function(){ preloadGrammar(false); }, 1500);
    try{
      var txt=document.body.innerHTML;
      // volontairement pas de remplacement global lourd ici : on évite de reparcourir le DOM pendant les exercices.
    }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot); else setTimeout(boot, 200);
  window.addEventListener('focus', function(){ setTimeout(function(){ preloadGrammar(false); }, 300); });
  window.__maitreHibouV25225FrancaisAudit = {
    version:'V25.4.0',
    correction:'Préchargement Google Sheets en arrière-plan + démarrage local immédiat si le réseau bloque.',
    objectif:'Démarrage rapide et vrai mélange des réponses : la bonne réponse change de position dans les entraînements de grammaire.',
    attente_max_avant_fallback:MAX_WAIT_BEFORE_LOCAL+' ms',
    melange_reponses:'options mélangées et positions de bonne réponse réparties'
  };
})();
