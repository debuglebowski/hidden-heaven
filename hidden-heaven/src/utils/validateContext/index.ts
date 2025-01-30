import type { Internals } from '~/types';
import { fse } from '../fse';

export async function validateContext(context: Internals.Context) {
    const { initMode, sourceFolderName, gitignore, vscode, map, onItem } = context;

    if (initMode) {
        if (initMode !== 'all' && typeof initMode !== 'boolean') {
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

    if (!initMode) {
        const sourceFolderExists = await fse.exists(sourceFolderName);

        if (!sourceFolderExists) {
            throw new Error(`Source folder ${sourceFolderName} is required`);
        }
    }

    return context;
}
