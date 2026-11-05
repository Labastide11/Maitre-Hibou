/* Données EMI originales, extraites de index V25.8.84 sans modification. */
window.MH_EMI_SESSIONS = [
    {
      id:'vrai-faux',
      icon:'🕵️',
      title:'Vrai ou faux ?',
      subtitle:"L'esprit critique de base",
      intro:"Sur internet, une information doit être vérifiée avant d’être crue ou partagée.",
      choices:[{label:'✅ Vrai', value:true},{label:'❌ Faux', value:false}],
      items:[
        {text:"Sur internet, tout ce qui est écrit est forcément vrai.", answer:false, explain:"Faux. N'importe qui peut écrire n'importe quoi sur internet. Il faut toujours vérifier."},
        {text:"Un adulte de confiance peut m'aider à vérifier une information.", answer:true, explain:"Vrai. Un parent, un enseignant ou un bibliothécaire peut t'aider à savoir si une info est sérieuse."},
        {text:"Si une photo paraît trop parfaite ou bizarre, je peux me poser des questions.", answer:true, explain:"Vrai. Une image peut être modifiée. Se poser des questions, c'est le réflexe du bon détective."},
        {text:"Une information peut être fausse même si beaucoup de gens la partagent.", answer:true, explain:"Vrai. Le nombre de partages ne prouve pas qu'une info est vraie."},
        {text:"Je dois croire un message juste parce qu'il fait peur ou qu'il est écrit en majuscules.", answer:false, explain:"Faux. Les messages qui font peur cherchent souvent à te faire réagir vite, sans réfléchir. Prends ton temps."},
        {text:"Tout ce qui passe à la télévision est toujours vérifié avant d'être diffusé.", answer:false, explain:"Faux. Même les médias sérieux peuvent se tromper. C'est pour ça qu'ils corrigent parfois leurs erreurs."},
        {text:"Une histoire drôle ou une blague peut ressembler à une vraie information.", answer:true, explain:"Vrai. Certains sites publient des fausses infos pour faire rire. Il faut apprendre à les reconnaître."},
        {text:"Si je ne suis pas sûr qu'une info est vraie, le mieux est de ne pas la partager tout de suite.", answer:true, explain:"Vrai. En cas de doute, on vérifie d'abord, on partage après, ou pas du tout."}
      ]
    },
    {
      id:'sources',
      icon:'🔎',
      title:"D'où vient l'info ?",
      subtitle:'Reconnaître une source fiable',
      intro:"Une source, c’est l’endroit ou la personne d’où vient l’information.",
      choices:[{label:'👍 Je fais confiance', value:true},{label:'🤔 Je reste prudent(e)', value:false}],
      items:[
        {tag:'Source n°1', text:"Un livre documentaire de la bibliothèque de l'école.", answer:true, explain:"Fiable. Un livre documentaire est écrit et vérifié par des personnes qui connaissent bien le sujet."},
        {tag:'Source n°2', text:"Une rumeur entendue dans la cour de récréation, sans savoir qui l'a dite en premier.", answer:false, explain:"Prudence. Une rumeur se transforme souvent en passant de bouche en bouche. On ne sait plus qui a dit quoi."},
        {tag:'Source n°3', text:"Le site internet officiel d'un musée, avec le nom du musée bien visible.", answer:true, explain:"Fiable. Un site officiel avec un nom clair et reconnu est en général sérieux."},
        {tag:'Source n°4', text:"Un message reçu qui dit « on m'a dit que... » sans dire qui exactement.", answer:false, explain:"Prudence. Si personne ne peut dire précisément qui l'a affirmé, difficile de vérifier."},
        {tag:'Source n°5', text:"Un journal pour enfants qui explique où il a trouvé ses informations.", answer:true, explain:"Fiable. Un média sérieux indique ses sources, c'est un bon signe."},
        {tag:'Source n°6', text:"Une vidéo sans nom d'auteur, qui promet un scoop incroyable.", answer:false, explain:"Prudence. Sans savoir qui a fait la vidéo, difficile de juger si c'est sérieux."},
        {tag:'Source n°7', text:"Un enseignant qui explique un sujet qu'il maîtrise, en classe.", answer:true, explain:"Fiable. Un enseignant est une personne de confiance qui vérifie ce qu'il transmet."},
        {tag:'Source n°8', text:"Un texte qui ne dit jamais d'où viennent les chiffres qu'il donne.", answer:false, explain:"Prudence. Des chiffres sans origine sont difficiles à vérifier : bon réflexe de rester prudent."}
      ]
    },
    {
      id:'medias',
      icon:'📰',
      title:"Les médias, c'est quoi ?",
      subtitle:'Info, pub ou divertissement',
      intro:"Un média peut informer, faire de la publicité ou divertir.",
      choices:[{label:'📋 Information', value:'info'},{label:'📣 Publicité', value:'pub'},{label:'🎭 Divertissement', value:'divert'}],
      items:[
        {text:"Le journal local annonce qu'il est tombé 40 mm de pluie cette nuit sur la ville.", answer:'info', explain:"Information. On rapporte un fait réel et vérifiable, sans chercher à vendre quelque chose."},
        {text:"« Achète vite ce nouveau jouet, il ne restera pas longtemps en stock ! »", answer:'pub', explain:"Publicité. Le message cherche à te donner envie d'acheter, avec un sentiment d'urgence."},
        {text:"Une histoire drôle avec un chat qui parle, publiée sur un site pour enfants.", answer:'divert', explain:"Divertissement. Le but est de faire rire ou passer un bon moment, pas d'informer sur un fait réel."},
        {text:"Le maire de la ville a inauguré hier une nouvelle bibliothèque.", answer:'info', explain:"Information. C'est un événement réel qui vient d'avoir lieu, rapporté par un média."},
        {text:"Une pub à la télé promet que ce shampoing rendra tes cheveux brillants « comme jamais ».", answer:'pub', explain:"Publicité. Les mots « comme jamais » cherchent à convaincre d'acheter, plus qu'à informer."},
        {text:"Un dessin animé raconte les aventures d'un chevalier imaginaire.", answer:'divert', explain:"Divertissement. C'est une fiction, inventée pour amuser ou faire rêver."},
        {text:"Le journal télévisé annonce les résultats d'une élection.", answer:'info', explain:"Information. C'est un fait d'actualité réel, rapporté sans chercher à vendre un produit."},
        {text:"Une affiche dans la rue montre un jean avec écrit « Le meilleur prix de l'année ».", answer:'pub', explain:"Publicité. L'affiche cherche à donner envie d'acheter le produit présenté."}
      ]
    },
    {
      id:'ecrans',
      icon:'💻',
      title:'Les écrans et moi',
      subtitle:'Usage raisonné et données personnelles',
      intro:"Bien utiliser les écrans, c’est aussi savoir se protéger.",
      choices:[{label:'✅ Vrai', value:true},{label:'❌ Faux', value:false}],
      items:[
        {text:"Je peux donner mon nom, mon adresse ou ma photo à quelqu'un que je ne connais pas sur un jeu en ligne.", answer:false, explain:"Faux. Ces informations sont personnelles. On ne les donne jamais à des inconnus, même en ligne."},
        {text:"Il est important de faire des pauses entre les moments d'écran.", answer:true, explain:"Vrai. Le corps et les yeux ont besoin de repos régulier, et il faut aussi du temps pour d'autres activités."},
        {text:"Si un message ou un jeu me met mal à l'aise, je peux en parler à un adulte de confiance.", answer:true, explain:"Vrai. Parler à un adulte est toujours une bonne idée quand quelque chose te dérange en ligne."},
        {text:"Tous les jeux et vidéos sur internet sont adaptés à mon âge.", answer:false, explain:"Faux. Certains contenus ne sont pas faits pour les enfants. C'est pour ça qu'il existe des règles et des adultes qui aident à choisir."},
        {text:"Une fois qu'une photo ou un message est envoyé sur internet, il peut être très difficile de l'effacer complètement.", answer:true, explain:"Vrai. Ce qui est publié peut être copié ou partagé. C'est pour ça qu'il faut réfléchir avant d'envoyer."},
        {text:"Je peux utiliser les écrans autant de temps que je veux, sans limite.", answer:false, explain:"Faux. Un temps d'écran raisonnable, avec des règles fixées en famille, protège le sommeil et la santé."},
        {text:"Un mot de passe, ça se garde pour soi et on ne le donne pas, même à un copain.", answer:true, explain:"Vrai. Un mot de passe protège tes informations personnelles. Il reste secret."},
        {text:"Si quelqu'un que je ne connais pas veut devenir mon ami sur un jeu ou une appli, je dois accepter automatiquement.", answer:false, explain:"Faux. On ne connaît pas toujours qui se cache derrière un écran. Mieux vaut en parler à un adulte avant d'accepter."}
      ]
    }
  ];
