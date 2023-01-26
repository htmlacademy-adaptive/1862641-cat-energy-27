import gulp from 'gulp';
import plumber from 'gulp-plumber';
import htmlmin from 'gulp-htmlmin';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import rename from 'gulp-rename';
import squoosh from 'gulp-libsquoosh';
import csso from 'postcss-csso';
import terser from 'gulp-terser';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import {deleteAsync as del} from 'del';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

//html
const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('build'))
}
//html

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: './build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

//script
const scripts = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'))
}
//script

// Images

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'))
  }

  const copyImages = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
  .pipe(gulp.dest('build/img'))
  }

  // WebP

  const createWebp = () => {
  return gulp.src('source/img/png/**/*','source/img/jpeg/**/*', '!source/img/favicons')
  .pipe(squoosh({
  webp: {}
  }))
  .pipe(gulp.dest('build/img/webp'))
  }

//svg
const svg = () => {
  return gulp.src(['source/img/svg/*.svg', '!source/img/svg/icons/*.svg'])
  .pipe(svgo())
  .pipe(gulp.dest('build/img/svg'))
}
//svg

//sprite
const sprite = () => {
  return gulp.src('source/img/svg/icons/*.svg')
  .pipe(svgo())
  .pipe(svgstore({
  inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img/svg/icons'))
  }
//sprite

//сopy
const copy = (done) => {
  gulp.src([
  'source/fonts/**/*.{woff2,woff}',
  'source/*.ico',
  'soucre/*.webmanifest',
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
  done();
  };
//copy

//clean
const clean  = () => {
  return del('build');
  };
//clean

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/**.scss', gulp.series(styles));
  gulp.watch('source/js/**.js', gulp.series(scripts));
  gulp.watch('source/*.html').on('change', browser.reload);
}

//build
export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
  styles,
  html,
  scripts,
  svg,
  sprite,
  createWebp
  ),
  );
//build

// Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
  styles,
  html,
  scripts,
  svg,
  sprite,
  createWebp
  ),
  gulp.series(
  server,
  watcher
  ));

// Default
