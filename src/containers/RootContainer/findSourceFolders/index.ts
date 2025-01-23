import { glob } from 'fast-glob';
import { join, basename } from 'node:path';
import { readdir } from 'node:fs/promises';

import type { HiddenHeaven, Internals } from '../../../types';

async function readSourceFolder(folderPath: string): Promise<HiddenHeaven.SourceFolder> {
    const children = await readdir(folderPath, { withFileTypes: true });

    return {
        name: basename(folderPath),
        absolutePath: folderPath,

        children: children.map((child) => ({
            name: child.name,
            absolutePath: join(folderPath, child.name),

            type: child.isDirectory() ? 'folder' : 'file',
            isDirectory: child.isDirectory(),
            isFile: child.isFile(),
        })),
    };
}

export async function findSourceFolders(config: Internals.Context): Promise<HiddenHeaven.SourceFolder[]> {
    const { cwd, sourceFolderName } = config;

    const sourceFolders = await glob(`${cwd}/**/${sourceFolderName}`, {
        dot: true,
        absolute: true,
        followSymbolicLinks: true,
        onlyDirectories: true,
    });

    const promises = sourceFolders.map(readSourceFolder);

    return Promise.all(promises);
}
