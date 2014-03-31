/*************************
		text.js						 
*************************/

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

//Minimum length of wikipedia text that will be used to display colors.
var MIN_EXTRACT_LENGTH = 500;

//Constants used to build a Wikipedia API call.
var TEXT_JS_HTTP = "http://";
var TEXT_JS_API = ".wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&exchars=1000&callback=?&titles=";

//API call to get a random wikipedia page.
var WIKI_RANDOM = ".wikipedia.org/w/api.php?format=json&action=query&list=random&rnlimit=1&callback=?";
var JSON_INDEX_SUBSTRING = 'extract":"';
var JSON_START_SUBSTRING = 10;
var JSON_END_SUBSTRING = 6;

//API call to get the default textfeed text.
var ONLOAD_TEXT_API = "http://baconipsum.com/api/?type=meat-and-filler";

//TextFeed is used to store the string received from the text API
var textFeed = "";

window.onload = textInit;

/************************************************************
	test.js initialization.  Must be called by window.onload.
************************************************************/
function textInit() {

	fetchIpsum();	
	getRandomPage("en");
}

/*************************************************************************	
	fetchWiki sets the textFeed to a block of text from the Wikipedia API.	
*************************************************************************/
function fetchWiki(title, language) {
	
	//Reset the text feed.
	textFeed = "";
	
	//Encode the title so that it can be read by the API 
	title = prepareTitle(title);
	
	//Build the URL.
	var url = TEXT_JS_HTTP + language + TEXT_JS_API + title;
	
	/*************************************
		AJAX request to the Wikipedia API.
	*************************************/
	$.getJSON(url, function(result) {
		
		//Put the JSON response in a string.
		var string = JSON.stringify(result.query.pages);
		
		//Get the start index of the extract text.
		var index = string.indexOf(JSON_INDEX_SUBSTRING);
		
		//Get the extract text.
		string = string.substring(index + JSON_START_SUBSTRING, string.length - JSON_END_SUBSTRING);
		
		//check that it returned a text extract of at least the minimum specified length.
		if(string.length >= MIN_EXTRACT_LENGTH)
		{
			textFeed = string;
		}
		else
		{
			//If it didn't, get a random Wikipedia page.
			getRandomPage(language);
		}
		
	}).fail(function(xhr, status, error){		
			
			//Get a random Wikipedia page if it fails to get a page.
			getRandomPage(language);
		});
}

/*************************************************************
	getRandomPage gets a reference to a random Wikipedia page.
*************************************************************/
function getRandomPage(language) {
	
	//Build the url used to make the API call for a random Wikipedia page.
	var url = TEXT_JS_HTTP + language + WIKI_RANDOM;
	
	/*************************************
		AJAX request to the Wikipedia API.
	*************************************/
	$.getJSON(url, function(result) {
		
		//Get the random page title returned by the API.
		var title = result.query.random[0].title;
		
		//Fetch the random page returned by the API.
		fetchWiki(title, language);	
		
	})
	.fail(function(xhr, status, error){		
			//If the request fails, send another request.
			getRandomPage(language);
		});
}

/************************************************************************
	Prepares the title (Wikipedia search) to make the Wikipedia API call.
************************************************************************/
function prepareTitle(title){

	title = encodeURIComponent(title);
	return title;
}

/*********************************************************************************
	Queries the Baconipsum API for some text.  This function retrieves the default 
	 text on window load.
*********************************************************************************/
function fetchIpsum() {

	//Reset the text feed.
	textFeed = "";

	/**************************************
		AJAX request to the Baconipsum API.
	**************************************/
	$.getJSON( ONLOAD_TEXT_API, function(result) {
		
		//Iterate through each returned paragraph.
		$.each(result, function(key, val) {
			//add to textFeed.
			textFeed += (val);
		});
	});		
}