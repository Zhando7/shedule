const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

var path = {
    styles: {
        src: './dev/scss/**/*.scss',
        dest: './public/stylesheets/'
    },
    scripts: {
        src: [ './dev/scripts/*.js', './dev/scripts/admin/month.js' ],
        dest: './public/javascripts/'
    }
};

function styles() {
    return gulp
    .src(path.styles.src)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(gulp.dest(path.styles.dest));
}

function scripts() {
    return gulp
    .src(path.scripts.src[0])
    .pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(path.scripts.dest));
}

function admin() {
    return gulp
    .src(path.scripts.src[1])
    .pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(concat('month.min.js'))
    .pipe(gulp.dest(path.scripts.dest));
}

exports.default = gulp.series(gulp.parallel(styles, scripts, admin));