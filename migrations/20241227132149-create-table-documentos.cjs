'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('documentos', {
      idDocumento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      link: {
        type: Sequelize.TEXT
      },
      idCategoria: {
        type: Sequelize.INTEGER
      },
      fechaCreacion: {
        type: Sequelize.DATE
      },
      fechaUltimaModificacion: {
        type: Sequelize.DATE
      },
      idUsuarioUltimaModificacion: {
        type: Sequelize.INTEGER
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('documentos');
  }
};