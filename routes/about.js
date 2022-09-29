var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('about', {
    title: "About Me",
    my_info: MyInfo,
  });
});

module.exports = router;
