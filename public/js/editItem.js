$(document).ready(init);

function init(){
	//debugger;
	console.log('inside editItems.js');
	$('.save-button').on('click', saveButton);
}

function saveButton (){
	var itemObject = {};

	itemObject.name = $('#name').val();
	itemObject.height = $('#height').val();
	itemObject.mass = $('#mass').val();
	itemObject.birth_year = $('#birth-year').val();

	console.log(itemObject);
	//debugger

	var itemIndex = $('#itemIndex').data('itemindex');
  console.log(itemIndex);
  //debugger

	$.ajax({
  	method: 'PUT',
 		url: '/starwars/' + itemIndex,
 		data: itemObject
		})
		.done(function(data, status) {
			alert('Your edits have been saved');
 		});
 		
}