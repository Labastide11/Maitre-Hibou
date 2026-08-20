Maître Hibou V25.8.04 — Conseil personnalisé et explicite

Le conseil de Maître Hibou s'appuie désormais sur les vraies données de l'élève :
- parcours récent ;
- résultats et difficultés récentes ;
- compétences / ceintures ;
- calcul mental ;
- questions synchronisées depuis le Google Sheet via API V2.7.4.

Le conseil donne toujours :
1. quoi faire ;
2. sur quelle compétence / quel élément du parcours ;
3. pourquoi ce choix est conseillé.

Priorités :
- difficultés répétées -> Revoir une leçon ;
- difficulté récente -> M'entraîner ;
- réussite récente >= 85 % -> Passer une ceinture ;
- calcul mental insuffisamment solide -> M'entraîner ;
- question expliquée -> Voir mes questions ;
- sinon conseil de progression cohérent.

Le vieux questionCount() local n'est plus utilisé par le nouveau conseil.
API V2.7.4 inchangée.
