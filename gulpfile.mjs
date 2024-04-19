import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import rename from 'gulp-rename';
import fontmin from 'gulp-fontmin';
import { create } from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import babel from 'gulp-babel';
import souremaps from 'gulp-sourcemaps';
import yargs from 'yargs';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { deleteAsync } from 'del';
import gulpIf from 'gulp-if';
import proxyServer from './src/js/proxy-server.mjs';

const browserSync = create();
const { init, write } = souremaps;
const { src, series, dest, watch, task } = gulp;
const argv = yargs(process.argv.slice(2)).parse();
const isProduction = argv.prod;

task('proxy', function () {
  proxyServer.listen(3001, function () {
    console.log('Express server is running on http://localhost:3001');
  });
});

task('clean', function () {
  return deleteAsync(['dist']);
});

task('images', function () {
  return src('./src/img/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img/'))
    .pipe(webp())
    .pipe(rename({ extname: '.webp' }))
    .pipe(dest('./dist/img'))
    .pipe(browserSync.stream());
});

task('fonts', function () {
  return src('./src/fonts/*')
    .pipe(fontmin())
    .pipe(dest('./dist/fonts'));
});

task('scripts', function () {
  return src('./src/js/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulpIf(!isProduction, init()))
    .pipe(gulpIf(isProduction, babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpIf(isProduction, terser()))
    .pipe(gulpIf(!isProduction, write('.')))
    .pipe(gulpIf(isProduction, rename({
      suffix: '.min'
    })))
    .pipe(dest('./dist/js'))
    .pipe(browserSync.stream());
});

task('proxy-scripts', function () {
  return src('./src/js/proxy-server.mjs')
    .pipe(gulpIf(!isProduction, init()))
    .pipe(gulpIf(isProduction, babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpIf(isProduction, terser()))
    .pipe(gulpIf(!isProduction, write('.')))
    .pipe(gulpIf(isProduction, rename({
      suffix: '.min'
    })))
    .pipe(dest('./dist/js'))
    .pipe(browserSync.stream());
});


task('styles', function () {
  return src('./src/css/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulpIf(!isProduction, init()))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulpIf(!isProduction, write('.')))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(dest('./dist/css'))
    .pipe(browserSync.stream());
});

task('html', function () {
  return src('./src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('./dist/'));
});

task('watch', function () {
  gulpIf(!isProduction, browserSync.init({
    server: {
      baseDir: './dist/'
    }
  }));

  watch('./src/img/*', series('images'));
  watch('./src/fonts/*', series('fonts'));
  watch('./src/js/*.js', series('scripts'));
  watch('./src/css/*.css', series('styles'));
  watch('./src/*.html', series('html'));
  watch('./dist/**').on('change', browserSync.reload);
});

task('default', gulp.series('clean', 'images', gulp.parallel('fonts', 'scripts', 'proxy-scripts', 'styles', 'html', 'watch', 'proxy')));
