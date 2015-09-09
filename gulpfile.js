var fs = require("fs");
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var eslint = require("gulp-eslint");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");
var docco = require("docco");
var packagejson = JSON.parse(fs.readFileSync("./package.json"));

gulp.task("populateBower", function(cb) {
  "use strict";
  packagejson = JSON.parse(fs.readFileSync("./package.json")); // Grab changes if any
  var bowerjson = {
    name: packagejson["ansballard-bowername"] || packagejson.name,
    main: packagejson.main,
    version: packagejson.version,
    homepage: packagejson.homepage,
    authors: [packagejson.author],
    description: packagejson.description,
    moduleType: [
      "globals",
      "node",
      "amd"
    ],
    repository: {
      type: "git",
      url: packagejson.repository.url
    },
    keywords: packagejson.keywords,
    ignore: [
      "**/.*",
      "node_modules",
      "bower_components",
      "test",
      "tests"
    ]
  };
  fs.writeFile("bower.json", JSON.stringify(bowerjson, null, 4), function(err) {
    if(err) {
      throw "bower.json could not be written, exiting...";
    } else {
      cb();
    }
  });
});

gulp.task("lintmain", function() {
  "use strict";
  return gulp.src("paginate.js")
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
  ;
});

gulp.task("linttests", function() {
  "use strict";
  return gulp.src("./" + packagejson.directories.test)
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
  ;
});

gulp.task("build", ["lintmain", "linttests"], function() {
  "use strict";
  return gulp.src(packagejson.main)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(uglify({
      preserveComments: "some"
    }))
    .pipe(rename({
      extname: ".min.js"
    }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./"))
  ;
});

gulp.task("docs", function(cb) {
  "use strict";
  docco.document({
    "args": [packagejson.main]
  }, cb);
});

gulp.task("default", ["build", "populateBower", "docs"]);

gulp.task("watch", ["default"], function() {
  "use strict";
  gulp.watch(packagejson.main, ["build", "docs"]);
  gulp.watch("package.json", ["populateBower"]);
});
