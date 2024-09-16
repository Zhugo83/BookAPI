# Introduction
Dans ce cours, nous allons apprendre à concevoir un back office en utilisant une arcgitecture API REST avec Node.js, Express, MySQL et Sequelize. Nous allons construire un mini-projet de gestion de biliothèque pour illustrer les concepts clés.

# Projet: Système de gestion de bibliothèque
Notre système permettra de :
* Gérer les lives (ajouter, lister, metre à jour, supprimer)
* Gérer les auteurs (ajouter, lister, mettre à jour, supprimer)
* Associer des livres à des auteurs

# Configuration de l'environnement de travail
## Installation des dépendances
Dans le terminal vous allez entrer les commandes :
```
npm init -y
npm install express mysql2 sequelize dotenv
npm install --save-dev nodemon
```

## Structure du projet
```
BookAPI/
├── src/
|  ├── config/
|  |   └── database.js
|  ├── models/
|  |   ├── index.js
|  |   ├── book.js
|  |   └── author.js
|  ├── controllers/
|  |   ├── bookController.js
|  |   └── authorController.js
|  ├── routes/
|  |   ├── bookRoutes.js
|  |   └── authorRoutes.js
|  ├── middlewares/
|  |   └── errorHandler.js
|  └── app.js
├── .env
└── package.json
```

# Modèles
## Qu'est-ce qu'un modèle ?
Un modèle dans le contexte de Sequelize représente une table dans votre base de donées.
Il défini la structure des données, les types de champs, et les relatios netre différentes tables.
les modèles permettents d'interagir avec la base de données de manière orientées objet, sans avor à écrire de requeête SL directement.

# Contrôleurs
## Qu'est-ce qu'un contrôleur ?
Un contrôler est responsable de la logique métier de votre application.
Il reçois les requêtes de l'utilisateur via les routes, intéragit avec les modèles pour accéder ou modifier les données, et prépare la réponse à renvoyer.
Les contrôleurs agissent commes des intermédiaires entre les routes (qui définissent les points d'entrée de l'API) et les modèles (qui représentent les données).

1. `req` (Request) :
   * Objet représentant la requête HTTP entrante
   * Contient des informations sur la requête, comme les paramètres d'URL, les en-têtes, le corps de la requête
   * Exemples : `req.params`, `req.query`, `req.body`, `req.headers`

2. `res` (Response) :
   * Objet représentant la réponse HTTP que votre serveur va envoyer
   * Fournit des méthodes pour contrôler la réponse (définir le statut, les en-têtes, envoyer des données)
   * Exemples : `res.status()`, `res.json()`, `res.send()`, `res.sendFile()`

3. `next` :
   * Fonction qui passe le contrôle au middleware suivant
   * Utilisée pour la gestion des erreurs quand appelée avec un argument
   * Exemples : `next()` (passe au middleware suivant), `next(error)` (passe à un gestionnaire d'erreurs)

# Routes
## Qu'est-ce qu'une route ?
Les routes définissent les points d'entrée de votre API.
Elles spécifient comment votre application répond à différentes requêtes HTTP (Get, Post, Put, Delete, etc.) sur différentes URL.
Lesroutes agissent comme des "aiguilleurs", dirigeant les requêtes vers les contrôleurs appropriés.

# Middlewares
## Qu'est-ce qu'un middleware ?
Un middleware est une fonction qui a accès aux objets de requête (req), de réponse (res), et à la fonction suivante (next) dan le cycle de requête-résponse de l'application.
Les middlewares peuvent:
* Exécuter du code
* Apporter des modifications aux objets de requeête et de réponse
* Terminer le cycle requête-réponse
* Appeler le prochain middlewave dans la pile
Les middlewares sont utilisés pour des tâches tells que la journalisation, la gestion des erreurs, l'authentification, etc.
Exemple d'un middleware :
```js
const loggerMiddleware = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
}
app.use(loggerMiddleware);
```