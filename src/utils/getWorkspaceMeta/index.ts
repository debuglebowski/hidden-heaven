import { fse } from '../fse';
import type { Internals } from '../../types';
import { createPaths } from '../paths';

export async function getWorkspaceMeta(context: Internals.Context) {
    const { sourceFolderName } = context;

    const paths = createPaths(context);

    return {
        hasSourceFolder: await fse.exists(sourceFolderName),

        hasGitignore: await fse.exists(paths.gitignore),

        isVsCodeProject: await fse.exists(paths.vscode.settings),
    };
}
