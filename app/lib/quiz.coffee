sqlite3 = require("sqlite3").verbose();

_addUser = (user, db, onComplete) ->
  insertUserQuery = "insert into login(useremail,password) values('#{user.email}', '#{user.password}')"
  db.run insertUserQuery, (err) ->
    _getUser user.email, db, onComplete

_getUser = (userEmail, db, onComplete) ->
  selectUserQuery = "select * from login where useremail='#{userEmail}'"
  db.get selectUserQuery, (err, user) ->
    if err
      console.log err
    onComplete null, user


init = (location) ->

  operate = (operation) ->
    ->
      onComplete = if arguments.length == 2 then arguments[1] else arguments[0]
      arg = arguments.length == 2 and arguments[0]

      onDBOpen = (err) ->
        if err
          onComplete err
          return
        db.run 'PRAGMA foreign_keys = \'ON\';'
        arg and operation(arg, db, onComplete)
        arg or operation(db, onComplete)
        db.close()

      db = new (sqlite3.Database)(location, onDBOpen)

  records =
    addUser: operate(_addUser)
    getUser: operate(_getUser)

  records

exports.init = init
