const db = require("./db/models");

const loginUser = (req, res, user) => {
    req.session.auth = { userId: user.id };
    req.session.save( () => res.redirect('/stories'))
};

const restoreUser = async(req, res, next) => {
    // Log the session object to the console
    // to assist with debugging.
    console.log(req.session);

    if (req.session.auth) {
        const { userId } = req.session.auth;

        try {
            const user = await db.User.findByPk(userId);

            if (user) {
                res.locals.authenticated = true;
                res.locals.user = user;
                next();
            }
        } catch (err) {
            res.locals.authenticated = false;
            next(err);
        }
    } else {
        res.locals.authenticated = false;
        next();
    }
};

const logoutUser = (req, res) => {
    delete req.session.auth;
    req.session.save( () => res.redirect("/users/login"))
};

const requireAuth = (req, res, next) => {
    if (!res.locals.authenticated) {
        return res.redirect("/users/login");
    }
    return next();
};

const setUserId = (req,res) => {
    let userId = 0;
    if(req.session.auth){
        userId = req.session.auth.userId;
    }
    return userId;
}

module.exports = {
    loginUser,
    restoreUser,
    logoutUser,
    requireAuth,
    setUserId,
};
