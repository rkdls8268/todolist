var mongoose = require('mongoose');

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

module.exports = mongoose.model('todo', todoSchema);
// 모듈화 -> require(models/todo); 해서 사용할 수 있음!!!