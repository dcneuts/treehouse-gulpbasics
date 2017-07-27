"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');

// use gulp to combine multiple JS scripts into one file
gulp.task("concatScripts", function () {
	gulp.src([
		'js/jquery.js',
		'js/sticky/jquery.sticky.js',
		'js/main.js'])
	    .pipe(concat("app.js"))
	    // dest method writes to disk
		.pipe(gulp.dest("js"))
});

gulp.task("default", ["hello"], function () {
	console.log("This is the default task!")
});