var express = require('express');
var router = express.Router();
var session = require('express-session');

var sess;

var navBarLoggedIn = '<nav id="menu" class="navbar navbar-inverse"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span> </button><a class="navbar-brand" href="/"><img src="images/logo.png" /></a></div><div class="collapse navbar-collapse" id="myNavbar"><ul class="nav navbar-nav"><li><a href="/home">Home</a></li><li><a href="/portfolio">Portfolio</a></li><li><a href="/searchStock">Search Stock</a></li><li><a href="/aboutUS">About Us</a></li><li><a href="/contactUs">Contact Us</a></li><li><a href="/advertise">Advertise</a></li></ul><ul class="nav navbar-nav navbar-right"><li><form id="logoutform" method ="post" action="/logout"><input type="submit" name="Logout" value="Logout" /></form></li></ul></div></div></nav>';
var navBarLoggedOut = '<nav id="menu" class="navbar navbar-inverse"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span> </button><a class="navbar-brand" href="/"><img src="images/logo.png" /></a></div><div class="collapse navbar-collapse" id="myNavbar"><ul class="nav navbar-nav"><li><a href="/aboutUS">About Us</a></li><li><a href="/contactUs">Contact Us</a></li><li><a href="/advertise">Advertise</a></li></ul><ul class="nav navbar-nav navbar-right"><li><a href="/"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li><li><a href="/"><span class="glyphicon glyphicon-log-in"></span> Login</a></li></ul></div></div></nav>'

/*GET contactUs page. */
router.get('/', function(req, res, next) {
	sess = req.session;
	if(sess.email) {
		res.render('contactUs', {firstName: sess.firstName, lastName: sess.lastName, email: sess.email, navbar: navBarLoggedIn});
	} else {
		res.render('contactUs', {firstName: "Guest", lastName: "User", email: "Login to enjoy all features", navbar: navBarLoggedOut});
	}
});

module.exports = router;