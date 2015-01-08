var lib = require('../lib/quiz');
var assert = require('chai').assert;
var fs = require('fs');
var dbFileData = fs.readFileSync('tests/data/quiz.db.backup');

var quiz;
describe('quiz', function() {
	beforeEach(function() {
		fs.writeFileSync('tests/data/quiz.db', dbFileData);
		quiz = lib.init('tests/data/quiz.db');
	});

	describe('#getTopics', function() {
		it('retrives the all the topic ids,names other than the owners', function(done) {
			var userEmail = 'abc@email.com';
			var expected = [{
				id: 2,
				name: 'SS',
				duration: '00:20:00'
			}, {
				id: 3,
				name: 'Language',
				duration: '00:15:00'
			}];
			quiz.getTopics(userEmail, function(err, topics) {
				assert.notOk(err);
				assert.deepEqual(topics, expected);
				done();
			});
		});
	});

});