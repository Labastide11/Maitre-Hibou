Maître Hibou V25.8.39 — raccordement LSU des ceintures françaises

Correctif ciblé :
- index.html charge explicitement js/hibou-journal-eleve-v25839.js et js/hibou-sync-v25839.js ;
- le producteur réel des ceintures françaises appelle uniquement hibouTrackEvent pour une trace canonique ;
- suppression du repli silencieux vers l'ancien journal V25.8.08 qui perdait competence_code et les champs LSU ;
- version synchronisée envoyée : V25.8.39 ;
- champs attendus pour une ceinture codable : competence_code, competence_label, exercise_types, help_used=0, challenge_score, challenge_total, mastery_status=reussi_seul, learning_session_id ;
- le rythme immédiat des questions et le bilan final V25.8.38 sont conservés.

Test attendu avec la ceinture verte « Reconnaître un nom » :
competence_code = GRA-P2-01
competence_label = Reconnaître un nom commun
help_used = 0
challenge_score = score / 20
mastery_status = reussi_seul
version = V25.8.39
