var gulp = require('gulp'),
 sass = require('gulp-sass'),
 minifycss = require('gulp-minify-css'),
 plumber = require('gulp-plumber'),
 gutil = require('gulp-util'),
 concat = require('gulp-concat'),
 notify = require('gulp-notify'),
 uglify = require('gulp-uglify'),
 del = require('del'),
 browserSync = require('browser-sync');
// sass转换成css
gulp.task('sass', function() {
  return gulp.src('./app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
// 浏览器自动刷新
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
});

// 压缩js
gulp.task('js' , function(){
    return gulp.src('./app/js/*.js')
        // .pipe(jshint())
        // .pipe(jshint.reporter('default'))
        .pipe(plumber())
        .pipe(concat('all.js'))
        .pipe(uglify().on('error' , gutil.log))
        .pipe(gulp.dest('./app/dist/js'))
        .pipe(notify({ message: 'js task complete' }));
});
//  压缩css
gulp.task('mincss' , function(){
    return gulp.src('./app/css/*.css')
        .pipe(concat('all.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./app/dist/css'))
        .pipe(notify({ message: 'css task complete' }));
});
// 检测css变化
gulp.task('css', function () {
    gulp.watch('./app/css/*.css', ['mincss']);
}); 

//清理生成文件
// gulp.task('clean', function() {
//   del('./app/dist');
// });

// 删除除images/文件夹
gulp.task('clean', function(){
  del(['./app/dist/**/*', '!app/dist/css', '!app/dist/css/**/*'])
});

// 监听 模块
gulp.task('watch', ['browserSync', 'sass','js','css'], function (){
   gulp.watch('./app/scss/**/*.scss', ['sass']);
   gulp.watch('./app/js/*.js', ['js']);
   gulp.watch('./app/css/*.css', ['css']);
   gulp.watch('./app/css/*.css', browserSync.reload);
   gulp.watch('./app/*.html', browserSync.reload);
   gulp.watch('./app/js/**/*.js', browserSync.reload);
});

gulp.task('default',['clean' ,'watch','mincss' , 'js','sass','css'],  function(){
    gulp.start( 'clean','watch' ,'mincss' , 'js','sass','css');
});