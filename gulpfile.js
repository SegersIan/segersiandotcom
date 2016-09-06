var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();

/*******************************
	Main build tasks
 *******************************/
gulp.task('watch', ['serve', 'watch:sass', 'watch:html', 'watch:js']);
gulp.task('publish', ['clean', 'sass-publish']);

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


var outputPaths = {
	app: 'output/'
};

var paths = {
	scripts: ['client/js/**/*.js'],
	styles: [
		'client/assets/css/**/*.css',
		'client/bower_components/html5-boilerplate/dist/css/normalize.css',
		'client/bower_components/html5-boilerplate/dist/css/main.css',
		'client/bower_components/font-awesome/css/font-awesome.min.css'
	],
	html: ['client/templates/*.html','client/index.html'],
	images: ['client/assets/img/**/*.jpg'],
	libs: [
		'client/bower_components/jquery/dist/jquery.min.js',
		'client/bower_components/angular/angular.min.js',
		'client/bower_components/angular-route/angular-route.min.js'
	]
};

// Delete the dist directory
gulp.task('clean', function() {
	return gulp.src(outputPaths.app)
		.pipe(clean());
});

gulp.task('copy', ['clean'], function() {
	// Copy html
	gulp.src(paths.html, {cwd: outputPaths.app})
		.pipe(gulp.dest(bases.dist));
	
	// Copy styles
	gulp.src(paths.styles, {cwd: outputPaths.app})
		.pipe(gulp.dest(bases.dist + 'styles'));
	
	// Copy lib scripts, maintaining the original directory structure
	gulp.src(paths.libs, {cwd: 'app/**'})
		.pipe(gulp.dest(outputPaths.dist));
	
});

gulp.task('publish-output', function() {
	console.log('publish-output not implemented');
});