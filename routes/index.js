var express = require('express');
var router = express.Router();
var lib = require('../lib/quiz.js');
var quiz = lib.init('data/quiz.db');

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
	})
})

module.exports = router;