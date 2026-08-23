# Maître Hibou V25.8.57 — tracer toutes les tentatives de ceinture dans Parcours

## Règle pédagogique
Une tentative de ceinture fait partie du parcours de l'élève, même lorsqu'elle n'atteint
pas le seuil de validation de 15/20.

## Comportement
### Score de 15/20 ou plus
Le fonctionnement existant est conservé :
- ceinture validée ;
- médaille Bronze / Argent / Or ;
- progression de ceinture mise à jour ;
- trace dans le Parcours et synchronisation vers le Sheet.

### Score inférieur à 15/20
La ceinture n'est PAS validée et ne débloque pas le niveau suivant.
En revanche une trace est créée :
- type : `ceinture_tentee`
- résultat : `a_reprendre`
- score réel sur 20 ;
- compétence / ceinture concernée ;
- statut pédagogique : `a_reprendre`.

Exemple :
`Ceinture vert clair Maths — à reprendre`
`Avec retenue — 12/20 — À reprendre`

## Matières concernées
- Français
- Maths

## Sécurité
Aucun fichier journal ou sync n'est modifié.
Aucun changement API.
Le lot 7 de consolidation journal/synchronisation reste suspendu.
