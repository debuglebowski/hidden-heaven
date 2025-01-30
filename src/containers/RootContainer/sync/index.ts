import type { RootContainer } from '..';
import { getWorkspaceMeta } from '~/utils';

export async function sync(this: RootContainer) {
    const { context, sourceFolderContainers } = this;
    const { initMode } = context;

    const { isVsCodeProject, hasGitignore } = await getWorkspaceMeta(context);

    const gitignore__default = hasGitignore || !!initMode;
    const vscode__default = isVsCodeProject || !!initMode;

    const { gitignore = gitignore__default, vscode = vscode__default } = context;

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
