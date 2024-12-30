'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mediaEntrenamientos', {
      idMedia: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      idEntrenamiento: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      idDocumento: {
        type: Sequelize.INTEGER,
        references: {
          model: 'documentos',
          key: 'idDocumento'
        },
        allowNull: false
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
    await queryInterface.dropTable('mediaEntrenamientos');
  }
};