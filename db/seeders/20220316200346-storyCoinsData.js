'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('StoryCoins', [
      { count: 30, storyId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date()},
      { count: 25, storyId: 2, userId: 1, createdAt: new Date(), updatedAt: new Date()},
      { count: 10, storyId: 4, userId: 1, createdAt: new Date(), updatedAt: new Date()},
      { count: 40, storyId: 3, userId: 1, createdAt: new Date(), updatedAt: new Date()},
      { count: 32, storyId: 1, userId: 2, createdAt: new Date(), updatedAt: new Date()},
      { count: 50, storyId: 1, userId: 3, createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('StoryCoins', null, {});

  }
};
