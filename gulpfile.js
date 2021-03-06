"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var del = require('del');

// use gulp to combine multiple JS scripts into one file
gulp.task("concatScripts", function () {
	return gulp.src([
		'js/jquery.js',
		'js/sticky/jquery.sticky.js',
		'js/main.js'])
		// adding JS maps on line below when concat is run
		.pipe(maps.init())
	    .pipe(concat("app.js"))
		// using write method to write the file, use relative path
		// to show where the maps should live
		.pipe(maps.write('./'))
	    // dest method writes to disk
		.pipe(gulp.dest("js"))
});

// below I placed in concat as a dependency of minify, but will
// now require return statements in each task function block
gulp.task("minifyScripts", ["concatScripts"], function () {
	// calling uglify to minify app.js and then dump what's in mem to disk
	// placing the output in the JS folder
	return gulp.src("js/app.js").pipe(uglify())
	    //needed to add gulp rename to not overwrite main js
	    .pipe(rename('app.min.js'))
	    .pipe(gulp.dest("js"));
});

gulp.task('compileSass', function () {
	return gulp.src("scss/application.scss")
		// added maps.init module to this function to create maps when compiled
		.pipe(maps.init())
		.pipe(sass())
		// path is relative to output directory
		// will output maps in same folder as combined css
		.pipe(maps.write('./'))
		.pipe(gulp.dest('css'))
});

gulp.task('watchFiles', function () {
	// watch task doesn't have another task depend on it
	// therefore no return needed, unlike the others
	// Below uses a globbing pattern to match files
	// Instead of listing all of them manually in array

	// First block watches SCSS and runs compileSass when needed
	// Second block runs concat when JS changes
	gulp.watch('scss/**/*.scss', ['js/main.js', 'compileSass']);
	gulp.watch ('js/main.js', ['concatScripts']);
});

gulp.task('clean', function () {
	del(['dist', 'css/application.css*', 'js/app*.js*']);
});

gulp.task("build", ['concatScripts', 'minifyScripts', 'compileSass'], function() {
	// base keeps directory structure intact and provides relative base for tree
	return gulp.src(["css/application.css", "js/app.min.js", 'index.html', "img/**", "fonts/**"], {base: "./"})
		.pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function () {
	gulp.start('build');
});