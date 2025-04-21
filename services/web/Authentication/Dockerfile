FROM node:22.1.0

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

# Comando por defecto para ejecutar la app
CMD ["npm", "run", "start"]
