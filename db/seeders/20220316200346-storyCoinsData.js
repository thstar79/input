'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('StoryCoins', [
      { count: 10, storyId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date()}
    ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('StoryCoins', null, {});

  }
};
