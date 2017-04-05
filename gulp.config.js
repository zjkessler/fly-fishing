'use strict';

module.exports = function () {

	var client = './src/client/';
	var server = './src/server/'

	var config = {

		alljs: ['./src/**/*.js',
				'./*js'],

		client: client,
		index: client + 'index.html',
		js: [client + '**/*.module.js',
			 client + '**/*.js',
			'!' + client + '**/*.spec.js'],
		css: client + '**/*.css',
		server: '',

		//	Bower and Npm Locations
		bower: {
			json: require('./bower.json'),
			directory: './bower_components/',
			ignorePath: '../..'
		},
		//NODE 
		defaultPort: 8000,
		nodeServer: server + 'server.js'
	};

	config.getWiredepDefaultOptions = function () {
		var options = {
			bowerJson: config.bower.json,
			directory: config.bower.directory,
			ignorePath: config.bower.ignorePath
		};
		return options;
	};
	return config;
};
