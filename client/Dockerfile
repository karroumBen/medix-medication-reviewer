FROM node:18.10-alpine AS angular-build

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .
ARG ENV_FILE=environment.development.ts
COPY ./src/environments/${ENV_FILE} ./src/environments/environment.ts

RUN npm run build --prod --configuration=development

FROM nginx:latest

COPY --from=angular-build /usr/src/app/dist/client /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
