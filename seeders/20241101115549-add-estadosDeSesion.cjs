'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('estadosDeSesion', [
      { descripcion: 'PENDIENTE', createdAt: new Date(), updatedAt: new Date() },
      { descripcion: 'ENVIADA', createdAt: new Date(), updatedAt: new Date() },
      { descripcion: 'VALIDADA', createdAt: new Date(), updatedAt: new Date() },
      { descripcion: 'VENCIDA', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('estadosDeSesion', null, {});
  }
};