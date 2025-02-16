import { join } from 'node:path';
import type { Context } from '~/types';

export function createPaths(context: Context) {
    const { cwd, linkFolderName } = context;

    const linkFolder = join(cwd, linkFolderName);

    return {
        linkFolder,

        defaultConfigFile: join(linkFolder, '.hide.json'),

        vscodeSettingsFile: join(cwd, '.vscode', 'settings.json'),

        gitignoreFile: join(cwd, '.gitignore'),
    };
}
