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
	
});