# MaÃ®tre Hibou

Application pÃ©dagogique CE2 â€” version V25.8.47.

## Version stable

Cette version correspond Ã  une phase de consolidation sans changement fonctionnel.

## Architecture

- `index.html` : entrÃ©e principale de l'application.
- `js/` : modules JavaScript actifs et historiques encore en place.
- `css/` : styles actifs et historiques encore en place.
- `lecons/`, `bibliotheque_lecons/`, `bibliotheque_math/` : ressources pÃ©dagogiques.
- `docs/historique/readme/` : anciens README de versions archivÃ©s.

## RÃ¨gles de maintenance

- Ne pas modifier une liaison API ou Ã©lÃ¨ve sans vÃ©rifier la compatibilitÃ© avec Progressions CE2.
- Conserver le numÃ©ro exact de version dans la balise `<title>` de la page principale.
- Archiver l'historique plutÃ´t que le supprimer sans audit prÃ©alable.

## V25.8.41

- Archivage des README historiques.
- Aucun module JS/CSS actif dÃ©placÃ©.
- Aucun changement API, synchronisation, donnÃ©es Ã©lÃ¨ves ou logique pÃ©dagogique.


### Audit V25.8.41

- Audit dÃ©taillÃ© des gÃ©nÃ©rations JS/CSS historiques.
- Aucun dÃ©placement ni suppression de code actif.


### Correctif V25.8.42

- Centralisation fonctionnelle du titre/version affichÃ© : les rÃ©Ã©critures runtime utilisent dÃ©sormais V25.8.42.
- Les mentions V25.8.39 conservÃ©es correspondent uniquement Ã  l'historique LSU ou aux versions rÃ©elles des modules chargÃ©s.


### Consolidation V25.8.43

- Premier archivage rÃ©el de code historique.
- Anciennes gÃ©nÃ©rations `hibou-advice` V25.8.04 Ã  V25.8.07 archivÃ©es.
- Ancienne gÃ©nÃ©ration `hibou-home-title` V25.8.06 archivÃ©e.
- Les versions actives restent en place : `hibou-advice-v25815` et `hibou-home-title-v25807`.


### Consolidation V25.8.44

- DeuxiÃ¨me lot d'archivage de code historique.
- Anciennes gÃ©nÃ©rations `hibou-question-modal` archivÃ©es.
- La version active `hibou-question-modal-v25807` reste en place.


### Correctif V25.8.45

- Correction du bouton Â« Relancer lâ€™IA Â» dans la boÃ®te Ã  questions.
- Lors dâ€™une relance depuis lâ€™Ã©cran dâ€™erreur, la question initiale conservÃ©e dans `state.original` est rÃ©utilisÃ©e.
- Le correctif nâ€™altÃ¨re ni lâ€™API ni la logique de sauvegarde des questions.

### Consolidation V25.8.47

- TroisiÃ¨me lot dâ€™archivage de code historique.
- Anciennes gÃ©nÃ©rations `hibou-learning-engine` V25.8.09, V25.8.10, V25.8.11, V25.8.16, V25.8.17 et V25.8.18 archivÃ©es (JS + CSS).
- La version active `hibou-learning-engine-v25822.js` / `.css` reste en place.
- Le script dâ€™application refuse de continuer si un ancien fichier est encore rÃ©fÃ©rencÃ© par une ressource active.
- Aucun changement API, synchronisation, donnÃ©es Ã©lÃ¨ves ou logique pÃ©dagogique.

