# ============================================
# Stage 1: Dependencies Installation Stage
# ============================================
ARG NODE_VERSION=24.13.0-slim
FROM node:${NODE_VERSION} AS dependencies

# Install openssl required by Prisma engine
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Copy package files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Copy the prisma directory
COPY prisma ./prisma/

# Install dependencies
RUN --mount=type=cache,target=/root/.npm \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then corepack enable yarn && yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "No lockfile found." && exit 1; \
  fi

# Generate Prisma Client
RUN npx prisma generate

# ============================================
# Stage 2: Build Next.js application
# ============================================
FROM node:${NODE_VERSION} AS builder
WORKDIR /app

# Redeclare ARGs to receive them from docker-compose build args
ARG NEXT_PUBLIC_API_URL
ARG DATABASE_URL

# Set ENV so 'next build' can access them
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# During build, point exactly to the internal sqlite file
ENV DATABASE_URL="file:/app/prisma/dev.db"
ENV NODE_ENV=production

# Copy node_modules and source
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Run the build (Triggers sitemap.xml generation)
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

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy assets and standalone build
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
# Copy prisma folder for runtime DB access
COPY --from=builder --chown=node:node /app/prisma ./prisma

USER node
EXPOSE 3000

CMD ["node", "server.js"]