const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { requireAuth,setUserId } = require("../auth");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/stories/coins/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    let count = await db.StoryCoin.sum('count',{
        where: 
         { storyId: req.params.id } 
    });
    if(!count){
        count = 0;
    }
    res.json({count});

}));

router.get('/stories/coins/user/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const userId = setUserId(req,res);
    
    let count = 0;
    if(userId !== 0){
        count = await db.StoryCoin.sum('count',{
            where:{
                [Op.and]: [
                    { storyId: req.params.id },
                    { userId: userId }
                ] 
            } 
        })
    }
    res.json({count});
}));


router.post('/stories/coins/:id(\\d+)', asyncHandler(async (req, res) => {
    const userId = setUserId(req,res);
    if(userId !== 0) {
        let coin = db.StoryCoin.build({
            count:1,
            storyId: req.params.id,
            userId: res.locals.user.id
        })   
        await coin.save();
        res.json({message: "Success", count: 1});
    }
    else{
        res.json({message: "failed", count : 0});
    }
}));

router.patch('/stories/coins/:id(\\d+)',asyncHandler(async (req,res)=>{
    const userId = setUserId(req,res);
    const storyId = parseInt(req.params.id,10);
    let coin = await db.StoryCoin.findOne({
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
            res.json({message: "Success", count: coin.count});
        }
        else{
            res.json({message: "Max", count: coin_limit});
        }
    }
    else{
        if(userId !== 0){
            coin = db.StoryCoin.build({
                count:1,
                storyId: storyId,
                userId: userId
            });
            await coin.save();
        }
        if(coin)   res.json({message: "Success", count: coin.count});
        else       res.json({message: "Failed", count: 0});
    }
}));


module.exports = router;