Maître Hibou V25.8.08 — fondation trace pédagogique standard

Cette version prépare le futur moteur commun d'exercices.

Champs ajoutés à chaque activité d'apprentissage :
competence_code, competence_label, exercise_types, help_used,
challenge_score, challenge_total, mastery_status, learning_session_id.

Nouveau helper :
window.hibouTrackLearningActivity({...})

Chaîne conservée :
activité -> journal local -> file d'attente -> API -> Google Sheet -> snapshot/parcours.

Les codes LEC/COM/LIT restent internes et ne sont pas affichés à l'élève.
Les anciennes traces restent compatibles.
