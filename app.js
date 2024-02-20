var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');

require('dotenv').config()

const mongouri = process.env.MONGO_URI;
const mongo_username = process.env.MONGO_USERNAME || "";
const mongo_password = process.env.MONGO_PASSWORD || "";

if (mongouri == "") {
    console.log("MONGO_URI is empty");
    console.log("Check .env file");
    process.exit(1);
}

mongoose.connect(mongouri, {
    user: mongo_username,
    pass: mongo_password,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error when connecting to mongodb: " + err);
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var apiRouter = require('./routes/api.v1');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/home', indexRouter);
app.use('/users', usersRouter);
app.use('/', loginRouter);
app.use('/api', apiRouter);

app.use('/chosing', function (req, res, next) {
    res.render('chosing', { title: 'Express' });
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
