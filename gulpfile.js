'use strict';

const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

let paths = {
    styles: {
        src: "src/scss/**/*.scss",
        dest: "assets/css"
    },
    js: {
        src: "src/js/**/*js",
        dest: "assets/js"
    }
}

function sync(done) {
    browserSync.init({
        proxy: 'localhost:8888/proto/'
        // files: [
        //     './**/*.php'
        // ]
    });

    done();
}

function sassCompile() {
    return (
        src(paths.styles.src)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(dest(paths.styles.dest))
        .pipe(browserSync.stream())
    )
}

function watchsass() {
    watch(paths.styles.src, sassCompile).on('change', browserSync.reload);
}


exports.default = parallel(sync, watchsass);