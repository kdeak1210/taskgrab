const gulp = require('gulp');
const gp_concat = require('gulp-concat');
const gp_rename = require('gulp-rename');
const gp_uglify = require('gulp-uglify');
const minifyCSS = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const path = require('path');

gulp.task('css', () => {
  return gulp.src(
    [
      './public/assets/css/main.css'
    ]
  )
  .pipe(minifyCSS())
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
  .pipe(gp_concat('style.min.css'))
  .pipe(gulp.dest('./public/build/css/'));
});

gulp.task('js', () => {
  return gulp.src(
    [
      './public/assets/js/jquery.min.js',
      './public/assets/js/skel.min.js',
      './public/assets/js/util.js',
      './public/assets/js/main.js',      
    ]
  )
  .pipe(gp_concat('gulp-concat.js'))
  .pipe(gulp.dest('./public/min'))
  .pipe(gp_rename('vendor.min.js'))
  .pipe(gp_uglify())
  .pipe(gulp.dest('./public/build'));
});

gulp.task('watch', () => {
  gulp.watch(
    // Watch these files
    [
      './src/**.js',
      './src/*/**.js',
      './src/*/*/**.js',
      './src/*/*/*/**.js'
    ],
    // And run these tasks
    [
      'css',
      'js'
    ]
  );
})

// Default task: (run these scripts, in order)
gulp.task('default', ['css', 'js', 'watch'], () => {});
gulp.task('prod', ['css', 'js'], () => {});
