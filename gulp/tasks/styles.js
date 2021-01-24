const gulp = require('gulp');
const plumber = require('gulp-plumber');
const scss = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const filesize = require('gulp-filesize');
const autoprefixer = require('gulp-autoprefixer');
const argv = require('yargs').argv;
const postcss = require('gulp-postcss');
const gulpif = require('gulp-if');
const concat  = require('gulp-concat');

// Работаем со стилями

module.exports = function styles() {
    const plugins = [
        require('postcss-sort-media-queries'),
    ];
  return gulp.src('dev/static/styles/styles.scss')
    .pipe(plumber())
    .pipe(gulpif(!argv.prod, sourcemaps.init()))
    .pipe(scss({ outputStyle: 'expanded' }))
    .pipe(concat('styles.min.css'))
    .pipe(postcss(plugins))
    .pipe(autoprefixer({
      overrideBrowserslist:  [ "last 4 version" ],
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(gulpif(!argv.prod, sourcemaps.write()))
    .pipe(gulp.dest('dist/static/css'))
    .pipe(filesize())
};
