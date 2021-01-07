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

todoSchema.statics.findAll = function () {
    return this.find();
}

todoSchema.statics.findOneById = function (id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
        this.findOne({"_id":id}, function (err, todo) {
            if (err) {
                console.log(err);
            } else {
                if (todo==null) {
                    console.log(todo);
                }
            }
        });
    }
    else
        return null;
}

todoSchema.statics.create = function (payload) {
    const todo = new this(payload);
    return todo.save();
}

module.exports = mongoose.model('todo', todoSchema);