import type { RootContainer } from '..';

export async function triggerCallbacks(this: RootContainer) {
    const { context, flatTargetItems } = this;

    for (const targetItem of flatTargetItems) {
        const { targetFolder, sourceItem } = targetItem;

        await this.context.onItem?.({ targetItem, targetFolder, sourceItem, context });
    }

    await this.context.onItems?.({ targetItems: flatTargetItems, context });
}
