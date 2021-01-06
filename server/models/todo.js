var mongoose = require('mongoose');
const todo = require('../controllers/todo');
var Schema = mongoose.Schema;

// Schema: document의 구조가 어떻게 생겼는지 알려주는 역할
const todoSchema = new Schema({
    userName: {type: String, require: true},
    content: {type: String, required: true},
    completed: {type: String, default: false}
},
{
    timestamps: {currentTime: () => Date.now() + 3600000 * 9}, // 한국 시간대
    collection: 'todos'
});

todoSchema.statics.findAll = function () {
    return todo.readAll();
}

module.exports = mongoose.model('todo', todoSchema);