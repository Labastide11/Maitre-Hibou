# Maître Hibou V25.8.51 — consolidation code historique, lot 4

## Famille traitée
`hibou-lecture-comprehension`

L'audit V25.8.41 identifiait comme actifs :
- `css/hibou-lecture-comprehension-v25833.css`
- `js/hibou-lecture-comprehension-v25833.js`

Et comme historiques / candidats à l'archivage :
- CSS : V25.8.22, V25.8.26, V25.8.27, V25.8.28
- JS : V25.8.22, V25.8.26, V25.8.27, V25.8.28, V25.8.29, V25.8.30, V25.8.31

## Action V25.8.51
Les 11 anciens fichiers sont déplacés vers :
- `docs/historique/code/css/`
- `docs/historique/code/js/`

Les deux fichiers V25.8.33 actifs restent à leur emplacement d'origine.

## Précontrôles
Avant tout déplacement, le script vérifie :
1. que le dépôt Git est propre ;
2. que les 11 fichiers historiques existent ;
3. que les deux fichiers actifs V25.8.33 existent ;
4. qu'aucun fichier HTML/CSS/JS/JSON actif ne référence une ancienne génération ;
5. que `index.html` référence bien V25.8.33 JS + CSS ;
6. que le patch de version V25.8.51 peut être appliqué sans conflit.

## Hors périmètre
Aucun changement :
- API Apps Script ;
- données élèves ;
- calcul mental / parcours ;
- moteur d'apprentissage ;
- données de lecture/compréhension ;
- version active V25.8.33.
