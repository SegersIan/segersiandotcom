var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

/*******************************
	Main build tasks
 *******************************/
gulp.task('watch', ['serve', 'watch:sass', 'watch:html']);
gulp.task('publish', ['sass-publish']);

/*******************************
	Development build tasks
 *******************************/
gulp.task('serve', ['sass'], function() {
	browserSync.init({
		server: "./client"
	});
});

gulp.task('watch:sass', function () {
	gulp.watch("client/assets/sass/*.scss", ['sass-watch']);
});

gulp.task('watch:html', function () {
	gulp.watch("client/**/*.html").on('change', browserSync.reload);
});

gulp.task('sass-watch', function() {
	return gulp.src("client/assets/sass/**/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("./client/assets/css"))
		.pipe(browserSync.stream());
});

/*******************************
	Publish build tasks
 *******************************/
gulp.task('sass-publish', function() {
	return gulp.src("client/assets/sass/**/*.scss")
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest("./client/assets/css"));
});