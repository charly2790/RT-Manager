'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('perfiles', 'idUsuario', {
      type: Sequelize.INTEGER,
      references: {
        model: 'usuarios',
        key: 'idUsuario'
      },
      allowNull: false
    })    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('perfiles', 'idUsuario');
  }
};
