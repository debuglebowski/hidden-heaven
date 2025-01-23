import { stat } from 'node:fs/promises';

import type { Internals } from '../../../types';

export async function validateContext(config: Internals.Context) {
    const { sourceFolderName, gitignore, vscode, map, onItem: onFile } = config;

    if (gitignore) {
        if (typeof gitignore !== 'boolean') {
            throw new Error('gitignore must be a boolean');
        }
    }

    if (vscode) {
        if (typeof config.vscode !== 'boolean') {
            throw new Error('vscode must be a boolean');
        }
    }

    if (map) {
        if (typeof config.map !== 'object') {
            throw new Error('map must be an object');
        }
    }

    if (onFile) {
        if (typeof config.onItem !== 'function') {
            throw new Error('onFile must be a function');
        }
    }

    const sourceFolderExists = await stat(sourceFolderName);

    if (!sourceFolderExists) {
        throw new Error(`Source folder ${sourceFolderName} is required`);
    }

    return config;
}
