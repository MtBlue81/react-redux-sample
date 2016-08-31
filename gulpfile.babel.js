/* eslint-disable no-console */
import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';

gulp.task('build', () => {
  const debugMode = process.env.NODE_ENV !== 'production';
  const bundler = browserify('./src/app.js', {
    debug: debugMode,
    extensions: ['.js', '.jsx'],
    cache: {},
    packageCache: {},
    transform: [babelify]
  });

  bundler
    .on('update', () => rebundle())
    .on('log', (message) => console.log(message));

  function rebundle() {
    return bundler
      .bundle()
      .on('error', (err) => console.error(`Error : ${err.message}`))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./dist/'));
  }

  return rebundle();
});


