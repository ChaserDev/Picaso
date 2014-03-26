var timer;
var c;
var ctx;

var background;

//chinese characters - taken from the unicode charset
var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
//converting the string into an array of single characters
//chinese = chinese.split("");

var font_size = 10;
//var columns = c.width / font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
//for (var x = 0; x < columns; x++)
//    drops[x] = 1;

//drawing the characters
function draw()
{
    //Black BG for the canvas
    //translucent BG to show trail
    //ctx.globalAlpha = 0.5;// opacity at 0.5

    ctx.fillStyle = "rgba(14, 70, 154, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);



    //ctx.font = font_size + "px arial";
    //looping over drops
    for (var i = 0; i < drops.length; i++)
    {
        ctx.fillStyle = getRandomColor();//"#0F0"; //green text
        //a random chinese character to print
        //var text = chinese[Math.floor(Math.random() * chinese.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        //ctx.fillText(text, i * font_size, drops[i] * font_size);
        ctx.fillRect(i * font_size, drops[i] * font_size, font_size, font_size)

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
    }

    ctx.save();
    ctx.rotate(30);
    ctx.drawImage(background, 200, 200);
    ctx.restore();
    
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

function init() {
    c = document.getElementById('c');
    ctx = c.getContext("2d");

    background = new Image();
    background.src = "logo.png";
    //making the canvas full screen
    c.height = window.innerHeight;
    c.width = window.innerWidth;

    //converting the string into an array of single characters
    chinese = chinese.split("");

    //var font_size = 10;
    columns = c.width / font_size; //number of columns for the rain
//an array of drops - one per column
//    var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
    for (var x = 0; x < columns; x++)
        drops[x] = 1;
}

window.onload = function() {
    init();
    timer = setInterval(draw, 33);
};