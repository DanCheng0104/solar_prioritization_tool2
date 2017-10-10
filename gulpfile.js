"use strict";

const   gulp  = require('gulp'),
		del = require('del'), 
	    source   = require('vinyl-source-stream'),
	    imagemin = require('gulp-imagemin'),
	    uglify = require('gulp-uglify-es').default,
	    buffer = require('vinyl-buffer'),
	    sourcemaps = require('gulp-sourcemaps'), 
	    rename     = require('gulp-rename'),
	    browserify = require('browserify'),
	    es         = require('event-stream'),
	    cleanCSS = require('gulp-clean-css'),
		gutil= require('gulp-util');
gulp.task('clean', ()=>{
  return del(['dist/**/*'])
});

gulp.task('default', function() {
    // we define our input files, which we want to have
    // bundled:
    var files = [
        'public/script/script.js',
        'public/script/factor.js'
    ];
    // map them to our stream function
    var tasks = files.map(function(entry) {
        return browserify({ entries: [entry] })
            .bundle()
            .pipe(source(entry))
            .pipe(buffer())
 
            .pipe(sourcemaps.init({loadMaps: true}))
            // rename them to have "bundle as postfix"
            .pipe(rename({
                extname: '.bundle.js'
            }))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist'));
        });
    // create a merged stream
    return es.merge.apply(null, tasks);
});

gulp.task('images', () =>{
  return gulp.src('public/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
});

gulp.task('minify-css',() => {
  return gulp.src('public/stylesheets/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/stylesheets'));
});