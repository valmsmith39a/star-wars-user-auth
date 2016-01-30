$(document).ready(init);
console.log('inside dashboard');

var arrayOfItemsObjectsG = [];
var arrayOfRowContainersObjectsG = [];
var originalArrayOfItemsObjectsG = [];
var priceTotalG = 0;

var arrayOfItemsObjectsSortedByNameG = [];
var arrayOfItemsObjectsSortedByPriceG = [];
var filteredArrayOfItemsG = [];
var sortedByNameFlagG = false;
var sortedByPriceFlagG = false;

function init(){	
	getItems();
}

function getItems(){
	
}