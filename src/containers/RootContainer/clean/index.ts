import type { RootContainer } from '..';

export async function clean(this: RootContainer) {
    const cleanPromises = this.sourceFolderContainers.map((sourceFolderContainer) => {
        return sourceFolderContainer.clean();
    });

    await Promise.all(cleanPromises);
}
