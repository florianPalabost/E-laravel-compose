FROM nginx:latest AS build

WORKDIR /usr/src/app
COPY ../../html/resources/frontend/angular/package.json ./
RUN npm install
COPY ../../html/resources/frontend/angular/* .
RUN npm run build

FROM nginx:latest
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/angular /usr/share/nginx/html
EXPOSE 80
