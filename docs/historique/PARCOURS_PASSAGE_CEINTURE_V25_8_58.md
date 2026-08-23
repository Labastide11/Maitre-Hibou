# Maître Hibou V25.8.58 — distinguer clairement les passages de ceinture dans Parcours

## Objectif pédagogique
Une tentative de ceinture n'est pas un entraînement ordinaire : c'est un passage de
compétence. Le Parcours doit permettre à l'élève de faire immédiatement la différence.

## Nouveau rendu
Chaque événement de ceinture dispose d'une ligne dédiée :

- icône 🎗️ ;
- titre commençant par « Passage de ceinture — … » ;
- mention explicite « Compétence » dans les métadonnées ;
- ceinture et matière affichées ;
- score présenté dans une pastille dédiée ;
- badge d'état à droite.

### Tentative non validée
Badge orange : `À reprendre`

### Ceinture validée
Badge vert : `Ceinture validée`, avec la médaille lorsqu'elle est disponible.

## Exemple
`Passage de ceinture — Reconnaître un nom commun`
`23/08/2026 à 16:21 · Ceinture verte · Français · Compétence`
`Score 5/20`                                      `À reprendre`

## Hors périmètre
La mécanique V25.8.57 qui enregistre toutes les tentatives est conservée.
Aucun changement journal, synchronisation, API ou Google Sheet.
