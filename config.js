'use strict';
module.exports = {

	database: "mongodb://localhost/flyfishing",


	secret: "fuzzy rubber ducky snacks"
};

module.exports = function () {

	var client = '.src/public/';
	var clientApp = client + 'app/';

	var config = {
		temp: './.tmp/',
		alljs: ['.src/**/*.js', './*js'],
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
