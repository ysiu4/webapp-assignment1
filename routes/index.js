/* 
 * File: index.js
 * Student name: Yuk Ming Siu
 * Student ID: 301244053
 * Date: 2022-09-30
 * Course: COMP229-014
 */

var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Hello',
    my_info: MyInfo,
  });
});

/* GET about-me */
router.get('/about', function(req, res, next) {
  res.render('about', {
    title: "About Me",
    my_info: MyInfo,
  });
});

/* GET projects */
router.get('/projects', function(req, res, next) {
  res.render('projects', {
    title: "My Projects",
    my_info: MyInfo,
  });
});

/* GET services */
router.get('/services', function(req, res, next) {
  res.render('services', {
    title: "My Services",
    my_info: MyInfo,
  });
});

/* GET contact */
router.get('/contact', (req, res, next) => {
  res.render('contact', { 
    title: 'Contact Me', 
    my_info: MyInfo,
  });
});

/* POST contact for retrieving form data from user */
router.post('/contact/submit', (req, res, next) => {
  console.log("Got data from contact-me form:   " + JSON.stringify(req.body));
  // res.redirect("/"); // redirect to home page
  res.render('contact_submitted', {
    my_info: MyInfo,
    contact_info: req.body,
  })
});

module.exports = router;
