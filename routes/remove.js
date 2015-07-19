var express = require('express');
var session = require('express-session');
var router = express.Router();
var mysql = require('mysql');

var sess;

/*GET for deleting*/
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
		var removeStockQuery = "delete from portfolio where id = ? and email = ?";
		connection.query(removeStockQuery, [req.params.id, sess.email], function(error, results) {
			if(error) {
				throw error;
			} else {
				res.send({removal: 'Stock Removed Sucessfully'});
			}
		});
		connection.end();
	} else {
		req.flash('error', 'Please Login First!');
		res.redirect('/');
	}
});

module.exports = router;