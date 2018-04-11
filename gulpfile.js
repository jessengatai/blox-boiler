var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var babel = require('gulp-babel');
var del = require('del');

// setup the local enviroment
gulp.task('localhost', function(){
  connect.server({
    root: 'public',
    livereload: true
  });
});

// watch for changes
gulp.task('watch', function () {
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

// transpile our ES6 javascript into ES5
gulp.task('js', function() {
  return gulp.src('./js/*.js')
      .pipe(babel({
          presets: ['env']
      }))
      .pipe(gulp.dest('./public/js'))
});

// setup the live reload of public files
gulp.task('livereload', function (){
  gulp.src('./public/**/*')
  .pipe(connect.reload());
});

// add all node_module plugins we might need into their respective public folders
gulp.task('modules:add', function() {
  sources = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/prismjs/prism.js',
    './node_modules/prismjs/themes/prism.css',
  ]
  return gulp.src( sources ).pipe(gulp.dest('./public/modules/'));
});

// clean up all node_module in the ./public/folder
gulp.task('modules:remove', function() {
    // empty the ./public/modules/ directory
    return del([
      './public/modules/**/*',
    ]);
});


/**
 * Setup Tasks
 */
gulp.task('default', ['localhost', 'watch', 'scss', 'js']);
gulp.task('build', ['modules:remove', 'modules:add','scss', 'js']);
