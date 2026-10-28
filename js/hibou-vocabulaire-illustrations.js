/* Cartes de vocabulaire : illustration chargée ou libellé de secours visible. */
(function(){'use strict';
  var names=['familles','synonymes','contraires','generiques'];
  var observed=null;
  function update(){
    var container=document.querySelector('#frenchTrainingOverlayV2348 .vocab-v25729-menu');
    if(!container)return;
    var cards=container.querySelectorAll('.vocab-v25729-card');
    for(var i=0;i<Math.min(cards.length,names.length);i++)(function(card,name){
      if(card.dataset.vocabIllustrationChecked)return;
      card.dataset.vocabIllustrationChecked='1';
      var img=document.createElement('img');
      img.className='vocab-image-loaded';
      img.alt=''; img.decoding='async';
      img.addEventListener('load',function(){card.classList.add('vocab-image-ready');});
      img.addEventListener('error',function(){img.remove();card.classList.remove('vocab-image-ready');});
      img.src='images/vocabulaire/'+name+'.jpg';
      card.appendChild(img);
      if(img.complete&&img.naturalWidth>0)card.classList.add('vocab-image-ready');
    })(cards[i],names[i]);
  }
  function init(){
    var root=document.getElementById('frenchTrainingOverlayV2348');
    if(!root){
      new MutationObserver(function(_,o){root=document.getElementById('frenchTrainingOverlayV2348');if(root){o.disconnect();init();}}).observe(document.documentElement,{childList:true,subtree:true});
      return;
    }
    observed=new MutationObserver(update);
    observed.observe(root,{childList:true,subtree:true});
    update();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
