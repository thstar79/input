"use strict";

module.exports = (sequelize, DataTypes) => {
    const Story = sequelize.define(
        "Story", {
            title: DataTypes.STRING,
            content: DataTypes.TEXT,
            topicType: DataTypes.STRING,
            userId: DataTypes.INTEGER,
            gameId: DataTypes.INTEGER,
        }, {}
    );

    Story.associate = function(models) {
        Story.hasMany(models.Comment, {
            foreignKey: "storyId",
            hooks: true,
            onDelete: "cascade",
        });
        Story.hasMany(models.StoryCoin, {
            foreignKey: "storyId",
            hooks: true,
            onDelete: "cascade",
        });
        Story.belongsTo(models.Game, { foreignKey: "gameId" });
        Story.belongsTo(models.User, { foreignKey: "userId" });
    };

    return Story;
};