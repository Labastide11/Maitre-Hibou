Maître Hibou V25.7.92 — fermeture de la boîte à questions sans reconnexion

Bug corrigé :
- la croix de la page « Poser une question » utilisait un lien vers index.html ;
- cela rechargeait Maître Hibou dans l’onglet de la boîte à questions ;
- l’élève devait alors repasser par l’écran de connexion.

Nouveau comportement :
- si la boîte à questions a été ouverte depuis Maître Hibou, la croix ferme simplement l’onglet/fenêtre de la boîte ;
- l’onglet Maître Hibou d’origine reste intact, avec l’élève toujours connecté ;
- le bouton « Retour à Maître Hibou » après l’envoi utilise la même logique ;
- si la boîte à questions a été ouverte directement, le retour par URL reste disponible en secours.
