
let project_folder = "dist";
let source_folder = "src";
let fs = require('fs');


let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
        },
        src: {
            html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
            css: source_folder+ "/scss/main.scss",
            js: source_folder+ "/js/app.js",
            img: source_folder+ "/img/**/*.{jpg,png,svg,gif,ico,webp}",
            fonts: source_folder+ "/fonts/*.ttf",
		  },
           watch: {
                html: source_folder+ "/**/*.html",
                css: source_folder+ "/scss/**/*.scss",
                js: source_folder+ "/js/**/*.js",
                img: source_folder+ "/img/**/*.{jpg,png,svg,gif,ico,webp}",
                },
                clean: "./" + project_folder + "/",

				}

let { src, dest, task } = require('gulp');
gulp = require('gulp');
browsersync = require("browser-sync").create();
fileinclude = require("gulp-file-include");
del = require("del");
scss = require("gulp-sass");
autoprefixer = require("gulp-autoprefixer");
group_media = require("gulp-group-css-media-queries");
clean_css = require("gulp-clean-css");
rename = require("gulp-rename");
uglify = require("gulp-uglify-es").default;
imagemin = require("gulp-imagemin");
svgSprite = require("gulp-svg-sprite");
ttf2woff = require("gulp-ttf2woff");
ttf2woff2 = require("gulp-ttf2woff2");
fonter = require("gulp-fonter");
concat = require("gulp-concat");
uglifyjs = require("gulp-uglifyjs");

//BrowserSync
function browserSync(params) {
    browsersync.init({
server:{
    baseDir: "./" + project_folder + "/"
},
port:3000,
notify:false
    })
}
//HTML
function html() {
return src(path.src.html)
.pipe(fileinclude())
.pipe(dest(path.build.html))
.pipe(browsersync.stream())
}
//SCSS
function css() {
return src(path.src.css)
.pipe(
           scss({
         outputStyle: "expanded"
       }) 
)
   .pipe(
       group_media()
)
.pipe(
autoprefixer({
    overrideBrowserslist: ["last 5 versions"],
    cascade: true
})
)
.pipe(dest(path.build.css))
.pipe(clean_css())
.pipe(
    rename({
        extname: ".min.css"
    })
)
.pipe(dest(path.build.css))
.pipe(browsersync.stream())
}
// JavaScript
function js() {
    return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(
        uglify()
    )
    .pipe(
        rename({
            extname: ".min.js"
        })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
    }
//Images
    function images() {
        return src(path.src.img)
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewbox: false }],
                interlaced: true,
                optimizationLevel: 3 // 0 to 7
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
        }
//SVG Sprite task --Manual start--
        gulp.task('svgSprite', function () {
            return gulp.src([source_folder + '/iconsprite/*.svg'])
            .pipe(svgSprite({
              mode: {
                  stack: {
                      sprite: "../icons/icons.svg", //sprite file name
                     // example: true //Run if demand
                }
            }, 
        }
        ))
            .pipe(dest(path.build.img))
    })
//Fonts
        function fonts(params) {
            src(path.src.fonts)
            .pipe(ttf2woff())
            .pipe(dest(path.build.fonts));
           return src(path.src.fonts)
            .pipe(ttf2woff2())
            .pipe(dest(path.build.fonts));
        }
//Fonts otf2ttf --Manual start
gulp.task('otf2ttf', function () {
    return src([source_folder + '/fonts/*.otf']) 
    .pipe(fonter({
        formats: ['ttf']
    }))
    .pipe(dest(source_folder + '/fonts/'));//выгрузка в папку исходников
    })
//FontStyle
        function fontsStyle(params) {
            let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
if (file_content == '') {
fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
return fs.readdir(path.build.fonts, function (err, items) {
if (items) {
let c_fontname;
for (var i = 0; i < items.length; i++) {
let fontname = items[i].split('.');
fontname = fontname[0];
if (c_fontname != fontname) {
fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
}
c_fontname = fontname;
}
}
})
}
        }

        function cb() {
        }

		  function scripts() {
			return src([ 
				'node_modules/jquery/dist/jquery.min.js', 
				'node_modules/inputmask/dist/jquery.inputmask.min.js',
				'node_modules/micromodal/dist/micromodal.min.js',
				'node_modules/owl-carousel/owl-carousel/owl.carousel.min.js',
				 ])
				 .pipe(concat('libs.min.js')) 
				 .pipe(uglifyjs()) // Сжатие JS файла
				 .pipe(gulp.dest(source_folder + "/js"))
				 .pipe(dest(path.build.js))
				 .pipe(browsersync.stream())
				
	  }

//Watch files
function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, scripts, css, html, images, fonts), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.scripts = scripts;
exports.js = js;
exports.css = css;
exports.html = html;
exports.images = images;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;