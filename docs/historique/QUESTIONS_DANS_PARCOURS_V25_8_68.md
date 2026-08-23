# Maître Hibou V25.8.68 — questions dans Mon parcours récent

## Objectif
Une question réellement enregistrée dans la Boîte à questions devient maintenant une trace du parcours de l'élève.

## Exemple d'affichage attendu
Titre :
`Bravo Hiba pour ta question !`

Détail :
`Le maître va l’étudier. « Qui était Neil Armstrong ? »`

## Déclenchement
La trace n'est créée qu'après le succès réel de `appendQuestion`.

La page `boite_questions.html` envoie déjà un événement `hibou_question_posee`.
La V25.8.68 ajoute seulement le pont manquant côté page principale :
- réception par `postMessage` ;
- récupération via `localStorage` si le message a été manqué ;
- appel du journal canonique `hibouTrackEvent`.

## Anti-doublon
Le même `event_id` n'est enregistré qu'une seule fois, même si la notification arrive
à la fois par message, stockage et retour de focus.

## Hors périmètre
- aucun changement de l'API Questions ;
- aucun changement du Google Sheet ;
- aucun changement de Progressions CE2 ;
- aucun changement des onglets « Mes questions » ;
- aucun changement des ceintures, médailles ou calcul mental.

Nouveau module :
`js/hibou-question-parcours-v25868.js`
