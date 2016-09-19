var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var bower = require('gulp-bower');
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
var pubPaths = {
	target  : { dest : 'output'} ,
	source : {
		cwd : 'client/**',
		html : ['templates/*.html','index.html', '!bower_components/**/*.html'],
		assets : ['assets/img/**/*.*','assets/css/style.css'],
		libs : ['bower_components/**/*.*','libraries/**/*.*'],
		js : ['js/app.js', 'js/sketch.js','js/generic.js', 'js/controllers/*.js']
	}
};

gulp.task('sass-publish', function() {
	return gulp.src("client/assets/sass/style.scss")
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest("./client/assets/css"));
});

gulp.task('clean', function() {
	
	gulp.src('client/bower_components').pipe(clean());
	
	return gulp.src(pubPaths.target.dest).pipe(clean());
		
});

gulp.task('bower', ['clean'], function () {
	return bower({ directory : "client/bower_components"});
});

gulp.task('copy', ['clean', 'sass-publish', 'bower'], function() {
	
	// Copy html
	gulp.src(pubPaths.source.html,{ cwd :  pubPaths.source.cwd }).pipe(gulp.dest(pubPaths.target.dest));
	
	// Copy assets
	gulp.src(pubPaths.source.assets,{ cwd : pubPaths.source.cwd }).pipe(gulp.dest(pubPaths.target.dest));
	
	// Copy External Libs
	gulp.src(pubPaths.source.libs,{ cwd :  pubPaths.source.cwd }).pipe(gulp.dest(pubPaths.target.dest));
	
	// Process JS - todo: When more time available, implement webpack.
	gulp.src(pubPaths.source.js, {cwd:  pubPaths.source.cwd})
		.pipe(uglify())
		//.pipe(concat('js/app.js'))
		.pipe(gulp.dest(pubPaths.target.dest));
});
