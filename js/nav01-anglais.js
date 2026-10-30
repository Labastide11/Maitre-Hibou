/* Maître Hibou — NAV-01 Anglais : leçons superposées sans reconstruire les réponses. */
(function(){
  'use strict';
  if(window.__hibouNav01English) return;
  window.__hibouNav01English=true;
  const lessonNames={1:'Hello! Goodbye!',2:"What’s your name?",3:'How are you?',4:'Numbers 1–10',5:'How old are you?',6:'Numbers 11–20'};
  let viewer=null,previousFocus=null;
  function lessonId(){
    const root=document.getElementById('v24EnglishExercises');
    if(!root)return 0;
    const shell=root.closest('.v24-english-shell');
    const label=shell?.querySelector('.v24-english-objective')?.textContent||'';
    const m=label.match(/Séance\s*([1-9][0-9]?)/i);
    if(m)return Number(m[1]);
    const short=label.toLowerCase();
    if(short.includes('saluer'))return 1;
    if(short.includes('my name'))return 2;
    if(short.includes('how are you'))return 3;
    if(short.includes('numbers'))return 4;
    if(short.includes('how old'))return 5;
    if(short.includes('11–20')||short.includes('11-20')||short.includes('eleven')||short.includes('jusqu’à vingt'))return 6;
    return 0;
  }
  function ensureViewer(){
    if(viewer)return viewer;
    viewer=document.createElement('section');viewer.id='mh-nav01-english-viewer';viewer.hidden=true;
    viewer.setAttribute('role','dialog');viewer.setAttribute('aria-modal','true');viewer.setAttribute('aria-label','Leçon d’anglais');
    viewer.innerHTML='<div class="mh-en-lesson-panel"><header class="mh-en-lesson-header"><strong id="mh-en-lesson-title">Ma leçon</strong><button type="button" id="mh-en-lesson-return">← Retour à mon exercice</button></header><iframe id="mh-en-lesson-frame" title="Leçon d’anglais" loading="eager"></iframe></div>';
    document.body.append(viewer);
    viewer.querySelector('#mh-en-lesson-return').addEventListener('click',close);
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!viewer.hidden){e.preventDefault();close();}});
    return viewer;
  }
  function openLesson(id){
    if(!lessonNames[id])return;
    previousFocus=document.activeElement;
    const box=ensureViewer();
    box.querySelector('#mh-en-lesson-title').textContent=lessonNames[id];
    const frame=box.querySelector('iframe');
    const path='bibliotheque_anglais/index.html#lesson-'+id;
    if(frame.getAttribute('src')!==path)frame.setAttribute('src',path);
    box.hidden=false;
    box.querySelector('#mh-en-lesson-return').focus();
  }
  function close(){if(!viewer)return;viewer.hidden=true;previousFocus?.focus?.();}
  function insertButton(){
    const id=lessonId();
    const shell=document.getElementById('v24EnglishExercises')?.closest('.v24-english-shell');
    const toolbar=shell?.querySelector('.v24-english-toolbar');
    if(!toolbar)return;
    const old=toolbar.querySelector('.mh-en-lesson-link');
    if(!lessonNames[id]){if(old)old.remove();return;}
    if(old && old.dataset.lessonId===String(id))return;
    if(old)old.remove();
    const btn=document.createElement('button');btn.type='button';btn.className='mh-en-lesson-link';
    btn.dataset.lessonId=String(id);
    btn.textContent='📖 Voir la leçon';
    btn.setAttribute('aria-label','Voir la leçon '+lessonNames[id]);
    btn.addEventListener('click',()=>openLesson(id));toolbar.append(btn);
  }
  let queued=false;
  const watcher=new MutationObserver(()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;insertButton();});});
  function begin(){watcher.observe(document.body,{childList:true,subtree:true});insertButton();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',begin,{once:true});else begin();
})();