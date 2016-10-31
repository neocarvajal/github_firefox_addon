// const only for es6
var OAUTH_URL = "https://github.com/login/oauth/authorize?scope=";
var OAUTH_SERVE = "https://github-firefox-addon.herokuapp.com/token.php";
var OAUTH_SCOPE = "user:email" + "&" + "client_id=";
var CLIENT_ID = "4ad89144980ebf7ce5f7";
var URL_REQUEST = OAUTH_SERVE + "?code=";

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

			
			createCORSRequest('GET', OAUTH_SERVE);
			makeCorsRequest();

/*			var httpRequest = new XMLHttpRequest();    
			httpRequest.open('GET', OAUTH_SERVE, true);
			httpRequest.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");    		
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
			}*/  			
  		});
	});
}



// Create the httpRequest object.
function createCORSRequest(method, url) {
  var httpRequest = new XMLHttpRequest();
  if ("withCredentials" in httpRequest) {
    // httpRequest for Chrome/Firefox/Opera/Safari.
    httpRequest.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    httpRequest = new XDomainRequest();
    httpRequest.open(method, url);
  } else {
    // CORS not supported.
    httpRequest = null;
  }
  return httpRequest;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // This is a sample server that supports CORS.
  var httpRequest = createCORSRequest('GET', URL_REQUEST);
  if (!httpRequest) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  httpRequest.onload = function() {
    var text = httpRequest.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + URL_REQUEST + ': ' + title);
  };

  httpRequest.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  httpRequest.send(URL_REQUEST);
}