# Audit parcours → LSU — Maître Hibou V25.8.34

## Chaîne active vérifiée

`activité → hibouTrackEvent / hibouTrackLearningActivity → hibou-journal-eleve → file locale → hibou-sync-v25808 → Apps Script → parcours_eleves → student_snapshot`

Le synchroniseur actif transmet déjà les huit champs pédagogiques nécessaires. Le défaut observé lors du test Adam venait donc de la création des événements : les anciennes ceintures avaient bien `score`, `total` et `source`, mais pas `competence_code`, `competence_label`, `mastery_status` ni `learning_session_id`.

## Producteurs actifs audités

- Ceintures Français : événements `ceinture_validee`, via `hibouRecordSuccess` / `hibouFrenchTrackV25717`.
- Ceintures Maths : événements `ceinture_validee`, via `hibouTrackEvent`.
- Entraînements Français / Maths : journalisés via les helpers historiques et le journal central.
- Lecture-compréhension : moteur V25.8.22 + activité V25.8.33 ; les traces sont déjà riches et codées.
- Anglais / Sciences / Géographie / Histoire : événements de fin de séance globaux ; ils restent non canoniques tant qu'une séance n'émet pas une trace par compétence.
- Vivre ensemble : événement global, volontairement non transformé en preuve LSU académique.

## Règle de sécurité

Le mapping ne porte que sur les ceintures dont le contenu correspond de façon suffisamment certaine à une compétence canonique. Les autres événements sont conservés, visibles dans le parcours, mais ne deviennent pas artificiellement une source C d'une compétence LSU.

## Tests V25.8.34

- Ceinture maths Tables ×1 ×2 ×10 → `CAL-P3-01`, `reussi_seul`, aide 0, défi 17/20, session créée.
- Ceinture français Trouver le sujet → `GRA-P1-06`, `reussi_seul`, aide 0, session créée.
- Ceinture maths Dizaines → reste sans code (ambiguïté assumée).
- Trace déjà codée `LEC-P1-01` → code et statut conservés sans écrasement.
