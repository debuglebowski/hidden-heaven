import type { Context, HiddenHeaven } from '~/types';
import { createItemObject } from '../createItemObject';
import { glob } from '../glob';

export async function findSourceItems(
    context: Context,
    packageFolder: HiddenHeaven.PackageFolder,
): Promise<HiddenHeaven.SourceItem[]> {
    const { include = [], exclude = [] } = context.find?.items || {};

    const results = await glob(include, {
        cwd: packageFolder.absolutePath,
        dot: true,
        absolute: true,
        ignore: ['**/node_modules/**', ...exclude],
        stats: true,
    });

    return results.map((result) => {
        const { name, path, dirent } = result;

        const isDirectory = dirent.isDirectory();
        const isFile = dirent.isFile();

        const type = isDirectory ? 'folder' : 'file';

        return createItemObject(context, path, { name, type, isDirectory, isFile });
    });
}
