/* eslint-disable */
const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')

const compileSource = () => browserify({
  entries: './lib/index.js',
  standalone: 'standalone',
}).transform('babelify')
  .bundle()
  .pipe(source('dist.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist'))


gulp.task('build', compileSource)
gulp.task('default', gulp.series('build'))
