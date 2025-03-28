'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('usuarios', [
      {
        nombre: 'Benito Pérez',
        correo: 'benito@example.com',
        contrasena: '$2b$10$Q2fykXuDPRg1QOc4d4uuie5SDns3bI1lyxbPluuCMD74cRS0tFc9a', //! password#Seguro123
        rol: 'Cliente',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Juan Pérez',
        correo: 'juan@example.com',
        contrasena: '$2b$10$Q2fykXuDPRg1QOc4d4uuie5SDns3bI1lyxbPluuCMD74cRS0tFc9a', //! password#Seguro123
        rol: 'Cliente',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Ana López',
        correo: 'ana@example.com',
        contrasena: '$2b$10$UdCBN2vAWAxu73fFmYwvAeMHQqcMB6RlVjRL9sDVTZRL8tvk.X9CG', //! otraContraseña#123
        rol: 'Negocio',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Pedro López',
        correo: 'pedro@example.com',
        contrasena: '$2b$10$UdCBN2vAWAxu73fFmYwvAeMHQqcMB6RlVjRL9sDVTZRL8tvk.X9CG', //! otraContraseña#123
        rol: 'Negocio',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('usuarios', null, {});
  }
};
