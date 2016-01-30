var express = require('express');
var router = express.Router();
var User = require('../models/user');


var authMiddleware = require('../config/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.use(authMiddleware);

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

router.get('/addItem', function(req, res, next) {
  res.render('addItem');
});

/* GET item to edit page */
router.get('/editItem/:indexOfItem', function(req, res, next) {
  // Obtain the id of the object to display details
  // Get the object to display
  console.log('inside editItem route in index.js items id', req.params.indexOfItem);
  User.findById(req.user._id, function(err, user){
    if(err) res.status(400).send(err);
    console.log('inside edit item', user);
    console.log('array of items', user.starwars);
    var arrayOfObjects = user.starwars; 
    var starWarsChar = arrayOfObjects[req.params.indexOfItem];
    res.render('editItem', {itemIndex:req.params.indexOfItem, name:starWarsChar.name, height:starWarsChar.height, mass:starWarsChar.mass, birthYear:starWarsChar.birth_year});
  });
});

router.get('/secret', authMiddleware, function(req, res, next) {
  res.send('Wooo!  Secret stuff!!!');
});

module.exports = router;
