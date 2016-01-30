$(document).ready(init);

var itemsToDisplayG = [];
var arrayOfRowContainersObjectsG = [];
var curUserG = {};

function init(){
	getCurUser();
	getItems();
	$('#avatars-available-list').on('click', '.add-btn', postItems);
}

function getCurUser(){
	$.get( '/starwars/curuser', function( data ) {
		curUserG = data; 
  });
}

/* Get set of 10 characters. Different set each time. */
function getItems(){
	$.get( '/starwars/avatars', function( data ) {
		itemsToDisplayG = JSON.parse(data).results;
  	displayItems();
  });
}

function postItems(e){
	e.preventDefault();
  var indexOfItem = $(this).closest('.row-container').index() - 1;
  var objectToAdd = itemsToDisplayG[indexOfItem];

	$.ajax({
  	method: 'POST',
 		url: '/starwars',
 		data: objectToAdd
		})
		.done(function(data, status) {
			alert('The character has been added');
 		});
}

function displayItems(){
	$('#avatars-available-list').empty();
  arrayOfRowContainersObjectsG.splice(0, arrayOfRowContainersObjectsG.length);

	var $titleRow = $('<tr>').addClass('row-container row-title');
	var $itemTitle = $('<td>').addClass('name-title col-md-3 col-xs-3').text('Name');
	$titleRow.append($itemTitle);
	arrayOfRowContainersObjectsG.push($titleRow);
	
	itemsToDisplayG.map(function(item){
		var $rowContainer = $('<tr>').addClass('row-container row-item');
		var $itemColumn = $('<td>').addClass('name-col col-md-3 col-xs-3').text(item.name);
    $rowContainer.append($itemColumn);
    var $addBtn = $('<button>').addClass('add-btn col-md-3 col-xs-3').text('Add');
    $rowContainer.append($addBtn);

    arrayOfRowContainersObjectsG.push($rowContainer);
	});

	$('#avatars-available-list').append(arrayOfRowContainersObjectsG);
}


