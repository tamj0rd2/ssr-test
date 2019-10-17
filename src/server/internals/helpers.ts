import path from 'path'
import { existsSync } from 'fs'

if (!existsSync(resolveFromRoot('package.json'))) {
  throw new Error('yarn dev/start needs to be run from the project root to avoid path resolution issues')
}

export function resolveFromRoot(...args: string[]): string {
  return path.resolve(process.cwd(), ...args)
}
