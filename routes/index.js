var express = require('express');
var session = require('express-session');
var router = express.Router();
var mysql = require('mysql');
var flash = require('connect-flash');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt-nodejs');

var sess;


function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function checkPassword(pass) {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(pass);
}	

function checkInput(inp) {
    var re = /^([\w-])/;
    return re.test(inp);
}

/* GET home page. */
router.get('/', function(req, res, next) {
	sess = req.session;
	if(sess.email) {
		res.redirect('/home');
	} else {
		res.render('index', {message: req.flash('error')});
	}
});

/* POST regForm */
router.post('/', function(req, res, next) {
	if(validateEmail(req.body.email) && checkPassword(req.body.pass) && checkInput(req.body.firstName) && checkInput(req.body.lastName)) {
		var connection = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "chayan",
			database: "mydb"
		});
		connection.connect();
		var checkUserQuery = "select email from user where email = ?";
		connection.query(checkUserQuery, [req.body.email], function(error,results) {
			if(error) {
				throw error;
			} else {
				if(results.length > 0) {
					req.flash('error', 'A user with this E Mail already exists!');
					res.redirect('/');
				} else {
					var rand = Math.floor((Math.random() * 100) +54);
					var hash = bcrypt.hashSync(req.body.pass);
					var queryString = "insert into user (firstName,lastName,email,pass,verifyId,flag) values (?,?,?,?,?,?)";
					connection.query(queryString, [req.body.firstName,req.body.lastName,req.body.email,hash,rand,"0"], function(error,results) {
						if(error) {
							throw error;
						} else {
							var link = "http://" + req.get('host') + "/verify?id=" + rand;
							var transporter = nodemailer.createTransport({
								service: "gmail",
								auth: {
									user: "stockmarketportfoliomanagement@gmail.com",
									pass: "smapmsmapm"
								}
							});
							var mailOptions = {
								from: "SMAPM <stockmarketportfoliomanagement@gmail.com>",
								to: req.body.email,
								subject: "Welcome",
								html: "<h2>Welcome to SMAPM</h2><p>Please click <a href="+link+">here</a> to verify your email address</p>"
							};
							transporter.sendMail(mailOptions, function(error,info) {
								if(error) {
									throw error;
								} else {
									console.log("Mail sent" + info.response);
								}
							});
							req.flash('error', 'Registration successful, check you email for the verification link!');
							res.redirect('/');
						}
					});
				}
			}
		});
	} else {
		req.flash('error', 'You have made one or more mistakes while filling the form. Please fill again!');
		res.redirect('/');
	}
  
});

module.exports = router;