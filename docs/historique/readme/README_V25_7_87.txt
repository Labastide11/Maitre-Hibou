Maître Hibou V25.7.87 — Header popup restructuré

Le header est désormais construit comme deux ensembles seulement :
1. Identité : portrait + prénom/titre + sous-texte.
2. Citation : bloc indépendant poussé à droite.

Corrections :
- portrait et titre appartiennent au même conteneur flex ;
- écart portrait/titre fixe et court ;
- plus de centrage artificiel du titre dans une colonne ;
- la citation utilise margin-left:auto et une largeur plafonnée ;
- sur tablette paysage, le titre reste prioritaire ;
- sous 900 px, seule la citation descend, jamais le portrait ;
- le portrait reste toujours juste à côté du titre.
