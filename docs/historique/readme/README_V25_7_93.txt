Maître Hibou V25.7.93 — Boîte à questions en popup intégrée

Périmètre volontairement limité au mécanisme d'ouverture/fermeture.

Ce qui change :
- « Poser une question » ouvre désormais boite_questions.html dans une popup modale au-dessus de Maître Hibou ;
- la page principale Maître Hibou reste chargée et la session élève reste intacte ;
- la croix de la popup ferme uniquement la popup ;
- le bouton « Retour à Maître Hibou » dans boite_questions.html demande également la fermeture de la popup ;
- la transmission des événements question vers la page principale via postMessage est conservée ;
- Apps Script, API et Google Sheet ne sont pas modifiés ;
- un secours par ouverture séparée reste prévu si l'iframe ne peut pas être utilisée.

Fichiers :
- index.html
- boite_questions.html
- css/hibou-question-modal-v25793.css
- js/hibou-question-modal-v25793.js
