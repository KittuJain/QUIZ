var lib = require('../lib/quiz.js');
var quiz = lib.init("data/quiz.db");

var _display = {};
var _get = {};
var _post = {};

_get.showQuizList = function(request, response) {
    var userEmail = request.session.userEmail;
    var quizzes = require("../resources/quizzes.json");

    var quizList = Object.keys(quizzes).map(function (key) {
        var questionPath = "../resources/" + quizzes[key].location;
        var questionIndexes = Object.keys(require(questionPath))
        return { index: key, name: quizzes[key].name, totalQuestions: questionIndexes.length };
    });

    var quizDetails = { quizList: quizList,  email: userEmail};
    response.render('quizzes', quizDetails);
};

_display.get = _get;
_display.post = _post;

exports.display = _display;
