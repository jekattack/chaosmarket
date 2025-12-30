# Chaosmarket Backend — README

Kurz: NestJS + TypeORM (SQLite) API für ein kleines Wett‑/Markt‑Beispiel.

Schnellstart

1. Wechsel in das Backend‑Verzeichnis:

```bash
cd backend
```

2. Abhängigkeiten installieren:

```bash
npm install
```

3. Optionale Umgebungsvariablen (Beispiele):

```bash
export JWT_SECRET=changeme
export JWT_EXPIRES_IN=60m
```

4. Seed ausführen (erstellt Beispiel‑User und Märkte):

```bash
npx ts-node -r tsconfig-paths/register src/seed.ts
```

5. Dev‑Server starten:

```bash
npm run start:dev
# startet auf Port 3000
```

Tests

```bash
npm test
# E2E: npm run test:e2e
```

Datenbank

- Die Anwendung verwendet SQLite und legt die Datei `database.sqlite` im Backend‑Ordner an.
- Wenn Probleme mit Dateiberechtigungen auftreten, prüfe Besitz bzw. Berechtigungen des Arbeitsverzeichnisses.

Debug & Troubleshooting

- Wenn Tests TypeScript‑Fehler melden, zuerst `npm install` ausführen und ggf. die verwendeten Paketversionen prüfen.
- Fehlende ENV‑Variablen: `JWT_SECRET` wird standardmäßig auf `secretKey` gesetzt, es ist aber empfehlenswert, ein sicheres Secret zu verwenden.
- Seed‑Fehler bzgl. Entities: Stelle sicher, dass alle Entities in `src/seed.ts` registriert sind (User, Market, Bet).
- Bei Problemen mit `ts-node` oder Pfaden: `npx ts-node -r tsconfig-paths/register src/seed.ts` verwenden.

Wichtige Endpunkte

- POST `/auth/register` — Register (body: `{ email, password, name }`) → returns `access_token`.
- POST `/auth/login` — Login (body: `{ email, password }`) → returns `access_token`.
- GET `/markets` — Liste aller Märkte.
- POST `/markets` — (Auth) Markt erstellen (Authorization: `Bearer <token>`).
- POST `/bets` — (Auth) Wette platzieren (Authorization: `Bearer <token>`).

Weitere Hinweise

- Dieses Projekt ist ein Beispiel; für Produktion: migrations nutzen statt `synchronize: true`, sichere Secrets verwenden und keine plain‑SQLite auf Shared Storage.

Dateien, die während des Aufräumens/Tests geändert wurden:

- `package.json`, `test/jest-e2e.json`, `src/seed.ts`, Controller/Service/DTO‑Fixes, Tests unter `src/auth` und `src/bets`.

Viel Erfolg — wenn du willst, implementiere ich als Nächstes die Frontend‑Integration (`market_detail_screen.dart`).
