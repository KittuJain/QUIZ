var assert = require('chai').assert;

describe('#add', function() {
	it('2+3=5', function(done) {
		var add = function() {
			return 2 + 3;
		}
		assert.equal(5, add());
		done();
	});
});

describe('#addWrong', function() {
	it('2+3=5', function(done) {
		var add = function() {
			return 2 + 3;
		}
		assert.equal(6, add());
		done();
	});
});