# Maître Hibou V25.8.59 — audit ciblé du lot 7 : journal élève + synchronisation

## Nature de cette version
Audit uniquement. Aucun fichier journal ou synchronisation n'est déplacé, supprimé ou modifié.

## Chaîne active confirmée dans l'application principale

### Journal
`index.html` charge :
- `js/hibou-journal-eleve-v25847.js`

Cette version expose notamment :
- `window.hibouTrackEvent`
- `window.hibouGetEventHistory`
- `window.hibouLoadStudentSnapshot`
- `window.hibouTrackLearningActivity`
- `window.hibouFinalizeMentalRecordV25627`

Lorsqu'un événement est suivi par `hibouTrackEvent`, il est :
1. normalisé ;
2. enregistré dans l'historique local ;
3. ajouté à la file `hibou_journal_queue_v25713` ;
4. transmis au moteur de synchronisation via `window.hibouScheduleSync()`.

Pour les records de calcul mental, la file utilisée est :
- `hibou_records_calcul_queue_v25713`

### Synchronisation principale
`index.html` charge :
- `js/hibou-sync-v25839.js`

Cette version :
- lit `hibou_journal_queue_v25713` ;
- lit `hibou_records_calcul_queue_v25713` ;
- envoie les événements vers `parcours_eleves` ;
- envoie les records vers `records_calcul` ;
- attend un accusé `sync_ack` avant de retirer les événements de la file locale ;
- expose `window.hibouScheduleSync` et `window.hibouSyncNow`.

Le contrat entre `journal v25847` et `sync v25839` est donc cohérent : mêmes clés de files locales.

## Espace enseignant
`enseignant.html` charge encore :
- `js/hibou-sync-v25754.js`

Cette version doit rester protégée tant que `enseignant.html` n'a pas été migré.

## Comparaison sync v25754 / v25839
Les deux versions utilisent les mêmes files locales et la même mécanique d'accusé de réception.

`v25839` ajoute cependant aux lignes `parcours_eleves` les champs pédagogiques :
- `competence_code`
- `competence_label`
- `exercise_types`
- `help_used`
- `challenge_score`
- `challenge_total`
- `mastery_status`
- `learning_session_id`

La version `v25839` doit donc rester active dans l'application élève.

## Journal v25839 / v25847
`v25847` reprend le journal `v25839` et ajoute principalement :
- un tri chronologique robuste ;
- le pont `hibouFinalizeMentalRecordV25627` vers le journal canonique.

`v25839` est donc supersédé dans l'application principale par `v25847`.

## Fichiers historiques actuellement sans rôle runtime identifié
Candidats à l'archivage lors d'un prochain lot, sous réserve du contrôle automatique final :
- `js/hibou-journal-eleve-v25808.js`
- `js/hibou-journal-eleve-v25834.js`
- `js/hibou-journal-eleve-v25836.js`
- `js/hibou-journal-eleve-v25839.js`
- `js/hibou-sync-v25808.js`
- `js/hibou-sync-v25836.js`

## Point important sur l'incident V25.8.54
L'audit du code de validation des ceintures montre que l'absence de trace observée ne
nécessite pas une ancienne version du journal ou de la synchronisation.

À ce moment-là, les traces de ceinture étaient émises seulement dans les branches de
validation réussie. Les tentatives sous 15/20 n'étaient pas envoyées au journal.
Ce comportement a ensuite été corrigé en V25.8.57.

Conclusion : aucun lien technique n'a été trouvé entre cet incident et l'archivage des
anciens fichiers `journal` / `sync`.

## Conclusion de l'audit
Chaîne à conserver :
- application élève : `journal v25847` + `sync v25839`
- espace enseignant : `sync v25754`

Le prochain nettoyage peut donc être limité aux 6 fichiers historiques ci-dessus,
sans toucher aux trois ressources actives.
