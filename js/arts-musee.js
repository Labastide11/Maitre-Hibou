/* Maître Hibou — musée CE2, module autonome.
   Ne modifie ni les ateliers dessin, musique/rythmes ni théâtre. */
(function(){
'use strict';
const W=window;
const OEUVRES=[
 ['La Joconde','Léonard de Vinci','Vers 1503–1519','Portrait','Observe le regard et l’expression du visage.','joconde.jpg','La Joconde Léonard de Vinci'],
 ['La Nuit étoilée','Vincent van Gogh','1889','Peinture','Observe les tourbillons et les couleurs du ciel.','nuit.jpg','La Nuit étoilée Van Gogh'],
 ['Les Nymphéas','Claude Monet','XXe siècle','Peinture','Cherche les reflets et les fleurs sur l’eau.','nympheas.jpg','Nymphéas Claude Monet'],
 ['La Grande Vague de Kanagawa','Katsushika Hokusai','Vers 1831','Estampe','Compare la taille de la vague, des barques et du mont Fuji.','vague.jpg','Grande Vague de Kanagawa Hokusai'],
 ['La Jeune Fille à la perle','Johannes Vermeer','Vers 1665','Portrait','Regarde la lumière sur le visage et la boucle d’oreille.','vermeer.jpg','Jeune Fille à la perle Vermeer'],
 ['Composition avec rouge, bleu et jaune','Piet Mondrian','1930','Art abstrait','Cherche les lignes droites et les couleurs primaires.',null,'Piet Mondrian Composition rouge bleu jaune'],
 ['Prismes électriques','Sonia Delaunay','1914','Peinture abstraite','Compare les cercles et les contrastes de couleurs.','sonia-delaunay-prismes-electriques.jpg','Sonia Delaunay Prismes électriques'],
 ['Un dimanche après-midi à la Grande Jatte','Georges Seurat','1884–1886','Pointillisme','Observe les petits points et les personnages.',null,'Georges Seurat Un dimanche après-midi à la Grande Jatte'],
 ['Le Rêve','Henri Rousseau','1910','Peinture','Repère les animaux cachés dans la végétation.',null,'Henri Rousseau Le Rêve 1910'],
 ['Peintures de Lascaux','Artistes de la Préhistoire','Préhistoire','Art pariétal','Reconnais les animaux peints sur les parois.',null,'Peintures Lascaux']
];
const MUSIQUES=[
 ['Le Printemps','Antonio Vivaldi','Écoute les violons et le caractère joyeux.','Le Printemps Vivaldi Les Quatre Saisons'],
 ['La Marche turque','Wolfgang Amadeus Mozart','Écoute le rythme et les notes du piano.','Marche turque Mozart'],
 ['La Lettre à Élise','Ludwig van Beethoven','Reconnais la mélodie jouée au piano.','Lettre à Élise Beethoven'],
 ['Le Cygne','Camille Saint-Saëns','Écoute la douceur du violoncelle.','Le Cygne Saint Saëns'],
 ['La Danse des petits cygnes','Piotr Ilitch Tchaïkovski','Reconnais le rythme régulier des cordes.','Danse des petits cygnes Tchaïkovski'],
 ['Dans l’antre du roi de la montagne','Edvard Grieg','Remarque la musique qui devient plus rapide et plus forte.','Dans l antre du roi de la montagne Grieg'],
 ['Le Vol du bourdon','Nikolaï Rimski-Korsakov','Repère la musique extrêmement rapide.','Le Vol du bourdon Rimski Korsakov'],
 ['La Mer','Claude Debussy','Écoute les changements de couleurs de l’orchestre.','La Mer Claude Debussy'],
 ['Rhapsody in Blue','George Gershwin','Écoute la clarinette au début.','Rhapsody in Blue Gershwin'],
 ['Take the A Train','Billy Strayhorn / Duke Ellington','Repère les cuivres et le rythme du jazz.','Take the A Train Duke Ellington']
];
/* Reproductions exactes, lorsque leur réutilisation est envisageable.
   La reproduction de Sonia Delaunay reste chez le Centre Pompidou (droits réservés). */
const MEDIA_SOURCES={
  5:{file:'Piet Mondriaan, 1930 - Mondrian Composition II in Red, Blue, and Yellow.jpg',page:'https://commons.wikimedia.org/wiki/File:Piet_Mondriaan,_1930_-_Mondrian_Composition_II_in_Red,_Blue,_and_Yellow.jpg'},
  7:{file:"Un dimanche après-midi à l'Île de la Grande Jatte.jpg",page:'https://commons.wikimedia.org/wiki/File:Un_dimanche_apr%C3%A8s-midi_%C3%A0_l%27%C3%8Ele_de_la_Grande_Jatte.jpg'},
  8:{file:'Henri Rousseau - Le Rêve - Google Art Project.jpg',page:'https://commons.wikimedia.org/wiki/File:Henri_Rousseau_-_Le_R%C3%AAve_-_Google_Art_Project.jpg'},
  9:{file:'Lascaux painting.jpg',page:'https://commons.wikimedia.org/wiki/File:Lascaux_painting.jpg'}
};
const VIKIDIA_ART=[
 'https://fr.vikidia.org/wiki/L%C3%A9onard_de_Vinci',
 'https://fr.vikidia.org/w/index.php?search=Vincent+van+Gogh',
 'https://fr.vikidia.org/wiki/Claude_Monet',
 'https://fr.vikidia.org/w/index.php?search=Hokusai',
 'https://fr.vikidia.org/w/index.php?search=Johannes+Vermeer',
 'https://fr.vikidia.org/wiki/Piet_Mondrian',
 'https://fr.vikidia.org/wiki/Sonia_Delaunay',
 'https://fr.vikidia.org/wiki/Georges_Seurat',
 'https://fr.vikidia.org/wiki/Henri_Rousseau%2C_dit_le_Douanier_Rousseau',
 'https://fr.vikidia.org/wiki/Grotte_de_Lascaux'
];
const vikidia=q=>'https://fr.vikidia.org/w/index.php?search='+encodeURIComponent(q);
const remoteArt=i=>MEDIA_SOURCES[i]&&MEDIA_SOURCES[i].file ?
 'https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(MEDIA_SOURCES[i].file)+'?width=720' : null;
const asset='images/arts-creativite/musee/';
const encyclo=q=>vikidia(q);
const commons=q=>'https://commons.wikimedia.org/wiki/Special:MediaSearch?type=audio&search='+encodeURIComponent(q);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const make=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;};
const link=(label,href,cls)=>{let a=make('a',cls,label);a.href=href;a.target='_blank';a.rel='noopener noreferrer';return a;};
W.MHMusee={mount:function(body){
 let view='menu',seenArt=new Set(),heard=new Set(),remaining=[],score=0,position=0,mode='';
 const render=()=>{
  body.replaceChildren();body.classList.add('mh-musee-root');
  if(view==='menu') return landing();
  const back=make('button','mh-musee-back','← Le musée');back.type='button';back.onclick=()=>{view='menu';render()};body.append(back);
  if(view==='arts')return galerie();
  if(view==='audio')return discotheque();
  if(view==='formes')return formes();
  if(view==='defi')return defi();
 };
 function landing(){
  const head=make('div','mh-musee-hero');
  const owl=make('img','mh-musee-owl');owl.src=asset+'hibou.png';owl.alt='Maître Hibou, guide du musée';
  const copy=make('div','mh-musee-hero-text');copy.append(make('h3','', 'Le musée de Maître Hibou'),make('p','', 'Je regarde, j’écoute, je découvre et je reconnais.'));
  head.append(owl,copy);body.append(head);
  const sections=[
   ['arts','blue','oeuvres.jpg','Je découvre 10 œuvres d’art','J’observe les détails des tableaux et des images.','Découvrir les œuvres'],
   ['audio','pink','musiques.jpg','J’écoute 10 musiques','J’écoute et je reconnais des musiques célèbres.','Écouter les musiques'],
   ['formes','green','formes.jpg','Je joue avec les formes','J’observe les couleurs et je cherche les formes.','Commencer le jeu'],
   ['defi','orange','defis.jpg','Mon défi du musée','Je retrouve les œuvres et les musiques étudiées.','Relever le défi']
  ];
  const grid=make('div','mh-musee-menu');
  sections.forEach(([id,color,photo,title,desc,action])=>{
   const b=make('button','mh-musee-tile '+color);b.type='button';
   const img=make('img','mh-musee-tile-img');img.src=asset+photo;img.alt='';img.loading='lazy';
   const t=make('div','mh-musee-tile-text');t.append(make('h4','',title),make('p','',desc),make('span','mh-musee-cta',action+' ›'));
   b.append(img,t);b.onclick=()=>{view=id;render()};grid.append(b);
  });
  body.append(grid);
  const note=make('p','mh-musee-note','Vikidia explique les artistes avec des mots adaptés aux jeunes. Les sources des œuvres s’ouvrent dans un nouvel onglet. Les reproductions distantes demandent Internet.');body.append(note);
 }
 function sectionTitle(name,caption){const head=make('div','mh-musee-section-title');head.append(make('h3','',name),make('p','',caption));body.append(head)}
 function galerie(){
  sectionTitle('Les 10 œuvres à découvrir','Regarde chaque œuvre, puis ouvre sa fiche pour apprendre à l’observer.');
  const grid=make('div','mh-musee-gallery');
  OEUVRES.forEach((a,i)=>{
   const card=make('article','mh-musee-art-card');
   const imgbox=make('div','mh-musee-art-picture');
   const photo=a[5]?asset+a[5]:remoteArt(i);
   if(photo){const img=make('img');img.src=photo;img.alt='Reproduction de '+a[0];img.loading='lazy';img.referrerPolicy='no-referrer';
     img.onerror=()=>{img.remove();if(MEDIA_SOURCES[i])imgbox.append(link('Voir la reproduction ↗',MEDIA_SOURCES[i].page,'mh-musee-picture-link'))};imgbox.append(img)}
   else if(MEDIA_SOURCES[i]){imgbox.classList.add('mh-musee-no-reproduction');imgbox.append(link('Voir l’œuvre au musée ↗',MEDIA_SOURCES[i].page,'mh-musee-picture-link'))}
   else {imgbox.classList.add('mh-musee-no-reproduction');imgbox.append(make('span','','Reproduction disponible sur le site du musée'))}
   const info=make('div','mh-musee-art-info');info.append(make('small','',String(i+1)+' / 10 · '+a[3]),make('h4','',a[0]),make('p','',a[1]));
   const btn=make('button','mh-musee-smallbtn','Observer ›');btn.type='button';btn.onclick=()=>detailArt(i);info.append(btn);card.append(imgbox,info);grid.append(card);
  });body.append(grid);
 }
 function detailArt(i){
  body.replaceChildren();
  const back=make('button','mh-musee-back','← Les 10 œuvres');back.onclick=()=>{view='arts';render()};body.append(back);
  const a=OEUVRES[i],wrap=make('section','mh-musee-detail');
  const imgarea=make('div','mh-musee-detail-image');
  const imageSource=a[5]?asset+a[5]:remoteArt(i);
  if(imageSource){let im=make('img');im.src=imageSource;im.alt='Reproduction de '+a[0];im.referrerPolicy='no-referrer';im.onerror=()=>{im.remove();if(MEDIA_SOURCES[i])imgarea.append(link('Voir la reproduction ↗',MEDIA_SOURCES[i].page,'mh-musee-picture-link'))};imgarea.append(im)}
  else if(MEDIA_SOURCES[i])imgarea.append(link('Voir l’œuvre au musée ↗',MEDIA_SOURCES[i].page,'mh-musee-picture-link'));
  const content=make('div','mh-musee-detail-info');content.append(make('small','',`${i+1} / 10 · ${a[3]}`),make('h3','',a[0]),make('p','',`Artiste : ${a[1]}`),make('p','',`Époque : ${a[2]}`));
  content.append(make('h4','', 'Je regarde les détails'),make('p','',a[4]));
  const warning=make('p','mh-musee-tip',MEDIA_SOURCES[i]&&MEDIA_SOURCES[i].page?'Source : musée ou Wikimedia Commons. Certaines images nécessitent une connexion Internet.':'Pour en savoir plus sur cette œuvre, consulte les ressources proposées.');content.append(warning);
  const source=MEDIA_SOURCES[i]&&MEDIA_SOURCES[i].page;
  if(source)content.append(link('Source de l’œuvre ↗',source,'mh-musee-source'));
  content.append(link('En savoir plus sur Vikidia ↗',VIKIDIA_ART[i],'mh-musee-vikidia'));
  content.append(link('Rechercher cette œuvre sur Vikidia ↗',encyclo(a[6]),'mh-musee-encyclo'));
  const mark=make('button','mh-musee-mark',seenArt.has(i)?'✓ Œuvre déjà découverte':'✓ J’ai observé cette œuvre');mark.onclick=()=>{seenArt.add(i);mark.textContent='✓ Œuvre déjà découverte'};content.append(mark);
  wrap.append(imgarea,content);body.append(wrap);
 }
 function discotheque(){
  sectionTitle('Les 10 musiques à reconnaître','Écoute un extrait sur la ressource proposée, puis reviens dans Maître Hibou.');
  const grid=make('div','mh-musee-gallery music');
  MUSIQUES.forEach((m,i)=>{
   const c=make('article','mh-musee-music-card');const icon=make('span','mh-musee-music-icon', ['🎻','🎹','🎹','🎻','🩰','🎼','🐝','🌊','🎷','🎺'][i]);
   const details=make('div');details.append(make('small','',`${i+1} / 10`),make('h4','',m[0]),make('p','',m[1]),make('p','mh-musee-listen-tip',m[2]));
   const controls=make('div','mh-musee-music-actions');controls.append(link('Chercher un extrait audio ↗',commons(m[3]),'mh-musee-smallbtn'));
   controls.append(link('Découvrir le compositeur sur Vikidia ↗',vikidia(m[1].split(' / ')[0]),'mh-musee-vikidia'));
   const mark=make('button','mh-musee-mark',heard.has(i)?'✓ Déjà écoutée':'✓ J’ai écouté');mark.onclick=()=>{heard.add(i);mark.textContent='✓ Déjà écoutée'};controls.append(mark);
   c.append(icon,details,controls);grid.append(c);
  });body.append(grid);
  const note=make('p','mh-musee-note','Les liens ouvrent une recherche d’enregistrements sur Wikimedia Commons. Sélectionne un fichier écoutable : les résultats et les licences peuvent varier. Aucun enregistrement n’est hébergé dans Maître Hibou.');body.append(note);
 }
 function formes(){
  sectionTitle('Je joue avec les formes','Observe les formes, puis choisis la bonne réponse.');
  const quiz=[
   ['Quelle forme se trouve au milieu ?',['Un carré','Un triangle','Un cercle'],0],
   ['Combien de formes colorées vois-tu ?',['Deux','Trois','Quatre'],1],
   ['De quelle couleur est le cercle ?',['Rouge','Bleu','Vert'],0],
   ['Quelle forme est inclinée ?',['Le carré','Le cercle','La forme bleue'],0]
  ];let turn=0;
  const wrap=make('div','mh-musee-formes');const visual=make('div','mh-musee-geometry');
  visual.setAttribute('aria-label','Un cercle rouge, un carré jaune incliné et une forme bleue');
  for(let i=0;i<3;i++)visual.append(make('div','mh-musee-shape s'+i));
  const right=make('div','mh-musee-form-question');const question=make('h4'),answer=make('div','mh-musee-form-options'),feedback=make('p','mh-musee-result');right.append(question,answer,feedback);wrap.append(visual,right);body.append(wrap);
  function ask(){const q=quiz[turn];question.textContent=q[0];answer.replaceChildren();feedback.textContent='';q[1].forEach((v,i)=>{const b=make('button','mh-musee-answer',v);b.onclick=()=>{if(i===q[2]){feedback.textContent='Bravo ! Tu as bien observé.';turn=(turn+1)%quiz.length;setTimeout(()=>{if(body.contains(question))ask()},750)}else feedback.textContent='Observe encore les formes.'};answer.append(b)})}ask();
 }
 function defi(){
  sectionTitle('Mon défi du musée','Retrouve les artistes et les compositeurs après avoir découvert les œuvres.');
  const start=make('div','mh-musee-challenge');const status=make('p','mh-musee-progress'),quest=make('h4'),opts=make('div','mh-musee-quiz-options'),result=make('p','mh-musee-result');
  const artQ=OEUVRES.slice(0,5).map(a=>({q:'Qui a créé « '+a[0]+' » ?',answer:a[1],options:OEUVRES.slice(0,5).map(b=>b[1])}));
  const musQ=MUSIQUES.slice(0,5).map(m=>({q:'Qui a composé « '+m[0]+' » ?',answer:m[1],options:MUSIQUES.slice(0,5).map(b=>b[1])}));
  let questions=artQ.concat(musQ);position=0;score=0;
  function shuffled(arr){return arr.slice().sort(()=>Math.random()-.5)}
  function newGame(){questions=shuffled(artQ.concat(musQ));position=0;score=0;ask()}
  function ask(){opts.replaceChildren();result.textContent='';if(position===questions.length){status.textContent='Défi terminé !';quest.textContent='Tu as trouvé '+score+' bonnes réponses sur '+questions.length+'.';const again=make('button','mh-musee-smallbtn','Recommencer');again.onclick=newGame;opts.append(again);return}
   const q=questions[position];status.textContent='Question '+(position+1)+' / '+questions.length;quest.textContent=q.q;
   const variants=shuffled([q.answer,...shuffled(q.options.filter(x=>x!==q.answer)).slice(0,2)]);
   variants.forEach(v=>{const b=make('button','mh-musee-answer',v);b.onclick=()=>{const correct=v===q.answer;if(correct)score++;Array.from(opts.children).forEach(n=>n.disabled=true);b.classList.add(correct?'correct':'incorrect');result.textContent=correct?'Bravo, bonne réponse !':'La bonne réponse est : '+q.answer;const next=make('button','mh-musee-smallbtn','Question suivante →');next.onclick=()=>{position++;ask()};result.append(document.createTextNode(' '));result.append(next)};opts.append(b)})}
  start.append(status,quest,opts,result);body.append(start);ask();
  body.append(make('p','mh-musee-note','Ce défi vérifie les noms des artistes et compositeurs. La reconnaissance des musiques à l’oreille se travaille avec les extraits écoutés dans la rubrique musicale.'));
 }
 render();return ()=>body.classList.remove('mh-musee-root');
}};
})();
