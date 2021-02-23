'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles_permissions', {
        name_role: {
            type: new Sequelize.STRING(128),
            allowNull: false,
            primaryKey: true,
            references: {
                model: {tableName: 'roles'},
                key: 'name',
            },
            onDelete: 'CASCADE',
        },
        name_permission: {
            type: new Sequelize.STRING(128),
            allowNull: false,
            primaryKey: true,
            references: {
                model:  {tableName: 'permissions'},
                key: 'name'
            },
            onDelete: 'CASCADE',
        },
        is_allowed: {
            type: new Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
        }
    });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('roles_permissions');
  }
};
