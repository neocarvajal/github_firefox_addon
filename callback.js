var OAUTH_URL = "https://github.com/login/oauth/authorize?scope=user:email&repo&client_id=";
var CLIENT_ID = "4ad89144980ebf7ce5f7";

function start(oauth, client_id) {

	function get_data(){
		// Sending a receiving data in JSON format using GET method		
		xhr = new XMLHttpRequest();
		//var url = "url?data=" + encodeURIComponent(JSON.stringify({"user":"","password":""}));
		xhr.open("GET", oauth+client_id, true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.onreadystatechange = function () { 
		    if (xhr.readyState == 4 && xhr.status == 200) {
		        var json = JSON.parse(xhr.responseText);
		        console.log(json.client_id + ", " + json.user + ", " + json.password)
		    }
		}
		//xhr.send();
	}

	function send_data(){
		// Sending and receiving data in JSON format using POST mothod

		xhr = new XMLHttpRequest();
		var url = "https://github.com/login/oauth/access_token";
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.onreadystatechange = function () { 
		    if (xhr.readyState == 4 && xhr.status == 200) {
	    	    var json = JSON.parse(xhr.responseText);
	        	//console.log(json.email + ", " + json.password)
	    	}
		}
		var data = JSON.stringify({"client_id":"","password":"101010"});
		xhr.send(data);
	}

	get_data();
}