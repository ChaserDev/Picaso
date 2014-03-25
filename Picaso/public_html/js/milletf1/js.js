var timer;

var text;
var length;

window.onload = function () {

length = 9001;
text = new TextManager(9001);
	
timer = setInterval(getUpdate, 4000);
text.fetch("#tag goes here");
};

function getUpdate() {
	
	if(text.stringReady)
	{
		console.log("string ready to use");
	}
	else {
		console.log("waiting...");
	}
}




