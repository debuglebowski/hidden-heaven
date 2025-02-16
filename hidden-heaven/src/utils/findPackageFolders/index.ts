import type { Context, HiddenHeaven } from '~/types';
import { createItemObject } from '~/utils';
import { glob } from '../glob';

export async function findPackageFolders(context: Context): Promise<HiddenHeaven.PackageFolder[]> {
    const { include = [], exclude = [] } = context.find?.packages || {};

    const packagePaths = await glob(include, {
        dot: true,
        absolute: true,
        ignore: ['**/node_modules/**', ...exclude],
    });

    return packagePaths.map((packagePath) => {
        return createItemObject(context, packagePath, {});
    });
}
