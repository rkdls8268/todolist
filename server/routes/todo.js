var express = require('express');
var router = express.Router();

const todoController = require('../controllers/todo');

router.get('/', todoController.readAll);

module.exports = router;