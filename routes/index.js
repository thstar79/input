const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");

/* GET home page. */
router.get("/", (req, res) => {
        res.render("landingPage")
});

module.exports = router;
