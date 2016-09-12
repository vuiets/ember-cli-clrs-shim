/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function (defaults) {
	var app = new EmberAddon(defaults, {
		/**
		 * Add options here
		 *
		 * To prevent colors.css import set,
		 *
		 * 	Clrs: {
		 * 		css: false
		 * 	}
		 */
	});

	return app.toTree();
};
