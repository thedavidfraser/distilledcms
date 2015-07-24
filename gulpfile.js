var gulp = require('gulp'),
    file = require('gulp-file');
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

//Distilled Markup Generator
var distilledMarkup = require('./dev/js/distilled-markup');
    


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
});


// JS hint
gulp.task('jshint', function() {
  return gulp.src('./dev/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


// Browserify
/* Used to generate distilledMarkup in the browser, currently not required
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
});
*/


// Copy JS assets
gulp.task('copyJsAssets', function() {

  var src = [
        './bower_components/jquery/dist/jquery.min.js'
      ];

  return gulp.src(src)
    .pipe(gulp.dest('./dist/js'));
});

// Copy Image assets
gulp.task('copyImageAssets', function() {

  var src = [
        './dev/img/*.*'
      ];

  return gulp.src(src)
    .pipe(gulp.dest('./dist/img'));
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
});


//Create index with Distilled Markup Generator
gulp.task('distilledMarkup', function() {
  var str = distilledMarkup();
  return file('index.html', str, { src: true })
    .pipe(gulp.dest('dist'));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('./dev/scss/**/*.scss', ['sass']);
  gulp.watch('./dev/js/**/*.js', ['jshint', 'distilledMarkup']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean'], function(){
  gulp.start('watch', 'sass', 'jshint', 'copyJsAssets', 'copyImageAssets', 'copyFontAssets', 'distilledMarkup');
});

