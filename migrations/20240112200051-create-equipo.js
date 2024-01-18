'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('equipos', {      
      idEquipo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      activo: {
        type: Sequelize.BOOLEAN
      },
      direccion: {
        type: Sequelize.STRING
      },
      fecha_fundacion: {
        type: Sequelize.DATE
      },
      avatar: {
        type: Sequelize.STRING
      },
      numero_telefono: {
        type: Sequelize.STRING
      },
      numero_telefono_2: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('equipos');
  }
};