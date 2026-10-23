(function(){
  'use strict';
  if(window.__hibouMesLeconsV25891) return;
  window.__hibouMesLeconsV25891 = true;

  var VERSION = window.MAITRE_HIBOU_TITLE || '🦉 Maître Hibou';

  function byId(id){ return document.getElementById(id); }
  function textOf(node){ return node ? String(node.textContent || '').replace(/\s+/g,' ').trim() : ''; }
  function esc(v){ return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

  function setVersion(){
    // Le titre de l'onglet du site est conservé, pas modifié par Mes leçons.
  }

  function createPopup(){
    if(byId('hibouLessonsOverlay')) return;
    var overlay = document.createElement('div');
    overlay.id = 'hibouLessonsOverlay';
    overlay.className = 'hibou-lessons-overlay';
    overlay.setAttribute('aria-hidden','true');
    overlay.innerHTML =
      '<section class="hibou-lessons-dialog" role="dialog" aria-modal="true" aria-labelledby="hibouLessonsTitle">' +
        '<header class="hibou-lessons-header">' +
          '<div class="owl" aria-hidden="true"><img src="bibliotheque_lecons/images/logo_lecons_officiel.png?v=25772-logo-officiel" alt=""></div>' +
          '<div class="hibou-lessons-title"><h2 id="hibouLessonsTitle">Mes leçons</h2></div>' +
          '<button type="button" class="hibou-lessons-close" id="hibouLessonsClose" aria-label="Fermer">×</button>' +
        '</header>' +
        '<nav class="hibou-lessons-tabs" aria-label="Choisir un contenu">' +
          '<button type="button" class="hibou-lessons-tab active" id="hibouLessonsFrench">📘 Français</button>' +
          '<button type="button" class="hibou-lessons-tab" id="hibouLessonsMaths">📐 Mathématiques</button>' +
          '<button type="button" class="hibou-lessons-tab" id="hibouLessonsSciences">💧 Sciences</button>' +
          '<button type="button" class="hibou-lessons-tab" id="hibouLessonsGeographie">🏙️ Géographie</button><button type="button" class="hibou-lessons-tab" id="hibouLessonsHistoire">🏡 Histoire</button><button type="button" class="hibou-lessons-tab" id="hibouLessonsEvar">💛 EVAR</button><button type="button" class="hibou-lessons-tab" id="hibouLessonsLexique">🔤 Lexique</button>' +
          '<button type="button" class="hibou-lessons-tab" id="hibouLessonsMiniTab">💡 Mini-leçon</button>' +
        '</nav>' +
        '<div class="hibou-lessons-content">' +
          '<iframe class="hibou-lessons-frame" id="hibouLessonsFrame" title="Bibliothèque des leçons de français" src="bibliotheque_lecons/index.html"></iframe>' + '<div class="hibou-subject-catalog" id="hibouSubjectCatalog" hidden></div>' +
          '<section class="hibou-mini-panel" id="hibouLessonsMiniPanel" hidden></section>' +
        '</div>' +
      '</section>';
    document.body.appendChild(overlay);

    var close = byId('hibouLessonsClose');
    var frame = byId('hibouLessonsFrame');
    if(frame) frame.addEventListener('load', function(){
      injectLibraryCards();
      // Les pages de leçons maths sont affichées dans cette même iframe.
      // Une image garde ses proportions et occupe presque toute la largeur.
      try {
        var doc = frame.contentDocument;
        var path = frame.contentWindow.location.pathname;
        if(!doc || !/\/bibliotheque_math\/lecons\/[^/]+\.html$/.test(path)) return;
        if(doc.getElementById('hibouMathsFullWidth')) return;
        var style = doc.createElement('style');
        style.id = 'hibouMathsFullWidth';
        style.textContent =
          'html,body{width:100%!important;max-width:none!important;}' +
          'main{width:100%!important;max-width:none!important;box-sizing:border-box!important;padding:clamp(6px,1vw,14px)!important;}' +
          'img.lesson-image{display:block!important;width:100%!important;max-width:100%!important;height:auto!important;max-height:none!important;object-fit:contain!important;margin-left:auto!important;margin-right:auto!important;}' +
          '.practice{width:100%!important;max-width:none!important;box-sizing:border-box!important;}';
        doc.head.appendChild(style);
      }catch(e){console.warn('Affichage pleine largeur non appliqué :',e);}
    });
    var french = byId('hibouLessonsFrench');
    var maths = byId('hibouLessonsMaths');
    var mini = byId('hibouLessonsMiniTab');
    var sciences = byId('hibouLessonsSciences');
    var geographie = byId('hibouLessonsGeographie');
    var histoire = byId('hibouLessonsHistoire');
    var evar = byId('hibouLessonsEvar');
    var lexique = byId('hibouLessonsLexique');
    if(close) close.addEventListener('click', closeLessons);
    var back=byId('hibouLessonsBack');if(back)back.addEventListener('click',restoreCatalog);
    if(french) french.addEventListener('click', function(){ selectSubject('francais'); });
    if(maths) maths.addEventListener('click', function(){ selectSubject('maths'); });
    if(mini) mini.addEventListener('click', function(){ selectSubject('mini'); });
    if(sciences) sciences.addEventListener('click', function(){ selectSubject('sciences'); });
    if(geographie) geographie.addEventListener('click', function(){ selectSubject('geographie'); });
    if(histoire) histoire.addEventListener('click', function(){ selectSubject('histoire'); });
    if(evar) evar.addEventListener('click', function(){ selectSubject('evar'); });
    if(lexique) lexique.addEventListener('click', function(){ selectSubject('lexique'); });
    overlay.addEventListener('click', function(ev){ if(ev.target === overlay) closeLessons(); });
  }


  /* Transformation exclusivement dans la fenêtre intégrée : les pages originales sont intactes. */
  var subjects = {
    francais:['Mes leçons de français','38 fiches de français harmonisées avec le programme 2025.'],
    maths:['Mes leçons de mathématiques','48 fiches de mathématiques avec le programme 2025.'],
    sciences:['Mes leçons de sciences','Choisis une leçon, puis ouvre-la pour la revoir.'],
    geographie:['Mes leçons de géographie','Choisis une leçon, puis ouvre-la pour la revoir.'],
    histoire:['Mes leçons d’histoire','Choisis une leçon, puis ouvre-la pour la revoir.'],
    evar:['Mon carnet EVAR','Éducation à la vie affective et relationnelle — CE2.'],
    lexique:['Mes leçons de lexique','Choisis une leçon, puis ouvre-la pour la revoir.'],
    mini:['Mini-leçon du jour','Une nouvelle découverte avec Maître Hibou.']
  };
  var singlePages = {
    sciences:{title:'L’eau : ses états et ses changements',emoji:'💧',hint:'Glace · Eau liquide · Vapeur',tone:'#d9f1ff'},
    histoire:{title:'Habiter autrefois et aujourd’hui',emoji:'🏠',hint:'Comparer les habitations',tone:'#fff0db'},
  };
  function setLessonHeader(subject){
    var values=subjects[subject]||subjects.francais;
    var h=byId('hibouLessonsTitle'),p=byId('hibouLessonsSubTitle');
    if(h)h.textContent='Mes leçons';
    if(p)p.textContent=values[1];
  }
  function artFor(title,domain){
    var s=(title+' '+domain).toLowerCase();
    if(/fraction/.test(s))return ['🍕','1/2  ·  1/4','#ffe6b6'];
    if(/géom|solide|cube|pavé|triangle|carré|rectangle|périmètre/.test(s))return ['📐','◻  △  ▭','#d5f4fb'];
    if(/nombre|dizain|centain|millier/.test(s))return ['🔢','100  ·  10  ·  1','#fce3ee'];
    if(/addition|soustraction|multiplication|calcul|table/.test(s))return ['🧮','3 + 4 = 7','#e9e1fb'];
    if(/problème/.test(s))return ['🧩','Je cherche !','#f6dfb6'];
    if(/durée|heure|temps/.test(s))return ['🕒','12 h 30','#e1f1ff'];
    if(/phrase|ponctuation|sujet/.test(s))return ['💬','Le chat joue.','#d9f2ff'];
    if(/verbe|conjug|présent|imparfait|futur|passé/.test(s))return ['✍️','je · tu · il','#ffe9d7'];
    if(/nom|déterminant|groupe nominal|adjectif|genre|pluriel|singulier/.test(s))return ['🐈','un chat · des chats','#eff0cf'];
    if(/pronom/.test(s))return ['👧🏽','je · tu · nous','#eee4fb'];
    if(/orthographe|accord|écriture/.test(s))return ['✏️','J’écris bien !','#fbe1ed'];
    if(/dictionnaire|mots|vocabulaire|synonym|contraire|sens/.test(s))return ['📚','A  B  C','#e0f9ed'];
    if(/tableau|données/.test(s))return ['📊','3  ·  5  ·  7','#e1f4ff'];
    return ['🦉','Je découvre !','#e6f1ff'];
  }
  // Couvertures BD des séries de grammaire : chemins relatifs au catalogue iframe.
  var lessonCoverFiles = {
    'La phrase et la ponctuation':'grammaire-phrase-ponctuation.jpg',
    'Les types de phrases':'grammaire-types-phrases.jpg',
    'La phrase interrogative':'grammaire-phrase-interrogative.jpg',
    'Les formes de phrases':'grammaire-formes-phrases.jpg',
    'Les classes de mots':'grammaire-classes-mots.jpg',
    'Le déterminant':'grammaire-determinant.jpg',
    'Le groupe nominal':'grammaire-groupe-nominal.jpg',
    'Le verbe':'grammaire-verbe.jpg',
    'Le sujet du verbe':'grammaire-sujet-verbe.jpg',
    'Les compléments du verbe':'grammaire-complements-verbe.jpg',
    'Les groupes dans la phrase':'grammaire-groupes-phrase.jpg',
    'L’adverbe':'grammaire-adverbe.jpg',
    'Les mots variables et invariables':'grammaire-mots-variables-invariables.jpg',
    'L’imparfait':'conjugaison-imparfait.jpg',
    'L’imparfait de quelques verbes irréguliers':'conjugaison-imparfait-irreguliers.jpg',
    'Le passé composé':'conjugaison-passe-compose.jpg',
    'Le passé composé : avoir et être':'conjugaison-passe-compose-avoir-etre.jpg',
    'Le passé composé de quelques verbes irréguliers':'conjugaison-passe-compose-irreguliers.jpg',
    'Le futur':'conjugaison-futur.jpg',
    'Le futur de quelques verbes irréguliers':'conjugaison-futur-irreguliers.jpg',
    'Le présent':'conjugaison-present.jpg',
    'Le présent de quelques verbes irréguliers':'conjugaison-present-irreguliers.jpg',
    'L’ordre alphabétique':'vocabulaire-ordre-alphabetique.jpg',
    'Les synonymes':'vocabulaire-synonymes.jpg',
    'Synonymes et antonymes':'vocabulaire-synonymes-antonymes.jpg',
    'Familles de mots, préfixes et suffixes':'vocabulaire-familles-prefixes-suffixes.jpg',
    'Le champ lexical':'vocabulaire-champ-lexical.jpg',
    'Le dictionnaire':'vocabulaire-dictionnaire.jpg',
    'Les termes génériques et spécifiques':'vocabulaire-termes-generiques-specifiques.jpg',
    'Le sens propre et le sens figuré':'vocabulaire-sens-propre-figure.jpg',
    'Les niveaux de langue':'vocabulaire-niveaux-langue.jpg',
    'La lettre G':'orthographe-lettre-g.jpg',
    'La lettre C':'orthographe-lettre-c.jpg',
    'La lettre S':'orthographe-lettre-s.jpg',
    'Le pluriel des noms':'orthographe-pluriel-noms.jpg',
    'Le pluriel des adjectifs':'orthographe-pluriel-adjectifs.jpg',
    'Le féminin des noms':'orthographe-feminin-noms.jpg',
    'Le féminin des adjectifs':'orthographe-feminin-adjectifs.jpg',
    'm devant m, b et p':'orthographe-m-devant-m-b-p.jpg',
    'Je relis et j’améliore mon texte':'ecriture-relire-ameliorer-texte.jpg',
    'a / à':'orthographe-a-a-ce2-paysage.jpg',
    'et / est':'orthographe-et-est-ce2-paysage.jpg',
    'L’accord sujet-verbe':'orthographe-accord-sujet-verbe-ce2-paysage.jpg',
    "L'accord sujet-verbe":'orthographe-accord-sujet-verbe-ce2-paysage.jpg'
  };
  // Couvertures de mathématiques : titres exacts du catalogue mathématique.
  var mathCoverFiles = {
    'Lire, écrire et représenter les nombres jusqu’à 10 000':'math-lire-ecrire-nombres-10000.jpg',
    'Comprendre la valeur des chiffres':'math-valeur-position.jpg',
    'Comparer, ranger et encadrer les nombres':'math-comparer-ranger.jpg',
    'Placer des nombres sur une ligne graduée':'math-ligne-graduee.jpg',
    'Comprendre une fraction comme part d’un tout':'math-fractions-part-tout.jpg',
    'Placer des fractions sur une bande graduée':'math-fractions-bande-graduee.jpg',
    'Reconnaître des fractions égales':'math-fractions-egales.jpg',
    'Comparer des fractions inférieures ou égales à 1':'math-comparer-fractions.jpg',
    'Additionner et soustraire des fractions':'math-addition-soustraction-fractions.jpg',
    'Comprendre l’addition':'math-comprendre-addition.jpg',
    'Calculer mentalement une addition':'math-calcul-mental-addition.jpg',
    'Poser et effectuer une addition':'math-addition-posee-v30.jpg',
    'Comprendre la soustraction':'math-comprendre-soustraction.jpg',
    'Calculer mentalement une soustraction':'math-calcul-mental-soustraction.jpg',
    'Poser et effectuer une soustraction':'math-soustraction-posee.jpg',
    'Comprendre la multiplication':'math-comprendre-multiplication.jpg',
    'Mémoriser les tables de multiplication':'math-tables-multiplication.jpg',
    'Multiplier par 10 ou par 100':'math-multiplier-10-100.jpg',
    'Poser une multiplication par un chiffre':'math-multiplication-posee-un-chiffre.jpg',
    'Poser une multiplication par deux chiffres':'math-multiplication-posee-deux-chiffres.jpg',
    'Comprendre la division':'math-comprendre-division-ce2.jpg',
    'Trouver des compléments':'math-trouver-complements.jpg',
    'Calculer des doubles et des moitiés':'math-doubles-moities.jpg',
    'Résoudre un problème de parties et de tout':'math-probleme-parties-tout.jpg',
    'Résoudre un problème de comparaison':'math-probleme-comparaison.jpg',
    'Résoudre un problème de groupes égaux':'math-probleme-groupes-egaux.jpg',
    'Résoudre un problème de partage ou de groupement':'math-probleme-partage-groupement-ce2.jpg',
    'Résoudre un problème en plusieurs étapes':'math-probleme-plusieurs-etapes-ce2.jpg',
    'Reconnaître des points alignés':'math-points-alignes-ce2.jpg',
    'Distinguer droite, segment et milieu':'math-droite-segment-milieu-ce2.jpg',
    'Se repérer et reproduire sur un quadrillage':'math-quadrillage-ce2.jpg',
    'Reconnaître et tracer un angle droit':'math-angle-droit-ce2.jpg',
    'Reconnaître un polygone':'math-polygone-ce2.jpg',
    'Reconnaître carré, rectangle et losange':'math-carre-rectangle-losange-ce2.jpg',
    'Reconnaître les triangles':'math-triangles-ce2.jpg',
    'Tracer et décrire un cercle':'math-cercle-ce2.jpg',
    'Reconnaître et décrire des solides':'math-solides-ce2.jpg',
    'Reconnaître et compléter une symétrie':'math-symetrie-ce2.jpg',
    'Mesurer et convertir des longueurs':'math-longueurs-conversions-ce2.jpg',
    'Déterminer le périmètre d’un polygone':'math-perimetre-polygone-ce2.jpg',
    'Mesurer et comparer des masses':'math-masses-comparaison-ce2.jpg',
    'Mesurer des contenances':'math-contenances-ce2.jpg',
    'Utiliser les euros et les centimes':'math-euros-centimes-ce2.jpg',
    'Calculer avec des prix':'math-calculer-avec-prix-ce2.jpg',
    'Lire l’heure':'math-lire-heure-ce2.jpg',
    'Calculer une durée':'math-calculer-duree-ce2.jpg',
    'Lire et compléter un tableau à double entrée':'math-tableau-double-entree-ce2.jpg',
    'Lire et produire un diagramme en barres':'math-diagramme-barres-ce2.jpg'
  };
  function makeThumb(doc,title,domain){
    var a=artFor(title,domain), d=doc.createElement('div');
    d.className='hibou-lesson-thumb';d.style.setProperty('--thumb-bg',a[2]);
    var symbol=doc.createElement('span');symbol.className='hibou-thumb-symbol';symbol.textContent=a[0];
    var sample=doc.createElement('span');sample.className='hibou-thumb-sample';sample.textContent=a[1];
    d.appendChild(symbol);d.appendChild(sample);
    var isMathCatalog=/\/bibliotheque_math\//.test(doc.location.pathname);
    var coverFile = isMathCatalog ? mathCoverFiles[title] : lessonCoverFiles[title];
    if(coverFile){
      var img=doc.createElement('img');
      img.className='hibou-lesson-cover';
      img.alt=domain+' — '+title;
      img.loading='eager';
      img.decoding='async';
      function activateCover(){
        d.classList.add('hibou-thumb-has-cover');
        var card=d.closest('.lesson-card,.card');
        if(card)card.classList.add('hibou-card-has-cover');
      }
      img.addEventListener('load',activateCover);
      img.addEventListener('error',function(){img.remove();});
      // doc est /bibliotheque_lecons/index.html : remonter à la racine.
      img.src=isMathCatalog ? '../images-lecons/maths/miniatures/'+coverFile : '../images-lecons/francais/miniatures/'+coverFile;
      d.appendChild(img);
      if(img.complete && img.naturalWidth) activateCover();
    }
    return d;
  }
  // Barre de périodes pour Français, Mathématiques et Sciences (classement sciences provisoire).
  // Le catalogue source ne fournit pas encore data-period : classement initial explicite,
  // à ajuster à la progression annuelle lorsque les périodes sont confirmées.
  var periodsBySubject = {
    sciences: {
      P1: ['La démarche scientifique','L’air existe et prend de la place','L’air peut être comprimé','L’eau et l’huile ne se mélangent pas','Transparent, translucide ou opaque ?','Comment se forme une ombre ?'],
      P2: ['Les trois états de l’eau','Les changements d’état de l’eau','Flotte ou coule ?'],
      P3: ['Comment fonctionne un VTT ?','Le VTT : rouler en sécurité'],
      P4: [], P5: []
    },
    francais: {
      P1: ['La phrase et la ponctuation','Les types de phrases','Les classes de mots','Le déterminant','Le groupe nominal','Le verbe','L’ordre alphabétique','Le présent','Le pluriel des noms','Je m’installe bien','Les lettres minuscules'],
      P2: ['La phrase interrogative','Le sujet du verbe','Le présent de quelques verbes irréguliers','Le dictionnaire','La lettre G','L’accord sujet-verbe','Je soigne ma présentation','Je copie sans erreur'],
      P3: ['Les formes de phrases','Les compléments du verbe','Le futur','Le futur de quelques verbes irréguliers','Les synonymes','La lettre C','Le pluriel des adjectifs','J’écris une phrase'],
      P4: ['Les groupes dans la phrase','L’imparfait','L’imparfait de quelques verbes irréguliers','Familles de mots, préfixes et suffixes','Synonymes et antonymes','La lettre S','Le féminin des noms','a / à','et / est'],
      P5: ['L’adverbe','Les mots variables et invariables','Le passé composé','Le passé composé : avoir et être','Le passé composé de quelques verbes irréguliers','Le champ lexical','Les termes génériques et spécifiques','Le sens propre et le sens figuré','Les niveaux de langue','Le féminin des adjectifs','m devant m, b et p','Je relis et j’améliore mon texte']
    },
    maths: {
      P1: ['Lire, écrire et représenter les nombres jusqu’à 10 000','Comprendre la valeur des chiffres','Comparer, ranger et encadrer les nombres','Comprendre l’addition','Calculer mentalement une addition','Poser et effectuer une addition','Comprendre la multiplication','Résoudre un problème de parties et de tout','Reconnaître des points alignés','Distinguer droite, segment et milieu'],
      P2: ['Placer des nombres sur une ligne graduée','Comprendre la soustraction','Calculer mentalement une soustraction','Poser et effectuer une soustraction','Mémoriser les tables de multiplication','Trouver des compléments','Résoudre un problème de comparaison','Se repérer et reproduire sur un quadrillage','Reconnaître et tracer un angle droit','Déterminer le périmètre d’un polygone'],
      P3: ['Comprendre une fraction comme part d’un tout','Placer des fractions sur une bande graduée','Calculer des doubles et des moitiés','Multiplier par 10 ou par 100','Résoudre un problème de groupes égaux','Reconnaître un polygone','Reconnaître carré, rectangle et losange','Reconnaître les triangles','Mesurer et convertir des longueurs'],
      P4: ['Reconnaître des fractions égales','Comparer des fractions inférieures ou égales à 1','Poser une multiplication par un chiffre','Résoudre un problème de partage ou de groupement','Tracer et décrire un cercle','Reconnaître et décrire des solides','Mesurer et comparer des masses','Mesurer des contenances','Lire l’heure','Lire et compléter un tableau à double entrée'],
      P5: ['Additionner et soustraire des fractions','Poser une multiplication par deux chiffres','Comprendre la division','Résoudre un problème en plusieurs étapes','Reconnaître et compléter une symétrie','Utiliser les euros et les centimes','Calculer avec des prix','Calculer une durée','Lire et produire un diagramme en barres']
    }
  };

  // Calendrier officiel 2026-2027, zone C (Montpellier).
  // Pendant les vacances : dernière période travaillée.
  function currentSchoolPeriod(){
    var d=new Date(), y=d.getFullYear(),m=d.getMonth()+1,day=d.getDate();
    var key=y*10000+m*100+day;
    if(key<20260901)return 'P1';
    if(key<20261102)return 'P1';
    if(key<20270104)return 'P2';
    if(key<20270222)return 'P3';
    if(key<20270419)return 'P4';
    return 'P5';
  }
  function storedPeriod(subject){
    try{var value=sessionStorage.getItem('hibou-period-'+subject);
      return ['Toutes','P1','P2','P3','P4','P5'].includes(value)?value:currentSchoolPeriod();
    }catch(e){return currentSchoolPeriod();}
  }
  function rememberPeriod(subject,value){
    try{sessionStorage.setItem('hibou-period-'+subject,value);}catch(e){}
  }
  function activateNativePeriod(doc){
    var pathname=doc.location.pathname;
    var subject=/\/bibliotheque_geographie\/index\.html$/.test(pathname)?'geographie':/\/bibliotheque_lexique\/index\.html$/.test(pathname)?'lexique':null;
    if(!subject||doc.documentElement.dataset.hibouAutoPeriodReady)return;
    var buttons=Array.from(doc.querySelectorAll(subject==='geographie'?'button[data-period]':'button[data-filter]'));
    if(buttons.length<6)return;
    doc.documentElement.dataset.hibouAutoPeriodReady='1';
    buttons.forEach(function(button){button.addEventListener('click',function(){
      rememberPeriod(subject,subject==='geographie'?button.dataset.period:button.dataset.filter==='all'?'Toutes':button.dataset.filter.toUpperCase());
    });});
    var value=storedPeriod(subject);
    var desired=buttons.find(function(b){return subject==='geographie'?b.dataset.period===value:b.dataset.filter===(value==='Toutes'?'all':value.toLowerCase());});
    if(desired)desired.click();
  }
  function normalizeLessonTitle(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’]/g,"'").toLowerCase().trim();}
  function installPeriodBar(doc){
    var pathname=doc.location.pathname;
    var subject=/\/bibliotheque_math\/index\.html$/.test(pathname)?'maths':/\/bibliotheque_lecons\/index\.html$/.test(pathname)?'francais':/\/bibliotheque_sciences\/index\.html$/.test(pathname)?'sciences':null;
    if(!subject) return;
    var cards=Array.from(doc.querySelectorAll(subject==='maths'?'.grid .card':subject==='sciences'?'.cards .card':'.lesson-grid .lesson-card'));
    var toolbar=doc.querySelector(subject==='maths'?'.search':'.searchbar');
    if(!cards.length||!toolbar||doc.getElementById('hibouPeriodBar'))return;
    var style=doc.createElement('style');style.id='hibouPeriodsCSS';
    style.textContent='.hibou-period-bar{display:flex;gap:6px;align-items:center;padding:0 0 12px;margin:0 0 5px;max-width:100%;overflow-x:auto;scrollbar-width:thin}.hibou-period-btn{flex:1 0 auto;min-width:58px;padding:8px 12px;border:1px solid #d5e2f2;border-radius:12px;background:#fff;color:#244771;font:800 13px system-ui,sans-serif;cursor:pointer}.hibou-period-btn.active{background:#183d78;color:#fff;border-color:#183d78}.hibou-period-hidden{display:none!important}@media(max-width:580px){.hibou-period-btn{min-width:42px;padding:8px 6px;font-size:12px}}';
    doc.head.appendChild(style);
    var bar=doc.createElement('nav');bar.id='hibouPeriodBar';bar.className='hibou-period-bar';bar.setAttribute('aria-label','Filtrer les leçons par période');
    var mapping=periodsBySubject[subject], periods=['Toutes','P1','P2','P3','P4','P5'];
    var titlePeriod={};Object.keys(mapping).forEach(function(p){mapping[p].forEach(function(t){titlePeriod[normalizeLessonTitle(t)]=p;});});
    cards.forEach(function(card){var title=textOf(card.querySelector('h2'));card.dataset.hibouPeriod=card.dataset.period||titlePeriod[normalizeLessonTitle(title)]||'non-classee';});
    var selected=storedPeriod(subject);
    function applyPeriod(){
      cards.forEach(function(card){card.classList.toggle('hibou-period-hidden',selected!=='Toutes'&&card.dataset.hibouPeriod!==selected);});
      // Corrige aussi l'état "aucun résultat" du catalogue français.
      var empty=doc.getElementById('empty');if(empty){
        var hasVisible=cards.some(function(c){return !c.classList.contains('hibou-period-hidden')&&c.style.display!=='none';});
        empty.style.display=hasVisible?'none':'block';
      }
    }
    periods.forEach(function(period){var button=doc.createElement('button');button.type='button';button.className='hibou-period-btn'+(period===selected?' active':'');button.textContent=period;button.setAttribute('aria-pressed',period===selected?'true':'false');button.addEventListener('click',function(){selected=period;rememberPeriod(subject,period);bar.querySelectorAll('button').forEach(function(b){var on=b===button;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});applyPeriod();});bar.appendChild(button);});
    toolbar.insertAdjacentElement('afterend',bar);
    // Les filtres d'origine restent maîtres : on recalcule après leurs événements.
    doc.addEventListener('input',function(e){if(e.target.matches('#search,#q'))setTimeout(applyPeriod,0);});
    doc.querySelectorAll('.filter').forEach(function(b){b.addEventListener('click',function(){setTimeout(applyPeriod,0);});});
    applyPeriod();
  }
  function injectLibraryCards(){
    var frame=byId('hibouLessonsFrame');if(!frame)return;
    try{
      var doc=frame.contentDocument;
      if(!doc||!doc.body)return;
      // Géographie : les cartes possèdent déjà leur miniature native.
      // Ne pas ajouter la vignette « Je découvre ! » sous les titres.
      if(/\/bibliotheque_histoire\//.test(doc.location.pathname)){return;}
      if(/\/bibliotheque_geographie\//.test(doc.location.pathname)){
        // Les illustrations photographiques sont servies en JPG standards :
        // ne pas laisser le navigateur interpréter un JPEG embarqué dans un SVG.
        doc.querySelectorAll('.hibou-lesson-thumb').forEach(function(thumb){thumb.remove();});
        var geoJpgIds = ['geo-p4-02','geo-p4-03','geo-p4-04'];
        geoJpgIds.forEach(function(id){
          var img = doc.querySelector('img[src="miniatures/'+id+'.svg"]');
          if(img){
            img.src='miniatures/'+id+'.jpg';
            img.setAttribute('loading','eager');
          }
        });
        // Conserver les filtres natifs P1-P5, en dessous de la recherche.
        // Supprimer seulement le bandeau bleu et le décompte visuel.
        if(!doc.getElementById('hibouGeoNavStyle')){
          var geoStyle=doc.createElement('style');geoStyle.id='hibouGeoNavStyle';
          geoStyle.textContent='body{background:#edf4fc!important}.wrap{max-width:none!important;padding:12px 14px 24px!important}.wrap>.hero{display:none!important}.toolbar{position:static!important;display:flex!important;flex-wrap:wrap!important;gap:8px!important;padding:2px 0 8px!important;background:transparent!important}.toolbar>.search{flex:1 1 100%!important;max-width:none!important;border-radius:14px!important;min-height:43px!important}.toolbar>.filters{order:2!important;display:flex!important;flex:1 1 100%!important;flex-wrap:nowrap!important;overflow-x:auto!important;gap:6px!important;padding:1px 0 7px!important}.toolbar>.filters>.filter{flex:1 0 auto!important;min-width:54px!important;padding:8px 12px!important;font-size:13px!important;border-radius:12px!important}.toolbar>.count{display:none!important}.grid{margin-top:5px!important}';
          doc.head.appendChild(geoStyle);
        }
        return;
      }
      if(/\/bibliotheque_sciences\/index\.html$/.test(doc.location.pathname)){
        installPeriodBar(doc);
        activateNativePeriod(doc);
        if(!doc.getElementById('hibouScienceNavStyle')){
          var sciStyle=doc.createElement('style');sciStyle.id='hibouScienceNavStyle';
          sciStyle.textContent='.shell{padding:12px 14px 24px!important}.searchbar{margin:2px 0 4px!important}.searchbar input{flex:1 1 260px!important;max-width:480px!important}.hibou-period-bar{margin:3px 0 10px!important;padding:0 0 7px!important}.cards .card.hibou-period-hidden{display:none!important}';
          doc.head.appendChild(sciStyle);
        }
        return;
      }
      installPeriodBar(doc);
        activateNativePeriod(doc);
      var cards=Array.from(doc.querySelectorAll('.lesson-grid .lesson-card,.grid .card'));
      if(!cards.length)return;
      if(!doc.getElementById('hibouCardTheme')){
        var style=doc.createElement('style');style.id='hibouCardTheme';
        style.textContent=`
          body{background:#edf4fc!important;}
          .library-shell,.library{max-width:none!important;padding:12px 14px 24px!important;}
          .library-header,.library>.hero{display:none!important;}
          .searchbar,.search{margin:3px 0 16px!important;gap:8px!important;align-items:center!important;}
          .searchbar input,.search input{min-width:180px!important;flex:1 1 310px!important;max-width:480px!important;padding:11px 14px!important;font-size:15px!important;border-width:2px!important;}
          .filters{gap:6px!important;}
          .filter{font-size:13px!important;padding:10px 12px!important;}
          .lesson-grid,.grid{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(190px,1fr))!important;gap:12px!important;}
          .lesson-card,.grid .card{min-width:0!important;max-width:230px!important;min-height:0!important;padding:12px!important;border-radius:18px!important;display:flex;flex-direction:column!important;background:white!important;border:1px solid #dce6f5!important;box-shadow:0 4px 13px #172e4512!important;}
          .lesson-card h2,.grid .card h2{font:800 17px/1.2 system-ui,sans-serif!important;color:#113965!important;margin:4px 0 8px!important;min-height:40px!important;}
          .lesson-card p,.grid .card p{display:none!important;}
          .lesson-card .badge,.grid .card .tag{order:2!important;font-size:11px!important;align-self:start!important;margin:5px 0!important;padding:4px 8px!important;}
          .lesson-card h2,.grid .card h2{order:0!important;}
          .hibou-lesson-thumb{order:1!important;height:114px!important;background:var(--thumb-bg)!important;border-radius:13px!important;display:flex!important;align-items:center!important;justify-content:space-evenly!important;gap:5px!important;margin-top:4px!important;overflow:hidden!important;border:1px solid #fff!important;}
          .hibou-thumb-symbol{font-size:58px!important;line-height:1!important;filter:drop-shadow(0 3px 2px #0001)!important;}
          .hibou-thumb-sample{font-size:15px!important;line-height:1.35!important;font-weight:850!important;text-align:center!important;color:#164376!important;background:#fffd!important;border-radius:10px!important;padding:8px!important;max-width:52%!important;}
          .open-link,.grid .card .open{display:none!important;} .lesson-card,.grid .card{cursor:pointer!important;transition:transform .16s,box-shadow .16s!important;} .lesson-card:hover,.grid .card:hover{transform:translateY(-2px)!important;box-shadow:0 8px 22px #172e4528!important;} .lesson-card:focus-visible,.grid .card:focus-visible{outline:3px solid #0bb9b9!important;outline-offset:2px!important;}
          /* Couverture complète quand son image est effectivement chargée. */
          .hibou-thumb-has-cover{height:auto!important;aspect-ratio:4/3!important;display:block!important;margin:0!important;border:0!important;background:transparent!important;}
          .hibou-thumb-has-cover .hibou-thumb-symbol,.hibou-thumb-has-cover .hibou-thumb-sample{display:none!important;}
          .hibou-lesson-cover{display:none;width:100%;max-width:100%;height:100%;object-fit:cover;}
          .hibou-thumb-has-cover .hibou-lesson-cover{display:block!important;}
          .lesson-card.hibou-card-has-cover,.grid .card.hibou-card-has-cover{padding:0!important;overflow:hidden!important;}
          .lesson-card.hibou-card-has-cover h2,.lesson-card.hibou-card-has-cover .badge,.grid .card.hibou-card-has-cover h2,.grid .card.hibou-card-has-cover .tag{display:none!important;}
          @media(max-width:580px){.lesson-grid,.grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}.hibou-lesson-thumb{height:94px!important}.hibou-thumb-symbol{font-size:38px!important}.hibou-thumb-sample{font-size:11px!important}.lesson-card h2,.grid .card h2{font-size:14px!important}}
        `;
        doc.head.appendChild(style);
      }
      cards.forEach(function(card){
        if(card.querySelector('.hibou-lesson-thumb'))return;
        var h=card.querySelector('h2');if(!h)return;
        var link=card.querySelector('a[href]');
        var thumb=makeThumb(doc,textOf(h),card.getAttribute('data-domain')||'');
        h.insertAdjacentElement('afterend',thumb);
        if(link){
          // Une carte entière donne accès à son véritable lien de leçon.
          card.setAttribute('role','link');
          card.setAttribute('tabindex','0');
          card.setAttribute('aria-label','Ouvrir la leçon : '+textOf(h));
          link.style.display='none';
          if(!card.__hibouClickable){
            card.__hibouClickable=true;
            card.addEventListener('click',function(event){
              if(event.target.closest('a,button,input,select'))return;
              link.click();
            });
            card.addEventListener('keydown',function(event){
              if(event.key==='Enter' || event.key===' '){event.preventDefault();link.click();}
            });
          }
        }
      });
      try{doc.documentElement.scrollTop=0;doc.body.scrollTop=0;}catch(e){}
    }catch(e){console.warn('Bibliothèque non modifiée :',e);}
  }
  function showSubjectCatalog(subject){
    var data=singlePages[subject],catalog=byId('hibouSubjectCatalog');
    if(!data||!catalog)return;
    catalog.hidden=false;
    catalog.innerHTML='<div class="hibou-single-tools"><span>📚 Leçons disponibles</span></div>'+ 
      '<button class="hibou-single-card" id="hibouSingleOpen" type="button">'+
       '<strong>'+esc(data.title)+'</strong>'+
       '<span class="hibou-single-art" style="background:'+data.tone+'"><span>'+data.emoji+'</span><small>'+esc(data.hint)+'</small></span>'+
       ''+
      '</button>';
    var button=byId('hibouSingleOpen');
    if(button)button.addEventListener('click',function(){
      catalog.hidden=true;
      var frame=byId('hibouLessonsFrame');
      if(frame){frame.style.display='block';frame.setAttribute('src',SINGLE_URLS[subject]);}
      var back=byId('hibouLessonsBack');if(back)back.hidden=false;
    });
  }
  var SINGLE_URLS={sciences:'bibliotheque_sciences/index.html',geographie:'bibliotheque_geographie/index.html',histoire:'bibliotheque_histoire/index.html',evar:'index_evar.html',lexique:'bibliotheque_lexique/index.html'};
  function restoreCatalog(){
    var catalog=byId('hibouSubjectCatalog'),frame=byId('hibouLessonsFrame');
    if(catalog&&!catalog.hidden){return false;}
    var subject=document.querySelector('.hibou-lessons-tab.active');
    var key=subject&&({hibouLessonsEvar:'evar',hibouLessonsLexique:'lexique'})[subject.id];
    if(key){if(frame)frame.style.display='none';showSubjectCatalog(key);return true;}
    return false;
  }

  function sourceMiniCard(){
    return byId('v21TreasureCard') || document.querySelector('.v24-know-card') || null;
  }

  function readMiniLessonData(){
    var card = sourceMiniCard();
    if(!card){
      return {
        question:'Mini-leçon indisponible pour le moment.',
        lesson:'Reviens dans un instant : Maître Hibou recharge la mini-leçon du jour.',
        challenge:'',
        correction:''
      };
    }
    return {
      question: textOf(card.querySelector('.v24-know-question')),
      lesson: textOf(card.querySelector('.v24-know-lesson')).replace(/^Je retiens\s*:\s*/i,''),
      challenge: textOf(card.querySelector('.v24-know-defi')).replace(/^Petit défi\s*:\s*/i,''),
      correction: textOf(card.querySelector('.v24-know-answer')).replace(/^Correction du défi\s*:\s*/i,'')
    };
  }

  function renderMiniLesson(){
    var panel = byId('hibouLessonsMiniPanel');
    if(!panel) return;
    var data = readMiniLessonData();
    panel.innerHTML =
      '<div class="hibou-mini-card">' +
        '<div class="hibou-mini-top">' +
          '<div class="hibou-mini-icon" aria-hidden="true">💡</div>' +
          '<div><p class="hibou-mini-kicker">Le savais-tu ?</p><h3>Mini-leçon du jour</h3></div>' +
        '</div>' +
        '<p class="hibou-mini-question">' + esc(data.question) + '</p>' +
        '<p class="hibou-mini-retains"><strong>Je retiens :</strong> ' + esc(data.lesson || '—') + '</p>' +
        (data.challenge ? '<p class="hibou-mini-defi"><strong>Petit défi :</strong> ' + esc(data.challenge) + '</p>' : '') +
        '<details class="hibou-mini-details"><summary>Voir la correction</summary><div>' + esc(data.correction || 'Correction à venir.') + '</div></details>' +
        '<div class="hibou-mini-actions"><button type="button" class="hibou-mini-refresh" id="hibouMiniRefresh">Une autre mini-leçon</button></div>' +
      '</div>';

    var refresh = byId('hibouMiniRefresh');
    if(refresh){
      refresh.addEventListener('click', function(){
        try{
          var card = sourceMiniCard();
          var next = card ? (card.querySelector('#v24KnowNextBtn') || card.querySelector('.v24-know-btn.secondary')) : null;
          if(next) next.click();
        }catch(e){}
        setTimeout(renderMiniLesson, 120);
      });
    }
  }

  function selectSubject(subject){
    var french = byId('hibouLessonsFrench');
    var maths = byId('hibouLessonsMaths');
    var sciences = byId('hibouLessonsSciences');
    var geographie = byId('hibouLessonsGeographie');
    var histoire = byId('hibouLessonsHistoire');
    var evar = byId('hibouLessonsEvar');
    var lexique = byId('hibouLessonsLexique');
    var mini = byId('hibouLessonsMiniTab');
    var frame = byId('hibouLessonsFrame');
    var panel = byId('hibouLessonsMiniPanel');
    var isMini = subject === 'mini';
    var isSingle=!!singlePages[subject] && subject !== 'sciences' && subject !== 'lexique' && subject !== 'geographie' && subject !== 'histoire';
    var catalog=byId('hibouSubjectCatalog');
    if(catalog)catalog.hidden=true;
    setLessonHeader(subject);
    var back=byId('hibouLessonsBack');if(back)back.hidden=!isSingle;
    var pages = {
      francais: ['bibliotheque_lecons/index.html', 'Bibliothèque des leçons de français'],
      maths: ['bibliotheque_math/index.html', 'Bibliothèque des leçons de mathématiques'],
      sciences: ['bibliotheque_sciences/index.html', "Leçon de sciences : les états de l’eau"],
      geographie: ['bibliotheque_geographie/index.html', 'Bibliothèque des 25 leçons de géographie'],
      histoire: ['bibliotheque_histoire/catalogue.html', 'Bibliothèque des leçons d’histoire CE2'],
      evar: ['index_evar.html', 'Mon carnet EVAR — CE2'],
      lexique: ['bibliotheque_lexique/index.html', 'Leçon de lexique : familles, synonymes, contraires']
    };
    var tabs = [[french,'francais'],[maths,'maths'],[sciences,'sciences'],[geographie,'geographie'],[histoire,'histoire'],[evar,'evar'],[lexique,'lexique'],[mini,'mini']];
    tabs.forEach(function(item){
      if(item[0]) item[0].classList.toggle('active', item[1] === subject);
    });
    if(frame){
      if(isMini || isSingle){
        frame.style.display = 'none';
      }else{
        frame.style.display = 'block';
        var page = pages[subject] || pages.francais;
        if(frame.getAttribute('src') !== page[0]) frame.setAttribute('src', page[0]);
        frame.title = page[1];
        injectLibraryCards();
      }
    }
    if(isSingle)showSubjectCatalog(subject);
    if(panel){
      panel.hidden = !isMini;
      if(isMini) renderMiniLesson();
    }
  }

  function openLessons(subject){
    createPopup();
    selectSubject(subject || 'francais');
    var overlay = byId('hibouLessonsOverlay');
    if(overlay){
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
      setTimeout(function(){ var c=byId('hibouLessonsClose'); if(c) c.focus(); },30);
    }
  }

  function closeLessons(){
    var overlay = byId('hibouLessonsOverlay');
    if(overlay){
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    }
  }

  function installButton(){
    var actions = document.querySelector('.v24-advice-actions');
    if(!actions) return false;

    var lessons = byId('v24AdviceLessons');
    if(!lessons){
      lessons = document.createElement('button');
      lessons.type = 'button';
      lessons.id = 'v24AdviceLessons';
      lessons.className = 'v24-advice-btn v24-advice-lessons';
      actions.insertBefore(lessons, actions.firstChild);
    }
    lessons.innerHTML = '📚 Leçons & mini-leçon<small>Français · Maths · Sciences · Géographie · Histoire · EVAR · Lexique</small>';
    if(!lessons.__hibouLessonBound){
      lessons.__hibouLessonBound = true;
      lessons.addEventListener('click', function(ev){ ev.preventDefault(); openLessons('francais'); }, true);
    }

    var train = byId('v24AdviceTrain');
    var belt = byId('v24AdviceBelt');
    var question = byId('v24AdviceQuestion');
    [train,belt,lessons,question].forEach(function(btn){ if(btn && btn.parentNode === actions) actions.appendChild(btn); });
    return true;
  }

  function install(){
    if(!document.body) return;
    document.body.classList.add('hibou-lessons-ready');
    setVersion();
    createPopup();
    installButton();
  }

  window.openHibouLessons = function(){ openLessons('francais'); };
  window.openHibouMiniLesson = function(){ openLessons('mini'); };
  window.closeHibouLessons = closeLessons;

  document.addEventListener('keydown', function(ev){
    if(ev.key === 'Escape' && byId('hibouLessonsOverlay') && byId('hibouLessonsOverlay').classList.contains('open')) closeLessons();
  });

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
  else install();
  window.addEventListener('load', install);
  [50,150,350,700,1200,2200,4000].forEach(function(ms){ setTimeout(install,ms); });
  setInterval(function(){ setVersion(); installButton(); },3000);
})();
