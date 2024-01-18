'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('suscripciones', {      
      idSuscripcion: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUsuario: {
        type: Sequelize.INTEGER
      },
      idEquipo: {
        type: Sequelize.INTEGER
      },
      activo: {
        type: Sequelize.BOOLEAN
      },      
      usuario_creador: {
        type: Sequelize.INTEGER
      },
      usuario_modificador: {
        type: Sequelize.INTEGER
      },      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('suscripciones');
  }
};