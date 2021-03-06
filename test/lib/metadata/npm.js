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
		},

		'should use browser field as main if it is a string': function () {
			var dsc = npm.createDescriptor({
				main: 'deep/path/to/main.js',
				browser: 'deep/path/to/browser.js'
			});

			assert.equals(dsc.main, 'deep/path/to/browser');
		},

		'should use a normalized browser field as map if it is an object': function () {
			this.stub(npm, 'normalizeMap', function (moduleName) {
				return moduleName;
			});

			var browser = {
				'a': 'b',
				'./relative/module': './relative/browser/module',
				'fs': false
			};

			var dsc = npm.createDescriptor({
				name: 'foo',
				version: '2.0.0',
				main: 'deep/path/to/main.js',
				browser: browser
			});

			assert.equals(dsc.main, 'deep/path/to/main');
			assert.equals(dsc.map, browser);
			assert.calledOnceWith(npm.normalizeMap, browser, 'foo/index');
		}
	},

	normalizeMap: {
		'should normalize each key/value in an object': function () {
			assert.equals(npm.normalizeMap({
				'a': 'b',
				'./relative/module': './relative/browser/module',
				'fs': false
			}, 'foo/index'), {
				'a': 'b',
				'foo/relative/module': 'foo/relative/browser/module',
				'fs': false
			});
		}
	}

});
