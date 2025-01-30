import { join } from 'node:path';
import type { Internals } from '~/types';

export function createPaths(context: Internals.Context) {
    const { cwd, sourceFolderName } = context;

    return {
        defaultConfigFile: join(cwd, sourceFolderName, '.hide.json'),

        sourceFolder: join(cwd, sourceFolderName),

        vscode: {
            settings: join(cwd, '.vscode', 'settings.json'),
        },

        gitignore: join(cwd, '.gitignore'),
    };
}
