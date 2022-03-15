'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users', [
       {firstName: 'Taehoon', lastName: 'Kim', userName: 'TaehoonK', email: 'taehoon@gmail.com', hashedPassword: '$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu', createdAt: new Date(), updatedAt: new Date()},
       {firstName: 'Steve', lastName: 'Choi', userName: 'ChoiCes', email: 'steve@choi.com', hashedPassword: '$2a$10$KWrcxl/xM2B2LzEw5Lmai.S7w/xCh3dSSMfYKe16qqf3R0HpgZ1RO', createdAt: new Date(), updatedAt: new Date()},
       {firstName: 'Haywood', lastName: 'Johnson', userName: 'Haywood', email: 'haywood@johnson.com', hashedPassword: '$2a$10$Fbmn6VFmgwrF0HfB9okkxumzgSyzO0EKscCXpFpaYh/8MmkPNPIVS', createdAt: new Date(), updatedAt: new Date()},
       {firstName: 'Jared', lastName: 'Kunhart', userName: 'Purity', email: 'purity@purity.com', hashedPassword: '$2a$10$l2aXuXINHmsixR8r3YL5NOxG0npTSmCuD6i2rs48a2bF5BqzYWs6C', createdAt: new Date(), updatedAt: new Date()}
      ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
