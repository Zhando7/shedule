const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');

var path = {
    styles: {
        src: './dev/scss/**/*.scss',
        dest: './public/stylesheets/'
    },
};

function styles() {
    return gulp
    .src(path.styles.src)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(gulp.dest(path.styles.dest));
}

exports.default = gulp.series(styles);