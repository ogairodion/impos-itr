"use strict";

import {
    paths
} from "../gulpfile.babel";
import gulp from "gulp";
import debug from "gulp-debug";

gulp.task("audios", () => {
    return gulp.src(paths.audios.src)
        .pipe(gulp.dest(paths.audios.dist))
        .pipe(debug({
            "title": "Audios"
        }));
});
