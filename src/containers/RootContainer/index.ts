import type { Context } from '~/types';
import { PackageContainer } from '~/containers';

import { triggerCallbacks } from './triggerCallbacks';
import { write__gitignore } from './write.gitignore';
import { write__vscode } from './write.vscode';
import { sync } from './sync';
import { init } from './init';
import { clean } from './clean';
import { findPackageFolders, initContext, validateContext } from '~/utils';
import { reset } from './reset';

export class RootContainer {
    static async fromContext(context: Context) {
        await validateContext(context);

        const packageFolders = await findPackageFolders(context);

        const packageContainerPromises = packageFolders.map((packageFolder) => {
            return PackageContainer.fromFolder(context, packageFolder);
        });

        const packageContainers = await Promise.all(packageContainerPromises);

        return new RootContainer(context, packageContainers);
    }

    static async init() {
        const context = await initContext();

        return RootContainer.fromContext(context);
    }

    private constructor(
        readonly context: Context,
        readonly packageContainers: PackageContainer[],
    ) {}

    get flatLinkItems() {
        return this.packageContainers.flatMap((sourceFolderContainer) => {
            return sourceFolderContainer.linkItems;
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
