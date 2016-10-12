var OAUTH_URL = "https://github.com/login/oauth/authorize?scope=";
var OAUTH_SCOPE = "user:email + "&" + client_id=";
var CLIENT_ID = "4ad89144980ebf7ce5f7";

function start(oauth_url, oauth_scope, client_id) {

   function get_data(){
	
      var login = window.getElementById('access');
      login.click(function (){
         window.open('oauth_url + oauth_scope+client_id');
      });
     
      window.addEventListener('message', function (event) {
      var code = event.data;           
      console.log(code);
      });
}
