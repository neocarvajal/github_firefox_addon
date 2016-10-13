const OAUTH_URL = "https://github.com/login/oauth/authorize?scope=";
const OAUTH_SCOPE = "user:email + "&" + client_id=";
const CLIENT_ID = "4ad89144980ebf7ce5f7";

window.onload = function() {
   init(OAUTH_URL, OAUTH_SCOPE, CLIENT_ID);
}

function init(oauth_url, oauth_scope, client_id) {   

   var url = OAUTH_URL + OAUTH_SCOPE + CLIENT_ID;
   var login = document.getElementById('access');
   console.log(login.value);
   login.onclick = function(url){
      console.log(url);
      window.open(url);
   }
   window.addEventListener('message',function (event) {
      var code = event.data;
      console.log(code);
   });	  
}
