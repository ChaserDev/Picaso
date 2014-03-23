var Instagram = {};
var testImages = [];

(function() {
    function search(tag) {
        $.getJSON(url, toScreen);
    }
    function toScreen(photos) {
        //console.log(data);
        var sources = [];

        $.each(photos.data, function(index, photo) {

            // I'll construct the image tag on the fly.
            // The images property contains objects representing images of
            // varying quality. I'll give low_resulution a try.
            //var image = new Image();
            //image.src = photo.images.low_resolution.url;

            //testImages.push(image);
            sources.push(photo.images.low_resolution.url);
//            photo = "<img src='" + photo.images.low_resolution.url + "' />";
//
//            $('div#photos-wrap').append(photo);
        });
        alert(sources.length);

        function loadImages(sources, callback) {
            var images = {};
            var loadedImages = 0;
            var numImages = 0;
            // get num of sources
            for (var src in sources) {
                numImages++;
            }
            for (var src in sources) {
                images[src] = new Image();
                images[src].onload = function() {
                    if (++loadedImages >= numImages) {
                        callback(images);
                    }
                };
                images[src].src = sources[src];
            }
        }

        //alert(testImages.length);

        // Get DOM elements
        var element = document.getElementById('game');
        var canvas = element.firstElementChild;

        // Original content size
        var content = [canvas.width, canvas.height];

        // Setting up the canvas
        var context = canvas.getContext('2d');
        //ctx.fillStyle = '#6f8ed9';
        //ctx.fillRect(0, 0, content[0], content[1]);
        loadImages(sources, function(images) {
            for (i = 0; i < 10; i++) {
                context.drawImage(images[i], 100, i * (30), 200, 137);
            }
            
        });
    }
    function search(tag) {
        var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=4e32d268a27b498e8c9e7840c7863f11"
        $.getJSON(url, toScreen);
    }
    Instagram.search = search;
})();



Instagram.search('cats');