'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Stories', [
       { title: 'Pokemon Emerald', content: 'Steve played pokemon emerald on his gameboy advance', topicType: 'Story', userId: 2, gameId: 26, createdAt: new Date(), updatedAt: new Date() },
       { title: 'Elden Ring', content: 'Jared wishes he was playing Elden Ring', topicType: 'Review', userId: 4, gameId: 25, createdAt: new Date(), updatedAt: new Date() }
      ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Stories', null, {});

  }
};
