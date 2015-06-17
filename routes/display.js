var lib = require('../lib/quiz.js');
var quiz = lib.init("data/quiz.db");

var _display = {};
var _get = {};
var _post = {};

_get.showQuizList = function(request, response) {
    quiz.getTopics(request.session.userEmail, function(err, topics) {
        var quizzes = {email:request.session.userEmail};
        topics.length == 0 ? quizzes.quizzes = false : quizzes.quizzes = topics;
        response.render('quizzes', quizzes);
    });
};


_display.get = _get;
_display.post = _post;

exports.display = _display;
