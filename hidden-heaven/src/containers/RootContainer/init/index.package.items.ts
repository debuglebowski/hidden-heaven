import type { RootContainer } from '~/containers';
import { fse } from '~/utils';
import { createRulesConfig__all, createRulesConfig__opinionated } from './index.package.items.filter';
import { isValidItem } from './index.package.items.filter';

async function getAllChildren(this: RootContainer, packagePath: string) {
    const { context } = this;

    const rulesConfig = createRulesConfig__all(context);

    return fse.readdir(packagePath, { withFileTypes: true }).then((children) => {
        return children.filter((child) => {
            const isSourceFolder = child.name === context.sourceFolderName;

            const isValid = isValidItem(rulesConfig, child);

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

    const rulesConfig = createRulesConfig__opinionated(context);

    return children.filter((child) => {
        return isValidItem(rulesConfig, child);
    });
}

export async function getChildren(this: RootContainer, packagePath: string) {
    return getChildrenByMode.call(this, packagePath);
}
