const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
//const db = require('../db/models');

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);


router.get('/', csrfProtection, asyncHandler((req,res) => {
    let tasks;
    res.render('index', { title: 'Task List Page'}, tasks)
}));

module.exports = router;