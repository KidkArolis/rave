var buster = require('buster');
var assert = buster.assert;
var refute = buster.refute;
var fail = buster.assertions.fail;

var findRequires = require('../../lib/findRequires');

buster.testCase('findRequires', {

	'// should find require("<id>")': function () {
		assert(false, 'not implemented');
	},

	'// should find require.named': function () {
		assert(false, 'not implemented');
	},

	'// should not find require() in a RegExp': function () {
		assert(false, 'not implemented');
	}

});
