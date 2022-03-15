"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Follows", {
            followee: {
                allowNull: false,
                references: { model: "Users" },
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            follower: {
                allowNull: false,
                references: { model: "Users" },
                primaryKey: true,
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
        await queryInterface.dropTable("Follows");
    },
};
