import type { Internals } from '../../types';
import { SourceFolderContainer } from '../SourceFolderContainer';
import { findSourceFolders } from './findSourceFolders';
import { validateContext } from './validateContext';

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

    async syncAll() {
        const syncPromises = this.sourceFolderContainers.map((sourceFolderContainer) => {
            return sourceFolderContainer.sync();
        });

        await Promise.all(syncPromises);
    }

    async clean() {
        const cleanPromises = this.sourceFolderContainers.map((sourceFolderContainer) => {
            return sourceFolderContainer.clean();
        });

        await Promise.all(cleanPromises);
    }
}
