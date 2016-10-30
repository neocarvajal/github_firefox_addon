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
      
      window.addEventListener('message', receiveMessage);
      window.removeEventListener('message', receiveMessage);

      console.log("visited " + url);
   });
}

function receiveMessage(event) {
  var code = event.data;

  console.log(code);
  
}

var httpRequest = new XMLHttpRequest();    
httpRequest.open('GET', OAUTH_SERVE, true);
var urlRequest = OAUTH_SERVE + "?code=";
httpRequest.send(urlRequest + code);

httpRequest.onreadystatechange = function () {
   var DONE = 4; // readyState 4 means the request is done.
   var OK = 200; // status 200 is a successful return.
   if (httpRequest.readyState === DONE) {
      if (httpRequest.status === OK){
         // var response = JSON.parse(httpRequest.responseText);
         console.log(httpRequest.responseText); // 'This is the returned text.'
      }                  
   } else {
         console.log('Error: ' + httpRequest.status); // An error occurred during the request.
   }
}
