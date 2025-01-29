import { join } from 'node:path';
import type { RootContainer } from '..';
import { fse } from '~/utils';
import { getItems } from './index.package.items';

export async function initPackage(this: RootContainer, packagePath: string) {
    const { context } = this;
    const { sourceFolderName } = context;

    await fse.ensureDir(sourceFolderName);

    const items__raw = await getItems.call(this, packagePath);

    const items = items__raw.map((child) => {
        const from = join(packagePath, child.name);
        const to = join(packagePath, sourceFolderName, child.name);

        return { from, to };
    });

    for (const child of items) {
        // await fse.move(child.from, child.to);
    }
}
