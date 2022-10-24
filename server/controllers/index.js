/* 
 * File: controllers/index.js
 * Student name: Yuk Ming Siu
 * Student ID: 301244053
 * Date: 2022-10-12
 * Course: COMP229-014
 */

passport = require('passport');

module.exports.displayHomePage = (req, res, next) => {
  res.render('index', { 
    title: 'Welcome',
    my_info: MyInfo,
    user_display_name: req.user ? req.user.display_name : "",
  });
};

module.exports.displayAboutMe = (req, res, next) => {
  res.render('about', {
    title: "About Me",
    my_info: MyInfo,
    user_display_name: req.user ? req.user.display_name : "",
  });
};

module.exports.displayProjects = (req, res, next) => {
  res.render('projects', {
    title: "My Projects",
    my_info: MyInfo,
    user_display_name: req.user ? req.user.display_name : "",
  });
};

module.exports.displayServices = (req, res, next) => {
  res.render('services', {
    title: "My Services",
    my_info: MyInfo,
    user_display_name: req.user ? req.user.display_name : "",
  });
};

module.exports.displayContactMe = (req, res, next) => {
  res.render('contact', { 
    title: 'Contact Me', 
    my_info: MyInfo,
    user_display_name: req.user ? req.user.display_name : "",
  });
};

module.exports.processContactMe = (req, res, next) => {
  console.log("Got data from contact-me form:   " + JSON.stringify(req.body));
  // res.redirect("/"); // redirect to home page
  res.render('contact_submitted', {
    my_info: MyInfo,
    contact_info: req.body,
    user_display_name: req.user ? req.user.display_name : "",
  })
};

module.exports.displayLogin = (req, res, next) => {
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
};

module.exports.processLogin = (req, res, next) => {
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
};

module.exports.displayLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
