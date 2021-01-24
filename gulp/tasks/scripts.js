const gulp = require('gulp');
const concat = require('gulp-concat');
const webpack  = require('webpack-stream');
const eslint = require('gulp-eslint');

module.exports = function scripts() {
    return gulp.src('dev/static/js/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(webpack({
            mode: 'production',
            performance: {
                hints: false,
                maxEntrypointSize: 512000,
                maxAssetSize: 512000
            },
            devtool: 'eval-source-map',
            module: {
                rules: [
                    {
                        test: /\.(js)$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['@babel/env'],
                            plugins: ['babel-plugin-root-import']
                        }
                    }
                ]
            }
        })).on('error', function handleError() {
            this.emit('end')
        })
        .pipe(concat('build.js'))
        .pipe(gulp.dest('dist/static/js/'))
}