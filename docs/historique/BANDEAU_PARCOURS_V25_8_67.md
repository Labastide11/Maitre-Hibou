# Maître Hibou V25.8.67 — bandeau supérieur Parcours

## Modification
La carte centrale du bandeau supérieur n'affiche plus les médailles du moment.

Elle affiche désormais :
- le portrait de l'élève connecté ;
- « Prénom — Mon parcours et mes progrès » ;
- « Clique pour ouvrir ton parcours ».

## Portrait
Le portrait est choisi à partir des données déjà conservées pour l'élève connecté :
- fille -> `images/portrait_fille.png`
- garçon -> `images/portrait_garcon.png`
- invité / sexe absent -> `images/portrait_neutre.png`

## Fonctionnement
Le composant conserve l'identifiant `bandeauLastCard`.
Le mécanisme existant qui ouvre « Mon parcours et mes progrès » reste donc inchangé.

## Hors périmètre
- aucune modification du moteur Parcours ;
- aucune modification des médailles ou ceintures ;
- aucune modification API ;
- aucune modification de Progressions CE2 ;
- aucun changement de la carte Anniversaires ;
- aucune image générée.

La modification est externalisée dans :
- `css/hibou-top-parcours-v25867.css`
- `js/hibou-top-parcours-v25867.js`
