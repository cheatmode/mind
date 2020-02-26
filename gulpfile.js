'use strict';

var 
	gulp = require('gulp'),
	plumber = require('gulp-plumber'), // модуль для отслеживания ошибок
	prefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	rimraf = require('rimraf'),
	uglify = require('gulp-uglify'),
	rigger = require('gulp-rigger'),
	browser = require("browser-sync").create();

var path = {
	build: { //Тут мы укажем куда складывать готовые после сборки файлы
		html: 'dist/',
		js: 'dist/js/',
		css: 'dist/css/',
		img: 'dist/img/',
		fonts: 'dist/fonts/'
	},
	src: { //Пути откуда брать исходники
		html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
		js: 'src/js/**/*.js',//В стилях и скриптах нам понадобятся только main файлы
		sass: 'src/sass/**/*.scss',
		img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
		fonts: 'src/fonts/**/*.*'
	},
	watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		sass: 'src/sass/**/*.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './dist'
};

var prefixerOptions = {
	overrideBrowserslist: ['last 99 versions'],
	cascade: false
};

gulp.task('clean', function (done) {
	rimraf(path.clean, done);
});

gulp.task('html:build', async function () {
	gulp.src(path.src.html) //Выберем файлы по нужному пути
		.pipe(plumber())
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
		.pipe(browser.reload({
      stream: true
    }));
});
gulp.task('js:build', async function () {
	gulp.src(path.src.js) //Найдем наш main файл
		.pipe(plumber())
		.pipe(rigger())
		.pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(path.build.js)) //Выплюнем их в папку build
		.pipe(browser.reload({
      stream: true
    }));
});
gulp.task('sass:build', async function () {
	gulp.src(path.src.sass) //Выберем наш main.scss
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError)) //Скомпилируем
		.pipe(prefixer(prefixerOptions)) //Добавим вендорные префиксы
		.pipe(gulp.dest(path.build.css)) //И в build
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(path.build.css)) //И в build
		.pipe(browser.reload({
      stream: true
    }));
});
gulp.task('img:build', async function () {
	gulp.src(path.src.img) //Выберем наши картинки
		.pipe(gulp.dest(path.build.img)) //И бросим в build
		.pipe(browser.reload({
      stream: true
    }));
});
gulp.task('fonts:build', async function() {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
		.pipe(browser.reload({
      stream: true
    }));
});
gulp.task('build', gulp.series(
	'html:build',
	'js:build',
	'sass:build',
	'fonts:build',
	'img:build'
));

gulp.task('webserver', function () {
  browser.init({
    server: {
			baseDir: './dist',
			index: 'index.html'
		},
    port: 9000,
    open: true,
    notify: false
  });
});

gulp.task('watch', function(){
	gulp.watch(path.watch.html, gulp.series('html:build'));
	gulp.watch(path.watch.sass, gulp.series('sass:build'));
	gulp.watch(path.watch.js, gulp.series('js:build'));
	gulp.watch(path.watch.img, gulp.series('img:build'));
	gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
});
gulp.task('default', gulp.series('build', gulp.parallel('webserver', 'watch')));
