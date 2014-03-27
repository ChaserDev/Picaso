/*
		text.js						 
*/

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

var TEXT_JS_HTTP = "http://";
var TEXT_JS_API = ".wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&exchars=1000&callback=?&titles=";
var JSON_INDEX_SUBSTRING = 'extract":"';
var JSON_START_SUBSTRING = 10;
var JSON_END_SUBSTRING = 6;

//TextFeed is used to store the string recieved from the <insertname> API
var textFeed = "";
window.onload = textInit;

/*************************************************************
	test.js initialization.  Must be called by window.onload
*************************************************************/
function textInit() {
	fetchIpsum();	
}

/*	
	fetchWiki sets the textFeed to a block of text from the wikipedia API
	
	Parameters:

	-suffix: defines the title that you would like to search for.
	-prefix: the language of the wiki page to be returned.  the nine wiki languages
	         with the most articles are defined at the top of this file.
	
	TODO: 
		
	-error checking for when the page doesn't exist.
	-might have to convert words from english into the search language before searching.
*/
function fetchWiki(suffix, prefix) {
	
	textFeed = "";
	var url = TEXT_JS_HTTP + prefix + TEXT_JS_API + suffix;
	
	$.getJSON(url, function(result) {
	
		var string = JSON.stringify(result.query.pages);
		console.log(string);
		var index = string.indexOf(JSON_INDEX_SUBSTRING);
		textFeed = string.substring(index + JSON_START_SUBSTRING, string.length - JSON_END_SUBSTRING);
		console.log(textFeed);
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
		console.log(textFeed);
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


