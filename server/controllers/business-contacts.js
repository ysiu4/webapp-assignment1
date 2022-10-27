/* 
 * File: controllers/business-contacts.js
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


getUserDisplayName = (req) => {
  return req.user ? req.user.display_name : '';
}

/* GET display business contacts page */
module.exports.displayContacts = (req, res, next) => {
  if (!req.user) {
    //not yet login, go to login page
    return res.redirect('/login');
  }

  //logged in, show business contacts page
  BusinessContact.find({}, {}, { collation: {'locale': 'en'}, sort: {name: 'asc'}}, (err, contacts) => {
    console.log("displayContacts: " + contacts);
    res.render('business-contacts/list', {
      title: "Business Contacts",
      my_info: MyInfo,
      user_display_name: getUserDisplayName(req),
      contacts: contacts,
    })
  });
};

/* GET add a new business contact page */
module.exports.displayContactAdd = (req, res, next) => {
  if (!req.user) {
    //not yet login, go to login page
    return res.redirect('/login');
  }
  res.render('business-contacts/add', {
    title: "Business Contacts",
    my_info: MyInfo,
    user_display_name: getUserDisplayName(req),
  });
};

/* POST process to add a new business contact */
module.exports.processContactAdd = (req, res, next) => {
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
};

/* GET edit a business contact page */
module.exports.displayContactEdit = (req, res, next) => {
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
      res.render('business-contacts/edit', {
        title: "Business Contacts",
        my_info: MyInfo,
        contact: contact,
        user_display_name: getUserDisplayName(req),
      });
    }
  });
};

/* POST process to edit a business contact */
module.exports.processContactEdit = (req, res, next) => {
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
};

/* GET process to delete a business contact */
module.exports.processContactDelete = (req, res, next) => {
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
};
