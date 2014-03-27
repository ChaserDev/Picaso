var R = "0";	
var B = "1";
var G = "2";

var ALL_CHARS = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

var ALPHABET_LENGTH = 26;
var NUMBER_LENGTH = 10;
var LOWER_CASE_START = 97;
var UPPER_CASE_START = 65;
var NUMBER_START = 48;
var COLOR_ARRAY_LENGTH = 63;
//var URL = "https://api.instagram.com/v1/tags/random/media/recent?callback=?&amp;client_id=4e32d268a27b498e8c9e7840c7863f11"
var URL = "https://api.instagram.com/v1/tags/love/media/recent?callback=?&amp;client_id=4e32d268a27b498e8c9e7840c7863f11";

var colorArray;
var colorArrayCounter;
var imageArray;

var colorArrayReady;

/*************************************************************
	color.js initialization.  Must be called by window.onload
*************************************************************/
function colorInit() {

	colorArray = [];	
	colorArray["other"] = "#000000";
	
	imageArrayPointer = 0;
	
	createStaticArray();
	createDynamicArray();
	
}

/***************************************
	creates the initial array of colors
***************************************/
function createStaticArray() {

	var charArray = ALL_CHARS.split('');
	//add colors to lower case letters
	for(var i = 0; i < ALL_CHARS.length; i++) {
		addRandomColorToColorArray(charArray[i]);
	}	
	console.log("static array done");
}

/*****************************************************************
	adds a random color to the color array at the given parameter
*****************************************************************/
function addRandomColorToColorArray(charCode) {

	var rgbArray = [];
	
	//generate a random hexadecimal color
	for(var i = 0; i < 3; i++) {
		
		//get a random number
		value = Math.floor(Math.random()*256);
		
		value = performHexConversion(value);
		rgbArray[i] = value;
	}
	
	//create a color with the random hex values in rgbArray
	colorArray[charCode] = "#" + rgbArray[R] + rgbArray[B] + rgbArray[G];	
}

function performHexConversion(value) {
	
	//convert to hex
	value = value.toString(16);
		
	//append 0 if the hex needs padding
	value = value.length == 1 ? "0" + value : value;
	
	return value;
}

/*
	gets images from instagram
*/
function fetchImages() {
	console.log("fetching images");
	
	$.getJSON(URL, 		
		function(result) {
			
			imageArray = [];
			
			$.each(result.data, function(key, value) {				
				
				imageArray.push(value.images.low_resolution.url);
			});
			
			fetchImageColors(0);
		});

}

function fetchImageColors(iteration){
	
	
	
	console.log("fetching image colors");
	
	var imageURL = imageArray[iteration];	
	
	$.getImageData({
		url: imageURL,				
		success: function(image) {	
				
				
			var charArray = ALL_CHARS.split('');
			var colorThief = new ColorThief();					
			var rgbArray = colorThief.getColor(image);	
			
			for(var i = 0; i < 3; i++) {
			
				value = performHexConversion(value);
			}
			//create a color with the random hex values in rgbArray
			var color = "#" + rgbArray[R] + rgbArray[B] + rgbArray[G];	
					
			colorArray[charArray[colorArrayCounter]] = color;						
			
			//increment colorArrayCounter
			colorArrayCounter++;
			console.log(colorArrayCounter);
			//check if colorArray needs more colors
			if(colorArrayCounter < ALL_CHARS.length)
			{
				//increment iteration
				iteration++;
				
				//check if the iteration has reached its end
				if(iteration == imageArray.length){
				
					//if it has, fetch more images
					fetchImages();
				}
				else{
					fetchImageColors(iteration);
				}
			}
			else {
				//reset the colorArrayCounter
				colorArrayCounter = 0;
				//set the colorArrayReady flag to true
				colorArrayReady = true;
				listColors();
			}
		},
			error: function(xhr, text_status) {
			console.log("fail");
			console.log(xhr);
			
		}	
	});
}

//DELETEME!!!
function listColors() {
	console.log("T: " + colorArray["T"]);
	console.log("1: " + colorArray["1"]);
	console.log("m: " + colorArray["m"]);
}
/*
	creates an array of colors which consist of 
	the dominant color of recent instagram images
*/
function createDynamicArray() {

	colorArrayReady =false;
	
	colorArrayCounter = 0;
	fetchImages();
}

function getColor(c) {
	//do some stuff here
	var returnColor = "#000000";
	
	var regex = /^[0-9a-zA-Z]+$/;

	if(regex.test(c))
	{
		returnColor = colorArray[c];
	}
	else
	{
		returnColor = colorArray['other'];
	}
	
	return returnColor;
	//return colorArray[adamsChar]
}