'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var mergeStream = require('merge-stream');
var del = require('del');

gulp.task('dev', devTask);
gulp.task('jade', jadeTask);
gulp.task('less', lessTask);
gulp.task('babel', babelTask);
gulp.task('build', buildTask);
gulp.task('clean', clearTask);

function buildTask() {
  var s1 = jadeTask();
  var s2 = babelTask();
  var s3 = lessTask();

  return mergeStream(s1, s2, s3);
}

function devTask() {
  gulp.watch('./src/**/*.jade', ['jade']);
  gulp.watch('./src/**/*.less', ['less']);
  gulp.watch('./src/**/*.js', ['babel']);
}

function jadeTask() {
  return gulp.src('./src/**/*.jade')
  .pipe(plugins.plumber())
  .pipe(plugins.jade())
  .pipe(gulp.dest('./dist'));
}

function lessTask() {
  return gulp.src('./src/**/*.less')
  .pipe(plugins.plumber())
  .pipe(plugins.less())
  .pipe(gulp.dest('./dist'));
}

function babelTask() {
  return gulp.src('./src/**/*.js')
  .pipe(plugins.plumber())
  .pipe(plugins.babel({ modules: 'umd' }))
  .pipe(gulp.dest('./dist'));
}

function clearTask(done) {
  var clean = [
    './dist/bg/*',
  ];

  var keep = [
    './dist/bg/node_modules',
    './dist/bg/package.json',
    './dist/bg/.gitkeep',
  ];

  del(clean, { ignore: keep }, done);
}
