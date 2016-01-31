var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || "Development";
var passport = require('passport');

global.App = {
    app: express(),
    mailSender: process.env.MAIL_SENDER || '"NodeSlash Development" <no-reply@nodeslash.com>'
    , root: path.join(__dirname)
    , urls: {
        root: process.env.ROOT_URL
    }
    , appPath: function(path) {
        return this.root + '/' + path
    }
    , require: function(path) {
        return require(this.appPath(path))
    }
    , command: function(path) {
        return this.require("commands/" + path)
    }
    , middleware: function(path) {
        return this.require("middlewares/" + path)
    }
    , model: function(path) {
        return this.require("models/" + path)
    }
    , presenter: function(path) {
        return this.require("presenters/" + path)
    }
    , route: function(path) {
        return this.require("app/routes/" + path)
    }
    , util: function(path) {
        return this.require("app/utils/" + path)
    }
}
// view engine setup
App.app.set('views',App.appPath('app/views'));
App.app.set('view options', { layout: false });
App.app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
App.app.use(logger('dev'));
App.app.use(bodyParser.json());
App.app.use(bodyParser.urlencoded({ extended: false }));
App.app.use(cookieParser());
var methodOverride = require('method-override')
App.app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method.toLowerCase()
        return method
    }
}));
App.app.use(require('cookie-session')({secret: "it'sasecrettoeverybody", key: 'nodeslash-session'}))
App.require('app/initializers/passport.js')()
App.app.use(express.static(path.join(__dirname, 'public')));
App.require('./routes/index')(App.app);
App.require('./config/database')(process.env.DATABASE_URL||'mongodb://localhost/schoolManagement');

// catch 404 and forward to error handler
App.app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (App.app.get('env') === 'development') {
    App.app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
App.app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



