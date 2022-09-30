var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('projects', {
    title: "My Projects",
    my_info: MyInfo,
  });
});

module.exports = router;
