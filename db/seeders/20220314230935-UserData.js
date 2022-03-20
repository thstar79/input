"use strict";
const Data = require('./Data/userSeedData');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Users",Data, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
