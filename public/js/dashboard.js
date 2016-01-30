$(document).ready(init);

var arrayOfRowContainersObjectsG = [];
var curUserObjectG = {};
var itemsToDisplayG = [];


function init(){	
	getItemsOfCurrentUser();
	$('#avatars-list').on('click', '.edit-col', editItem);
	$('#avatars-list').on('click', '.delete-col', deleteItem);
}

function getItemsOfCurrentUser(){
	$.get( '/starwars/curuser/avatars', function(curUserObject) {
		curUserObjectG = curUserObject; 
		itemsToDisplayG = curUserObject.starwars;
  	displayItems();
  });
}

function displayItems(){
	$('#avatars-available-list').empty();
  arrayOfRowContainersObjectsG.splice(0, arrayOfRowContainersObjectsG.length);

	var $titleRow = $('<tr>').addClass('row-container row-title');
	var $itemTitle = $('<td>').addClass('name-title col-md-3 col-xs-3').text('Name');
	$titleRow.append($itemTitle);
	var $heightTitle = $('<td>').addClass('height-title col-md-3 col-xs-3').text('Height');
	$titleRow.append($heightTitle);
	var $massTitle = $('<td>').addClass('mass-title col-md-3 col-xs-3').text('Mass');
	$titleRow.append($massTitle);
	arrayOfRowContainersObjectsG.push($titleRow);
	
	itemsToDisplayG.map(function(item){
		var $rowContainer = $('<tr>').addClass('row-container row-item');
		var $itemColumn = $('<td>').addClass('name-col col-md-3 col-xs-3').text(item.name);
    $rowContainer.append($itemColumn);
    var $heightColumn = $('<td>').addClass('height-col col-md-3 col-xs-3').text(item.height);
    $rowContainer.append($heightColumn);
    var $massColumn = $('<td>').addClass('mass-col col-md-3 col-xs-3').text(item.mass);
    $rowContainer.append($massColumn);
    var $editColumn = $('<td>').addClass('edit-col col-md-3 col-xs-3').text('Edit');
		$rowContainer.append($editColumn);
		var $deleteColumn = $('<td>').addClass('delete-col col-md-3 col-xs-3').text('Delete');
		//var $deleteIcon = $('<i>').addClass('fa fa-trash');
    //$deleteColumn.append($deleteIcon);
    $rowContainer.append($deleteColumn);

    arrayOfRowContainersObjectsG.push($rowContainer);
	});

	$('#avatars-list').append(arrayOfRowContainersObjectsG);
}

function editItem(){
	var indexOfItem = $(this).closest('.row-container').index() - 1;
	//var itemObject = itemsToDisplayG[indexOfItem];
	//var itemId = itemObject._id;

	location.href = '/editItem/' + indexOfItem;
}

function deleteItem(){
	var indexOfItem = $(this).closest('.row-container').index() - 1;

	$.ajax({
  	method: "DELETE",
 		url: "/starwars/" + indexOfItem
		})
		.done(function(status){
			itemsToDisplayG.splice(indexOfItem,1);
			curUserObject.starwars.splice(indexOfItem,1);
			displayItems();
 		});

	location.href = '/dashboard';
}




