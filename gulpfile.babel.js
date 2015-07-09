import gulp from 'gulp'
import loadplugins from 'gulp-load-plugins'
import del from 'del'
import RunSeq from 'run-sequence'

let runseq = RunSeq.use(gulp)
let plugins = loadplugins()

gulp.task('dev', devTask)
gulp.task('jade', jadeTask)
gulp.task('less', lessTask)
gulp.task('babel', babelTask)
gulp.task('build', buildTask)
gulp.task('clean', clearTask)

function buildTask(done) {
  runseq(
    'clean',
    ['jade', 'babel', 'less'],
    done
  )
}

function devTask() {
  gulp.watch('./src/**/*.jade', ['jade'])
  gulp.watch('./src/**/*.less', ['less'])
  gulp.watch('./src/**/*.js', ['babel'])
}

function jadeTask() {
  return gulp.src('./src/**/*.jade')
  .pipe(plugins.plumber())
  .pipe(plugins.jade())
  .pipe(gulp.dest('./dist'))
}

function lessTask() {
  return gulp.src('./src/**/*.less')
  .pipe(plugins.plumber())
  .pipe(plugins.less())
  .pipe(gulp.dest('./dist'))
}

function babelTask() {
  return gulp.src('./src/**/*.js')
  .pipe(plugins.plumber())
  .pipe(plugins.babel({ modules: 'umd' }))
  .pipe(gulp.dest('./dist'))
}

function clearTask(done) {
  let clean = [
    './dist/bg/*',
  ]

  let keep = []

  del(clean, { ignore: keep }, done)
}
