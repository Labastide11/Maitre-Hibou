# Maître Hibou V25.8.49 — classification fiable des entraînements Maths → Calcul mental

## Diagnostic confirmé sur l'index V25.8.48 réel

L'entraînement « M'entraîner > Maths > Sans retenue » ne passait pas par `hibouTrackEvent`.
À la fin des 10 calculs, `renderTrainingResult()` appelait l'ancien pont
`hibouRecordTrainingSuccessV25221('maths', ...)`.

Cela expliquait pourquoi les heuristiques de V25.8.48 ne pouvaient pas garantir la
classification `calcul_mental`.

## Correctif

Tous les entraînements du module Maths de 10 calculs envoient désormais directement un
événement canonique au journal :

- `type: entrainement_termine`
- `matiere: Maths`
- `domaine: Calcul mental`
- `source: calcul_mental`
- score / total / temps
- ceinture / skill_id

La trace est donc reconnue par « Mes progrès > Calcul mental » indépendamment du libellé :
« Petits nombres », « Dizaines », « Sans retenue », « Avec retenue », tables, etc.

Le pont historique reste uniquement en solution de repli si `hibouTrackEvent` n'est pas
disponible.

## Sécurité

- patch construit à partir de l'`index.html` V25.8.48 réellement fourni ;
- aucune modification Apps Script ;
- aucun changement de `hibou-parcours-progres-v25848.js` ;
- aucun changement de `hibou-journal-eleve-v25847.js` ;
- application par `git apply --check` puis `git apply` ;
- aucun HTML relu/réécrit par PowerShell.
