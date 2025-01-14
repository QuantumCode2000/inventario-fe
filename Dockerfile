# # Usa Node con Alpine
# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# EXPOSE 5173
# CMD ["npm", "run", "dev"]

# # FROM node:18

# # WORKDIR /app

# # COPY package*.json ./
# # RUN npm install

# # # Exponer el puerto 80
# # EXPOSE 80

# # CMD ["npm", "run", "dev"]
FROM alpine:3.20

# Instalar Node.js y npm
RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev"]
