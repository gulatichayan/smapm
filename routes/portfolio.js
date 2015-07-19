var express = require('express');
var session = require('express-session');
var router = express.Router();
var mysql = require('mysql');

var sess;

/*GET portfolio page. */
router.get('/', function(req, res, next) {
	sess = req.session;
	if(sess.email) {
		var connection = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "chayan",
			database: "mydb"
		});
		connection.connect();
		var updateTableQuery = "select * from portfolio where email = ?";
		connection.query(updateTableQuery, [sess.email], function(error, results) {
			if(error) {
				throw error;
			} else {
				res.render('portfolio', {firstName: sess.firstName, lastName: sess.lastName, email: sess.email, data: results, message: req.flash('error')});
			}
		});
	} else {
		req.flash('error', 'Please login first!');
		res.redirect('/');
	}
});

router.post('/', function(req, res, next) {
	sess=req.session;
	if(sess.email) {
		var connection = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "chayan",
			database: "mydb"
		});
		connection.connect();
		var addStockQuery = "insert into portfolio (symbol,quantity,email,invPrice) values (?,?,?,?)";
		connection.query(addStockQuery, [req.body.stock_symbol_shadow.toUpperCase(),req.body.quant,sess.email,req.body.invPrice], function(error,results) {
			if(error) {
				throw error;
			} else {
				req.flash('error', 'Stock Added Sucessfully');
				res.redirect('/portfolio');
			}
		});
	} else {
		req.flash('error', 'Please login first!');
		res.redirect('/');
	}
});

module.exports = router;

/*CREATE TABLE portfolio (
  id mediumint(8) unsigned NOT NULL auto_increment,
  symbol varchar(255) default NULL,
  quantity int default NULL,
  email varchar(255) default NULL,
  invPrice decimal(8,2),
  PRIMARY KEY (id)
) AUTO_INCREMENT=1;*/