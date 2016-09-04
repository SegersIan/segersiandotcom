var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('serve', ['sass'], function() {
	browserSync.init({
		server: "./client"
	});
});

gulp.task('watch:sass', function () {
	gulp.watch("client/assets/sass/*.scss", ['sass']);
});

gulp.task('watch:html', function () {
	gulp.watch("client/**/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
	return gulp.src("client/assets/sass/**/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("./client/assets/css"))
		.pipe(browserSync.stream());
});

gulp.task('watch', ['serve', 'watch:sass', 'watch:html']);