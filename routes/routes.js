const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');



router.get('/stories/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const story = await db.Story.findByPk(storyId, { include: ['Games'] });
    res.render('story-detail', { title: 'Detailed Story', story });
  }));


router.get('/stories/new', csrfProtection, asyncHandler((req,res) => {
    let story = db.Story.build()
    res.render('story-new', { title: 'Write a Story', story, csrfToken:req.csrfToken()})
}));

const storyValidator = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Title')
      .isLength({ max: 50 })
      .withMessage('Title must not be more than 50 characters long'),
    check('content')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Content'),
    check('topicType')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Topic Type')
      .isLength({ max: 50 })
      .withMessage('Topic Type must not be more than 50 characters long'),
  ];

router.get('/stories/new', csrfProtection, asyncHandler(async(req, res) => {
    const story = db.Story.build();
    res.render('story-new', {
      title: 'Write a new Story',
      story,
      csrfToken: req.csrfToken(),
    });
}));


router.post('/stories/new', csrfProtection, storyValidator, asyncHandler( async(req,res) => {
    const {
        title,
        content,
        topicType,
        gameId,
    } = req.body;

    let story = db.Story.build({
        title,
        content,
        topicType,
        gameId: 27,       // This needs to be dynamic
        userId: 2        // this needs to be dynamic
    })

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await story.save();
        res.redirect('/');
      } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('story-new', {
          title: 'Write a Story',
          story,
          errors,
          csrfToken: req.csrfToken(),
        });
      }
}));

module.exports = router;
