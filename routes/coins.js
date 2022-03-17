const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/stories/coins/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    let count = await db.StoryCoin.sum('count',{
        where: 
         { storyId: req.params.id } 
    })
    res.json({count});

}));

router.get('/stories/coins/user/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    let count = await db.StoryCoin.sum('count',{
        where:{
            [Op.and]: [
                { storyId: req.params.id },
                { userId: res.locals.user.id }
            ] 
        } 
    })
    res.json({count});
}));


router.post('/stories/coins/:id(\\d+)', asyncHandler(async (req, res) => {
    let coin = db.StoryCoin.build({
        count:1,
        storyId: req.params.id,
        userId: res.locals.user.id
    })   
    await coin.save();

}));

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