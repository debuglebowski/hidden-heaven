import type { Context, HiddenHeaven } from '~/types';
import { glob, createItemObject } from '~/utils';

const defaultItems = {
    include: ['.*', '*.*'],
    exclude: ['package.json'],
};

const defaultExclude = ['**/node_modules/**'];

const globConfig = { dot: true, absolute: true, stats: true } as const;

export async function findSourceItems(
    context: Context,
    packageFolder: HiddenHeaven.PackageFolder,
): Promise<HiddenHeaven.SourceItem[]> {
    const { linkFolderName, find = {} } = context;
    const { items = defaultItems } = find;
    const { include = [], exclude = [] } = items;

    const cwd = packageFolder.absolutePath;
    const ignore = [...defaultExclude, ...exclude, linkFolderName];

    const results = await glob(include, { ...globConfig, cwd, onlyFiles: false, ignore });

    return results.map((result) => {
        const { name, path, dirent } = result;

        const isDirectory = dirent.isDirectory();
        const isFile = dirent.isFile();

        const type = isDirectory ? 'folder' : 'file';

        return createItemObject(context, path, { name, type, isDirectory, isFile });
    });
}
