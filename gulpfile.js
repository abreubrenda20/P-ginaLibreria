import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

// ======================
// COPIAR HTML PRINCIPAL
// ======================
export function html(done) {
    src('index.html').pipe(dest('build'));
    done();
}

// ======================
// COPIAR PÁGINAS
// ======================
export function pages(done) {
    src('src/pages/**/*.html').pipe(dest('build/pages'));
    done();
}

// ======================
// IMÁGENES
// ======================
export function images() {
    return src('src/img/**/*', { encoding: false }).pipe(dest('build/img'));
}

// ======================
// DATA JSON
// ======================
export function data(done) {
    src('src/data/**/*').pipe(dest('build/data'));
    done();
}

// ======================
// JS
// ======================
export function js(done) {
    src('src/js/**/*.js').pipe(dest('build/js'));
    done();
}

// ======================
// CSS
// ======================
export function css(done) {
    src('src/scss/app.scss', { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('build/css', { sourcemaps: true }));
    done();
}

// ======================
// DEV WATCH
// ======================
export function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
    watch('index.html', html);
    watch('src/pages/**/*.html', pages);
    watch('src/img/**/*', images);
    watch('src/data/**/*', data);
}

// ======================
// BUILD FINAL
// ======================
export const build = series(html, pages, images, data, js, css);

// ======================
// DEFAULT
// ======================

import browserSync from 'browser-sync';
const bs = browserSync.create();
export function server(done) {
    bs.init({
        server: {
            baseDir: 'build',
        },
    });

    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
    watch('src/index.html', html);
    watch('src/pages/**/*.html', pages);
    watch('src/img/**/*', images).on('change', bs.reload);
    done();
}

export default series(build, server);
