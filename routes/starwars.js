var express = require('express');
var router = express.Router();

var request = require('request');
var User = require('../models/user');
var authMiddleware = require('../config/auth');

router.use(authMiddleware);

/* GET : get Star wars avatars from MongoDB 
router.get('/', function(req, res, next) {
	console.log('inside starwars route');
});
*/

/* GET : get star wars characters from API */
router.get('/avatars', function(req, res, next) {
  request('http://swapi.co/api/people/', function(error, response, body){
    res.send(body);
  });  
}); 

/* POST : save Star Wars characters to MongoDB */
router.post('/', function(req, res, next) {

});

/* PUT : Update list of characters */
router.put('/', function(req, res, next) {
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

module.exports = router;
