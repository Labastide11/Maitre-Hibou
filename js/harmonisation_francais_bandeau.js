/* Maître Hibou — NAV-FR : un seul bandeau par atelier, sans modifier les moteurs d'exercices. */
(function(){
 'use strict';
 var overlayId='frenchTrainingOverlayV2348', innerId='frenchPopupInnerV2348';
 function apply(){
  var ov=document.getElementById(overlayId); if(!ov || ov.classList.contains('hidden')) return;
  var top=ov.querySelector('.fr-v2348-topbar'), inner=document.getElementById(innerId);
  if(!top||!inner) return;
  // Le menu général et le module Orthographe ont déjà leur navigation validée.
  if(inner.querySelector('.fr-v25720-domain-grid') || ov.classList.contains('ortho-menu-compact') || ov.classList.contains('ortho-qcm-compact')){
    ov.classList.remove('fr-harmonise');
    var old=top.querySelector('.fr-harmonise-info'); if(old) old.remove();
    var moved=top.querySelector('.fr-harmonise-back'); if(moved){moved.classList.remove('fr-harmonise-back'); var host=inner.querySelector('.fr-v2348-training-head')||inner.querySelector('.fr-v2348-panel'); if(host && !inner.querySelector('.fr-v2348-back')) host.insertBefore(moved,host.firstChild); else moved.remove();}
    return;
  }
  var heading=inner.querySelector('.fr-v2348-header .fr-v2348-title h2, .fr-v2348-training-title, .fr-v23411-section-title, .fr-v2348-panel h2');
  var back=inner.querySelector('.fr-v2348-back, button[onclick*="renderFrenchDomainMenuV25720"], button[onclick*="renderFrenchTrainingListV2348"]');
  var previousBack=top.querySelector('.fr-harmonise-back');
  if(back && previousBack && previousBack!==back) previousBack.remove();
  if(!heading && !back) return;
  var title=heading ? heading.textContent.trim() : 'Français';
  // If the page only shows the generic heading, don't hide it unless it has a return control.
  if(!back && (!heading || /^fran[çc]ais$/i.test(title.replace(/^[^\p{L}]+/u,'')))) return;
  ov.classList.add('fr-harmonise');
  var info=top.querySelector('.fr-harmonise-info');
  if(!info){info=document.createElement('span');info.className='fr-harmonise-info';var close=top.querySelector('.fr-v2348-close');top.insertBefore(info,close);}
  var newText='📖 Français — '+title;
  if(info.textContent!==newText) info.textContent=newText;
  if(back){back.classList.add('fr-harmonise-back');var closeBtn=top.querySelector('.fr-v2348-close');if(back.parentNode!==top || back.nextElementSibling!==info) top.insertBefore(back,info);}
 }
 function boot(){
  var ov=document.getElementById(overlayId);if(!ov)return;
  var observer=new MutationObserver(function(){apply();});
  observer.observe(ov,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  apply();
 }
 if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
