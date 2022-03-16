"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("StoryCoins", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            count: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            storyId: {
                allowNull: false,
                references: { model: "Stories" },
                type: Sequelize.INTEGER,
            },
            userId: {
                allowNull: false,
                references: { model: "Users" },
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("StoryCoins");
    },
};
