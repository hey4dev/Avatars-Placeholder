FROM node:20-bookworm-slim

WORKDIR /app

COPY back-end/package*.json ./

RUN npm ci --omit=dev

COPY back-end/ ./

EXPOSE 3000

CMD ["node", "server"]
