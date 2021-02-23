'use strict';
import { sequelize  as sequelizeInstance} from '../../db';

const {  Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
      Role.belongsToMany(models.Permission, {
        through: models.RolePermission, foreignKey:'name_role', as:'permissions'
      });
      Role.hasMany(models.User, {
        foreignKey: 'rolename',
        as: 'users'
      })
    }
  }
  Role.init({
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: DataTypes.DATE
  }, {
    underscored: true,
    sequelize: sequelize,
    modelName: 'Role',
    tableName: 'roles'
  });
  return Role;
};