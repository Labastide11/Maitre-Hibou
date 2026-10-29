/* Maître Hibou — cartes Vocabulaire : une seule illustration visible par carte.
   Les libellés HTML d'origine restent visibles uniquement si l'image échoue.
*/
(function(){
  'use strict';
  var config = [
    {name:'familles', label:'Familles de mots'},
    {name:'synonymes', label:'Synonymes'},
    {name:'contraires', label:'Contraires'},
    {name:'generiques', label:'Mots génériques'}
  ];
  function cleanCard(card){
    if(!card.classList.contains('vocab-image-ready')) return;
    var image=card.querySelector('img.vocab-image-loaded');
    if(!image || !image.complete || !image.naturalWidth) return;
    // Supprimer réellement les anciens titres/icônes : aucun CSS concurrent
    // ne pourra les faire réapparaître par-dessus ou derrière l'illustration.
    Array.prototype.slice.call(card.childNodes).forEach(function(node){
      if(node!==image) card.removeChild(node);
    });
  }
  function update(){
    var menu=document.querySelector('#frenchTrainingOverlayV2348 .vocab-v25729-menu');
    if(!menu) return;
    var cards=menu.querySelectorAll('.vocab-v25729-card');
    for(var i=0;i<Math.min(cards.length,config.length);i++)(function(card,item){
      if(card.dataset.vocabIllustrationChecked){cleanCard(card);return;}
      card.dataset.vocabIllustrationChecked='1';
      // Le bouton garde un nom accessible après disparition du texte HTML.
      if(!card.hasAttribute('aria-label')) card.setAttribute('aria-label',item.label);
      var img=document.createElement('img');
      img.className='vocab-image-loaded';
      img.alt=''; img.decoding='async'; img.draggable=false;
      img.addEventListener('load',function(){
        if(!img.naturalWidth) return;
        card.classList.add('vocab-image-ready');
        cleanCard(card);
      });
      img.addEventListener('error',function(){
        // En cas d'erreur, le texte de secours original reste visible.
        card.classList.remove('vocab-image-ready');
        img.remove();
      });
      card.appendChild(img);
      img.src='images/vocabulaire/'+item.name+'.jpg';
      if(img.complete && img.naturalWidth){
        card.classList.add('vocab-image-ready');
        cleanCard(card);
      }
    })(cards[i],config[i]);
  }
  function init(){
    var root=document.getElementById('frenchTrainingOverlayV2348');
    if(!root){
      var wait=new MutationObserver(function(){
        root=document.getElementById('frenchTrainingOverlayV2348');
        if(root){wait.disconnect();init();}
      });
      wait.observe(document.documentElement,{childList:true,subtree:true});
      return;
    }
    new MutationObserver(update).observe(root,{childList:true,subtree:true});
    update();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
