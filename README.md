# TimeTravel Agency

## Présentation du projet

**TimeTravel Agency** est une webapp pédagogique mettant en scène une entreprise fictive spécialisée dans le voyage temporel par **trou de ver** et **tunnel spatio-temporel**.

L’application permet à l’utilisateur de découvrir plusieurs destinations temporelles, d’obtenir des informations détaillées sur les époques proposées, de discuter avec un agent conversationnel IA, de recevoir une recommandation personnalisée et de faire une demande de réservation.

Le projet a été réalisé dans le cadre d’un exercice de création de webapp moderne et interactive intégrant des contenus générés par IA, une interface immersive et des fonctionnalités dynamiques.

---

## Objectifs du projet

L’objectif était de concevoir une webapp complète autour du concept **TimeTravel Agency**, avec :

* une page d’accueil immersive ;
* une vidéo de fond ;
* une présentation de l’agence ;
* une galerie de destinations temporelles ;
* des cartes interactives ;
* une section de détails par destination ;
* une section de futures destinations ;
* un agent conversationnel IA ;
* un système de recommandation personnalisée ;
* un formulaire de réservation ;
* une documentation technique ;
* un déploiement en ligne.

---

## Fonctionnalités principales

### Page d’accueil

La page d’accueil présente l’univers de TimeTravel Agency avec une vidéo immersive en arrière-plan, un titre principal, une accroche et un bouton d’appel à l’action vers les destinations.

### Présentation de l’agence

Une section explique le concept de l’agence : TimeTravel Agency utilise des tunnels spatio-temporels stabilisés afin de transporter ses clients vers des époques précises.

La section est composée d’une vidéo visible à gauche et d’un texte explicatif à droite.

### Destinations principales

L’application propose trois destinations actuellement ouvertes à la réservation :

* **Paris 1889**
* **Le Crétacé**
* **Florence 1504**

Chaque destination dispose d’une carte avec une image, une courte description et un bouton permettant d’afficher les détails.

### Détails des destinations

Lorsqu’un utilisateur clique sur une destination, une section affiche automatiquement :

* le nom de la destination ;
* la période historique ;
* le type de tunnel ;
* la durée du séjour ;
* le niveau de risque ;
* le prix ;
* une vidéo associée ;
* les activités proposées ;
* les consignes de sécurité.

### Prochaines fenêtres temporelles

Une section présente les futures destinations actuellement en phase de stabilisation :

* Londres 1888 ;
* Gizeh, 2500 av. J.-C. ;
* Tokyo 2150 ;
* Rome, 120 apr. J.-C. ;
* Venise 1750 ;
* Kyoto, époque Edo.

Ces destinations sont visibles dans le site mais ne sont pas encore disponibles à la réservation.

### Conseil personnalisé

Un formulaire de recommandation permet à l’utilisateur de répondre à plusieurs questions sur ses préférences :

* type d’expérience recherchée ;
* période préférée ;
* environnement souhaité ;
* activité idéale.

L’assistant analyse les réponses et recommande l’une des trois destinations actuellement réservables.

### Agent conversationnel IA

Le site intègre un chatbot connecté à une API backend.
L’agent IA peut répondre aux questions sur :

* les destinations disponibles ;
* les futures fenêtres temporelles ;
* les risques ;
* les prix ;
* le fonctionnement du voyage par trou de ver ;
* les recommandations de voyage.

L’agent utilise l’API Mistral lorsque la clé API est configurée.
Si la clé n’est pas disponible, un système de réponse local permet de conserver un fonctionnement minimal.

### Formulaire de réservation

Un formulaire permet à l’utilisateur de demander une réservation en renseignant :

* son nom ;
* son adresse email ;
* la destination ;
* la date de départ ;
* ses préférences de voyage.

Les données sont envoyées au backend, validées, puis enregistrées dans un fichier JSON local.

---

## Technologies utilisées

### Frontend

* HTML5
* CSS3
* JavaScript Vanilla
* Vite

### Backend

* Node.js
* Express.js
* Zod pour la validation des données
* Nanoid pour la génération d’identifiants de réservation
* Dotenv pour la gestion des variables d’environnement
* CORS pour la communication entre frontend et backend

### Intelligence artificielle

* Mistral API pour l’agent conversationnel
* Prompts système personnalisés pour limiter les réponses à l’univers du projet
* Fallback local en cas d’absence de clé API

### Déploiement

* Render pour l’hébergement du projet complet
* GitHub pour le versionnement et la mise en ligne du code

---

## Structure du projet

```txt
timetravel-agency/
│
├── public/
│   └── assets/
│       ├── images/
│       │   ├── paris-1889.jpg
│       │   ├── cretace.jpg
│       │   ├── florence-1504.jpg
│       │   └── upcoming/
│       │       ├── londres-1888.jpg
│       │       ├── gizeh-2500bc.jpg
│       │       ├── tokyo-2150.jpg
│       │       ├── rome-120.jpg
│       │       ├── venise-1750.jpg
│       │       └── kyoto-edo.jpg
│       │
│       └── videos/
│           ├── hero-background.mp4
│           ├── second-background.mp4
│           ├── paris-1889.mp4
│           ├── cretace.mp4
│           └── florence-1504.mp4
│
├── server/
│   ├── ai/
│   │   ├── recommendationAgent.js
│   │   └── timeTravelAgent.js
│   │
│   ├── data/
│   │   └── reservations.json
│   │
│   └── server.js
│
├── src/
│   ├── data/
│   │   └── destinations.js
│   │
│   ├── modules/
│   │   ├── chatbot.js
│   │   ├── recommendation.js
│   │   ├── reservation.js
│   │   └── ui.js
│   │
│   ├── main.js
│   └── style.css
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

---

## Installation du projet

### 1. Cloner le projet

```bash
git clone https://github.com/16ario/TimeTravelAgency.git
cd timetravel-agency
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Créer le fichier `.env`

Créer un fichier `.env` à la racine du projet avec le contenu suivant :

```env
PORT=3001
FRONTEND_URL=http://localhost:5173
MISTRAL_API_KEY=VOTRE_CLE_MISTRAL
MISTRAL_MODEL=mistral-small-latest
```

La clé `MISTRAL_API_KEY` ne doit jamais être partagée publiquement ni envoyée sur GitHub.

---

## Lancement en développement

Pour lancer le frontend Vite et le backend Express en même temps :

```bash
npm run dev
```

Le frontend est accessible à l’adresse :

```txt
http://localhost:5173
```

Le backend est accessible à l’adresse :

```txt
http://localhost:3001
```

Route de test du backend :

```txt
http://localhost:3001/api/health
```

---

## Lancement en production locale

Pour générer la version de production :

```bash
npm run build
```

Puis lancer le serveur :

```bash
npm start
```

Le site est alors accessible à l’adresse :

```txt
http://localhost:3001
```

---

## Scripts disponibles

```json
{
  "dev": "concurrently \"npm run client\" \"npm run server\"",
  "client": "vite",
  "server": "node server/server.js",
  "build": "vite build",
  "preview": "vite preview",
  "start": "node server/server.js"
}
```

### Détail des scripts

| Script            | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Lance le frontend et le backend en développement |
| `npm run client`  | Lance uniquement Vite                            |
| `npm run server`  | Lance uniquement le backend Express              |
| `npm run build`   | Génère le dossier `dist` pour la production      |
| `npm run preview` | Prévisualise le build Vite                       |
| `npm start`       | Lance le serveur Express en production           |

---

## Routes API

### Vérification de l’API

```http
GET /api/health
```

Réponse attendue :

```json
{
  "status": "ok",
  "service": "TimeTravel Agency API"
}
```

---

### Chatbot IA

```http
POST /api/chat
```

Exemple de body :

```json
{
  "message": "Quelle destination est la moins risquée ?",
  "history": []
}
```

Réponse :

```json
{
  "answer": "Paris 1889 est la destination la moins risquée..."
}
```

---

### Recommandation personnalisée

```http
POST /api/recommendation
```

Exemple de body :

```json
{
  "experience": "Culturelle et artistique",
  "period": "Renaissance et classicisme",
  "environment": "L’art et l’architecture",
  "activity": "Explorer des ateliers d’artistes"
}
```

Réponse :

```json
{
  "destination": "Florence 1504",
  "title": "L’Atelier de Michel-Ange",
  "reason": "Florence 1504 correspond à un profil culturel et artistique.",
  "risk": "Modéré",
  "price": "3 200 crédits temporels"
}
```

---

### Réservation

```http
POST /api/reservations
```

Exemple de body :

```json
{
  "name": "Césario",
  "email": "cesario@example.com",
  "destination": "Paris 1889",
  "date": "2026-07-01",
  "message": "Je souhaite une destination avec un risque faible."
}
```

Réponse :

```json
{
  "message": "Réservation enregistrée.",
  "reservation": {
    "id": "TTA-xxxxxxxx",
    "name": "Césario",
    "email": "cesario@example.com",
    "destination": "Paris 1889",
    "date": "2026-07-01",
    "message": "Je souhaite une destination avec un risque faible.",
    "status": "pending_tunnel_stabilization",
    "createdAt": "2026-..."
  }
}
```

---

## Gestion des réservations

Les réservations sont enregistrées dans le fichier :

```txt
server/data/reservations.json
```

Ce stockage est suffisant pour un projet pédagogique.
Pour une application réelle, il faudrait utiliser une base de données comme MongoDB, PostgreSQL ou MySQL.

Sur un hébergement cloud, le stockage local peut être temporaire. Les réservations peuvent donc être perdues si le service est redémarré ou reconstruit.

---

## Sécurité

Le projet applique plusieurs bonnes pratiques :

* clé API stockée dans un fichier `.env` ;
* fichier `.env` ignoré par Git ;
* validation des données avec Zod ;
* vérification du format email ;
* vérification de la date de réservation ;
* séparation frontend / backend ;
* routes API dédiées ;
* fallback local si l’API IA est indisponible.

---

## Utilisation de l’IA

L’intelligence artificielle est utilisée pour deux fonctionnalités principales :

### 1. Agent conversationnel

L’agent conversationnel est configuré pour rester dans l’univers de TimeTravel Agency.
Il peut conseiller les visiteurs, expliquer les destinations, parler des risques et présenter les prochaines fenêtres temporelles.

### 2. Recommandation personnalisée

Le système de recommandation analyse les réponses de l’utilisateur afin de proposer une destination adaptée parmi les fenêtres temporelles actuellement réservables.

---

## Déploiement

Le projet est déployé sur Render.

### Paramètres utilisés

Build Command :

```bash
npm install && npm run build
```

Start Command :

```bash
npm start
```

Variables d’environnement configurées sur Render :

```env
NODE_ENV=production
MISTRAL_API_KEY=VOTRE_CLE_MISTRAL
MISTRAL_MODEL=mistral-small-latest
```

Health Check Path :

```txt
/api/health
```

URL du projet déployé :

```txt
https://timetravelagency-d4bf.onrender.com/
```

---

## Limites du projet

Le projet reste une webapp pédagogique. Certaines fonctionnalités sont volontairement simplifiées :

* les réservations sont stockées dans un fichier JSON ;
* il n’y a pas d’authentification utilisateur ;
* il n’y a pas d’espace administrateur ;
* les futures destinations ne sont pas encore réservables ;
* la modification ou l’annulation de réservation n’est pas implémentée ;
* le stockage local n’est pas adapté à une application de production réelle.

---

## Améliorations possibles

Plusieurs améliorations pourraient être ajoutées :

* connecter les réservations à une base de données ;
* ajouter un espace administrateur ;
* ajouter une confirmation par email ;
* ajouter une page dédiée par destination ;
* rendre les futures destinations réservables ;
* ajouter un système de paiement fictif ;
* ajouter une authentification ;
* ajouter un historique des conversations avec l’agent IA ;
* améliorer le responsive mobile ;
* ajouter des animations supplémentaires.



