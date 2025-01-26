import type { RootContainer } from '..';
import { fse } from '../../../utils';

const ignoredFiles = {
    exact: ['package.json'],
    contains: ['.lock', '-lock'],
    regex: [],
};

async function getModeChildren(this: RootContainer, packagePath: string) {
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

export async function getSelectedItems(this: RootContainer, packagePath: string) {
    const { context } = this;

    const children = await getModeChildren.call(this, packagePath);

    return children.filter((child) => {
        return child.isFile();
    });
}
