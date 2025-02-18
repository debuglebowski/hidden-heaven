import { join, relative } from 'node:path';
import type { Context, HiddenHeaven } from '~/types';
import { createItemObject, execSync, fse } from '~/utils';
import { findSourceItems } from './index.source';

export class PackageContainer {
    static async fromFolder(context: Context, packageFolder: HiddenHeaven.PackageFolder) {
        const sourceItems = await findSourceItems(context, packageFolder);

        return new PackageContainer(context, packageFolder, sourceItems);
    }

    private constructor(
        readonly context: Context,
        readonly packageFolder: HiddenHeaven.PackageFolder,
        readonly sourceItems: HiddenHeaven.SourceItem[],
    ) {}

    get packageLinkFolder(): HiddenHeaven.LinkFolder {
        const { context, packageFolder } = this;
        const { absolutePath } = packageFolder;
        const { linkFolderName } = context;

        const linkFolderPath = join(absolutePath, linkFolderName);

        return createItemObject(context, linkFolderPath, { packageFolder });
    }

    get linkItems() {
        return this.sourceItems.map((sourceItem) => {
            return this.createLinkItem(sourceItem);
        });
    }

    createLinkItem(sourceItem: HiddenHeaven.SourceItem): HiddenHeaven.LinkItem {
        const { context, packageLinkFolder } = this;
        const { name } = sourceItem;

        const absolutePath = `${packageLinkFolder.absolutePath}/${name}`;

        return createItemObject(context, absolutePath, { sourceItem, parent: packageLinkFolder });
    }

    async syncLinkItem(linkItem: HiddenHeaven.LinkItem) {
        const linkFolderAbsolutePath = this.packageLinkFolder.absolutePath;
        const linkItemAbsolutePath = linkItem.absolutePath;

        const sourceItemAbsolutePath = linkItem.sourceItem.absolutePath;
        const sourceItemRelativePath = relative(linkFolderAbsolutePath, sourceItemAbsolutePath);

        execSync(['ln', '-sf', sourceItemRelativePath, linkItemAbsolutePath]);
    }

    async reset() {
        await fse.remove(this.packageLinkFolder.absolutePath);
    }

    async sync() {
        await fse.ensureDir(this.packageLinkFolder.absolutePath);

        const promises = this.linkItems.map((linkItem) => {
            return this.syncLinkItem(linkItem);
        });

        await Promise.all(promises);
    }
}
