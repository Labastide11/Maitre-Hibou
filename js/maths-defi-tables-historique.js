function makeMultiplicationOptions(answer) {
  const candidates = [
    answer,
    answer + 2,
    answer - 2,
    answer + 5,
    answer - 5,
    answer + 10,
    answer - 10
  ].filter(n => n > 0 && n !== answer);
  const uniqueWrong = [...new Set(candidates)].slice(0, 3);
  while (uniqueWrong.length < 3) {
    const extra = answer + (uniqueWrong.length + 1) * 3;
    if (!uniqueWrong.includes(extra)) uniqueWrong.push(extra);
  }
  const optionsNumbers = shuffleHibouArray([answer, ...uniqueWrong.slice(0, 3)]);
  return { options: optionsNumbers.map(String), correct: optionsNumbers.indexOf(answer) };
}

function makeAllTablesChallengeQuestions() {
  const questions = [];
  for (let a = 2; a <= 10; a++) {
    for (let b = 2; b <= 10; b++) {
      const answer = a * b;
      const data = makeMultiplicationOptions(answer);
      questions.push({
        q: `${a} × ${b} = ?`,
        options: data.options,
        correct: data.correct,
        skill: 'tables 2 à 10',
        subject: 'maths'
      });
    }
  }
  return shuffleHibouArray(questions);
}

function makeTablesChallenge20Questions() {
  // Les tables 2 à 10 contiennent 81 combinaisons possibles.
  // Pour un vrai défi CE2 faisable sur tablette, on tire 20 calculs au hasard.
  return makeAllTablesChallengeQuestions().slice(0, 20);
}
