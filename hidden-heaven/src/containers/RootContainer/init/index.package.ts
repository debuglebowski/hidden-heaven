import type { RootContainer } from '..';
import { fse } from '~/utils';

export async function initPackage(this: RootContainer, packagePath: string) {
    const { context } = this;
    const { linkFolderName } = context;

    await fse.ensureDir(linkFolderName);
}
