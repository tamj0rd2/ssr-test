import del from 'del'
import { series, parallel, TaskFunction, src, dest, watch } from 'gulp'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'
import { spawn } from 'child_process'
import webpack from 'webpack'
import prodConfig from './src/config/webpack.prod'

const distFolder = 'dist'

const clean: TaskFunction = async cb => {
  await del(distFolder, { force: true })
  cb()
}

const copyHtml: TaskFunction = cb => {
  src(['src/**/*.html'])
    .pipe(dest(distFolder))
    .on('end', cb)
}

const transpileTs: TaskFunction = cb => {
  src(['src/**/*.{ts,tsx}'])
    .pipe(babel())
    .pipe(dest(distFolder))
    .on('end', cb)
}

const buildBundles: TaskFunction = cb => {
  webpack(prodConfig, (err, stats) => {
    if (err) {
      return cb(err)
    }

    console.log(stats.toString({ colors: true }))
    stats.hasWarnings() || stats.hasErrors() ? cb(stats) : cb()
  })
}

export const build = series(clean, parallel(copyHtml, transpileTs, buildBundles))

// TODO: fix client sourcemaps when attached to process
const transpileTsDev = (globs: string[], destination: string) =>
  src(globs)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(dest(destination))

const buildDev: TaskFunction = cb => {
  transpileTsDev(['src/**/*.{ts,tsx}'], distFolder).on('end', cb)
}

export function watchClient() {
  const clientGlob = 'src/client/**/*.{ts,tsx}'
  watch(clientGlob, function transpileClient(cb) {
    transpileTsDev([clientGlob], `${distFolder}/client`).on('end', cb)
  })
}

const startDev: TaskFunction = cb => {
  spawn('node', ['-r', 'source-map-support/register', '--inspect', `dist/server/index.js`], {
    stdio: 'inherit',
  }).on('exit', cb)
}

export const dev = series(clean, parallel(copyHtml, buildDev), parallel(watchClient, startDev))
