FROM node:20.12.0-alpine3.19

WORKDIR /app

COPY package*.json ./
COPY turbo.json ./

COPY . .

RUN npm install

RUN npm run db:generate

RUN npm run build

EXPOSE 3000 3002 3003

CMD ["npm", "run", "dev"]