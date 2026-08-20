Maître Hibou V25.7.67 — correction « Mon parcours récent »

Cause trouvée :
- la carte #bandeauLastCard était bien affichée avec role="button" et tabindex="0",
  mais aucun gestionnaire de clic/clavier n'était relié à cette carte.
- La popup Mes progrès existait bien (`openHibouProgressConsolidatedV25762`) :
  elle n'était simplement jamais appelée depuis « Mon parcours récent ».

Correction :
- nouveau module léger `js/hibou-parcours-recent-click-v25767.js`
- clic sur « Mon parcours récent » -> popup Mes progrès consolidée
- touche Entrée ou Espace -> même comportement
- délégation d'événement : fonctionne même si le bandeau est reconstruit dynamiquement
- repli vers l'ancienne `openProgressPopup()` si nécessaire

Aucun changement :
- API V2.6
- Google Sheet
- médailles
- synchronisation
- données élèves
