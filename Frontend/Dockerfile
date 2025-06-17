# Stage 1: builder

FROM node:alpine:3.18 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src ./src
COPY public ./public    
COPY index.html ./
COPY tsconfig*.json ./
COPY vite.config.ts ./

RUN npm run build

# Stage 2: runtime

FROM  node:alpine:3.22 as runtime

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./

EXPOSE 4173
CMD [ "npm","run","preview","--host","0.0.0.0" ]

