import type { Internals } from '../../types';
import { getWorkspaceMeta } from '../../utils';
import { SourceFolderContainer } from '../SourceFolderContainer';
import { findSourceFolders } from './findSourceFolders';
import { validateContext } from './validateContext';
import { write__gitignore } from './write.gitignore';
import { write__vscode } from './write.vscode';

export class RootContainer {
    static async fromContext(context: Internals.Context) {
        await validateContext(context);

        const sourceFolders = await findSourceFolders(context);

        const sourceFolderContainers = sourceFolders.map((sourceFolder) => {
            return new SourceFolderContainer(context, sourceFolder);
        });

        return new RootContainer(context, sourceFolderContainers);
    }

    private constructor(
        readonly context: Internals.Context,
        readonly sourceFolderContainers: SourceFolderContainer[],
    ) {}

    get flatTargetItems() {
        return this.sourceFolderContainers.flatMap((sourceFolderContainer) => {
            return sourceFolderContainer.targetItems;
        });
    }

    write = {
        vscode: write__vscode.bind(this),
        gitignore: write__gitignore.bind(this),
    };

    async triggerCallbacks() {
        const { context, sourceFolderContainers, flatTargetItems } = this;

        for (const sourceFolderContainer of sourceFolderContainers) {
            for (const targetItem of sourceFolderContainer.targetItems) {
                const { sourceItem, targetFolder } = targetItem;

                await this.context.onItem?.({ targetItem, targetFolder, sourceItem, context });
            }
        }

        await this.context.onItems?.({
            targetItems: flatTargetItems,
            context,
        });
    }

    async syncAll() {
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

    async clean() {
        const cleanPromises = this.sourceFolderContainers.map((sourceFolderContainer) => {
            return sourceFolderContainer.clean();
        });

        await Promise.all(cleanPromises);
    }
}
