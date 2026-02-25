# Берем Node.js 22 (совпадает с твоей версией)
FROM node:22-alpine

# Создаем рабочую папку
WORKDIR /app

# Копируем файлы с зависимостями
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем весь проект
COPY . .

# Собираем приложение
RUN npm run build

# Запускаем приложение
CMD ["npm", "start"]