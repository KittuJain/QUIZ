var lib = require('../lib/quiz.js');
var assert = require('chai').assert;
var fs = require('fs');
var dbFileData = fs.readFileSync('tests/data/quiz.db.backup');

var quiz;
describe('quiz', function() {
	beforeEach(function() {
		fs.writeFileSync('tests/data/quiz.db', dbFileData);
		quiz = lib.init('tests/data/quiz.db');
	});
	
	describe('#logInUser',function(){
		it('registers the new user',function(done){
			var new_user = {"email":"ram@email.com","password":"ram"};
			quiz.addUser(new_user,function(err){
				assert.notOk(err);
				quiz.getUser(new_user.email,function(err,user){
					assert.deepEqual(user,{"useremail":"ram@email.com","password":"ram"});
					done();
				});
			});
		});

		it('login ram with emailId as ram@email.com and password as ram',function(done){
			var  user = {"email":"ram@email.com","password":"ram"};
			quiz.getUser(user.email,function(err,user){
				assert.deepEqual(user,{"useremail":"ram@email.com","password":"ram"});
				done();
			});
			done();
		});
	});
});