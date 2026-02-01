FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    && rm -rf /var/lib/apt/lists/*

COPY back-end/package*.json ./
RUN npm install --omit=dev

COPY back-end .

EXPOSE 3000

CMD ["node", "server"]
