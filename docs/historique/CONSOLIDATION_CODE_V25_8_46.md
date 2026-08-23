# Maître Hibou V25.8.46 — consolidation code historique, lot 3

## Famille traitée

`hibou-learning-engine`

L’audit V25.8.41 classait comme **active** :
- `js/hibou-learning-engine-v25822.js`
- `css/hibou-learning-engine-v25822.css`

Et comme **historiques / candidats à l’archivage** :
- JS : V25.8.09, V25.8.10, V25.8.11, V25.8.16, V25.8.17, V25.8.18
- CSS : V25.8.09, V25.8.10, V25.8.11, V25.8.16, V25.8.17, V25.8.18

## Principe de sécurité du patch

Avant de modifier le dépôt, le script :
1. vérifie que Git est propre ;
2. vérifie que les 12 fichiers historiques existent encore ;
3. vérifie que les deux fichiers V25.8.22 actifs existent ;
4. recherche toute référence aux 12 anciens fichiers dans les ressources actives du dépôt, en excluant `docs/historique` ;
5. s’arrête immédiatement si une référence inattendue est détectée.

Les fichiers historiques sont ensuite **déplacés**, jamais détruits, vers :
`docs/historique/code/js/` et `docs/historique/code/css/`.

## Hors périmètre

Aucun changement :
- API ;
- synchronisation ;
- données élèves ;
- parcours / médailles / compétences ;
- logique pédagogique ;
- version active du moteur d’apprentissage.
