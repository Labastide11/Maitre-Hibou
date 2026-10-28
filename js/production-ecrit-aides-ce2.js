
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
  function aide(target, getPhrases, initial) {
    if (!target || target.dataset.aideInit) return;
    target.dataset.aideInit = '1';
    const panel = document.createElement('section');
    panel.className = 'mh-help-ce2';
    panel.innerHTML = '<div class="mh-help-heading">💡 Une idée pour commencer</div>' +
      '<p class="mh-help-phrase" aria-live="polite"></p>' +
      '<button type="button" class="mh-help-next">Une phrase complète</button>' +
      '<p class="mh-help-note">Tu peux utiliser cette idée ou inventer la tienne. Rien ne s’écrit automatiquement.</p>';
    target.insertAdjacentElement('afterend',panel);
    let stage = initial || 0;
    function update() {
      const examples = getPhrases();
      panel.querySelector('.mh-help-phrase').textContent = examples[Math.min(stage,2)];
      panel.querySelector('.mh-help-next').textContent = ['Une phrase complète','Une idée pour continuer','Revenir à la petite aide'][stage];
    }
    panel.querySelector('.mh-help-next').addEventListener('click', function () { stage=(stage+1)%3; update(); });
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
        aide(area,()=>dras[id]);
      }
      return;
    }
    if (root.querySelector('#mh-wr-text')) {
      // Une aide DIRECTEMENT sous chaque groupe de miniatures, pas en bas des trois groupes.
      const groups = [
        {key:'who',type:'personnage'},
        {key:'where',type:'lieu'},
        {key:'what',type:'événement'}
      ];
      const endings = {
        porte:'ouvre une porte mystérieuse.',
        tresor:'découvre un trésor.',
        rencontre:'fait une rencontre inattendue.',
        voyage:'part pour un long voyage.',
        mystere:'découvre un mystère.',
        aventure:'commence une aventure.'
      };
      function phrasesFor(k,id) {
        const who=people[selected(root,'who')] || ['Un personnage','il'];
        if(k==='who') {
          const cases={
            fille:['La fille…','La fille ouvre la porte en premier.','Puis, elle découvre…'],
            garcon:['Le garçon…','Le garçon avance vers la porte.','Soudain, il aperçoit…'],
            chevalier:['Le chevalier…','Le chevalier protège l’entrée du château.','Tout à coup, il entend…'],
            princesse:['La princesse…','La princesse découvre une porte mystérieuse.','Derrière cette porte, elle…'],
            sorcier:['Le sorcier…','Le sorcier ouvre une porte magique.','Une lumière apparaît et…'],
            dragon:['Le dragon…','Le dragon vole au-dessus du château.','Soudain, il voit…'],
            renard:['Le renard…','Le renard se cache près de la porte.','Puis, il rencontre…'],
            chien:['Le chien…','Le chien court vers le château.','Tout à coup, il…']
          };
          return cases[id]||['Un personnage…','Un personnage découvre une porte.','Puis…'];
        }
        if(k==='where') {
          const places2={
            chateau:['Près du château…','Le personnage arrive près d’un château.','Derrière les remparts, il…'],
            foret:['Dans la forêt…','Le personnage traverse une grande forêt.','Soudain, derrière un arbre…'],
            montagne:['Au pied de la montagne…','Le personnage marche au pied de la montagne.','Tout à coup, il aperçoit…'],
            village:['Dans le village…','Le personnage arrive dans un village.','Sur la place, il découvre…'],
            grotte:['Devant la grotte…','Le personnage s’arrête devant une grotte.','À l’intérieur, il entend…'],
            ile:['Sur une île inconnue…','Le personnage découvre une île inconnue.','Au loin, il voit…']
          };
          return places2[id]||['Dans un lieu…','Le personnage découvre un lieu mystérieux.','Soudain…'];
        }
        const act=endings[id]||'découvre une surprise.';
        return ['Soudain…',who[0]+' '+act,'Ensuite, '+(who[1]==='elle'?'elle':'il')+' décide de…'];
      }
      groups.forEach(function(g) {
        const section=root.querySelector('.mh-wr-group .mh-wr-choice[data-group="'+g.key+'"]')?.closest('.mh-wr-group');
        if(!section || section.dataset.mhHelpBound) return;
        section.dataset.mhHelpBound='1';
        const panel=document.createElement('div');
        panel.className='mh-help-ce2 mh-help-under-images';
        panel.hidden=true;
        panel.innerHTML='<div class="mh-help-heading">💡 Une idée pour écrire</div>'+
          '<p class="mh-help-phrase" aria-live="polite"></p>'+
          '<button type="button" class="mh-help-next">Une phrase complète</button>'+
          '<p class="mh-help-note">Tu peux utiliser cette idée ou inventer la tienne.</p>';
        section.appendChild(panel);
        let stage=0,previous=null;
        function update() {
          const id=selected(root,g.key);
          panel.hidden=!id;
          if(!id) return;
          if(id!==previous){stage=0;previous=id;}
          const phrases=phrasesFor(g.key,id);
          panel.querySelector('.mh-help-phrase').textContent=phrases[stage];
          panel.querySelector('.mh-help-next').textContent=['Une phrase complète','Une idée pour continuer','Revenir à la petite aide'][stage];
        }
        panel.querySelector('.mh-help-next').addEventListener('click',function(){
          stage=(stage+1)%3;update();
        });
        // Le module principal actualise les sélections sur le clic. Attendre la fin de ce clic.
        section.addEventListener('click',function(evt){
          if(evt.target.closest('.mh-wr-choice')) queueMicrotask(update);
        });
        update(); // affiche également le choix retrouvé depuis le brouillon
      });
      return;
    }
    if (main.classList.contains('mh-defis') && root.querySelector('#mh-defi-writing')) {
      const title=(root.querySelector('h2')||{}).textContent || '';
      const vals=title.includes('fin')?['Finalement, les enfants…','Finalement, les enfants retrouvent le chemin de leur maison.','Mais avant de partir, ils…']:
        title.includes('décris')?['Ce dragon est…','Ce dragon est petit et très curieux.','Il aime…']:
        title.includes('dialogue')?['— Regarde…','— Regarde cette porte ! dit la fille.','— Et si nous…']:
        ['Un jour, un coffre…','Un jour, un coffre apparaît dans la forêt.','Mais soudain…'];
      aide(root.querySelector('#mh-defi-writing'),()=>vals);
      return;
    }
    const seq=['mh-paquet','mh-chien','mh-graine'].find(k=>main.classList.contains(k));
    if(seq) {
      root.querySelectorAll('textarea[data-graine-text],textarea[data-chien-text],textarea[data-paquet-text]').forEach((area,i)=>{
        aide(area.closest('label') || area,()=>sequences[seq][Math.min(i,sequences[seq].length-1)]);
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
      root.querySelectorAll('textarea').forEach((area,i)=>aide(area,()=>phrases[Math.min(i,2)]));
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
