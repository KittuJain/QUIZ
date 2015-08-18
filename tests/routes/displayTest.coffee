assert = require("chai").assert
display = require("../../routes/display").display

request = undefined
response = undefined

setup = ->
    request = session:
      userEmail: "something@fortest"

    response = {}

teardown = ->
    request = null
    response = null

describe "Display", ->
  beforeEach(setup)
  afterEach(teardown)

  describe "#showQuizList", ->
    it "should give all the quiz lists", ->
      quizzes = require("./data/quizzes")
      path = "../tests/routes/data/"
      response.render = (pageName, details) ->
        expected = [
          index: "1"
          name: "General Knowledge 1"
          totalQuestions: 4
        ,
          index: "2"
          name: "General Knowledge 2"
          totalQuestions: 2
         ]
        assert.deepEqual pageName, "quizzes"
        assert.deepEqual details.quizList.length, 2
        assert.deepEqual details.quizList, expected
        assert.deepEqual details.email, "something@fortest"

      display.get.showQuizList request, response, quizzes, path


  describe "#goToFirstQuestion", ->
   it "should get first question for quiz 1", ->
     console.log request
     request.params = id: "1"
     quizzes = require("./data/quizzes")
     root = "../tests/routes/data/"
     response.redirect = (path) ->
       assert.deepEqual path, "/quiz/1/1"

     display.get.goToFirstQuestion request, response, quizzes, root


   describe "#showQuestion", ->
     it "should give question for quiz 1", ->
       request.params = qId: "1"
       response.render = (pageName, content) ->
         expected =
           details:
             id: "1"
             question: "What is the largest Railway station in the world?"
             options: [ "Grand Central Terminal", "Kharagpur Railway station", "Ghum Railway Station", "Gorakhpur Junction railway station" ]
             isCorrect: "false"

           email: "something@fortest"

         assert.deepEqual pageName, "serve-question/serve-question"
         assert.deepEqual content, expected

       display.get.showQuestion request, response


   describe "#answerQuestion", ->
     it "should give second question if first question is been answered", ->
       request.params =
         qId: "1"
         id: "1"

       request.body = options: "Grand Central Terminal"
       response.redirect = (path) ->

       display.get.goToFirstQuestion request, response, require("./data/quizzes"), "../tests/routes/data/"
       response.redirect = (path) ->
         assert.deepEqual path, "/quiz/1/2"

       display.post.answerQuestion request, response

     it "should redirect to report page", ->
       request.params =
         qId: "1"
         id: "2"

       request.body = option: "Grand Central Terminal"
       response.redirect = (path) ->

       display.get.goToFirstQuestion request, response, require("./data/quizzes"), "../tests/routes/data/"
       display.post.answerQuestion request, response
       response.redirect = (path) ->
         assert.deepEqual path, "/report/2"

       display.post.answerQuestion request, response


   describe "#reportCard", ->
     it "should give the report of the game", ->
       request.params = id: "2"
       request.body = option: "Ultraviolet radiation"
       response.redirect = (path) ->

       display.get.goToFirstQuestion request, response, require("./data/quizzes"), "../tests/routes/data/"
       request.params = id: "1"
       display.post.answerQuestion request, response
       request.params = id: "2"
       display.post.answerQuestion request, response
       response.render = (pageName, report) ->
         expected =
           correct: 1
           total: 2
           quizName: "General Knowledge 2"
           email: "something@fortest"
           allQuestionReport: [
             question: "The ozone layer restricts - "
             isCorrect: true
             given: "Ultraviolet radiation"
             actual: "Ultraviolet radiation"
           ,
             question: "FRS stands for -"
             isCorrect: false
             given: "Ultraviolet radiation"
             actual: "Fellow of Royal Society"
            ]

         assert.deepEqual report, expected
         assert.deepEqual pageName, "report/report"

       display.get.reportCard request, response, require("./data/quizzes")
