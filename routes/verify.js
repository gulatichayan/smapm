var express = require('express');
var session = require('express-session');
var router = express.Router();
var mysql = require('mysql');
var flash = require('connect-flash');

var sess;

router.get('/', function(req, res, next) {
	console.log(req.protocol + ":/" + req.get('host'));
	if(req.protocol + ":/" + req.get('host') == ("http:/localhost:3000")) {
		var connection = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "chayan",
			database: "mydb"
		});
		var connection2 = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "chayan",
			database: "mydb"
		}); 
		connection.connect();
		var verifyQuery = "select * from user where verifyId = ?";
		connection.query(verifyQuery, [req.query.id, req.query.id], function(error,results) {
			if(error) {
				throw error;
			} else {
				if(results.length > 0) {
					connection2.connect();
					var updateUserQuery = "update user set flag = '1' where verifyId =?";
					connection2.query(updateUserQuery, [req.query.id], function(error,results2) {
						if(error) {
							throw error;
						} else {
							req.flash('error', 'Email verified. Please login!');
							res.redirect("/");
						}
					});
					connection2.end();
				} else {
					req.flash('error', 'This email id is not registered or maybe you are using a wrong verification link. Just login with your email id once!');
					res.redirect("/");
				}
			}
		});
		connection.end();
	} else {
		console.log("Different Domain");
	}
});

module.exports = router;