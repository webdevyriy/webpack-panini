const panini = require('panini');
const ext_replace = require('gulp-ext-replace');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const htmlValidator = require('gulp-w3c-html-validator');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');

module.exports = function paniniHtml() {
        panini.refresh();
        return gulp.src('./dev/panini/pages/**/*.{html,hbs,handlebars}')
            .pipe(plumber())
            .pipe(panini({
                root: './dev/panini/pages/',
                layouts: './dev/panini/layouts/',
                partials: './dev/panini/partials/',
                helpers: './dev/panini/helpers/',
                data: './dev/panini/data/'
            }))
            .pipe(ext_replace('.html'))
            .pipe(gulpif(argv.prod, htmlValidator()))
            .pipe(gulp.dest('dist'))
};
