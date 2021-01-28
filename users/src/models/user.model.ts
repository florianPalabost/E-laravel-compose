'use strict';
import { sequelize  as sequelizeInstance} from '../../db';

const {  Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    sequelize: sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};