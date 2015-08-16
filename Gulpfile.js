var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var _ = require('lodash');
var coffee = require('gulp-coffee');
var autoprefix = require('gulp-autoprefixer');
var changed = require('gulp-changed');
var cheerio = require('gulp-cheerio');
var connect = require('gulp-connect');
var modRewrite = require('connect-modrewrite');
var run = require('gulp-run');

var SRC = {
    app: {
        root: "app",
        coffee: "app/**/*.coffee",
        jade: "app/**/*.jade",
        css: "app/**/*.css"
    },
    test: {
        coffee: "tests/**/*.coffee"
    }
};

var DEST = {
    build: "build"
};

var TASKS = {
    scripts: "_scripts",
    jades: "_jades",
    clean: "clean",
    styles: "_styles",
    watch: "_watch",
    connect: "connect",
    build: "build"
};

gulp.task(TASKS.scripts, function() {
    return gulp.src(SRC.app.coffee)
    .pipe(changed(DEST.build, { extension: '.js'}))
    .pipe(coffee()).on('error', gutil.log)
    .pipe(gulp.dest(DEST.build))
    .pipe(connect.reload());
});

gulp.task(TASKS.clean, function(cb) {
    return del(DEST.build, cb);
});

gulp.task(TASKS.jades, function() {
    return gulp.src(SRC.app.jade)
        .pipe(changed(DEST.build))
        .pipe(gulp.dest(DEST.build))
        .pipe(connect.reload());
});

gulp.task(TASKS.styles, function() {
    return gulp.src(SRC.app.css)
        .pipe(changed(DEST.build))
        .pipe(gulp.dest(DEST.build))
        .pipe(connect.reload());
});

gulp.task(TASKS.watch, [TASKS.scripts, TASKS.jades, TASKS.styles], function() {
    gulp.watch(SRC.app.css, [TASKS.styles]);
    gulp.watch(SRC.app.coffee, [TASKS.scripts]);
    return gulp.watch(SRC.app.jade, [TASKS.htmls]);
});

gulp.task(TASKS.connect, [TASKS.watch], function() {
  return gulp.src(DEST.build).pipe(run("coffee bin/www"))
});

gulp.task(TASKS.build, [TASKS.scripts, TASKS.jades, TASKS.styles], function() {});
