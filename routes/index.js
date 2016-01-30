var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
	console.log('Inside register route');
  res.render('register');
});

router.get('/dashboard', function(req, res, next) {
	console.log('Inside dashboard route in index.js router file');
  res.render('dashboard');
});

router.get('/addItem', function(req, res, next) {
	console.log('Inside add tiem route in index.js router file');
  res.render('addItem');
});

router.get('/secret', authMiddleware, function(req, res, next) {
  console.log('req.user:', req.user);
  res.send('Wooo!  Secret stuff!!!');
});

module.exports = router;
