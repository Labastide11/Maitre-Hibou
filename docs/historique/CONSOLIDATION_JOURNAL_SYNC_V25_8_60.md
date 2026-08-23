# Maître Hibou V25.8.60 — consolidation lot 7 : journal élève + synchronisation

## Base
Cette consolidation s'appuie sur l'audit ciblé V25.8.59, qui a confirmé :

- journal élève actif dans l'application : `js/hibou-journal-eleve-v25847.js`
- synchronisation active dans l'application : `js/hibou-sync-v25839.js`
- synchronisation encore active dans `enseignant.html` : `js/hibou-sync-v25754.js`

L'audit V25.8.59 n'a trouvé aucune référence active vers les six fichiers historiques ci-dessous.

## Fichiers archivés
### Journal élève
- `js/hibou-journal-eleve-v25808.js`
- `js/hibou-journal-eleve-v25834.js`
- `js/hibou-journal-eleve-v25836.js`
- `js/hibou-journal-eleve-v25839.js`

### Synchronisation
- `js/hibou-sync-v25808.js`
- `js/hibou-sync-v25836.js`

Total : 6 fichiers déplacés vers `docs/historique/code/js/`.

## Fichiers protégés
- `js/hibou-journal-eleve-v25847.js`
- `js/hibou-sync-v25839.js`
- `js/hibou-sync-v25754.js`

## Sécurité
Le script :
1. exige un dépôt Git propre ;
2. vérifie l'existence des six fichiers à archiver ;
3. vérifie l'existence des trois fichiers protégés ;
4. contrôle que `index.html` charge bien journal V25.8.47 et sync V25.8.39 ;
5. contrôle que `enseignant.html` charge bien sync V25.7.54 ;
6. recherche toute référence active vers les six fichiers historiques en ignorant les commentaires ;
7. vérifie que les deux files locales du contrat journal/sync sont toujours présentes ;
8. exécute `git apply --check` avant tout déplacement.

## Hors périmètre
Aucun changement fonctionnel du journal, de la synchronisation, du Parcours,
des ceintures, de l'API ou du Google Sheet.
