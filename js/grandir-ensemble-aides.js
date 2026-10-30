/* Maître Hibou — Indices pédagogiques EMC / EVAR (CE2).
   Ajout non destructif : les réponses, scores et corrections existants restent gérés par les pages. */
(function () {
  'use strict';
  if (window.__mhGrandirEnsembleAides) return;
  window.__mhGrandirEnsembleAides = true;
  var file = decodeURIComponent(location.pathname.split('/').pop() || '').toLowerCase();
  var messages = file === 'evar_messages_clairs.html';
  var hints = {
    'emc_1_bien_commun.html': 'Demande-toi si cette situation est utile à plusieurs personnes ou seulement à une personne. Pense à la vie de la classe.',
    'emc_2_services_publics.html': 'Cherche qui rend ce service, à qui il est utile et pourquoi il existe.',
    'emc_3_republique.html': 'Repense aux mots Liberté, Égalité et Fraternité. Quel comportement permet de les respecter ?',
    'evar_1_mon_corps.html': 'Pense à ce qui aide ton corps à être en bonne santé, à se sentir bien et à rester en sécurité.',
    'evar_2_consentement.html': 'Demande-toi si chaque personne peut choisir, dire non et être écoutée. Pense au respect des limites de chacun.'
  };
  var basic = 'Relis la phrase. Imagine la situation, puis demande-toi ce qui est respectueux et juste.';
  function addHint(card) {
    if (card.querySelector('.mh-ge-hint-button')) return;
    var choices = card.querySelector('.choices');
    if (!choices) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mh-ge-hint-button';
    btn.textContent = '💡 Besoin d’un indice ?';
    btn.setAttribute('aria-expanded', 'false');
    var panel = document.createElement('p');
    panel.className = 'mh-ge-hint-panel';
    panel.hidden = true;
    panel.textContent = hints[file] || basic;
    btn.addEventListener('click', function () {
      panel.hidden = !panel.hidden;
      btn.setAttribute('aria-expanded', String(!panel.hidden));
      btn.textContent = panel.hidden ? '💡 Besoin d’un indice ?' : '💡 Masquer l’indice';
    });
    choices.parentNode.insertBefore(btn, choices);
    choices.parentNode.insertBefore(panel, choices);
  }
  function addQuestionToMessages() {
    var grid = document.querySelector('main.shell .grid, .shell .grid');
    if (!grid || document.querySelector('.mh-ge-message-question')) return;
    var p = document.createElement('p');
    p.className = 'mh-ge-message-question';
    p.innerHTML = '<strong>Avant d’ouvrir une histoire :</strong> Que pourrait dire l’enfant pour expliquer son problème sans blesser l’autre ?';
    grid.parentNode.insertBefore(p, grid);
  }
  function scan() {
    if (messages) addQuestionToMessages();
    else document.querySelectorAll('#cards .card').forEach(addHint);
  }
  function init() {
    var style = document.createElement('style');
    style.textContent = '.mh-ge-hint-button{display:inline-flex;align-items:center;margin:9px 0 5px;padding:9px 13px;border-radius:12px;border:2px dashed #a78bfa;background:#f5f3ff;color:#51409a;font:800 14px system-ui,sans-serif;cursor:pointer;min-height:42px}.mh-ge-hint-button:focus-visible{outline:3px solid #2563eb;outline-offset:2px}.mh-ge-hint-panel{padding:10px 13px;margin:5px 0 12px;border-left:4px solid #eab308;background:#fffbea;border-radius:8px;color:#654b00;font:700 15px/1.5 system-ui,sans-serif}.mh-ge-hint-panel[hidden]{display:none!important}.mh-ge-message-question{padding:13px 15px;margin:12px 0 18px;border-radius:13px;border-left:5px solid #739ad8;background:#edf5ff;color:#16365d;font:700 16px/1.45 system-ui,sans-serif}';
    document.head.appendChild(style);
    scan();
    var root = document.getElementById('cards');
    if (root) new MutationObserver(scan).observe(root, {childList:true});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
