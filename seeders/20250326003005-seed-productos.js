'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('productos', [
      {
        negocio_id: 1,
        nombre: 'Maruchan',
        cantidad: 15,
        precio: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        negocio_id: 1,
        nombre: 'Coca-Cola',
        cantidad: 10,
        precio: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        negocio_id: 2,
        nombre: 'Nissin',
        cantidad: 15,
        precio: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        negocio_id: 2,
        nombre: 'Pepsi',
        cantidad: 10,
        precio: 16,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('productos', null, {});
  }
};
