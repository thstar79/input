'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

<<<<<<< HEAD
    // await queryInterface.bulkInsert('StoryCoins', [
    //   { count: 30, storyId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date()},
    //   { count: 25, storyId: 2, userId: 1, createdAt: new Date(), updatedAt: new Date()},
    //   { count: 32, storyId: 1, userId: 2, createdAt: new Date(), updatedAt: new Date()},
    //   { count: 50, storyId: 1, userId: 3, createdAt: new Date(), updatedAt: new Date()},
    // ], {});
=======
    await queryInterface.bulkInsert('StoryCoins', [
      { count: 10, storyId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date()}
    ], {});
>>>>>>> f43e716789f3d228170e7ec6b3562b3522f1ef85

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('StoryCoins', null, {});

  }
};
