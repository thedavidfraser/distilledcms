var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    del = require('del'),

    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),

    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
//    notify = require('gulp-notify');


// Clean
gulp.task('clean', function(cb) {
    del([
      './dist/css',
      './dist/js',
      './dist/fonts',
      './dist/*.html'
    ], cb)
});


// SCSS
gulp.task('sass', function () {
  gulp.src('./dev/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css'));
//    .pipe(notify({ message: 'SASS task end' }));
});


// JS hint
gulp.task('jshint', function() {
  return gulp.src('./dev/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


// Browserify
gulp.task('browserify', function() {
    return browserify('./dev/js/app.js')
        .bundle()
        // Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Convert from streaming to buffered vinyl file object
        .pipe(buffer())
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
//        .pipe(notify({ message: 'Browserify task end' }));
});


// Copy JS assets
gulp.task('copyJsAssets', function() {

  var src = [
        './bower_components/jquery/dist/jquery.min.js'
      ];

  return gulp.src(src)
    .pipe(gulp.dest('./dist/js'));
//    .pipe(notify({ message: 'Copy JS assets task end' }));
});

// Copy Image assets
gulp.task('copyImageAssets', function() {

  var src = [
        './dev/img/*.*'
      ];

  return gulp.src(src)
    .pipe(gulp.dest('./dist/img'));
//    .pipe(notify({ message: 'Copy Image assets task end' }));
});

// Copy HTML assets
gulp.task('copyHtmlAssets', function() {

  var src = [
        './dev/**/*.html'
      ];

  return gulp.src(src)
    .pipe(gulp.dest('./dist'));
//    .pipe(notify({ message: 'Copy HTML assets task end' }));
});

// Copy fonts
gulp.task('copyFontAssets', function() {

  var src = [
        './dev/fonts/fonts/icomoon.eot',
        './dev/fonts/fonts/icomoon.svg',
        './dev/fonts/fonts/icomoon.ttf',
        './dev/fonts/fonts/icomoon.woff'
      ];

  return gulp.src(src)
    .pipe(gulp.dest('./dist/fonts'));
//    .pipe(notify({ message: 'Copy fonts task end' }));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('./dev/scss/**/*.scss', ['sass']);
  gulp.watch('./dev/js/**/*.js', ['jshint', 'browserify']);
  gulp.watch('./dev/**/*.html', ['copyHtmlAssets']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean'], function(){
  gulp.start('watch', 'sass', 'jshint', 'browserify', 'copyJsAssets', 'copyHtmlAssets', 'copyFontAssets', 'copyImageAssets');
});

