const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");

const { loginUser, logoutUser, restoreUser, requireAuth, setUserId } = require("../auth");
const user = require("../db/models/user");
const follow = require("../db/models/follow");

router.get('/api/follows', asyncHandler(async (req,res)=>{
    const userId = setUserId(req,res);
    // const follows = await db.Follow.findAll({
    //     where: {
    //         follower: userId,
    //     },
    // });

    const followStories = await db.User.findByPk(userId, {
        include: [{
          model: db.User,
          as: 'followings',
          include: db.Story
        }]
      })
      let follows = []
      for(let i = 0; i < followStories.followings.length; i++) {
            follows.push(followStories.followings[i]);
    }

    res.json({follows});
}));

router.post('/api/follows', asyncHandler(async (req,res)=>{
    const userId = setUserId(req,res);
    if(userId === 0){

    }
    else{
        const { userId1 } = req.body;
        const aFollow = await db.Follow.findOne({
            where: {
                follower: userId,
                followee: userId1
            }
        });

        if(aFollow){
            await aFollow.destroy();
        }
        else{
            const follow = db.Follow.build({
                follower: userId,
                followee: userId1
            })

            await follow.save();
        }
        res.json({message:"Success"});
    }
}));

router.get('/api/follows/feed',  requireAuth, asyncHandler(async (req,res)=>{
    const { userId } = req.session.auth;
    let stories = []

    const followStories = await db.User.findByPk(userId, {
        include: [{
          model: db.User,
          as: 'followings',
          include: {
          model: db.Story,
          include: [db.Game]
          }
        }]
      })

    for(let i = 0; i < followStories.followings.length; i++) {
        for(let j=0; j < followStories.followings[i].Stories.length; ++j){
            followStories.followings[i].Stories[j].User = followStories.followings[i];
            stories.push(followStories.followings[i].Stories[j]);
        }
    }
    let followFeeds = [];

    res.render('index', {
        title: 'Follower Feed',
        stories,
        followFeeds,
        userId
    })
}));

router.post('/api/follows/isfollow', asyncHandler(async (req,res)=>{
    let userId;
    if(req.session.auth){
        userId = req.session.auth.userId;
    }
    else{
        userId = '-1';
    }
    const {followee} = req.body;
    const record = await db.Follow.findAll({
        where: {
            follower: userId,
            followee: followee
        }
    });
    let isfollow;
    if(record.length === 1)  isfollow=1;
    else    isfollow=0;
    res.json({isfollow:isfollow});
}));

module.exports = router;
