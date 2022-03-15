"use strict";

module.exports = (sequelize, DataTypes) => {
    const CommentCoin = sequelize.define(
        "CommentCoin",
        {
            count: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            commentId: DataTypes.INTEGER,
        },
        {}
    );
    CommentCoin.associate = function (models) {
        CommentCoin.belongsTo(models.User, { foreignKey: "userId" });
        CommentCoin.belongsTo(models.Comment, { foreignKey: "commentId" });
    };

    return CommentCoin;
};
