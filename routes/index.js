const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');


/* GET home page. */
router.get('/', csrfProtection, asyncHandler((req,res) => {
  res.render('index', { title: 'Stories List'})
}));


module.exports = router;
