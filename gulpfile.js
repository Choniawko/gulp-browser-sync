const gulp          = require('gulp');
const browserSync   = require('browser-sync').create();
const sass          = require('gulp-sass');
const browserify    = require('gulp-browserify');
const uglify        = require('gulp-uglify');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js'], () => {

    browserSync.init({
        server: "./"
    });

    gulp.watch("src/assets/*.scss", ['sass']);
    gulp.watch("src/app/*.js", ['js-watch']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
    return gulp.src("src/assets/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/assets"))
        .pipe(browserSync.stream());
});

gulp.task('js', () => {
    return gulp.src('src/app/*js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('js-watch', ['js'], (done) => {
    browserSync.reload();
    done();
});

gulp.task('default', ['serve']);