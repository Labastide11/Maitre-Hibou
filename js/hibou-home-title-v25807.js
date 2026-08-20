/* Maître Hibou V25.8.07 — titre personnalisé fiable */
(function(){
'use strict';
if(window.__hibouHomeTitleV25807) return;
window.__hibouHomeTitleV25807=true;

function clean(v){
  return String(v==null?'':v).replace(/\s+/g,' ').trim();
}

function currentName(){
  try{
    if(typeof window.prenomActuel!=='undefined' && clean(window.prenomActuel)){
      return clean(window.prenomActuel);
    }
  }catch(e){}

  try{
    var cs=JSON.parse(localStorage.getItem('hibou_current_student')||'{}');
    if(cs && clean(cs.prenom)) return clean(cs.prenom);
  }catch(e){}

  var ids=['eleveNom','v21HeroName','v21HeaderName'];
  for(var i=0;i<ids.length;i++){
    var el=document.getElementById(ids[i]);
    var t=clean(el&&el.textContent);
    if(t && t!=='Élève' && t!=='Jo' && t!=='Invité') return t;
  }

  try{
    var stores=[
      localStorage.getItem('hibou_last_prenom'),
      localStorage.getItem('hibou_prenom'),
      localStorage.getItem('maitre_hibou_prenom'),
      sessionStorage.getItem('hibou_prenom')
    ];
    for(var j=0;j<stores.length;j++){
      var s=clean(stores[j]);
      if(s && s!=='Jo' && s!=='Élève' && s!=='Invité') return s;
    }
  }catch(e){}
  return '';
}

function titleNode(){
  return document.querySelector('#v2574MainDashboard .v2574-title, h2.v2574-title');
}

function apply(){
  var title=titleNode();
  if(!title) return false;

  var name=currentName();
  if(!name) return false;

  // Structure réelle :
  // <span class="spark">✨</span><span>Que veux-tu...</span><span class="spark">✨</span>
  var spans=title.querySelectorAll('span');
  var textSpan=null;

  for(var i=0;i<spans.length;i++){
    if(!spans[i].classList.contains('spark')){
      textSpan=spans[i];
      break;
    }
  }

  if(!textSpan){
    textSpan=document.createElement('span');
    var lastSpark=title.querySelector('.spark:last-child');
    if(lastSpark) title.insertBefore(textSpan,lastSpark);
    else title.appendChild(textSpan);
  }

  var wanted=name+', que veux-tu faire maintenant ?';
  if(clean(textSpan.textContent)!==wanted){
    textSpan.textContent=wanted;
  }
  return true;
}

var titleObserver=null;
function observeNames(){
  if(titleObserver) return;
  titleObserver=new MutationObserver(function(){
    // Mise à jour uniquement du texte central du titre.
    apply();
  });

  ['eleveNom','v21HeroName','v21HeaderName'].forEach(function(id){
    var el=document.getElementById(id);
    if(el){
      try{titleObserver.observe(el,{childList:true,characterData:true,subtree:true});}catch(e){}
    }
  });
}

function boot(){
  apply();
  observeNames();

  // Contrôles bornés pour couvrir la création tardive du dashboard et la connexion.
  [100,250,500,900,1500,2500,4000].forEach(function(ms){
    window.setTimeout(function(){
      apply();
      observeNames();
    },ms);
  });

  document.addEventListener('hibou:student-changed',function(){
    window.setTimeout(apply,50);
  });
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',boot,{once:true});
}else{
  boot();
}

window.hibouRefreshPersonalizedTitleV25807=apply;
})();