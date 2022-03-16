const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");

const { requireAuth } = require("../auth");

router.get(
    "/stories/:id(\\d+)",
    csrfProtection,
    asyncHandler(async(req, res) => {
        const storyId = parseInt(req.params.id, 10);
        const story = await db.Story.findByPk(storyId, {
            include: [db.User, db.Game],
        });
        const coins = await db.CommentCoin.findAll({
            include: [{
                    model: db.Comment,
                    where: {
                        storyId: storyId,
                    },
                },
                {
                    model: db.User,
                },
            ],
        });

        res.render("story-detail", {
            title: "Detailed Story",
            story,
            coins,
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
        //console.log(games);
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
        let story = db.Story.build({
            title,
            content,
            topicType,
            gameId,
            userId: res.locals.user.id,
        });

        let game = db.Game.build({
            id: gameId,
            title: gameTitle,
        });

        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            await story.save();
            //   let story =  await db.Story.findOne({
            //     //sort by the lastest created limit 1
            // })
            // // query for story we just created -> pull id from it
            // // build StoryCoin.build({
            //   story:id
            // })
            res.redirect("/");
        } else {
            const errors = validatorErrors.array().map((error) => error.msg);
            res.render("story-new", {
                title: "Write a Story",
                games: [game],
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
        const story = await db.Story.findByPk(storyId);
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
        console.log(story.dataValues.id, req.session.auth.userId);
        res.render("story-delete", {
            title: "Delete this Story???",
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
        if (story.dataValues.id !== req.session.auth.userId) {
            res.send("You do not have permissions to delete this story");
        } else {
            await story.destroy();

            res.redirect("/");
        }
    })
);

module.exports = router;