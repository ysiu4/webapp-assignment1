/* 
 * File: app.js
 * Student name: Yuk Ming Siu
 * Student ID: 301244053
 * Date: 2022-10-12
 * Course: COMP229-014
 */

// My personal details for ejs page rendering
MyInfo = {
  name: 'Yuk Ming Siu',
  email: 'ysiu4@my.centennialcollege.ca',
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var session = require('express-session');
var passport = require('passport');
var flash = require("connect-flash");
var LocalStrategy = require('passport-local').Strategy;


//database_setup
let mongoose = require("mongoose");
let DB = require("./db");

//point mongoose to the DB URI
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });

let mongodb = mongoose.connection;
mongodb.on("error", console.error.bind(console, "connection error:"));
mongodb.once("open", () => {
  console.log("Database Connected");
});

 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/')));
app.use('/js', express.static(path.join(__dirname, '../../node_modules/jquery/dist')));
app.use('/bootstrap-icons', express.static(path.join(__dirname, '../../node_modules/bootstrap-icons')));

//initialize session
app.use(
  session({
    secret: '92PrYWbKLzdd7zvj2vOe',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//prepare User model schema
let User = require('../models/user').User;

//implement a user authenication strategy
passport.use(User.createStrategy());

//serialize and deserialize user object info -encrypt and decrypt
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//initialize flash
app.use(flash());


// use routers
app.use('/', require('../routes/index'));
app.use('/business-contacts', require('../routes/business-contacts'));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
