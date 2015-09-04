/* Configure build */
var site = 'pame',
    dataRoot = './dev/sites/'+site+'/data',
    assetsRoot = './dev/sites/'+site+'/assets';
    destinationRoot = './dist';

/* Require third-party modules */
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


/* Require custom modules */
//Distilled Markup Generator
var distilledMarkup = require('./dev/js/distilled-markup');
    


// Clean
gulp.task('clean', function(cb) {
    del([
      destinationRoot+'/assets',
      destinationRoot+'/*.html'
    ], cb)
});


// SCSS
gulp.task('sass', function () {
  gulp.src(assetsRoot+'/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(destinationRoot+'/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(destinationRoot+'/assets/css'));
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
    .pipe(gulp.dest(destinationRoot+'/assets/js'));
});

// Copy Image assets
gulp.task('copyImageAssets', function() {
  return gulp.src(assetsRoot+'/img/*.*')
    .pipe(gulp.dest(destinationRoot+'/assets/img'));
});


// Copy fonts
gulp.task('copyFontAssets', function() {

  var src = [
        assetsRoot+'/fonts/fonts/icomoon.eot',
        assetsRoot+'/fonts/fonts/icomoon.svg',
        assetsRoot+'/fonts/fonts/icomoon.ttf',
        assetsRoot+'/fonts/fonts/icomoon.woff'
      ];

  return gulp.src(src)
    .pipe(gulp.dest('./dist/assets/fonts'));
});


//Create index with Distilled Markup Generator
gulp.task('distilledMarkup', function() {
  var dataRoot = '../sites/'+site+'/data',
      dataSrc = dataRoot+'/index',
      settingsSrc = dataRoot+'/settings',
      markupFooterSrc = dataRoot+'/markup-footer';

  var str = distilledMarkup(dataSrc, settingsSrc, markupFooterSrc);

  return file('index.html', str, { src: true })
    .pipe(gulp.dest(destinationRoot));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(assetsRoot+'/scss/*.scss', ['sass']);
  gulp.watch(['./dev/js/*.js', dataRoot+'/*.js'], ['jshint', 'distilledMarkup']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean'], function(){
  gulp.start('watch', 'sass', 'jshint', 'copyJsAssets', 'copyImageAssets', 'copyFontAssets', 'distilledMarkup');
});

