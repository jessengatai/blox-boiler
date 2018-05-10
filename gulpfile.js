var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var babel = require('gulp-babel');
var del = require('del');
var inject = require('gulp-inject');
var concat = require('gulp-concat');

// setup the local enviroment
gulp.task('localhost', function(){
  connect.server({
    root: 'public',
    livereload: true
  });
});

// watch for changes
gulp.task('watch', function () {
  gulp.watch('./index.html', ['index:update']);
  gulp.watch('./scss/**/*.scss', ['scss']);
  gulp.watch('./js/**/*.js', ['js']);
  gulp.watch('./public/**/*', ['livereload']);
});

// compile sass and log errors in the terminal
gulp.task('scss', function () {
  return gulp.src('./scss/main.scss')
      .pipe(sass({ errLogToConsole: true }))
      .pipe(gulp.dest('./public/css'));
});

// compile our javascript into one file
gulp.task('concat', function() {
  return gulp.src('./js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/js/'));
});

// transpile our ES6 javascript into ES5
gulp.task('js', ['concat'], function() {
  return gulp.src('./public/js/main.js')
      .pipe(babel({
          presets: ['env']
      }))
      .pipe(gulp.dest('./public/js/'))
});

// setup the live reload of public files
gulp.task('livereload', function (){
  gulp.src('./public/**/*')
  .pipe(connect.reload());
});

// clean up all node_module in the ./public/folder
gulp.task('mods:clean', function() {
    // empty the ./public/modules/ directory
    return del([
      './public/modules/**/*',
    ]);
});

// add all node_module assets we might need copied into the public folder
gulp.task('mods:copy', function() {
  sources = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/prismjs/prism.js',
    './node_modules/prismjs/themes/prism.css',
  ]
  return gulp.src( sources ).pipe(gulp.dest('./public/modules/'));
});

// upodate the index.html without clean ups
// (used in gulp default)
gulp.task('index:update', function () {
  var target = gulp.src('./index.html');
  var sources = gulp.src([
    './public/modules/jquery.min.js', // make sure jquery comes first
    './public/modules/**/*.js',
    './public/modules/**/*.css',
    './public/css/**/*.css',
    './public/js/**/*.js',
  ],{read: false});

  return target.pipe(inject(sources, {ignorePath: 'public'}))
    .pipe(gulp.dest('./public/'));
});

// build the index.html and run all dependencies for cleaning up and installing modules
// (used with gulp build)
gulp.task('index:build', ['mods:clean', 'mods:copy'], function () {
  var target = gulp.src('./index.html');
  var sources = gulp.src([
    './public/modules/jquery.min.js', // make sure jquery comes first
    './public/modules/**/*.js',
    './public/modules/**/*.css',
    './public/css/**/*.css',
    './public/js/**/*.js',
  ],{read: false});

  return target.pipe(inject(sources, {ignorePath: 'public'}))
    .pipe(gulp.dest('./public/'));
});


/**
 * Setup Tasks
 */
gulp.task('default', ['localhost', 'watch', 'scss', 'js', 'index:update']);
gulp.task('build', ['scss', 'js', 'index:build']);
