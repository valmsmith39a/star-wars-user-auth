'use strict';

var $email, $password;

$(function() {
  $email = $('#email');
  $password = $('#password');

  $('form').on('submit', loginUser);
});

function loginUser(e) {
  e.preventDefault();

  var email = $email.val();
  var password = $password.val();
  console.log('email and password', email, password)

  $.post('/users/login', {email: email, password: password})
  .success(function(data) {
    debugger;
    location.href = '/dashboard';
  })
  .fail(function(err) {
    debugger;
    console.log(err);
    
  });
}
