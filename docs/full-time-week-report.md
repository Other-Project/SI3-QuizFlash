---
title: "Rapport de la semaine à temps plein"
author: "QuizFlash : Evan Galli, Théo Lassauniere, Jilian Lubrat et Antoine-Marie Michelozzi"
date: 2024-06-21
geometry: margin=1in
---

## Introduction

Les objectifs de cette semaine à temps plein sont les suivants :

- Implémenter des tests pour notre site en accord avec les scénarios définis
- Conteneuriser notre application (tests compris)

**[Tests :](#tests-réalisés-)**
Pour cette partie, nous devions tester le déroulement des scénarios définis dans leur intégralité (tests dits "end-to-end"). Pour ce faire, nous avons ajouté la
librairie [Playwright](https://playwright.dev/), qui est déjà très utilisé par les grosses entreprises.
L'objectif est de tester notre interface de manière automatisée pour s'assurer que toutes les interactions avec celle-ci s'exécutent comme l'on s'y attend.

Cependant, lors de ce sprint, il était clair dès le départ que nous n'aurions pas le temps de tester tous les scénarios dans tous leurs déroulements. Il a donc
fallu établir quels scénarios nous souhaitions prioriser par rapport aux autres, pour savoir ce qui était important de tester en priorité pour notre site.

**[Docker :](#documentation-ops-)**
Pour cette seconde partie, nous devions conteneuriser l'ensemble de notre site afin d'en assurer la portabilité.
Nous avons pour cela utilisé la technologie [Docker](https://www.docker.com/).
Le backend, le frontend et les tests sont conteneurisés séparément pour améliorer la maintenabilité et la modularité des services.
Un [Docker Compose](https://docs.docker.com/compose/) est utilisé pour régir la configuration de ces conteneurs.

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

## Tests Réalisés :

La plupart de nos tests ayant besoins de données de départ pour être réalisés, nous avons créé une petite base de donnée dans notre back-end, qui sera utilisé pour l'initialiser.
Avant de lancer les tests, il est donc nécessaire de (re)démarrer le back-end avec la commande suivante : `run start:e2e`

Pour lancer nos tests, nous utilisons la configuration suivante :

- Génération d'un `.json` quand les tests sont lancés avec Docker au lieu d'un `.html`
- `video` et `screenshot` mis sur `on` pour que les vidéos et screenshots de nos tests s'enregistrent et soient disponibles à la fin de ceux-ci
- `slowMo` définit sur 500 et `timeout` sur 60000 (problèmes de performances du back-end sur certains pc du groupe)

Pour lancer tous les tests : `run test:e2e`

### Critères de priorisation des scénarios de tests :

Pour savoir quels scénarios prioriser en termes de tests, nous avons pris en compte les éléments suivants :

- Impact de l'élément pour le patient
- Fréquence de visionnage par le patient
- Fréquence de visionnage par le professionnel

### Scénarios de tests par rapport à nos scénarios d'utilisation :

#### Scénario de test n°1 : ``quiz-play-test-scenario.spec.ts``

Ce premier scénario de test vise à tester en intégralité une partie de quiz jouée sur notre site. Conformément au scénario, on commence par se connecter
en tant que
Martine pour pouvoir jouer le quiz sur les chansons françaises. Comme attendu, il comporte trois types de questions : les questions sonores, textuelles et
visuelles. On va répondre certaines fois juste et d'autres faux afin de bien tester notre moteur de jeu. Nous jouons le quiz jusqu'à la fin, nous sommes
félicité, puis nous sommes redirigés vers la page des quizz pour Martine.

#### Scénario de test n°2 : ``create-quiz-test-scenario.spec.ts``

Ce deuxième scénario de test vise à tester en intégralité le processus de création d'un quiz. On commence donc par se connecter en tant qu'administrateur,
puis on
accède à la liste des quizz. De là, on clique sur créer un quiz. On rentre un titre, un thème, une image et on le sauvegarde. Ensuite, on ajoute 3
questions, chacune d'un type différent en les sauvegardant au fur et à mesure. Pour la question sonore, on ajoute un fichier .mp3 et pour la question
visuelle, on ajoute une image. Enfin, on finit par sauvegarder le quiz.

#### Scénario de test n°3 : ``create-user-test-scenario.spec.ts``

Ce troisième scénario de test vise à tester entièrement le processus de création d'un utilisateur. Pour commencer, on se connecte en tant
qu'administrateur, puis on
sélectionne créer un utilisateur. De là, on rentre son nom, son prénom, son sexe et sa date de naissance. On lui ajoute également une photo de profil. On
valide et
il est créé. Une fois créé, on a accès à ses paramètres. On va donc ajuster ceci conformément à notre scénario.

### Tests complémentaires :

#### Scénario de test complémentaire n°1 : ``create-user-error-test.spec.ts``

Ce premier test complémentaire vise à tester plus en profondeur la création d'un utilisateur sur notre site en testant également les cas d'erreurs. Ici,
on va tenter de créer des utilisateurs avec des prénoms erronés, des noms erronés et des dates de naissance erronées. On va aussi tester l'input de la
photo de profil ainsi que le genre de l'utilisateur. Pour les inputs de noms et prénoms, on va passer des mauvais caractères dans les champs et on
s'attend à ce que le champ ne soit pas valide. Pour la date de naissance, on passe une mauvaise année. Pour la photo de profil, on vérifie qu'elle existe
bien quand on la passe.

#### Scénario de test complémentaire n°2 : ``create-quiz-error-test.spec.ts``

Pour ce deuxième test complémentaire, on va tester plus en profondeur la création de quiz en gérant les cas d'erreurs potentiels. Tout d'abord, on
s'assure que lorsque l'on ne sauvegarde pas un quiz, il n'apparaît pas dans la liste des quiz. On crée donc le quiz. Pour les questions, on commence par
tester la même mécanique en réutilisant le même procédé. On va aussi tenter de créer des questions avec des propositions vides, avec des inputs d'images
et de sons vides quand les cas se présentent, etc. En résumé, on s'assure que la question est bien paramétrée et dans son intégralité au moment de sa
sauvegarde, et on teste que notre site réagit bien lorsque celles-ci ne sont pas bien définies.

#### Scénario de test complémentaire n°3 : ``quiz-play-fiftyfifty-not-removed-test-scenario.spec.ts``

Ce troisième test complémentaire est lié en partie au premier scénario d'utilisation. Ce scénario de test a pour but de tester l'utilisation du bouton
50/50
et le paramètre de
suppression des mauvaises réponses. Dans ce test, la première question est jouée en utilisant le bouton '50/50' et on vérifie que certaines réponses ne
sont
plus visibles
(2 réponses sont cachées lorsqu'il y en a 4 initialement et une seule est cachée s'il y en a 3 initialement). La seconde question est jouée de manière à
répondre faux un maximum de fois jusqu'à ce qu'il ne reste que la bonne réponse,
en vérifiant la disparition du bouton '50/50' dans le cas où le nombre de réponses restantes est strictement inférieur à 3. Le quiz est joué jusqu'à la
fin, nous
sommes
félicités, puis nous sommes redirigés vers la page des quizz pour Martine.

#### Scénario de test complémentaire n°4: ``quiz-play-replay-end-test-scenario.spec.ts``

Ce quatrième test complémentaire est lié en partie au premier scénario d'utilisation. Ce scénario de test a pour but de tester le paramètre 'Rejouer les
questions'. Dans ce test,
une mauvaise réponse est sélectionnée. Ainsi, cette réponse devra être reposée à la fin du quiz. Toutes les questions restantes ont une réponse juste.
Lors de la dernière réponse,
une vérification est effectuée afin de s'assurer que la dernière question est bien la question qui devait être reposée. Le quiz est joué jusqu'à la fin,
nous sommes
félicités, ensuite, nous sommes redirigés vers la page des quizz pour Martine.

#### Scénario de test complémentaire n°5 : ``delete-question-test-scenario.spec.ts``

Ce cinquième test complémentaire est lié en partie au quatrième scénario d'utilisation. Dans le cas où une question devient trop difficile pour un
accueilli,
il faut qu'elle puisse
être supprimée du quiz. Dans ce test, on va donc se connecter en tant qu'administrateur pour accéder à un quiz. On le sélectionne et on supprime une
question. On vérifie qu'elle se supprime bien.

### Ordre de priorisation des scénarios de tests :

- Cet ordre est basé sur les critères de priorisations décris plus haut :
    1. Les scénarios de test [n°1](#scénario-de-test-n1--quiz-play-test-scenariospects), [n°2](#scénario-de-test-n2--create-quiz-test-scenariospects)
       et [n°3](#scénario-de-test-n3--create-user-test-scenariospects) sont placés au même niveau, car la création des quizz et des users permettent aux
       patients de jouer
       tout comme le moteur de jeu lui-même.
       Ainsi, ces 3 éléments impactent de manière importante les patients dans la mesure où cela leur permet de jouer les quizz. Les éléments testés sont
       directement ou indirectement les plus vus par les patients
       et également par le professionnel.
    2. Les scénarios de test complémentaire [n°3](#scénario-de-test-complémentaire-n3--quiz-play-fiftyfifty-not-removed-test-scenariospects)
       et [n°4](#scénario-de-test-complémentaire-n4-quiz-play-replay-end-test-scenariospects), ces deux scénarios sont placés au même niveau, car ils sont liés
       au fait de jouer les quiz. Concernant les
       critères, les éléments testés par ces scénarios peuvent
       impacter les patients si les paramètres associés sont activés pour le patient, de même pour la fréquence de visionnage par le patient. Pour ce qui est de
       la fréquence de visualisation par le professionnel,
       les éléments ne sont jamais vu par les professionnels, car ils sont liés au moteur de jeu.
    3. Le scénario de test complémentaire [n°5](#scénario-de-test-complémentaire-n5--delete-question-test-scenariospects) : ce scénario est là pour tester la
       suppression de questions dans un quiz, ainsi, il peut impacter un patient dans la
       mesure où un quiz rejoué plusieurs fois peut être modifié en retirant des questions entre
       les différentes fois où il est joué. De plus cela est géré par les professionnels donc sont souvent vu par ces deniers. Cependant, ce n'est pas vu
       directement par les patients.
    4. Scénario de test complémentaire [n°1](#scénario-de-test-complémentaire-n1--create-user-error-testspects)
       et [n°2](#scénario-de-test-complémentaire-n2--create-quiz-error-testspects), ces deux scénarios sont placés au même niveau, car ils sont liés au fait de
       créer/modifier les patients ou
       les
       quiz. Ces scénarios sont là pour tester des cas extrêmes concernant la création/modification
       des patients et des quiz, ainsi, ils sont vu par le professionnel, mais n'impacte pas les patients et ne sont jamais vu par ces derniers.

----

## Documentation Ops :

### Pour lancer notre application deux possibilitées :

1. Lancement des tests end to end, lance le serveur en chargeant les données de tests, le front-end et playwright, il suffit de lancer le
   script ```run-e2e.sh```
2. Lancement de l'application dans sont ensemble, lance le serveur et le front-end de l'application, il suffit de lancer le script ``run.sh``

### Fonctionnement :

1. Pour les tests end to end, nous avons un docker composent qui génère 3 images :
    - La première image généré est celle du serveur, initialisé avec une base de donnée qui permet de réaliser les tests, cette base de données est
      est réinitialisé à chaque fois.
    - Une seconde qui contient le front-end, on créer une première image contenant node qui permet de générer les fichiers statiques du site avec angular. Puis
      on récupère les fichiers pour les copier dans une autre image avec NGINX qui va permettre de faire un serveur front-end avec une taille d'image la plus
      raisonnable possible.
    - Enfin la dernière contient playwright qui va permettre de lancer les tests end to end, les résultats des tests (rapport, vidéos, screenshot) sont placé
      dans un dossier obs/playwright
      qui est accessible depuis l'hôte.
2. Pour une utilisation de l'application depuis un navigateur :
    - La première image générée est celle du serveur, le fonctionnement est similaire à celui pour les tests end to end, à ceci près que la base de données est
      stocké dans un volume afin qu'elle soit persistante.
    - La seconde est celle du front-end, le fonctionnement est également similaire à celle des tests, on peut accédé au site depuis un navigateur
      avec ``localhost``


- Parler du réseaux créer par les docker compose, sur quel port écoute le serveur et le front --> dire que l'adrresse du back est passé au front par une
  variable d'envirronement
- Parler des 3 variables d'envirronement du back
- Préciser les différentes tailles d'image si possible
- Ne pas oublier si les tests prennent du temps de le préciser
- 


