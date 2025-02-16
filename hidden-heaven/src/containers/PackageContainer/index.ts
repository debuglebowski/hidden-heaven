import { join } from 'node:path';
import type { Context, HiddenHeaven } from '~/types';
import { createItemObject, createRelativePath, execSync, findSourceItems, fse } from '~/utils';

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

    removeLinkItem(linkItem: HiddenHeaven.LinkItem) {
        return fse.remove(linkItem.absolutePath);
    }

    createLinkItem(sourceItem: HiddenHeaven.SourceItem): HiddenHeaven.LinkItem {
        const { packageLinkFolder } = this;
        const { name } = sourceItem;

        const absolutePath = `${packageLinkFolder.absolutePath}/${name}`;
        const relativePath = createRelativePath(this.context, absolutePath);

        return { name, absolutePath, relativePath, sourceItem, parent: packageLinkFolder };
    }

    async syncLinkItem(linkItem: HiddenHeaven.LinkItem) {
        await this.removeLinkItem(linkItem);

        execSync(['ln', '-sf', linkItem.sourceItem.absolutePath, linkItem.absolutePath]);
    }

    async clean() {
        const promises = this.linkItems.map((linkItem) => {
            return this.removeLinkItem(linkItem);
        });

        await Promise.all(promises);
    }

    async sync() {
        const promises = this.linkItems.map((linkItem) => {
            return this.syncLinkItem(linkItem);
        });

        await Promise.all(promises);
    }

    async reset() {
        await this.clean();

        for (const linkItem of this.linkItems) {
            await fse.move(linkItem.absolutePath, linkItem.sourceItem.absolutePath);
        }

        await fse.remove(this.packageFolder.absolutePath);
    }
}
