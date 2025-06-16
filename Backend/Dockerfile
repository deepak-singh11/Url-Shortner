# Stage 1
FROM node:20 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./
RUN npm run build

# Stage 2

FROM node:20 as runtime

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

CMD [ "npm", "start" ]