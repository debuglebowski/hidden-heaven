import { glob } from 'fast-glob';
import { join, basename } from 'node:path';
import { readdir } from 'node:fs/promises';

import type { HiddenHeaven, Internals } from '../../../types';
import { createRelativePath } from '../../../utils';

async function readSourceFolder(
    context: Internals.Context,
    absoluteSourceFolderPath: string,
): Promise<HiddenHeaven.SourceFolder> {
    const children = await readdir(absoluteSourceFolderPath, { withFileTypes: true });

    return {
        name: basename(absoluteSourceFolderPath),

        absolutePath: absoluteSourceFolderPath,
        relativePath: createRelativePath(context, absoluteSourceFolderPath),

        children: children.map((child) => {
            const absoluteSourceItemPath = join(absoluteSourceFolderPath, child.name);

            return {
                name: child.name,

                absolutePath: absoluteSourceItemPath,
                relativePath: createRelativePath(context, absoluteSourceItemPath),

                type: child.isDirectory() ? 'folder' : 'file',
                isDirectory: child.isDirectory(),
                isFile: child.isFile(),
            };
        }),
    };
}

export async function findSourceFolders(context: Internals.Context): Promise<HiddenHeaven.SourceFolder[]> {
    const { cwd, sourceFolderName } = context;

    const sourceFolders = await glob(`${cwd}/**/${sourceFolderName}`, {
        dot: true,
        absolute: true,
        followSymbolicLinks: true,
        onlyDirectories: true,
    });

    const promises = sourceFolders.map((folderPath) => {
        return readSourceFolder(context, folderPath);
    });

    return Promise.all(promises);
}
