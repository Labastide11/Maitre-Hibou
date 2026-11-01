
/* V25.7.3 - Ceintures Maths robustes : Google Sheets si disponible, banque locale sinon.
   Objectif : la ceinture blanche Maths ne doit jamais afficher "aucune question".
   Le mode élève n'attend pas le réseau : en cas de réponse absente, CORS, HTML ou JSON invalide,
   Maître Hibou utilise immédiatement une banque locale CE2 de 20 questions. */
(function(){
  if(window.__hibouV25643MathsBeltsRobust) return;
  window.__hibouV25643MathsBeltsRobust = true;

  const MATHS_SHEET_URL = "https://script.google.com/macros/s/AKfycbyzfRPrUV7xKgeXUM0LjbOsOne5DieRjDYxmuVbBBUIGL-F9ahMmJZSfpUDYmBaZIOpvQ/exec?matiere=Maths";
  const MATHS_CACHE_KEY = "hibou_v222_questions_maths_cache";
  const MATHS_PROGRESS_PREFIX = "hibou_v222_maths_progress_";

  window.MATH_BELTS_V222 = [
    {ceinture:"blanche", niveau:1, emoji:"⚪", colorName:"blanche", skillId:"maths_blanche_petits_nombres", competence:"petits nombres", label:"Petits nombres"},
    {ceinture:"jaune", niveau:2, emoji:"🟡", colorName:"jaune", skillId:"maths_jaune_dizaines", competence:"dizaines", label:"Dizaines"},
    {ceinture:"orange", niveau:3, emoji:"🟠", colorName:"orange", skillId:"maths_orange_sans_retenue", competence:"sans retenue", label:"Sans retenue"},
    {ceinture:"vert_clair", niveau:4, emoji:"🟢", colorName:"vert clair", skillId:"maths_vert_clair_avec_retenue", competence:"avec retenue", label:"Avec retenue"},
    {ceinture:"vert_fonce", niveau:5, emoji:"🟢", colorName:"vert foncé", skillId:"maths_vert_fonce_complement_dizaine", competence:"complement dizaine", label:"Complément à la dizaine"},
    {ceinture:"bleu_clair", niveau:6, emoji:"🔵", colorName:"bleu clair", skillId:"maths_bleu_clair_plus_moins_9", competence:"plus ou moins 9", label:"Ajouter / retrancher 9"},
    {ceinture:"bleu_fonce", niveau:7, emoji:"🔵", colorName:"bleu foncé", skillId:"maths_bleu_fonce_plus_moins_11", competence:"plus ou moins 11", label:"Ajouter / retrancher 11"},
    {ceinture:"rose", niveau:8, emoji:"🌸", colorName:"rose", skillId:"maths_rose_centaines", competence:"centaines", label:"Centaines"},
    {ceinture:"beige", niveau:9, emoji:"🤍", colorName:"beige", skillId:"maths_beige_complement_centaine", competence:"complement centaine", label:"Complément à la centaine"},
    {ceinture:"violet", niveau:10, emoji:"🟣", colorName:"violet", skillId:"maths_violet_tables_1_2_10", competence:"tables 1 2 10", label:"Tables ×1 ×2 ×10"},
    {ceinture:"marron", niveau:11, emoji:"🟤", colorName:"marron", skillId:"maths_marron_tables_3_4_5", competence:"tables 3 4 5", label:"Tables ×3 ×4 ×5"},
    {ceinture:"rouge", niveau:12, emoji:"🔴", colorName:"rouge", skillId:"maths_rouge_tables_6_7", competence:"tables 6 7", label:"Tables ×6 ×7"},
    {ceinture:"gris", niveau:13, emoji:"⚫", colorName:"gris", skillId:"maths_gris_tables_8_9", competence:"tables 8 9", label:"Tables ×8 ×9"},
    {ceinture:"noir", niveau:14, emoji:"⚫", colorName:"noir", skillId:"maths_noir_multiplier_10_100_1000", competence:"multiplier par 10 100 1000", label:"×10 ×100 ×1000"}
  ];

  function esc(value){ return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])); }
  function normKey(s){ return String(s||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,''); }
  function currentStudent(){ try{ return (window.prenomActuel || localStorage.getItem('hibou_prenom') || localStorage.getItem('maitreHibouCurrentStudent') || localStorage.getItem('elevePrenom') || 'eleve'); }catch(e){ return 'eleve'; } }
  function progressKey(){ return MATHS_PROGRESS_PREFIX + normKey(currentStudent()); }
  function loadMathProgress(){ try{ return JSON.parse(localStorage.getItem(progressKey()) || '{"belts":[]}'); }catch(e){ return {belts:[]}; } }
  function saveMathProgress(data){ try{ localStorage.setItem(progressKey(), JSON.stringify(data || {belts:[]})); }catch(e){} }
  function medalRank(m){ const s=String(m||'').toLowerCase(); if(s.includes('or')||s.includes('🥇')) return 3; if(s.includes('argent')||s.includes('🥈')) return 2; if(s.includes('bronze')||s.includes('🥉')) return 1; return 0; }
  function bestMathBelt(skillId){ const rows=(loadMathProgress().belts||[]).filter(b=>b.skillId===skillId); if(!rows.length) return null; return rows.sort((a,b)=>(medalRank(b.medal)-medalRank(a.medal)) || ((b.score||0)-(a.score||0)))[0]; }
  function highestValidatedMathLevelV256(){
    let highest=0;
    window.MATH_BELTS_V222.forEach(function(belt){
      if(bestMathBelt(belt.skillId) && belt.niveau>highest) highest=belt.niveau;
    });
    return highest;
  }
  function mathBeltStateV256(belt){
    if(!belt) return {best:null,unlocked:false,inferred:false};
    const best=bestMathBelt(belt.skillId);
    const highest=highestValidatedMathLevelV256();
    if(best) return {best:best,unlocked:true,inferred:false};
    if(belt.niveau<highest) return {best:null,unlocked:false,inferred:true};
    return {best:null,unlocked:belt.niveau===highest+1,inferred:false};
  }
  window.isMathUnlockedV222 = function(belt){ return mathBeltStateV256(belt).unlocked; };
  function previousMathBeltName(belt){ const previous=window.MATH_BELTS_V222.find(b=>b.niveau===belt.niveau-1); return previous ? previous.colorName : ''; }
  window.mathStateHTMLV222 = function(belt){
    const state=mathBeltStateV256(belt);
    if(state.best) return '<div class="v22-state done">✅ Validée<br><span>'+esc(state.best.medal)+' · '+esc(state.best.score)+'/20</span></div>';
    if(state.inferred) return '<div class="v22-state done">✓ Étape franchie<br><span>Niveau supérieur déjà validé</span></div>';
    if(state.unlocked) return '<div class="v22-state ready">⭐ Tu es prêt !</div>';
    return '<div class="v22-state locked">🔒 Valide d’abord<br>la ceinture '+esc(previousMathBeltName(belt))+'</div>';
  };

  function readCell(row,names){ for(const n of names){ if(row && row[n] !== undefined && row[n] !== null && String(row[n]).trim() !== '') return row[n]; } return ''; }
  function shuffle(arr){ const a=(arr||[]).slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  function optionSet(answer){
    answer = Number(answer);
    let opts = [answer];
    const deltas = [-10,-5,-3,-2,-1,1,2,3,5,10,20,-20];
    for(const d of deltas){
      const v = answer + d;
      if(v >= 0 && !opts.includes(v)) opts.push(v);
      if(opts.length >= 4) break;
    }
    while(opts.length < 4){ const v = answer + opts.length + 7; if(!opts.includes(v)) opts.push(v); }
    const strings = shuffle(opts.slice(0,4).map(String));
    return {options:strings, correct:strings.indexOf(String(answer))};
  }
  function q(text, answer){ const o=optionSet(answer); return {q:text, options:o.options, correct:o.correct}; }
  function addQs(list, makers){ makers.forEach(fn=>{ try{ const item=fn(); if(item && item.q) list.push(item); }catch(e){} }); return list; }
  function makeFallbackQuestions(belt){
    const key = normKey((belt&&belt.ceinture)+' '+(belt&&belt.competence)+' '+(belt&&belt.skillId));
    let list=[];
    if(key.includes('blanche') || key.includes('petits_nombres')){
      addQs(list,[
        ()=>q('Combien font 3 + 4 ?',7), ()=>q('Combien font 8 + 5 ?',13), ()=>q('Combien font 12 + 6 ?',18), ()=>q('Combien font 9 + 9 ?',18),
        ()=>q('Combien font 17 - 5 ?',12), ()=>q('Combien font 20 - 8 ?',12), ()=>q('Combien font 14 - 7 ?',7), ()=>q('Combien font 11 - 6 ?',5),
        ()=>q('Quel nombre vient juste après 29 ?',30), ()=>q('Quel nombre vient juste avant 40 ?',39), ()=>q('Quel nombre est entre 56 et 58 ?',57),
        ()=>q('Quel est le double de 6 ?',12), ()=>q('Quel est le double de 9 ?',18), ()=>q('Quelle est la moitié de 18 ?',9),
        ()=>q('Combien font 30 + 7 ?',37), ()=>q('Combien font 40 + 12 ?',52), ()=>q('Combien font 60 + 5 ?',65),
        ()=>q('Combien font 25 + 10 ?',35), ()=>q('Combien font 48 - 10 ?',38), ()=>q('Combien font 70 - 20 ?',50),
        ()=>q('Combien font 6 + 7 ?',13), ()=>q('Combien font 15 + 4 ?',19), ()=>q('Combien font 19 - 9 ?',10), ()=>q('Combien font 50 + 9 ?',59)
      ]);
    } else if(key.includes('jaune') || key.includes('dizaines')){
      for(let a=10;a<=80;a+=10) list.push(q('Combien font '+a+' + 10 ?', a+10));
      addQs(list,[()=>q('Combien font 30 + 40 ?',70),()=>q('Combien font 90 - 30 ?',60),()=>q('Combien font 50 + 20 ?',70),()=>q('Combien font 80 - 50 ?',30),()=>q('Combien font 120 + 30 ?',150),()=>q('Combien font 200 - 40 ?',160),()=>q('Combien font 70 + 60 ?',130),()=>q('Combien font 150 - 50 ?',100),()=>q('Combien font 300 + 20 ?',320),()=>q('Combien font 400 - 100 ?',300),()=>q('Combien font 90 + 90 ?',180),()=>q('Combien font 100 - 70 ?',30)]);
    } else if(key.includes('orange') || key.includes('sans_retenue')){
      addQs(list,[()=>q('Combien font 23 + 14 ?',37),()=>q('Combien font 42 + 25 ?',67),()=>q('Combien font 31 + 46 ?',77),()=>q('Combien font 54 + 32 ?',86),()=>q('Combien font 75 - 24 ?',51),()=>q('Combien font 68 - 35 ?',33),()=>q('Combien font 96 - 42 ?',54),()=>q('Combien font 84 - 31 ?',53),()=>q('Combien font 123 + 45 ?',168),()=>q('Combien font 246 + 32 ?',278),()=>q('Combien font 397 - 65 ?',332),()=>q('Combien font 586 - 41 ?',545),()=>q('Combien font 210 + 34 ?',244),()=>q('Combien font 452 + 27 ?',479),()=>q('Combien font 764 - 32 ?',732),()=>q('Combien font 999 - 56 ?',943),()=>q('Combien font 130 + 60 ?',190),()=>q('Combien font 340 + 250 ?',590),()=>q('Combien font 780 - 320 ?',460),()=>q('Combien font 650 - 120 ?',530)]);
    } else if(key.includes('vert_clair') || key.includes('avec_retenue')){
      addQs(list,[()=>q('Combien font 27 + 18 ?',45),()=>q('Combien font 36 + 47 ?',83),()=>q('Combien font 58 + 29 ?',87),()=>q('Combien font 125 + 48 ?',173),()=>q('Combien font 276 + 59 ?',335),()=>q('Combien font 84 - 37 ?',47),()=>q('Combien font 92 - 58 ?',34),()=>q('Combien font 143 - 67 ?',76),()=>q('Combien font 205 - 86 ?',119),()=>q('Combien font 399 - 175 ?',224),()=>q('Combien font 46 + 38 ?',84),()=>q('Combien font 67 + 25 ?',92),()=>q('Combien font 118 + 76 ?',194),()=>q('Combien font 234 + 89 ?',323),()=>q('Combien font 500 - 268 ?',232),()=>q('Combien font 301 - 126 ?',175),()=>q('Combien font 73 - 49 ?',24),()=>q('Combien font 100 - 46 ?',54),()=>q('Combien font 87 + 36 ?',123),()=>q('Combien font 456 + 78 ?',534)]);
    } else if(key.includes('complement_dizaine') || key.includes('vert_fonce')){
      for(let n=1;n<=9;n++) list.push(q('Combien faut-il ajouter à '+n+' pour faire 10 ?',10-n));
      addQs(list,[()=>q('Combien faut-il ajouter à 12 pour faire 20 ?',8),()=>q('Combien faut-il ajouter à 24 pour faire 30 ?',6),()=>q('Combien faut-il ajouter à 37 pour faire 40 ?',3),()=>q('Combien faut-il ajouter à 51 pour faire 60 ?',9),()=>q('Combien faut-il ajouter à 68 pour faire 70 ?',2),()=>q('Combien faut-il ajouter à 75 pour faire 80 ?',5),()=>q('Combien faut-il ajouter à 86 pour faire 90 ?',4),()=>q('Combien faut-il ajouter à 93 pour faire 100 ?',7),()=>q('Combien font 19 + 1 ?',20),()=>q('Combien font 45 + 5 ?',50),()=>q('Combien font 72 + 8 ?',80)]);
    } else if(key.includes('plus_moins_9') || key.includes('bleu_clair')){
      addQs(list,[()=>q('Combien font 24 + 9 ?',33),()=>q('Combien font 37 + 9 ?',46),()=>q('Combien font 58 + 9 ?',67),()=>q('Combien font 86 + 9 ?',95),()=>q('Combien font 42 - 9 ?',33),()=>q('Combien font 75 - 9 ?',66),()=>q('Combien font 91 - 9 ?',82),()=>q('Combien font 120 - 9 ?',111),()=>q('Combien font 103 + 9 ?',112),()=>q('Combien font 249 + 9 ?',258),()=>q('Combien font 300 - 9 ?',291),()=>q('Combien font 415 - 9 ?',406),()=>q('Combien font 64 + 9 ?',73),()=>q('Combien font 77 - 9 ?',68),()=>q('Combien font 18 + 9 ?',27),()=>q('Combien font 27 - 9 ?',18),()=>q('Combien font 190 + 9 ?',199),()=>q('Combien font 200 - 9 ?',191),()=>q('Combien font 356 + 9 ?',365),()=>q('Combien font 500 - 9 ?',491)]);
    } else if(key.includes('plus_moins_11') || key.includes('bleu_fonce')){
      addQs(list,[()=>q('Combien font 24 + 11 ?',35),()=>q('Combien font 37 + 11 ?',48),()=>q('Combien font 58 + 11 ?',69),()=>q('Combien font 86 + 11 ?',97),()=>q('Combien font 42 - 11 ?',31),()=>q('Combien font 75 - 11 ?',64),()=>q('Combien font 91 - 11 ?',80),()=>q('Combien font 120 - 11 ?',109),()=>q('Combien font 103 + 11 ?',114),()=>q('Combien font 249 + 11 ?',260),()=>q('Combien font 300 - 11 ?',289),()=>q('Combien font 415 - 11 ?',404),()=>q('Combien font 64 + 11 ?',75),()=>q('Combien font 77 - 11 ?',66),()=>q('Combien font 18 + 11 ?',29),()=>q('Combien font 27 - 11 ?',16),()=>q('Combien font 190 + 11 ?',201),()=>q('Combien font 200 - 11 ?',189),()=>q('Combien font 356 + 11 ?',367),()=>q('Combien font 500 - 11 ?',489)]);
    } else if(key.includes('centaines') && !key.includes('complement')){
      addQs(list,[()=>q('Combien font 100 + 200 ?',300),()=>q('Combien font 300 + 400 ?',700),()=>q('Combien font 900 - 500 ?',400),()=>q('Combien font 700 - 200 ?',500),()=>q('Combien font 1200 + 300 ?',1500),()=>q('Combien font 2500 - 400 ?',2100),()=>q('Combien font 600 + 80 ?',680),()=>q('Combien font 400 + 70 ?',470),()=>q('Combien font 900 + 90 ?',990),()=>q('Combien font 1000 - 100 ?',900),()=>q('Combien font 230 + 100 ?',330),()=>q('Combien font 560 - 100 ?',460),()=>q('Combien font 780 + 200 ?',980),()=>q('Combien font 840 - 300 ?',540),()=>q('Combien font 1500 + 500 ?',2000),()=>q('Combien font 2000 - 700 ?',1300),()=>q('Combien font 345 + 100 ?',445),()=>q('Combien font 678 - 200 ?',478),()=>q('Combien font 999 + 100 ?',1099),()=>q('Combien font 1001 - 100 ?',901)]);
    } else if(key.includes('complement_centaine') || key.includes('beige')){
      addQs(list,[()=>q('Combien faut-il ajouter à 80 pour faire 100 ?',20),()=>q('Combien faut-il ajouter à 150 pour faire 200 ?',50),()=>q('Combien faut-il ajouter à 230 pour faire 300 ?',70),()=>q('Combien faut-il ajouter à 460 pour faire 500 ?',40),()=>q('Combien faut-il ajouter à 790 pour faire 800 ?',10),()=>q('Combien faut-il ajouter à 925 pour faire 1000 ?',75),()=>q('Combien faut-il ajouter à 340 pour faire 400 ?',60),()=>q('Combien faut-il ajouter à 670 pour faire 700 ?',30),()=>q('Combien faut-il ajouter à 510 pour faire 600 ?',90),()=>q('Combien faut-il ajouter à 880 pour faire 900 ?',20),()=>q('Combien faut-il ajouter à 199 pour faire 200 ?',1),()=>q('Combien faut-il ajouter à 299 pour faire 300 ?',1),()=>q('Combien faut-il ajouter à 450 pour faire 500 ?',50),()=>q('Combien faut-il ajouter à 745 pour faire 800 ?',55),()=>q('Combien faut-il ajouter à 970 pour faire 1000 ?',30),()=>q('Combien faut-il ajouter à 430 pour faire 500 ?',70),()=>q('Combien faut-il ajouter à 610 pour faire 700 ?',90),()=>q('Combien faut-il ajouter à 275 pour faire 300 ?',25),()=>q('Combien faut-il ajouter à 840 pour faire 900 ?',60),()=>q('Combien faut-il ajouter à 990 pour faire 1000 ?',10)]);
    } else if(key.includes('tables_1_2_10') || key.includes('violet')){
      for(const a of [1,2,10]) for(let b=1;b<=10;b++) list.push(q('Combien font '+a+' × '+b+' ?',a*b));
    } else if(key.includes('tables_3_4_5') || key.includes('marron')){
      for(const a of [3,4,5]) for(let b=1;b<=10;b++) list.push(q('Combien font '+a+' × '+b+' ?',a*b));
    } else if(key.includes('tables_6_7') || key.includes('rouge')){
      for(const a of [6,7]) for(let b=1;b<=10;b++) list.push(q('Combien font '+a+' × '+b+' ?',a*b));
    } else if(key.includes('tables_8_9') || key.includes('gris')){
      for(const a of [8,9]) for(let b=1;b<=10;b++) list.push(q('Combien font '+a+' × '+b+' ?',a*b));
    } else if(key.includes('multiplier_10_100_1000') || key.includes('noir')){
      addQs(list,[()=>q('Combien font 6 × 10 ?',60),()=>q('Combien font 12 × 10 ?',120),()=>q('Combien font 34 × 10 ?',340),()=>q('Combien font 5 × 100 ?',500),()=>q('Combien font 23 × 100 ?',2300),()=>q('Combien font 9 × 1000 ?',9000),()=>q('Combien font 4 × 1000 ?',4000),()=>q('Combien font 70 × 10 ?',700),()=>q('Combien font 80 × 100 ?',8000),()=>q('Combien font 3 × 100 ?',300),()=>q('Combien font 45 × 10 ?',450),()=>q('Combien font 60 × 100 ?',6000),()=>q('Combien font 7 × 1000 ?',7000),()=>q('Combien font 99 × 10 ?',990),()=>q('Combien font 15 × 100 ?',1500),()=>q('Combien font 2 × 1000 ?',2000),()=>q('Combien font 100 × 10 ?',1000),()=>q('Combien font 10 × 100 ?',1000),()=>q('Combien font 11 × 100 ?',1100),()=>q('Combien font 1 × 1000 ?',1000)]);
    }
    if(list.length < 20){
      addQs(list,[()=>q('Combien font 8 + 7 ?',15),()=>q('Combien font 16 - 9 ?',7),()=>q('Combien font 6 × 4 ?',24),()=>q('Combien font 45 + 10 ?',55),()=>q('Combien font 100 - 25 ?',75),()=>q('Combien font 30 + 30 ?',60),()=>q('Combien font 9 × 5 ?',45),()=>q('Combien font 81 - 9 ?',72),()=>q('Combien font 12 × 10 ?',120),()=>q('Combien font 300 + 40 ?',340),()=>q('Combien font 64 - 8 ?',56),()=>q('Combien font 7 × 8 ?',56),()=>q('Combien font 120 - 20 ?',100),()=>q('Combien font 39 + 1 ?',40),()=>q('Combien font 50 - 5 ?',45),()=>q('Combien font 4 × 9 ?',36),()=>q('Combien font 11 + 11 ?',22),()=>q('Combien font 90 + 10 ?',100),()=>q('Combien font 66 - 6 ?',60),()=>q('Combien font 25 + 25 ?',50)]);
    }
    return shuffle(list).slice(0,20);
  }

  function rowToQuestion(row){
    const qtxt=String(readCell(row,['question','Question'])).trim();
    const answer=String(readCell(row,['reponse','réponse','Reponse','Réponse'])).trim();
    const raw=['A','B','C','D'].map(k=>String(readCell(row,[k,k.toLowerCase()])).trim()).filter(Boolean);
    if(answer && !raw.some(o=>String(o)===answer)) raw.unshift(answer);
    const seen=[]; raw.forEach(o=>{ if(o && !seen.includes(o)) seen.push(o); });
    const opts=shuffle(seen).slice(0,4);
    const correct=opts.findIndex(o=>String(o)===answer);
    return {q:qtxt, options:opts, correct:correct<0?0:correct};
  }
  async function loadMathRows(force){
    if(!force){ try{ const cached=JSON.parse(localStorage.getItem(MATHS_CACHE_KEY)||'null'); if(cached && Array.isArray(cached.rows) && cached.rows.length) return cached.rows; }catch(e){} }
    const res=await fetch(MATHS_SHEET_URL + '&t=' + Date.now(), {cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    const rows=await res.json();
    if(!Array.isArray(rows)) throw new Error('Réponse JSON inattendue');
    try{ localStorage.setItem(MATHS_CACHE_KEY, JSON.stringify({date:Date.now(), rows:rows})); }catch(e){}
    return rows;
  }
  async function questionsForMathBelt(belt){
    let rows=[];
    try{ rows=await loadMathRows(true); }
    catch(e){ console.warn('Maths Google Sheets indisponible : banque locale utilisée', e); try{ rows=(JSON.parse(localStorage.getItem(MATHS_CACHE_KEY)||'{}').rows)||[]; }catch(_e){} }
    rows=(rows||[]).filter(row=>{
      const ceinture=normKey(readCell(row,['ceinture','Ceinture']));
      const comp=normKey(readCell(row,['competence','compétence','Competence','Compétence']));
      return ceinture===normKey(belt.ceinture) && comp===normKey(belt.competence);
    });
    const bank=shuffle(rows.map(rowToQuestion).filter(q=>q.q && q.options.length>=2));
    const out=[]; let i=0;
    while(bank.length && out.length<20){ out.push(bank[i % bank.length]); i++; }
    if(out.length>=20) return shuffle(out).slice(0,20);
    return makeFallbackQuestions(belt);
  }
  function ensureOverlay(){
    let ov=document.getElementById('skillValidationFullscreenV1861');
    if(!ov){ ov=document.createElement('div'); ov.id='skillValidationFullscreenV1861'; ov.className='modal-overlay skill-validation-fullscreen-v1861 hidden'; ov.innerHTML='<div class="modal-box"><div id="skillValidationFullscreenBodyV1861"></div></div>'; document.body.appendChild(ov); }
    return ov;
  }
  function body(){ ensureOverlay(); return document.getElementById('skillValidationFullscreenBodyV1861'); }

  window.startMathSkillValidationV222 = async function(skillId){
    const belt=window.MATH_BELTS_V222.find(b=>b.skillId===skillId);
    if(!belt || !window.isMathUnlockedV222(belt)) return;
    const ov=ensureOverlay(); ov.classList.remove('hidden');
    const b=body();
    if(b) b.innerHTML='<div class="v190-belt-box"><h3>'+belt.emoji+' Ceinture '+esc(belt.colorName)+'</h3><div class="v190-rules">Préparation des 20 questions Maths...</div></div>';

    let questions=[];
    try{ questions=await questionsForMathBelt(belt); }catch(e){ console.warn('Banque Maths locale utilisée après erreur', e); questions=makeFallbackQuestions(belt); }
    if(!questions.length){ questions=makeFallbackQuestions(window.MATH_BELTS_V222[0]); }

    let index=0, score=0, answered=false;
    function renderQuestion(){
      const qu=questions[index]; answered=false;
      b.innerHTML='<div class="v190-belt-box">'+
        '<h3>'+belt.emoji+' Ceinture '+esc(belt.colorName)+' — '+esc(belt.label)+'</h3>'+ 
        '<div class="v190-rules">Question '+(index+1)+' / '+questions.length+' · Objectif : 15 bonnes réponses pour valider.</div>'+ 
        '<div class="skill-check-question">'+esc(qu.q)+'</div>'+ 
        '<div class="v222-math-options">'+qu.options.map((opt,i)=>'<button type="button" class="v222-math-option" data-index="'+i+'" onclick="answerMathSkillV222('+i+')">'+esc(opt)+'</button>').join('')+'</div>'+ 
        '<div id="mathSkillFeedbackV222" class="mental-feedback"></div>'+ 
      '</div>';
    }
    window.answerMathSkillV222 = function(choice){
      if(answered) return; answered=true;
      const qu=questions[index];
      const buttons=Array.from(document.querySelectorAll('#skillValidationFullscreenBodyV1861 .v222-math-option'));
      buttons.forEach((btn,i)=>{ btn.disabled=true; if(i===qu.correct) btn.classList.add('correct'); if(i===choice && i!==qu.correct) btn.classList.add('wrong'); });
      if(choice===qu.correct) score++;
      const fb=document.getElementById('mathSkillFeedbackV222');
      if(fb) fb.innerHTML=(choice===qu.correct ? '✅ Bravo !' : '🙂 Regarde la bonne réponse.')+'<br><button class="mental-next-btn" onclick="nextMathSkillQuestionV222()">'+(index+1>=questions.length?'Voir le résultat':'Question suivante')+'</button>';
    };
    window.nextMathSkillQuestionV222 = function(){ index++; if(index<questions.length) renderQuestion(); else renderResult(); };
    function medalFor(s){ if(s>=19) return '🥇 Or'; if(s>=17) return '🥈 Argent'; if(s>=15) return '🥉 Bronze'; return ''; }
    function renderResult(){
      const medal=medalFor(score);
      if(medal){
        const data=loadMathProgress(); data.belts=data.belts||[];
        data.belts.push({skillId:belt.skillId, ceinture:belt.ceinture, label:belt.label, score:score, medal:medal, date:new Date().toISOString()});
        saveMathProgress(data);
        try{ if(typeof window.hibouRecordSuccess==='function') window.hibouRecordSuccess('🏅 Ceinture '+belt.colorName+' validée : '+belt.label+' ('+score+'/20)','ceinture',{matiere:'Maths',belt:belt,score:score,total:20}); }catch(e){}
      }
      b.innerHTML='<div class="v190-belt-box">'+
        '<h3>'+(medal?'🎉 Bravo !':'🙂 Encore un peu d’entraînement')+'</h3>'+ 
        '<div class="v190-score">'+score+' / '+questions.length+'</div>'+ 
        '<div class="v190-medal">'+(medal || '💪')+'</div>'+ 
        '<div class="v190-rules">'+(medal ? belt.emoji+' Ceinture '+esc(belt.colorName)+' validée !' : 'Il faut au moins 15 bonnes réponses pour valider cette ceinture.')+'</div>'+ 
        '<button class="belt-btn secondary" onclick="openCompetenceValidation()">Retour aux ceintures</button>'+ 
      '</div>';
      if(typeof window.refreshV196MedalHeader==='function') setTimeout(window.refreshV196MedalHeader,100);
      if(typeof window.refreshV168BeltCounters==='function') setTimeout(window.refreshV168BeltCounters,120);
      if(typeof window.renderHibouProfile==='function') setTimeout(window.renderHibouProfile,150);
    }
    renderQuestion();
  };

  setTimeout(function(){ loadMathRows(false).catch(function(e){ console.warn('Préchargement Maths impossible : banque locale prête', e); }); }, 800);
})();
