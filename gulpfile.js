'use strict';
var gulp = require("gulp");
var config = require('./gulp.config');

var $ = require('gulp-load-plugins')({
	lazy: true
});


gulp.task('vet', function () {
	return gulp
		.src(config.alljs)
		.pipe($.jscs())
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish', {
			verbose: true
		}));
	//		.pipe($.jshint.reporter('fail'));
});

gulp.task("wiredep", function () {
	var options = config.getWiredepDefaultOPtions();
	var wiredep = require('wiredep').stream;

	return gulp
		.src(config.index) //index.html
		.pipe(wiredep(options))
		.pipe($.inject(gulp.src(config.js)))
		.pipe(gulp.dest(config.client));
});
