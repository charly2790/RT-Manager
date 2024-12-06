'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    

    await queryInterface.addColumn('sesiones', 'comentario', {
      type: Sequelize.TEXT,
      allowNull: true // o false, dependiendo de si es obligatorio
    });
  },

  async down (queryInterface, Sequelize) {
    // Revertir los cambios: eliminar las columnas y renombrar de nuevo
    await queryInterface.removeColumn('sesiones', 'comentario');
  }
};