'use strict';
var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();

var $ = require('gulp-load-plugins')({
	lazy: true
});
var port = process.env.PORT || config.defaultPort;
var browsersync = require('browser-sync');


gulp.task('vet', function () {
	log('Analysing source with JsHint and JSCS');
	return gulp
		.src(config.alljs)
		.pipe($.if(args.verbose, $.print()))
		.pipe($.jscs())
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish', {
			verbose: true
		}))
		.pipe($.jshint.reporter('fail'));
});

gulp.task('wiredep', function () {
	log('Wire up bower css js and app js into html');
	var options = config.getWiredepDefaultOptions();
	var wiredep = require('gulp-wiredep');
	console.log();
	return gulp
		.src(config.index)
		.pipe(wiredep(options))
		.pipe($.inject(gulp.src(config.js)))
		.pipe(gulp.dest(config.client));

});

gulp.task('inject', ['wiredep'], function () {
	log('Wire up app css into html');
	return gulp
		.src(config.index)
		.pipe($.inject(gulp.src(config.css)))
		.pipe(gulp.dest(config.client));
});



gulp.task('serve-dev', ['inject'], function () {

	var isDev = true;

	var nodeOptions = {
		script: config.nodeServer,
		delaytime: 1,
		env: {
			'PORT': port,
			'NODE_ENV': isDev ? 'dev' : 'build',
		},
		watch: [config.server]
	};

	return $.nodemon(nodeOptions)
		.on('restart', ['vet'], function () {
			log('*** nodemon restarted');
		}).on('start', function () {
			log('*** nodemon started');
			startBrowserSync();
		}).on('crash', function () {
			log('*** nodemon crashed!');
		}).on('exit', function () {
			log('*** nodemon exited');
		});
});

gulp.task('jsReload', ['serve-dev'], function (done) {
	browsersync.reload();
	done();

});

////////////////
function startBrowserSync() {
	if (browsersync.active) {
		return;
	}
	log('Starting browser-sync on port' + port);
	var options = {
		proxy: 'localhost:' + port,
		port: 3000,
		files: [config.client + '**/*.*'],
		ghostMode: {
			clicks: true,
			location: false,
			forms: true,
			scroll: true
		},
		injectChanges: true,
		logFileChanges: true,
		logLevel: 'debug',
		logPrefix: -'gulp-patterns',
		notify: true,
		reloadDelay: 1000
	};
}

function log(msg) {
	if (typeof (msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.blue(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.blue(msg));
	}

}
