import type { RootContainer } from '..';

export async function reset(this: RootContainer) {
    const resetPromises = this.sourceFolderContainers.map((sourceFolderContainer) => {
        return sourceFolderContainer.reset();
    });

    await Promise.all(resetPromises);
}
