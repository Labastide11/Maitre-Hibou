# Maître Hibou V25.8.47 — correctif sécurisé Calcul mental → Parcours

## Objectifs
- faire apparaître chaque calcul mental terminé dans « Mon parcours récent » ;
- afficher les traces du plus récent au plus ancien ;
- ne modifier ni Apps Script, ni les données pédagogiques existantes.

## Diagnostic
Le `index.html` appelle déjà `window.hibouFinalizeMentalRecordV25627(...)` à la fin d'un calcul mental.
Le journal actif V25.8.39 n'exposait plus cette fonction legacy : l'appel était donc simplement ignoré.

Le journal V25.8.39 possède déjà la bonne file de synchronisation V25.7.13 et déclenche
`hibouScheduleSync()` après une nouvelle trace. Le correctif ne remplace donc pas la chaîne de
synchronisation : il restaure seulement le pont manquant.

## Correctifs
1. nouveau `js/hibou-journal-eleve-v25847.js`, basé sur le journal actif V25.8.39 ;
2. restauration de `hibouFinalizeMentalRecord` et `hibouFinalizeMentalRecordV25627` ;
3. transformation du résultat de calcul mental en `entrainement_termine` / `Maths` ;
4. tri chronologique robuste des traces, y compris si une date distante est au format français ;
5. `index.html` charge désormais le journal V25.8.47.

## Sécurité d'encodage
L'installateur n'ouvre et ne réécrit aucun HTML avec `Get-Content` / `Set-Content`.
Toutes les modifications texte sont appliquées par `git apply`, après `git apply --check`.
Aucun transcodage PowerShell de `index.html` ou `boite_questions.html`.

## Hors périmètre
- aucune modification de l'API Apps Script ;
- aucune clé secrète ajoutée ;
- aucun changement de Progressions CE2 ;
- aucune suppression du journal V25.8.39.
