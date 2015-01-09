var	gameLib = require('../lib/game.js').lib;
var assert = require('chai').assert;
var fs = require('fs');
var dbFileData = fs.readFileSync('tests/data/quiz.db.backup');
var getDb = require('../lib/DBLib.js').create_db('tests/data/quiz.db');
var db;
describe('game', function() {
	 beforeEach(function() {
	 	fs.writeFileSync('tests/data/quiz.db', dbFileData);
	 	db = getDb();
	 });
	
	describe('#load',function()	{
		it('it loads the game from database and creats game object ',function(done){
			var expectedGame = {id:1,name:"GK",duration:"00:30:00",master:"abc@email.com",questions:[{q:'who is PM',a:'modi'}]};
			gameLib.load(1,db,function(err,game){
				assert.notOk(err);
				assert.deepEqual(game,expectedGame);
				done();
			});
		});
	});
});