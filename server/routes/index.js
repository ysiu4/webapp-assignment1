/* 
 * File: routes/index.js
 * Student name: Yuk Ming Siu
 * Student ID: 301244053
 * Date: 2022-10-12
 * Course: COMP229-014
 */

let express = require('express');
let router = express.Router();
let indexController = require('../controllers/index');

/* GET home page */
router.get('/', indexController.displayHomePage);

/* GET about-me */
router.get('/about', indexController.displayAboutMe);

/* GET projects */
router.get('/projects', indexController.displayProjects);

/* GET services */
router.get('/services', indexController.displayServices);

/* GET contact */
router.get('/contact', indexController.displayContactMe);

/* POST contact for retrieving form data from user */
router.post('/contact/submit', indexController.processContactMe);

/* GET display login page */
router.get('/login', indexController.displayLogin);

/* POST process login page */
router.post('/login', indexController.processLogin);

/* GET display logout page */
router.get('/logout', indexController.displayLogout);

module.exports = router;
