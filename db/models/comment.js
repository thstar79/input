"use strict";

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        "Comment", {
            comment: DataTypes.TEXT,
            storyId: DataTypes.INTEGER,
        }, {}
    );
    Comment.associate = function(models) {
        Comment.belongsTo(models.Story, { foreignKey: "storyId" });
        Comment.hasMany(models.CommentCoin, {
            foreignKey: "commentId",
            hooks: true,
            onDelete: "cascade",
        });
        Comment.belongsToMany(models.User, {
            through: "CommentCoin",
            otherKey: "userId",
            foreignKey: "commentId",
        });
    };

    return Comment;
};