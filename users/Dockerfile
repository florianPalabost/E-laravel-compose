FROM node:12

RUN mkdir -p /var/www/html
WORKDIR /var/www/html
RUN npm install -g nodemon
RUN npm install -g sequelize-cli
COPY package.json /var/www/html
COPY ./package-lock.json /var/www/html
RUN npm install
COPY . /var/www/html

# Copy existing application directory permissions
COPY --chown=node:node . /var/www/html
USER node

EXPOSE 8081
CMD npm run dev
