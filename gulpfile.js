var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var babel = require('gulp-babel');
var del = require('del');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


// setup the local enviroment
gulp.task('localhost', function(){
  connect.server({
    root: 'public',
    livereload: true
  });
});

// watch for changes
gulp.task('watch', function () {
  gulp.watch('./index.html', ['public:inject']);
  gulp.watch('./scss/**/*.scss', ['public:scss']);
  gulp.watch('./js/**/*.js', ['public:js']);
  gulp.watch('./public/**/*', ['livereload']);
});

gulp.task('public:inject', function () {
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

// compile sass and log errors in the terminal
gulp.task('public:scss', function () {
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
gulp.task('public:js', ['concat'], function() {
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

// clean up all files inside the public folder
gulp.task('public:clean', function() {
    return del([
      './public/index.html',
      './public/assets/**/*',
      './public/modules/**/*',
      './public/css/**/*',
      './public/js/**/*',
      './public/**/.DS_Store'
    ]);
});

// copy all node_module assets we might need copied into the public folder
gulp.task('public:mods', function() {
  sources = [
    './node_modules/jquery/dist/jquery.min.js'
  ]
  return gulp.src( sources ).pipe(gulp.dest('./public/modules/'));
});

// copy all our remaining assets into /public
gulp.task('public:assets', function() {
  return gulp.src( './assets/**/*' ).pipe(gulp.dest('./public/assets/'));
});


// build and minify css for dist (this is messy AF)
gulp.task('dist:css', function() {
  return gulp.src('./scss/main.scss')
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .pipe(rename('blox.min.css'))
    .pipe(gulp.dest('./dist/'));
});

// build and minify sass for dist
gulp.task('dist:sass', function() {
    sources = [
      './scss/_variables.scss',
      './scss/_mixins.scss',
      './scss/_reset.scss',
      './scss/_data.scss',
      './scss/_tags.scss',
      './scss/_text.scss',
      './scss/_forms.scss',
      './scss/_buttons.scss',
      './scss/_boxes.scss',
      './scss/_stickies.scss',
      './scss/_modal.scss',
      './scss/_responsive.scss',
      './scss/_utils.scss'
    ];
    return gulp.src(sources)
      .pipe(concat('blox.scss'))
      .pipe(gulp.dest('./dist/'));
});

// build and minify javascript for dist (this is messy AF)
gulp.task('dist:js', function() {
  return gulp.src('./js/*.js')
    .pipe(concat('main.js'))
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(rename('blox.min.js'))
    .pipe(gulp.dest('./dist/'));
});

// clean up certain directories
gulp.task('dist:clean', function() {
  return del([
    './dist/**/*'
  ]);
});

// this is messy AF. clean this up.
const injectPubIndexHTML = () => {
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
}

// listen for changes!
gulp.task('default', [
  'localhost',
  'watch',
  'public:scss',
  'public:js',
  'public:assets'
], function() {
  injectPubIndexHTML();
});

// launch the rocket!
gulp.task('build', [
  'public:clean',
  'public:scss',
  'public:js',
  'public:mods',
  'public:assets',
  'dist:clean',
  'dist:css',
  'dist:js',
  'dist:sass'
], function() {
  injectPubIndexHTML();
});
