# Maître Hibou V25.8.45 — correctif « Relancer l’IA »

## Bug observé

Depuis l’écran d’erreur de l’étape 2, le bouton « Relancer l’IA » rappelait `reformulate()`.
Cette fonction relisait systématiquement `qInput`, alors que ce champ n’existe plus sur l’écran d’erreur.
La valeur `state.original` était donc écrasée par une chaîne vide, ce qui déclenchait :

`Écris d’abord une question.`

## Correction

- si `qInput` existe, sa valeur alimente `state.original` ;
- si `qInput` n’existe plus, la relance conserve et réutilise `state.original`.

## Périmètre

Ce correctif répare la relance côté interface. Il ne prétend pas corriger une éventuelle absence de propositions renvoyées par l’API.
Si l’IA renvoie encore zéro proposition après ce correctif, la chaîne API devra être diagnostiquée séparément.
