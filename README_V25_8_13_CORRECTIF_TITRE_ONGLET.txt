Maître Hibou V25.8.13 — correctif définitif du titre de l'onglet

Cause identifiée :
plusieurs anciens blocs inline continuaient à exécuter document.title =
« Maître Hibou V25.8.08 » après le chargement de la page.

Correction :
- <title> = Maître Hibou V25.8.13 ;
- version visible de connexion = V25.8.13 ;
- anciennes écritures inline de document.title harmonisées ;
- ajout d'un MutationObserver sur la balise <title> ;
- si un ancien module tente encore de modifier le titre, V25.8.13 est restauré
  immédiatement ;
- un seul propriétaire final : hibouEnforceVersionV25813.

Le moteur Lecture P1 et les traces pédagogiques restent inchangés.
