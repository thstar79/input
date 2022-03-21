const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const db = require("../db/models");

const { csrfProtection, asyncHandler } = require("./utils");

const { loginUser, logoutUser, restoreUser, requireAuth, setUserId } = require("../auth");

/* GET users listing. */
router.get(
    "/users/:id(\\d+)",
    csrfProtection,
    asyncHandler(async(req, res, next) => {
        const user = await db.User.findByPk(req.params.id);
        res.render("user-detail", { user });
    })
);

router.get(
    "/api/users/:id(\\d+)",
    csrfProtection,
    asyncHandler(async(req, res, next) => {
        const user = await db.User.findByPk(req.params.id);
        res.json({user: user});
    })
);

router.get('/api/users/random/:num(\\d+)',asyncHandler(async(req,res)=>{
    const userId = setUserId(req,res);
    const num = parseInt(req.params.num,10);
    let users = [];
    if(userId !== 0){
        users = await db.User.findAll({
            where: {
                id: {
                    [db.Sequelize.Op.ne]: userId, // not including myself
                }
            },
            order: db.Sequelize.literal('random()'),
            limit: num,
        });
    }
    else{
        users = [];
    }
    res.json({users, session:userId});
}));

const userValidators = [
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
        return db.User.findOne({ where: { email: value } }).then((user) => {
            if (user) {
                return Promise.reject(
                    "The provided Email Address is already in use by another account"
                );
            }
        });
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
    "/users/register",
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
    "/users/register",
    csrfProtection,
    userValidators,
    asyncHandler(async(req, res) => {
        const { firstName, lastName, userName, email, password } = req.body;

        const user = db.User.build({
            firstName,
            lastName,
            userName,
            email
        });

        const validationErrors = validationResult(req);

        if (validationErrors.isEmpty()) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.hashedPassword = hashedPassword;
            await user.save();
            loginUser(req, res, user);
        } else {
            const errors = validationErrors.array().map((error) => error.msg);
            res.render("user-register", {
                title: "User Register",
                user,
                errors,
                csrfToken: req.csrfToken(),
            });
        }
    })
);

router.get("/users/login", csrfProtection, (req, res) => {
    //const user = db.User.build();
    res.render("user-login", {
        title: "Login",
        email: '',
        csrfToken: req.csrfToken(),
    });
});

const loginValidators = [
    check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Email Address")
    .isLength({ max: 255 })
    .withMessage("Email Address must not be more than 255 characters long")
    .isEmail()
    .withMessage("Email Address is not a valid email"),
    check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password"),
];

router.post(
    "/users/login",
    loginValidators,
    csrfProtection,
    asyncHandler(async(req, res) => {
        const { email, password } = req.body;
        let errors = [];
        
        const validatorErrors = validationResult(req);
        if (validatorErrors.isEmpty()) {
            const user = await db.User.findOne({ where: { email } });
            console.log(user)
            if (user) {
                const passwordMatch = await bcrypt.compare(
                    password,
                    user.hashedPassword.toString()
                );
                if (passwordMatch) {
                    loginUser(req, res, user);
                }
                else{
                    errors.push(
                        "Login failed for the provided email address and password"
                    );
                }
            }
            else{
                errors.push(
                    "No User with this email registered"
                );
            }
        } else {
            errors = validatorErrors.array().map((error) => error.msg);
            res.render("user-login", {
                title: "Login",
                email,
                errors,
                csrfToken: req.csrfToken(),
            });
        }
    })
);

router.get("/users/login/demo", async(req, res) => {
    // let user = await db.User.findByPk(1)
    let user = {
        id : 1
    }
    loginUser(req, res, user);
})

router.get("/users/login/super", async(req, res) => {
    // let user = await db.User.findByPk(1)
    let user = {
        id : 2
    }
    loginUser(req, res, user);
})

router.get("/users/logout", (req, res) => {
    logoutUser(req, res);
});

module.exports = router;
