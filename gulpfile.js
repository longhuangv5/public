/**
 * Created by Administrator on 2017/3/9 0009.
 */
var gulp = require('gulp'),
    cssmin = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('cssmin', function () {//css
    gulp.src('base/mobile_css/**/*.css')
        .pipe(cssmin({
            keepSpecialComments: '*'
        }))
        .pipe(concat('base-mobile.css'))
        .pipe(gulp.dest('dist/base/mobile'));

    gulp.src('base/mobile_css/**/*.{otf,eot,svg,ttf,woff}')
        .pipe(gulp.dest('dist/base/mobile'));

    gulp.src('tools/mobile_css/*.css')
        .pipe(cssmin({
            keepSpecialComments: '*'
        }))
        .pipe(concat('tools-mobile.css'))
        .pipe(gulp.dest('dist/tools/mobile'));

    gulp.src('custom/mobile_css/*.css')
        .pipe(cssmin({
            keepSpecialComments: '*'
        }))
        .pipe(concat('custom-mobile.css'))
        .pipe(gulp.dest('dist/custom/mobile'));

    gulp.src('base/pc_css/*.css')
        .pipe(cssmin({
            keepSpecialComments: '*'
        }))
        .pipe(concat('base-pc.css'))
        .pipe(gulp.dest('dist/base/pc'));

    gulp.src(['tools/pc_css/bootstrap.css','tools/pc_css/**/*.css'])
        .pipe(cssmin({
            keepSpecialComments: '*'
        }))
        .pipe(concat('tools-pc.css'))
        .pipe(gulp.dest('dist/tools/pc'));

    gulp.src('tools/pc_css/**/*.{otf,eot,svg,ttf,woff}')
        .pipe(gulp.dest('dist/tools'));

    gulp.src('custom/pc_css/*.css')
        .pipe(cssmin({
            keepSpecialComments: '*'
        }))
        .pipe(concat('custom-pc.css'))
        .pipe(gulp.dest('dist/custom/pc'));
});

gulp.task('jsmin', function () {//js
    gulp.src(['base/mobile_js/ionic.bundle.min.js','base/mobile_js/*.js'])
        .pipe(uglify({
            mangle: {except: ['require', 'exports', 'module', '$']},//类型：Boolean 默认：true 是否修改变量名 //排除关键字
            compress: true,//类型：Boolean 默认：true 是否完全压缩
            preserveComments: function () {
                return false;
            }
        }))
        .pipe(concat('base-mobile.js'))
        .pipe(gulp.dest('dist/base/mobile'));

    gulp.src('tools/mobile_js/*.js')
        .pipe(uglify({
            mangle: {except: ['require', 'exports', 'module', '$']},
            compress: true,
            preserveComments: function () {
                return false;
            }
        }))
        .pipe(concat('tools-mobile.js'))
        .pipe(gulp.dest('dist/tools/mobile'));

    gulp.src('custom/mobile_js/*.js')
        .pipe(uglify({
            mangle: {except: ['require', 'exports', 'module', '$']},
            compress: true,
            preserveComments: function () {
                return false;
            }
        }))
        .pipe(concat('custom-mobile.js'))
        .pipe(gulp.dest('dist/custom/mobile'));

    gulp.src(['base/pc_js/angular.js','base/pc_js/jquery.min.js','base/pc_js/*.js'])
        .pipe(uglify({
            mangle: {except: ['require', 'exports', 'module', '$']},//类型：Boolean 默认：true 是否修改变量名 //排除关键字
            compress: true,//类型：Boolean 默认：true 是否完全压缩
            preserveComments: function () {
                return false;
            }
        }))
        .pipe(concat('base-pc.js'))
        .pipe(gulp.dest('dist/base/pc'));

    gulp.src(['tools/pc_js/ui-bootstrap-tpls.js','tools/pc_js/toaster.js','tools/pc_js/*.js'])
        .pipe(uglify({
            mangle: {except: ['require', 'exports', 'module', '$']},
            compress: true,
            preserveComments: function () {
                return false;
            }
        }))
        .pipe(concat('tools-pc.js'))
        .pipe(gulp.dest('dist/tools/pc'));

    gulp.src('custom/pc_js/*.js')
        .pipe(uglify({
            mangle: {except: ['require', 'exports', 'module', '$']},
            compress: true,
            preserveComments: function () {
                return false;
            }
        }))
        .pipe(concat('custom-pc.js'))
        .pipe(gulp.dest('dist/custom/pc'));

    gulp.src('other/umeditor.js')
        .pipe(uglify({
            mangle: {except: ['require', 'exports', 'module', '$']},
            compress: true,
            preserveComments: function () {
                return false;
            }
        }))
        .pipe(concat('umeditor.min.js'))
        .pipe(gulp.dest('dist/other/js'));
});

gulp.task('default', ['cssmin', 'jsmin']);