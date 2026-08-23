# Maître Hibou

Application pédagogique CE2 — version V25.8.46.

## Version stable

Cette version correspond à une phase de consolidation sans changement fonctionnel.

## Architecture

- `index.html` : entrée principale de l'application.
- `js/` : modules JavaScript actifs et historiques encore en place.
- `css/` : styles actifs et historiques encore en place.
- `lecons/`, `bibliotheque_lecons/`, `bibliotheque_math/` : ressources pédagogiques.
- `docs/historique/readme/` : anciens README de versions archivés.

## Règles de maintenance

- Ne pas modifier une liaison API ou élève sans vérifier la compatibilité avec Progressions CE2.
- Conserver le numéro exact de version dans la balise `<title>` de la page principale.
- Archiver l'historique plutôt que le supprimer sans audit préalable.

## V25.8.41

- Archivage des README historiques.
- Aucun module JS/CSS actif déplacé.
- Aucun changement API, synchronisation, données élèves ou logique pédagogique.


### Audit V25.8.41

- Audit détaillé des générations JS/CSS historiques.
- Aucun déplacement ni suppression de code actif.


### Correctif V25.8.42

- Centralisation fonctionnelle du titre/version affiché : les réécritures runtime utilisent désormais V25.8.42.
- Les mentions V25.8.39 conservées correspondent uniquement à l'historique LSU ou aux versions réelles des modules chargés.


### Consolidation V25.8.43

- Premier archivage réel de code historique.
- Anciennes générations `hibou-advice` V25.8.04 à V25.8.07 archivées.
- Ancienne génération `hibou-home-title` V25.8.06 archivée.
- Les versions actives restent en place : `hibou-advice-v25815` et `hibou-home-title-v25807`.


### Consolidation V25.8.44

- Deuxième lot d'archivage de code historique.
- Anciennes générations `hibou-question-modal` archivées.
- La version active `hibou-question-modal-v25807` reste en place.


### Correctif V25.8.45

- Correction du bouton « Relancer l’IA » dans la boîte à questions.
- Lors d’une relance depuis l’écran d’erreur, la question initiale conservée dans `state.original` est réutilisée.
- Le correctif n’altère ni l’API ni la logique de sauvegarde des questions.

### Consolidation V25.8.46

- Troisième lot d’archivage de code historique.
- Anciennes générations `hibou-learning-engine` V25.8.09, V25.8.10, V25.8.11, V25.8.16, V25.8.17 et V25.8.18 archivées (JS + CSS).
- La version active `hibou-learning-engine-v25822.js` / `.css` reste en place.
- Le script d’application refuse de continuer si un ancien fichier est encore référencé par une ressource active.
- Aucun changement API, synchronisation, données élèves ou logique pédagogique.
