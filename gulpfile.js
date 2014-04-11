var gulp = require('gulp'),
    g = require('gulp-load-plugins')();

gulp.task('scripts', function() {
  return gulp.src('object-key.js').
              pipe(g.rename('object-key.min.js')).
              pipe(g.ngmin()).
              pipe(g.uglify({
                preserveComments: 'some',
                outSourceMap: true
              })).
              pipe(gulp.dest('.'));
});

gulp.task('default', function() {
  gulp.start('scripts');
});
