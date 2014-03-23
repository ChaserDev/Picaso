var btn;
var btn2;
var displayArea;
var imgArray;

window.onload = function () {

	imageArray = new Array();
	btn = document.getElementById("btn");
	btn.onclick = FetchImages;
	
	btn2 = document.getElementById("btn2");
	btn2.onclick = FetchColor;
	
	displayArea = document.getElementById("displayArea");
};

//retrieves latest images from 500px
function FetchImages(){
	
	var fiveHundred = "https://api.500px.com/v1/photos?feature=fresh_week&sort=created_at&image_size=3&include_store=store_download&include_states=voted&sdk_key=7131207245727241ad25174950e82fc41cb572f3";
	
	var request = $.ajax({
		type:"GET",
		url: fiveHundred,
	})
	.done(function(result){
		for(var i = 0; i <result.photos.length; i++) {		
			
			var chr = String.fromCharCode(97 + i);			
			var imgPath = result.photos[i].image_url;
			imageArray[chr] = imgPath;
			
						
		}
		imageArray["u"] = imageArray['b'];
		imageArray["v"] = imageArray['a'];
		imageArray["w"] = imageArray['c'];
		imageArray["x"] = imageArray['d'];
		imageArray["y"] = imageArray['f'];
		imageArray["z"] = imageArray['e'];	
		
		ConvertString();
	});	
}

//converts a string to all lowercase and strips spaces and punctuation
function ConvertString() {

//stub string
var stubString = "Beast suckling pig your grace, king moon-flower juice, green dreams rouse me not none so fierce dolore magna aliqua. Milk of the poppy veniam, quis nostrud exercitation ullamco laboris nisi though all men do despise us. Duis aute our sun shines bright in no song so sweet ser none so dutiful trueborn. Mare's milk let it be written, a taste of glory officia deserunt mollit anim the wall bannerman.";

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
}

//draws a mosaic with the set images and string
function CreateMosaic(string) {

	var count = 0;
	for(var i = 0; i < 2500; i++){
		
		var j = i % string.length + 1;
		//append the image found to body
			$('#displayArea').append (
				$('<img>', { 
					width: 16, 
					height: 16, 
					src: imageArray[string.charAt(j)], 
					alt: ''
				})
			);	
		count++;
	}	
}

//wip trying to get dominant color with images off the internet
function FetchColor(){
	
	var fiveHundred = "https://api.500px.com/v1/photos?feature=fresh_week&sort=created_at&image_size=3&include_store=store_download&include_states=voted&sdk_key=7131207245727241ad25174950e82fc41cb572f3";
	
	var request = $.ajax({
		type:"GET",
		url: fiveHundred		
	})
	.done(function(result){
			var imgPath = result.photos[0].image_url;
			displayArea.innerHTML = "<a href='" + imgPath + "' download='nImg.lpg'>download image</a>";
			/*var myImage = new Image();			
			myImage.src = imgPath;
			var colorThief = new ColorThief();
			var colors = colorThief.getColor(myImage);
			alert(colors);*/
		}
	);
}

//proof that colorthief works with local images
function TestFunction() {
	var testImage = "stuff.jpg";
	var myImage = new Image();			
	myImage.src = testImage;
	myImage.crossOrigin = "Anonymous";
	var colorThief = new ColorThief();
	var colors = colorThief.getColor(myImage);
	alert(colors);
}

/*fill this out

var instagram = "https://api.instagram.com/v1/media/popular?access_token=394122960.467ede5.47e0b04a82b94005b1933fa0368dd737";
var fiveHundred = "https://api.500px.com/v1/photos?feature=fresh_week&sort=created_at&image_size=3&include_store=store_download&include_states=voted&sdk_key=7131207245727241ad25174950e82fc41cb572f3";

*/

