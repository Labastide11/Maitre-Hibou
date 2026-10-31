/* Maître Hibou — pont de suivi pour les pages autonomes.
   Réutilise exclusivement le journal existant (V25.8.47) et sa file de synchro.
   Aucun nouveau compteur de points ni second journal. */
(function(){
  'use strict';
  function student(){
    var sys=window.hibouStudentSystem;
    if(sys && typeof sys.currentName==='function') return String(sys.currentName()||'').trim();
    return '';
  }
  function key(name){
    return String(name).trim().toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'') || '';
  }
  function showStudent(){
    var name=student(), note=document.getElementById('mh-student-progress');
    if(!note)return;
    note.textContent=name?'Élève : '+name+' — réussites enregistrées dans Mon parcours'
      :'Élève non identifié : retourne à l’accueil et saisis ton prénom pour enregistrer tes résultats.';
    note.classList.toggle('mh-student-unknown',!name);
  }
  function track(payload){
    if(!student())throw new Error('Élève non identifié : aucun résultat attribué.');
    if(typeof window.hibouTrackEvent!=='function')throw new Error('Journal Maître Hibou indisponible.');
    var event=window.hibouTrackEvent(payload);
    if(!event)throw new Error('Échec de l’enregistrement dans le journal.');
    return event;
  }
  function saveBilanResult(subject,payload){
    var name=student();
    if(!name){showStudent();return false;}
    payload=payload||{};
    try {
      var storageKey='hibou_bilans_'+key(name);
      var history=JSON.parse(localStorage.getItem(storageKey)||'{}');
      history[subject]=payload;
      localStorage.setItem(storageKey,JSON.stringify(history));
      if(!payload.__hibouJournalLogged && payload.score!=null && payload.total!=null){
        track({type:'bilan_reussi',matiere:payload.subject||subject,domaine:'Bilan',
          titre:'Bilan '+(payload.subject||subject)+' terminé',
          detail:payload.score+'/'+payload.total,score:payload.score,total:payload.total,
          source:'bilan_'+String(subject).toLowerCase()});
        payload.__hibouJournalLogged=true;
      }
      window.dispatchEvent(new CustomEvent('hibou:bilan-updated',{detail:{subject:subject,result:payload}}));
      return true;
    }catch(e){console.error('Bilan non enregistré',e);return false;}
  }
  window.MHStandaloneProgress={student:student,track:track,saveBilanResult:saveBilanResult,showStudent:showStudent};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',showStudent);
  else showStudent();
  window.addEventListener('pageshow',showStudent);
})();
