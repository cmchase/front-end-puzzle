"use strict"

// Dependencies
var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var less = require('gulp-less');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var runSequence = require('run-sequence');

// Constants
var config = {
	paths: {
		root: './app/',
		index: './app/index.html',
	    js: './app/js/*.js',
	    mainJs: './app/js/main.js',
	    less: './app/less/*.less',
	    style: './app/less/style.less',
	    assets: './app/assets/**/*',
	    dist: {
			root: './dist/',
	      	js: './dist/js/',
	      	css: './dist/css/'
	    }
	}
}

// Tasks
gulp.task('connect', function(){
	connect.server({
		root: 'dist',
		port: 9000
	})
});
gulp.task('compile-js', function() {
	return browserify(config.paths.mainJs)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(uglify({mangle: false}))
		.pipe(gulp.dest(config.paths.dist.js))
});

gulp.task('compile-less', function () {
  return gulp.src(config.paths.style)
    .pipe(less({}))
    .pipe(minifyCSS())
    .pipe(gulp.dest(config.paths.dist.css));
});


gulp.task('copy-index', function() {
	return gulp.src(config.paths.index)
		.pipe(gulp.dest(config.paths.dist.root))
});

gulp.task('copy-assets', function() {
	return gulp.src(config.paths.root + 'assets/**/*', {base:'./app'})
		.pipe(gulp.dest(config.paths.dist.root))
});

gulp.task('watch', function(){
	gulp.watch(config.paths.js, ['compile-js']);
	gulp.watch(config.paths.less, ['compile-less']);
	gulp.watch(config.paths.index, ['copy-index']);
    gulp.watch(config.paths.assets, ['copy-assets']);
})

gulp.task('default', ['connect','watch']);