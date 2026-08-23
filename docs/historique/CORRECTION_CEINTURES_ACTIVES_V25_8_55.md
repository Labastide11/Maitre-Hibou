# Maître Hibou V25.8.55 — correction du moteur actif des ceintures Français

## Cause
`index.html` contient deux générations du moteur de validation Français :
- une ancienne génération basée sur `GRAMMAR_BELTS_V190`;
- une génération plus récente basée sur `GRAMMAR_BELTS_V191`.

La V25.8.54 avait corrigé la première génération, mais la seconde est déclarée plus loin
dans la page et remplace les fonctions globales utilisées à l'écran.

## Correctif V25.8.55
La logique est appliquée au moteur actif `GRAMMAR_BELTS_V191`.

Pour un élève dont la ceinture orange est déjà validée :
- blanche : étape franchie, non cliquable ;
- jaune : étape franchie, non cliquable ;
- orange : validée, repassable ;
- verte : disponible ;
- suivantes : verrouillées.

Aucun journal, sync ou API n'est modifié.
Le lot 7 de consolidation reste suspendu.
