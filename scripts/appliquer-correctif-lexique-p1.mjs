import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const target=path.join(root,'bibliotheque_lexique','lecons');
const marker='lexique-p1-ergonomie.css';
let done=0;
for(let n=1;n<=5;n++){
  const file=path.join(target,`lexique-p1-0${n}.html`);
  if(!fs.existsSync(file)) throw new Error(`Fichier introuvable : ${file}. Lance le script à la racine du dépôt Maître-Hibou.`);
  let html=fs.readFileSync(file,'utf8');
  if(!html.includes('class="stage"') || !html.includes('class="illustration"') || !html.includes('id="question"')) throw new Error(`Structure inattendue, aucune modification : ${file}`);
  if(html.includes(marker)){console.log(`Déjà corrigé : ${file}`);continue}
  const insertion='<link rel="stylesheet" href="../css/lexique-p1-ergonomie.css">';
  if(!html.includes('</head>')) throw new Error(`Balise head introuvable : ${file}`);
  html=html.replace('</head>',insertion+'</head>');
  fs.writeFileSync(file,html,'utf8');done++;
  console.log(`Corrigé : ${file}`);
}
console.log(`Terminé : ${done} page(s) modifiée(s), exercices conservés.`);
