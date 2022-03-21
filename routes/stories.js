const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler, chckbookmark } = require("./utils");

const { requireAuth , setUserId} = require("../auth");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;



    

router.get('/test', (req,res) => {
    res.render('test')
})

router.get(
    '/stories/types/:id',
    csrfProtection,
    asyncHandler(async (req, res) => {
    const topicType = req.params.id;
    const userId = setUserId(req,res);
    const stories = await db.Story.findAll({
        include: [db.User, db.Game],
        order: [['createdAt', 'DESC']],
        where: {
            topicType: topicType,
        }
    });
    await chckbookmark(stories,userId);
    // for(let i=0;i<stories.length;++i){
    //     const story = stories[i];
    //     if(userId === story.userId) story.isbookmarked = await chckbookmark(userId, story.userId);
    // }
    res.render("index", { title: topicType, stories, followFeeds:-1, userId });
}));

router.get('/stories/recent', csrfProtection, asyncHandler(async(req, res) => {
    const userId = setUserId(req,res);
// req.session.visited
    const stories = await db.Story.findAll({
        include: [db.User, db.Game],
        order: [['createdAt', 'DESC']],
        limit: 5
    });
    await chckbookmark(stories,userId);
    res.render("index", { title: "Recent stories", stories, followFeeds:-1, userId });
}))

router.get(
    "/stories",
    csrfProtection,
    asyncHandler(async (req, res) => {
        const userId = setUserId(req,res);
        const stories = await db.Story.findAll({
            include: [db.User, db.Game],
            order: [['createdAt', 'DESC']]
        });
        await chckbookmark(stories,userId);

        let followFeeds = []

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

        if(userId !== 0){
            for(let i = 0; i < followStories.followings.length; i++) {
                for(let j=0; j < followStories.followings[i].Stories.length; ++j){
                    followStories.followings[i].Stories[j].User = followStories.followings[i];
                    followFeeds.push(followStories.followings[i].Stories[j]);
                }
            }
            await chckbookmark(followFeeds,userId);
            res.render("index", { title: "Stories List", stories, followFeeds, userId });
        }else{
            res.render("index", { title: "Stories List", stories, followFeeds:-1, userId });
        }
    })

);

router.get(
    "/stories/user",
    csrfProtection,
    requireAuth,
    asyncHandler(async (req, res) => {
        const { userId } = req.session.auth;
        const stories = await db.Story.findAll({
            include: [db.User, db.Game],
            where: {
                userId:userId
            }
        });
        await chckbookmark(stories,userId);
        res.render("index", { title: "My Stories", stories, followFeeds:-1, userId});
    })

);

router.get(
    "/stories/:id(\\d+)",
    csrfProtection,
    asyncHandler(async (req, res) => {

        const userId = setUserId(req,res);
        const storyId = parseInt(req.params.id, 10);
        const story = await db.Story.findByPk(storyId, {
            include: [db.User, db.Game],
        });

        let storyCoinsCount = await db.StoryCoin.sum('count', {
            where: {
                storyId: storyId,
            }
        });

        let userStoryCoinsCount = await db.StoryCoin.sum('count', {
            where: {
                [Op.and]: [
                    { storyId: storyId },
                    { userId: userId }
                ],
            }
        });

        if(!storyCoinsCount)   storyCoinsCount = 0;
        if(!userStoryCoinsCount)   userStoryCoinsCount = 0;

        res.render("story-detail", {
            title: "Detailed Story",
            story,
            session: userId,
            storyCoinsCount,
            userStoryCoinsCount,
            csrfToken: req.csrfToken(),
        });
    })
);

const storyValidator = [
    check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Title")
    .isLength({ max: 50 })
    .withMessage("Title must not be more than 50 characters long"),
    check("content")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Content"),
    check("topicType")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Topic Type")
    .isLength({ max: 50 })
    .withMessage("Topic Type must not be more than 50 characters long"),
];

router.get(
    "/stories/new",
    csrfProtection,
    requireAuth,
    asyncHandler(async(req, res) => {
        const story = db.Story.build();
        const games = await db.Game.findAll();
        res.render("story-new", {
            title: "Write a new Story",
            story,
            games,
            csrfToken: req.csrfToken(),
        });
    })
);

router.post(
    "/stories/new",
    csrfProtection,
    requireAuth,
    storyValidator,
    asyncHandler(async(req, res) => {
        const { title, content, topicType, gameId, gameTitle } = req.body;
        const { userId } = req.session.auth;
        let story = db.Story.build({
            title,
            content,
            topicType,
            gameId,
            userId,
        });

        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            await story.save();

            let newStory =  await db.Story.findOne({
                where: {
                   [Op.and]: [
                       { title: title },
                       { content: content }
                   ]
                }
            })

            const coin = db.StoryCoin.build({
                count: 0,
                storyId: newStory.id,
                userId: userId,
            });
            await coin.save();

            res.redirect("/stories");
        } else {
            const errors = validatorErrors.array().map((error) => error.msg);
            const games = await db.Game.findAll();
            res.render("story-new", {
                title: "Write a Story",
                games,
                story,
                errors,
                csrfToken: req.csrfToken(),
            });
        }
    })
);

router.get(
    "/stories/edit/:id(\\d+)",
    csrfProtection,
    requireAuth,
    asyncHandler(async(req, res) => {
        const storyId = parseInt(req.params.id, 10);
        const story = await db.Story.findByPk(storyId,{
            include: [db.Game],
        });
        if (story.userId === res.locals.user.id) {
            const games = await db.Game.findAll();
            res.render("story-edit", {
                title: "Edit Story",
                story,
                games,
                csrfToken: req.csrfToken(),
            });
        } else {
            res.send(
                "this story does not belong to you, you do not have permission to edit."
            );
        }
    })
);

router.post(
    "/stories/edit/:id(\\d+)",
    csrfProtection,
    requireAuth,
    storyValidator,
    asyncHandler(async(req, res) => {
        const storyId = parseInt(req.params.id, 10);
        const storyToUpdate = await db.Story.findByPk(storyId);

        const { title, content, topicType, userId, gameId } = req.body;
        const story = { title, content, topicType, userId, gameId };

        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            await storyToUpdate.update(story);
            res.redirect(`/stories/${storyId}`);
        } else {
            const errors = validatorErrors.array().map((error) => error.msg);
            res.render("story-edit", {
                title: "Edit Story",
                story: {...story, id: storyId },
                errors,
                csrfToken: req.csrfToken(),
            });
        }
    })
);

router.get(
    "/stories/delete/:id(\\d+)",
    csrfProtection,
    asyncHandler(async(req, res) => {
        const id = parseInt(req.params.id, 10);

        const story = await db.Story.findByPk(id);
        res.render("story-delete", {
            title: "Delete this Story?",
            story,
            csrfToken: req.csrfToken(),
        });
    })
);

router.post(
    "/stories/delete/:id(\\d+)",
    requireAuth,
    asyncHandler(async(req, res) => {
        const id = parseInt(req.params.id, 10);
        const story = await db.Story.findByPk(id);

        //current story id !== authed user id
        if (story.userId === res.locals.user.id || res.locals.user.id === 2) {
            await story.destroy();
            res.redirect("/stories");
        } else {
            res.send("You do not have permissions to delete this story");
        }
    })
);


module.exports = router;
