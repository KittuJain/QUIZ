gulp = require("gulp")
gutil = require("gulp-util")
del = require("del")
_ = require("lodash")
coffee = require("gulp-coffee")
autoprefix = require("gulp-autoprefixer")
changed = require("gulp-changed")
cheerio = require("gulp-cheerio")
connect = require("gulp-connect")
modRewrite = require("connect-modrewrite")
run = require("gulp-run")

SRC =
  app:
    root: "app"
    coffee: "app/**/*.coffee"
    jade: "app/**/*.jade"
    css: "app/**/*.css"

  test:
    coffee: "tests/**/*.coffee"

DEST = build: "build"

TASKS =
  scripts: "_scripts"
  jades: "_jades"
  clean: "clean"
  styles: "_styles"
  watch: "_watch"
  connect: "connect"
  build: "build"

gulp.task TASKS.scripts, ->
  gulp.src(SRC.app.coffee).pipe(changed(DEST.build,
    extension: ".js"
  )).pipe(coffee()).on("error", gutil.log).pipe(gulp.dest(DEST.build)).pipe connect.reload()

gulp.task TASKS.clean, (cb) ->
  del DEST.build, cb

gulp.task TASKS.jades, ->
  gulp.src(SRC.app.jade).pipe(changed(DEST.build)).pipe(gulp.dest(DEST.build)).pipe connect.reload()

gulp.task TASKS.styles, ->
  gulp.src(SRC.app.css).pipe(changed(DEST.build)).pipe(gulp.dest(DEST.build)).pipe connect.reload()

gulp.task TASKS.watch, [ TASKS.scripts, TASKS.jades, TASKS.styles ], ->
  gulp.watch SRC.app.css, [ TASKS.styles ]
  gulp.watch SRC.app.coffee, [ TASKS.scripts ]
  gulp.watch SRC.app.jade, [ TASKS.htmls ]

gulp.task TASKS.connect, [ TASKS.watch ], ->
  gulp.src(DEST.build).pipe run("coffee bin/www")

gulp.task TASKS.build, [ TASKS.scripts, TASKS.jades, TASKS.styles ], ->
