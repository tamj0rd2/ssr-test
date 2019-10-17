const { src, dest, series, parallel } = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const del = require("del")

const clean = async (cb) => {
  del.sync('dist', { force: true })
  cb()
}

const buildTs = async (cb) => {
  src(["src/**/*.ts", "src/**/*.tsx", "src/**/*.d.ts"], {base: '.'})
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.mapSources((sourcePath, file) => {
      return '../../../' + sourcePath
    }))
    .pipe(sourcemaps.write())
    .pipe(dest("dist"))
  cb()
}

const copyHtml = (cb) => {
  src(["src/server/**/*.html"], {base: '.'})
  . pipe(dest('dist'))
  cb()
}

exports.default = series(clean, buildTs, copyHtml)
