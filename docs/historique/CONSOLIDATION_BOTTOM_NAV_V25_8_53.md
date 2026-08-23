# Maître Hibou V25.8.53 — consolidation code historique, lot 6 : hibou-bottom-nav

## Famille traitée
`hibou-bottom-nav`

L'audit V25.8.41 identifiait :
- actif CSS : `hibou-bottom-nav-v25807.css`
- actif JS : `hibou-bottom-nav-v25807.js`
- historiques : 11 anciennes versions CSS et 11 anciennes versions JS

## Archivage V25.8.53
- 11 anciens CSS
- 11 anciens JS
- total : 22 fichiers déplacés vers `docs/historique/code/`

## Ressources actives conservées
- `css/hibou-bottom-nav-v25807.css`
- `js/hibou-bottom-nav-v25807.js`

## Sécurité
Le script :
1. exige un dépôt Git propre ;
2. vérifie les 22 fichiers historiques ;
3. protège explicitement les deux fichiers actifs V25.8.07 ;
4. vérifie que `index.html` charge encore V25.8.07 JS + CSS ;
5. recherche toute référence active vers une ancienne version ;
6. lance `git apply --check` avant toute modification ;
7. ne réécrit aucun HTML avec PowerShell.

Aucun changement fonctionnel de navigation n'est introduit.
Aucun changement de l'API, de Mes progrès, du Parcours ou du calcul mental.
