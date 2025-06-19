# Stage 1: builder (no changes - keep as is)
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

# Add these two lines:
ARG VITE_BASE_URL
ENV VITE_BASE_URL=${VITE_BASE_URL}


COPY src ./src
COPY public ./public
COPY index.html ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
RUN npm run build

# Stage 2: runtime (change to use 'serve')
FROM node:18-alpine AS runtime 

# Install 'serve' globally
RUN npm install -g serve

# Copy ONLY the contents of the built dist folder into the current WORKDIR (/app/dist)
COPY --from=builder /app/dist .

EXPOSE 4173
# Command to start 'serve'
CMD ["serve", "-s", ".", "-l", "4173"]