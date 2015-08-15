lib = require("../lib/quiz.js")
assert = require("chai").assert
fs = require("fs")
dbFileData = fs.readFileSync("tests/data/quiz.db.backup")
quiz = undefined
describe "quiz", ->
  beforeEach ->
    fs.writeFileSync "tests/data/quiz.db", dbFileData
    quiz = lib.init("tests/data/quiz.db")

  describe "#logInUser", ->
    it "registers the new user", (done) ->
      new_user =
        email: "ram@email.com"
        password: "ram"

      quiz.addUser new_user, (err) ->
        assert.notOk err
        quiz.getUser new_user.email, (err, user) ->
          assert.deepEqual user,
            useremail: "ram@email.com"
            password: "ram"

          done()



    it "login abc with emailId as abc@email.com and password as abc", (done) ->
      user =
        email: "abc@email.com"
        password: "abc"

      quiz.getUser user.email, (err, existing_user) ->
        assert.deepEqual existing_user,
          useremail: "abc@email.com"
          password: "abc"

        done()


    it "doesn't login abc with emailId as abc@email.com and wrong password as pqr", (done) ->
      user =
        email: "abc@email.com"
        password: "pqr"

      quiz.getUser user.email, (err, existing_user) ->
        assert.notEqual existing_user, user
        done()


    it "doesn't login krati when not registered and tries to login", (done) ->
      user =
        email: "krati@email.com"
        password: "krati"

      quiz.getUser user.email, (err, existing_user) ->
        assert.notOk existing_user
        done()
