import { dirname } from 'node:path';
import type { Context, HiddenHeaven } from '~/types';
import { createItem, fse } from '~/utils';
import { glob } from '../../../utils/glob';

export async function findPackageFolders(context: Context): Promise<HiddenHeaven.PackageFolder[]> {
    const { cwd, find } = context;
    const { include = ['**/package.json'], exclude = [] } = find?.packages || {};

    const paths = await glob(include, {
        cwd,
        dot: true,
        absolute: true,
        ignore: ['**/node_modules/**', ...exclude],
    });

    const paths__directories = paths.map((path) => {
        const stats = fse.statSync(path);

        return stats.isDirectory() ? path : dirname(path);
    });

    return paths__directories.map((path) => {
        return createItem(context, path, {});
    });
}
