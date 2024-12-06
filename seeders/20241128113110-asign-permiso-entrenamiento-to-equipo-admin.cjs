'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permisosPorRol', [
      { idRol: 1, idPermiso: 29 },
      { idRol: 2, idPermiso: 29 },      
      { idRol: 1, idPermiso: 28 },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permisosPorRol', {
      idPermiso: {
        [Sequelize.Op.in]: [28, 29]
      }, 
      idRol: {
        [Sequelize.Op.in]: [1, 2]
      }
    }, {});
  }
};
