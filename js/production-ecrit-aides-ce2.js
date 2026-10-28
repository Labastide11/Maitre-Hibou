
/* Aides progressives CE2 — complémentaires aux brouillons existants. */
(function () {
  'use strict';
  const rootId = 'frenchPopupInnerV2348';
  const people = {
    fille: ['La fille', 'elle'], garcon: ['Le garçon', 'il'],
    chevalier: ['Le chevalier', 'il'], princesse: ['La princesse', 'elle'],
    sorcier: ['Le sorcier', 'il'], dragon: ['Le dragon', 'il'],
    renard: ['Le renard', 'il'], chien: ['Le chien', 'il']
  };
  const places = {
    chateau:'près du château', foret:'dans la forêt', montagne:'près de la montagne',
    village:'dans le village', grotte:'devant la grotte', ile:'sur une île inconnue'
  };
  const events = {
    porte:'ouvre une porte mystérieuse', tresor:'découvre un coffre au trésor',
    rencontre:'rencontre un personnage inconnu', voyage:'part pour une aventure',
    mystere:'découvre un étrange secret', aventure:'commence une aventure'
  };
  const dras = {
    deplacer:['Le chien joue…','Le chien joue dans le jardin.','Vérifie que tu as conservé tous les mots.'],
    remplacer:['Le renard est…','Le renard est majestueux.','Trouve un autre adjectif qui convient au renard.'],
    ajouter:['La fille regarde la montagne…','La fille regarde la montagne enneigée.','Tu peux ajouter un autre détail sur la montagne.'],
    supprimer:['Une tortue…','Une tortue nage.','Relis : la phrase garde-t-elle le même sens ?']
  };
  const sequences = {
    'mh-graine': [
      ['D’abord, un enfant…','D’abord, un enfant plante une graine.','Qui plante la graine ?'],
      ['Ensuite, il…','Ensuite, il arrose la jeune plante.','Que fait-il avec son arrosoir ?'],
      ['Enfin, une…','Enfin, une grande fleur apparaît.','Que devient la plante ?']
    ],
    'mh-chien': [
      ['D’abord, un garçon…','D’abord, un garçon rencontre un chien perdu.','Où se trouvent-ils ?'],
      ['Ensuite, il…','Ensuite, il regarde le collier du chien.','Comment peut-il aider ce chien ?'],
      ['Puis, le garçon…','Puis, le garçon affiche une annonce.','Qui pourrait voir cette annonce ?'],
      ['Enfin, le chien…','Enfin, le chien retrouve sa famille.','Comment se termine cette histoire ?']
    ],
    'mh-paquet': [
      ['D’abord, une fille…','D’abord, une fille découvre un paquet.','Où se trouve le paquet ?'],
      ['Ensuite, elle…','Ensuite, elle découvre un chaton dans le carton.','Qu’y a-t-il à l’intérieur ?'],
      ['Puis, la fille…','Puis, la fille rassure le chaton.','Comment prend-elle soin de lui ?'],
      ['Enfin, elle…','Enfin, elle demande de l’aide à une adulte.','Que va devenir le chaton ?']
    ]
  };
  function aide(target, getPhrases, initial, mode) {
    if (!target || target.dataset.aideInit) return;
    target.dataset.aideInit = '1';
    const panel = document.createElement('section');
    panel.className = 'mh-help-ce2';
    panel.innerHTML = '<div class="mh-help-heading">💡 Une idée pour commencer</div>' +
      '<p class="mh-help-phrase" aria-live="polite"></p>' +
      '<button type="button" class="mh-help-next">Une phrase complète</button>' +
      '<p class="mh-help-note">Tu peux utiliser cette idée ou inventer la tienne. Rien ne s’écrit automatiquement.</p>';
    target.insertAdjacentElement('afterend',panel);
    let stage = 0;
    function update() {
      const examples = getPhrases();
      panel.querySelector('.mh-help-phrase').textContent = mode==='no-answer' ? (stage===0 ? examples[0] : examples[2]) : (mode==='starter' ? (stage===0 ? examples[1] : examples[2]) : (stage===0 ? examples[0] : examples[2]));
      panel.querySelector('.mh-help-next').textContent = stage===0 ? 'Comment continuer ?' : 'Masquer l’indice';
    }
    panel.querySelector('.mh-help-next').addEventListener('click', function () { stage=(stage+1)%2; update(); });
    panel.refreshCE2 = update;
    update();
  }
  function selected(root, key) {
    const b=root.querySelector('.mh-wr-choice.selected[data-group="'+key+'"]');
    return b ? b.dataset.id : null;
  }
  function storyPhrases(root) {
    const w=people[selected(root,'who')] || ['Un personnage','il'];
    const loc=places[selected(root,'where')] || 'dans un lieu mystérieux';
    const evt=events[selected(root,'what')] || 'découvre quelque chose d’étrange';
    const action = w[1] === 'elle' ? 'Elle' : 'Il';
    return [w[0]+'…', w[0]+' se promène '+loc+'.', 'Soudain, '+action.toLowerCase()+' '+evt+'…'];
  }
  function targetForTextarea(textarea) {
    let box=textarea.closest('.mh-graine-text, .mh-l3-writing, .mh-l3-part, .mh-defi-compose');
    return box || textarea.parentElement;
  }
  function setup(root) {
    const main=root.querySelector('main.mh-wr');
    if (!main) return;
    if (main.classList.contains('mh-dras')) {
      const area=root.querySelector('#mh-dras-answer');
      if (area) {
        const unit=area.closest('.mh-dras-panel');
        const id=['deplacer','remplacer','ajouter','supprimer'].find(x=>unit && unit.classList.contains('dras-'+x)) || 'deplacer';
        aide(area,()=>dras[id],0,'no-answer');
      }
      return;
    }
    if (root.querySelector('#mh-wr-text')) return; // Assistance intégrée au module principal.
    if (main.classList.contains('mh-defis') && root.querySelector('#mh-defi-writing')) {
      const title=(root.querySelector('h2')||{}).textContent || '';
      const vals=title.includes('fin')?['Finalement, les enfants…','Finalement, les enfants retrouvent le chemin de leur maison.','Mais avant de partir, ils…']:
        title.includes('décris')?['Ce dragon est…','Ce dragon est petit et très curieux.','Il aime…']:
        title.includes('dialogue')?['— Regarde…','— Regarde cette porte ! dit la fille.','— Et si nous…']:
        ['Un jour, un coffre…','Un jour, un coffre apparaît dans la forêt.','Mais soudain…'];
      aide(root.querySelector('#mh-defi-writing'),()=>vals,0,'starter');
      return;
    }
    const seq=['mh-paquet','mh-chien','mh-graine'].find(k=>main.classList.contains(k));
    if(seq) {
      root.querySelectorAll('textarea[data-graine-text],textarea[data-chien-text],textarea[data-paquet-text]').forEach((area,i)=>{
        aide(area.closest('label') || area,()=>sequences[seq][Math.min(i,sequences[seq].length-1)],0,i===0?'starter':'continuation');
      });
      return;
    }
    // Histoires ★★ et ★★★ : amorces à chaque partie, sans modifier le brouillon.
    if (main.classList.contains('mh-wr-level2') || main.classList.contains('mh-wr-level3')) {
      const lev3=main.classList.contains('mh-wr-level3');
      const phrases=lev3?[
        ['Un matin…','Un matin, deux enfants arrivent sur une île inconnue.','Ils aperçoivent…'],
        ['Mais soudain…','Mais soudain, une tempête se lève.','Pour se protéger, ils…'],
        ['Finalement…','Finalement, les enfants trouvent un abri.','Ils décident ensuite de…']
      ]:[
        ['Un jour…','Un jour, un enfant découvre un coffre dans une forêt.','Il se demande…'],
        ['Soudain…','Soudain, une lumière sort du coffre.','L’enfant décide de…'],
        ['Enfin…','Enfin, l’enfant referme le coffre.','Il raconte sa découverte à…']
      ];
      root.querySelectorAll('textarea').forEach((area,i)=>aide(area,()=>phrases[Math.min(i,2)],0,i===0?'starter':'continuation'));
    }
  }
  // Après chaque nouveau rendu, ajoute les aides aux zones encore non équipées.
  // Les ajouts déclenchent l'observateur une seule fois : chaque cible est marquée.
  const observer=new MutationObserver(()=>{
    const root=document.getElementById(rootId);
    if(root && root.querySelector('main.mh-wr')) setup(root);
  });
  function start() {
    const root=document.getElementById(rootId);
    if(!root) return;
    observer.observe(root,{childList:true,subtree:true});
    setup(root);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();
