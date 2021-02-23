'use strict';

const {  Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      // define assosciation here
      Permission.belongsToMany(models.Role, {
        through: models.RolePermission, foreignKey: 'name_permission', as: 'roles'
      })
    }
  }
  Permission.init({
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
    modelName: 'Permission',
    tableName: 'permissions'
  });
  return Permission;
};