'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permisos', [
      { descripcion: 'ENTRENAMIENTO_CREATE', idUsuarioCreador: 2, idUsuarioUltimaModificacion: 2, createdAt: new Date(), updatedAt: new Date() },
      { descripcion: 'ENTRENAMIENTO_READ', idUsuarioCreador: 2, idUsuarioUltimaModificacion: 2, createdAt: new Date(), updatedAt: new Date() },      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Eliminar solo los registros que se agregaron en el método up
    await queryInterface.bulkDelete('permisos', {
      descripcion: {
        [Sequelize.Op.in]: ['ENTRENAMIENTO_CREATE', 'ENTRENAMIENTO_READ']
      }
    }, {});
  }
};
