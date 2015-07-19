var param;
var temp;
var firstName;
var lastName;
var email;

function processUser() {
    param = location.search.substring(1).split("&");
    temp = param[0].split("=");
    firstName = unescape(temp[1]);
	firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    temp = param[1].split("=");
    lastName = unescape(temp[1]);
	lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
	temp = param[2].split("=");
	email = unescape(temp[1]);
    document.getElementById("name").innerHTML = firstName + " " + lastName;
    document.getElementById("email").innerHTML = email;
}
  
window.onload = function() {
	processUser();
};
