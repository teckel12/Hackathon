var gulp = require("gulp");
var compass = require("gulp-compass");
var autoprefixer = require("gulp-autoprefixer");
var browsersync = require("browser-sync");

// Compile sass
gulp.task("sass", function() {
	gulp.src("sass/**/*.scss")
		.pipe(compass({
			css: "css",
            sass: "sass",
            image: "images",
            javascript: "scripts",
            comments: false,
            style: "expanded", // Make compact or compressed for production (default expanded)
            sourcemap: true // Make false for production (default true)
		}))
        .pipe(autoprefixer("> 0.05%", "last 3 versions", "IE >= 8", "Firefox >= 4", "Safari >= 5", "iOS >= 4", "Android >= 3", {
			cascade: false,
			remove: false
		}))
		.pipe(gulp.dest("css"))
		.pipe(browsersync.reload({ stream: true }));
});

// Start browser sync
gulp.task('browser-sync', function() {
    browsersync.init(null, {
        server: {
            baseDir: "./"
        }
    });
});

// Force reload (for HTML)
gulp.task('bs-reload', function () {
    browsersync.reload();
});

gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("sass/**/*.scss", ['sass']);
    gulp.watch("*.html", ['bs-reload']);
});