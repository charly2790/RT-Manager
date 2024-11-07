'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permisosPorRol', [
      { idRol: 1, idPermiso: 26 },
      { idRol: 2, idPermiso: 26 },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permisosPorRol', {
      idPermiso: 26, 
      idRol: {
        [Sequelize.Op.in]: [1, 2]
      }
    }, {});
  }
};
