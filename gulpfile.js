// #gulp build - to build .jsx, .js and .html
// #gulp webserver - to start webserver
// #gulp watch - to watch any changed to jsx, js or html files in src, the runs build
// #gulp bootstrap-css
// #gulp bootstrap-js
// #gulp jquery
// #gulp site-css

var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat');

var BUILD_DIR = 'dist/';

gulp.task('default', ['build', 'site-css'])

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

//Bootstrap css
gulp.task('bootstrap-css', function () {
    return gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/lib/bootstrap'))
});

// Bootstrap js
gulp.task('bootstrap-js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.js'])
        .pipe(concat('bootstrap.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/lib/bootstrap'))
})

// Jquery js
gulp.task('jquery', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.js'])
        .pipe(concat('jquery.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/lib/jquery'))
})

// Site css
gulp.task('site-css', function () {
    return gulp.src('src/css/site.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
});

// Gulp webserver below
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    return gulp.src(BUILD_DIR)
        .pipe(webserver({
            livereload: true // reload browser page if something in BUILD_DIR updates
        }));
});

// Watch any change to source jsx and html
gulp.task('watch',  function () {
    watch(['src/index.jsx', 'src/**/*.jsx', 'src/**/*.js', 'src/**/*.html', 'src/**/*.css'], batch(function (events, done) {
        gulp.start('default', done);
    }));
});

