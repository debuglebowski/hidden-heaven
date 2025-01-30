import type { RootContainer } from '~/containers';
import { fse } from '~/utils';
import { createIgnoredItems__global, createIgnoredItems__package } from './index.package.items.filter';
import { isValidItem } from './index.package.items.filter';

async function getAllChildren(this: RootContainer, packagePath: string) {
    const { context } = this;

    const ignoredItems__global = createIgnoredItems__global(context);

    return fse.readdir(packagePath, { withFileTypes: true }).then((children) => {
        return children.filter((child) => {
            const isSourceFolder = child.name === context.sourceFolderName;

            const isValid = isValidItem(ignoredItems__global, child.name);

            return !isSourceFolder && isValid;
        });
    });
}

async function getChildrenByMode(this: RootContainer, packagePath: string) {
    const { context } = this;
    const { initMode } = context;

    const children = await getAllChildren.call(this, packagePath);

    if (initMode === 'all') {
        return children;
    }

    const ignoredItems__package = createIgnoredItems__package(context);

    return children.filter((child) => {
        return isValidItem(ignoredItems__package, child.name);
    });
}

export async function getChildren(this: RootContainer, packagePath: string) {
    return getChildrenByMode.call(this, packagePath);
}
