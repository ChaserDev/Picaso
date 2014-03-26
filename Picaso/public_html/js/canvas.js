var Canvas = {
    redraw: function(colors) {
        // Setting up the canvas
        var ctx = this.ctx;// = this.canvas.getContext('2d');

        var colLength = this.content[0] / TILE_WIDTH;
        var rowLength = this.content[1] / TILE_HEIGHT;

        var count = 0;

        //ctx.drawImage(this.polytech, 0, 0, this.polytech.width, this.polytech.height);

//        for (row = 0; row < rowLength; row++) {
//            for (col = 0; col < colLength; col++) {
//
//                if (count < colors.length)
//                {
////                    ctx.shadowBlur = 15;//  shadow Blur
////
////                    ctx.shadowColor = "#252525"; // shadow color
//
//
//
//                    ctx.fillStyle = colors[count]; // Draw color
//                }
//                else
//                {
//                    ctx.fillStyle = "#000000"; // Black
//                }
//
//                ctx.fillRect(col * TILE_WIDTH, row * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);
//
//                count++;
//            }
//        }

        //Black BG for the canvas
        //translucent BG to show trail
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, c.width, c.height);

        ctx.fillStyle = "#0F0"; //green text
        //ctx.font = font_size + "px arial";
        //looping over drops
        for (var i = 0; i < drops.length; i++)
        {
            //a random chinese character to print
            var text = chinese[Math.floor(Math.random() * chinese.length)];
            //x = i*font_size, y = value of drops[i]*font_size
            ctx.fillRect(i * TILE_WIDTH, drops[i] * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);

            //sending the drop back to the top randomly after it has crossed the screen
            //adding a randomness to the reset to make the drops scattered on the Y axis
            if (drops[i] * font_size > c.height && Math.random() > 0.975)
                drops[i] = 0;

            //incrementing Y coordinate
            drops[i]++;
        }

        this.reflow();
    },
    init: function() {
        // Get DOM elements
        this.element = document.getElementById('game');
        this.canvas = this.element.firstElementChild;

        // Original content size
        this.content = [this.canvas.width, this.canvas.height];

        // Setting up the canvas
        var ctx = this.ctx = this.canvas.getContext('2d');
//        this.polytech = new Image();
//        this.polytech.src = "op.jpg";


        ctx.shadowBlur = 15;

        ctx.shadowColor = '#000';

        ctx.shadowOffsetX = 10; // offset along X axis

        ctx.shadowOffsetY = -10;  // offset along Y axis

        ctx.globalAlpha = 0.5;// opacity at 0.5
        ctx.fillStyle = '#6f8ed9';
        ctx.fillRect(0, 0, this.content[0], this.content[1]);

        this.columns = this.content[0] / TILE_WIDTH;
        this.drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
        for (var x = 0; x < this.columns; x++)
            this.drops[x] = 1;


        // Create image on click
        this.element.addEventListener('click', this, false);

        // Load image to draw on click
//        this.loader = new Image();
//        this.loader.addEventListener('load', this, false);
//        this.loader.src = 'http://mozorg.cdn.mozilla.net/media/img/styleguide/identity/marketplace/usage-logo-rocket.png';

        // Reflow canvas size/margin on resize
        window.addEventListener('resize', this, false);
        this.reflow();
    },
    reflow: function() {
        // 2d vectors to store various sizes
        var browser = [
            window.innerWidth, window.innerHeight];
        // Minimum scale to fit whole canvas
        var scale = this.scale = Math.min(
                browser[0] / this.content[0],
                browser[1] / this.content[1]);
        // Scaled content size
        var size = [
            this.content[0] * scale, this.content[1] * scale];
        // Offset from top/left
        var offset = this.offset = [
            (browser[0] - size[0]) / 2, (browser[1] - size[1]) / 2];

        // Apply CSS transform
        var rule = "translate(" + offset[0] + "px, " + offset[1] + "px) scale(" + scale + ")";
        this.element.style.transform = rule;
        this.element.style.webkitTransform = rule;
    },
    // Handle all events
    handleEvent: function(evt) {
        switch (evt.type) {
            case 'resize':
                // Window resized
                this.reflow();
                break;
            case 'click':
                // Canvas clicked
                if (!this.img)
                    break;
                // Calculate position based on offset and scale
                var pos = [
                    (evt.pageX - this.offset[0] - this.img.width / 2) / this.scale,
                    (evt.pageY - this.offset[1] - this.img.height / 2) / this.scale];
                // Draw image with rounded values
                this.ctx.drawImage(this.img, pos[0] + 0.5 | 0, pos[1] + 0.5 | 0);
                break;
            case 'load':
                // Image loaded
                this.img = this.loader;
                break;
        }
    }
};