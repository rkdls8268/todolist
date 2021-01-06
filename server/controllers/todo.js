const TodoModel = require('../models/todo');

const todo = {
    readAll: async (req, res) => {
        const todos = await TodoModel.readAll();
        try {
            if (!todos.length) {
                return res.status(404).send({err:'Todo not found'});
            }
            res.status(200).send(todos);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = todo;