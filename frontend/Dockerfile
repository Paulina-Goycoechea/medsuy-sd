# Etapa 1 — Build Vite
FROM node:20 AS build

WORKDIR /app

# Copiar configs
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY vite.config.ts ./
COPY postcss.config.js ./
COPY tailwind.config.ts ./
COPY components.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Ejecutar build de Vite
RUN npm run build


# Etapa 2 — Servir con Nginx
FROM nginx:stable

# Copiar config de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos generados por Vite
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
