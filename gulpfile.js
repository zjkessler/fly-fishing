'use strict';
var gulp = require("gulp");
var $ = require('gulp-load-plugins')({
	lazy: true
});

gulp.task('jshint'function () {
	return gulp
		.src()
});

gulp.task("wiredep", function () {
	var options = config.getWiredepDefaultOPtions();
	var wiredep = require('wiredep').stream;

	return gulp
		.src(config.index) //index.html
		.pipe(wiredep(options))
		.pipe($.inject(gulp.src(config.js)))
		.pipe(gulp.dest(config.client));
})
