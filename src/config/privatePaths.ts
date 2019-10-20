import { resolve } from 'path'

const root = process.cwd()

export default {
  dist: resolve(root, 'dist'),
  public: resolve(root, 'dist', 'public'),
  stats: resolve(root, 'dist', 'loadable-stats.json'),
  clientDist: resolve(root, 'dist', 'client'),
  clientSrc: resolve(root, 'src', 'client'),
}
