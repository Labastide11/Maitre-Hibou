(function(){
  if(window.__maitreHibouV25216PreloadMaths) return;
  window.__maitreHibouV25216PreloadMaths = true;
  try{ document.title = '🦉 Maître Hibou V25.8.84'; }catch(e){}
  function warm(){
    try{
      if(typeof window.preloadMathsRowsV2343 === 'function'){
        window.preloadMathsRowsV2343();
      }
    }catch(e){}
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(warm, 2200); });
  }else{
    setTimeout(warm, 2200);
  }
  window.addEventListener('load', function(){ setTimeout(warm, 1500); });
})();
