'use strict';

module.exports = function () {

	var client = './src/client/';
	var server = './src/server/';

	var config = {

		alljs: ['./src/**/*.js',
				'./*js', '!' + client + 'bower_components/**/*.js'],

		client: client,
		index: client + 'index.html',
		js: [
			  client + '**/*.js',
			'!' + client + '**/*.spec.js',
		'!' + client + 'bower_components/**/*.js'],
		jsIgnorePath: client,
		css: [client + '**/*.css', '!' + client + 'bower_components/**/*.css'],
		server: '',

		//	Bower and Npm Locations
		bower: {
			json: require('./bower.json'),
			directory: client + 'bower_components/',
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
