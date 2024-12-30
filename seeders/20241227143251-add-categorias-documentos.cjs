'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categoriasDeDocumentos', [
      { descripcion: 'ENTRENAMIENTOS', fechaCreacion: new Date(), fechaUltimaModificacion: new Date(), idUsuarioUltimaModificacion: 2 },
      { descripcion: 'CERTIFICADOS', fechaCreacion: new Date(), fechaUltimaModificacion: new Date(), idUsuarioUltimaModificacion: 2 },
      { descripcion: 'COMPROBANTES', fechaCreacion: new Date(), fechaUltimaModificacion: new Date(), idUsuarioUltimaModificacion: 2 },
      { descripcion: 'TUTORIALES', fechaCreacion: new Date(), fechaUltimaModificacion: new Date(), idUsuarioUltimaModificacion: 2 },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Eliminar solo los registros que se agregaron en el método up
    await queryInterface.bulkDelete('categoriasDeDocumentos', {
      descripcion: {
        [Sequelize.Op.in]: ['ENTRENAMIENTOS', 'CERTIFICADOS', 'COMPROBANTES', 'TUTORIALES']
      }
    }, {});
  }
};
