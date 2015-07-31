var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    uglify       = require('gulp-uglifyjs'),

    CSS_SOURCE   = 'htdocs/css/src',
    CSS_BUILD    = 'htdocs/css/build',
    //JS_SOURCE    = 'web/js/src',
    //JS_BUILD     = 'web/js/build';
    TEMPLATES    = 'web'

gulp.task('default', ['styles', 'watch']);

gulp.task('watch', function () {
    gulp.watch(
        [CSS_SOURCE + '/**/*.scss'], ['styles']);
});

gulp.task('styles', function () {
    gulp.src(CSS_SOURCE + '/screen.scss')
        .pipe(sass({
            errLogToConsole: true,
            sourcemap: false
        }))
        .pipe(gulp.dest(CSS_BUILD))
        .on('error', function (error) {
            console.error('' + error);
        });
});

gulp.task('build-js', function() {

    gulp.src('htdocs/js/player/*.js')
        .pipe(uglify('player.js'))
        .pipe(gulp.dest('htdocs/js/player/dist/'));

    gulp.src('htdocs/js/canvas/*.js')
        .pipe(uglify('canvas.js'))
        .pipe(gulp.dest('htdocs/js/canvas/dist/'));

});

gulp.task('build-production', ['styles', 'build-js']);
