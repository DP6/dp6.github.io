const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const del = require('del');
const replace = require('gulp-replace');

function clean() {
  return del(["src/*.css"]);
}

function concat() {
  return gulp.src('assets/css/*.css')
    .pipe(replace(/@import.+\.css";$/g, ''))
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest('src/'));
}

function minifyCss() {
  return gulp.src('src/bundle.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('src'));
}

const build = gulp.series(clean, concat, minifyCss);

exports.default = build;
exports.build = build;