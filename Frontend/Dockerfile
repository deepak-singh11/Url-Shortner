# Stage 1: builder

FROM node:alpine:3.22 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src ./
RUN tsc -b 

