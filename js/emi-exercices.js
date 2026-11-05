
(function(){
  if(window.__maitreHibouV2517EmiGrow) return;
  window.__maitreHibouV2517EmiGrow = true;

  var TITLE = '🦉 Maître Hibou V25.8.84';
  var stateBySession = {};

  var SESSIONS=window.MH_EMI_SESSIONS || [];

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function setTitle(){ try{ document.title = TITLE; }catch(e){} }
  function overlay(){ return document.getElementById('mhGrowTogetherOverlay'); }
  function box(){ var ov = overlay(); return ov ? ov.querySelector('.mh-grow-box') : null; }
  function closeGrow(){ window.MHGrandirShowHome && window.MHGrandirShowHome(); }
  function closeButton(){ return '<button type="button" class="mh-grow-close" aria-label="Retour à Grandir ensemble" data-mh-emi-close>×</button>'; }

  function renderGrowHome(){ if(window.MHGrandirShowHome)window.MHGrandirShowHome(); }

  function renderEmiHome(){
    var b = box();
    if(!b) return;
    b.innerHTML =
      closeButton() +
      '<div class="mh-grow-head"><h2 id="mhGrowTitle">📰 Enquêtes EMI</h2><p>Éducation aux médias et à l’information : vérifier, comprendre, choisir.</p></div>' +
      '<div class="mh-emi-toolbar"><button type="button" class="mh-emi-back" data-mh-emi-grow-home>← Grandir ensemble</button><div class="mh-emi-progress">4 enquêtes · 8 questions chacune</div></div>' +
      '<div class="mh-emi-home-grid">' +
        SESSIONS.map(function(session){
          var media = {
            'vrai-faux':'images/emi-vrai-ou-faux.jpg',
            'sources':'images/emi-sources.jpg',
            'medias':'images/emi-medias.jpg',
            'ecrans':'images/emi-ecrans.jpg'
          };
          var img = media[session.id];
          return '<button type="button" class="mh-emi-session-card mh-emi-session-card-image" data-mh-emi-session="'+esc(session.id)+'" aria-label="'+esc(session.title)+' — '+esc(session.subtitle)+'">' +
            (img ? '<img src="'+img+'" alt="'+esc(session.title)+' — '+esc(session.subtitle)+'" loading="lazy" decoding="async">' : '<strong>'+session.icon+' '+esc(session.title)+'</strong><p>'+esc(session.subtitle)+'</p><span>Commencer →</span>') +
            '</button>';
        }).join('') +
      '</div>';
    bindEmiHome();
  }

  function getSession(id){
    return SESSIONS.filter(function(s){ return s.id === id; })[0] || SESSIONS[0];
  }

  function renderSession(id){
    var session = getSession(id);
    stateBySession[id] = {answered:new Array(session.items.length).fill(false), score:0};
    var b = box();
    if(!b) return;
    b.innerHTML =
      closeButton() +
      '<div class="mh-grow-head"><h2 id="mhGrowTitle">'+session.icon+' '+esc(session.title)+'</h2><p>'+esc(session.intro)+'</p></div>' +
      '<div class="mh-emi-toolbar"><button type="button" class="mh-emi-back" data-mh-emi-home>← Enquêtes EMI</button><div class="mh-emi-progress" data-mh-emi-progress>Score : 0 / '+session.items.length+'</div></div>' +
      '<div class="mh-emi-question-grid">' +
        session.items.map(function(item, index){
          return '<article class="mh-emi-question" data-mh-emi-question="'+index+'">' +
            '<div><span class="mh-emi-num">Question '+(index+1)+' / '+session.items.length+'</span>' +
            (item.tag ? '<span class="mh-emi-tag">'+esc(item.tag)+'</span>' : '') + '</div>' +
            '<p class="mh-emi-statement">'+esc(item.text)+'</p>' +
            '<div class="mh-emi-choices">' +
              session.choices.map(function(choice){
                return '<button type="button" class="mh-emi-choice" data-mh-emi-index="'+index+'" data-mh-emi-answer="'+esc(String(choice.value))+'">'+esc(choice.label)+'</button>';
              }).join('') +
            '</div>' +
            '<div class="mh-emi-feedback" data-mh-emi-feedback="'+index+'"></div>' +
          '</article>';
        }).join('') +
      '</div>' +
      '<div class="mh-emi-final" data-mh-emi-final></div>';
    bindSession(session);
  }

  function parseChoice(raw){
    if(raw === 'true') return true;
    if(raw === 'false') return false;
    return raw;
  }

  function bindSession(session){
    bindCommon();
    var b = box();
    var state = stateBySession[session.id];
    if(!b || !state) return;
    var back = b.querySelector('[data-mh-emi-home]');
    if(back) back.addEventListener('click', renderEmiHome, true);
    b.querySelectorAll('[data-mh-emi-answer]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var index = Number(btn.getAttribute('data-mh-emi-index'));
        if(state.answered[index]) return;
        state.answered[index] = true;
        var item = session.items[index];
        var selected = parseChoice(btn.getAttribute('data-mh-emi-answer'));
        var ok = selected === item.answer;
        if(ok) state.score += 1;
        var card = b.querySelector('[data-mh-emi-question="'+index+'"]');
        if(card){
          card.querySelectorAll('[data-mh-emi-answer]').forEach(function(choiceBtn){
            var val = parseChoice(choiceBtn.getAttribute('data-mh-emi-answer'));
            choiceBtn.disabled = true;
            if(val === item.answer) choiceBtn.classList.add('correct');
            else if(choiceBtn === btn) choiceBtn.classList.add('wrong');
          });
        }
        var feedback = b.querySelector('[data-mh-emi-feedback="'+index+'"]');
        if(feedback){
          feedback.className = 'mh-emi-feedback visible ' + (ok ? 'ok' : 'ko');
          feedback.textContent = (ok ? 'Bonne réponse. ' : 'À retenir. ') + item.explain;
        }
        updateProgress(session);
      }, true);
    });
  }

  function updateProgress(session){
    var b = box();
    var state = stateBySession[session.id];
    if(!b || !state) return;
    var done = state.answered.filter(Boolean).length;
    var progress = b.querySelector('[data-mh-emi-progress]');
    if(progress) progress.textContent = 'Score : ' + state.score + ' / ' + session.items.length;
    if(done === session.items.length){
      if(!state.journalLogged){
        state.journalLogged = true;
        try{
          var eventData={area:'EMI',title:session.title,score:state.score,total:session.items.length,source:'emi_'+session.id};
          var pending=[];try{pending=JSON.parse(localStorage.getItem('mh_grandir_pending_events_v1')||'[]');}catch(e){}
          if(!Array.isArray(pending))pending=[];
          pending.push(eventData);
          localStorage.setItem('mh_grandir_pending_events_v1',JSON.stringify(pending.slice(-60)));
        }catch(error){ try{ console.error('Journal EMI V25.7.57', error); }catch(ignore){} }
      }
      var final = b.querySelector('[data-mh-emi-final]');
      if(final){
        var message = state.score >= 7 ? 'Très bonne enquête.' : state.score >= 5 ? 'Enquête réussie, quelques réflexes à consolider.' : 'À reprendre tranquillement pour renforcer les bons réflexes.';
        final.innerHTML = '<div>Résultat : '+state.score+' / '+session.items.length+'</div><div>'+esc(message)+'</div>' +
          '<div class="mh-emi-choices" style="justify-content:center;margin-top:10px">' +
          '<button type="button" class="mh-emi-reset" data-mh-emi-restart>Recommencer</button>' +
          '<button type="button" class="mh-emi-reset" data-mh-emi-home>Retour aux enquêtes</button>' +
          '</div>';
        final.classList.add('visible');
        var restart = final.querySelector('[data-mh-emi-restart]');
        var back = final.querySelector('[data-mh-emi-home]');
        if(restart) restart.addEventListener('click', function(){ renderSession(session.id); }, true);
        if(back) back.addEventListener('click', renderEmiHome, true);
      }
    }
  }

  function bindCommon(){
    var b = box();
    if(!b) return;
    b.querySelectorAll('[data-mh-emi-close]').forEach(function(btn){
      if(btn.getAttribute('data-mh-bound') === '1') return;
      btn.setAttribute('data-mh-bound','1');
      btn.addEventListener('click', closeGrow, true);
    });
  }

  function bindEmiHome(){
    bindCommon();
    var b = box();
    if(!b) return;
    var back = b.querySelector('[data-mh-emi-grow-home]');
    if(back) back.addEventListener('click', renderGrowHome, true);
    b.querySelectorAll('[data-mh-emi-session]').forEach(function(btn){
      btn.addEventListener('click', function(){ renderSession(btn.getAttribute('data-mh-emi-session')); }, true);
    });
  }

  function bindGrowHome(){
    bindCommon();
    var b = box();
    if(!b) return;
    b.querySelectorAll('[data-grow]').forEach(function(btn){
      if(btn.getAttribute('data-mh-emi-bound') === '1') return;
      btn.setAttribute('data-mh-emi-bound','1');
      btn.addEventListener('click', function(ev){
        var area = btn.getAttribute('data-grow');
        if(area === 'emi'){
          ev.preventDefault();
          ev.stopPropagation();
          if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
          renderEmiHome();
          return;
        }
        var detail = document.getElementById('mhGrowDetail');
        if(!detail) return;
        if(area === 'emc') detail.innerHTML = '<strong>EMC</strong> : apprendre à respecter les règles, écouter les autres, coopérer et résoudre un petit dilemme de vie de classe.';
        if(area === 'evar') detail.innerHTML = '<strong>EVAR</strong> : apprendre à nommer ses émotions, respecter son corps et celui des autres, et savoir demander de l’aide.';
      }, true);
    });
  }

  window.MHEmi={open:function(){var ov=overlay();if(ov)ov.hidden=false;renderEmiHome();},sessions:SESSIONS};
})();
