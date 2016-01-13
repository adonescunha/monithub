var gulp = require('gulp'),
    useref = require('gulp-useref');

gulp.task('copy', function() {
  var src = './layout/monithub/_site/css/*.css';
  gulp.src(src)
    .pipe(gulp.dest('./public/css'));
});

gulp.task('express', function() {
  require('./serve');
});

gulp.task('serve', ['express']);

gulp.task('default', ['serve'])
