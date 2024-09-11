'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('perfiles', 'fechaCreacion');
  },

  down: async (queryInterface, Sequelize) => {
    // Para deshacer esta migración, añadimos la columna de nuevo
    await queryInterface.addColumn('perfiles', 'fechaCreacion', {
      type: Sequelize.DATE,
    });
  }
};
