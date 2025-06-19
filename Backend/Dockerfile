# Stage 1
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src/
RUN npm run build

# Stage 2

FROM node:18-alpine AS runtime

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/index.js" ] 