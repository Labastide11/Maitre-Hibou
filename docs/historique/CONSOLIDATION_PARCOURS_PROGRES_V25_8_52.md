# Maître Hibou V25.8.52 — consolidation code historique, lot 5 : hibou-parcours-progres

## Ressources actives conservées
- `js/hibou-parcours-progres-v25850.js`
- `css/hibou-parcours-progres-v25825.css`
- `css/hibou-parcours-progres-v25784.css`

`v25784.css` reste actif car `v25825.css` l'importe encore.

## Archivage
- 29 anciens JS
- 26 anciens CSS
- total : 55 fichiers historiques

Le JS `v25825.js` peut désormais être archivé car l'application charge le module
`v25850.js` pour « Mes progrès ». Les deux CSS actifs restent en place.

## Sécurité
Le script vérifie le dépôt Git, les références actives, l'import CSS critique,
l'absence de références vers les fichiers à archiver et exécute `git apply --check`
avant toute modification. Aucun HTML n'est réécrit par PowerShell.
