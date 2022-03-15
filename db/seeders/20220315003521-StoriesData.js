'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Stories', [
       { title: 'Pokemon1', content: 'Steve played pokemon emerald on his gameboy advance1', topicType: 'Story', userId: 2, gameId: 27, createdAt: new Date(), updatedAt: new Date() },
       { title: 'Pokemon2', content: 'Steve played pokemon emerald on his gameboy advance2', topicType: 'Story', userId: 3, gameId: 28, createdAt: new Date(), updatedAt: new Date() },
       { title: 'Pokemon3', content: 'Steve played pokemon emerald on his gameboy advance3', topicType: 'Story', userId: 4, gameId: 29, createdAt: new Date(), updatedAt: new Date() },
       { title: 'Pokemon4', content: 'Steve played pokemon emerald on his gameboy advance4', topicType: 'Story', userId: 5, gameId: 30, createdAt: new Date(), updatedAt: new Date() },
      ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Stories', null, {});

  }
};
