import type { RootContainer } from '..';

export async function reset(this: RootContainer) {
    const resetPromises = this.packageContainers.map((sourceFolderContainer) => {
        return sourceFolderContainer.reset();
    });

    await Promise.all(resetPromises);
}
