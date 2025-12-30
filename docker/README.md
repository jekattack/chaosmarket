# Docker Compose — chaosmarket

Kurzanleitung zum Aufsetzen der Entwicklungs-Container (Backend + Frontend web):

1) Kopiere die Beispiel-Env-Datei und passe Werte an

```bash
cp .env.example .env
# setze ein starkes JWT_SECRET
```

2) Baue und starte die Services

```bash
docker compose build
docker compose up
```

- Backend ist unter `http://localhost:3000` erreichbar.
- Frontend (Flutter web, via nginx) ist unter `http://localhost:8080` erreichbar.


3) SQLite DB: Persistiert im Verzeichnis `./backend/data` (Volume). Stelle sicher, dass der Ordner Schreibzugriff hat.

4) Seeding:
 - Das Backend-Image enthält jetzt einen Entrypoint, mit dem du das kompilierte Seeder-File `dist/seed.js` ausführen kannst.
 - Ablauf (empfohlen):

```bash
# 1) Build images (erstellt auch die compiled JS-Dateien im image)
docker compose build backend

# 2) Führe den Seeder aus (Image startet, führt node dist/seed.js aus und beendet sich)
docker compose run --rm backend seed
```

Hinweis: Damit `dist/seed.js` existiert, muss das Projekt während des Image-Builds erfolgreich gebaut werden (der Dockerfile macht `npm run build`). Falls du lokale TypeScript-Seeds bevorzugst, kannst du alternativ lokal `npm run build` und `node dist/seed.js` ausführen.

5) Codespaces / Headless-Umgebungen
- In Codespaces ist das Linux-GUI-Target nicht verfügbar; nutze die Web-Variante (`flutter run -d web-server`) oder teste lokal mit `flutter run -d linux`.

6) Sicherheit
- Ersetze `JWT_SECRET` vor produktiver Nutzung. Entferne `./backend/data` aus Backups, falls sensible Daten enthalten sind.
