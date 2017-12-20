const gulp = require('gulp');
const gp_concat = require('gulp-concat');
const gp_rename = require('gulp-rename');
const gp_uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const path = require('path');

gulp.task('css', () => {
  return gulp.src(
    [
      './public/assets/css/main.css',
      './public/assets/css/sweetalert2.min.css'
    ]
  )
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
  .pipe(gp_concat('style.min.css'))
  .pipe(gulp.dest('./public/build/css/'));
});

// Restore some relative file paths from the downloaded theme
gulp.task('copy', () => {
  return gulp.src(
    [
      './public/assets/fonts/**'
    ]
  )
  .pipe(gulp.dest('./public/build/fonts/'))
});

gulp.task('js', () => {
  return gulp.src(
    [
      './public/assets/js/jquery.min.js',
      './public/assets/js/skel.min.js',
      './public/assets/js/util.js',
      './public/assets/js/main.js',
      './public/assets/js/sweetalert2.min.js',
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
gulp.task('default', ['css', 'copy', 'js', 'watch'], () => {});
gulp.task('prod', ['css', 'copy', 'js'], () => {});
