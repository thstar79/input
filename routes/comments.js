const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const db = require('../db/models');
const {csrfProtection,asyncHandler} = require('./utils');

router.get('/comments',asyncHandler(async (req,res)=>{
    const comments = await db.Comment.findAll({
        include: {
            model: db.Story,
            include: [db.User,db.Game],
        }
    });
    res.render('comment-list',{
        comments,
    })
}));

router.get('/comments/:id(\\d+)',csrfProtection,asyncHandler(async (req,res)=>{

}));

router.get('/comments/new',csrfProtection, asyncHandler(async (req,res)=>{
    const comment = db.Comment.build();
    res.render('comment-form',{
        comment,
        csrfToken: req.csrfToken(),
    });
}));

const commentValidator = [
    check('comment')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Comment')
      .isLength({ max: 100 })
      .withMessage('Comment must not be more than 100 characters long'),
  ];

router.post('/comments/new',commentValidator, csrfProtection, asyncHandler(async (req,res)=>{
    const {comment, storyId} = req.body;
    const comment1 = db.Comment.build({
        comment,
        storyId
    });

    const validatorErrors = validationResult(req);
    if(validatorErrors.isEmpty()){
        await comment1.save();
        res.redirect('/comments');
    }
    else{
        const errors = validatorErrors.array().map((error)=>error.msg);
        res.render('comment-form',{
            title: 'Write a Comment',
            comment: comment1,
            errors,
            csrfToken: req.csrfToken(),
        });
    }
}));

module.exports = router;