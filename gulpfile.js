import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

// ======================
// COPIAR HTML
// ======================
export function html(done) {
    src('index.html').pipe(dest('build'));
    done();
}

// ======================
// COPIAR PÁGINAS (pages/)
// ======================
export function pages(done) {
    src('src/pages/**/*.html').pipe(dest('build/pages'));
    done();
}

// ======================
// COPIAR IMÁGENES (img/)
// ======================
export function images(done) {
    src('img/**/*').pipe(dest('build/img'));
    done();
}

// ======================
// COPIAR DATA (data/)
// ======================
export function data(done) {
    src('data/**/*').pipe(dest('build/data'));
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
// CSS (SASS)
// ======================
export function css(done) {
    src('src/scss/app.scss', { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('build/css', { sourcemaps: true }));
    done();
}

// ======================
// WATCH / DEV
// ======================
export function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
    watch('*.html', html);
    watch('pages/**/*.html', pages);
    watch('img/**/*', images);
    watch('data/**/*', data);
}

// ======================
// TAREA BUILD FINAL
// ======================
export const build = series(html, pages, images, data, js, css);

// ======================
// TAREA DEFAULT (DEV)
// ======================
export default series(html, pages, images, data, js, css, dev);
