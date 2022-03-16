const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/coins/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    let coins = await db.StoryCoin.sum('count',{
        where: 
         { storyId: req.params.id } 
    })
    
    console.log(coins)
    /// we can count all the coins belonging to a story!
    /// DO STUFF BELOW THIS


}));


router.post('/coins/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    let coins = await db.StoryCoin.sum('count',{
        where: {
            [Op.and]: [
                { storyId: req.params.id },
                { userId: res.locals.user.id }
            ] 
        }
    })

    console.log(coins)

    //// able to get indiv users coin count.
    /// now to add or give max 50 restriction with conditionals
}));

module.exports = router;