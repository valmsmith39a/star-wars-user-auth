'use strict';

var Firebase = require('firebase');
var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

var User = require('../models/user');

var ref = new Firebase('https://user-auth-ch.firebaseio.com/');

router.post('/register', function(req, res, next) {
  console.log('user data received: ',req.body);
  console.log('inside register route in users.js');
  ref.createUser(req.body, function(err, userData) {
    console.log('error creating user in FB:', err);
    if(err) return res.status(400).send(err);
    console.log('user created successfuly in firebase');
    User.create(userData, function(err) {
      console.log('user created successfully inside mongo db');
      res.send();
    });
  });
});

router.post('/login', function(req, res, next) {
  console.log('user data received: ', req.body);
  console.log('inside login route in users.js');
  ref.authWithPassword(req.body, function(err, authData) {
    console.log('error creating user in FB', err);
    if(err) return res.status(400).send(err);
    User.findOne({uid: authData.uid}, function(err, user) {
      console.log('err mess creating user in MONGO', err); 
      var token = user.generateToken();
      res.cookie('mytoken', token).send();
    });
  });
});

router.get('/profile', authMiddleware, function(req, res) {
  //// logged in,   req.user
  console.log('inside profile');
  
  /*
  User.findById(req.user._id, function(err, user) {
    res.send(user);
  });
  */
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('mytoken').redirect('/');
});


module.exports = router;
