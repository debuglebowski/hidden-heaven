import type { Internals } from '../../types';
import { SourceFolderContainer } from '../SourceFolderContainer';
import { findSourceFolders } from '../../utils/findSourceFolders';
import { triggerCallbacks } from './triggerCallbacks';
import { write__gitignore } from './write.gitignore';
import { write__vscode } from './write.vscode';
import { syncAll } from './syncAll';
import { init } from './init';
import { clean } from './clean';
import { validateContext } from '../../utils';

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

    triggerCallbacks = triggerCallbacks.bind(this);

    syncAll = syncAll.bind(this);

    init = init.bind(this);

    clean = clean.bind(this);
}
