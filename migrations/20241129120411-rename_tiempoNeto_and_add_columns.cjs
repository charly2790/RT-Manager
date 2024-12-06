'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Renombrar la columna tiempoNeto a tiempo
    await queryInterface.renameColumn('entrenamientos', 'tiempo', 'tiempoNeto');

    // Agregar las nuevas columnas tiempoTotal y comentario
    await queryInterface.addColumn('entrenamientos', 'tiempoTotal', {
      type: Sequelize.TIME,
      allowNull: true // o false, dependiendo de si es obligatorio
    });

    await queryInterface.addColumn('entrenamientos', 'comentario', {
      type: Sequelize.TEXT,
      allowNull: true // o false, dependiendo de si es obligatorio
    });
  },

  async down (queryInterface, Sequelize) {
    // Revertir los cambios: eliminar las columnas y renombrar de nuevo
    await queryInterface.removeColumn('entrenamientos', 'comentario');
    await queryInterface.removeColumn('entrenamientos', 'tiempoTotal');
    await queryInterface.renameColumn('entrenamientos', 'tiempo', 'tiempoNeto');
  }
};