import type { RootContainer } from '..';
import { getWorkspaceMeta } from '../../../utils';

export async function syncAll(this: RootContainer) {
    const { isVsCodeProject, hasGitignore } = await getWorkspaceMeta(this.context);

    const { context, sourceFolderContainers } = this;
    const { gitignore = hasGitignore, vscode = isVsCodeProject } = context;

    const syncPromises = sourceFolderContainers.map((sourceFolderContainer) => {
        return sourceFolderContainer.sync();
    });

    if (gitignore) {
        await this.write.gitignore();
    }

    if (vscode) {
        await this.write.vscode();
    }

    await this.triggerCallbacks();

    await Promise.all(syncPromises);
}
