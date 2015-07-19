var express = require('express');
var session = require('express-session');
var router = express.Router();
var mysql = require('mysql');
var flash = require('connect-flash');
var bcrypt = require('bcrypt-nodejs');
var sess;

/* GET home page. */
router.get('/', function(req, res, next) {
	sess = req.session;
	if (sess.email) {
		res.render('home', {firstName: sess.firstName, lastName: sess.lastName, email: sess.email});
	} else {
		req.flash('error', 'Please login first!');
		res.redirect('/');
	}
});

/* POST logForm */
router.post('/', function(req, res, next) {
	var connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "chayan",
		database: "mydb"
	});
	var queryString = "select * from user where email = ?";
	connection.query(queryString, [req.body.email], function(error, results) {
		if(error) {
			throw error;
		} else {
			if(results.length <= 0) {
				req.flash('error', 'This email id is not registered!');
				res.redirect('/');
			} else {
				if(results[0].flag == "0") {
					req.flash('error', 'Email not verified, please click the verification link which was send to you during registration!');
					res.redirect('/');
				} else {
					if(results[0].email == req.body.email && bcrypt.compareSync(req.body.pass, results[0].pass) /*results[0].pass == req.body.pass*/) {
						sess = req.session;
						sess.firstName=results[0].firstName;
						sess.lastName=results[0].lastName;
						sess.email=results[0].email;
						res.render('home', {firstName: results[0].firstName, lastName: results[0].lastName, email: results[0].email});
					} else {
						req.flash('error', 'Email ID and Password do not match!');
						res.redirect('/');
					}
				}
			} 	
		}
	});
	connection.end();
});
 
 module.exports = router;