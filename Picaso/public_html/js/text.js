/********************************
	text.js
********************************/


//TextFeed is used to store the string recieved from the <insertname> API
var textFeed = "";

/*************************************************************
	color.js initialization.  Must be called by window.onload
*************************************************************/
function textInit() {

	fetchNewString();
}
/*
	queries the <insertname> API for some text
*/
function fetchNewString() {

//console.log(string);
textFeed = "";


$.getJSON( "http://baconipsum.com/api/?type=meat-and-filler", 

	function(result) {
	
		$.each(result, function(key, val) {
			textFeed += (val);
		});
		console.log("original: " + textFeed);
		stripNonLetters()
	});		
}


/*
	Strips the punctuation, numbers, and spaces from textFeed 
*/
function stripNonLetters() {
	
	//string that holds only the characters from the stubstring
	var outputString = '';

	for (var i = 0; i < textFeed.length; i++)
	{
		var upperCaseChar = textFeed.charAt(i).toUpperCase();
		var lowerCaseChar = textFeed.charAt(i).toLowerCase();
		
		//compare the two chars, if they are different it is a character
		if(upperCaseChar != lowerCaseChar)	
		{
                                
			outputString += textFeed.charAt(i);
            //console.log(string);
		}	
	}	
	textFeed = outputString;
	console.log("stripped: " + textFeed);
}
/*

http://www.developerdrive.com/2012/03/a-simple-way-to-add-free-news-content-to-your-website/


http://stackoverflow.com/questions/10943544/how-to-parse-a-rss-feed-using-javascript


http://stackoverflow.com/questions/226663/parse-rss-with-jquery






*/


