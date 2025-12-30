#!/bin/sh
set -e

APP_CMD="node dist/main.js"

if [ "$1" = "seed" ]; then
  if [ -f dist/seed.js ]; then
    echo "Running seed script: node dist/seed.js"
    node dist/seed.js
    exit 0
  else
    echo "dist/seed.js not found. Did you build the project?"
    echo "You can run: npm run build (locally) or rebuild the image."
    exit 1
  fi
fi

# If no args or other args provided, run the server
echo "Starting server: $APP_CMD"
exec sh -c "$APP_CMD"
