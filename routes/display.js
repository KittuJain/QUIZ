var lib = require('../lib/quiz.js');
var quiz = lib.init("data/quiz.db");

var _display = {};
var _get = {};
var _post = {};

_get.showQuizList = function(request, response) {
    var userEmail = request.session.userEmail;

    quiz.getTopics(userEmail, function(err, topics) {
        var quizzes = {email: userEmail, quizzes: topics};
        response.render('quizzes', quizzes);
    });
};

_get.dashboard = function (request, response) {
    var userEmail = request.session.userEmail;

    if(userEmail)
        response.render('dashboard',{email:userEmail});
};

_display.get = _get;
_display.post = _post;

exports.display = _display;
