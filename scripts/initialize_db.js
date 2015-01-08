var location = process.argv[2];
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database(location);
var runAllQueries = function(){	
	var runQuery = function(q){
		console.log(q);
		db.run(q,function(err){
			if(err){
				console.log(err);
				process.exit(1);
			}
		});
	};

	[	
		"create table login(useremail text primary key, password text not null);",
		"create table topics(id integer primary key autoincrement, name text, duration text, useremail text ,foreign key(useremail) references login(useremail));",
	].forEach(runQuery)	;
};
db.serialize(runAllQueries);