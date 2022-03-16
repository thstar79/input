const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");

router.get(
    "/stories/:id(\\d+)",
    csrfProtection,
    asyncHandler(async (req, res) => {
      const { userId } = req.session.auth;
      const storyId = parseInt(req.params.id, 10);
      const story = await db.Story.findByPk(storyId, { include: [db.User, db.Game] });
      const user = await db.User.findByPk(userId);
      const comments = await db.Comment.findAll({
        where: {
          storyId: storyId,
        },
        include: {
            model: db.Story,
            include: [db.User, db.Game],
        },
      });
      res.render("story-detail", {
        title: "Detailed Story",
        story,
        user,
        comments,
        csrfToken: req.csrfToken()
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
    asyncHandler(async (req, res) => {
        const story = db.Story.build();
        const games = await db.Game.findAll()
        console.log(games)
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
    storyValidator,
    asyncHandler(async (req, res) => {
        const { title, content, topicType, userId, gameId } = req.body;

        let story = db.Story.build({
            title,
            content,
            topicType,
            gameId, 
            userId: 2, // this needs to be dynamic
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
                story,
                errors,
                csrfToken: req.csrfToken(),
            });
        }
    })
);

router.get('/stories/edit/:id(\\d+)', csrfProtection, asyncHandler(async(req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const story = await db.Story.findByPk(storyId);
    res.render('story-edit', {
        title: 'Edit Story',
        story,
        csrfToken: req.csrfToken()
    })
}))

router.put('/stories/edit/:id(\\d+)', csrfProtection, storyValidator, asyncHandler(async(req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const storyToUpdate = await db.Story.findByPk(storyId);

    const { title, content, topicType, userId, gameId } = req.body;
    const story = { title, content, topicType, userId, gameId }

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await storyToUpdate.update(story)
        res.redirect(`/stories/${storyId}`)
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('story-edit', {
            title: 'Edit Story',
            story: { ...story, id: storyId },
            errors,
            csrfToken: req.csrfToken()
        })
    }
}))



module.exports = router;
