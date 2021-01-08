var express = require('express');
var router = express.Router();

const todoController = require('../controllers/todo');

router.get('/', todoController.readAll);
router.get('/:todoId', todoController.readById);
router.post('/', todoController.write);
router.put('/:todoId', todoController.updateTodo);
router.delete('/:todoId', todoController.deleteTodo);

module.exports = router;