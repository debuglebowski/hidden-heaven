import type { RootContainer } from '..';
import { fse, findPackagePaths } from '../../../utils';
import { join } from 'node:path';

const ignoredFiles = {
    exact: ['package.json'],
    contains: ['.lock', '-lock'],
    regex: [],
};

async function getSelectedFiles(this: RootContainer, packagePath: string) {
    const { context } = this;
    const { initMode } = context;

    const rootChildren = await fse.readdir(packagePath, { withFileTypes: true });

    if (initMode === 'all') {
        return rootChildren;
    }

    return rootChildren.filter((child) => {
        const childName = child.name;

        const exactIgnored = ignoredFiles.exact.includes(childName);
        const containsIgnored = ignoredFiles.contains.some((pattern) => childName.includes(pattern));
        const regexIgnored = ignoredFiles.regex.some((regex) => childName.match(regex));

        return !exactIgnored && !containsIgnored && !regexIgnored;
    });
}

async function initPackage(this: RootContainer, packagePath: string) {
    const { context } = this;
    const { cwd, sourceFolderName } = context;

    const children = await getSelectedFiles.call(this, packagePath);

    const children__enhanced = children.map((child) => {
        const from = join(cwd, child.name);
        const to = join(cwd, sourceFolderName);

        return { from, to };
    });

    const childrenPromises = children__enhanced.map((child) => {
        return fse.move(child.from, child.to);
    });

    await Promise.all(childrenPromises);
}

export async function init(this: RootContainer) {
    const { context } = this;

    const packagePaths = await findPackagePaths(context);

    const promises = packagePaths.map((packagePath) => {
        return initPackage.call(this, packagePath);
    });

    await Promise.all(promises);
}
