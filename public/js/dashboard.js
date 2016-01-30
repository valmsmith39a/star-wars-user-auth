$(document).ready(init);

var arrayOfRowContainersObjectsG = [];
var itemsToDisplayG = [];

function init(){	
	getItemsOfCurrentUser();
}

function getItemsOfCurrentUser(){
	$.get( '/starwars/curuser/avatars', function(arrayOfAddedItems) {
		itemsToDisplayG = arrayOfAddedItems;
  	displayItems();
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
    arrayOfRowContainersObjectsG.push($rowContainer);
	});

	$('#avatars-list').append(arrayOfRowContainersObjectsG);
}