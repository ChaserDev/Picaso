/**********************
		color.js
**********************/

//Array indexes for the colorArray.
var R = "0";	
var B = "1";
var G = "2";

//Default characters to find colors for on window load.  used to initialize sessionChars. 
var DEFAULT_CHARS = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#.,?!";

var DEFAULT_COLOR_TAG = "other";
var DEFAULT_COLOR = "#000000";

var COLOR_RANGE = 256;

var DEFAULT_IMAGE_TAG_SEARCH = "otago";
var COLOR_JS_API_PREFIX = "https://api.instagram.com/v1/tags/";
var COLOR_JS_API_SUFFIX = "/media/recent?callback=?&amp;client_id=4e32d268a27b498e8c9e7840c7863f11";

//myURL, nextURL, and myTag are used to make calls to the instagram API.
var myURL;
var nextURL;
var myTag;

//colorArray holds a dynamic array of colors based on an instagram tag search.
var colorArray;
var colorArrayCounter;

//imageArray holds the URLs returned from the instagram tag search.
var imageArray;

//sessionChars is an associative array. each char in DEFAULT_CHARS is assigned a random color.
//if a call is made to getColor with a char not in this array, it fetches a new color to associate 
//with the given char.
var sessionChars;

//colorArrayReady is a boolean used to determine when the colorArray is fully initialized.
//It is used to make a decision about whether to rebuild the colorArray, or add new colors to the end of it.
var colorArrayReady;

/*************************************************************
	color.js initialization.  Must be called by window.onload
*************************************************************/
function colorInit() {
	
	sessionChars = DEFAULT_CHARS;
		
	colorArray = [];	
	colorArray[DEFAULT_COLOR_TAG] = DEFAULT_COLOR;
	
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

	var rgbArray = [];
	
	//generate a random hexadecimal color
	for(var i = 0; i < 3; i++) {
		
		//get a random number
		value = Math.floor(Math.random()*COLOR_RANGE);
		
		rgbArray[i] = value;
	}
	
	//create a color with the random hex values in rgbArray
	colorArray[charCode] = "rgb(" + rgbArray[R] +","+ rgbArray[B] +","+ rgbArray[G];	
}


/*
	gets images from instagram
*/
function fetchImages() {
	
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
}
/*******************************************************/
function fetchImageColorsTurnaround(iteration) {

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
	}
}
/*******************************************************/
function newImageSearch(newTag) {

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
		myURL = buildMyURL(tag);		
		createDynamicArray();
	}	
}

/*********************************************************************************************
	Creates an array of colors which consist of the dominant color of recent instagram images.
*********************************************************************************************/
function createDynamicArray() {

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
	var returnColor = colorArray[DEFAULT_COLOR_TAG];
	
	if(sessionChars.indexOf(c) > -1)
	{
		returnColor = colorArray[c];
	}
	else
	{
		if(colorArrayReady) {
			colorArrayCounter = sessionChars.length;
			fetchImages();
		}
			
		//Make sure the given char is not undefined.
		if(c != undefined) {
			sessionChars += c;
		}	
	}	
	return returnColor;
}