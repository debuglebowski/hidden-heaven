import { rm } from 'node:fs/promises';
import { dirname, basename } from 'node:path';
import type { HiddenHeaven, Internals } from '../../types';
import { execSync } from '../../utils';

export class SourceFolderContainer {
    constructor(
        readonly context: Internals.Context,
        readonly sourceFolder: HiddenHeaven.SourceFolder,
    ) {}

    get targetFolder(): HiddenHeaven.TargetFolder {
        const absolutePath = dirname(this.sourceFolder.absolutePath);
        const name = basename(absolutePath);

        return { name, absolutePath };
    }

    removeTargetItem(targetItem: HiddenHeaven.TargetItem) {
        return rm(targetItem.absolutePath, { force: true, recursive: true });
    }

    createTargetItem(sourceItem: HiddenHeaven.SourceItem): HiddenHeaven.TargetItem {
        const { targetFolder } = this;
        const { map } = this.context;

        const name = map?.[sourceItem.name] ?? sourceItem.name;
        const absolutePath = `${targetFolder.absolutePath}/${name}`;

        return { name, absolutePath, sourceItem, targetFolder };
    }

    async syncTargetItem(targetItem: HiddenHeaven.TargetItem) {
        await this.removeTargetItem(targetItem);

        execSync(['ln', '-sf', targetItem.sourceItem.absolutePath, targetItem.absolutePath]);
    }

    async sync() {
        const targetItems = this.sourceFolder.children.map((sourceItem) => {
            return this.createTargetItem(sourceItem);
        });

        const promises = targetItems.map((targetItem) => {
            return this.syncTargetItem(targetItem);
        });

        await Promise.all(promises);
    }
}
