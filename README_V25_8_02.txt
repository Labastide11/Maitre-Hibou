Maître Hibou V25.8.02 — Mes questions : appel direct API authentifié

Correction :
- l'onglet « Mes questions » appelle directement action=student_snapshot ;
- l'appel utilise l'URL et la clé appareil déjà enregistrées dans le navigateur :
    hibou_sync_api_url_v25754
    hibou_sync_device_key_v25754
- jsonp() transmet automatiquement device_key et tablet_key ;
- le Google Sheet via API V2.7.1 reste l'unique source des questions ;
- si l'URL, la clé, le snapshot ou snapshot.questions manquent,
  l'erreur réelle est affichée au lieu d'un chargement infini.

À utiliser avec API Apps Script V2.7.1 déjà déployée.
