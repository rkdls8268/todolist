var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Hello react!' });
  res.send({title: 'Hello react!'});
});

router.use('/todo', require('./todo'));

module.exports = router;
