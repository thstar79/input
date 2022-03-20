const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { sequelize } = require("./db/models");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const storyRouter = require("./routes/stories");
const commentRouter = require("./routes/comments");
const followRouter = require("./routes/follows");
const bookmarkRouter = require("./routes/bookmarks");
const storyCoinsRouter = require("./routes/coins");
const { restoreUser } = require("./auth");
const { superSecret } = require('./config')
const app = express();

// view engine setup
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(superSecret));
app.use(express.static(path.join(__dirname, "public")));

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
    session({
        secret: superSecret,
        store,
        saveUninitialized: false,
        resave: false,
    })
);

// create Session table if it doesn't already exist
store.sync();

// This app.use is for tracking last visited to the site
// app.use('/stories', function findLastVisit(req, res, next) {
//     if (req.session.visited)
//       req.lastVisit = req.session.visited;
//     //   console.log(`<<<<<<<<<<<<<<<<<<<<<<<<req.lastVisit>>>>>>>>>>>>>>>>>>>>>>>>`)
//     //   console.log(`<<<<<<<<<<<<<<<<<<<<<<<<req.session.visited>>>>>>>>>>>>>>>>>>>>>>>>`)

//       req.session.visited = Date.now();
    //   console.log(`<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<req.session.visited>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`)

//     next();
//   });

app.use(restoreUser);
app.use("/", indexRouter);
app.use(usersRouter);
app.use(storyRouter);
app.use(commentRouter);
app.use(followRouter);
app.use(bookmarkRouter);
app.use(storyCoinsRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
