import type { RootContainer } from '..';

export async function triggerCallbacks(this: RootContainer) {
    const { context, flatLinkItems } = this;

    for (const linkItem of flatLinkItems) {
        const { parent: packageLinkFolder, sourceItem } = linkItem;

        await this.context.onItem?.({ linkItem, linkItemParent: packageLinkFolder, sourceItem, context });
    }

    await this.context.onItems?.({ linkItems: flatLinkItems, context });
}
