/* Maître Hibou : accueil CE2 — libellés et ergonomie tactile.
   Fonctionne aussi si l'écran de connexion est reconstruit dynamiquement. */
(() => {
  const labels = [
    ['.v2567-card.student h3', '👤 Je suis déjà inscrit'],
    ['.v2567-card.guest h3', '✨ Je veux essayer'],
    ['#v2567StudentBtn', 'Je me connecte'],
    ['#v2567GuestBtn', 'Je découvre']
  ];
  function apply() {
    for (const [selector, value] of labels) {
      document.querySelectorAll('#prenomOverlay ' + selector).forEach(el => {
        if (el.textContent !== value) el.textContent = value;
      });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
  function start() {
    apply();
    const root = document.querySelector('#prenomOverlay');
    if (!root) return;
    const observer = new MutationObserver(apply);
    observer.observe(root, {childList: true, subtree: true});
  }
})();
