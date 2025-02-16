import { fse } from '../fse';
import type { Context } from '~/types';
import { createPaths } from '../paths';

export async function getWorkspaceMeta(context: Context) {
    const paths = createPaths(context);

    return {
        hasLinkFolder: await fse.exists(paths.linkFolder),

        hasGitignore: await fse.exists(paths.gitignoreFile),

        isVsCodeProject: await fse.exists(paths.vscodeSettingsFile),
    };
}
