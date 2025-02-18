import type { RootContainer } from '..';
import { getWorkspaceMeta } from '~/utils';

export async function sync(this: RootContainer) {
    const { context, packageContainers } = this;
    const { initMode } = context;

    const { isVsCodeProject } = await getWorkspaceMeta(context);

    const vscode__default = isVsCodeProject || !!initMode;

    const { vscode = vscode__default } = context;

    const syncPromises = packageContainers.map((container) => {
        return container.sync();
    });

    if (vscode) {
        await this.vscode.write();
    }

    await this.triggerCallbacks();

    await Promise.all(syncPromises);
}
