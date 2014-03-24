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
}
