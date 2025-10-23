FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json bun.lock ./

RUN npm install --omit=dev

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/.output .

EXPOSE 3000

CMD ["node", "server/index.mjs"]
