const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");
const salt = "!@#";

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
        console.log("asdf");
        const comment = await db.Comment.findOne({
        order: [['id','desc']],
        });
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
            comment:`${salt}${userId}${salt}${comment}`,
            storyId,
        });
        
        const validatorErrors = validationResult(req);
        if (validatorErrors.isEmpty()) {
            await comment1.save();

            const comment = await db.Comment.findOne({
                order: [['id','desc']],
            });
            const response = await res.json();
            
            const coin = await db.CommentCoin.create({
                count: 0,
                userId: userId,
                commentId: comment.id,
            });

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
    let flag = 3;
    const coin_limit = 50;

    const {userId} = req.session.auth;
    const userCoin = await db.CommentCoin.findOne({
        where: {
            commentId: id,
            userId: userId,
        }
    });

    if(userCoin){
        if(userCoin.count === 0){
            flag = 3;
        }
        else if(userCoin.count < coin_limit){
            userCoin.count++;
            await userCoin.save();
            flag = 1;
        }
        else{
            flag = 2;
        }
    }
    else{// create record for commentCoin table
        const newRecord = await db.CommentCoin.create({
            count: 1,
            commentId: id,
            userId: userId,
        });
        flag = 1;
    }

    let coin_sum = 0;
    const coins = await db.CommentCoin.findAll({
        where: {
            commentId: id,
        }
    });
    
    for(let i=0;i<coins.length;++i) coin_sum += coins[i].count;

    switch(flag) {
        case 1:
            res.json({message: "Success", sum:coin_sum});
            break;
        case 2:
            res.json({message: "Max"});
            break;
        case 3:
            res.json({message:"Shame on You" });
            break;
        default: 
            res.json({message: "Could not find coin please try again"});
            break;
    }
}));

router.patch('/comments/:id(\\d+)', async(req, res) => {
    const { userId } = req.session.auth;
    const id = parseInt(req.params.id,10);
    const comment = await db.Comment.findByPk(id);
    
    if (comment) {
        comment.comment = `${salt}${userId}${salt}${req.body.comment}`;
        await comment.save();
        res.json({message: "Success", comment});
    } else {
        res.json({message: "Could not find comment please try again"});
    }
})

module.exports = router;
