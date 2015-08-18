var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var _ = require('lodash');
var coffee = require('gulp-coffee');
var changed = require('gulp-changed');
var connect = require('gulp-connect');
var nodemon = require('gulp-nodemon');
var run = require('gulp-run');

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
        coffee: "tests/**/*.coffee",
        json: "tests/**/*.json"
    }
};

var DEST = {
    build: "build",
    test: "build/tests"
};

var TASKS = {
    scripts: "_scripts",
    helpers: "_helpers",
    jades: "_jades",
    clean: "clean",
    styles: "_styles",
    watch: "_watch",
    connect: "connect",
    build: "build",
    runTest: "test",
    copyTestJSON: "_copyTestJSON",
    prepare: "prepare",
    reset: "_reset"
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

gulp.task(TASKS.copyTestJSON, function(){
    return gulp.src(SRC.test.json)
        .pipe(gulp.dest(DEST.test))

});

gulp.task(TASKS.runTest, [TASKS.scripts, TASKS.helpers, TASKS.copyTestJSON], function () {
    return gulp.src(SRC.test.coffee)
        .pipe(changed(DEST.test, { extension: '.js'}))
        .pipe(coffee()).on('error', gutil.log)
        .pipe(gulp.dest(DEST.test))
        .pipe(run("sh scripts/resetEnv.sh && sh scripts/deploy.sh && mocha tests && mocha build/tests/**/*.js"))
});

gulp.task(TASKS.build, [TASKS.scripts, TASKS.helpers, TASKS.jades, TASKS.styles], function() {});

gulp.task(TASKS.prepare, [TASKS.reset], function(){
    run("sh scripts/deploy.sh").exec();
});

gulp.task(TASKS.reset, function(){
    run("sh scripts/resetEnv.sh").exec();
});

