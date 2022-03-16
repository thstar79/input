"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Stories", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING(50),
            },
            content: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            topicType: {
                allowNull: false,
                type: Sequelize.STRING(50),
            },
            userId: {
                allowNull: false,
                references: { model: "Users" },
                type: Sequelize.INTEGER,
            },
            gameId: {
                allowNull: false,
                references: { model: "Games" },
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
        await queryInterface.dropTable("Stories");
    },
};
