/* 
 * File: index.js
 * Student name: Yuk Ming Siu
 * Student ID: 301244053
 * Date: 2022-10-12
 * Course: COMP229-014
 */

let express = require('express');
let router = express.Router();
let mongoose = require("mongoose");
var passport = require("passport");

//create User model
let User = require("../models/user").User;

//create BusinessContact model
let BusinessContact = require('../models/business_contact').BusinessContact;


/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Welcome',
    my_info: MyInfo,
    user_display_name: req.user ? req.user.display_name : "",
  });
});

/* GET about-me */
router.get('/about', function(req, res, next) {
  res.render('about', {
    title: "About Me",
    my_info: MyInfo,
    user_display_name: req.user ? req.user.display_name : "",
  });
});

/* GET projects */
router.get('/projects', function(req, res, next) {
  res.render('projects', {
    title: "My Projects",
    my_info: MyInfo,
    user_display_name: req.user ? req.user.display_name : "",
  });
});

/* GET services */
router.get('/services', function(req, res, next) {
  res.render('services', {
    title: "My Services",
    my_info: MyInfo,
    user_display_name: req.user ? req.user.display_name : "",
  });
});

/* GET contact */
router.get('/contact', (req, res, next) => {
  res.render('contact', { 
    title: 'Contact Me', 
    my_info: MyInfo,
    user_display_name: req.user ? req.user.display_name : "",
  });
});

/* POST contact for retrieving form data from user */
router.post('/contact/submit', (req, res, next) => {
  console.log("Got data from contact-me form:   " + JSON.stringify(req.body));
  // res.redirect("/"); // redirect to home page
  res.render('contact_submitted', {
    my_info: MyInfo,
    contact_info: req.body,
    user_display_name: req.user ? req.user.display_name : "",
  })
});

/* GET display login page */
router.get('/login', (req, res, next) => {
  if (!req.user) {
    res.render('login', {
      title: 'Login', 
      my_info: MyInfo,
      messages: req.flash('login_message'),
      user_display_name: req.user ? req.user.display_name : "",
    });
  } else {
    return res.redirect('/');
  }
});

/* POST process login page */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      //server error
      return next(err);
    }
    if (!user) {
      //user login somehow fails
      req.flash('login_message', info.message);
      return res.redirect('/login');
    }
    req.login(user, (err) => {
      if (err) {
        //server error
        return next(err);
      }
      //login succeed, go to business contacts page
      return res.redirect('/business-contacts');
    });
  })(req, res, next);
});

/* GET display logout page */
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

/* GET display business contacts page */
router.get('/business-contacts', (req, res, next) => {
  if (!req.user) {
    //not yet login, go to login page
    return res.redirect('/login');
  }
  //logged in, show business contacts page
  BusinessContact.find({}, (err, contacts) => {
    res.render('business-contacts-list', {
      title: "Business Contacts",
      my_info: MyInfo,
      user_display_name: req.user ? req.user.display_name : "",
      contacts: contacts,
    })
  });
  // contacts = BusinessContact.find({}, {
  //     'sort': {
  //       name: 'asc',
  //       email: 'asc',
  //     }
  //   });
  // res.render('business-contacts-list', {
  //   title: "Business Contacts",
  //   my_info: MyInfo,
  //   user_display_name: req.user ? req.user.display_name : "",
  //   contacts: contacts,
  // })
});

/* GET add a new business contact page */
router.get('/business-contacts-add', (req, res, next) => {
  if (!req.user) {
    //not yet login, go to login page
    return res.redirect('/login');
  }
  res.render('business-contacts-add', {
    title: "Business Contacts",
    my_info: MyInfo,
    user_display_name: req.user ? req.user.display_name : "",
  });
});

/* POST process to add a new business contact */
router.post('/business-contacts-add', (req, res, next) => {
  if (!req.user) {
    //not yet login, go to login page
    return res.redirect('/login');
  }
  let new_contact = BusinessContact({
    name: req.body.name,
    contact_number: req.body.contact_number,
    email: req.body.email,
  });
  BusinessContact.create(new_contact, (err, contact) => {
    if (err) {
      console.log('Failed to add contact: ' + err);
      res.end(err);
    } else {
      res.redirect('/business-contacts')
    }
  });
});

/* GET edit a business contact page */
router.get('/business-contacts-edit/:id', (req, res, next) => {
  if (!req.user) {
    //not yet login, go to login page
    return res.redirect('/login');
  }
  let id = req.params.id; //id of business contact
  BusinessContact.findById(id, (err, contact) => {
    if (err) {
      console.log('Failed to retrieve a contact: ' + err);
      res.end(err);
    } else {
      res.render('business-contacts-edit', {
        title: "Business Contacts",
        my_info: MyInfo,
        contact: contact,
        user_display_name: req.user ? req.user.display_name : "",
      });
    }
  });
});

/* POST process to edit a business contact */
router.post('/business-contacts-edit/:id', (req, res, next) => {
  if (!req.user) {
    //not yet login, go to login page
    return res.redirect('/login');
  }
  let id = req.params.id; //id of business contact
  let update_rec = BusinessContact({
    _id: id,
    name: req.body.name,
    contact_number: req.body.contact_number,
    email: req.body.email,
  });
  BusinessContact.updateOne({ _id: id }, update_rec, (err) => {
    if (err) {
      console.log('Failed to update contact: ' + err);
      res.end(err);
    } else {
      res.redirect('/business-contacts');
    }
  });
});

/* GET process to delete a business contact */
router.get('/business-contacts-delete/:id', (req, res, next) => {
  if (!req.user) {
    //not yet login, go to login page
    return res.redirect('/login');
  }
  let id = req.params.id; //id of business contact
  BusinessContact.remove({ _id: id }, (err) => {
    if (err) {
      console.log('Failed to delete contact: ' + err);
      res.end(err);
    } else {
      res.redirect('/business-contacts');
    }
  });
});

module.exports = router;
