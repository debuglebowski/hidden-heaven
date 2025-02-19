import { dirname } from 'node:path';
import type { Context, HiddenHeaven } from '~/types';
import { createItemObject, fse, glob } from '~/utils';

const globalExclude = ['**/node_modules/**'];

const defaultInclude: string[] = ['**/package.json'];
const defaultExclude: string[] = [];

export async function findPackageFolders(context: Context): Promise<HiddenHeaven.PackageFolder[]> {
    const { cwd, find } = context;
    const { include = defaultInclude, exclude = defaultExclude } = find?.packages || {};

    const paths = await glob(include, {
        cwd,
        dot: true,
        absolute: true,
        ignore: [...globalExclude, ...exclude],
    });

    const paths__directories = paths.map((path) => {
        const stats = fse.statSync(path);

        return stats.isDirectory() ? path : dirname(path);
    });

    return paths__directories.map((path) => {
        return createItemObject(context, path, {});
    });
}
