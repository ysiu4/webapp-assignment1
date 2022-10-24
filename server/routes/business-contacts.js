/* 
 * File: index.js
 * Student name: Yuk Ming Siu
 * Student ID: 301244053
 * Date: 2022-10-12
 * Course: COMP229-014
 */

let express = require('express');
let router = express.Router();

let bcontactsController = require('../controllers/business-contacts');

/* GET display business contacts page */
router.get('/', bcontactsController.displayContacts);

/* GET add a new business contact page */
router.get('/add', bcontactsController.displayContactAdd);

/* POST process to add a new business contact */
router.post('/add', bcontactsController.processContactAdd);

/* GET edit a business contact page */
router.get('/edit/:id', bcontactsController.displayContactEdit);

/* POST process to edit a business contact */
router.post('/edit/:id', bcontactsController.processContactEdit);

/* GET process to delete a business contact */
router.get('/delete/:id', bcontactsController.processContactDelete);

module.exports = router;
