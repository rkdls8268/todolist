const TodoModel = require('../models/todo');

const todo = {
    readAll: async (req, res) => {
        const todos = await TodoModel.find();
        try {
            if (!todos.length) {
                return res.status(404).send({err:'Todo not found'});
            }
            res.status(200).send(todos);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    write: async (req, res) => {
        const todos = await TodoModel.create(req.body);
        try {
            // 누락된 값 있으면 fail 해주는 코드 추가
            res.status(200).send(todos);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = todo;