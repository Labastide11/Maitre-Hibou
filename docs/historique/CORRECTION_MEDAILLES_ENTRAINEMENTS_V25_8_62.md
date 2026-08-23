# Maître Hibou V25.8.62 — correction des médailles sur entraînements

## Bug
Un entraînement de grammaire à 4/10 pouvait apparaître avec une médaille Or.

## Cause
Le pont Français utilisait une détection trop large :
`indexOf('or')`.

Le texte `Score 4 / 10` contient les lettres `or` dans le mot `Score`.
Le niveau était donc transformé par erreur en `or`, puis le journal calculait une
médaille Or à partir de ce faux niveau.

## Correctif
1. Les mots `Or`, `Argent` et `Bronze` sont désormais reconnus comme des mots
   complets, jamais comme une sous-chaîne de `Score`.
2. Les entraînements ordinaires ne transmettent plus de niveau de médaille.
3. Le Parcours n'affiche une médaille que pour un événement de type/source
   `ceinture`.
4. Les anciennes traces déjà enregistrées avec une fausse médaille ne sont donc
   plus affichées comme médaillées.

## Règle conservée
Les médailles Bronze / Argent / Or restent réservées aux passages de ceinture.
Aucun changement du barème des ceintures.

## Hors périmètre
Aucun changement API, Sheet, journal ou synchronisation.
