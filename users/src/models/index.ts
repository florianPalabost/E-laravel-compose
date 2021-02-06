'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// @ts-ignore
const database = {
  sequelize: undefined,
  Sequelize: undefined
};

let sequelize =  new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: Number.parseInt(process.env.POSTGRES_PORT, 10),
  define: {
    freezeTableName: true,
    timestamps: true,
  },
  pool: {
      max: 10,
      min: 0,
      idle: 10 * 1000,
  },
});

fs
  .readdirSync(__dirname)
  .filter(file => {

    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    database[model.name] = model;
  });
Object.keys(database).forEach(modelName => {
 if (modelName !== 'sequelize' && modelName !== 'Sequelize') {
   if (database[modelName].associate) {
     database[modelName].associate(database);
   }
 }

});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;
