/**
 * File: app.js
 * File Created: 02/03/2018
 * Author: annguyen
 * Description: entry point for node server. 
 */

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var expressJwt = require('express-jwt');

var config = require('./config.json');
var users = require('./controllers/users.controller');
var restaurants = require('./controllers/restaurant.controller');
var search = require('./controllers/search.controller');
var restaurantview = require('./controllers/restaurantview.controller');

var app = express();

mongoose.connect(config.connectionString);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// use JWT auth to secure the api, the token can be passed in the authorization header
app.use(expressJwt({
    secret: config.secret
}).unless({ path: ['/users/authenticate', '/users'] }));

app.use('/users', users);
app.use('/restaurants', restaurants);
app.use('/restaurant/search', search);
app.use('/restaurant/view', restaurantview);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
    console.log(err);

    // send the error
    res.status(err.status || 500).json(err);
});

module.exports = app;
