# CHANGELOG — Maître Hibou

## V25.8.46 — consolidation code historique, lot 3

- Archivage de 12 anciens fichiers JS/CSS de la famille `hibou-learning-engine`.
- Versions archivées : V25.8.09, V25.8.10, V25.8.11, V25.8.16, V25.8.17 et V25.8.18.
- Conservation de la version active `hibou-learning-engine-v25822.js` / `.css`.
- Précontrôle automatique des références avant tout déplacement.
- Aucun changement API, synchronisation, données élèves ou logique pédagogique.

## V25.8.45 — correctif relance IA boîte à questions

- Correction du bouton « Relancer l’IA » après une réponse IA invalide ou vide.
- La relance conserve désormais la question initiale même lorsque le champ `qInput` n’est plus présent à l’écran.
- `boite_questions.html` affiche la version V25.8.45 dans son titre/diagnostic.
- Aucun changement API, synchronisation, données élèves ou logique de sauvegarde.

## V25.8.44 — consolidation code historique, lot 2

- Archivage de 20 anciens fichiers JS/CSS de la famille `hibou-question-modal`.
- Les anciennes versions sont déplacées vers `docs/historique/code/` et non supprimées.
- Conservation de la version active `hibou-question-modal-v25807.js` / `.css`.
- Vérification préalable : aucun fichier archivé n'est référencé par les pages/modules actuels.
- Aucun changement API, synchronisation, données élèves ou logique pédagogique.

## V25.8.43 — consolidation code historique, lot 1

- Archivage de 9 anciens fichiers JS/CSS des familles `hibou-advice` et `hibou-home-title`.
- Les anciennes versions sont déplacées vers `docs/historique/code/` et non supprimées.
- Conservation des versions actives `hibou-advice-v25815` et `hibou-home-title-v25807`.
- Vérification préalable : aucun des 9 fichiers archivés n'était référencé par les pages/modules actuels.
- Aucun changement API, synchronisation, données élèves ou logique pédagogique.

## V25.8.42 — correctif titre/version

- Correction des scripts internes qui réécrivaient encore le titre de l'onglet en V25.8.39.
- La balise `<title>`, les constantes de titre et `window.MAITRE_HIBOU_VERSION` sont alignées sur V25.8.42.
- Les numéros de version des modules JS réellement chargés et les commentaires/logs historiques LSU V25.8.39 restent inchangés.
- Aucun changement API, synchronisation, données élèves ou logique pédagogique.

## V25.8.41 — audit détaillé des anciens JS/CSS

- Cartographie des versions JS/CSS réellement chargées.
- Prise en compte des dépendances CSS `@import`.
- Identification des générations historiques candidates à un archivage futur.
- Détection du cas actif `hibou-parcours-progres-v25784.css`, importé par V25.8.25.
- Aucun fichier JS/CSS déplacé ou supprimé.
- Aucun changement fonctionnel, API, synchronisation ou données élèves.

## V25.8.40 — consolidation phase 1

- Déplacement des README historiques vers `docs/historique/readme/`.
- Création d'un `README.md` de référence à la racine.
- Aucun déplacement ni suppression de module JavaScript/CSS actif.
- Aucun changement fonctionnel, API, synchronisation, données élèves ou logique pédagogique.
- Mise à jour de la balise `<title>` de `index.html` en V25.8.40.

