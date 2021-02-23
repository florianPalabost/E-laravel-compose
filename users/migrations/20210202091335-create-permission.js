'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: new Sequelize.STRING(128),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      description: {
        type: new Sequelize.STRING(128),
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
    await queryInterface.dropTable('permissions');
  }
};