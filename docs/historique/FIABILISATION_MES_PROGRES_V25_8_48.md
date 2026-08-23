# Maître Hibou V25.8.48 — fiabilisation Mes progrès

## Audit à l'origine du correctif

`records_calcul` n'est pas un historique : l'API conserve un record par élève + ceinture et ne
remplace la ligne que si le nouveau résultat est meilleur. Il ne peut donc pas servir de source
fiable pour « Mon dernier score ».

Le snapshot élève renvoie déjà deux sources distinctes :
- `reussites` : historique `parcours_eleves` ;
- `records` : meilleurs résultats `records_calcul`.

La popup V25.8.25 mélangeait ces sources dans `calcRecords()` et utilisait ensuite la première
ligne comme « dernier score ». Elle utilisait aussi uniquement le journal local pour le Parcours.

## V25.8.48

- le Parcours fusionne journal local + `latestSnapshot.reussites` ;
- dédoublonnage par `event_id` / `id_evenement`, puis clé de secours ;
- tri par timestamp réel, avec prise en charge du format `jj/mm/aaaa à hh:mm` ;
- dernier calcul mental = dernière trace `calcul_mental` du Parcours ;
- meilleur score / meilleur temps = `latestSnapshot.records`, avec le dernier essai local comme
  candidat temporaire avant la prochaine synchronisation ;
- la popup se rerend dès que `student_snapshot` a été reçu ;
- aucun changement côté Apps Script.

## Test fonctionnel attendu

1. ouvrir un élève sans calcul mental récent : état vide cohérent ;
2. effectuer un calcul mental ;
3. ouvrir Mes progrès > Calcul mental : « Mon dernier score » correspond au dernier essai ;
4. ouvrir Parcours : le calcul est en première position ;
5. recharger la page puis rouvrir Mes progrès : le dernier essai reste visible grâce au snapshot Sheet ;
6. vérifier qu'un essai moins bon que le record reste « dernier score » sans écraser « meilleur score ».
