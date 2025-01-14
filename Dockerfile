# FROM node:18

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# # Exponemos el puerto de Vite
# EXPOSE 5173

# CMD ["npm", "run", "dev"]
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# Exponer el puerto 80
EXPOSE 80

CMD ["npm", "run", "dev"]
