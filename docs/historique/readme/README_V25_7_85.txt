Maître Hibou V25.7.85 — Vérification du prénom accélérée

Audit :
- l'ancien code appelait l'action `verifierEleve`, alors que l'API V2.6 accepte
  `verifiereleve` / `verifier_eleve`;
- l'ancienne URL STUDENTS_API_URL était vide, ce qui pouvait provoquer des délais inutiles;
- deux vérifications lourdes pouvaient être lancées en parallèle.

Nouveau fonctionnement :
1. préchargement de la liste des élèves dès l'écran de bienvenue;
2. si la liste est en cache, validation du prénom immédiate;
3. sinon appel API léger `verifiereleve`;
4. appel `get_eleves` seulement en repli ou en mise à jour de fond;
5. timeout réduit (5,5 s vérification / 7 s liste complète);
6. cache de 7 jours autorisé pour une entrée rapide, puis rafraîchissement en arrière-plan.

La vérification reste stricte : pas de correction approximative du prénom.
