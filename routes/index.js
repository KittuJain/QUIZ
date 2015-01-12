var express = require('express');
var lib = require('../lib/quiz.js');
var quiz = lib.init('data/quiz.db');
var getDb = require('../lib/DBLib.js').create_db('data/quiz.db');
var gameLib = require('../lib/game.js').lib;
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

router.get('/quizzes',requireLogin, function(req, res) {
	console.log(req.session.userEmail)
	quiz.getTopics(req.session.userEmail, function(err, topics) {
		var quizzes = {email:req.session.userEmail};
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

router.get('/dashboard', function(req, res) {
	if(req.session.userEmail)
		res.render('dashboard',{email:req.session.userEmail});
	else
		res.redirect('login');
});

router.get('/join/:id',requireLogin, function(req, res) {
	var db = getDb();
	var quizId = req.params.id;
	var useremail = req.session.userEmail;
	gameLib.join(useremail,quizId,db,function(err){
		res.redirect("/quiz/"+quizId);
	})
});
router.get('/quiz/:id', requireLogin, function(req, res) {
	var db = getDb();
	var quizId = req.params.id;
	gameLib.load(quizId,db,function(err,gameData){
		var game = gameLib.start(gameData);
		var question1 = game.getQuestion();
		res.render('quiz',{question:question1.q});
	})
});
module.exports = router;
