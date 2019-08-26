var gulp = require("gulp");
var less = require("gulp-less");
var rename = require("gulp-rename");

var destaudit = "sqs/audit/style/";

function lessFromTo(fromFile, toFile) {
    var destff = toFile;
    //console.log(destff);
    return gulp.src("sqs/audit/style/" + fromFile)
        .pipe(less())
        .pipe(rename(destff))
        .pipe(gulp.dest(destaudit));
}

gulp.task("less", function (done) {
    lessFromTo("style.less", "style.css");
    done();
});

