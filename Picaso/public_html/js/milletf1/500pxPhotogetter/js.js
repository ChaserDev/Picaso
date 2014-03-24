var R = 0;
var B = 1;
var G = 2;

var displayArea;
var statusOut;
var colorArray;
var imageArray;
var myTimer;

window.onload = function () {

	imageArray = new Array();
	colorArray = new Array();
	
	statusOut = document.getElementById("statusOut");
	statusOut.innerHTML = "loading palette...";
	displayArea = document.getElementById("displayArea");
	
	FetchImages();
};

//retrieves latest images from 500px
function FetchImages(){
	
	var fiveHundred = "https://api.500px.com/v1/photos?feature=fresh_day&sdk_key=7131207245727241ad25174950e82fc41cb572f3";
	
	$.ajax({
		type:"GET",
		url: fiveHundred,
	})
	.done(function(result){
		for(var i = 0; i <result.photos.length; i++) {		
			imageArray.push(result.photos[i].image_url);	
		}
		
		
		//console.log(imageArray.length);PASS
		ConvertToColor(0);
	});	
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
						statusOut.innerHTML = "Palette loaded<br>image updates every 10 seconds<br>Enjoy!";
						myTimer = setInterval(ConvertString, 10000);
						ConvertString();
					}
					else{
						ConvertToColor(iteration);
					}
				},
					error: function(xhr, text_status) {
					console.log(text_status);
				}	
			});
}


//converts a string to all lowercase and strips spaces and punctuation
function ConvertString() {

//stub string/*
var stubString = "";


$.getJSON( "http://baconipsum.com/api/?type=meat-and-filler", function(result){
	
		$.each(result, function(key, val) {
			stubString += (val);
		});
		
		//convert to lowercase
		stubString = stubString.toLowerCase();

		//string that holds only the characters from the stubstring
		var outputString = '';

		for (var i = 0; i < stubString.length; i++)
		{
			var upperCaseChar = stubString.charAt(i).toUpperCase();
			var lowerCaseChar = stubString.charAt(i);
		
			//compare the two chars, if they are different it is a character
			if(upperCaseChar != lowerCaseChar)	
			{
				outputString += lowerCaseChar;
			}	
		}	
		
		CreateMosaic(outputString);
	});	
}



//draws a mosaic with the set images and string
function CreateMosaic(string) {

	//remove tile elements
	$('.tile').remove();
	
	for(var i = 0; i < 10000; i++){
		
		var j = i % string.length;
		
		var newDiv = document.createElement("div");
		newDiv.className = "tile";
		newDiv.style.backgroundColor = colorArray[string.charAt(j)];		
		//append the image found to body
		$('#displayArea').append (
			$(newDiv)
		);	
	}		
}


