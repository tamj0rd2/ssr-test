declare module '@gulp-sourcemaps/map-sources' {
  type MapFn = (sourcePath: string, file: any) => string
  function mapSources(mapFn: MapFn): NodeJS.ReadWriteStream
  export = mapSources
}
