FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json bun.lock* package-lock.json* yarn.lock* pnpm-lock.yaml* ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine

RUN npm install -g pm2

WORKDIR /app

COPY package.json bun.lock* package-lock.json* yarn.lock* pnpm-lock.yaml* ./

RUN npm install --omit=dev && \
    npm cache clean --force

COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/public /app/public

RUN echo 'module.exports = { \
  apps: [{ \
    name: "nuxt-app", \
    script: ".output/server/index.mjs", \
    instances: "max", \
    exec_mode: "cluster", \
    env: { \
      NODE_ENV: "production", \
      PORT: 3000, \
      HOST: "0.0.0.0" \
    } \
  }] \
}' > ecosystem.config.cjs

EXPOSE 3000

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]
