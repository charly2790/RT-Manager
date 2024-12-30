'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categoriasDeDocumentos', {
      idCategoria: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      descripcion: {
        type: Sequelize.STRING,
        unique: true
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
    await queryInterface.dropTable('categoriasDeDocumentos');
  }
};