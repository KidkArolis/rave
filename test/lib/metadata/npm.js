var buster = require('buster');
var assert = buster.assert;
var refute = buster.refute;

var npm = require('../../../lib/metadata/npm');

buster.testCase('lib/metadata/npm', {

	createDescriptor: {
		'should not append main dirname to location': function() {
			var npmTest = Object.create(npm, {
				pkgRoot: { value: 'existing/part' }
			});

			var dsc = npmTest.createDescriptor({
				main: 'deep/path/to/main.js'
			});

			assert.equals(dsc.location, 'existing/part');
		},

		'should remove file extension': function() {
			var dsc = npm.createDescriptor({
				main: 'deep/path/to/main.js'
			});

			assert.equals(dsc.main, 'deep/path/to/main');
		},

		'should use moduleType if specified': function() {
			var dsc = npm.createDescriptor({
				moduleType: ['a', 'b']
			});

			assert.equals(dsc.moduleType, ['a', 'b']);
		},

		'should default moduleType to ["node"] if not specified': function() {
			var dsc = npm.createDescriptor({});

			assert.equals(dsc.moduleType, ['node']);
		}
	}

});
