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
const htmlmin = require('gulp-htmlmin');
const ngAnnotate = require('gulp-ng-annotate');
const templateCache = require('gulp-angular-templatecache');
const del = require('del');
const browserSync = require('browser-sync').create();
const fs = require('fs');

// Запуск `NODE_ENV=production npm start [задача]` приведет к сборке без sourcemaps
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

//Генерация файла с кешем шаблонов
gulp.task('templatecache', function() {
  return gulp.src([
        dirs.source + '/app/**/*.html',
        dirs.source + '/uib/**/*.html'
      ])
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(templateCache('templates.js', {
          module: 'app.templates',
          standalone: true,
          root: 'app/'
      }))
      .pipe(gulp.dest(dirs.source + '/scripts'));
});


// Сборка скриптов
gulp.task('scripts', gulp.series('templatecache', function () {
  return gulp.src([
    dirs.source + '/scripts/angular.js',
    dirs.source + '/scripts/lib/*.js',
    dirs.source + '/scripts/*.js',
    dirs.source + '/app/**/*.module.js',
    dirs.source + '/app/**/*.js'
  ])
  .pipe(gulpIf(isDev, sourcemaps.init()))
  .pipe(concat('script.js'))
  .pipe(gulpIf(!isDev, ngAnnotate()))
  .pipe(gulpIf(!isDev, uglify()))
  .pipe(gulpIf(isDev, sourcemaps.write()))
  .pipe(gulp.dest(dirs.build + '/scripts'))
  .on('end', browserSync.reload);
}));


// Компиляция стилей
gulp.task('styles', function () {
  return gulp.src([dirs.source + '/styles/bootstrap.css', dirs.source + '/styles/add.css'])
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(postcss([
      autoprefixer({ browsers: ['last 4 versions', 'IE 9'], cascade: false })
    ]))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(gulpIf(!isDev, csso()))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(dirs.build + '/styles'))
    .pipe(browserSync.stream());
});


//Копирование
gulp.task('fonts', function () {
  return gulp.src(dirs.source + '/fonts/*.{woff,woff2,ttf,eot,otf,svg}')
    .pipe(gulp.dest(dirs.build + '/fonts'));
});

gulp.task('files', function () {
  return gulp.src([dirs.source + '/*.*', dirs.source + '/i18n/*'], { "base" : dirs.source })
    .pipe(gulp.dest(dirs.build));
});


// Очистка папки сборки
gulp.task('clean', function () {
  return del(dirs.build + '/**/*');
});


// Локальный сервер
gulp.task('serve', function () {
  browserSync.init({
      server: dirs.build,
      open: false,
      ghostMode: false,
      notify: false,
      timestamps: false
  });
});

// Сборка всего
gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('styles', 'scripts','fonts', 'files')
));


// Cлежение за изменениями
gulp.task('watch', function () {
  gulp.watch([dirs.source + '/styles/*.css'], gulp.series('styles'));
  gulp.watch([dirs.source + '/app/**/*.*'], gulp.series('scripts'));
  gulp.watch([dirs.source + '/fonts/*.{woff,woff2,ttf,eot,otf,svg}'], gulp.series('fonts'));
});


// Локальный сервер, слежение
gulp.task('dev', gulp.series('build', gulp.parallel('serve', 'watch')));


// Задача по умолчанию
gulp.task('default', gulp.series('dev'));