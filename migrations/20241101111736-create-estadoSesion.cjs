'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('estadosDeSesion',{
      idEstado: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion:{        
        type: Sequelize.STRING,
        allowNull: false,
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('estadosDeSesion');
  }
};
