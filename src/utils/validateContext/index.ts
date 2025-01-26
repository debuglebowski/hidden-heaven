import { stat } from 'node:fs/promises';
import type { Internals } from '../../types';

export async function validateContext(config: Internals.Context) {
    const { initMode, sourceFolderName, gitignore, vscode, map, onItem } = config;

    if (initMode) {
        if (initMode !== 'all' || typeof initMode !== 'boolean') {
            throw new Error('initMode must be a boolean or "all"');
        }
    }

    if (gitignore) {
        if (typeof gitignore !== 'boolean') {
            throw new Error('gitignore must be a boolean');
        }
    }

    if (vscode) {
        if (typeof vscode !== 'boolean') {
            throw new Error('vscode must be a boolean');
        }
    }

    if (map) {
        if (typeof map !== 'object') {
            throw new Error('map must be an object');
        }
    }

    if (onItem) {
        if (typeof onItem !== 'function') {
            throw new Error('onFile must be a function');
        }
    }

    const sourceFolderExists = await stat(sourceFolderName);

    if (!sourceFolderExists) {
        throw new Error(`Source folder ${sourceFolderName} is required`);
    }

    return config;
}
