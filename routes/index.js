const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");

/* GET home page. */
router.get(
    "/",
    csrfProtection,
    asyncHandler(async (req, res) => {
        const stories = await db.Story.findAll({
            include: [db.User, db.Game],
        });
        res.render("index", { title: "Stories List", stories });
    })

);

module.exports = router;
