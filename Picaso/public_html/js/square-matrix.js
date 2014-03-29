/*
 * Picaso
 * @type @exp;document@call;getElementById
 */

// Constants
var MENU_TOGGLE_SPEED = 500;
var DRAW_RENDER_SPEED = 150;
var TEXT_CHECK_INTERVAL = 100;
var SQUARE_SHADOW_BLUR = 5;
var SQUARE_SHADOW_COLOR = "#252525";
var SQUARE_SHADOW_OFFSET_X = 1;
var SQUARE_SHADOW_OFFSET_Y = -1;
var RANDOM_PROBABILITY = 0.975;
var SQUARE_SIZE = 100;

// Canvas
var canvas;
var context;
// Timers
var timer;
var textTimer;
// Variables
var charPointer;
var feed = "";
var squares = [];

/*************************************************************
	When the window loads
*************************************************************/
window.onload = function() {
    colorInit();
    textInit();
    init();
};

/*************************************************************
	Toggle for menu effect
*************************************************************/
$(document).ready(function() {
    $("canvas").click(function() {
        $("#menu").slideToggle(MENU_TOGGLE_SPEED);
    });
});

/*************************************************************
	Initialization
*************************************************************/
function init() {
    var button = document.getElementById('gGo');
    button.onclick = go;

    canvasInit();    
    squaresReset();    

    timer = setInterval(draw, DRAW_RENDER_SPEED);
    textTimer = setInterval(textFeedCheck, TEXT_CHECK_INTERVAL);
}

/*************************************************************
	When the go button is clicked starts all the feeds
*************************************************************/
function go() {
    var search = document.getElementById('wSearch');
    var hashtag = document.getElementById('iHashtag');
    var language = document.getElementById('sLanguage');

    newImageSearch(hashtag.value);
    fetchWiki(search.value, language.value);
    squaresReset();

    textTimer = setInterval(textFeedCheck, TEXT_CHECK_INTERVAL);
}

/*************************************************************
	Setup the canvas for the drawing
*************************************************************/
function canvasInit() {
    // Make canvas
    canvas = document.getElementById('c');
    context = canvas.getContext("2d");

    // Making the canvas full screen
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // Set column size;
    columns = c.width / SQUARE_SIZE; //number of columns
    
    // Square styling
    context.shadowBlur = SQUARE_SHADOW_BLUR;
    context.shadowColor = SQUARE_SHADOW_COLOR;
    context.shadowOffsetX = SQUARE_SHADOW_OFFSET_X; // offset along X axis
    context.shadowOffsetY = SQUARE_SHADOW_OFFSET_Y;  // offset along Y axis
}

/*************************************************************
	Draws the sqaures to the canvas
*************************************************************/
function draw() {
    //looping over squares
    for (var i = 0; i < squares.length; i++)
    {
        // Resets the pointer to the start of the string
        if (charPointer >= feed.length)
            charPointer = 0;

        // Sets the color
        context.fillStyle = getColor(feed[charPointer]);
        
        // Vertical
        context.fillRect(i * SQUARE_SIZE, squares[i] * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
        // Horizontal
        context.fillRect(squares[i] * SQUARE_SIZE, i * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
        
        // Send the square back to the top randomly after it has crossed the screen
        // adding randomness to the reset to make the drops scattered on the Y axis
        if (squares[i] * SQUARE_SIZE > canvas.height && Math.random() > RANDOM_PROBABILITY)
            squares[i] = -1;

        // Increment Y|X coordinate
        squares[i]++;
        // Increment char pointer
        charPointer++;
    }
}

/*************************************************************
	Error checking if something is in the textFeed
*************************************************************/
function textFeedCheck() {
    if (textFeed !== "") {
        textFeed.split("");
        // Add  to drawing text feed
        feed = textFeed;
        // Stop the timer
        clearInterval(textTimer);
    }
}

/*************************************************************
	Resets to initial value at the top of the screen
*************************************************************/
function squaresReset() {
    charPointer = 0;
    //x below is the x coordinate
    //1 = y co-ordinate of the square(same for every square initially)
    for (var x = 0; x < columns; x++)
        squares[x] = 0;
}