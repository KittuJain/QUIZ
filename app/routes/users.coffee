lib = require("../lib/quiz.js")
quiz = lib.init("data/quiz.db")
bcrypt = require("bcryptjs")
users = {}
_get = {}
_post = {}

# Common Methods
requireLogin = (request, response) ->
  (if request.session.userEmail then next() else response.redirect("/login"))

_get.logout = (request, response) ->
  request.session.destroy()
  response.redirect "/login"

_get.login = (request, response) ->
  response.render "login"

_post.login = (request, response) ->
  if request.body.exist
    loginUser request, response
  else
    quiz.getUser request.body.email, (err, ext) ->
      if ext
        response.render "login",
          error: "User Email ID already exists"

      else
        registerUser request, response


registerUser = (request, response) ->
  password = bcrypt.hashSync(request.body.password)
  new_user =
    email: request.body.email
    password: password

  quiz.addUser new_user, (err) ->
    unless err
      request.session.userEmail = new_user.email
      response.redirect "/quizzes"
    else
      response.render "login",
        error: "Server Error..."



loginUser = (request, response) ->
  user =
    email: request.body.email
    password: request.body.password

  quiz.getUser user.email, (err, existingUser) ->
    unless existingUser
      response.render "login",
        error: "Incorrect E-mail Id or password"

    else
      isValidPassword = bcrypt.compareSync(user.password, existingUser.password)
      if isValidPassword
        request.session.userEmail = user.email
        response.redirect "/quizzes"
      else
        response.render "login",
          error: "Incorrect E-mail Id or password"


_get.allUser = (request, response) ->
  quiz.getAllUsers((error, list) ->
    if not error then response.render("list/allUser/allUser", {list: list}))



users.get = _get
users.post = _post
exports.users = users
