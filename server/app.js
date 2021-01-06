var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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

// mongoDB 서버 연결
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  console.log("connected to mongod server");
});
// connect() 메소드로 서버에 접속을 할 수 있음.
mongoose.connect('mongodb://localhost/todo');

module.exports = app;
