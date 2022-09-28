var express = require('express');
var router = express.Router();

isNullOrEmpty = (obj) => {
  return !obj || 
    (Object.keys(obj).length == 0 && obj.constructor === Object);
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'HOME PAGE',
  });
});

module.exports = router;
