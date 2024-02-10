FROM node:18.10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

COPY .env ./

CMD ["npm", "start"]
