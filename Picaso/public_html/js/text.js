/******************************** http://en.wikipedia.org/w/api.php?action=query&titles=Foo&prop=extracts
	text.js						  https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=Albert%20Einstein&format=jsonfm	
********************************/

//domain name prefix for the languages with the most wiki articles.
var ENGLISH = "en";
var FRENCH = "fr";
var GERMAN = "de";
var SPANISH = "es";
var RUSSIAN = "ru";
var ITALIAN = "it";
var SWEDISH = "sv";
var DUTCH = "nl";
var POLISH = "pl";

//the protocol used to call the api
var TEXT_JS_HTTP = "http://";

var TEXT_JS_API = ".wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&exchars=1000&callback=?&titles=";

//TextFeed is used to store the string recieved from the <insertname> API
var textFeed = "";
window.onload = textInit;
/*************************************************************
	test.js initialization.  Must be called by window.onload
*************************************************************/
function textInit() {

	//fetchIpsum();
	fetchWiki("love", ENGLISH);
}

function fetchWiki(suffix, prefix) {

	var url = "http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&exchars=1000&callback=?&titles=love";
	
	$.getJSON(url, function(result) {
	
		console.log(JSON.stringify(result));
		
		var string = JSON.stringify(result.query.pages);
		var index = string.indexOf('extract":"');
		$("#displayArea").text(string.substring(index + 10, string.length - 6));
	});
}

/*
	queries the baconipsum API for some text
*/
function fetchIpsum() {

textFeed = "";


$.getJSON( "http://baconipsum.com/api/?type=meat-and-filler", 

	function(result) {
	
		$.each(result, function(key, val) {
			textFeed += (val);
		});
		console.log("original: " + textFeed);
	//	stripNonLetters();
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


