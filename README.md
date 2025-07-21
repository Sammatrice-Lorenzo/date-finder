# 📅 DateFinder — Planifie tes rendez-vous facilement

**DateFinder** est une application web moderne développée avec [Next.js](https://nextjs.org) et [React](https://reactjs.org), conçue pour planifier des activités à deux. Elle permet d'envoyer des invitations, d'organiser des sorties (cinéma, parc, restaurant, etc.), et de gérer le suivi des réponses.  
Le projet est optimisé pour une expérience fluide grâce à la technologie **PWA**, un design responsive, et une compatibilité avec les calendriers via l'e-mail.

---

## 🚀 Démarrage rapide

### 🔧 Installation

Clone le projet et installe les dépendances :

```bash
git clone https://github.com/ton-utilisateur/DateFinder.git
cd DateFinder
yarn install
```

## 🔐 Configuration SSL (localhost HTTPS)

Pour utiliser HTTPS localement (optionnel mais utile pour les fonctionnalités comme les PWA) :

mkcert -install
mkcert -key-file key.pem -cert-file cert.pem localhost 127.0.0.1

Puis déplace le certificat dans le bon dossier :

```bash
  cd /usr/local/share/ca-certificates
  cp mkcert_development_CA_XXXXXXXX.crt /app/
```

Remplace le nom du certificat par celui généré (ls -la pour le voir).

## 🧩 Fonctions principales

- 📨 Création et partage d'invitations

- 📆 Ajout automatique aux calendriers

- 🌐 Localisation des activités à proximité

- 🎞️ Intégration des films et lieux populaires

- 🛜 Mode PWA (installation possible sur mobile)

- 🌍 Multilingue (Français, Anglais, Espagnol, Portugais)

## 🛠️ Technologies utilisées

- Next.js 15

- React 18+

- TypeScript

- Material UI

- PWA Support
