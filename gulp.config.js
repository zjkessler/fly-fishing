module.exports = function () {
	'use strict';

	var client = '.src/client/';
	var clientApp = client + 'app/';

	var config = {
		temp: './.tmp/',
		alljs: ['.src/**/*.js',
				'./*js'],
		client: client,
		index: client + 'index.html',
		js: [clientApp + '**/*.module.js', clientApp + '**/*.js']
	};

	config.getWiredepDefaultOPtions = function () {
		var options = {
			bowerJson: config.bower.json,
			directory: config.bower.directory,
		};
		return options;
	};
	return config;
};
