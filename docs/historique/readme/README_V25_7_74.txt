Maître Hibou V25.7.74 — stabilisation du bandeau inférieur

Cause corrigée :
- Le moteur historique de Maître Hibou surveille `.subject-btn` et impose exactement 6 boutons de matières.
- V25.7.73 avait ajouté « Grandir ensemble » et « Outils » avec cette même classe.
- Le moteur les supprimait donc périodiquement, puis le patch les recréait : le bandeau s'agrandissait et se rétrécissait.

Correction :
- « Grandir ensemble » et « Outils » ne sont plus des `.subject-btn`.
- Le moteur des 6 matières ne les touche plus.
- Hauteur du bandeau et des 8 boutons verrouillée.
- Suppression des transformations de taille sur hover/état actif dans ce bandeau.

Aucune modification des fonctions pédagogiques, de l'API ou du Google Sheet.
