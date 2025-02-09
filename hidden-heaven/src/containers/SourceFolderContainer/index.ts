import { dirname, basename } from 'node:path';
import type { HiddenHeaven, Internals } from '~/types';
import { createRelativePath, execSync, fse } from '~/utils';

export class SourceFolderContainer {
    constructor(
        readonly context: Internals.Context,
        readonly sourceFolder: HiddenHeaven.SourceFolder,
    ) {}

    get targetFolder(): HiddenHeaven.TargetFolder {
        const { sourceFolder } = this;

        const absolutePath = dirname(sourceFolder.absolutePath);
        const relativePath = createRelativePath(this.context, absolutePath);

        const name = basename(absolutePath);

        return { name, absolutePath, relativePath, sourceFolder };
    }

    get targetItems() {
        return this.sourceFolder.items.map((sourceItem) => {
            return this.createTargetItem(sourceItem);
        });
    }

    removeTargetItem(targetItem: HiddenHeaven.TargetItem) {
        return fse.remove(targetItem.absolutePath);
    }

    createTargetItem(sourceItem: HiddenHeaven.SourceItem): HiddenHeaven.TargetItem {
        const { targetFolder } = this;
        const { map } = this.context;

        const name = map?.[sourceItem.name] ?? sourceItem.name;

        const absolutePath = `${targetFolder.absolutePath}/${name}`;
        const relativePath = createRelativePath(this.context, absolutePath);

        return { name, absolutePath, relativePath, sourceItem, targetFolder };
    }

    async syncTargetItem(targetItem: HiddenHeaven.TargetItem) {
        await this.removeTargetItem(targetItem);

        execSync(['ln', '-sf', targetItem.sourceItem.absolutePath, targetItem.absolutePath]);
    }

    async clean() {
        const promises = this.targetItems.map((targetItem) => {
            return this.removeTargetItem(targetItem);
        });

        await Promise.all(promises);
    }

    async sync() {
        const promises = this.targetItems.map((targetItem) => {
            return this.syncTargetItem(targetItem);
        });

        await Promise.all(promises);
    }

    async reset() {
        await this.clean();

        for (const targetItem of this.targetItems) {
            await fse.move(targetItem.absolutePath, targetItem.sourceItem.absolutePath);
        }

        await fse.remove(this.sourceFolder.absolutePath);
    }
}
