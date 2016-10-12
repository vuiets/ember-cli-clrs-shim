/* jshint node: true */
'use strict';

var defaults = {
	css: true
};

module.exports = {
	name: 'ember-cli-clrs-shim',

	included: function (app, parentAddon) {
		this._super.included.apply(this, arguments);

		// colors.css -> assets/vendor.css
		this.importClrs(app);
	},

	importClrs: function (app) {
		var options = (app && app.options['Clrs']) || {},
			cssOption = options.css,
			importCSS = (cssOption === null || cssOption === undefined) ? defaults.css : cssOption;

		if (importCSS) {
			app.import({
				development: 'vendor/colors.css',
				production: 'vendor/colors.min.css'
			});
		}
	}
};
