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
});