import path from 'path'
import { existsSync } from 'fs'

if (!existsSync(resolveFromRoot('package.json'))) {
    throw new Error('You need to run yarn dev/start from the project root to avoid path resolution issues')
}

export function resolveFromRoot(...args: string[]): string {
    return path.resolve(process.cwd(), ...args)
}
