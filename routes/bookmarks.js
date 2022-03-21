const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const db = require("../db/models");
const { csrfProtection, asyncHandler, chckbookmark } = require("./utils");

const { loginUser, logoutUser, restoreUser, requireAuth, setUserId } = require("../auth");
const user = require("../db/models/user");

router.get('/bookmarks', asyncHandler(async (req,res)=>{
    const userId = setUserId(req,res);
    const Large = 10000000;

    const bookmarks = await db.StoryCoin.findAll({
        where: {
            count: {
                [db.Sequelize.Op.gte]: Large,
            },
            userId: userId,
        },
        include: [db.User,{
            model: db.Story,
            include: [db.User,db.Game],
        }],
    });
    //res.render({bookMarks});
    let stories = [];
    if(bookmarks.length !== 0)  stories = bookmarks.map(ele=>ele.Story) ;
    await chckbookmark(stories,userId);

    res.render("index", { title: "Bookmarks", stories: stories, followFeeds:-1, userId });
}));

router.patch('/api/bookmarks/:id(\\d+)', asyncHandler(async (req,res)=>{
    const userId = setUserId(req,res);
    const storyId = parseInt(req.params.id,10);
    const Large = 10000000;
    let bookmarked = 0;

    if(userId === 0){

    }
    else{
        let aBookmark = await db.StoryCoin.findOne({
            where: {
                     userId: userId ,
                     storyId: storyId ,
            },
            include: [db.User,db.Story],
        });

        if(aBookmark){ //if bookmark exists unbookmark
            if(aBookmark.count >= Large) aBookmark.count = aBookmark.count%Large;
            else    aBookmark.count += Large;

            await aBookmark.save();
        }
        else{ //book mark not exist add bookmark
            const bookmark = db.StoryCoin.build({
                count: Large,
                storyId: storyId,
                userId: userId,
            })
            await bookmark.save();
            bookmarked = 1;
        }

        res.json({message:"Success", bookmarked: bookmarked});
    }
}));

// router.get('/api/bookmarks/feed',  requireAuth, asyncHandler(async (req,res)=>{
//     const { userId } = req.session.auth;
//     let stories = []

//     const followStories = await db.User.findByPk(userId, {
//         include: [{
//           model: db.User,
//           as: 'followings',
//           include: {
//           model: db.Story,
//           include: [db.Game]
//           }
//         }]
//       })

//     for(let i = 0; i < followStories.followings.length; i++) {
//         for(let j=0; j < followStories.followings[i].Stories.length; ++j){
//             followStories.followings[i].Stories[j].User = followStories.followings[i];
//             stories.push(followStories.followings[i].Stories[j]);
//         }
//     }

//     res.render('followfeed', {
//         title: 'Follower Feed',
//         stories,
//     })
// }));

// router.post('/api/follows/isfollow', asyncHandler(async (req,res)=>{
//     let userId;
//     if(req.session.auth){
//         userId = req.session.auth.userId;
//     }
//     else{
//         userId = '-1';
//     }
//     const {followee} = req.body;
//     const record = await db.Follow.findAll({
//         where: {
//             follower: userId,
//             followee: followee
//         }
//     });
//     let isfollow;
//     if(record.length === 1)  isfollow=1;
//     else    isfollow=0;
//     res.json({isfollow:isfollow});
// }));

module.exports = router;
