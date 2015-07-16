var gulp         = require('gulp'),
    sass         = require('gulp-sass'),

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
