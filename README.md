# Maître Hibou

Application pédagogique CE2 — version V25.8.41.

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
