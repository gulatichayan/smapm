var express = require('express');
var session = require('express-session');
var router = express.Router();

var sess;

router.post('/', function(req, res, next) {
	req.session.destroy(function(error) {
		if(error) {
			throw error;
		} else {
			res.redirect('/');
		}
	});
});

router.get('/', function(req, res, next) {
	res.redirect('/');
});

module.exports = router;