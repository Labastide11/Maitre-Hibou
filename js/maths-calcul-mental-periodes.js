// === V4.7 : Calcul mental CE2 automatique par période ===
let calculMentalState = null;

function getPeriodeCalculMentalCE2(date = new Date()) {
  const month = date.getMonth() + 1;
  // Année scolaire simplifiée :
  // septembre-octobre = période 1 ; novembre-décembre = période 2 ;
  // janvier-février = période 3 ; mars-avril = période 4 ; mai-août = période 5/révisions.
  if (month === 9 || month === 10) return 1;
  if (month === 11 || month === 12) return 2;
  if (month === 1 || month === 2) return 3;
  if (month === 3 || month === 4) return 4;
  return 5;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeNumberOptions(answer, spread = 10) {
  const wrongs = new Set();
  const candidates = [
    answer + 1, answer - 1, answer + 2, answer - 2,
    answer + 5, answer - 5, answer + 10, answer - 10,
    answer + spread, answer - spread
  ];
  candidates.forEach(n => { if (Number.isFinite(n) && n >= 0 && n !== answer) wrongs.add(n); });
  while (wrongs.size < 3) {
    const n = Math.max(0, answer + randomInt(-spread * 2, spread * 2));
    if (n !== answer) wrongs.add(n);
  }
  const nums = shuffleHibouArray([answer, ...Array.from(wrongs).slice(0, 3)]);
  return { options: nums.map(String), correct: nums.indexOf(answer) };
}

function cmQuestion(q, answer, skill, hint, spread = 10) {
  const opts = makeNumberOptions(answer, spread);
  return { q, answer, options: opts.options, correct: opts.correct, skill, hint };
}

function makeCalculMentalQuestionForPeriod(period) {
  let type;
  if (period === 1) type = shuffleHibouArray(["comp100","presqueDouble","dizaine","plus9","double100"])[0];
  else if (period === 2) type = shuffleHibouArray(["plus8","compDizaine2","moitie100","add100","plus9","comp100"])[0];
  else if (period === 3) type = shuffleHibouArray(["suite1000","tables2a5","comp1000","double1000","table6","table7"])[0];
  else if (period === 4) type = shuffleHibouArray(["x10","x100","x1000","table8","table9","soustraction2","moitie1000","comp1000"])[0];
  else type = shuffleHibouArray(["tablesAll","double10000","divisionReste","moinsDizCentMil","division10","division100","comp10000"])[0];

  if (type === "comp100") {
    const n = randomInt(10, 95);
    return cmQuestion(`${n} + ? = 100`, 100 - n, "Connaître les compléments à 100", "Compte jusqu'à 100 : d'abord jusqu'à la dizaine, puis jusqu'à 100.", 20);
  }
  if (type === "presqueDouble") {
    const n = randomInt(6, 19);
    return cmQuestion(`${n} + ${n + 1} = ?`, n + n + 1, "Utiliser la technique du presque double", `Pense : ${n} + ${n} puis encore +1.`, 10);
  }
  if (type === "dizaine") {
    const n = randomInt(20, 90);
    const d = [10,20,30][randomInt(0,2)];
    const add = Math.random() > 0.5;
    return cmQuestion(add ? `${n} + ${d} = ?` : `${n} - ${d} = ?`, add ? n + d : n - d, "Ajouter ou enlever des dizaines entières", "Regarde seulement le chiffre des dizaines.", 20);
  }
  if (type === "plus8" || type === "plus9") {
    const n = randomInt(18, 89);
    const add = type === "plus8" ? 8 : 9;
    return cmQuestion(`${n} + ${add} = ?`, n + add, `Ajouter ${add}`, `Ajoute 10 puis enlève ${10 - add}.`, 10);
  }
  if (type === "double100") {
    const n = randomInt(10, 100);
    return cmQuestion(`Le double de ${n}, c'est ?`, n * 2, "Retrouver les doubles jusqu'à 100 + 100", `Double = ${n} + ${n}.`, 30);
  }
  if (type === "compDizaine2") {
    const n = randomInt(21, 98);
    const target = Math.ceil(n / 10) * 10 + 10;
    return cmQuestion(`${n} + ? = ${target}`, target - n, "Trouver le complément à la dizaine supérieure en 2 étapes", "Va d'abord à la dizaine suivante, puis encore une dizaine.", 20);
  }
  if (type === "moitie100") {
    const n = randomInt(5, 49) * 2;
    return cmQuestion(`La moitié de ${n}, c'est ?`, n / 2, "Trouver la moitié des nombres inférieurs à 100", "La moitié, c'est partager en deux parts égales.", 20);
  }
  if (type === "add100") {
    const a = randomInt(20, 80), b = randomInt(10, 99 - a);
    return cmQuestion(`${a} + ${b} = ?`, a + b, "Additionner deux nombres inférieurs à 100", "Ajoute les dizaines puis les unités.", 20);
  }
  if (type === "suite1000") {
    const step = shuffleHibouArray([2,10,25,50,100])[0];
    const n = randomInt(1, Math.floor((1000-step)/step)) * step;
    return cmQuestion(`${n}, ${n + step}, ${n + 2*step}, ?`, n + 3*step, "Connaître la suite numérique jusqu'à 1000", `On avance de ${step} en ${step}.`, step * 3);
  }
  if (type === "tables2a5" || type === "table6" || type === "table7" || type === "table8" || type === "table9" || type === "tablesAll") {
    const fixed = type === "table6" ? 6 : type === "table7" ? 7 : type === "table8" ? 8 : type === "table9" ? 9 : null;
    const a = fixed || (type === "tables2a5" ? randomInt(2,5) : randomInt(2,10));
    const b = randomInt(2,10);
    const label = fixed ? `Apprendre la table ×${fixed}` : (type === "tables2a5" ? "Revoir les tables ×2, ×3, ×4, ×5" : "Revoir toutes les tables");
    return cmQuestion(`${a} × ${b} = ?`, a*b, label, `Pense à la table de ${a}.`, 20);
  }
  if (type === "comp1000") {
    const n = randomInt(100, 950);
    return cmQuestion(`${n} + ? = 1000`, 1000 - n, "Trouver le complément à 1000", "Compte jusqu'à 1000 en passant par la centaine suivante.", 100);
  }
  if (type === "double1000") {
    const n = randomInt(100, 500);
    return cmQuestion(`Le double de ${n}, c'est ?`, n * 2, "Retrouver les doubles jusqu'à 1000 + 1000", `Double = ${n} + ${n}.`, 100);
  }
  if (type === "x10" || type === "x100" || type === "x1000") {
    const mult = type === "x10" ? 10 : type === "x100" ? 100 : 1000;
    const n = randomInt(2, 50);
    return cmQuestion(`${n} × ${mult} = ?`, n * mult, `Multiplier par ${mult}`, `Multiplier par ${mult}, c'est déplacer les chiffres et ajouter des zéros.`, mult * 5);
  }
  if (type === "soustraction2") {
    const a = randomInt(40, 99), b = randomInt(10, Math.min(60, a-1));
    return cmQuestion(`${a} - ${b} = ?`, a - b, "Soustraire un nombre à 2 chiffres", "Enlève les dizaines puis les unités.", 20);
  }
  if (type === "moitie1000") {
    const n = randomInt(50, 499) * 2;
    return cmQuestion(`La moitié de ${n}, c'est ?`, n / 2, "Trouver la moitié des nombres inférieurs à 1000", "Partage le nombre en deux parts égales.", 100);
  }
  if (type === "double10000") {
    const n = randomInt(100, 4900);
    return cmQuestion(`Le double de ${n}, c'est ?`, n * 2, "Trouver les doubles inférieurs à 10 000", `Double = ${n} + ${n}.`, 500);
  }
  if (type === "divisionReste") {
    const d = randomInt(2,9), q = randomInt(2,12), r = randomInt(0,d-1);
    const n = d*q + r;
    return cmQuestion(`${n} ÷ ${d} : quel est le reste ?`, r, "Trouver le quotient et le reste d'une division euclidienne", `Cherche le multiple de ${d} le plus proche sans dépasser ${n}.`, 5);
  }
  if (type === "moinsDizCentMil") {
    const n = randomInt(2000, 9000);
    const sub = shuffleHibouArray([10,20,50,100,200,500,1000])[0];
    return cmQuestion(`${n} - ${sub} = ?`, n - sub, "Soustraire des dizaines, centaines ou milliers entiers", "Les unités ne changent pas : enlève surtout des dizaines, centaines ou milliers.", 500);
  }
  if (type === "division10" || type === "division100") {
    const div = type === "division10" ? 10 : 100;
    const q = randomInt(2,99);
    const n = q * div;
    return cmQuestion(`${n} ÷ ${div} = ?`, q, `Diviser par ${div}`, `Diviser par ${div}, c'est enlever un ou plusieurs zéros quand c'est possible.`, 50);
  }
  if (type === "comp10000") {
    const n = randomInt(1000, 9500);
    return cmQuestion(`${n} + ? = 10000`, 10000 - n, "Trouver le complément à un nombre inférieur à 10 000", "Compte jusqu'à 10 000 en passant par la centaine puis le millier.", 1000);
  }
  return cmQuestion("7 × 8 = ?", 56, "Révisions", "Pense à la table de 7.", 20);
}

function getCalculMentalPeriodTitle(period) {
  const titles = {
    1: "Période 1 : compléments à 100, presque doubles, +9, doubles",
    2: "Période 2 : +8, +9, moitiés de nombres pairs, compléments, additions < 100",
    3: "Période 3 : suites jusqu'à 1000, tables ×2 à ×7, compléments à 1000",
    4: "Période 4 : multiplier par 10/100/1000, tables ×8 et ×9, moitiés de nombres pairs",
    5: "Période 5 : révisions, toutes les tables, doubles, divisions et compléments"
  };
  return titles[period] || titles[5];
}

function startCalculMentalCE2() {
  const period = getPeriodeCalculMentalCE2();
  const questions = Array.from({length: 10}, () => makeCalculMentalQuestionForPeriod(period));
  calculMentalState = {
    period,
    questions,
    index: 0,
    correctFirstTry: 0,
    corrected: 0,
    attemptsCurrent: 0,
    totalAttempts: 0,
    active: true,
    startedAt: Date.now()
  };

  const container = document.getElementById('chatContainer');
  const div = document.createElement('div');
  div.className = 'message prof';
  div.innerHTML = `<div class="avatar prof">🦉</div><div class="bubble"><div class="mental-game-container" id="calculMentalBox"></div></div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  renderCalculMentalQuestion();
}

function renderCalculMentalQuestion() {
  const box = document.getElementById('calculMentalBox');
  if (!box || !calculMentalState) return;
  const s = calculMentalState;
  const q = s.questions[s.index];
  box.innerHTML = `
    <div class="mental-title-line">⚡ Calcul mental CE2</div>
    <div class="mental-skill-box">
      <div>📅 ${getCalculMentalPeriodTitle(s.period)}</div>
      <div>🎯 Compétence travaillée : ${escapeHTML(q.skill)}</div>
    </div>
    <div class="mental-progress">Question ${s.index + 1} / ${s.questions.length}</div>
    <div class="mental-question">${escapeHTML(q.q)}</div>
    <div class="mental-options">
      ${q.options.map((opt, i) => `<button class="mental-option" onclick="answerCalculMental(${i})">${escapeHTML(opt)}</button>`).join('')}
    </div>
    <div class="mental-feedback" id="mentalFeedback"></div>
  `;
}

function answerCalculMental(selectedIndex) {
  if (!calculMentalState) return;
  const s = calculMentalState;
  const q = s.questions[s.index];
  const box = document.getElementById('calculMentalBox');
  const feedback = document.getElementById('mentalFeedback');
  const buttons = box ? box.querySelectorAll('.mental-option') : [];
  s.attemptsCurrent++;
  s.totalAttempts++;

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    else if (i === selectedIndex) btn.classList.add('wrong');
  });

  if (selectedIndex === q.correct) {
    if (s.attemptsCurrent === 1) {
      s.correctFirstTry++;
      addScore(5, 'calcul mental');
      if (feedback) feedback.className = 'mental-feedback ok';
      if (feedback) feedback.innerHTML = '✅ Bravo ! Bonne réponse du premier coup. (+5 pts)';
    } else {
      s.corrected++;
      addScore(2, 'calcul mental corrigé');
      if (feedback) feedback.className = 'mental-feedback ok';
      if (feedback) feedback.innerHTML = '✅ Bien corrigé ! Tu as progressé. (+2 pts)';
    }
    setTimeout(nextCalculMentalQuestion, 900);
  } else {
    if (s.attemptsCurrent === 1) {
      if (feedback) feedback.className = 'mental-feedback warn';
      if (feedback) feedback.innerHTML = `❌ Ce n'est pas encore ça. On te repropose le même calcul.`;
      setTimeout(renderCalculMentalQuestion, 1200);
    } else if (s.attemptsCurrent === 2) {
      if (feedback) feedback.className = 'mental-feedback warn';
      if (feedback) feedback.innerHTML = `💡 Indice : ${escapeHTML(q.hint)}<br>Réessaie encore.`;
      setTimeout(renderCalculMentalQuestion, 1900);
    } else {
      if (feedback) feedback.className = 'mental-feedback bad';
      if (feedback) feedback.innerHTML = `🦉 Correction : la bonne réponse est <strong>${escapeHTML(q.options[q.correct])}</strong>.`;
      setTimeout(nextCalculMentalQuestion, 1700);
    }
  }
}

function nextCalculMentalQuestion() {
  if (!calculMentalState) return;
  calculMentalState.index++;
  calculMentalState.attemptsCurrent = 0;
  if (calculMentalState.index >= calculMentalState.questions.length) {
    showCalculMentalResult();
  } else {
    renderCalculMentalQuestion();
  }
}

function showCalculMentalResult() {
  const box = document.getElementById('calculMentalBox');
  if (!box || !calculMentalState) return;
  const s = calculMentalState;
  const total = s.questions.length;
  const scoreInitial = s.correctFirstTry;
  const corrected = s.corrected;
  const msg = scoreInitial >= 9 ? "Excellent calcul mental !" : scoreInitial >= 7 ? "Très bon travail !" : scoreInitial >= 5 ? "Continue, tu progresses !" : "On va continuer à s'entraîner.";
  logActivity('Calcul mental CE2', scoreInitial, `${getCalculMentalPeriodTitle(s.period)} · ${scoreInitial}/${total}`);
  box.innerHTML = `
    <div class="mental-title-line">🏆 Résultat du calcul mental</div>
    <div class="mental-skill-box">
      <div>🎯 Compétence travaillée : ${getCalculMentalPeriodTitle(s.period)}</div>
    </div>
    <div class="score-recap-box">
      <div class="score-recap-row"><span>✅ Bonnes réponses du premier coup :</span><span>${scoreInitial} / ${total}</span></div>
      <div class="score-recap-row"><span>🔄 Calculs corrigés après erreur :</span><span>${corrected}</span></div>
      <div class="score-recap-row"><span>🧠 Nombre total d'essais :</span><span>${s.totalAttempts}</span></div>
    </div>
    <div class="mental-feedback ok">${msg}</div>
    <button class="mental-next-btn" onclick="startCalculMentalCE2()">🔄 Refaire 10 calculs</button>
  `;
  try {
    if (typeof window.hibouFinalizeMentalRecordV25627 === 'function') {
      window.hibouFinalizeMentalRecordV25627({
        label: getCalculMentalPeriodTitle(s.period),
        score: scoreInitial,
        total: total,
        seconds: Math.max(1, (Date.now() - Number(s.startedAt || Date.now())) / 1000),
        date: new Date().toISOString()
      });
    }
  } catch (recordError) {
    console.warn('🦉 Record calcul mental non enregistré', recordError);
  }
  calculMentalState = null;
}
