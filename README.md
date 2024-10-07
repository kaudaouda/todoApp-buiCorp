# Application de Gestion des Tâches

## Description

Cette application de gestion des tâches (to-do list) a été développée avec Vue 3 et Vite dans le cadre d'un test technique pour évaluer les compétences en développement frontend. Elle offre une interface intuitive pour gérer efficacement vos tâches quotidiennes.

## Fonctionnalités principales

- Ajouter des tâches avec un titre et un statut
- Modifier des tâches existantes
- Supprimer des tâches
- Filtrer les tâches (toutes, terminées, incomplètes)
- Marquer une tâche comme terminée
- Affichage du nombre de tâches restantes

## Technologies utilisées

- Framework : Vue.js 3
- Outil de build : Vite
- Gestion de l'état : Vuex 4
- Tests unitaires : Jest
- Styles : [CSS personnalisé / TailwindCSS]

## Prérequis

- Node.js (version recommandée : 14.x ou supérieure)
- npm ou yarn

## Installation et lancement du projet

1. Clonez le dépôt :

```bash
git git@github.com:kaudaouda/todoApp-buiCorp.git
```

2. Installez les dépendances :

```bash
npm install
```

3. Lancez le serveur de développement :

```bash
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173` (ou un autre port si celui-ci est déjà utilisé).

4. Pour construire l'application pour la production :

npm run build

5. Pour prévisualiser la version de production localement :

```bash
npm run preview
```

6. Pour exécuter les tests unitaires :

```bash
npm run test
```

## Scripts disponibles

- `npm run dev` : Lance le serveur de développement Vite
- `npm run build` : Construit l'application pour la production
- `npm run preview` : Prévisualise la version de production localement
- `npm run test` : Exécute les tests unitaires avec Jest

## Structure du projet

```
src/
├── components/    # Composants Vue réutilisables
├── views/         # Composants de page/vue
├── store/         # Configuration et modules Vuex
├── utils/         # Fonctions utilitaires
├── assets/        # Ressources statiques (images, styles, etc.)
├── App.vue        # Composant racine
└── main.js        # Point d'entrée de l'application
tests/             # Tests unitaires
public/            # Fichiers publics statiques
vite.config.js     # Configuration Vite
package.json       # Dépendances et scripts npm
```

## Choix techniques

- Vue 3 : Choisi pour sa réactivité et sa facilité d'utilisation.
- Vite : Utilisé comme outil de build pour ses performances rapides.
- Vuex 4 : Implémenté pour une gestion d'état centralisée et efficace.
- Jest : Utilisé pour les tests unitaires.

## Tests unitaires

Des tests unitaires ont été implémentés pour valider la logique métier principale, notamment :

- Ajout de tâches
- Modification de tâches
- Suppression de tâches
- Filtrage des tâches

## Accessibilité

L'application a été développée en tenant compte de l'accessibilité, en utilisant des attributs ARIA et des éléments sémantiques appropriés.

## Performance

Des efforts ont été faits pour optimiser les performances de l'application, notamment :

- Utilisation de la composition API de Vue 3 pour une meilleure réactivité
- Optimisation des rendus avec `v-memo` et `v-once` lorsque approprié
- Lazy loading des composants pour les vues non critiques

## Persistance des données

Les tâches sont persistées localement via localStorage, permettant leur conservation même après un rechargement de la page.

## Pistes d'amélioration

- Implémenter une synchronisation avec un backend pour une persistance à long terme
- Ajouter des fonctionnalités de tri et de catégorisation des tâches
- Améliorer l'interface utilisateur avec des animations et des transitions

## Auteur

[Daouda Koné]
