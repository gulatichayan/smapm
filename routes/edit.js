var express = require('express');
var session = require('express-session');
var router = express.Router();
var mysql = require('mysql');

var sess;

router.get('/:id', function(req, res, next) {
	sess = req.session;
	if(sess.email) {
		var connection = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "chayan",
			database: "mydb"
		});
		connection.connect();
		var editPortfolioQuery = "select symbol from portfolio where id = ? and email = ?";
		connection.query(editPortfolioQuery, [req.params.id, sess.email], function(error,results) {
			if(error) {
				throw error;
			} else {
				res.render('edit', {firstName: sess.firstName, lastName: sess.lastName, email: sess.email, symbol: results[0].symbol, id: req.params.id});
			}
		});
	} else {
		req.flash('error', 'Please Login First!');
		res.redirect('/');
	}
});

router.post('/:id', function(req, res, next) {
	sess = req.session;
	if(sess.email) {
		var connection = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "chayan",
			database: "mydb"
		});
		connection.connect();
		var saveEditQuery = "update portfolio set quantity = ?, invPrice = ? where id = ?";
		connection.query(saveEditQuery, [req.body.quant, req.body.invPrice, req.params.id], function(error,results) {
			if(error) {
				throw error;
			} else {
				req.flash('error', 'Stock Edited Sucessfully');
				res.redirect('/portfolio');
			}
		});
	}
});

module.exports = router;