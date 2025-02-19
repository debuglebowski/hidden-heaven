import type { Context, HiddenHeaven } from '~/types';
import { glob, createItemObject } from '~/utils';

const globalExclude = ['**/node_modules/**', '.git'];

const defaultInclude: string[] = ['.*', '*.*'];
const defaultExclude: string[] = ['package.json'];

const globConfig = { dot: true, absolute: true, stats: true } as const;

export async function findSourceItems(
    context: Context,
    packageFolder: HiddenHeaven.PackageFolder,
): Promise<HiddenHeaven.SourceItem[]> {
    const { linkFolderName, find } = context;

    const include = find?.items?.include || defaultInclude;
    const exclude = find?.items?.exclude || defaultExclude;

    const cwd = packageFolder.absolutePath;
    const ignore = [...globalExclude, ...exclude, linkFolderName];

    const results = await glob(include, { ...globConfig, cwd, onlyFiles: false, ignore });

    return results.map((result) => {
        const { name, path, dirent } = result;

        const isDirectory = dirent.isDirectory();
        const isFile = dirent.isFile();

        const type = isDirectory ? 'folder' : 'file';

        return createItemObject(context, path, { name, type, isDirectory, isFile });
    });
}
