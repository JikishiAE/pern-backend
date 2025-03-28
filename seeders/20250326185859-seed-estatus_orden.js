'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('estatus_orden', [
      {
        nombre: 'Por pagar',
      },
      {
        nombre: 'Pagada',
      },
      {
        nombre: 'Devuelta',
      },
      {
        nombre: 'Cancelada',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('estatus_orden', null, {});
  }
};
