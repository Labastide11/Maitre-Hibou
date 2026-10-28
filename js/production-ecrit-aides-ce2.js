
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
  // Seule la première scène fournit une phrase complète.
  // Les autres scènes n'offrent que des amorces à compléter par l'élève.
  const sequences = {
    'mh-graine': [
      ['D’abord…','D’abord, un garçon plante une graine dans la terre.','Pour continuer : Ensuite…'],
      ['Ensuite…','Ensuite…','Avec son arrosoir, il…'],
      ['Enfin…','Enfin…','Après quelques jours, une…']
    ],
    'mh-chien': [
      ['D’abord…','D’abord, un garçon découvre un chien perdu.','Pour continuer : Ensuite…'],
      ['Ensuite…','Ensuite…','Pour aider le chien, le garçon…'],
      ['Puis…','Puis…','Il décide de…'],
      ['Enfin…','Enfin…','Le chien retrouve…']
    ],
    'mh-paquet': [
      ['D’abord…','D’abord, une fille trouve un mystérieux paquet devant sa maison.','Pour continuer : Ensuite…'],
      ['Ensuite…','Ensuite…','Quand elle ouvre le carton, elle…'],
      ['Puis…','Puis…','Pour rassurer le petit animal, elle…'],
      ['Enfin…','Enfin…','La fille demande de l’aide à…']
    ]
  };
  function aide(target, getPhrases, initial, mode) {
    if (!target || target.dataset.aideInit) return;
    target.dataset.aideInit = '1';
    const panel = document.createElement('section');
    panel.className = 'mh-help-ce2';
    panel.innerHTML = '<div class="mh-help-heading">💡 '+(mode==='continuation'?'Une amorce pour continuer':'Une phrase pour commencer')+'</div>' +
      '<p class="mh-help-phrase" aria-live="polite"></p>' +
      '<button type="button" class="mh-help-next">Une phrase complète</button>' +
      '<p class="mh-help-note">Tu peux utiliser cette idée ou inventer la tienne. Rien ne s’écrit automatiquement.</p>';
    target.insertAdjacentElement('afterend',panel);
    let stage = 0;
    function update() {
      const examples = getPhrases();
      panel.querySelector('.mh-help-phrase').textContent = mode==='no-answer' ? (stage===0 ? examples[0] : examples[2]) : (mode==='starter' ? (stage===0 ? examples[1] : examples[2]) : (stage===0 ? examples[0] : examples[2]));
      panel.querySelector('.mh-help-next').textContent = stage===0
        ? (mode==='continuation'?'Un indice pour continuer':'Comment continuer ?')
        : 'Revenir à la première aide';
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
      const phraseSets=()=>{
        if (!lev3) {
          const place=(root.querySelector('#mh-l2-place')||{}).value||'foret';
          const surprise=(root.querySelector('#mh-l2-surprise')||{}).value||'dragon';
          const loc={foret:'dans une forêt',chateau:'dans un château',grotte:'dans une grotte'}[place]||'dans une forêt';
          const evt={dragon:'un petit dragon',lumiere:'une lumière mystérieuse',carte:'une carte au trésor'}[surprise]||'une surprise';
          return [
            ['Un jour…','Un jour, un enfant découvre un coffre '+loc+'.','Il se demande ce qui se cache dedans…'],
            ['Puis…','Puis…','Il décide alors de…'],
            ['Soudain…','Soudain…','À sa grande surprise, '+evt+' apparaît…']
          ];
        }
        const who=(root.querySelector('#mh-l3-who')||{}).value||'enfants';
        const problem=(root.querySelector('#mh-l3-problem')||{}).value||'tempete';
        const ending=(root.querySelector('#mh-l3-end')||{}).value||'abri';
        const subject={enfants:'Deux enfants',exploratrice:'Une exploratrice',pirate:'Un pirate'}[who]||'Deux enfants';
        const verb=who==='enfants'?'arrivent':'arrive';
        const obstacle={tempete:'une tempête',grotte:'une grotte mystérieuse',bateau:'un bateau échoué'}[problem]||'un danger';
        const solution={abri:'un abri',passage:'un passage secret',secours:'de l’aide'}[ending]||'une solution';
        return [
          ['Un matin…','Un matin, '+subject+' '+verb+' sur une île inconnue.','Au loin, ils aperçoivent…'],
          ['Mais soudain…','Mais soudain…','Un problème survient : '+obstacle+'…'],
          ['Finalement…','Finalement…','Pour s’en sortir, ils cherchent '+solution+'…']
        ];
      };
      root.querySelectorAll('textarea').forEach((area,i)=>{
        // Une seule phrase entièrement rédigée : celle du début.
        // Les parties suivantes n'affichent jamais une réponse complète.
        aide(area,()=>phraseSets()[Math.min(i,2)],0,i===0?'starter':'continuation');
      });
      if(!main.dataset.mhCE2ChoiceRefresh){
        main.dataset.mhCE2ChoiceRefresh='1';
        main.addEventListener('change',event=>{
          if(!event.target.matches('#mh-l2-place,#mh-l2-surprise,#mh-l3-who,#mh-l3-problem,#mh-l3-end'))return;
          root.querySelectorAll('.mh-help-ce2').forEach(panel=>panel.refreshCE2?.());
        });
      }
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
