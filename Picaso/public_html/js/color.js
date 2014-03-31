/*

		color.js
*/
var R = "0";	
var B = "1";
var G = "2";

var DEFAULT_CHARS = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#.,?!";

var ALPHABET_LENGTH = 26;
var NUMBER_LENGTH = 10;
var LOWER_CASE_START = 97;
var UPPER_CASE_START = 65;
var NUMBER_START = 48;
var COLOR_ARRAY_LENGTH = 63;
var DEFAULT_IMAGE_TAG_SEARCH = "otago";
var COLOR_JS_API_PREFIX = "https://api.instagram.com/v1/tags/";
var COLOR_JS_API_SUFFIX = "/media/recent?callback=?&amp;client_id=4e32d268a27b498e8c9e7840c7863f11";

var myURL;
var nextURL;
var myTag;

var colorArray;
var colorArrayCounter;
var imageArray;
var sessionChars;
var colorArrayReady;

/*************************************************************
	color.js initialization.  Must be called by window.onload
*************************************************************/
function colorInit() {

	//myTag = DEFAULT_IMAGE_TAG_SEARCH;
	sessionChars = DEFAULT_CHARS;
		
	colorArray = [];	
	colorArray["other"] = "#000000";
	
	imageArrayPointer = 0;
	createStaticArray();
	
	newImageSearch(DEFAULT_IMAGE_TAG_SEARCH);	
}

/***************************************
	creates the initial array of colors
***************************************/
function createStaticArray() {

	var charArray = DEFAULT_CHARS.split('');
	//add colors to lower case letters
	for(var i = 0; i < DEFAULT_CHARS.length; i++) {
		addRandomColorToColorArray(charArray[i]);
	}	
}

/*****************************************************************
	adds a random color to the color array at the given parameter
*****************************************************************/
function addRandomColorToColorArray(charCode) {
	console.log("addRandomColorToColorArray " + charCode);
	var rgbArray = [];
	
	//generate a random hexadecimal color
	for(var i = 0; i < 3; i++) {
		
		//get a random number
		value = Math.floor(Math.random()*256);
		
		rgbArray[i] = value;
	}
	
	//create a color with the random hex values in rgbArray
	colorArray[charCode] = "rgb(" + rgbArray[R] +","+ rgbArray[B] +","+ rgbArray[G];	
}


/*
	gets images from instagram
	NOTE: next url for images  = JSON.pagination.next_url
*/
function fetchImages() {
	console.log("fetchImages");
	
	$.getJSON(myURL, 		
		function(result) {		
			
			if(result.data.length > 0) {
			
				imageArray = [];
				nextURL = processNextUrl( result.pagination.next_url);	
			
				$.each(result.data, function(key, value) {								
					imageArray.push(value.images.low_resolution.url);
				});
			
			fetchImageColors(0);
			}
			else  {
				newImageSearch(DEFAULT_IMAGE_TAG_SEARCH);
			}				
		})
		.fail(function(xhr, status, error){
		
			//If the image search fails, search the default image tag.
			newImageSearch(DEFAULT_IMAGE_TAG_SEARCH);
		});

}

function processNextUrl(url) {
	console.log("processNextUrl");
	var returnURL;
	var startIndex = url.indexOf("callback=");
	var endIndex = url.indexOf("&");
	returnURL = url.substring(0, startIndex + 9) + "?" + url.substring(endIndex);	
	console.log("next URL: " + returnURL);
	return returnURL;
}
/*******************************************************/
function fetchImageColors(iteration){
	console.log("fetchImageColors " + iteration);
	//console.log("fetching image colors");
	if(colorArrayReady == false)
	{
		var imageURL = imageArray[iteration];	
		
		$.getImageData({
			url: imageURL,				
			success: function(image) {	
					
					
				var charArray = sessionChars.split('');
				var colorThief = new ColorThief();					
				var rgbArray = colorThief.getColor(image);	
							
				//create a color with the random hex values in rgbArray
				var color = "rgb(" + rgbArray[R] +","+ rgbArray[B] +","+ rgbArray[G] +")";	
						
				colorArray[charArray[colorArrayCounter]] = color;						
				
				//increment colorArrayCounter
				colorArrayCounter++;
				console.log("cac: " + colorArrayCounter);
				console.log(colorArrayCounter + ": " + color);
				//check if colorArray needs more colors
				fetchImageColorsTurnaround(iteration);
			},
			error: function(xhr, text_status) {
				//console.log("fail");
				//console.log(xhr);	
				fetchImageColorsTurnaround(iteration);
			}			
		});
	}
	else {
		console.log("double done!");
	}
}
/*******************************************************/
function fetchImageColorsTurnaround(iteration) {
	console.log("fetchImageColorsTurnaround " + iteration);
	if(colorArrayCounter < sessionChars.length)
	{
		//increment iteration
		iteration++;
			
		//check if the iteration has reached its end
		if(iteration == imageArray.length){
				
			//if it has, fetch more images
			myURL = nextURL;
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
			console.log("done");
	}
}
/*******************************************************/
function newImageSearch(newTag) {
	console.log("nis " + newTag);
	//check that the user has entered a new tag
	if(myTag != newTag) {
	
		myTag = newTag;
		//strip white space from given tag
		var tag = "";
		for(var c in myTag) {
			
			if(myTag[c] != ' ') {
				tag += myTag[c];
			}		
		}
		console.log("new tag: " + tag);	
		myURL = buildMyURL(tag);		
		createDynamicArray();
	}
	else {
		console.log("same tag");
	}
	
}

/*********************************************************************************************
	Creates an array of colors which consist of the dominant color of recent instagram images.
*********************************************************************************************/
function createDynamicArray() {
	console.log("createDynamicArray");
	colorArrayReady =false;
	
	colorArrayCounter = 0;
	fetchImages();
}
/*******************************************************/
function buildMyURL(tag) {
	return COLOR_JS_API_PREFIX + tag + COLOR_JS_API_SUFFIX;
}
/*******************************************************/
function getColor(c) {
	//do some stuff here
	var returnColor = colorArray['other'];
	
	if(sessionChars.indexOf(c) > -1)
	{
		returnColor = colorArray[c];
	}
	else
	{
		if(colorArrayReady) {
			console.log("restarting color array");
			colorArrayCounter = sessionChars.length;
			console.log("cac: " + colorArrayCounter);
			fetchImages();
		}
			
		//Make sure the given char is not undefined.
		if(c != undefined) {
			sessionChars += c;
			console.log("charArray: " + sessionChars);
			returnColor = colorArray['other'];
		}	
	}
	
	return returnColor;
}