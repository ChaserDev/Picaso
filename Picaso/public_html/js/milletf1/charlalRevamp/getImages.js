window.onload = function() {
    init();
};

function init() {

    $(document).ready(function() {
        $.getJSON("https://api.instagram.com/v1/tags/snow/media/recent?client_id=4e32d268a27b498e8c9e7840c7863f11", function(data) {
            console.log(data); // use data as a generic object 
            alert(data);
        });
    });

    var url = "https://api.instagram.com/v1/tags/snow/media/recent?client_id=4e32d268a27b498e8c9e7840c7863f11";
    //alert(url);

}