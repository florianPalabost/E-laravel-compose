'use strict';
import { sequelize  as sequelizeInstance} from '../../db';

const {  Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    static associate(models) {
      // define association here
    }
  }
  // RolePermission.removeAttribute('id');
  RolePermission.init({
    name_role: {
      type: DataTypes.STRING,
      primaryKey: true,
       allowNull: false
    },
    name_permission: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    is_allowed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: DataTypes.DATE
  }, {
    underscored: true,
    sequelize: sequelize,
    modelName: 'RolePermission',
    tableName: 'roles_permissions'
  });
  return RolePermission;
};