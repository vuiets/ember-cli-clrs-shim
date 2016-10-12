var chai = require('chai');
var chaifs = require('chai-fs');
var glob = require('glob');
var AddonTestApp = require('ember-cli-addon-tests').AddonTestApp;

var expect = chai.expect;
chai.use(chaifs);

describe('acceptance: import colors css', function () {
	this.timeout(300000);

	var app;

	before(function () {
		app = new AddonTestApp();
		return app.create('sandbox');
	});

	it('imports colors.css by default', function () {
		return app.runEmberCommand('build')
			.then(function () {
				var navyBgClass = new RegExp('.bg-navy { background-color: #001F3F; }', 'i'),
					navyClrClass = new RegExp('.navy { color: #001F3F; }', 'i'),
					navyBorderClass = new RegExp('.border--navy { border-color: #001F3F; }', 'i'),
					vendorCSSPath = app.filePath('dist/assets/vendor.css');

				expect(vendorCSSPath).to.be.a.file();
				expect(vendorCSSPath).to.be.a.file().and.not.empty;
				expect(vendorCSSPath).to.have.content.that.match(navyBgClass);
				expect(vendorCSSPath).to.have.content.that.match(navyClrClass);
				expect(vendorCSSPath).to.have.content.that.match(navyBorderClass);
			})
	});

	it('imports colors.min.css for production builds with --environment=production', function () {
		var vendorCSSPath = 'dist/assets/vendor-*.css';

		return app.runEmberCommand('build', '--environment=production')
			.then(function () {
				expect(fingerprintedAssetAt(vendorCSSPath)).to.be.a.file();
				expect(fingerprintedAssetAt(vendorCSSPath)).to.be.a.file().and.not.empty;
			})
	});

	function fingerprintedAssetAt(path) {
		var globPath = app.filePath(path);
		var files = glob.sync(globPath);

		expect(files.length).to.equal(1, globPath);

		return files[0];
	}
});
