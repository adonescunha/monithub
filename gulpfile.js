var gulp = require('gulp'),
    useref = require('gulp-useref'),
    karma = require('karma').server;

gulp.task('express', function() {
  require('./index');
});

gulp.task('test', [], function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('serve', ['express']);

gulp.task('default', ['copy', 'serve']);
