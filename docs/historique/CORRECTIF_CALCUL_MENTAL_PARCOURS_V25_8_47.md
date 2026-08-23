# Maître Hibou V25.8.47 — correctif Calcul mental → Parcours

Correctif de l'installateur précédent : le premier script utilisait un contrôle PowerShell
trop rigide sur la forme exacte de `eventParams`. Il s'est arrêté avant toute modification.

Cette version :
- fournit directement le nouveau journal V25.8.47 validé syntaxiquement ;
- conserve le journal V25.8.39 ;
- ajoute l'authentification aux anciennes écritures JSONP du parcours et des records,
  sans embarquer de clé secrète ;
- enrichit la trace Parcours ;
- trie le parcours du plus récent au plus ancien ;
- ne modifie pas Apps Script.
