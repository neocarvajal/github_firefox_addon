// const only for es6
var OAUTH_URL = "https://github.com/login/oauth/authorize?scope=";
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

   button.addEventListener("click", function(e) {
      var url = oauth_url + oauth_scope + client_id;
      var auth = window.open(url, 'auth_github', windowFeatures);

      window.removeEventListener('message', receiveMessage);
      window.addEventListener('message', receiveMessage);

      console.log("visited " + url);
   });
}

function receiveMessage(e) {
  var code = event.data;

  console.log(code);
}
