import type { Internals } from '~/types';
import { SourceFolderContainer } from '~/containers';
import { findSourceFolders } from '~/utils/findSourceFolders';
import { triggerCallbacks } from './triggerCallbacks';
import { write__gitignore } from './write.gitignore';
import { write__vscode } from './write.vscode';
import { sync } from './sync';
import { init } from './init';
import { clean } from './clean';
import { initContext, validateContext } from '~/utils';
import { reset } from './reset';

export class RootContainer {
    static async fromContext(context: Internals.Context) {
        await validateContext(context);

        const sourceFolders = await findSourceFolders(context);

        const sourceFolderContainers = sourceFolders.map((sourceFolder) => {
            return new SourceFolderContainer(context, sourceFolder);
        });

        return new RootContainer(context, sourceFolderContainers);
    }

    static async init() {
        const context = await initContext();

        return RootContainer.fromContext(context);
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

    sync = sync.bind(this);

    init = init.bind(this);

    reset = reset.bind(this);

    clean = clean.bind(this);
}
