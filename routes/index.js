var express = require('express');
var lib = require('../lib/quiz.js');
var quiz = lib.init('data/quiz.db');
var getDb = require('../lib/DBLib.js').create_db('data/quiz.db');
var gameLib = require('../lib/game.js').lib;
var router = express.Router();
var users = require("./users").users;
var display = require("./display").display;
var action = require("./action").action;

router.get('/', function(request, response) {
	response.render('index');
});

router.get('/login', function(request, response) {
	users.get.login(request, response);
});

router.post('/login', function(request, response) {
    users.post.login(request, response);
});

router.get('/quizzes', function(request, response) {
    display.get.showQuizList(request, response);
});

router.get('/dashboard', function(request, response) {
    display.get.showQuizList(request, response);
});

router.get("/createQuiz", function(request, response) {
    action.get.createQuiz(request, response);
});

router.post("/createQuiz", function(request, response) {
    action.post.createQuiz(request, response);
});

router.get('/join/:id', function(request, response) {
	var db = getDb();
	var quizId = request.params.id;
	var useremail = request.session.userEmail;
	gameLib.join(useremail,quizId,db,function(err){
		response.redirect("/quiz/"+quizId);
	})
});

router.get('/quiz/:id', function(request, response) {
	var db = getDb();
	var quizId = request.params.id;
	gameLib.load(quizId,db,function(err,gameData){
		var game = gameLib.start(gameData);
		var question1 = game.getQuestion();
		response.render('quiz',{question:question1.q});
	})
});

module.exports = router;
