var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var _ = require('lodash');
var coffee = require('gulp-coffee');
var changed = require('gulp-changed');
var connect = require('gulp-connect');
nodemon = require('gulp-nodemon');

var SRC = {
    app: {
        root: "app",
        coffee: "app/**/*.coffee",
        jquery: "app/**/*.min.js",
        json: "app/**/*.json",
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
    helpers: "_helpers",
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

gulp.task(TASKS.helpers, function() {
    return gulp.src([SRC.app.jquery, SRC.app.json])
    .pipe(gulp.dest(DEST.build))
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

gulp.task(TASKS.watch, [TASKS.scripts, TASKS.helpers, TASKS.jades, TASKS.styles], function() {
    gulp.watch(SRC.app.css, [TASKS.styles]);
    gulp.watch(SRC.app.coffee, [TASKS.scripts]);
    return gulp.watch(SRC.app.jade, [TASKS.htmls]);
});

gulp.task(TASKS.connect, [TASKS.watch], function () {
    nodemon({
        script: 'bin/www'
        , env: { 'NODE_ENV': 'development' }
    });
});

gulp.task(TASKS.build, [TASKS.scripts, TASKS.helpers, TASKS.jades, TASKS.styles], function() {});
