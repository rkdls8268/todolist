var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
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

// const TodoModel = require('../modules/todo');

// const todo = {
//     findAll: async () => {
//         try {
//             const todos = await TodoModel.find();
//             return todos;
//         } catch (err) {
//             console.log('findAll error: ', err);
//             throw err;
//         }
//     }
// }

// todoSchema.statics.findAll = function () {
//     return this.find();
// }

// statics 말고 methods 사용하면 controllers에서 findAll 인식 못함
todoSchema.statics.findAll = function () {
    return this.find();
}

todoSchema.statics.findOneById = function (id) {
    // cast error 처리
    if (mongoose.Types.ObjectId.isValid(id)) {
        // return this.findOne({"_id":id});
        return this.findById(id); // id로 찾는 경우 findById 권장
    }
    else
        return null;
}

// methods도 되는데 그 이유는 create()가 Model.create()로 인식되었기 때문
todoSchema.statics.write = function (payload) {
    const todo = new this(payload);
    return todo.save();
}

todoSchema.statics.updateTodo = function (todoId, payload) {
    console.log("payload:", payload);
    console.log("todoId: ", todoId);
    return this.findOneAndUpdate({"_id": todoId}, {"content": payload.content, "completed": payload.completed});
}

todoSchema.statics.deleteTodo = function (todoId) {
    return this.findOneAndDelete({"_id": todoId});
}

module.exports = mongoose.model('todo', todoSchema);
// 모듈화 -> require(models/todo); 해서 사용할 수 있음!!!