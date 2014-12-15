'use strict';

var gulp      = require('gulp'),
    karma     = require('karma').server,
    uglify    = require('gulp-uglify'),
    rename    = require('gulp-rename');

gulp.task('karma', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  },done);
});

gulp.task('karma-auto', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    autoWatch: true,
    singleRun: false
  },done);
});

gulp.task('compress', function () {
  gulp.src('FastList.js')
  .pipe(uglify())
  .pipe(rename('FastList.min.js'))
  .pipe(gulp.dest('./'));
});

gulp.task('default', ['karma-auto']);

