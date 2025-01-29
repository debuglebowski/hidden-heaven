import type { RootContainer } from '~/containers';
import { fse } from '~/utils';
import { ignoredItems__global } from './index.package.items.filter';
import { ignoredItems__package } from './index.package.items.filter';
import { isValidItem } from './index.package.items.filter';

async function getModeChildren(this: RootContainer, packagePath: string) {
    const { context } = this;
    const { initMode } = context;

    console.log(context);
    console.log(packagePath);

    const children = await fse.readdir(packagePath, { withFileTypes: true }).then((children) => {
        console.log(children.map((child) => child.name));

        return children.filter((child) => {
            const isSourceFolder = child.name === context.sourceFolderName;

            const isValid = isValidItem(ignoredItems__global, child.name);

            return !isSourceFolder && isValid;
        });
    });

    console.log('---');
    console.log(children.map((child) => child.name));

    if (initMode === 'all') {
        return children;
    }

    return children.filter((child) => {
        return isValidItem(ignoredItems__package, child.name);
    });
}

export async function getItems(this: RootContainer, packagePath: string) {
    const children = await getModeChildren.call(this, packagePath);

    return children.filter((child) => {
        return child.isFile();
    });
}
