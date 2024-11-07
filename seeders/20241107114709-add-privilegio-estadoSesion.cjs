'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permisos', [
      { descripcion: 'ESTADO-SESION_CREATE', idUsuarioCreador: 2, idUsuarioUltimaModificacion: 2, createdAt: new Date(), updatedAt: new Date() },
      { descripcion: 'ESTADO-SESION_READ', idUsuarioCreador: 2, idUsuarioUltimaModificacion: 2, createdAt: new Date(), updatedAt: new Date() },      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Eliminar solo los registros que se agregaron en el método up
    await queryInterface.bulkDelete('permisos', {
      descripcion: {
        [Sequelize.Op.in]: ['ESTADO-SESION_CREATE', 'ESTADO-SESION_READ']
      }
    }, {});
  }
};
