'use strict';

var $email, $password, $password2;

$(function() {
  $email = $('#email');
  $password = $('#password');
  $password2 = $('#password2');

  $('form').on('submit', registerUser);
});

function registerUser(e) {
  e.preventDefault();

  var email = $email.val();
  var password = $password.val();
  var password2 = $password2.val();

  if(password !== password2) {
    $('.password').val('');
    return alert('Passwords must match.');
  }

  $.post('/users/register', {email: email, password: password})
  .success(function() {
    debugger;
    location.href = '/login';
  })
  .fail(function(err) {
    debugger;
    alert('Error.  Check console.');
    console.log('err:', err);
  });
}
