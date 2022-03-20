"use strict";
const Data = require('./Data/GamesSeedData');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Games",Data,{});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Games", null, {});
    },
};
