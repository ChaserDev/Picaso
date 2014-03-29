/*
		text.js						 
*/

//domain name prefixes for the languages with the most wiki articles.
var ENGLISH = "en";
var FRENCH = "fr";
var GERMAN = "de";
var SPANISH = "es";
var RUSSIAN = "ru";
var ITALIAN = "it";
var SWEDISH = "sv";
var DUTCH = "nl";
var POLISH = "pl";

var MIN_EXTRACT_LENGTH = 500;
var TEXT_JS_HTTP = "http://";
var TEXT_JS_API = ".wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&exchars=1000&callback=?&titles=";
var WIKI_RANDOM = ".wikipedia.org/w/api.php?format=json&action=query&list=random&rnlimit=1&callback=?";
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
	getRandomPage("en");
}

/*	
	fetchWiki sets the textFeed to a block of text from the wikipedia API
	
	Parameters:

	-suffix: defines the title that you would like to search for.
	-prefix: the language of the wiki page to be returned.  the nine wiki languages
	         with the most articles are defined at the top of this file.	
*/
function fetchWiki(title, language) {
	
	//console.log("searching wiki");
	textFeed = "";
	prefix = prepareTitle(title);
	var url = TEXT_JS_HTTP + language + TEXT_JS_API + title;
	//console.log("wiki url: " + url);
	$.getJSON(url, function(result) {
		//console.log("search wiki complete");
		var string = JSON.stringify(result.query.pages);
		//console.log(string);
		var index = string.indexOf(JSON_INDEX_SUBSTRING);
		string = string.substring(index + JSON_START_SUBSTRING, string.length - JSON_END_SUBSTRING);
		//console.log(string);
		//check that it returned an extract of text
		if(string.length >= MIN_EXTRACT_LENGTH)
		{
			textFeed = string;
		}
		else
		{
			//get a random wiki page
			getRandomPage(language);
		}
		
		//console.log(textFeed);
	}).fail(function(xhr, status, error){		
			//console.log("fail wiki");
		});
}

function getRandomPage(language) {
	
	var url = TEXT_JS_HTTP + language + WIKI_RANDOM;
	//console.log("getting random page for: " + language);
	$.getJSON(url, function(result) {
		
		//console.log("got random page");
		var title = result.query.random[0].title;//JSON.stringify(result.query.random.title);
		fetchWiki(title, language);	
		
	})
	.fail(function(xhr, status, error){		
			getRandomPage(language);
		});
}

function prepareTitle(title){

	title = encodeURIComponent(title);
	//console.log(title);
	return title;
}

/*
	queries the baconipsum API for some text
*/
function fetchIpsum() {

	textFeed = "";

	$.getJSON( "http://baconipsum.com/api/?type=meat-and-filler", function(result) {
		
		$.each(result, function(key, val) {
			textFeed += (val);
		});
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
            ////console.log(string);
		}	
	}	
	textFeed = outputString;
	//console.log("stripped: " + textFeed);
}
