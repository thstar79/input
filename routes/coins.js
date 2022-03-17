const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/stories/coins/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    let coins = await db.StoryCoin.sum('count',{
        where: 
         { storyId: req.params.id } 
    })
    res.json({coins});
    /// we can count all the coins belonging to a story!
    /// DO STUFF BELOW THIS


}));


// router.post('/coins/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
//     let coins = await db.StoryCoin.sum('count',{
//         where: {
//             [Op.and]: [
//                 { storyId: req.params.id },
//                 { userId: res.locals.user.id }
//             ] 
//         }
//     })

//     //// able to get indiv users coin count.
//     /// now to add or give max 50 restriction with conditionals
// }));

router.patch('/stories/coins/:id(\\d+)',asyncHandler(async (req,res)=>{
    const storyId = parseInt(req.params.id,10);
    const coin = await db.StoryCoin.findOne({
        where: {
            [Op.and]: [
                { storyId: req.params.id },
                { userId: res.locals.user.id }
            ] 
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


module.exports = router;