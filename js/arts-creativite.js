(()=>{'use strict';const $=id=>document.getElementById(id),menu=$('menu'),activity=$('activity'),body=$('actBody');let cleanup=()=>{};const activities={dessin,musique,theatre,musee};const titles={dessin:'Mon atelier d’artiste',musique:'Mon atelier musical',theatre:'À toi de jouer !',musee:'Le musée de Maître Hibou'};
function route(){const k=decodeURIComponent(location.hash.slice(1));cleanup();cleanup=()=>{};body.replaceChildren();activity.classList.toggle('theatre-mode',k==='theatre');const oldInstruction=activity.querySelector('.theatre-inline-instruction');if(oldInstruction)oldInstruction.remove();if(!Object.prototype.hasOwnProperty.call(activities,k)){menu.hidden=false;activity.hidden=true;return}menu.hidden=true;activity.hidden=false;$('actTitle').textContent=titles[k];activities[k]();window.scrollTo({top:0,behavior:'instant'});}
$('return').addEventListener('click',()=>{if(location.hash){location.hash='';}else{route();}});
window.addEventListener('hashchange',route);
route();
function dessin(){body.innerHTML='<p>Choisis une couleur, puis dessine avec ton doigt ou ta souris. Tu peux créer des formes, un paysage ou un personnage.</p><div class="workspace"><div class="panel"><strong>Ma palette</strong><div class="palette" id="colors"></div><button class="btn" id="wipe">Effacer mon dessin</button><p>Défi : dessine un paysage avec au moins trois couleurs.</p></div><div class="panel"><canvas class="draw" id="paint" aria-label="Zone de dessin libre"></canvas></div></div>';const canvas=$('paint'),ctx=canvas.getContext('2d');let color='#d94d78',drawing=false;const palette=['#d94d78','#edab36','#419ed8','#55ae6c','#8254c9','#303c5a','#ffffff'];palette.forEach((c,i)=>{const btn=document.createElement('button');btn.className='swatch';btn.style.background=c;btn.setAttribute('aria-label','Couleur '+(i+1));btn.setAttribute('aria-pressed',String(i===0));btn.onclick=()=>{color=c;body.querySelectorAll('.swatch').forEach(x=>x.setAttribute('aria-pressed',String(x===btn)))};$('colors').append(btn)});function resize(){let old=document.createElement('canvas');old.width=canvas.width;old.height=canvas.height;old.getContext('2d').drawImage(canvas,0,0);canvas.width=canvas.clientWidth*devicePixelRatio;canvas.height=canvas.clientHeight*devicePixelRatio;ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(old,0,0,old.width,old.height,0,0,canvas.width,canvas.height)}resize();const pt=e=>{const r=canvas.getBoundingClientRect();return [(e.clientX-r.left)*canvas.width/r.width,(e.clientY-r.top)*canvas.height/r.height]};canvas.onpointerdown=e=>{drawing=true;canvas.setPointerCapture(e.pointerId);const [x,y]=pt(e);ctx.beginPath();ctx.moveTo(x,y)};canvas.onpointermove=e=>{if(!drawing)return;const [x,y]=pt(e);ctx.strokeStyle=color;ctx.lineWidth=8*devicePixelRatio;ctx.lineCap='round';ctx.lineTo(x,y);ctx.stroke();ctx.beginPath();ctx.moveTo(x,y)};canvas.onpointerup=()=>drawing=false;canvas.onpointercancel=()=>drawing=false;$('wipe').onclick=()=>{ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height)};cleanup=()=>{canvas.onpointerdown=canvas.onpointermove=canvas.onpointerup=null}}
function musique(){let seq=[],target=[],audio;function beep(note){try{audio=audio||new (window.AudioContext||window.webkitAudioContext)();let o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.value=[262,330,392][note];g.gain.setValueAtTime(.0001,audio.currentTime);g.gain.exponentialRampToValueAtTime(.18,audio.currentTime+.02);g.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+.24);o.connect(g).connect(audio.destination);o.start();o.stop(audio.currentTime+.25)}catch(e){}}body.innerHTML='<p>Écoute une courte suite de sons, puis reproduis-la avec les trois touches.</p><div class="panel"><div class="rhythm-controls"><button class="btn" id="listen">▶ Écouter le modèle</button><button class="btn" id="newTune">Nouvelle suite</button></div><div class="choices" id="notes"></div><p class="message" id="musicFeedback" aria-live="polite">Écoute d’abord la suite !</p></div>';['Grave','Médium','Aigu'].forEach((s,i)=>{let b=document.createElement('button');b.className='btn music-note-card';b.type='button';b.setAttribute('aria-label','Jouer un son '+s.toLowerCase());let img=document.createElement('img');img.src='images/arts-creativite/'+['grave','medium','aigu'][i]+'.jpg';img.alt=s;img.loading='eager';img.decoding='async';b.appendChild(img);b.onclick=()=>{beep(i);seq.push(i);if(seq.length===target.length){$('musicFeedback').textContent=seq.every((x,j)=>x===target[j])?'Bravo ! Tu as reconnu les sons.':'Essaie encore : écoute le modèle.';seq=[]}};$('notes').append(b)});let token=0;function next(){target=Array.from({length:3},()=>Math.floor(Math.random()*3));seq=[];$('musicFeedback').textContent='Écoute, puis reproduis les trois sons.'}function play(){const t=++token;target.forEach((v,i)=>setTimeout(()=>{if(token===t)beep(v)},i*520))}$('newTune').onclick=next;$('listen').onclick=play;next();cleanup=()=>{token++;if(audio)audio.close().catch(()=>{})}}
function theatre(){
  const roles=['une exploratrice','un gardien de musée','un marchand','une voyageuse','un inventeur','une bibliothécaire'];
  // Les six émotions illustrées, validées pour le théâtre CE2.
  const emotions=['joyeux','triste','inquiet','en colère','fier','impatient'];
  const scenes=['Tu découvres une clé mystérieuse.','Une peinture vient de disparaître.','Tu entends un bruit derrière la porte.','Un ami arrive avec une bonne nouvelle.','Tu dois annoncer une découverte incroyable.'];
  const illustrations={
    'une exploratrice':{file:'voyageuse-musee.jpg',alt:'Une jeune exploratrice observe un tableau disparu dans un musée.'},
    'une voyageuse':{file:'voyageuse-carcassonne.jpg',alt:'Une jeune voyageuse examine une carte devant les remparts de Carcassonne.'},
    'un gardien de musée':{file:'gardien-dinosaure.jpg',alt:'Un jeune gardien de musée face à un dinosaure.'},
    'un marchand':{file:'marchand-ali-baba.jpg',alt:'Un marchand présente ses objets sur un marché coloré.'},
    'un inventeur':{file:'inventeur-laboratoire.jpg',alt:'Un jeune inventeur observe son expérience au laboratoire.'},
    'une bibliothécaire':{file:'bibliothecaire-aventure.jpg',alt:'Des enfants découvrent une clé dans une bibliothèque d’aventure.'}
  };
  const emotionsIllustrations={
    'joyeux':{file:'joyeux.png',alt:'Un enfant sourit largement, les bras levés.',visage:'Je souris et j’ouvre grand les yeux.',voix:'Je parle avec entrain.',gestes:'Je bouge, je peux applaudir.'},
    'triste':{file:'triste.png',alt:'Un garçon baisse les yeux et pose le visage dans ses mains.',visage:'Je baisse les yeux et ma bouche.',voix:'Je parle doucement, avec une petite voix.',gestes:'Je baisse les épaules, je peux me recroqueviller.'},
    'inquiet':{file:'inquiet.png',alt:'Une fille regarde autour d’elle avec inquiétude.',visage:'Je fronce les sourcils et j’ouvre grand les yeux.',voix:'Je parle avec une voix hésitante.',gestes:'Je peux me crisper ou regarder autour de moi.'},
    'en colère':{file:'colere.png',alt:'Un garçon serre les poings et fronce les sourcils.',visage:'Je fronce les sourcils.',voix:'Je parle fermement, sans crier sur les autres.',gestes:'Je serre les poings et je peux taper du pied.'},
    'fier':{file:'fier.png',alt:'Une fille sourit, la tête haute et les mains sur les hanches.',visage:'Je souris et je garde la tête haute.',voix:'Je parle avec assurance.',gestes:'Je me tiens droit, les épaules en arrière.'},
    'impatient':{file:'impatient.png',alt:'Un garçon regarde sa montre avec impatience.',visage:'Je fronce les sourcils et je regarde l’heure.',voix:'Je parle vite, avec insistance.',gestes:'Je peux tapoter du pied ou des doigts.'}
  };
  const intro=document.createElement('p');intro.className='theatre-inline-instruction';intro.textContent='Tire une situation, puis joue-la avec ta voix, ton visage et tes gestes.';activity.querySelector('.act-head').appendChild(intro);
  body.innerHTML='<div class="panel theatre-panel">'+
      '<div class="theatre-gallery">'+
        '<figure class="theatre-picture theatre-picture--character"><div class="theatre-picture-title">Mon personnage</div><img id="theatre-role-image" alt="" loading="eager" decoding="async"><figcaption id="theatre-role-caption"></figcaption></figure>'+
        '<figure class="theatre-picture theatre-picture--emotion"><div class="theatre-picture-title">Mon émotion</div><img id="theatre-emotion-image" alt="" loading="eager" decoding="async"><figcaption id="theatre-emotion-caption"></figcaption></figure>'+
      '</div>'+
      '<div class="theatre-action-area"><p id="role" class="theatre-role-text"></p><p id="emotion" class="theatre-emotion-text"></p><p id="scene" class="theatre-situation-text"></p>'+
      '<button class="btn primary" id="randomScene" type="button">🎲 Nouvelle scène</button>'+
      '<p class="theatre-challenge">Défi : joue la même scène avec une autre émotion.</p></div></div>';
  function random(){
    const pick=a=>a[Math.floor(Math.random()*a.length)];
    const role=pick(roles), emotion=pick(emotions), scene=pick(scenes);
    $('role').textContent='Personnage : '+role;
    $('emotion').textContent='Émotion : '+emotion;
    $('scene').textContent='Situation : '+scene;
    const character=illustrations[role], feeling=emotionsIllustrations[emotion];
    const roleImg=$('theatre-role-image'),emotionImg=$('theatre-emotion-image');
    roleImg.src='images/arts-creativite/theatre/'+character.file;
    roleImg.alt=character.alt;
    emotionImg.src='images/arts-creativite/emotions/'+feeling.file;
    emotionImg.alt=feeling.alt;
    $('theatre-role-caption').textContent='Personnage : '+role;
    $('theatre-emotion-caption').textContent='Affiche émotion : '+emotion;
  }
  $('randomScene').onclick=random;
  random();
}
function musee(){if(window.MHMusee&&window.MHMusee.mount){cleanup=window.MHMusee.mount(body);return;}body.textContent='Le musée n’a pas pu être chargé.';}
})();
