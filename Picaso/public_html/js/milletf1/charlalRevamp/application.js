var Instagram = {};
var testImages = [];
var myColors;
var drawBtn;

window.onload = function() {
	drawBtn = document.getElementById('drawColors');
	drawBtn.onclick = draw;
	Instagram.search = search;
	Instagram.search('abstract');
}

//*********************************
//Draws the color palette to screen
//*********************************
function draw() {
	
	if(paletteReady)
	{
		// Get DOM elements
		var element = document.getElementById('game');
		var canvas = element.firstElementChild;

		// Original content size
		var content = [canvas.width, canvas.height];

		// Setting up the canvas
		var context = canvas.getContext('2d');
		
		var xPos = 0;
		var yPos = 0;
		var size = 32;
		
		for(var i = 0; i < 26; i++)
		{
			var curChar = String.fromCharCode(97 + i);
			
			console.log(colorArray[curChar]);
			console.log(curChar);
			context.fillStyle = colorArray[curChar];
			context.fillRect(xPos, yPos, size, size);
			xPos += size;
		}
	}
	else
	{
		alert("please wait for palette to render");
	}
}

//**********************************
//Search for images containing a tag
//**********************************
function search(tag) {
    var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=4e32d268a27b498e8c9e7840c7863f11"
	$.getJSON(url, toScreen);
}//************************************************


//******************************************************************
//takes the result from the $.getJSON request in the search function
//******************************************************************
function toScreen(photos) {
	//console.log(data);
    var sources = [];
		
	//cycle through the results of the search
    $.each(photos.data, function(index, photo) {
           
		sources.push(photo.images.low_resolution.url);
		console.log(photo.images.low_resolution.url);

	});
    //alert(sources.length);
	
	//setColorArray is in getStuff.js
	myColors = setColorArray(sources);
   

    //alert(testImages.length);

        
    //ctx.fillStyle = '#6f8ed9';
    //ctx.fillRect(0, 0, content[0], content[1]);
   /* loadImages(sources, function(images) {

		for (i = 0; i < 10; i++) {
            context.drawImage(images[i], 100, i * 30, 200, 137);
        }            
    });*/
}//******************************************************************

function loadImages(sources, callback) {
    
	var images = {};
    var loadedImages = 0;
    var numImages = 0;
    
	// get num of sources
    for (var src in sources) {
        numImages++;
    }
            
	for (var src in sources) {
        
		images[src] = new Image();
        images[src].onload = function() {
        
			if (++loadedImages >= numImages) {
				callback(images);
			}	
        };
		
		images[src].src = sources[src];
	}
}
	
    
