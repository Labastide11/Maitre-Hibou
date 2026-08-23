# Maître Hibou V25.8.54 — consolidation code historique, lot 7 : journal élève + synchronisation

## Ressources actives protégées

### Journal élève
- `js/hibou-journal-eleve-v25847.js` — actif dans `index.html`

### Synchronisation
- `js/hibou-sync-v25839.js` — actif dans `index.html`
- `js/hibou-sync-v25754.js` — encore actif dans `enseignant.html`

## Fichiers historiques archivés
Journal élève :
- `hibou-journal-eleve-v25808.js`
- `hibou-journal-eleve-v25834.js`
- `hibou-journal-eleve-v25836.js`
- `hibou-journal-eleve-v25839.js`

Synchronisation :
- `hibou-sync-v25808.js`
- `hibou-sync-v25836.js`

Total : 6 fichiers déplacés vers `docs/historique/code/js/`.

## Pourquoi V25.8.39 du journal peut être archivée
Depuis V25.8.47, `index.html` charge `hibou-journal-eleve-v25847.js`.
La V25.8.39 du journal n'est donc plus la version active.

## Sécurité
Le script :
1. exige un dépôt Git propre ;
2. vérifie les 6 fichiers historiques ;
3. protège explicitement `journal v25847`, `sync v25839` et `sync v25754` ;
4. vérifie `index.html` et `enseignant.html` ;
5. ignore les simples mentions historiques placées dans les commentaires ;
6. bloque toute vraie référence active vers un fichier à archiver ;
7. exécute `git apply --check` avant toute modification ;
8. ne réécrit aucun HTML via PowerShell.

Aucun changement de logique du journal, de synchronisation, de l'API,
du Parcours ou du calcul mental.
