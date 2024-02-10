FROM node:18.10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

COPY .env ./

# Command to run Node.js backend
CMD ["npm", "start"]
