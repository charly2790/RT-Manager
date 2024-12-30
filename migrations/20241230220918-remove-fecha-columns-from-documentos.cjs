'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('documentos', 'fechaCreacion');
    await queryInterface.removeColumn('documentos', 'fechaUltimaModificacion');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('documentos', 'fechaCreacion', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('documentos', 'fechaUltimaModificacion', {
      type: Sequelize.DATE
    });
  }
};