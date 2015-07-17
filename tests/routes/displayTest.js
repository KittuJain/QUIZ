var assert = require('chai').assert;
var display = require("../../routes/display").display;
var request;
var response;

describe("Display", function() {
    beforeEach(function() {
        request = {
            session:{
                userEmail: "something@fortest"
            }
        };

        response = {};
    });

    afterEach(function(){
        request = null;
        response = null;
    });

    describe("#showQuizList", function() {
        it("should give all the quiz lists", function() {
            var quizzes = require("./data/quizzes");
            var path = "../tests/routes/data/";
            response.render = function(pageName, details) {
                var expected = [
                    {index: "1", name: "General Knowledge 1", totalQuestions: 4},
                    {index: "2", name: "General Knowledge 2", totalQuestions: 2}
                ];

                assert.deepEqual(pageName, "quizzes");
                assert.deepEqual(details.quizList.length, 2);
                assert.deepEqual(details.quizList, expected);
                assert.deepEqual(details.email, "something@fortest");
            };

            display.get.showQuizList(request, response, quizzes, path);
        });
    });

    describe("#goToFirstQuestion", function() {
        it("should get first question for quiz 1", function() {
            request.params = {id: "1"};
            var quizzes = require("./data/quizzes");
            var root = "../tests/routes/data/";

            response.redirect = function(path) {
                assert.deepEqual(path, "/quiz/1/1");
            };

            display.get.goToFirstQuestion(request, response, quizzes, root);
        });
    });

    describe("#showQuestion", function() {
        it("should give question for quiz 1", function() {
            request.params = {qId: "1"};

            response.render = function(pageName, content) {
                var expected = {
                    details: {
                        id: "1",
                        question: 'What is the largest Railway station in the world?',
                        options:
                            [ 'Grand Central Terminal',
                                'Kharagpur Railway station',
                                'Ghum Railway Station',
                                'Gorakhpur Junction railway station'
                            ],
                        isCorrect: 'false'
                    },
                    email: "something@fortest"
                };

                assert.deepEqual(pageName, "serve-question/serve-question");
                assert.deepEqual(content, expected);
            };

            display.get.showQuestion(request, response);
        });
    });

    describe("#answerQuestion", function() {
        it("should give second question if first question is been answered", function () {
            request.params = {qId: "1", id: "1"};
            request.body = {options:"Grand Central Terminal"};

            response.redirect = function (path) {};

            display.get.goToFirstQuestion(request, response, require("./data/quizzes"), "../tests/routes/data/");

            response.redirect = function (path) {
                assert.deepEqual(path, "/quiz/1/2");
            };

            display.post.answerQuestion(request, response);
        });

        it("should redirect to report page", function () {
            request.params = {qId: "1", id: "2"};
            request.body = {option:"Grand Central Terminal"};

            response.redirect = function (path) {};

            display.get.goToFirstQuestion(request, response, require("./data/quizzes"), "../tests/routes/data/");

            display.post.answerQuestion(request, response);

            response.redirect = function (path) {
                assert.deepEqual(path, "/report/2");
            };

            display.post.answerQuestion(request, response);
        });
    });

    describe("#reportCard", function () {
       it("should give the report of the game", function() {
           request.params = {id: "2"};
           request.body = {option:"Ultraviolet radiation"};

           response.redirect = function (path) {};

           display.get.goToFirstQuestion(request, response, require("./data/quizzes"), "../tests/routes/data/");

           request.params = {id: "1"};
           display.post.answerQuestion(request, response);
           request.params = {id: "2"};
           display.post.answerQuestion(request, response);

           response.render = function (pageName, report) {
               var expected =  {
                   correct: 1,
                   total: 2,
                   quizName: 'General Knowledge 2',
                   email: 'something@fortest',
                   allQuestionReport:
                       [
                           {
                               question: 'The ozone layer restricts - ',
                               isCorrect: true,
                               given: 'Ultraviolet radiation',
                               actual: 'Ultraviolet radiation'
                            },
                           {
                               question: 'FRS stands for -',
                               isCorrect: false,
                               given: 'Ultraviolet radiation',
                               actual: 'Fellow of Royal Society'
                           }
                       ]
               };

               assert.deepEqual(report, expected);
               assert.deepEqual(pageName, "report/report");
           };

           display.get.reportCard(request, response, require("./data/quizzes"));
       });
    });
});