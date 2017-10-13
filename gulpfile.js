"use strict";

const gulp  = require('gulp'),
	  del = require('del'), 
	  source   = require('vinyl-source-stream'),
	  imagemin = require('gulp-imagemin'),
	  uglify = require('gulp-uglify-es').default,
      //uglify=require('gulp-uglifyjs'),
	  buffer = require('vinyl-buffer'),
	  sourcemaps = require('gulp-sourcemaps'), 
	  rename = require('gulp-rename'),
	  browserify = require('browserify'),
	  es  = require('event-stream'),
	  cleanCSS = require('gulp-clean-css'),
	  gutil= require('gulp-util'),
      runSequence = require('run-sequence'),
      transform = require('vinyl-transform'),
      through2 = require('through2');


const options = {
    jsFiles : 'public/script/*.js',
    images:'public/images/*',
    distImages:'./dist/public/images',
    cssFiles:'public/stylesheets/*.css',
    distCssFiles:'./dist/public/stylesheets',
    copyFiles:['public/factor.html','public/index.html','public/script/app.js','public/script/routes.js']
}
gulp.task('clean', ()=>{
  return del(['dist/**/*'])
});

gulp.task('javascript', function() {
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
 
            //.pipe(sourcemaps.init({loadMaps: true}))
            // rename them to have "bundle as postfix"
            .pipe(rename({
                extname: '.bundle.js'
            }))
           // .pipe(uglify())
           // .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist'));
        });
    // create a merged stream
    return es.merge.apply(null, tasks);
});

//TOOD still need to figure out the browerfiy uglify thing, i is not defined

// gulp.task('browserify', function () {
//     gulp.src('public/script/script.js')
//         .pipe(through2.obj(function (file, enc, next){
//                 browserify(file.path)
//                     //.transform('stripify')
//                     .bundle(function(err, res){
//                         // assumes file.contents is a Buffer
//                         file.contents = res;
//                         next(null, file);
//                     });
//             }))
//         .pipe(gulp.dest('./dist/public/script'))
// });

// gulp.task('uglify', function() {
//   gulp.src('./dist/public/script/script.js')
//     .pipe(uglify())
//     .pipe(rename("bundle.min.js"))
//     .pipe(gulp.dest('dist/public/script'))
// });

gulp.task('images', () =>{
  return gulp.src(options.images)
        .pipe(imagemin())
        .pipe(gulp.dest(options.distImages))
});

gulp.task('minify-css',() => {
  return gulp.src(options.cssFiles)
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(options.distCssFiles));
});

gulp.task('watch',()=> {
    gulp.watch(options.jsFiles,['javascript']);
});

// gulp.task("copy",()=>{
//     return gulp.src(options.copyFiles, { base: './'})
//                 .pipe(gulp.dest('./dist'));
// });
//copy everything to dist folder 
gulp.task("build", ['clean'],(callback)=> {
  runSequence('javascript','images','minify-css'); 
    return gulp.src(options.copyFiles, { base: './'})
                .pipe(gulp.dest('./dist'));
});