var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var bower = require('gulp-bower');
//var jshint = require('gulp-jshint');
//var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

/*******************************
	Main build tasks
 *******************************/
gulp.task('watch', ['serve', 'watch:sass', 'watch:html', 'watch:js']);
gulp.task('publish', ['copy']);

/*******************************
	Development build tasks
 *******************************/
gulp.task('serve', ['sass-watch'], function() {
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

gulp.task('watch:js', function () {
	gulp.watch("client/**/*.js").on('change', browserSync.reload);
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

gulp.task('clean', function() {
	
	gulp.src('client/bower_components').pipe(clean());
	
	return gulp.src('output').pipe(clean());
		
});

gulp.task('bower', ['clean'], function () {
	return bower({ directory : "client/bower_components"});
});

gulp.task('copy', ['clean', 'sass-publish', 'bower'], function() {
	
	// Copy html
	gulp.src(['templates/*.html','index.html', '!bower_components/**/*.html'],{ cwd : 'client/**' }).pipe(gulp.dest('output'));
	
	// Copy assets
	gulp.src(['assets/**/*.*', '!assets/sass/**/*.scss'],{ cwd : 'client/**' }).pipe(gulp.dest('output'));
	
	// Copy External Libs
	gulp.src(['bower_components/**/*.*','libraries/**/*.*'],{ cwd : 'client/**' }).pipe(gulp.dest('output'));
	
	// Process JS
	var scripts = ['js/**/*.js'];
	gulp.src(scripts, {cwd: 'client/**'})
		.pipe(uglify())
		.pipe(gulp.dest('output'));
	
});
