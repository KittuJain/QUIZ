express = require("express")
lib = require("../lib/quiz")
quiz = lib.init("data/quiz.db")

router = express.Router()

users = require("./users").users
display = require("./display").display
action = require("./action").action

requireLogin = (request, response, next) ->
  (if request.session.userEmail then next() else response.redirect("/login"))

router.get "/", (request, response) ->
  response.render "index"

router.get "/login", (request, response) ->
  users.get.login request, response

router.post "/login", (request, response) ->
  users.post.login request, response

router.get "/logout", users.get.logout

router.get "/users", users.get.allUser

router.get "/quizzes", (request, response) ->
  quizzes = require("../resources/quizzes.json")
  questionPath = "../resources/"
  display.get.showQuizList request, response, quizzes, questionPath

router.get "/dashboard", requireLogin, (request, response) ->
  quizzes = require("../resources/quizzes.json")
  questionPath = "../resources/"
  display.get.showQuizList request, response, quizzes, questionPath

router.post "/answer/:id", requireLogin, (request, response) ->
  display.post.answerQuestion request, response

router.get "/quiz/:id", requireLogin, (request, response) ->
  quizzes = require("../resources/quizzes.json")
  root = "../resources/"
  display.get.goToFirstQuestion request, response, quizzes, root

router.get "/quiz/:id/:qId", requireLogin, (request, response) ->
  display.get.showQuestion request, response

router.get "/report/:id", requireLogin, (request, response) ->
  display.get.reportCard request, response, require("../resources/quizzes.json")

module.exports = router
