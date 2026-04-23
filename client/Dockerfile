FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npx", "next", "dev", "-H", "0.0.0.0", "-p", "3000"]