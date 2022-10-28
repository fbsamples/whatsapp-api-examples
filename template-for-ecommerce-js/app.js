const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const xhub = require("express-x-hub");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const createTemplatesRouter = require('./routes/createTemplates');
const catalogRouter = require('./routes/catalog');
const backofficeRouter = require('./routes/backoffice');
const webhookRouter = require('./routes/incomingWebhook');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(xhub({ algorithm: "sha1", secret: process.env.APP_SECRET }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/createTemplates', createTemplatesRouter);
app.use('/catalog', catalogRouter);
app.use('/backoffice', backofficeRouter);
app.use('/incoming', webhookRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
