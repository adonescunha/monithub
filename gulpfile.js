var gulp = require('gulp'),
    useref = require('gulp-useref');

var src = './layout/monithub/_site/css/*.css';

gulp.task('copy', function() {
  gulp.src(src)
    .pipe(gulp.dest('./client/css'));

  gulp.src('client/app/**/*')
    .pipe(gulp.dest('./public/app'));
});

gulp.task('bundle', function() {
  gulp.src('client/*.html')
    .pipe(useref())
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
  gulp.watch('client/**/*', ['copy', 'bundle'])
});

gulp.task('express', function() {
  require('./serve');
});

gulp.task('serve', ['express']);

gulp.task('default', ['serve', 'watch'])
