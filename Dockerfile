# ============================================
# Stage 1: Dependencies Installation Stage
# ============================================
ARG NODE_VERSION=24.13.0-slim
FROM node:${NODE_VERSION} AS dependencies


RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN --mount=type=cache,target=/root/.npm \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then corepack enable yarn && yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "No lockfile found." && exit 1; \
  fi

RUN npx prisma generate

# ============================================
# Stage 2: Build Next.js application
# ============================================
FROM node:${NODE_VERSION} AS builder
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ARG DATABASE_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV DATABASE_URL=$DATABASE_URL
ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN if [ -f package-lock.json ]; then npm run build; \
  elif [ -f yarn.lock ]; then corepack enable yarn && yarn build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm build; \
  else echo "No lockfile found." && exit 1; \
  fi

# ============================================
# Stage 3: Runner
# ============================================
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

# Ensure we have openssl at runtime for Prisma
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 1. Copy everything needed for the migration and the app
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/prisma ./prisma
COPY --from=builder --chown=node:node /app/prisma.config.ts ./

# 2. Copy the FULL node_modules from dependencies stage to ensure
# Prisma 7 has all its internal requirements (like valibot)
COPY --from=dependencies --chown=node:node /app/node_modules ./node_modules

USER node
EXPOSE 3000

# 3. Run migration and start server
CMD npx prisma db push --accept-data-loss && node server.js