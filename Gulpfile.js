'use strict';

var gulp      = require('gulp'),
    karma     = require('karma').server;

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

gulp.task('default', ['karma-auto']);

