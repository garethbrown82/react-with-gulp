// #gulp build - to build .js and .html
// #gulp webserver - to start webserver

var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch');

var BUILD_DIR = 'build/';

function compile() {
    var bundler = browserify('src/index.jsx', {
        debug: true, // write own sourcemaps
        extensions: ['.js', '.jsx', '.json']
    });

    return bundler
        .transform('babelify', { presets: ['env', 'react'] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true })) // load browserify's sourcemaps
        .pipe(uglify())
        .pipe(sourcemaps.write('.')) // write .map files near scripts
        .pipe(gulp.dest(BUILD_DIR));
}

gulp.task('build:js', function() {
    return compile();
})

gulp.task('build:html', function() {
    return gulp.src(['src/**/*.html', '!node_modules/**/*'])
        .pipe(gulp.dest(BUILD_DIR));
})

gulp.task('build', ['build:js', 'build:html']);

// Gulp webserver below
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    return gulp.src(BUILD_DIR)
        .pipe(webserver({
            livereload: true // reload browser page if something in BUILD_DIR updates
        }));
});

// Watch any change to source jsx
gulp.task('watch',  function () {
    watch(['src/**/*.jsx', 'src/**/*.js'], batch(function (events, done) {
        gulp.start('build', done);
    }));
});

