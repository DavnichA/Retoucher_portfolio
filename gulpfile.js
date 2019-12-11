// Подключённые модули
const gulp = require('gulp');
const concat = require('gulp-concat'); /* Собирает в один файл */
const sass = require('gulp-sass'); /* Из Sass в Css */
const sourceMaps = require('gulp-sourcemaps'); /* Отслеживание в диспетчере */
const plumber = require('gulp-plumber');/* Отслеживание ошибок в терминале */
const autoprefixer = require('gulp-autoprefixer'); /* Автопрефиксы в Css */
const cleanCSS = require('gulp-clean-css'); /* Минимификация css */
// const uglify = require('gulp-uglify'); /* Минимификация Js*/
const uglify = require('gulp-uglify-es').default; /* Минимификатор Js Es6 */
const del = require('del'); /* Удаление */
const browserSync = require('browser-sync').create(); /* локальный сервер */
const uncss = require('gulp-uncss'); /* Удаляет неиспользуемые css свойства*/
const watch = require('gulp-chokidar')(gulp); // для нормальной сокрости отслеживания

sass.compiler = require('node-sass');

function sassRun() {
	return gulp.src('./src/sass/**/*.scss')
				.pipe(plumber()) 
					.pipe(sass({
					includePaths: require('node-normalize-scss').includePaths /* Добавление normalize.css */
					}).on('error', sass.logError))
				.pipe(gulp.dest('./src/css'))
				.pipe(browserSync.stream());
}


function style() {
	return gulp.src('./src/css/**/*.css')
				.pipe(sourceMaps.init())
				.pipe(concat('style.css'))
				.pipe(autoprefixer({
					overrideBrowserslist: ['> 0.1%'],
            		cascade: false
        		}))
        		// .pipe(uncss({
          //   		html: ['index.html']})) /*работает медленно использовать в финальной сборке*/
        		.pipe(cleanCSS({
        			level:2, /* Уровень сжатия от 0 - 2 */
        			compatibility: 'ie8'}))
				.pipe(sourceMaps.write())
				.pipe(gulp.dest('./build/css'))
				.pipe(browserSync.stream()); 
}


function script() {
	return gulp.src('./src/js/**/*.js')
			.pipe(concat('mainMin.js'))
			.pipe(uglify())
			.pipe(gulp.dest('./build/js'))
			.pipe(browserSync.stream()); 
}

function watching() { /* Отслеживать  и выход control+c */
	browserSync.init({
        server: {
            baseDir: "./"
        },
        // port: 3000,
        // tunnel: "my-private-site",
        notify: false
    });

	watch('./src/sass/**/*.scss', {usePolling: true}, sassRun);
	watch('./src/css/**/*.css', {usePolling: true}, style);
	watch('./src/js/**/*.js', {usePolling: true}, script);
	watch('./*.html', {usePolling: true}, browserSync.reload);
}

function clear() { /* очистить папку build */
	return del(['build/*']);
}

gulp.task('sass', sassRun);
gulp.task('style', style);
gulp.task('script', script);
gulp.task('watching', watching);
gulp.task('build', gulp.series(clear, gulp.parallel(style, script)));
gulp.task('dev', gulp.series('build', 'watching'));