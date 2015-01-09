var express = require('express');
var lib = require('../lib/quiz.js');
var quiz = lib.init('data/quiz.db');
var router = express.Router();
var bcrypt = require("bcryptjs");

router.get('/', function(req, res) {
	res.render('index');
});

var requireLogin = function(req,res,next){
	req.session.userEmail ? next(): res.redirect('/login');
};

router.get('/login', function(req, res) {
	res.render('login');
});

router.get('/quizzes',requireLogin function(req, res) {
	console.log(req.session.userEmail)
	quiz.getTopics(req.session.userEmail, function(err, topics) {
		var quizzes = {};
		topics.length == 0 ? quizzes.quizzes = false : quizzes.quizzes = topics;
		res.render('quizzes', quizzes);
	});
});

router.post('/login', function(req, res, next) {
	if (req.body.exist) {
		loginUser(req, res, next);
	} else {
		quiz.getUser(req.body.email,function(err,ext){
			if(ext)
				res.render('login',{error:"User Email ID already exists"});
			else
				registerUser(req, res, next);
		});
	}
});

var registerUser = function(req, res, next) {
	var password = bcrypt.hashSync(req.body.password);
	var new_user = {
		"email": req.body.email,
		"password": password
	};
	quiz.addUser(new_user, function(err, user) {

		if (!err){ 
			req.session.userEmail = user.useremail;
			res.redirect('/dashboard');
		}else{
			res.render('login',{error:"Server Error..."});
		}
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
			if(isValidPassword){
				req.session.userEmail = user.email;
				res.redirect('/dashboard') 	
			}
			else
				res.render('login',{error:'Incorrect E-mail Id or password'});
		}
	});
};

router.get('/dashboard', requireLogin,function(req, res) {
	res.render('dashboard');
});

module.exports = router;
