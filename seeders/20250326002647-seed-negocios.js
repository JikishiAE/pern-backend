'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('negocios', [
      {
        nombre: 'Tienda',
        propietario_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Mercado',
        propietario_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('negocios', null, {});
  }
};
