const gulp = require("gulp");
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cssnano = require("cssnano");
const concat = require('gulp-concat');
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require('gulp-uglify');

function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./"
        }
    });
    done();
}

function browserSyncReload(done) {
    browsersync.reload();
    done();
}

function css() {
    return gulp
        .src("./src/sass/**/*.sass")
        .pipe(plumber())
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(gulp.dest("./src/css/"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest("./src/css/"))
        .pipe(browsersync.stream());
}

function js() {
    return gulp
        .src([
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/jquery-form-validator/form-validator/jquery.form-validator.js',
            './src/js/src/**/*.js'
        ])
        .pipe(concat('opti-widget.js'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(uglify())
        .pipe(gulp.dest('./src/js/dist'))
        .pipe(browsersync.stream());
}

function watchFiles() {
    gulp.watch("./src/sass/**/*", css);
    gulp.watch("./src/js/src/**/*", js);
    gulp.watch("./src/js/dist/**/*", browserSyncReload);
    gulp.watch("./src/scripts/**/*", browserSyncReload);
}


const build = gulp.parallel(js, css);
const watch = gulp.parallel(js, css, watchFiles, browserSync);

// export tasks
exports.css = css;
exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = watch;
