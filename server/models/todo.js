const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;
// 모듈은 mongodb이고 필요한 모듈 변수는 2가지
// MongoClient, ObjectID 모두 클라이언트로 사용됨

const assert = require('assert');
// 데이터베이스 로드 시 에러가 나거나 다른 기타 에러가 발생 시 이를 안전하게 처리함

const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'todo';
// 몽고디비에 접속을 하기 위한 정보

const todo = {
    readAll: MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection("todos").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    })
}

module.exports = todo;

