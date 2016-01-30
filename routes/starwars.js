var express = require('express');
var router = express.Router();

var request = require('request');
var User = require('../models/user');
var authMiddleware = require('../config/auth');

router.use(authMiddleware);


/* GET : get star wars characters added by the logged in user */
router.get('/curuser', function(req, res, next) {
  console.log('in get router of curuser');
  User.findById(req.user._id, function(err, user){
    res.send(user); 
  });
});


/* GET : get available star wars characters from API */
router.get('/avatars', function(req, res, next) {
  request('http://swapi.co/api/people/', function(error, response, body){
    res.send(body);
  });  
}); 

/* GET : get star wars characters added by the logged in user */
router.get('/curuser/avatars', function(req, res, next) {
  User.findById(req.user._id, function(err, user){
    res.send(user); 
  });
});

/* POST : save Star Wars characters to MongoDB */
router.post('/', function(req, res, next) {
  var objectToAdd = req.body; 
  User.findById(req.user._id, function(err, user){
    // Add object selected to array 
    user.starwars.push(objectToAdd); 
    // Write back to MongoDB
    user.save(function(err, savedItem){
      res.status(err ? 400:200).send(err||savedItem);
    });
  });
});

/* PUT : Update list of characters */
router.put('/:itemIndex', function(req, res, next) {

  console.log('inside put of starwars');

  var objectPassedIn = req.body; 
  console.log('object passed in is: ', objectPassedIn);
  console.log('user id is', req.user._id);
  
  User.findById(req.user._id, function(err, user){
    // Add object selected to array 
    var objectToEdit = user.starwars[req.params.itemIndex];
    console.log('object to edit is', objectToEdit);

    console.log('name is',  user.starwars[req.params.itemIndex].name);

    user.starwars.splice(req.params.itemIndex, 1, objectPassedIn);

    user.starwars[req.params.itemIndex].name = objectPassedIn.name.toString();
    user.starwars[req.params.itemIndex].height = objectPassedIn.height.toString();
    user.starwars[req.params.itemIndex].mass = objectPassedIn.mass.toString();
    user.starwars[req.params.itemIndex].birth_year = objectPassedIn.birth_year.toString();

    console.log('new name is: ', user.starwars[req.params.itemIndex].name);
    console.log('new object is: ', user.starwars[req.params.itemIndex]);


    // Write back to MongoDB
  	user.save(function(err, savedItem){
      console.log('saved item is', savedItem);
  		res.status(err ? 400:200).send(err||savedItem);
  	});
  
  });
  
});

/* DELETE delete item in array */
router.delete('/:indexOfItem', function(req, res, next) {
  User.findById(req.user._id, function(err, user){
      user.starwars.splice(req.params.indexOfItem,1);
      user.save(function(err, savedItem){
        res.status(err ? 400:200).send(err||savedItem);
      });
  });
});

module.exports = router;
