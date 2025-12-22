FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
COPY tsconfig.base.json ./
COPY libs/package.json ./libs/
COPY apps/web/package.json ./apps/web/

RUN npm ci

FROM node:20-alpine AS dev
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/libs ./libs
COPY --from=deps /app/apps/web ./apps/web

COPY tsconfig.base.json ./
COPY package.json ./
COPY libs ./libs
COPY apps/web ./apps/web

ENV NODE_ENV=development

EXPOSE 3000

CMD ["npm", "run", "dev", "--workspace=apps/web"]

FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY tsconfig.base.json ./
COPY package.json ./
COPY libs ./libs
COPY apps/web ./apps/web

ENV NODE_ENV=production

RUN npm run build --workspace=apps/web

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
