# Maître Hibou V25.8.61 — consolidation lot 8 : anciens parcours récent + fichier isolé

## Fichiers archivés

### Ancien gestionnaire de clic « parcours récent »
Aucune de ces versions n'est chargée par une page HTML actuelle :
- `js/hibou-parcours-recent-click-v25767.js`
- `js/hibou-parcours-recent-click-v25768.js`
- `js/hibou-parcours-recent-click-v25769.js`
- `js/hibou-parcours-recent-click-v25770.js`

### Anciennes popups « parcours récent »
La version active reste `v25770`.
Sont archivées :
- `js/hibou-parcours-recent-popup-v25768.js`
- `js/hibou-parcours-recent-popup-v25769.js`

### Fichier isolé
Aucune page actuelle ne charge :
- `js/hibou-french-test-trigger-v25832.js`

Total : 7 fichiers historiques déplacés vers `docs/historique/code/js/`.

## Ressource protégée
- `js/hibou-parcours-recent-popup-v25770.js`

## Sécurité
Le script :
1. exige un dépôt Git propre ;
2. vérifie l'existence des 7 fichiers historiques ;
3. protège explicitement `hibou-parcours-recent-popup-v25770.js` ;
4. vérifie que `index.html` charge bien la popup active V25.7.70 ;
5. recherche toute référence active vers les fichiers à archiver en ignorant les commentaires ;
6. exécute `git apply --check` avant tout déplacement.

## Hors périmètre
Aucun changement du Parcours actuel V25.8.58, des ceintures, du journal,
de la synchronisation, de l'API ou du Google Sheet.
