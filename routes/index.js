var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', csrfProtection, asyncHandler((req,res) => {
  res.render('index', { title: 'Stories List'})
}));


module.exports = router;
