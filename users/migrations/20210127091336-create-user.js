'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: new Sequelize.STRING(128),
        allowNull: false,
      },
      password: {
        type: new Sequelize.STRING(128),
        allowNull: false,
      },
      firstname: {
        type: new Sequelize.STRING(128),
        allowNull: true,
      },
      lastname: {
        type: new Sequelize.STRING(128),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING
      },
      rolename: {
        type: Sequelize.STRING
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};