import type { Context } from '~/types';
import { PackageContainer } from '~/containers';

import { triggerCallbacks } from './triggerCallbacks';
import { vscode__sync } from './vscode.sync';
import { sync } from './sync';
import { init } from './init';
import { initContext, validateContext } from '~/utils';
import { reset } from './reset';
import { findPackageFolders } from './index.packages';
import { vscode__reset } from './vscode.reset/index.reset';
import { show } from './show';

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

    get flatSourceItems() {
        return this.packageContainers.flatMap((sourceFolderContainer) => {
            return sourceFolderContainer.sourceItems;
        });
    }

    get flatLinkItems() {
        return this.packageContainers.flatMap((sourceFolderContainer) => {
            return sourceFolderContainer.linkItems;
        });
    }

    vscode = {
        write: vscode__sync.bind(this),
        reset: vscode__reset.bind(this),
    };

    triggerCallbacks = triggerCallbacks.bind(this);

    sync = sync.bind(this);

    init = init.bind(this);

    reset = reset.bind(this);

    show = show.bind(this);
}
