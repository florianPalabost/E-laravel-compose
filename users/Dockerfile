FROM node:12

RUN mkdir -p /var/www/html
WORKDIR /var/www/html
RUN npm install -g nodemon
RUN npm install -g sequelize
COPY package.json /var/www/html
COPY ./package-lock.json /var/www/html
RUN npm install
COPY . /var/www/html

EXPOSE 8081
CMD npm run dev
