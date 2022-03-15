const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");

/* GET users listing. */
router.get(
    "/users/:id(\\d+)",
    csrfProtection,
    asyncHandler(async(req, res, next) => {
        const user = await db.User.findByPk(req.params.id);
        res.render("user-detail", { user });
    })
);

const userValidators = [
<<<<<<< HEAD
    // TODO Define the user validators.
    check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for First Name")
    .isLength({ max: 50 })
    .withMessage("First Name must not be more than 50 characters long"),
    check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Last Name")
    .isLength({ max: 50 })
    .withMessage("Last Name must not be more than 50 characters long"),
    check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Username")
    .isLength({ max: 50 })
    .withMessage("Last Name must not be more than 50 characters long"),
    check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Email Address")
    .isLength({ max: 255 })
    .withMessage("Email Address must not be more than 255 characters long")
    .isEmail()
    .withMessage("Email Address is not a valid email")
    .custom((value) => {
        return db.User.findOne({ where: { emailAddress: value } }).then(
            (user) => {
                if (user) {
                    return Promise.reject(
                        "The provided Email Address is already in use by another account"
                    );
                }
            }
        );
    }),
    check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password")
    .isLength({ max: 50 })
    .withMessage("Password must not be more than 50 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
        'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
    check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Confirm Password")
    .isLength({ max: 50 })
    .withMessage(
        "Confirm Password must not be more than 50 characters long"
    )
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Confirm Password does not match Password");
        }
        return true;
    }),
];

router.get(
    "/user/register",
    csrfProtection,
    asyncHandler(async(req, res) => {
        const user = db.User.build();
        res.render("user-register", {
            title: "User Register",
            user,
            csrfToken: req.csrfToken(),
        });
    })
);

router.post(
    "/user/register",
    csrfProtection,
    userValidators,
    asyncHandler(async(req, res) => {
        const { firstName, lastName, userName, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = db.User.build({
            firstName,
            lastName,
            userName,
            email,
            hashedPassword,
        });

        const validationErrors = validationResult(req);

        if (validationErrors.isEmpty()) {
            await user.save();

            res.redirect("/");
        } else {
            const errors = validationErrors
                .array()
                .map((error) => error.message);
            res.render("user-register", {
                title: "User Register",
                user,
                errors,
                csrfToken: req.csrfToken(),
            });
        }
    })
);

module.exports = router;
=======
  // TODO Define the user validators.
check('firstName')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for First Name')
  .isLength({ max: 50 })
  .withMessage('First Name must not be more than 50 characters long'),
check('lastName')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for Last Name')
  .isLength({ max: 50 })
  .withMessage('Last Name must not be more than 50 characters long'),
check('userName')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for Username')
  .isLength({ max: 50 })
  .withMessage('Last Name must not be more than 50 characters long'),
check('email')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for Email Address')
  .isLength({ max: 255 })
  .withMessage('Email Address must not be more than 255 characters long')
  .isEmail()
  .withMessage('Email Address is not a valid email')
  .custom((value) => {
    return db.User.findOne({ where: { emailAddress: value } })
      .then((user) => {
        if (user) {
          return Promise.reject('The provided Email Address is already in use by another account');
        }
      });
  }),  
check('password')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for Password')
  .isLength({ max: 50 })
  .withMessage('Password must not be more than 50 characters long')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
  .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
check('confirmPassword')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for Confirm Password')
  .isLength({ max: 50 })
  .withMessage('Confirm Password must not be more than 50 characters long')
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Confirm Password does not match Password');
    }
    return true;
  }),

];



module.exports = router;


>>>>>>> 56cb2dd59260d551d310e0aba3c73906181f85cc
