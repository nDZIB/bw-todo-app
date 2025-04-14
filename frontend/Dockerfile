FROM node:18.13.0 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install -f

RUN npm install -g @angular/cli@17.3.10

COPY . .

RUN ng build --configuration=development

FROM nginx:latest

COPY --from=build app/dist/frontend/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf 

EXPOSE 80