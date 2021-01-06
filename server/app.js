var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

const mongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
// 모듈은 mongodb이고 필요한 모듈 변수는 2가지
// MongoClient, ObjectID 모두 클라이언트로 사용됨

const assert = require('assert');
// 데이터베이스 로드 시 에러가 나거나 다른 기타 에러가 발생 시 이를 안전하게 처리함

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'text';
// 몽고디비에 접속을 하기 위한 정보

var indexRouter = require('./routes/index');
var app = express();

// cors 모듈 사용해서 서로 접근할 수 없는 문제 등에 대한 처리를 해줌
const cors = require('cors');
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.listen(3001, () => console.log('running on port 3001...'));
// listen 안하면 서버 정보 못 가져옴.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
  if (err) {
    return console.log("Unable to connect to db");
  }
  console.log("Connected");

  // db가 없으면 생성, 있으면 조회
  const db = client.db(dbName);
});

module.exports = app;
