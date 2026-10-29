/* Maître Hibou — Catalogue Français/Vocabulaire unifié + entrée Anglais.
   Extension non destructive de Mes leçons : les chemins Lexique et NAV-01 restent valides. */
(function () {
  'use strict';
  if (window.__hibouLeconsVocabAnglais) return;
  window.__hibouLeconsVocabAnglais = true;
  const FR_PATH = /\/bibliotheque_lecons\/index\.html$/;
  const LEX_URL = 'bibliotheque_lexique/index.html';
  const EN_URL = 'bibliotheque_anglais/index.html';
  let lexCards = null;

  async function readLexique() {
    if (lexCards) return lexCards;
    const response = await fetch(LEX_URL, {cache:'no-cache'});
    if (!response.ok) throw new Error('Catalogue Lexique : HTTP '+response.status);
    const html = new DOMParser().parseFromString(await response.text(), 'text/html');
    const base = new URL(LEX_URL, document.baseURI);
    lexCards = Array.from(html.querySelectorAll('a.card[data-period]')).map((a) => {
      const img = a.querySelector('img');
      const h = a.querySelector('strong');
      const period = (a.getAttribute('data-period')||'').toUpperCase();
      return {
        name: h ? h.textContent.trim() : '',
        period,
        href: new URL(a.getAttribute('href'),base).href,
        img: img ? new URL(img.getAttribute('src'),base).href : null
      };
    }).filter(item => item.name && item.href && /^P[1-5]$/.test(item.period));
    return lexCards;
  }

  function styleCatalogue(doc) {
    if (doc.getElementById('hibouUnifiedLexiqueStyle')) return;
    const s=doc.createElement('style');
    s.id='hibouUnifiedLexiqueStyle';
    s.textContent=`
      .lesson-card.hibou-lexique-added { position:relative; overflow:hidden; cursor:pointer; }
      .lesson-card.hibou-lexique-added .hibou-lexique-thumbnail { display:block;width:100%;height:165px;object-fit:contain;object-position:center;background:#f5f8ff;border-radius:12px;margin:0 0 10px; }
      .lesson-card.hibou-lexique-added h2 { font-size:clamp(15px,1.5vw,18px);margin:6px 0; }
      .lesson-card.hibou-lexique-added .hibou-lexique-period {display:inline-block;margin:0 0 8px;padding:4px 9px;border-radius:999px;background:#e6f1ff;color:#144779;font:800 12px system-ui;}
      .lesson-card.hibou-lexique-added .open-link{display:none!important}
      .lesson-card.hibou-lexique-added.hibou-lexique-hidden{display:none!important}
      @media(max-width:680px){.lesson-card.hibou-lexique-added .hibou-lexique-thumbnail{height:120px}}
    `;
    doc.head.appendChild(s);
  }

  function updateLexiqueVisibility(doc) {
    if (!FR_PATH.test(doc.location.pathname)) return;
    const selected=doc.querySelector('.searchbar .filter.active');
    const domain=selected ? selected.getAttribute('data-filter') : 'all';
    const period=doc.querySelector('#hibouPeriodBar .hibou-period-btn.active');
    const periodLabel=period ? period.textContent.trim() : 'Toutes';
    const search=doc.getElementById('search');
    const query=(search?search.value:'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
    const cards=Array.from(doc.querySelectorAll('.hibou-lexique-added'));
    let count=0;
    cards.forEach(card=>{
      const searchable=(card.getAttribute('data-search')||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
      const visible=(domain==='all'||domain==='Vocabulaire') && (periodLabel==='Toutes'||periodLabel===card.dataset.hibouPeriod) && (!query||searchable.includes(query));
      card.classList.toggle('hibou-lexique-hidden', !visible);
      if(visible) count++;
    });
    const empty=doc.getElementById('empty');
    if(empty && count>0) empty.style.display='none';
  }

  async function augmentFrench(frame) {
    let doc;
    try {doc=frame.contentDocument;if(!doc||!FR_PATH.test(doc.location.pathname)||!doc.querySelector('.lesson-grid'))return;} catch(e){return;}
    if (doc.documentElement.dataset.hibouLexiqueUnified==='yes')return;
    doc.documentElement.dataset.hibouLexiqueUnified='yes';
    let data;
    try {data=await readLexique();} catch(err){console.warn('Mes leçons : le Lexique n’a pas pu être importé.',err);doc.documentElement.dataset.hibouLexiqueUnified='';return;}
    try {if(frame.contentDocument!==doc)return;}catch(e){return;}
    styleCatalogue(doc);
    const grid=doc.querySelector('.lesson-grid');
    data.forEach(item=>{
      const a=doc.createElement('article');
      a.className='lesson-card hibou-lexique-added';
      a.tabIndex=0;
      a.setAttribute('role','link');
      a.setAttribute('aria-label','Ouvrir la leçon '+item.name+', '+item.period);
      a.dataset.domain='Vocabulaire';
      a.dataset.hibouPeriod=item.period;
      a.dataset.search=item.name+' vocabulaire lexique '+item.period;
      const tag=doc.createElement('span');tag.className='badge vocabulary';tag.textContent='Vocabulaire';a.appendChild(tag);
      const period=doc.createElement('span');period.className='hibou-lexique-period';period.textContent=item.period;a.appendChild(period);
      if(item.img){const img=doc.createElement('img');img.className='hibou-lexique-thumbnail';img.src=item.img;img.alt='';img.loading='lazy';a.appendChild(img);}
      const h=doc.createElement('h2');h.textContent=item.name;a.appendChild(h);
      const p=doc.createElement('p');p.textContent='Lexique · '+item.period+' · 10 exercices interactifs';a.appendChild(p);
      const open=()=>{frame.src=item.href;};
      a.addEventListener('click',open);
      a.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
      grid.appendChild(a);
    });
    const schedule=()=>setTimeout(()=>updateLexiqueVisibility(doc),0);
    doc.addEventListener('click',function(e){if(e.target.closest('.filter,#hibouPeriodBar button'))schedule();},true);
    const search=doc.getElementById('search');if(search)search.addEventListener('input',schedule);
    // Le filtre P1-P5 est installé par le module principal avant cette extension.
    updateLexiqueVisibility(doc);
  }

  function configureEnglishTab() {
    const tab=document.getElementById('hibouLessonsLexique');
    if(!tab||tab.dataset.hibouEnglishReady)return;
    tab.dataset.hibouEnglishReady='yes';
    tab.id='hibouLessonsEnglish';
    tab.textContent='🇬🇧 Anglais';
    tab.setAttribute('aria-label',"Leçons d'anglais");
    tab.addEventListener('click',function(e){
      e.preventDefault();e.stopImmediatePropagation();
      const overlay=document.getElementById('hibouLessonsOverlay');
      if(!overlay)return;
      overlay.querySelectorAll('.hibou-lessons-tab').forEach(b=>b.classList.toggle('active',b===tab));
      const nav=document.getElementById('hibouLessonNav');if(nav)nav.hidden=true;
      const other=document.getElementById('hibouSubjectCatalog');if(other)other.hidden=true;
      const mini=document.getElementById('hibouLessonsMiniPanel');if(mini)mini.hidden=true;
      const frame=document.getElementById('hibouLessonsFrame');
      if(frame){frame.style.display='block';frame.title="Mes leçons d'anglais";if(!frame.src.endsWith('/'+EN_URL))frame.src=EN_URL;}
    },true);
  }

  function attachFrame() {
    const frame=document.getElementById('hibouLessonsFrame');
    if(!frame||frame.dataset.hibouUnifiedAttached)return;
    frame.dataset.hibouUnifiedAttached='yes';
    frame.addEventListener('load',function(){
      // Les éventuels traitements du module principal ont lieu sur le même événement.
      setTimeout(()=>augmentFrench(frame),40);
    });
    augmentFrench(frame);
  }
  function install(){configureEnglishTab();attachFrame();}
  document.addEventListener('DOMContentLoaded',install);
  if(document.readyState!=='loading')install();
  const observer=new MutationObserver(()=>{
    if(document.getElementById('hibouLessonsOverlay'))install();
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();
