'use strict';

var Firebase = require('firebase');
var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

var User = require('../models/user');

var ref = new Firebase('https://user-auth-ch.firebaseio.com/');

router.post('/register', function(req, res, next) {
  ref.createUser(req.body, function(err, userData) {
    if(err) return res.status(400).send(err);
    User.create(userData, function(err) {
      res.send();
    });
  });
});

router.post('/login', function(req, res, next) {
  ref.authWithPassword(req.body, function(err, authData) {
    if(err) return res.status(400).send(err);
    User.findOne({uid: authData.uid}, function(err, user) {
      var token = user.generateToken();
      res.cookie('mytoken', token).send();
    });
  });
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('mytoken').redirect('/');
});

module.exports = router;

/*
router.post('/login', function(req, res, next) {
  ref.authWithPassword(req.body, function(err, authData) {
    if(err) {
      ref.resetPassword({
      email: email
    }, function(error) {
      if (error) {
        switch (error.code) {
          case "INVALID_USER":
            console.log("The specified user account does not exist.");
            alert('The specified user account does not exist.');
            return res.status(400).send(err);
          default:
            console.log("Error resetting password:", error);
            alert('Error resetting password:', error);
            return res.status(400).send(err);
        }
      } else {
          console.log("Password reset email sent successfully!");
          alert('Password reset email sent successfully!');
          return res.status(400).send(err);
      }
   });
  }
    User.findOne({uid: authData.uid}, function(err, user) {
      var token = user.generateToken();
      res.cookie('mytoken', token).send();
     });
    });
});
*/

/* Testing authMiddleware
router.get('/profile', authMiddleware, function(req, res) {
  //// logged in,   req.user
  console.log('inside profile');
  
  User.findById(req.user._id, function(err, user) {
    res.send(user);
  });
  
});
*/

