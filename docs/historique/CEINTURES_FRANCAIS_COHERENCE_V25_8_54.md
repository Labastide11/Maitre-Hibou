# Maître Hibou V25.8.54 corrigée — cohérence des ceintures Français

## Problème observé
Un élève ayant déjà validé une ceinture supérieure pouvait encore lancer une ceinture
inférieure. Exemple constaté : ceinture orange validée, mais ceinture blanche encore
proposée comme « Tu es prêt ».

## Correctif
La disponibilité des ceintures Français se base désormais sur le niveau le plus élevé
déjà validé dans la progression locale.

Règles :
- une ceinture réellement validée reste affichée comme validée et peut être repassée
  pour améliorer la médaille ;
- une ceinture inférieure non enregistrée explicitement mais située sous le niveau
  déjà atteint est affichée « Étape franchie » et devient non cliquable ;
- seule la prochaine ceinture après le niveau le plus élevé est disponible ;
- les suivantes restent verrouillées.

Exemple avec une ceinture orange validée :
- blanche : étape franchie ;
- jaune : étape franchie ;
- orange : validée, repassable ;
- verte : prête ;
- bleue et suivantes : verrouillées.

## Hors périmètre
Aucun fichier journal ou synchronisation n'est déplacé.
Aucun changement API.
Le lot 7 de consolidation journal/synchronisation reste suspendu.
