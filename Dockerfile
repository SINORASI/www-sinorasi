FROM node:22-alpine as builder

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./
RUN npm install -g bun
RUN bun install

COPY . .

RUN npm run build

FROM node:22-alpine as runner

WORKDIR /app

COPY --from=builder /app/.output ./.output
RUN npm install -g pm2

EXPOSE 3000

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["pm2-runtime", "start", ".output/server/index.mjs", "-i", "max", "--name", "www-sinorasi"]
