
FROM node:18-alpine AS base

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# 2️⃣ Build stage
FROM base AS builder

COPY . .

RUN pnpm build

# 3️⃣ Production stage - Chạy app tối ưu
FROM node:18-alpine AS runner

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy output từ builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./

# Cài đặt production dependencies
RUN pnpm install --prod

# Expose cổng Next.js
EXPOSE 3333

# Chạy app ở chế độ production
CMD ["pnpm", "start"]