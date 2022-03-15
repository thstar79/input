"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            firstName: {
                allowNull: false,
                type: Sequelize.STRING(50),
            },
            lastName: {
                allowNull: false,
                type: Sequelize.STRING(50),
            },
            userName: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING(50),
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING(100),
            },
            hashedPassword: {
                allowNull: false,
                type: Sequelize.STRING.BINARY,
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
        await queryInterface.dropTable("Users");
    },
};
