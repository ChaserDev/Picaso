/**********************
		color.js
**********************/

//Array indexes for the colorArray.
var R = "0";	
var B = "1";
var G = "2";

var COLOR_PARTS = 3;
//Default characters to find colors for on window load.  used to initialize sessionChars. 
var DEFAULT_CHARS = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#.,?!";

//The tag and default color to use when a color that is not associated with a char in the colorArray is needed.
var DEFAULT_COLOR_TAG = "other";
var DEFAULT_COLOR = "#000000";

//Range of colors used in RGB (0 - 255);
var COLOR_RANGE = 256;

//Consts used to make calls to the instagram API.  Default tag is the tag that is
//searched for on window load.
var DEFAULT_IMAGE_TAG_SEARCH = "otago";
var COLOR_JS_API_PREFIX = "https://api.instagram.com/v1/tags/";
var COLOR_JS_API_SUFFIX = "/media/recent?callback=?&amp;client_id=4e32d268a27b498e8c9e7840c7863f11";

//Consts used to determine the start and end index when processing nextURL.
//Required because the next url returned by instagram contains jibberish for callback.
var PROCESS_START_INDEX = "callback=";
var START_INDEX_LENGTH = 9;
var PROCESS_END_INDEX = "&";

//Consts used to create a color string.
var COLOR_START = "rgb(";
var COLOR_SPACE = ",";
var COLOR_END = ")";

//myURL, nextURL, and myTag are used to make calls to the instagram API.
var myURL;
var nextURL;
var myTag;

//colorArray holds a dynamic array of colors based on an instagram tag search.
var colorArray;

//colorArrayCounter is used to point to a char in sessionChars when assigning that char a color.
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
	color.js initialization.  Must be called by window.onload.
*************************************************************/
function colorInit() {
	
	//Set the session chars to default chars.
	sessionChars = DEFAULT_CHARS;
		
	colorArray = [];	
	//set the default color in the colorArray
	colorArray[DEFAULT_COLOR_TAG] = DEFAULT_COLOR;
	
	//Create the default array (random colors).
	createStaticArray();
	
	//Search for images with the default tag.
	newImageSearch(DEFAULT_IMAGE_TAG_SEARCH);	
}

/***************************************
	creates the initial array of colors
***************************************/
function createStaticArray() {

	//Create an array of the default chars.
	var charArray = DEFAULT_CHARS.split('');
	
	//Add colors to the characters in charArray.
	for(var i = 0; i < DEFAULT_CHARS.length; i++) {
	
		addRandomColorToColorArray(charArray[i]);
	}	
}

/*****************************************************************
	Adds a random color to the color array at the given parameter.
*****************************************************************/
function addRandomColorToColorArray(charCode) {

	//rgbArray is used store the random color values.
	var rgbArray = [];
	
	//Generate a random rgb color.
	for(var i = 0; i < COLOR_PARTS; i++) {
		
		//Get a random number.
		value = Math.floor(Math.random()*COLOR_RANGE);
		
		//Store in rgbArray.
		rgbArray[i] = value;
	}
	
	//Create a color with the random values in rgbArray.
	colorArray[charCode] = COLOR_START + rgbArray[R] +COLOR_SPACE+ rgbArray[B] +COLOR_SPACE+ rgbArray[G] +COLOR_END;	
}


/*****************************
	Get images from  instagram.
*****************************/
function fetchImages() {
	
	//AJAX request to instagram.
	$.getJSON(myURL, 		
		function(result) {		
			
			//if successful, will return an array of data.
			if(result.data.length > 0) {
				
				//Empty the imageArray.
				imageArray = [];
				
				//Process the next url provided by the AJAX response.
				nextURL = processNextUrl( result.pagination.next_url);	
			
				//Iterate through each data result
				$.each(result.data, function(key, value) {
					
					//Add the image URL to the imageArray.
					imageArray.push(value.images.low_resolution.url);
				});
			
			//Start the process of fetching the dominant colors of each image.
			fetchImageColors(0);
			}
			//If unsuccessful, the data array will be empty.
			else  {
				//So we do a new image search for the default tag.
				newImageSearch(DEFAULT_IMAGE_TAG_SEARCH);
			}				
		})
		.fail(function(xhr, status, error){
			
			//If the image search fails, search the default image tag.
			newImageSearch(DEFAULT_IMAGE_TAG_SEARCH);
		});

}

/********************************************************************************
	processNextUrl takes the next_url from an AJAX response, and formats
	it so it can be used to make another API call to instagram, and get different
	images.
********************************************************************************/
function processNextUrl(url) {

	var returnURL;	
	
	//startIndex is the part of the string to end the first sub-string cut.
	var startIndex = url.indexOf(PROCESS_START_INDEX);
	
	//endIndex is the part of the string to resume the sub-string cut.
	var endIndex = url.indexOf(PROCESS_END_INDEX);
	
	//The return URL is a formatted version of the given URL.  We need to remove the middle of it
	//because it looks like callback=giberishhhhhhhho3ioqf&, when it should be callback=?&.
	returnURL = url.substring(0, startIndex + START_INDEX_LENGTH) + "?" + url.substring(endIndex);	
		
	return returnURL;
}

/**********************************************************************************
	fetchImageColors takes an image from the image array (indexed at iteration) 
	and puts the dominant color in the colorArray, which is indexed by a character.	
**********************************************************************************/
function fetchImageColors(iteration){

	//Check that the color array is not ready.
	if(colorArrayReady == false)
	{
		//Get the images URL.
		var imageURL = imageArray[iteration];	
		
		//getImageData retrieves the data from an image so that we can
		//use color-theif.js to find the dominant color.
		$.getImageData({
			url: imageURL,				
			success: function(image) {	
					
				//Split the sessionChars string into an array.	
				var charArray = sessionChars.split('');
				
				//Extract and store the dominant color from the image in an array.
				var colorThief = new ColorThief();					
				var rgbArray = colorThief.getColor(image);	
											
				//Create a color with the values in rgbArray.
				var color = COLOR_START + rgbArray[R] +COLOR_SPACE+ rgbArray[B] +COLOR_SPACE+ rgbArray[G] +COLOR_END;	
				
				//Put the color in the colorArray.
				colorArray[charArray[colorArrayCounter]] = color;						
				
				//Increment colorArrayCounter.
				colorArrayCounter++;
				
				//Check if colorArray needs more colors
				fetchImageColorsTurnaround(iteration);
			},
			error: function(xhr, text_status) {
				console.log("fail getImageColors");
				fetchImageColorsTurnaround(iteration);
			}			
		});
	}
}

/**************************************************************************
	fetchImageColorsTurnaround determines the action to take after an image 
	color has been added to the color array.  its options are:
	
	-Get more images from instagram if all the images in the array 
	 have been used.
	 
	-Get another image color.
	
	-stop getting image colors, set colorArrayReady to true.
**************************************************************************/
function fetchImageColorsTurnaround(iteration) {

	//Check that the colorArrayCounter doesn't exceed the length of the 
	//sessionChars string.
	if(colorArrayCounter < sessionChars.length)
	{
		//Increment iteration.
		iteration++;
			
		//Check if the iteration has reached its end.
		if(iteration == imageArray.length){
				
			//If it has, fetch more images.
			myURL = nextURL;
			fetchImages();
		}
		else{
			//If not, fetch the dominant color of the next
			//image in the image array.
			fetchImageColors(iteration);
		}
	}
	//Stop getting colors.
	else {
			//reset the colorArrayCounter
			colorArrayCounter = 0;
			
			//set the colorArrayReady flag to true
			colorArrayReady = true;
	}
}

/*********************************************************************************
	newImageSearch takes a string as a parameter, formats it to remove spaces, and
	calls createDynamicArray.
*********************************************************************************/
function newImageSearch(newTag) {

	//check that the user has entered a new tag
	if(myTag != newTag) {
	
		myTag = newTag;
		
		var tag = "";
		for(var c in myTag) {
			
			//If the char is a white space, don't remove it from the tag.
			if(myTag[c] != ' ') {
				tag += myTag[c];
			}		
		}
		//Create URL from the formatted tag.
		myURL = buildMyURL(tag);		
		
		//Create an array of images.
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

/*************************
	Builds a URL for AJAX.
*************************/
function buildMyURL(tag) {
	return COLOR_JS_API_PREFIX + tag + COLOR_JS_API_SUFFIX;
}

/**************************************************************
	Takes a char as an array index pointer and returns a color.
**************************************************************/
function getColor(c) {

	//Set the return color to the default color.
	var returnColor = colorArray[DEFAULT_COLOR_TAG];
	
	//Check if the given char is in the array.
	if(sessionChars.indexOf(c) > -1)
	{
		//If it is, set the return color to the color referenced by the char.
		returnColor = colorArray[c];
	}
	//If not, add the char to the sessionChars string.
	else
	{
		//Make sure the given char is not undefined.
		if(c != undefined) {
			sessionChars += c;
			
			//If the colorArray is finished building, 
			//only add colors starting from the new char.
			if(colorArrayReady) {
				colorArrayCounter = sessionChars.length;
				colorArrayReady = false;
				fetchImages();
			}		
		}	
	}	
	return returnColor;
}