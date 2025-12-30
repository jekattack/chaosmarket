FROM node:20-alpine AS builder
WORKDIR /app

# Install deps and build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

# Application files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Persistent folder for SQLite DB
VOLUME ["/data"]
ENV DATABASE_FILE=/data/database.sqlite
ENV JWT_SECRET=changeme

EXPOSE 3000

# Entrypoint wrapper allows running `seed` or the default server
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh
ENTRYPOINT ["sh", "/app/docker-entrypoint.sh"]
