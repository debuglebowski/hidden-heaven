import { join } from 'node:path';
import type { Internals } from '../../types';

export function createPaths(context: Internals.Context) {
    const { cwd } = context;

    return {
        vscode: {
            settings: join(cwd, '.vscode', 'settings.json'),
        },

        gitignore: join(cwd, '.gitignore'),
    };
}
