var sqlite3 = require("sqlite3").verbose();

var _getTopics = function(userEmail,db,onComplete){
	var selectTopicsQuery = "select id,name,duration from topics where useremail != '"+userEmail+"';"
	console.log('-------',selectTopicsQuery);
	db.all(selectTopicsQuery,function(err,topics){
		err || onComplete(null,topics);
	});
};

var init = function(location) {
	var operate = function(operation) {
		return function() {
			var onComplete = (arguments.length == 2) ? arguments[1] : arguments[0];
			var arg = (arguments.length == 2) && arguments[0];
			var onDBOpen = function(err) {
				if (err) {
					onComplete(err);
					return;
				}
				db.run("PRAGMA foreign_keys = 'ON';");
				arg && operation(arg, db, onComplete);
				arg || operation(db, onComplete);
				db.close();
			};
			var db = new sqlite3.Database(location, onDBOpen);
		};
	};

	var records = {
		getTopics:operate(_getTopics)
	};

	return records;
};

exports.init = init;