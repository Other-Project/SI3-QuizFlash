---
title: "Rapport de la semaine à temps plein"
author: "QuizFlash : Evan Galli, Théo Lassauniere, Jilian Lubrat et Antoine-Marie Michelozzi"
date: 2024-06-19
geometry: margin=1in
---

## Introduction

Les objectifs de cette semaine à temps plein sont les suivants :

- Implémenter des tests pour notre site en accord avec les scénarios définis
- Conteneuriser notre application (tests compris)

**Tests :**
Pour cette partie, nous devons tester le déroulement des scénarios définis dans leur intégralité (tests dits end to end). Pour ce faire, nous avons ajouté la
librairie playwright, qui est déjà très utilisé par les grosses entreprises. L'objectif est de tester notre interface de manière automatisée pour s'assurer que
toutes les interactions avec celle-ci s'exécutent comme l'on s'y attend.

Cependant, lors de ce sprint, il était clair dès le départ que nous n'aurions pas le temps de tester tous les scénarios dans tous leurs déroulements. Il a donc
fallu établir quels scénarios nous souhaitions prioriser par rapport aux autres, pour savoir ce qui était important de tester en priorité pour notre site.

**Docker :**
TODO
----

## Scénarios :

- **Scénario 1 : Jouer à un quiz (point de vue accueilli)**
    - « Je suis anxieuse durant un temps de repos, alors Anne me propose de réaliser un quiz sur QuizFlash. Anne me signale que l’activité parlera de chansons
      françaises. Je commence ce quiz, il y a plein de questions différentes, certaines avec du son et d’autres avec du texte ou des images. Mais dans tous les
      cas, elles sont toutes adaptées à ma vision. Je termine cette activité, le site me félicite, car j’ai réussi à répondre à toutes les questions et je me
      sens apaisée. »
    - Ce scénario est de priorité **critique**. En effet, il constitue la base de notre site (à savoir jouer à un quiz). Si cette partie n'est pas
      fonctionnelle, alors notre site ne sert à rien du tout.


- **Scénario 2 : Création d'un quiz (point de vue ergothérapeute)**
    - « Je suis sur un temps de création des activités pour les résidents. Francescu a réalisé toutes les activités qui pouvaient lui être proposées, je dois
      donc lui en créer de nouvelles. Je vais me servir de QuizFlash regroupant l’ensemble des accueillis avec de nombreuses informations les concernant. Je me
      lance dans la création d’un quiz sur le thème de la pêche, le site me propose différents types de questions (sonore, illustrée, etc.), j’ajoute un
      ensemble de questions en alternant les types. Ainsi, une activité sera disponible au moment où il faudra en proposer à Francescu. »
    - Ce scénario est de **haute priorité**. Comme expliqué précédemment, jouer à un quiz est l'essence même de notre site. Si on ne peut pas créer de quiz,
      on ne peut pas jouer à un quiz, ce qui explique l'importance de tester ce scénario. Cependant, on considère qu'il est (légèrement) moins important de
      tester la création de quiz que jouer à un quiz en termes de priorité, car ça n'impacte alors pas directement le joueur (l'accueilli dans notre cas).


- **Scénario 3 : Ajout d’un accueilli (point de vue ergothérapeute)**
    - « J'accueille Bernard, un nouvel arrivant, pour cela, je réalise un premier rendez-vous. Bernard est dans mon bureau avec sa famille pour cet entretien et
      ils me communiquent toutes les informations nécessaires à la création de son dossier. Je réalise un bilan psychomoteur, les raccompagne lui et sa famille,
      et retourne ensuite dans mon bureau terminer le dossier. Je l’ajoute dans la base de données de QuizFlash. Pour cela, je rentre son nom, son prénom,
      certaines de ses pathologies, le stade de sa maladie et ses différents centres d’intérêts pour obtenir des tests adaptés. »
    - Ce scénario est de **haute priorité**. Si aucun utilisateur n'est défini sur notre site, alors il n'est pas possible de jouer à un quiz, d'où l'importance
      de tester ce scénario. De même que précédemment, il est moins prioritaire par rapport au premier scénario, car cela n'impacte pas directement le joueur (
      l'accueilli dans notre cas).


- **Scénario 4 : Visualisation de l’évolution (point de vue ergothérapeute)**
    - « Martine a réalisé plusieurs activités sur QuizFlash, je vais donc observer son évolution avec les résultats qui sont enregistrés dans le site. Durant
      chaque activité, les données de la session sont collectées afin que je puisse y accéder pour les analyser ultérieurement. Je peux alors visualiser
      l’évolution de Martine et ainsi adapter au mieux l’activité pour cette accueillie. Si j’observe qu’elle n’est plus en capacité de répondre à certaines
      questions, je les retire. »
    - Ce scénario est de **faible priorité**. On considère qu'il est moins grave que les statistiques d'un utilisateur ne soient plus fonctionnelles que le fait
      de pouvoir jouer à un quiz par exemple. De plus, ce scénario n'impacte pas le joueur. Ce scénario est donc moins testé que les autres.

----

## Test Réalisés :
----

## Documentation Ops : 