(function(){'use strict';
  var home=document.getElementById('grandirHome');
  var emc=document.getElementById('grandirEmc');
  var evar=document.getElementById('grandirEvar');
  var emi=document.getElementById('mhGrowTogetherOverlay');
  function show(view){home.hidden=view!=='home';emc.hidden=view!=='emc';evar.hidden=view!=='evar';emi.hidden=view!=='emi';window.scrollTo(0,0);}
  window.MHGrandirShowHome=function(){show('home');};
  document.querySelectorAll('[data-open]').forEach(function(btn){btn.addEventListener('click',function(){var a=btn.getAttribute('data-open');if(a==='emi'){show('emi');window.MHEmi.open();}else show(a);});});
  document.querySelectorAll('[data-home]').forEach(function(btn){btn.addEventListener('click',function(){show('home');});});
  // Retour vers l'accueil SANS relancer le choix du prénom.
  // L'index possède déjà le restaurateur sécurisé mh-retour-accueil-session-v2.
  var returnLink=document.getElementById('mhGrandirReturnHome');
  if(returnLink){
    returnLink.addEventListener('click',function(){
      try{sessionStorage.setItem('mh_return_home','1');}catch(e){}
      // Lien HTML normal : navigation fonctionnelle même si le stockage est bloqué.
    });
  }
  show('home');
})();