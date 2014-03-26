
// TIM OWNER
var R = "0";	
var B = "1";
var G = "2";

var ALPHABET_LENGTH = 26;
var NUMBER_LENGTH = 10;
var LOWER_CASE_START = 97;
var UPPER_CASE_START = 65;
var NUMBER_START = 48;
var COLOR_ARRAY_LENGTH = 63;

var colorArray;
var rgbArray;

/*************************************************************
	color.js initialization.  Must be called by window.onload
*************************************************************/
function colorInit() {

	colorArray = [];
	
	colorArray["other"] = "#000000";
	
	rgbArray = [];
	rgbArray.length = 3;
	
	createStaticArray();
	createDynamicArray();
	
}

/***************************************
	creates the initial array of colors
***************************************/
function createStaticArray() {

	//add colors to lower case letters
	for(var i = LOWER_CASE_START; i < ALPHABET_LENGTH; i++) {
		
		addRandomColorToColorArray(String.fromCharCode(i);
	}	
	
	//add colors to upper case letters
	for(var i = UPPER_CASE_START; i < ALPHABET_LENGTH; i++) {
		
		addRandomColorToColorArray(String.fromCharCode(i);
	}
	
	//add colors to numbers
	for(var i = NUMBER_START; I < NUMBER_LENGTH; i++) {
		
		addRandomColorToColorArray(String.fromCharCode(i);
	}
}

/*****************************************************************
	adds a random color to the color array at the given parameter
*****************************************************************/
function addRandomColorToColorArray(charCode) {

	//generate a random hexadecimal color
	for(var value in rgbArray) {
		
		//get a random number
		value = Math.floor(Math.random()*256);
		
		//convert to hex
		value = value.toString(16);
		
		//append a 0 if the hex needs padding
		value = value.length == 1 ? "0" + value : value;
	}
	
	//create a color with the random hex values in rgbArray
	colorArray[charCode] = "#" + rgbArray[R] + rgbArray[B] + rgbArray[G];	
}

/*
	creates an array of colors which consist of 
	the dominant color of recent instagram images
*/
function createDynamicArray() {

}

function setColorArray(colorObjectArray, searchTerm) {
    
}

function getColor(c) {
	//if adamsChar is not in array
	//return dwfaultColor
	//else
	
	//return colorArray[adamsChar]
}
/*
// For testing purposes
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (i = 0; i < alphabet.length; i++) {
        colorCharMap[alphabet[i]] = getRandomColor();
    }
    colorCharMap[' '] = "#000000";
    colorCharMap['.'] = "#000000";
    colorCharMap[','] = "#000000";
	console.log("textFeed: " + textFeed);
	
	var R = 0;
	
	
var B = 1;
var G = 2;
var colorArray;
var imageArray;
var myTimer;

var paletteReady;

//array should be an array of image urls
function setColorArray(array) {
	paletteReady = false;
	colorArray = new Array();
	imageArray = array;
	console.log("getting colors...");
	ConvertToColor(0);
}


//My first recursive function!!!
function ConvertToColor(iteration)
{	
	var pos = iteration % imageArray.length;		
	var imageURL = imageArray[pos];	
	
		$.getImageData({
				url: imageURL,				
				success: function(image) {	
				
						
					//choose the character to index the next color based on the iteration
					var chr = String.fromCharCode(97 + iteration);		
					
					var colorThief = new ColorThief();					
					var colorRGB = colorThief.getColor(image);	
					var color = "rgb(" + colorRGB[R] + "," + colorRGB[B] + "," + colorRGB[G] + ")";	
					
					colorArray[chr] = color;	
					console.log("character: " +  chr + " image_url: " + imageArray[pos] + " color: " + colorArray[chr]);
					
					//increment iteration
					iteration++;
					//check if the iteration has reached its end
					if(iteration == 26){
						alert("color palette is ready, press draw to preview");	
						paletteReady = true;
					}
					else{
						ConvertToColor(iteration);
					}
				},
					error: function(xhr, text_status) {
					console.log("fail");
					console.log(xhr);
				}	
			});
}*/