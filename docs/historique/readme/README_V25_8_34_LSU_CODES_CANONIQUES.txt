Maître Hibou V25.8.34 — raccordement réel aux compétences canoniques pour le LSU

Objectif
- Rendre les nouvelles traces Maître Hibou exploitables comme source C du moteur LSU.
- Ne jamais inventer un code lorsque l'activité est trop large ou ambiguë.
- Ne modifier ni les anciennes traces Google Sheets, ni les règles des ceintures.

Architecture retenue
- Nouveau journal central : js/hibou-journal-eleve-v25834.js
- Le journal enrichit les événements AVANT leur enregistrement local et leur mise en file de synchronisation.
- hibou-sync-v25808.js transporte déjà les champs nécessaires jusqu'à l'API :
  competence_code, competence_label, exercise_types, help_used,
  challenge_score, challenge_total, mastery_status, learning_session_id.
- L'API Apps Script V2.8.1 sait déjà les enregistrer : aucune modification API requise.

Correspondances exactes ajoutées
Français / ceintures de grammaire :
- grammaire_blanche_phrase_negative -> GRA-P1-02
- grammaire_jaune_verbe -> GRA-P1-04
- grammaire_orange_sujet -> GRA-P1-06
- grammaire_verte_nom -> GRA-P2-01
- grammaire_bleue_determinant -> GRA-P3-01
- grammaire_marron_infinitif -> GRA-P1-05
- grammaire_noire_adjectif -> GRA-P3-02
- grammaire_rouge_groupe_nominal -> GRA-P3-03

Maths / ceintures de calcul, uniquement quand la correspondance est certaine :
- maths_blanche_petits_nombres -> CAL-P1-01
- maths_vert_fonce_complement_dizaine -> CAL-P1-02
- maths_bleu_clair_plus_moins_9 -> CAL-P1-03
- maths_beige_complement_centaine -> CAL-P1-02
- maths_violet_tables_1_2_10 -> CAL-P3-01
- maths_marron_tables_3_4_5 -> CAL-P3-01
- maths_rouge_tables_6_7 -> CAL-P3-01
- maths_gris_tables_8_9 -> CAL-P3-01

Volontairement NON mappés automatiquement
- Ceintures maths « Dizaines », « Sans retenue », « Avec retenue », « +11/-11 », « Centaines » : elles mélangent des procédures qui ne correspondent pas proprement à un seul code canonique actuel.
- Ceinture noire : le générateur actuel rebrasse plusieurs familles de calculs ; on ne la force donc pas vers CAL-P2-02.
- Séances globales Anglais / Sciences / Géographie / Histoire : une séance peut couvrir plusieurs compétences ; pas de code unique artificiel.
- Vocabulaire / orthographe génériques : pas de rattachement sans compétence explicite.

Statut de maîtrise
- Ceinture validée avec correspondance exacte : mastery_status = reussi_seul ; help_used = 0 ; score de défi conservé ; session distincte créée.
- Entraînement formatif avec correspondance exacte : reussi_avec_aide si >=70 %, sinon a_renforcer. Cette qualification reste volontairement plus prudente qu'une ceinture.
- Les traces du moteur d'apprentissage déjà codées (LEC/COM/LIT) restent inchangées et prioritaires.

Compatibilité
- Les anciennes traces restent intactes.
- Aucun rétro-mapping n'est appliqué au Google Sheet.
- Les ceintures continuent de fonctionner comme avant ; seul l'événement enregistré est enrichi.
- Aucun changement de l'API Apps Script n'est nécessaire.
