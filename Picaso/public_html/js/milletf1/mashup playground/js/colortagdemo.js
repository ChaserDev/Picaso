var btn;
var input;
var output;
var display;
var con;

window.onload = function() {

	console.log("hihi");
	
	btn = document.getElementById("btnSubmit");
	btn.onclick =  fetchColor;
	
	input = document.getElementById("urlInput");
	output = document.getElementById("colorOutput");
	
}

function fetchColor() {
	
	//duplicateImage
	
	var newImage = new Image();	
	
	//this should enable Cross-origin resource sharing. breaks code 
	//newImage.crossOrigin = "anonymous";
	
	newImage.onload = function() {
	
		var myCanvas = document.createElement('canvas');
		var context = myCanvas.getContext('2d');
		document.body.appendChild(myCanvas);
		
		myCanvas.width = 320;
		myCanvas.height = 320;
		
		context.drawImage(newImage, 0, 0, newImage.width, newImage.height, 0, 0, 320, 320);
	
		//throws SecurityError: The operation is insecure. breaks code
		var data = myCanvas.toDataURL("image/png");
		
		// put in local storage 
		localStorage.setItem("lsData", data);
		
		
	}
	
	
	newImage.src="http://webthree.ict.op.ac.nz/MILLETF1/public_html/mashup%20playground/img/zebras.png";	
	
		
	//colorThief stuff. only works on local domain images
	
	/*
	var newImage = new Image();
	newImage.src = "img/zebras.png"
	var colorThief = new ColorThief();	
	
	//store the images dominant color as an rgb value.
	var newImageRGBValues = colorThief.getColor(newImage);	
	*/
}


//below is random stuff I've found while doing internet research.
//mostly relates to using apis 
 
 /*
 
 
	
	/*var r = Math.floor( Math.random() * 256 );
	var b = Math.floor( Math.random() * 256 );
	var g = Math.floor( Math.random() * 256 );
	
	//alert(stuff);
	
	output.style.backgroundColor = "rgb(" + r+","+b+","+g+")";
	
	
 var imagePath = input.value;
	var urlToRequest = "http://www.colr.org/json/colors/random/1";	
	var request = XMLHttpRequest();
		
	request.onreadystatechange = function()
	{
		console.log("readystate: " + request.readyState);
		console.log("status: " + request.status);
		
		if(request.readyState == 4)
		{
			if(request.status == 200)
			{
				//do something with data
				//console.log(JSON.stringify(request.resonseText));
				alert("hit");
			}
			else
			{
				console.log(request.statusText);
				alert("miss");
			}
		}		
	}
	
	request.open('GET', urlToRequest, true);	
	request.send();
	
	
	///////////////////////////////////////////////////////////
	//save image to localstorage (might be hdd->localstorage)//
	///////////////////////////////////////////////////////////
	
	(function () {
    // localStorage with image
    var storageFiles = JSON.parse(localStorage.getItem("storageFiles")) || {},
        elephant = document.getElementById("elephant"),
        storageFilesDate = storageFiles.date,
        date = new Date(),
        todaysDate = (date.getMonth() + 1).toString() + date.getDate().toString();

    // Compare date and create localStorage if it's not existing/too old   
    if (typeof storageFilesDate === "undefined" || storageFilesDate < todaysDate) {
        // Take action when the image has loaded
        elephant.addEventListener("load", function () {
            var imgCanvas = document.createElement("canvas"),
                imgContext = imgCanvas.getContext("2d");

            // Make sure canvas is as big as the picture
            imgCanvas.width = elephant.width;
            imgCanvas.height = elephant.height;

            // Draw image into canvas element
            imgContext.drawImage(elephant, 0, 0, elephant.width, elephant.height);

            // Save image as a data URL
            storageFiles.elephant = imgCanvas.toDataURL("image/png");

            // Set date for localStorage
            storageFiles.date = todaysDate;

            // Save as JSON in localStorage
            try {
                localStorage.setItem("storageFiles", JSON.stringify(storageFiles));
            }
            catch (e) {
                    console.log("Storage failed: " + e);                
            }
        }, false);

        // Set initial image src    
        elephant.setAttribute("src", "elephant.png");
    }
    else {
        // Use image from localStorage
        elephant.setAttribute("src", storageFiles.elephant);
    }

    // Getting a file through XMLHttpRequest as an arraybuffer and creating a Blob
    var rhinoStorage = localStorage.getItem("rhino"),
        rhino = document.getElementById("rhino");
    if (rhinoStorage) {
        // Reuse existing Data URL from localStorage
        rhino.setAttribute("src", rhinoStorage);
    }
    else {
        // Create XHR, BlobBuilder and FileReader objects
        var xhr = new XMLHttpRequest(),
            blob,
            fileReader = new FileReader();

        xhr.open("GET", "rhino.png", true);
        // Set the responseType to arraybuffer. "blob" is an option too, rendering BlobBuilder unnecessary, but the support for "blob" is not widespread enough yet
        xhr.responseType = "arraybuffer";

        xhr.addEventListener("load", function () {
            if (xhr.status === 200) {
                // Create a blob from the response
                blob = new Blob([xhr.response], {type: "image/png"});

                // onload needed since Google Chrome doesn't support addEventListener for FileReader
                fileReader.onload = function (evt) {
                    // Read out file contents as a Data URL
                    var result = evt.target.result;
                    // Set image src to Data URL
                    rhino.setAttribute("src", result);
                    // Store Data URL in localStorage
                    try {
                        localStorage.setItem("rhino", result);
                    }
                    catch (e) {
                        console.log("Storage failed: " + e);
                    }
                };
                // Load blob as Data URL
                fileReader.readAsDataURL(blob);
            }
        }, false);
        // Send XHR
        xhr.send();
    }
})();
	
	
	
	
	
	
	*/