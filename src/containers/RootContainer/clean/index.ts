import type { RootContainer } from '..';

export async function clean(this: RootContainer) {
    const cleanPromises = this.packageContainers.map((sourceFolderContainer) => {
        return sourceFolderContainer.clean();
    });

    await Promise.all(cleanPromises);
}
