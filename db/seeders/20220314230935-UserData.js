'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users', [
       {firstName: 'John Doe', lastName: 'Taehoon', userName: 'aaaa', email: 'taehoon@gmail.com', hashedPassword: 'd1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082', createdAt: new Date(), updatedAt: new Date()},
       {firstName: 'Steve', lastName: 'Choi', userName: 'ChoiCes', email: 'steve@choi.com', hashedPassword: 's1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082', createdAt: new Date(), updatedAt: new Date()},
       {firstName: 'Haywood', lastName: 'Johnson', userName: 'Haywood', email: 'haywood@johnson.com', hashedPassword: 'c1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082', createdAt: new Date(), updatedAt: new Date()},
       {firstName: 'Jared', lastName: 'Kunhart', userName: 'Purity', email: 'purity@purity.com', hashedPassword: 'b1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082', createdAt: new Date(), updatedAt: new Date()}
      ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
