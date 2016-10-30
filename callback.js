// const only for es6
var OAUTH_URL = "https://github.com/login/oauth/authorize?scope=";
var OAUTH_SERVE = "https://github-firefox-addon.herokuapp.com/token.php";
var OAUTH_SCOPE = "user:email" + "&" + "client_id=";
var CLIENT_ID = "4ad89144980ebf7ce5f7";

window.onload = function() {
   main(OAUTH_URL, OAUTH_SCOPE, CLIENT_ID);
}

function main(oauth_url, oauth_scope, client_id) {
	var button = document.getElementById('access');
	
	var windowFeatures = "location=no," +
                         "menubar=no," +
                         "status=no," +
                         "dialog=no," +
                         "width=512," +
                         "height=620," +
                         "resizable," +
                         "scrollbars=yes";
	
	button.addEventListener("click", function(event) {
		var url = oauth_url + oauth_scope + client_id;
		var auth = window.open(url, 'auth_github', windowFeatures);
		console.log("visited " + url);

		window.addEventListener('message',function (event) {
			var code = event.data;
			console.log(code);
			// window.removeEventListener('message', receiveMessage);

			var urlRequest = OAUTH_SERVE + "?code=";
			var httpRequest = new XMLHttpRequest();    
			httpRequest.open('GET', OAUTH_SERVE, true);
			httpRequest.withCredentials = true;
    		httpRequest.onreadystatechange = handler;
			httpRequest.send(urlRequest + code);
			
			httpRequest.onreadystatechange = function () {
				var DONE = 4; 
			 	var OK = 200; 
				if (httpRequest.readyState === DONE) {
					if (httpRequest.status === OK) {
			       		var response = JSON.parse(httpRequest.responseText);
			       		console.log(response); 
			     	}                  
			   	}else {
			        console.log('Error: ' + httpRequest.status);
			   	}	
			}  			
  		});
	});
}
