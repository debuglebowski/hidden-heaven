import { glob } from 'fast-glob';
import { dirname } from 'node:path';
import type { Internals } from '~/types';

export async function findPackagePaths(context: Internals.Context) {
    const { cwd } = context;

    const packageJsonPath = await glob(`${cwd}/**/package.json`, {
        dot: true,
        absolute: true,
        ignore: ['**/node_modules/**'],
    });

    return packageJsonPath.map((packageJsonPath) => {
        return dirname(packageJsonPath);
    });
}
