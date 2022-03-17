const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");

router.get(
    "/comments",
    asyncHandler(async (req, res) => {
        const comments = await db.Follow.findAll({
            include: {
                model: db.User,
                include: [db.Story],
            },
        });
        res.render("comment-list", {
            comments,
        });
    })
);

router.get(
    "/comments/last",
    asyncHandler(async (req, res) => {
        const comment = await db.Comment.findOne({
            where: {
                order: ['id','desc'],
            },
        });
        console.log(comment.id);
        res.json({id: comment.id});
    })
);

router.get(
    "/comments/:id(\\d+)",
    csrfProtection,
    asyncHandler(async (req, res) => {})
);

// router.get(
//     "/comments/new",
//     csrfProtection,
//     asyncHandler(async (req, res) => {
//         const comment = db.Comment.build();
//         res.render("comment-form", {
//             comment,
//             csrfToken: req.csrfToken(),
//         });
//     })
// );

const commentValidator = [
    check("comment")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a value for Comment")
        .isLength({ max: 100 })
        .withMessage("Comment must not be more than 100 characters long"),
];

router.post(
    "/comments",
    requireAuth,
    commentValidator,
    //csrfProtection,
    asyncHandler(async (req, res) => {
        const { userId } = req.session.auth;
        const { comment, storyId } = req.body;
        const comment1 = db.Comment.build({
            comment,
            storyId,
        });
        
        const validatorErrors = validationResult(req);
        if (validatorErrors.isEmpty()) {
            await comment1.save();
            const inserted_comment = await db.Comment.findOne({
                where: {
                    comment,
                    storyId,
                },
                order: [['id','desc'],],
            })

            let commentId;
            if(inserted_comment){
                commentId = inserted_comment.id;
            }
            else{
                commentId = -1;
            }

            const coin = db.CommentCoin.build({
                count: 0,
                userId: userId,
                commentId: commentId,
            });

            await coin.save();
            res.json({message: "Success", comment});
        } else {
            const errors = validatorErrors.array().map((error) => error.msg);
            console.log(errors);
            res.render("comment-form", {
                title: "Write a Comment",
                comment: comment1,
                errors,
                csrfToken: req.csrfToken(),
            });
        }
    })
);

router.delete('/comments/:id(\\d+)', async(req, res) => {
    console.log('you have arrived at the route handler');
    const id = parseInt(req.params.id,10);
    const coin = await db.CommentCoin.findOne({
        where: {
            commentId: id
        }
    });
    if (coin) {
        await coin.destroy();
        const comment = await db.Comment.findByPk(id);
        if(comment){
            await comment.destroy();
            res.json({message: "Success"});
        }
        else{
            errors.push('Comment is not in Database');
            res.json({message: "comment Failure"})
        }
    } else {
        res.json({message: "coin Failure"})
    }
})

router.patch('/comments/coins/:id(\\d+)',asyncHandler(async (req,res)=>{
    const id = parseInt(req.params.id,10);
    const coin = await db.CommentCoin.findOne({
        where: {
            commentId: id,
        }
    });
    const coin_limit = 50;

    if(coin){
        if(coin.count < coin_limit){
            coin.count++;
            await coin.save();
            res.json({message: "Success", coin});
        }
        else{
            res.json({message: "Max"});
        }
    }
    else{
        res.json({message: "Could not find coin please try again"});
    }
}));

router.patch('/comments/:id(\\d+)', async(req, res) => {
    const id = parseInt(req.params.id,10);
    const comment = await db.Comment.findByPk(id)

    if (comment) {
        comment.comment = req.body.comment;
        await comment.save();
        res.json({message: "Success", comment});
    } else {
        res.json({message: "Could not find comment please try again"});
    }
})

module.exports = router;
