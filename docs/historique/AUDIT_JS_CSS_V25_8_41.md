# Audit détaillé des anciens JS/CSS — Maître Hibou V25.8.41

## Objet

Cette version est un **audit uniquement**. Aucun fichier JS/CSS n'est déplacé ou supprimé.
Le but est de distinguer les ressources réellement chargées de l'application des générations historiques.

## Méthode

- analyse des balises `script src` et `link href` de toutes les pages HTML ;
- suivi des dépendances CSS `@import` ;
- regroupement des fichiers versionnés par famille ;
- contrôle des doublons binaires par SHA-256 ;
- contrôle de syntaxe JavaScript ;
- aucun fichier n'est déclaré supprimable uniquement parce qu'il n'est pas chargé par `index.html`.

## Résultat global

- Fichiers JS/CSS versionnés audités : **168**.
- Ressources versionnées réellement chargées (directement ou transitivement) : **26**.
- Ressources versionnées non chargées par les pages HTML actuelles : **142**.
- Dépendances CSS actives uniquement par `@import` : **1**.
- Groupes de fichiers strictement identiques : **2**.

### Point important découvert

`css/hibou-parcours-progres-v25825.css` importe encore :

```css
@import url('hibou-parcours-progres-v25784.css');
```

Donc **`hibou-parcours-progres-v25784.css` est ACTIF** même s'il n'apparaît pas directement dans `index.html`.
Il ne doit surtout pas être archivé tant que V25.8.25 conserve cet import.

## Ressources versionnées actives

- `css/hibou-advice-v25815.css` — chargé par `index.html`
- `css/hibou-bottom-nav-v25807.css` — chargé par `index.html`
- `css/hibou-learning-engine-v25822.css` — chargé par `index.html`
- `css/hibou-lecture-comprehension-v25833.css` — chargé par `index.html`
- `css/hibou-parcours-progres-v25784.css` — importé par `css/hibou-parcours-progres-v25825.css`
- `css/hibou-parcours-progres-v25825.css` — chargé par `index.html`
- `css/hibou-progres-popup-v25762.css` — chargé par `index.html`
- `css/hibou-question-modal-v25807.css` — chargé par `index.html`
- `data/comprehension/com-p1-v25816.js` — chargé par `index.html`
- `data/comprehension/com-p2-v25817.js` — chargé par `index.html`
- `data/comprehension/com-p3-v25818.js` — chargé par `index.html`
- `data/comprehension/com-p4-v25819.js` — chargé par `index.html`
- `data/comprehension/com-p5-v25820.js` — chargé par `index.html`
- `data/lecture/lec-p1-v25811.js` — chargé par `index.html`
- `js/hibou-advice-v25815.js` — chargé par `index.html`
- `js/hibou-bottom-nav-v25807.js` — chargé par `index.html`
- `js/hibou-home-title-v25807.js` — chargé par `index.html`
- `js/hibou-journal-eleve-v25839.js` — chargé par `index.html`
- `js/hibou-learning-engine-v25822.js` — chargé par `index.html`
- `js/hibou-lecture-comprehension-v25833.js` — chargé par `index.html`
- `js/hibou-parcours-progres-v25825.js` — chargé par `index.html`
- `js/hibou-parcours-recent-popup-v25770.js` — chargé par `index.html`
- `js/hibou-progres-popup-v25762.js` — chargé par `index.html`
- `js/hibou-question-modal-v25807.js` — chargé par `index.html`
- `js/hibou-sync-v25754.js` — chargé par `enseignant.html`
- `js/hibou-sync-v25839.js` — chargé par `index.html`

## Analyse par famille

### com-p1.js

- 1 version(s) trouvée(s).
- **Actif :** `com-p1-v25816.js`.

### com-p2.js

- 1 version(s) trouvée(s).
- **Actif :** `com-p2-v25817.js`.

### com-p3.js

- 1 version(s) trouvée(s).
- **Actif :** `com-p3-v25818.js`.

### com-p4.js

- 1 version(s) trouvée(s).
- **Actif :** `com-p4-v25819.js`.

### com-p5.js

- 1 version(s) trouvée(s).
- **Actif :** `com-p5-v25820.js`.

### hibou-advice.css

- 5 version(s) trouvée(s).
- **Actif :** `hibou-advice-v25815.css`.
- **Historique / candidat à l'archivage :** `hibou-advice-v25804.css`, `hibou-advice-v25805.css`, `hibou-advice-v25806.css`, `hibou-advice-v25807.css`.

### hibou-advice.js

- 5 version(s) trouvée(s).
- **Actif :** `hibou-advice-v25815.js`.
- **Historique / candidat à l'archivage :** `hibou-advice-v25804.js`, `hibou-advice-v25805.js`, `hibou-advice-v25806.js`, `hibou-advice-v25807.js`.

### hibou-bottom-nav.css

- 12 version(s) trouvée(s).
- **Actif :** `hibou-bottom-nav-v25807.css`.
- **Historique / candidat à l'archivage :** `hibou-bottom-nav-v25778.css`, `hibou-bottom-nav-v25795.css`, `hibou-bottom-nav-v25798.css`, `hibou-bottom-nav-v25799.css`, `hibou-bottom-nav-v25800.css`, `hibou-bottom-nav-v25801.css`, `hibou-bottom-nav-v25802.css`, `hibou-bottom-nav-v25803.css`, `hibou-bottom-nav-v25804.css`, `hibou-bottom-nav-v25805.css`, `hibou-bottom-nav-v25806.css`.

### hibou-bottom-nav.js

- 12 version(s) trouvée(s).
- **Actif :** `hibou-bottom-nav-v25807.js`.
- **Historique / candidat à l'archivage :** `hibou-bottom-nav-v25778.js`, `hibou-bottom-nav-v25795.js`, `hibou-bottom-nav-v25798.js`, `hibou-bottom-nav-v25799.js`, `hibou-bottom-nav-v25800.js`, `hibou-bottom-nav-v25801.js`, `hibou-bottom-nav-v25802.js`, `hibou-bottom-nav-v25803.js`, `hibou-bottom-nav-v25804.js`, `hibou-bottom-nav-v25805.js`, `hibou-bottom-nav-v25806.js`.

### hibou-french-test-trigger.js

- 1 version(s) trouvée(s).
- **Actif :** aucune version de cette famille n'est chargée par une page HTML actuelle.
- **Historique / candidat à l'archivage :** `hibou-french-test-trigger-v25832.js`.

### hibou-home-title.js

- 2 version(s) trouvée(s).
- **Actif :** `hibou-home-title-v25807.js`.
- **Historique / candidat à l'archivage :** `hibou-home-title-v25806.js`.

### hibou-journal-eleve.js

- 4 version(s) trouvée(s).
- **Actif :** `hibou-journal-eleve-v25839.js`.
- **Historique / candidat à l'archivage :** `hibou-journal-eleve-v25808.js`, `hibou-journal-eleve-v25834.js`, `hibou-journal-eleve-v25836.js`.

### hibou-learning-engine.css

- 7 version(s) trouvée(s).
- **Actif :** `hibou-learning-engine-v25822.css`.
- **Historique / candidat à l'archivage :** `hibou-learning-engine-v25809.css`, `hibou-learning-engine-v25810.css`, `hibou-learning-engine-v25811.css`, `hibou-learning-engine-v25816.css`, `hibou-learning-engine-v25817.css`, `hibou-learning-engine-v25818.css`.

### hibou-learning-engine.js

- 7 version(s) trouvée(s).
- **Actif :** `hibou-learning-engine-v25822.js`.
- **Historique / candidat à l'archivage :** `hibou-learning-engine-v25809.js`, `hibou-learning-engine-v25810.js`, `hibou-learning-engine-v25811.js`, `hibou-learning-engine-v25816.js`, `hibou-learning-engine-v25817.js`, `hibou-learning-engine-v25818.js`.

### hibou-lecture-comprehension.css

- 5 version(s) trouvée(s).
- **Actif :** `hibou-lecture-comprehension-v25833.css`.
- **Historique / candidat à l'archivage :** `hibou-lecture-comprehension-v25822.css`, `hibou-lecture-comprehension-v25826.css`, `hibou-lecture-comprehension-v25827.css`, `hibou-lecture-comprehension-v25828.css`.

### hibou-lecture-comprehension.js

- 8 version(s) trouvée(s).
- **Actif :** `hibou-lecture-comprehension-v25833.js`.
- **Historique / candidat à l'archivage :** `hibou-lecture-comprehension-v25822.js`, `hibou-lecture-comprehension-v25826.js`, `hibou-lecture-comprehension-v25827.js`, `hibou-lecture-comprehension-v25828.js`, `hibou-lecture-comprehension-v25829.js`, `hibou-lecture-comprehension-v25830.js`, `hibou-lecture-comprehension-v25831.js`.

### hibou-parcours-progres.css

- 28 version(s) trouvée(s).
- **Actif :** `hibou-parcours-progres-v25784.css`, `hibou-parcours-progres-v25825.css`.
- **Historique / candidat à l'archivage :** `hibou-parcours-progres-v25779.css`, `hibou-parcours-progres-v25780.css`, `hibou-parcours-progres-v25781.css`, `hibou-parcours-progres-v25782.css`, `hibou-parcours-progres-v25783.css`, `hibou-parcours-progres-v25786.css`, `hibou-parcours-progres-v25787.css`, `hibou-parcours-progres-v25788.css`, `hibou-parcours-progres-v25789.css`, `hibou-parcours-progres-v25790.css`, `hibou-parcours-progres-v25791.css`, `hibou-parcours-progres-v25794.css`, `hibou-parcours-progres-v25796.css`, `hibou-parcours-progres-v25798.css`, `hibou-parcours-progres-v25799.css`, `hibou-parcours-progres-v25800.css`, `hibou-parcours-progres-v25801.css`, `hibou-parcours-progres-v25802.css`, `hibou-parcours-progres-v25803.css`, `hibou-parcours-progres-v25804.css`, `hibou-parcours-progres-v25805.css`, `hibou-parcours-progres-v25806.css`, `hibou-parcours-progres-v25807.css`, `hibou-parcours-progres-v25814.css`, `hibou-parcours-progres-v25821.css`, `hibou-parcours-progres-v25824.css`.

### hibou-parcours-progres.js

- 29 version(s) trouvée(s).
- **Actif :** `hibou-parcours-progres-v25825.js`.
- **Historique / candidat à l'archivage :** `hibou-parcours-progres-v25775.js`, `hibou-parcours-progres-v25779.js`, `hibou-parcours-progres-v25780.js`, `hibou-parcours-progres-v25781.js`, `hibou-parcours-progres-v25782.js`, `hibou-parcours-progres-v25783.js`, `hibou-parcours-progres-v25784.js`, `hibou-parcours-progres-v25786.js`, `hibou-parcours-progres-v25787.js`, `hibou-parcours-progres-v25788.js`, `hibou-parcours-progres-v25789.js`, `hibou-parcours-progres-v25790.js`, `hibou-parcours-progres-v25791.js`, `hibou-parcours-progres-v25794.js`, `hibou-parcours-progres-v25796.js`, `hibou-parcours-progres-v25798.js`, `hibou-parcours-progres-v25799.js`, `hibou-parcours-progres-v25800.js`, `hibou-parcours-progres-v25801.js`, `hibou-parcours-progres-v25802.js`, `hibou-parcours-progres-v25803.js`, `hibou-parcours-progres-v25804.js`, `hibou-parcours-progres-v25805.js`, `hibou-parcours-progres-v25806.js`, `hibou-parcours-progres-v25807.js`, `hibou-parcours-progres-v25814.js`, `hibou-parcours-progres-v25821.js`, `hibou-parcours-progres-v25824.js`.

### hibou-parcours-recent-click.js

- 4 version(s) trouvée(s).
- **Actif :** aucune version de cette famille n'est chargée par une page HTML actuelle.
- **Historique / candidat à l'archivage :** `hibou-parcours-recent-click-v25767.js`, `hibou-parcours-recent-click-v25768.js`, `hibou-parcours-recent-click-v25769.js`, `hibou-parcours-recent-click-v25770.js`.

### hibou-parcours-recent-popup.js

- 3 version(s) trouvée(s).
- **Actif :** `hibou-parcours-recent-popup-v25770.js`.
- **Historique / candidat à l'archivage :** `hibou-parcours-recent-popup-v25768.js`, `hibou-parcours-recent-popup-v25769.js`.

### hibou-progres-popup.css

- 1 version(s) trouvée(s).
- **Actif :** `hibou-progres-popup-v25762.css`.

### hibou-progres-popup.js

- 1 version(s) trouvée(s).
- **Actif :** `hibou-progres-popup-v25762.js`.

### hibou-question-modal.css

- 11 version(s) trouvée(s).
- **Actif :** `hibou-question-modal-v25807.css`.
- **Historique / candidat à l'archivage :** `hibou-question-modal-v25793.css`, `hibou-question-modal-v25798.css`, `hibou-question-modal-v25799.css`, `hibou-question-modal-v25800.css`, `hibou-question-modal-v25801.css`, `hibou-question-modal-v25802.css`, `hibou-question-modal-v25803.css`, `hibou-question-modal-v25804.css`, `hibou-question-modal-v25805.css`, `hibou-question-modal-v25806.css`.

### hibou-question-modal.js

- 11 version(s) trouvée(s).
- **Actif :** `hibou-question-modal-v25807.js`.
- **Historique / candidat à l'archivage :** `hibou-question-modal-v25793.js`, `hibou-question-modal-v25798.js`, `hibou-question-modal-v25799.js`, `hibou-question-modal-v25800.js`, `hibou-question-modal-v25801.js`, `hibou-question-modal-v25802.js`, `hibou-question-modal-v25803.js`, `hibou-question-modal-v25804.js`, `hibou-question-modal-v25805.js`, `hibou-question-modal-v25806.js`.

### hibou-sync.js

- 4 version(s) trouvée(s).
- **Actif :** `hibou-sync-v25754.js`, `hibou-sync-v25839.js`.
- **Historique / candidat à l'archivage :** `hibou-sync-v25808.js`, `hibou-sync-v25836.js`.

### lec-p1.js

- 3 version(s) trouvée(s).
- **Actif :** `lec-p1-v25811.js`.
- **Historique / candidat à l'archivage :** `lec-p1-v25809.js`, `lec-p1-v25810.js`.

## Cas particuliers à conserver

- `js/hibou-sync-v25754.js` reste chargé par `enseignant.html`. Il est ancien mais **encore actif sur cette page**.
- `css/hibou-parcours-progres-v25784.css` reste une dépendance active de `css/hibou-parcours-progres-v25825.css`.
- Les fichiers non versionnés (`hibou-progres-card.js`, `hibou-mes-lecons.js`, etc.) ne sont pas visés par cet audit de générations historiques.

## Candidats à l'archivage futur

Les fichiers ci-dessous ne sont chargés par aucune page HTML actuelle et ne sont pas atteints par une chaîne `@import` active. Ils sont de bons **candidats**, mais V25.8.41 ne les déplace pas.

- `css/hibou-advice-v25804.css`
- `css/hibou-advice-v25805.css`
- `css/hibou-advice-v25806.css`
- `css/hibou-advice-v25807.css`
- `css/hibou-bottom-nav-v25778.css`
- `css/hibou-bottom-nav-v25795.css`
- `css/hibou-bottom-nav-v25798.css`
- `css/hibou-bottom-nav-v25799.css`
- `css/hibou-bottom-nav-v25800.css`
- `css/hibou-bottom-nav-v25801.css`
- `css/hibou-bottom-nav-v25802.css`
- `css/hibou-bottom-nav-v25803.css`
- `css/hibou-bottom-nav-v25804.css`
- `css/hibou-bottom-nav-v25805.css`
- `css/hibou-bottom-nav-v25806.css`
- `css/hibou-learning-engine-v25809.css`
- `css/hibou-learning-engine-v25810.css`
- `css/hibou-learning-engine-v25811.css`
- `css/hibou-learning-engine-v25816.css`
- `css/hibou-learning-engine-v25817.css`
- `css/hibou-learning-engine-v25818.css`
- `css/hibou-lecture-comprehension-v25822.css`
- `css/hibou-lecture-comprehension-v25826.css`
- `css/hibou-lecture-comprehension-v25827.css`
- `css/hibou-lecture-comprehension-v25828.css`
- `css/hibou-parcours-progres-v25779.css`
- `css/hibou-parcours-progres-v25780.css`
- `css/hibou-parcours-progres-v25781.css`
- `css/hibou-parcours-progres-v25782.css`
- `css/hibou-parcours-progres-v25783.css`
- `css/hibou-parcours-progres-v25786.css`
- `css/hibou-parcours-progres-v25787.css`
- `css/hibou-parcours-progres-v25788.css`
- `css/hibou-parcours-progres-v25789.css`
- `css/hibou-parcours-progres-v25790.css`
- `css/hibou-parcours-progres-v25791.css`
- `css/hibou-parcours-progres-v25794.css`
- `css/hibou-parcours-progres-v25796.css`
- `css/hibou-parcours-progres-v25798.css`
- `css/hibou-parcours-progres-v25799.css`
- `css/hibou-parcours-progres-v25800.css`
- `css/hibou-parcours-progres-v25801.css`
- `css/hibou-parcours-progres-v25802.css`
- `css/hibou-parcours-progres-v25803.css`
- `css/hibou-parcours-progres-v25804.css`
- `css/hibou-parcours-progres-v25805.css`
- `css/hibou-parcours-progres-v25806.css`
- `css/hibou-parcours-progres-v25807.css`
- `css/hibou-parcours-progres-v25814.css`
- `css/hibou-parcours-progres-v25821.css`
- `css/hibou-parcours-progres-v25824.css`
- `css/hibou-question-modal-v25793.css`
- `css/hibou-question-modal-v25798.css`
- `css/hibou-question-modal-v25799.css`
- `css/hibou-question-modal-v25800.css`
- `css/hibou-question-modal-v25801.css`
- `css/hibou-question-modal-v25802.css`
- `css/hibou-question-modal-v25803.css`
- `css/hibou-question-modal-v25804.css`
- `css/hibou-question-modal-v25805.css`
- `css/hibou-question-modal-v25806.css`
- `data/lecture/lec-p1-v25809.js`
- `data/lecture/lec-p1-v25810.js`
- `js/hibou-advice-v25804.js`
- `js/hibou-advice-v25805.js`
- `js/hibou-advice-v25806.js`
- `js/hibou-advice-v25807.js`
- `js/hibou-bottom-nav-v25778.js`
- `js/hibou-bottom-nav-v25795.js`
- `js/hibou-bottom-nav-v25798.js`
- `js/hibou-bottom-nav-v25799.js`
- `js/hibou-bottom-nav-v25800.js`
- `js/hibou-bottom-nav-v25801.js`
- `js/hibou-bottom-nav-v25802.js`
- `js/hibou-bottom-nav-v25803.js`
- `js/hibou-bottom-nav-v25804.js`
- `js/hibou-bottom-nav-v25805.js`
- `js/hibou-bottom-nav-v25806.js`
- `js/hibou-french-test-trigger-v25832.js`
- `js/hibou-home-title-v25806.js`
- `js/hibou-journal-eleve-v25808.js`
- `js/hibou-journal-eleve-v25834.js`
- `js/hibou-journal-eleve-v25836.js`
- `js/hibou-learning-engine-v25809.js`
- `js/hibou-learning-engine-v25810.js`
- `js/hibou-learning-engine-v25811.js`
- `js/hibou-learning-engine-v25816.js`
- `js/hibou-learning-engine-v25817.js`
- `js/hibou-learning-engine-v25818.js`
- `js/hibou-lecture-comprehension-v25822.js`
- `js/hibou-lecture-comprehension-v25826.js`
- `js/hibou-lecture-comprehension-v25827.js`
- `js/hibou-lecture-comprehension-v25828.js`
- `js/hibou-lecture-comprehension-v25829.js`
- `js/hibou-lecture-comprehension-v25830.js`
- `js/hibou-lecture-comprehension-v25831.js`
- `js/hibou-parcours-progres-v25775.js`
- `js/hibou-parcours-progres-v25779.js`
- `js/hibou-parcours-progres-v25780.js`
- `js/hibou-parcours-progres-v25781.js`
- `js/hibou-parcours-progres-v25782.js`
- `js/hibou-parcours-progres-v25783.js`
- `js/hibou-parcours-progres-v25784.js`
- `js/hibou-parcours-progres-v25786.js`
- `js/hibou-parcours-progres-v25787.js`
- `js/hibou-parcours-progres-v25788.js`
- `js/hibou-parcours-progres-v25789.js`
- `js/hibou-parcours-progres-v25790.js`
- `js/hibou-parcours-progres-v25791.js`
- `js/hibou-parcours-progres-v25794.js`
- `js/hibou-parcours-progres-v25796.js`
- `js/hibou-parcours-progres-v25798.js`
- `js/hibou-parcours-progres-v25799.js`
- `js/hibou-parcours-progres-v25800.js`
- `js/hibou-parcours-progres-v25801.js`
- `js/hibou-parcours-progres-v25802.js`
- `js/hibou-parcours-progres-v25803.js`
- `js/hibou-parcours-progres-v25804.js`
- `js/hibou-parcours-progres-v25805.js`
- `js/hibou-parcours-progres-v25806.js`
- `js/hibou-parcours-progres-v25807.js`
- `js/hibou-parcours-progres-v25814.js`
- `js/hibou-parcours-progres-v25821.js`
- `js/hibou-parcours-progres-v25824.js`
- `js/hibou-parcours-recent-click-v25767.js`
- `js/hibou-parcours-recent-click-v25768.js`
- `js/hibou-parcours-recent-click-v25769.js`
- `js/hibou-parcours-recent-click-v25770.js`
- `js/hibou-parcours-recent-popup-v25768.js`
- `js/hibou-parcours-recent-popup-v25769.js`
- `js/hibou-question-modal-v25793.js`
- `js/hibou-question-modal-v25798.js`
- `js/hibou-question-modal-v25799.js`
- `js/hibou-question-modal-v25800.js`
- `js/hibou-question-modal-v25801.js`
- `js/hibou-question-modal-v25802.js`
- `js/hibou-question-modal-v25803.js`
- `js/hibou-question-modal-v25804.js`
- `js/hibou-question-modal-v25805.js`
- `js/hibou-question-modal-v25806.js`
- `js/hibou-sync-v25808.js`
- `js/hibou-sync-v25836.js`

## Doublons strictement identiques

- `css/hibou-learning-engine-v25809.css` = `css/hibou-learning-engine-v25810.css`
- `css/hibou-learning-engine-v25818.css` = `css/hibou-learning-engine-v25822.css`

## Recommandation pour V25.8.42

Créer `docs/historique/code/` et y déplacer **par famille** uniquement les versions classées historiques, en commençant par les familles les moins risquées. Après chaque famille : contrôle des liens, syntaxe JS et test fonctionnel.

Ordre conseillé : `hibou-advice` → `hibou-home-title` → `hibou-question-modal` → `hibou-learning-engine` → `hibou-lecture-comprehension` → `hibou-bottom-nav` → `hibou-journal-eleve` → `hibou-sync` → `hibou-parcours-progres`.

`hibou-parcours-progres` doit être traité en dernier à cause de sa dépendance CSS historique V25.7.84.