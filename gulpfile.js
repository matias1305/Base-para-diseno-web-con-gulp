const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();


// Genera el archivo css de desarrollo con sus prefijos
gulp.task('sass', () => {
   gulp.src('./src/assets/scss/**/*.scss')
      .pipe( 
         sass({
            includePaths: ['scss'],
            outputStyle: 'expanded',
            sourceComments: false
         })
      )
      .pipe(
         autoprefixer({
            browsers: ['last 2 versions']
         })
      )
      .pipe( gulp.dest('./src/assets/css') )
});


// Genera archivo de css minificado
gulp.task('sass-compressed', () => {
   gulp.src('./src/assets/scss/**/*.scss')
      .pipe(
         sass({
            includePaths: ['scss'],
            outputStyle: 'compressed',
            sourceComments: false
         })
      )
      .pipe(
         autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
         })
      )
      .pipe( gulp.dest('./dist/assets/css') )
});


// Genera archivo de html minificado
gulp.task('html-compressed', () => {
   gulp.src('./src/**/*.html')
     .pipe(
        htmlmin({ 
           collapseWhitespace: true 
         })
      )
     .pipe( gulp.dest('./dist') );
});


// Escucha los cambios y los compila a css
gulp.task('watch', () => {
	// Recarga el navegador al efecutar cambios
	browserSync.init({
		server: './dist'
	});

	gulp.watch(['./src/assets/scss/**/*.scss','./src/**/*.html'], ['sass', 'sass-compressed', 'html-compressed'])
		.on( 'change', browserSync.reload );
});
