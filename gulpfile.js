'use strict';
var gulp = require("gulp");
var args = require('yargs').argv;
var config = require('./gulp.config')();

var $ = require('gulp-load-plugins')({
	lazy: true
});


//gulp.task('vet', function () {
//
//	log('Analysing source with JsHint and JSCS');
//
//	return gulp
//		.src(config.alljs)
//		.pipe($.jscs())
//		.pipe($.jshint())
//		.pipe($.jshint.reporter('jshint-stylish', {
//			verbose: false
//		}))
//		.pipe($.jshint.reporter('fail'));
//});

gulp.task("wiredep", function () {
	var options = config.getWiredepDefaultOptions();
	var wiredep = require('wiredep').stream;

	return gulp
		.src(config.index) //index.html
		.pipe(wiredep(options))
		.pipe($.inject(gulp.src(config.js)))
		.pipe(gulp.dest(config.client));
});

////////////////

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
