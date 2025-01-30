import { join } from 'node:path';
import type { RootContainer } from '..';
import { fse } from '~/utils';
import { getChildren } from './index.package.items';

export async function initPackage(this: RootContainer, packagePath: string) {
    const { context } = this;
    const { sourceFolderName } = context;

    await fse.ensureDir(sourceFolderName);

    const children = await getChildren.call(this, packagePath);

    // console.log(children.map((child) => child.name));

    const items = children.map((child) => {
        const from = join(packagePath, child.name);
        const to = join(packagePath, sourceFolderName, child.name);

        return { from, to };
    });

    for (const item of items) {
        await fse.move(item.from, item.to, { overwrite: true });
    }
}
