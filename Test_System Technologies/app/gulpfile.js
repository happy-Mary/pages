var gulp = require('gulp'),
    // less = require('gulp-less'),
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    notify = require("gulp-notify"),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect')


// html
gulp.task('html', function() {
    gulp.src('**/**/*.html')
        .pipe(connect.reload());
});

// server
gulp.task('connect', function() {
    connect.server({
        root: '',
        livereload: true
    });
});


// css
gulp.task('css', function() {
    return gulp.src('css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 3 versions', '> 5%']
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename("bundle.min.css"))
        .pipe(gulp.dest("css"))
        .pipe(connect.reload())
        .pipe(notify("DONE!"));
});

gulp.task('watch', function() {
    // gulp.watch('less/*.less', ['less'])
    gulp.watch('css/*.css', ['css'])
    gulp.watch('index.html', ['html'])
});

gulp.task('default', ['connect', 'watch']);