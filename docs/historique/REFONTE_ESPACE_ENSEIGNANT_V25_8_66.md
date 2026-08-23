# Maître Hibou V25.8.66 — refonte/consolidation de enseignant.html

## Architecture retenue
Maître Hibou enseignant :
- Questions des élèves
- Synchronisation
- Réglages Hibou

Progressions CE2 :
- Élèves
- suivi pédagogique
- parcours
- évaluations
- accompagnements
- référentiel
- synthèses

## Modifications de enseignant.html
- suppression du discours historique « suivi élèves / récompenses / progressions » ;
- trois cartes seulement : Questions, Synchronisation, Réglages Hibou ;
- bouton externe direct vers Progressions CE2, sans iframe ni duplication ;
- conservation de `hibou-sync-v25754.js`, toujours nécessaire à cette page ;
- « Actualiser les élèves » renommé « Actualiser le cache élèves » pour clarifier qu'il s'agit d'une opération technique et non d'un outil de gestion pédagogique ;
- accès aux questions protégées conservé.

## Hors périmètre
- aucun changement du fonctionnement élève ;
- aucun changement de Progressions CE2 ;
- aucune modification API ;
- aucune modification du journal ou du moteur de synchronisation.

## Point restant
La page Google protégée ouverte par « Questions des élèves » contient encore son ancien tableau de bord historique.
Cette V25.8.66 consolide `enseignant.html` uniquement. Un nettoyage séparé du HTML Apps Script pourra supprimer
les anciens onglets Suivi / Récompenses / Progressions si souhaité.
