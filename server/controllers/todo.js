const TodoModel = require('../models/todo');

const todo = {
    readAll: async (req, res) => {
        const todos = await TodoModel.findAll();
        try {
            if (!todos) {
                return res.status(404).send({err:'Todo not found'});
            }
            res.status(200).send(todos);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    readById: async (req, res) => {
        const todoId = req.params.todoId;
        const aTodo = await TodoModel.findOneById(todoId);
        console.log(aTodo);
        try {
            if (!aTodo) {
                return res.status(404).send({err:'Todo not found'});
            }
            res.status(200).send(aTodo);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    write: async (req, res) => {
        const payload = req.body;
        const todos = await TodoModel.write(payload);
        try {
            // 누락된 값 있으면 fail 해주는 코드 추가
            res.status(200).send(todos);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = todo;