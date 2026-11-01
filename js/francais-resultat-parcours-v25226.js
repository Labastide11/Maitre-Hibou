
(function(){
  if(window.__maitreHibouV25226FrancaisResultatParcours) return;
  window.__maitreHibouV25226FrancaisResultatParcours=true;
  function clean(v){return String(v==null?'':v).replace(/\s+/g,' ').trim();}
  function byId(id){return document.getElementById(id);}
  function labelFromActivity(id){
    var map={blanche:'Ceinture blanche — Phrase affirmative / négative',jaune:'Ceinture jaune — Trouver le verbe',orange:'Ceinture orange — Trouver le sujet',verte:'Ceinture verte — Reconnaître un nom',bleue:'Ceinture bleue — Reconnaître un déterminant',marron:'Ceinture marron — Trouver l’infinitif',noire:'Ceinture noire — Reconnaître l’adjectif',rouge:'Ceinture rouge — Reconnaître le groupe nominal',idees:'Idées pour écrire'};
    return map[id]||id||'grammaire';
  }
  var current='blanche',last='';
  function detect(){
    var ov=byId('frenchTrainingOverlayV2348'); if(!ov) return;
    var result=ov.querySelector('.fr-v2348-result'); if(!result) return;
    var text=clean(result.textContent); if(!/entraînement terminé|entrainement terminé|score/i.test(text)) return;
    var m=text.match(/(\d+)\s*\/\s*(\d+)/); if(!m) return;
    var feedback=clean((ov.querySelector('.fr-v2348-feedback')||{}).textContent||'');
    var label=feedback?clean(feedback.split('·')[0]):''; if(!label||/source/i.test(label))label=labelFromActivity(current);
    var score=m[1]+' / '+m[2],key=label+'|'+score; if(key===last)return; last=key;
    if(typeof window.hibouRecordTrainingSuccess==='function') window.hibouRecordTrainingSuccess('français',label,'Score '+score);
  }
  function install(){
    if(typeof window.startFrenchTrainingV2348==='function'&&!window.startFrenchTrainingV2348.__journeyWrapped){
      var oldStart=window.startFrenchTrainingV2348;
      window.startFrenchTrainingV2348=function(id){current=clean(id||current||'blanche');last='';return oldStart.apply(this,arguments);};
      window.startFrenchTrainingV2348.__journeyWrapped=true;
    }
    if(typeof window.answerFrenchTrainingV2348==='function'&&!window.answerFrenchTrainingV2348.__journeyWrapped){
      var oldAnswer=window.answerFrenchTrainingV2348;
      window.answerFrenchTrainingV2348=function(){var r=oldAnswer.apply(this,arguments);[80,250,600,1100].forEach(function(ms){setTimeout(detect,ms);});return r;};
      window.answerFrenchTrainingV2348.__journeyWrapped=true;
    }
  }
  install();setTimeout(install,350);window.addEventListener('load',function(){setTimeout(install,200);});
})();
