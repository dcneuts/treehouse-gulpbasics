"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

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
// tasks

gulp.task("minifyScripts", function () {
	// calling uglify to minify app.js and then dump what's in mem to disk
	// placing the output in the JS folder
	gulp.src("js/app.js").pipe(uglify())
	    //needed to add gulp rename to not overwrite main js
	    .pipe(rename('app.min.js'))
	    .pipe(gulp.dest("js"));
});

gulp.task('compileSass', function () {
	gulp.src("scss/application.scss")
		.pipe(sass())
		.pipe(gulp.dest('css'))
});

gulp.task("default", ["hello"], function () {
	console.log("This is the default task!")
});