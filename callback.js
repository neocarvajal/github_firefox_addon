const OAUTH_URL = "https://github.com/login/oauth/authorize?scope=";
const OAUTH_SCOPE = "user:email + "&" + client_id=";
const CLIENT_ID = "4ad89144980ebf7ce5f7";

window.onload = function() {
   var url = OAUTH_URL + OAUTH_SCOPE + CLIENT_ID;
   var login = document.getElementById('access');
   login.onclick(function(){
      console.log(url);
      window.location(url);
   });
   
   window.addEventListener('message',function (event) {
      var code = event.data;
      console.log(code);
   });  
}
