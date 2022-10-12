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

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../../public')));
// app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/')));
app.use(express.static(path.join(__dirname, '../../node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, '../../node_modules/@popperjs/core/dist/umd')));
app.use('/bootstrap-icons', express.static(path.join(__dirname, '../../node_modules/bootstrap-icons')));

// use routers
app.use('/', require('../routes/index'));

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
