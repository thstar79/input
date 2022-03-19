"use strict";

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User", {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            userName: DataTypes.STRING,
            email: DataTypes.STRING,
            hashedPassword: DataTypes.STRING.BINARY,
        }, {}
    );

    User.associate = function(models) {
        User.belongsToMany(models.Comment, {
            through: "CommentCoin",
            otherKey: "commentId",
            foreignKey: "userId",
        });

        User.belongsToMany(models.User, {
            through: "Follow",
            otherKey: "followee",
            foreignKey: "follower",
            as: "followings",
        });

        User.belongsToMany(models.User, {
            through: "Follow",
            otherKey: "follower",
            foreignKey: "followee",
            as: "followers",
        });

        User.hasMany(models.CommentCoin, { foreignKey: "userId" });
        User.hasMany(models.StoryCoin, { foreignKey: "userId" });
        User.hasMany(models.Story, { foreignKey: "userId" });
    };

    return User;
};
