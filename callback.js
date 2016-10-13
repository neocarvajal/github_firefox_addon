const OAUTH_URL = "https://github.com/login/oauth/authorize?scope=";
const OAUTH_SCOPE = "user:email + "&" + client_id=";
const CLIENT_ID = "4ad89144980ebf7ce5f7";

window.onload = function() {
   main(OAUTH_URL, OAUTH_SCOPE, CLIENT_ID);
}

function main(oauth_url, oauth_scope, client_id) {
   var button = document.getElementById('access');
   button.addEventListener("click", function(e){
      var url = oauth_url + oauth_scope + client_id;
      console.log(url);
      window.location(url);
   });


//   window.addEventListener('message',function (event) {
//      var code = event.data;
//      console.log(code);
//   });	  
}
