Maître Hibou V25.8.01 — Mes questions utilise l'authentification existante

Correction principale :
- suppression de l'appel student_snapshot autonome du module « Mon parcours et mes progrès » ;
- utilisation prioritaire de window.hibouStudentSystem.loadSnapshot(...),
  c'est-à-dire le système élève déjà utilisé par Maître Hibou pour les médailles,
  ceintures, réussites et parcours ;
- ce système possède déjà l'URL Apps Script et la clé appareil de la tablette ;
- aucun champ de clé n'est demandé à l'élève.

Mes questions :
- Google Sheet via API V2.7.1 reste la seule source d'affichage ;
- rafraîchissement forcé à l'ouverture de l'onglet ;
- plus de chargement infini : en cas d'échec, un message explicite et un bouton
  « Réessayer » sont affichés.

À utiliser avec API Apps Script V2.7.1 déjà déployée.
