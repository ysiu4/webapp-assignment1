var express = require('express');
var router = express.Router();

/* GET contact */
router.get('/', (req, res, next) => {
  res.render('contact', { 
    title: 'Contact Me', 
    my_info: MyInfo,
  });
});

/* POST contact */
router.post('/submit', (req, res, next) => {
  console.log("Got data from contact-me form:   " + JSON.stringify(req.body));
  // res.redirect("/"); // redirect to home page
  res.render('contact_submitted', {
    my_info: MyInfo,
    contact_info: req.body,
  })
});

module.exports = router;
