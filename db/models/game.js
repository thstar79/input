"use strict";

module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define(
        "Game",
        {
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            genre: DataTypes.STRING,
            releaseDate: DataTypes.DATEONLY,
        },
        {}
    );
    Game.associate = function (models) {
        Game.hasMany(models.Story, { foreignKey: "gameId" });
    };

    return Game;
};
