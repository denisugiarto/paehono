//global variable
const { src, dest, parallel, series, watch, task } = require("gulp");
const browsersync = require("browser-sync");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const webp = require("gulp-webp");
const date = new Date().toISOString().slice(0, 10);
const ghPages = require("gulp-gh-pages");

//deploy
task("deploy", function () {
  return src("./site/**/*").pipe(ghPages());
});

// HTML-task variable
const nunjucksRender = require("gulp-nunjucks-render");

//css-task variable
const sass = require("gulp-sass");
const csso = require("gulp-csso");
const autoprefixer = require("gulp-autoprefixer");

//js-task variable
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

//image-task variable
const imagemin = require("gulp-imagemin");

const purgecss = require("gulp-purgecss");

//staging & delivery variable
const copy = require("gulp-copy");

// css task
function scss() {
  return src("./src/sass/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({ outputStyle: "expanded", errLogToConsole: true }).on(
        "error",
        sass.logError
      )
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    // .pipe(concat("style.min.css"))
    .pipe(csso())
    .pipe(sourcemaps.write("../maps"))
    .pipe(dest("./site/assets/css/"));
}

// javascript task
function js() {
  return src("./src/js/**/*.js").pipe(dest("./site/assets/js/"));
}
// template engine
function njk() {
  return src("./src/templates/pages/**/*.+(html|nunjucks|njk)")
    .pipe(
      nunjucksRender({
        path: ["./src/templates/components"],
      })
    )
    .pipe(dest("./site"));
}

// css optimizing
function cssOptimize() {
  return src("./site/assets/css/style.css")
    .pipe(
      purgecss({
        content: ["./site/**/*.html"],
        safelist: [],
      })
    )
    .pipe(rename("style-optimize.css"))
    .pipe(dest("./site/assets/css"));
}

// image optimizing
function img() {
  return src([
    "./src/img/*.+(png|jpg|gif|svg)",
    "./src/img/**/*.+(png|jpg|gif|svg)",
  ])
    .pipe(imagemin())
    .pipe(webp())
    .pipe(dest("./site/assets/img"));
}

//  browserSync
function browserSync () {
  browsersync.init({
    server: "./site",
  });
}

// BrowserSync reload
function browserReload() {
  return browsersync.reload();
}

// static server & task watch
function watchFiles() {
  // watch scss
  watch("src/sass/**/*.scss", { usePolling: true }).on(
    "change",
    series(scss, browserReload)
  );
  // Watch javascripts
  watch("src/js/**/*.js", { usePolling: true }).on(
    "change",
    series(js, browserReload)
  );
  // Watch images
  watch(["src/img/**/*.+(png|jpg|gif|svg)"], { usePolling: true }).on(
    "change",
    series(img, browserReload)
  );
  // Watch template
  watch(["src/templates/**/**/*.+(html|nunjucks|njk)"], {
    usePolling: true,
  }).on("change", series(njk, browserReload));
}


task("optimize", function img() {
  return src([
    "./src/img/*.+(png|jpg|jpeg|gif|svg|PNG|JPG|JPEG|GIF|SVG)",
    "./src/img/**/*.+(png|jpg|jpeg|gif|svg|PNG|JPG|JPEG|GIF|SVG)",
  ])
    .pipe(
      imagemin({
        verbose: true,
      })
    )
    .pipe(webp())
    .pipe(dest("./site/assets/img"));
});

task("html", function njk() {
  return src("./src/templates/pages/**/*.+(html|nunjucks|njk)")
    .pipe(
      nunjucksRender({
        path: ["./src/templates/components"],
      })
    )
    .pipe(dest("./site"));
});
task("reload", function browserReload() {
  return browsersync.reload;
});

const watching = parallel(watchFiles, browserSync);

// exports.js = js;
exports.css = cssOptimize;
exports.scss = scss;
exports.default = parallel(img, scss, js, njk);
exports.watch = watching;
