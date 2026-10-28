/* Maître Hibou — NAV-01 : liaison Vocabulaire ↔ leçons, sans perte du quiz. */
(function(){
 'use strict';
 if(window.__hibouVocabNav01) return; window.__hibouVocabNav01=true;
 const lessons={
  famille:{title:'Reconnaître des mots de la même famille',path:'bibliotheque_lexique/lecons/lexique-p2-01.html'},
  synonyme:{title:'Trouver un synonyme',path:'bibliotheque_lexique/lecons/lexique-p2-04.html'},
  contraire:{title:'Trouver un contraire',path:'bibliotheque_lexique/lecons/lexique-p2-05.html'},
  generique:{title:'Catégoriser des mots',path:'bibliotheque_lexique/lecons/lexique-p5-03.html'}
 };
 let current=null, pane=null;
 function detectType(){
  const chip=document.querySelector('#frenchTrainingOverlayV2348 .vocab-v25729-topbar-title');
  const name=chip?chip.textContent:'';
  if(name.includes('Familles de mots')) return 'famille';
  if(name.includes('Synonymes')) return 'synonyme';
  if(name.includes('Contraires')) return 'contraire';
  if(name.includes('Mots génériques')) return 'generique';
  return null;
 }
 function close(){if(pane) pane.hidden=true;const btn=document.querySelector('#hibou-vocab-lesson-link');if(btn) btn.focus();}
 function createPane(){
  const popup=document.querySelector('#frenchTrainingOverlayV2348 .fr-v2348-popup');
  if(!popup) return null;
  pane=popup.querySelector('#hibou-vocab-nav01-panel');
  if(pane) return pane;
  pane=document.createElement('section');pane.id='hibou-vocab-nav01-panel';pane.hidden=true;
  pane.setAttribute('aria-label','Leçon de vocabulaire');
  pane.innerHTML='<div class="hibou-nav01-head"><strong id="hibou-nav01-title">Ma leçon</strong><button type="button" class="hibou-nav01-return">← Retour à mon exercice</button></div><iframe title="Leçon de vocabulaire" loading="eager"></iframe>';
  pane.querySelector('.hibou-nav01-return').addEventListener('click',close);
  pane.querySelector('iframe').addEventListener('load',function(){
    try{
      const doc=this.contentDocument;if(!doc||!doc.body) return;
      if(doc.getElementById('hibou-nav01-train')) return;
      const btn=doc.createElement('button');btn.id='hibou-nav01-train';btn.type='button';btn.textContent='✏️ Je m’entraîne';
      btn.style.cssText='display:block;margin:20px auto;padding:13px 24px;border:0;border-radius:14px;background:#6740b8;color:white;font:bold 17px system-ui;cursor:pointer;min-height:48px';
      btn.addEventListener('click',close);doc.querySelector('main')?.appendChild(btn);
      // Preserve existing back links inside the embedded lesson: no navigation outside the exercise.
      doc.querySelectorAll('a.back').forEach(a=>{a.href='#';a.textContent='← Retour à mon exercice';a.addEventListener('click',function(e){e.preventDefault();close()});});
    }catch(e){console.warn('Leçon NAV-01 : contrôle intégré indisponible',e);}
  });
  popup.appendChild(pane);return pane;
 }
 function open(type){
  const lesson=lessons[type];if(!lesson)return;
  const view=createPane();if(!view)return;
  current=type;view.querySelector('#hibou-nav01-title').textContent=lesson.title;
  const iframe=view.querySelector('iframe');const url=new URL(lesson.path,document.baseURI).href;
  if(iframe.src!==url)iframe.src=url;
  view.hidden=false;view.querySelector('.hibou-nav01-return').focus();
 }
 function refresh(){
  const root=document.getElementById('frenchPopupInnerV2348');if(!root)return;
  const question=root.querySelector('.vocab-v25729-question');
  if(!question)return;
  const type=detectType();if(!type)return;
  const box=question.closest('.vocab-v25729-box');if(!box)return;
  if(box.querySelector('#hibou-vocab-lesson-link'))return;
  const row=document.createElement('div');row.className='hibou-nav01-link-row';
  const b=document.createElement('button');b.type='button';b.id='hibou-vocab-lesson-link';b.className='hibou-nav01-lesson-button';
  b.innerHTML='📖 Voir la leçon <span>· '+lessons[type].title+'</span>';
  b.addEventListener('click',()=>open(type));row.appendChild(b);
  const progress=box.querySelector('.vocab-v25729-exercise-progress');
  if(progress)progress.insertAdjacentElement('afterend',row);else box.prepend(row);
 }
 let pending=false;function schedule(){if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;refresh()})}
 const watcher=new MutationObserver(schedule);
 function init(){watcher.observe(document.body,{childList:true,subtree:true});schedule();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
 window.hibouVocabNav01Open=open;
})();
