var express = require('express');
var router = express.Router();

/* GET contact */
router.get('/', (req, res, next) => {
  res.render('contact', { title: 'Contact Me' });
});

/* POST contact */
router.post('/submit', (req, res, next) => {
  console.log("Got data from contact-me form:   " + JSON.stringify(req.body));
  res.redirect("/"); // redirect to home page
});

module.exports = router;
