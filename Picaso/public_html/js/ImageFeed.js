/**********************
		color.js
**********************/

var COLOR_PARTS = 3;
//Default characters to find colors for on window load.  used to initialize sessionChars. 
var DEFAULT_CHARS = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#.,?!";

//Consts used to make calls to the instagram API.  Default tag is the tag that is
//searched for on window load.
var DEFAULT_IMAGE_TAG_SEARCH = "otago";
var IMAGE_JS_API_PREFIX = "https://api.instagram.com/v1/tags/";
var IMAGE_JS_API_SUFFIX = "/media/recent?callback=?&amp;client_id=4e32d268a27b498e8c9e7840c7863f11";

//Consts used to determine the start and end index when processing nextURL.
//Required because the next url returned by instagram contains jibberish for callback.
var PROCESS_START_INDEX = "callback=";
var START_INDEX_LENGTH = 9;
var PROCESS_END_INDEX = "&";


//myURL, nextURL, and myTag are used to make calls to the instagram API.
var myURL;
var nextURL;
var myTag;

//arrayCounter is used to point to a char in sessionChars when assigning that char a color.
var arrayCounter;

//tmpImageArray temporarily holds the URLs returned from the instagram tag search.
var tmpImageArray;

//imageArray holds the images retrieved from the URLs provided by tempImageArray.
var imageArray;

//The default image that is used when a char that doesn't have its own image is requested.
var DEFAULT_IMAGE_TAG = "i_default";
var DEFAULT_IMAGE_URL = "images/op.jpg";

//sessionChars is an associative array. each char in DEFAULT_CHARS is assigned a random image.
//if a call is made to getImage with a char that is not in this array, a new image is fetched to associate 
//with the given char.
var sessionChars;

//imageArrayReady is a boolean used to determine when the image array is fully initialized.
//It is used to make a decision about whether to rebuild the image array, or add new images
//to the end of the image array.
var imageArrayReady;

/*************************************************************
	ImageFeed.js initialization.  Must be called by window.onload.
*************************************************************/
function imageInit() {
	
	//Set the session chars to default chars.
	sessionChars = DEFAULT_CHARS;
		
	imageArray = [];	
	imageArray[DEFAULT_IMAGE_TAG] = new Image();
	imageArray[DEFAULT_IMAGE_TAG].src = DEFAULT_IMAGE_URL;
			
	//Search for images with the default tag.
	newImageSearch(DEFAULT_IMAGE_TAG_SEARCH);	
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

/**********************************************************************
	Creates an array of images from URLs recieved by the instagram API.
**********************************************************************/
function createDynamicArray() {

	imageArrayReady =false;		
	arrayCounter = 0;
	fetchImageLinks();
}


/*****************************
	Get images from  instagram.
*****************************/
function fetchImageLinks() {
	
	//AJAX request to instagram.
	$.getJSON(myURL, 		
		function(result) {		
			
			//if successful, will return an array of data.
			if(result.data.length > 0) {
				
				//Empty the tmpImageArray.
				tmpImageArray = [];
				
				//Process the next url provided by the AJAX response.
				nextURL = processNextUrl( result.pagination.next_url);	
			
				//Iterate through each data result
				$.each(result.data, function(key, value) {
					
					//Add the image URL to the tmpImageArray.
					tmpImageArray.push(value.images.low_resolution.url);
				});				
				
			
				//Start the process of fetching the dominant colors of each image.
				fetchImages(0);
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

/**************************************************************************
	fetchImages takes an image from the image array (indexed at iteration) 
	and puts that image in the imageArray, which is indexed by a character.	
**************************************************************************/
function fetchImages(iteration){

	//Check that the color array is not ready.
	if(imageArrayReady == false)
	{
		//Get the images URL.
		var imageURL = tmpImageArray[iteration];	
		
		//getImageData retrieves the image data from an image URL.
		$.getImageData({
			url: imageURL,				
			success: function(image) {				

				//Split the sessionChars string into an array.	
				var charArray = sessionChars.split('');
				
				//Add the image to the image array.
				imageArray[charArray[arrayCounter]] = image;
				
				//Increment arrayCounter.
				arrayCounter++;		
				
				//Check if imageArray needs more colors
				fetchImagesTurnaround(iteration);
			},
			error: function(xhr, text_status) {
				
				fetchImagesTurnaround(iteration);
			}			
		});
	}
}

/**************************************************************************
	fetchImagesTurnaround determines the action to take after an image 
	has been added to the image array.  Its options are:
	
	-Get more images from instagram if all the images in the temp image
	 array have been used.
	 
	-Get another image from the temp image array.
	
	-stop getting images, set arrayReady to true.
**************************************************************************/
function fetchImagesTurnaround(iteration) {

	//Check that the arrayCounter doesn't exceed the length of the 
	//sessionChars string.
	if(arrayCounter < sessionChars.length)
	{
		//Increment iteration.
		iteration++;
			
		//Check if the iteration has reached its end.
		if(iteration == tmpImageArray.length){
				
			//If it has, fetch more images.
			myURL = nextURL;
			fetchImageLinks();
		}
		else{
			//If not, fetch the dominant color of the next
			//image in the image array.
			fetchImages(iteration);
		}
	}
	//Stop getting colors.
	else {
			//reset the arrayCounter
			arrayCounter = 0;
			
			//set the colorArrayReady flag to true
			imageArrayReady = true;
			
			console.log("ending image build");
	}
}

/*************************
	Builds a URL for AJAX.
*************************/
function buildMyURL(tag) {
	return IMAGE_JS_API_PREFIX + tag + IMAGE_JS_API_SUFFIX;
}

/******************************************************************
	getImage takes a char and returns that char's associated image.
	when an image is not associated with the given char, it returns
	the default image.
******************************************************************/
function getImage(c) {
	
	//console.log("c at start: " + c);
	var returnImg =  imageArray[DEFAULT_IMAGE_TAG];
	
	//Check if the given char is in the array.
	if(sessionChars.indexOf(c) > -1)
	{
		//Check that the given char has an associated image.
		if(imageArray[c] != undefined) {
			
			//If it does, set the return image to the image referenced by the char.
			returnImg = imageArray[c];
		}
	}
	//If not, add the char to the sessionChars string.
	else
	{
		//Make sure the given char is not undefined.
		if(c != undefined) {
		
			sessionChars += c;
			
			//If the image array is finished building, 
			//only add images starting from the new char (at the end of the array).
			if(imageArrayReady) {
				arrayCounter = sessionChars.length;
				imageArrayReady = false;
				fetchImages();
			}					
		}	
	}		
	return returnImg;
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