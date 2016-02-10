var gulp = require('gulp'),
    useref = require('gulp-useref'),
    karma = require('karma').server;

gulp.task('copy', function() {
  var src = './layout/monithub/_site/css/*.css';
  gulp.src(src)
    .pipe(gulp.dest('./public/css'));
});

gulp.task('express', function() {
  require('./serve');
});

gulp.task('test', ['copy'], function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('serve', ['express']);

gulp.task('default', ['copy', 'serve']);
