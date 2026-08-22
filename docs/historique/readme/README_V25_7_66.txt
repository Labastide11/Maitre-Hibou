Maître Hibou V25.7.66 — correction du rechargement des médailles

Bug corrigé
- Quand un snapshot élève de moins de 60 secondes était déjà en cache, hibou-journal-eleve.js le renvoyait sans émettre `hibou:student-snapshot`.
- La carte Mes progrès / médailles attend cet événement pour charger `snapshot.competences`.
- Résultat possible : médailles vides après connexion alors que l'API et le Google Sheet contenaient les validations.

Corrections
1. Le chemin cache émet désormais exactement le même événement `hibou:student-snapshot` que le chemin réseau.
2. hibou-progres-card.js récupère aussi directement le snapshot retourné par `hibouRefreshStudent(false)` au démarrage.
3. La popup Mes progrès récupère directement le snapshot retourné par `hibouRefreshStudent(true)` à l'ouverture.
4. Version active portée à V25.7.66.

Aucun changement :
- API V2.6
- Google Sheet
- règles Bronze/Argent/Or
- données existantes
- référentiel Lecture / Compréhension / Littérature

Test de référence Aaron
Le snapshot API renvoie :
- Premiers calculs : Or puis Argent
- Ceinture blanche français : Or
- Ceinture jaune français : Or

La carte doit donc afficher les meilleures médailles sans rester vide.
