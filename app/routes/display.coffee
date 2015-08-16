lib = require("../lib/quiz.js")
quiz = lib.init("data/quiz.db")
_display = {}
_get = {}
_post = {}
questions = undefined
withAnswer = undefined
paperId = undefined
attempt = undefined

_get.showQuizList = (request, response, quizzes, path) ->
  userEmail = request.session.userEmail
  quizList = Object.keys(quizzes).map((key) ->
    questionPath = path + quizzes[key].location
    questionIndexes = Object.keys(require(questionPath))
    index: key
    name: quizzes[key].name
    totalQuestions: questionIndexes.length
  )
  quizDetails =
    quizList: quizList
    email: userEmail

  response.render "quizzes", quizDetails

_get.goToFirstQuestion = (request, response, quizzes, root) ->
  attempt = 0
  paperId = request.params.id
  quizPath = root + quizzes[paperId].location
  questions = formatter(require(quizPath))
  response.redirect "/quiz/" + paperId + "/1"

formatter = (questions) ->
  withAnswer = questions
  Object.keys(questions).map (questionKey) ->
    id: questionKey
    question: questions[questionKey].question
    options: questions[questionKey].options
    isCorrect: "false"


_get.showQuestion = (request, response) ->
  quizId = request.params.qId
  content =
    details: questions[quizId - 1]
    email: request.session.userEmail

  response.render "serve-question/serve-question", content

generateAnswerReport = (givenQuestions) ->
  givenQuestions.map (details) ->
    question: details.question
    isCorrect: details.isCorrect
    given: details.givenAnswer
    actual: withAnswer[details.id].answer


_get.reportCard = (request, response, quizzes) ->
  return response.redirect("/500")  unless attempt is questions.length
  allQuestionsReport = generateAnswerReport(questions)
  numberOfCurrectAnswer = questions.filter((question) ->
    question.isCorrect is true
  ).length
  report =
    correct: numberOfCurrectAnswer
    total: questions.length
    quizName: quizzes[paperId].name
    email: request.session.userEmail
    allQuestionReport: allQuestionsReport

  questions = withAnswer = paperId = `undefined`
  response.render "report/report", report

_post.answerQuestion = (request, response) ->
  attempt++
  givenAnswer = request.body.option
  currentQuestionId = parseInt(request.params.id)
  question = withAnswer[currentQuestionId]
  questions[currentQuestionId - 1].givenAnswer = givenAnswer
  questions[currentQuestionId - 1].isCorrect = (question.answer is givenAnswer)
  return response.redirect("/report/" + paperId)  if currentQuestionId is questions.length
  response.redirect "/quiz/" + paperId + "/" + (currentQuestionId + 1)

_display.get = _get
_display.post = _post
exports.display = _display
