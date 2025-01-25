import { fse } from '../fse';
import type { Internals } from '../../types';
import { createPaths } from '../paths';

export async function getWorkspaceMeta(context: Internals.Context) {
    const paths = createPaths(context);

    const hasGitignore = await fse.exists(paths.gitignore);

    const isVsCodeProject = await fse.exists(paths.vscode.settings);

    return { isVsCodeProject, hasGitignore };
}
