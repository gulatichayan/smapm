var express = require('express');
var session = require('express-session');
var router = express.Router();
var url = require('url');
var bodyParser = require('body-parser');
var fs = require('fs');
var url = require('url');
var mysql = require('mysql');

var sess;


/*function getPropertyByRegex(obj,propName) {
       var helloRE = new RegExp("^" + propName + "(\\w*)","i"),
           key;
	   var str = [];
       for (key in obj) {
		   if (helloRE.test(key)) {
			   str.push(obj[key]);
		   }
	   }
	   return str;
}*/

router.use(bodyParser.urlencoded({extended: true}));

/* GET searchStock listing. */
router.get('/', function(req, res, next) {
	sess = req.session;
	if(sess.email) {
		var symbol = url.parse(req.url, true).query.symbol;
		var connection = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "chayan",
			database: "mydb"
		});
		connection.connect();
		var searchNasdaqQuery = "select * from stocksNasdaq where name like ? limit 10";
		connection.query(searchNasdaqQuery, [symbol + "%"], function(error,results){
			if(error) {
				throw error;
			} else {
				res.status(200).send(results);
			}
		});
		connection.end();
		/*fs.readFile('dataNasdaq(inverted).json', 'utf8', function(error, data) {
			if(error) {
				throw error;
			} else {
				var obj = JSON.parse(data);
				var symbol = url.parse(req.url, true).query.symbol;
				res.status(200).send(getPropertyByRegex(obj, symbol));
			}
		});*/
	} else {
		req.flash('error', 'Please login first!');
		res.redirect('/');
	}
});

module.exports = router;