"use strict";

module.exports = (sequelize, DataTypes) => {
    const Follow = sequelize.define(
        "Follow",
        {
            followee: DataTypes.INTEGER,
            follower: DataTypes.INTEGER,
        },
        {}
    );
    Follow.associate = function (models) {
        // Follow.belongsTo(models.User, {foreignKey: 'follower'});
        // Follow.belongsTo(models.Comment, {foreignKey: 'commentId'});
    };

    return Follow;
};
