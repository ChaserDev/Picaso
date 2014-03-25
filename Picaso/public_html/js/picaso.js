// ADAM OWNER


// Accessing from color.js
//setColorArray(colorObjectArray, searchTerm); // will slowly fill over time
var TILE_WIDTH = 16;
var TILE_HEIGHT = 16;
//
var timer;
var colorTimer;
var stringTimer;
//
var colorPool = [];
var colorCharMap = [];
//
///var textFeed = "hello";

var charPointer = 0;

window.onload = function() {
    init();

    // Functions from Tim
    //setColorArray(colorArray, searchTag);
    appendToStringArray("textFeed", "dunedin");

    // For testing purposes
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (i = 0; i < alphabet.length; i++) {
        colorCharMap[alphabet[i]] = getRandomColor();
    }
    colorCharMap[' '] = "#000000";
    colorCharMap['.'] = "#000000";
    colorCharMap[','] = "#000000";
};

function init() {

    Canvas.init();

    // Runs the draw function every 50 ms 
    timer = setInterval(draw, 50);
    colorTimer = setInterval(addColor, 50);
    //stringTimer = setInterval(addChar, 500);
}

// Adds a color to the colorpool
function addColor() {
    // When I am at the end of the str array I will sort all the colors in the color array
    if (charPointer < textFeed.length) {
        console.log(textFeed);
        var char = textFeed[charPointer]; // points to a position in the string array
        colorPool.push(colorCharMap[char]);

        charPointer++;
    }
    else {
        colorPool.sort();
    }
}

function addChar() {

//    var e = document.getElementById('game');
//    var c = e.firstElementChild;
//
//    // Original content size
//    var canvasWidth = c.width / TILE_WIDTH;
//    var canvasHeight = c.height / TILE_HEIGHT;

    var str = String.fromCharCode(Math.round(Math.random() * 65) + 100);
    textFeed += str;
//    if (textFeed.length < (canvasWidth * canvasHeight)) {
//
//    }
//    else {
//        //charPointer = 0;
//        //textFeed = "";
//        //colorPool = [];
//    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

// Center scaled canvas on screen using CSS3
function draw() {
    Canvas.redraw(colorPool);
}