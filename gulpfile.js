'use strict';

// Получение настроек папок из package.json
const pjson = require('./package.json');
const dirs = pjson.config.directories;

// Зависимости проекта
const gulp = require('gulp');
const csso = require('gulp-csso');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const fs = require('fs');

// Запуск `NODE_ENV=production npm start [задача]` приведет к сборке без sourcemaps
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

// Локальный сервер
gulp.task('serve', function () {
	browserSync.init({
			server: './',
			open: false,
			ghostMode: false,
			notify: false,
      timestamps: false
	});
});


// Задача по умолчанию
gulp.task('default', gulp.series('serve'));