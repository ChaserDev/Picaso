var canvas;
var context;
var timer;
var textTimer;

var charPointer = 0;
// Initial charset
var feed = "";
var hashtag = "";
var font_size = 100;
//var columns = c.width / font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];

window.onload = function() {
    colorInit();
    textInit();
    init();
};

$(document).ready(function() {
    $("canvas").click(function() {
        $("#menu").slideToggle(500);
    });
});

function init() {
    var button = document.getElementById('gGo');
    button.onclick = go;

    // Make canvas
    canvas = document.getElementById('c');
    context = canvas.getContext("2d");

    // Making the canvas full screen
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // Set column size;
    columns = c.width / font_size; //number of columns for the rain

    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for (var x = 0; x < columns; x++)
        drops[x] = 0;

    context.shadowBlur = 5;
    context.shadowColor = '#252525';
    context.shadowOffsetX = 1; // offset along X axis
    context.shadowOffsetY = -1;  // offset along Y axis

    timer = setInterval(draw, 150);
    textTimer = setInterval(checkTextFeed, 100);
}

function go() {
    var search = document.getElementById('wSearch');
    var hashtag = document.getElementById('iHashtag');
    var language = document.getElementById('sLanguage');

    newImageSearch(hashtag.value);
    fetchWiki(search.value, language.value);

    charPointer = 0;

    for (var x = 0; x < columns; x++)
        drops[x] = 0;

    textTimer = setInterval(checkTextFeed, 100);
}

//drawing the characters
function draw() {
    //looping over squares
    for (var i = 0; i < drops.length; i++)
    {
        if (charPointer >= feed.length)
            charPointer = 0;

        // Random character to print
        //var char = feed[Math.floor(Math.random() * feed.length)];
        var char = feed[charPointer];
        context.fillStyle = getColor(char);//getRandomColor();//"#0F0"; //green text
        // Draw to the canvas
        //context.fillText(char, i * font_size, drops[i] * font_size);
        context.fillRect(i * font_size, drops[i] * font_size, font_size, font_size);
        context.fillRect(drops[i] * font_size, i * font_size, font_size, font_size);
        //context.fillRect(drops[i] * font_size, i * font_size,  font_size, font_size);
        // Send the drop back to the top randomly after it has crossed the screen
        // adding randomness to the reset to make the drops scattered on the Y axis
        //if (drops[i] * font_size > canvas.height && Math.random() > 0.975)
        if (drops[i] * font_size > canvas.height && Math.random() > 0.975)
            drops[i] = -1;

        //incrementing Y coordinate
        drops[i]++;
        // Increment char pointer
        charPointer++;
    }
}

function checkTextFeed() {
    if (textFeed !== "") {
        textFeed.split("");
        feed = textFeed;
        clearInterval(textTimer);
    }
}