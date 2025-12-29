# chaosmarket
**Project**: ChaosMarket — Polymarket-ähnliche Demo (NestJS backend + Flutter frontend)

- **Backend**: [backend](backend) — NestJS, TypeORM, SQLite, JWT-Auth
- **Frontend**: [frontend](frontend) — Flutter, Provider

**Schnellstart (Backend)**

1. Abhängigkeiten installieren und Entwicklungsserver starten:

```bash
cd backend
npm install
npm run start:dev
```

2. Seed-Daten einspielen (optional):

```bash
cd backend
npx ts-node -r tsconfig-paths/register src/seed.ts
```

API läuft standardmäßig auf `http://localhost:3000`.

**Schnellstart (Frontend)**

1. Flutter-Abhängigkeiten installieren und App starten:

```bash
cd frontend
flutter pub get
flutter run
```

Die Flutter-App verbindet sich standardmäßig mit `http://localhost:3000`.

Weitere Details zu Endpunkten und Entwicklung findest du in den jeweiligen Ordnern.