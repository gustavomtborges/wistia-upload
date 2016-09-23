var gulp = require('gulp')
var nodemon = require('gulp-nodemon')

var paths = {
  jsFiles: ['*.js', 'public/**/*.js'],
  cssFiles: ['public/css/**/*.js']
}

gulp.task('serve', function () {
  var options = {
    script: 'server.js',
    delayTime: 1,
    env: {
      'PORT': 3000
    },
    watch: [paths.jsFiles, paths.cssFiles]
  }

  return nodemon(options).on('restart', function (ev) {
    console.log('Restarting...')
  })
})
