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
            javascript: "js",
            comments: false,
            style: "compressed", // Make compact or compressed for production (default expanded)
            sourcemap: false // Make false for production (default true)
		}))
        .pipe(autoprefixer("> 0.1%", "IE >= 11", "Firefox >= 30", "Safari >= 8", "iOS >= 7", "Android >= 4.4", "Chrome >= 32", {
			cascade: false,
			remove: false
		}))
		.pipe(gulp.dest("css"))
		.pipe(browsersync.reload({ stream: true }));
});

// Start browser sync
gulp.task('default', ['sass'], function () {
    browsersync.init();
    gulp.watch("./sass/**/*.scss", ['sass']);
    gulp.watch(["./index.php", "./js/**/*.js"], ['bs-reload']);
});

// Force reload (for PHP or JS)
gulp.task('bs-reload', function () {
    browsersync.reload();
});