var canvas;
var context;
var timer;
var textTimer;

var charPointer = 0;
// Initial charset
var feed = "Otago Polytech";
var font_size = 22;
//var columns = c.width / font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];

window.onload = function() {s
    init();
    timer = setInterval(draw, 33);
    textTimer = setInterval(checkTextFeed, 100);
};

function init() {
    // Make canvas
    canvas = document.getElementById('c');
    context = canvas.getContext("2d");

    // Making the canvas full screen
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // Converting the string into an array of single characters
    feed = feed.split("");
    // Initialize the textFeed from text.js
    fetchNewString();

    // Set column size;
    columns = c.width / font_size; //number of columns for the rain

    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for (var x = 0; x < columns; x++)
        drops[x] = 1;
    
    rotation();
}

//drawing the characters
function draw() {
    // Clears the rectangle on each draw
    //context.clearRect(0, 0, canvas.width, canvas.height);
    //Black BG for the canvas
    //translucent BG to show trail
    //ctx.fillStyle = "rgba(14, 70, 154, 0.25)"; // Blue background
    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = font_size + "px arial";
    //looping over drops
    for (var i = 0; i < drops.length; i++)
    {
        if(charPointer >= feed.length)
            charPointer = 0;
    
        context.fillStyle = getRandomColor();//"#0F0"; //green text
        // Random character to print
        //var char = feed[Math.floor(Math.random() * feed.length)];
        var char = feed[charPointer];
        // Draw to the canvas
        context.fillText(char, i * font_size, drops[i] * font_size);
        // Send the drop back to the top randomly after it has crossed the screen
        // adding randomness to the reset to make the drops scattered on the Y axis
        //if (drops[i] * font_size > canvas.height && Math.random() > 0.975)
        if (drops[i] * font_size > canvas.height && Math.random() > 0.975)
            drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
        // Increment char pointer
        charPointer++;
    }
}

function checkTextFeed() {
    //console.log(textFeed);

    if (textFeed === "") {
        
    }
    else {
        textFeed.split("");
        feed = textFeed;
        clearInterval(textTimer);
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    
    return color;
}

function rotation() {
    $("#image").rotate({
        angle: 0,
        animateTo: 360,
        callback: rotation,
        easing: function(x, t, b, c, d) {
            return c * (t / d) + b;
        }
    });
}