/*jshint node:true*/
module.exports = {
	description: 'The default blueprint for ember-cli-clrs-shim addon.',

	normalizeEntityName: function (entityName) {
		return entityName;
	},

	afterInstall: function (options) {
		var promise = new Promise((resolve, reject) => {
			this.addPackageToProject('colors.css', '3.0.0').then((success) => {
				try {
					var fs = require('fs');

					['colors.css', 'colors.min.css'].forEach((file) => {
						fs.createReadStream('node_modules/colors.css/css/' + file)
							.pipe(fs.createWriteStream('vendor/' + file));
					});
				} catch (err) {
					throw err;
				}
			});
		});

		return promise;
	}
};
