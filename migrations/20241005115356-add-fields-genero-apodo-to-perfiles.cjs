'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('perfiles', 'genero', {
      type: Sequelize.STRING,
      allowNull: true, // Cambia a false si deseas que este campo sea obligatorio
    });

    await queryInterface.addColumn('perfiles', 'apodo', {
      type: Sequelize.STRING,
      allowNull: true, // Cambia a false si deseas que este campo sea obligatorio
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('perfiles', 'genero');
    await queryInterface.removeColumn('perfiles', 'apodo');
  }
};