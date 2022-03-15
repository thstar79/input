"use strict";

module.exports = (sequelize, DataTypes) => {
    const StoryCoin = sequelize.define(
        "StoryCoin",
        {
            count: DataTypes.INTEGER,
            storyId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
        },
        {}
    );

    StoryCoin.associate = function (models) {
        StoryCoin.belongsTo(models.Story, { foreignKey: "storyId" });
        StoryCoin.belongsTo(models.User, { foreignKey: "userId" });
    };

    return StoryCoin;
};
