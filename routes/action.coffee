lib = require("../lib/quiz.js")
quiz = lib.init("data/quiz.db")
_action = {}
_get = {}
_post = {}

_get.createQuiz = (request, response) ->
  response.render "create-quiz/create-quiz"

_post.createQuiz = (request, response) ->
  formData = request.body
  formData.user = request.session.userEmail
  quiz.createQuiz formData, (error) ->
    error and response.render("create-quiz/create-quiz",
      error: "Please try after sometime"
    )
    not error and response.redirect("createQuiz")


_action.get = _get
_action.post = _post
exports.action = _action
