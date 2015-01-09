var express = require('express');
var lib = require('../lib/quiz.js');
var quiz = lib.init('data/quiz.db');
var router = express.Router();
var bcrypt = require("bcryptjs");

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/login', function(req, res) {
	res.render('login');
});

router.get('/quizzes', function(req, res) {
	console.log(quiz)
	quiz.getTopics('abc@email.com', function(err, topics) {
		var quizzes = {};
		topics.length == 0 ? quizzes.quizzes = false : quizzes.quizzes = topics;
		res.render('quizzes', quizzes);
	});
});

router.post('/login', function(req, res, next) {
	if (req.body.exist) {
		loginUser(req, res, next);
	} else {
		registerUser(req, res, next);
	}
});

var registerUser = function(req, res, next) {
	var password = bcrypt.hashSync(req.body.password);
	var new_user = {
		"email": req.body.email,
		"password": password
	};
	quiz.addUser(new_user, function(err, user) {
		req.session.userEmail = user.email;
		if (!err)
			res.redirect('/dashboard');
	});
};

var loginUser = function(req,res,next){
	var user = {"email":req.body.email,"password":req.body.password};
	quiz.getUser(user.email,function(err,existingUser){
		if(!existingUser){
			res.render('login',{error:'Incorrect E-mail Id or password'});
		}
		else{
			var isValidPassword = bcrypt.compareSync(user.password,existingUser.password);
			(isValidPassword) ? res.redirect('/dashboard') : 
			res.render('login',{error:'Incorrect E-mail Id or password'});
		}
	});
};

router.get('/dashboard', function(req, res) {
	res.render('dashboard');
});

module.exports = router;
