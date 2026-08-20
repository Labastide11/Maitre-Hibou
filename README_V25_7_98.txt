Maître Hibou V25.7.98 — correction des icônes du bandeau matières

Cause du problème :
- le patch V25.7.97 contenait bien le nouveau module de bandeau,
  mais le ZIP n'embarquait PAS les six fichiers PNG du dossier assets/matieres.
- Selon la base utilisée, le navigateur continuait donc à afficher l'ancien bandeau.

Correction V25.7.98 :
- ajout effectif des 6 images :
  francais.png, maths.png, anglais.png, sciences.png, geographie.png, histoire.png ;
- nouveau module bottom-nav V25.7.98 ;
- le module reconstruit le bandeau si les 6 images attendues ne sont pas présentes ;
- aucune modification du fonctionnement des boutons de matières ;
- version affichée harmonisée en V25.7.98.
