$(document).ready(function() {
    var Instagram = {};
    var testImages = [];


    Instagram.Config = {
        clientID: "4e32d268a27b498e8c9e7840c7863f11",
        apiHost: "https://api.instagram.com"
    };

    (function() {
        var sources = [];

//    function toScreen(photos) {
//        //console.log(data);
//        var sources = [];
//
//        $.each(photos.data, function(index, photo) {
//            sources.push(photo.images.low_resolution.url);
//        });
//
//        return sources;
//    }

        function imageSources() {
            return sources;
        }

        function generateUrl(tag) {
            var config = Instagram.Config;
            var testurl = config.apiHost + "/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=" + config.clientID;

            return function(max_id) {
                if (typeof max_id === 'string' && max_id.trim() !== '') {
                    testurl += "&max_id=" + max_id;
                }
                return testurl;
            };
        }

        function search(tag) {
            var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=4e32d268a27b498e8c9e7840c7863f11";

            var resource = generateUrl(tag);

            $.getJSON(resource(), function(json) {
                $.each(json.data, function(index, photo) {
                    testImages.push(photo.images.low_resolution.url);
                });
            });
        }

        Instagram.search = search;
        Instagram.imageSources = imageSources;
    })();

    Instagram.search('snow');

    var sources = Instagram.imageSources();

    console.log(sources.length);

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
        for (i = 0; i < sources.length; i++) {
            context.drawImage(images[i], 100, i * 8, 8, 8);
        }
    });
});