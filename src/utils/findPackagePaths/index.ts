import { glob } from 'fast-glob';
import type { Internals } from '../../types';

export function findPackagePaths(context: Internals.Context) {
    const { cwd } = context;

    return glob(`${cwd}/**/package.json`, {
        dot: true,
        absolute: true,
        ignore: ['**/node_modules/**'],
    });
}
