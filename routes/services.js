var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('services', {
    title: "My Services",
    my_info: MyInfo,
  });
});

module.exports = router;
