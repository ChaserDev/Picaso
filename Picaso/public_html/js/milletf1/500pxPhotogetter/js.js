var btn;
var displayArea;

window.onload = function () {

	btn = document.getElementById("btn");
	btn.onclick = FetchImage;
	
	displayArea = document.getElementById("displayArea");
	displayArea.style.background = "pink";
};

function FetchImage(){

	//get request token
	var request = XMLHttpRequest();
	var requestURL = "https://api.500px.com/oauth/request_token";
	
		
	//oauth requests don't use .onreadystate (guess)
	/*request.onreadystate = function()
	{
		console.log("readystate: " + request.readyState);
		console.log("status: " + request.status);
		
		if(request.readyState == 4)
		{
			if(request.status == 302)
			{
				//do something with data
				//console.log(JSON.stringify(request.resonseText));
				alert("hit");
			}
			else
			{
				console.log(request.statusText);
				alert("miss");
			}
		}
	}*/
	
	request.open('POST', requestURL, true);
	
	//set needed parameters
	request.setRequestHeader("oauth_callback", "hello");
	
	request.send();
}

/*fill this out

https://github.com/500px/api-documentation/tree/master/authentication //500px authentication
http://oauth.net/core/1.0a/ //oauth core specification


//oauth random stuff

consumer.example =
{ consumerKey   : "RyOAxQPOlIhujQvLjwNFZLjmiiPTkNNlfOU25QIR"
, consumerSecret: "243uKhxPD9RAl8ecmbeWQEfNvwALaKnGtOYsxowB"
, serviceProvider:
  { signatureMethod     : "HMAC-SHA1"
  , requestTokenURL     : "https://api.500px.com/oauth/request_token"
  , userAuthorizationURL: "http://localhost/oauth/authorize"
  , accessTokenURL      : "http://localhost/oauth/request_token"
  , echoURL             : "http://localhost/oauth-provider/echo"//not needed
  }
};

http://webthree.ict.op.ac.nz/MILLETF1/public_html/500pxPhotogetter/index.html"//host site
*/

