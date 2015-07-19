var express = require('express');
var session = require('express-session');
var router = express.Router();
var url = require('url');
var bodyParser = require('body-parser');
var fs = require('fs');

var sess;
var obj;

router.use(bodyParser.urlencoded({extended: true}));

/* GET searchStock listing. */
router.get('/', function(req, res, next) {
	sess = req.session;
	if(sess.email) {
		res.render('searchStock', {firstName: sess.firstName, lastName: sess.lastName, email: sess.email});
	} else {
		req.flash('error', 'Please login first!');
		res.redirect('/');
	}
});

module.exports = router;