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
    });

    describe("#showQuizList", function() {
        it("should give all the quiz lists", function() {
            var quizzes = require("./data/quizzes");
            var path = "../tests/routes/data/";
            response.render = function(pageName, details) {
                var expected = [
                    {index: "1", name: "General Knowledge 1", totalQuestions: 4},
                    {index: "2", name: "General Knowledge 2", totalQuestions: 4}
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
});