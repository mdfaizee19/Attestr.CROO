FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY src/ ./src/
COPY tsconfig.json ./

RUN npx tsc

CMD ["node", "dist/coordinator/index.js"]
