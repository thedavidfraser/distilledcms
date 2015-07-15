'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	minifycss = require('gulp-minify-css');


// SCSS
gulp.task('sass', function () {
  gulp.src('./dev/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css'))
});


// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('./dev/scss/**/*.scss', ['sass']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'sass']);